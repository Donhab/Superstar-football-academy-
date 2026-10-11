/**
 * Superstar Football Academy - Branding & Image Asset Management
 * Supports uploading, storing, and customizing images across all image frames.
 */

import { AcademyBranding } from '../types';

export const DEFAULT_BRANDING: AcademyBranding = {
  // Sleek SVG default emblem if no custom photo uploaded
  clubLogoUrl: "",
  // President Charles Udende (Karika) default photo
  presidentPhotoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
  // Moshood Abiola Stadium / Training pitch hero banner
  stadiumBannerUrl: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1400&q=80",
  // Training complex grounds
  trainingGroundsUrl: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80",
  // Official Superstar Football Academy Contact & Hotline (Abuja, Nigeria)
  academyPhone: "+234 803 892 0000",
  academySecondaryPhone: "+234 9 291 4892",
  academyEmail: "trials@superstar.ng",
  academyAddress: "Moshood Abiola National Stadium (Package B), Abuja, FCT, Nigeria",
  presidentName: "Charles Udende (Karika)"
};

const LOCAL_STORAGE_KEY_BRANDING = 'superstar_academy_branding';

type BrandingSubscriber = (branding: AcademyBranding) => void;
const subscribers: Set<BrandingSubscriber> = new Set();

export function getStoredBranding(): AcademyBranding {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY_BRANDING);
    if (raw) {
      return { ...DEFAULT_BRANDING, ...JSON.parse(raw) };
    }
  } catch {
    // fallback
  }
  return DEFAULT_BRANDING;
}

export function saveStoredBranding(branding: Partial<AcademyBranding>): AcademyBranding {
  const current = getStoredBranding();
  const updated: AcademyBranding = { ...current, ...branding };
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY_BRANDING, JSON.stringify(updated));
    subscribers.forEach((cb) => cb(updated));
  } catch (err) {
    console.error("Failed saving branding to localStorage:", err);
  }
  return updated;
}

export function subscribeToBranding(callback: BrandingSubscriber): () => void {
  subscribers.add(callback);
  callback(getStoredBranding());
  return () => {
    subscribers.delete(callback);
  };
}

export function resetBrandingToDefaults(): AcademyBranding {
  try {
    localStorage.removeItem(LOCAL_STORAGE_KEY_BRANDING);
    subscribers.forEach((cb) => cb(DEFAULT_BRANDING));
  } catch {
    // ignore
  }
  return DEFAULT_BRANDING;
}

/**
 * Utility to compress and resize an image file into a clean data URL string
 * Ensures images don't exceed storage quotas while retaining crisp quality
 */
export async function fileToOptimizedDataUrl(file: File, maxWidth = 800, maxHeight = 800, quality = 0.85): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(reader.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        // If PNG or GIF with transparency, keep png, otherwise jpeg
        const outputType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
        const dataUrl = canvas.toDataURL(outputType, quality);
        resolve(dataUrl);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}
