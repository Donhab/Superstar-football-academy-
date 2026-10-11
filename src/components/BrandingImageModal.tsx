import React, { useState, useRef, useEffect } from 'react';
import { AcademyBranding, Footballer } from '../types';
import { 
  getStoredBranding, 
  saveStoredBranding, 
  resetBrandingToDefaults, 
  fileToOptimizedDataUrl 
} from '../services/brandingService';
import { 
  X, 
  Upload, 
  Image as ImageIcon, 
  Star, 
  User, 
  Building2, 
  Check, 
  RotateCcw, 
  Phone,
  Camera,
  Users,
  MapPin,
  Mail,
  Shield,
  Trash2
} from 'lucide-react';

interface BrandingImageModalProps {
  onClose: () => void;
  onSaved: () => void;
  initialTab?: 'logo' | 'president' | 'stadium' | 'facility' | 'player' | 'phone';
  footballers?: Footballer[];
  onUpdatePlayerPhoto?: (id: string, photoUrl: string) => Promise<void>;
}

export const BrandingImageModal: React.FC<BrandingImageModalProps> = ({ 
  onClose, 
  onSaved,
  initialTab = 'logo',
  footballers = [],
  onUpdatePlayerPhoto
}) => {
  const [branding, setBranding] = useState<AcademyBranding>(getStoredBranding());
  const [activeTab, setActiveTab] = useState<'logo' | 'president' | 'stadium' | 'facility' | 'player' | 'phone'>(initialTab);
  const [isProcessing, setIsProcessing] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  // Player selection for player photo upload
  const [selectedPlayerId, setSelectedPlayerId] = useState<string>(footballers[0]?.id || '');

  // Phone and Contact form fields
  const [phonePrimary, setPhonePrimary] = useState(branding.academyPhone || '+234 803 892 0000');
  const [phoneSecondary, setPhoneSecondary] = useState(branding.academySecondaryPhone || '+234 9 291 4892');
  const [emailContact, setEmailContact] = useState(branding.academyEmail || 'trials@superstar.ng');
  const [headquartersAddress, setHeadquartersAddress] = useState(branding.academyAddress || 'Moshood Abiola National Stadium (Package B), Abuja, FCT, Nigeria');
  const [presidentName, setPresidentName] = useState(branding.presidentName || 'Charles Udende (Karika)');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const playerFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const selectedPlayer = footballers.find((p) => p.id === selectedPlayerId) || footballers[0];

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setFeedbackMsg(null);
    try {
      // Optimize & convert to base64 data URL
      const dataUrl = await fileToOptimizedDataUrl(file, 900, 900, 0.88);
      
      let updated: AcademyBranding;
      if (activeTab === 'logo') {
        updated = saveStoredBranding({ clubLogoUrl: dataUrl });
      } else if (activeTab === 'president') {
        updated = saveStoredBranding({ presidentPhotoUrl: dataUrl });
      } else if (activeTab === 'stadium') {
        updated = saveStoredBranding({ stadiumBannerUrl: dataUrl });
      } else if (activeTab === 'facility') {
        updated = saveStoredBranding({ trainingGroundsUrl: dataUrl });
      } else {
        updated = getStoredBranding();
      }

      setBranding(updated);
      setFeedbackMsg('Image updated successfully across all matching frames!');
      setTimeout(() => setFeedbackMsg(null), 3000);
      onSaved();
    } catch (err: any) {
      console.error('Error reading image:', err);
      setFeedbackMsg('Failed to process image. Please try another file.');
    } finally {
      setIsProcessing(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handlePlayerPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selectedPlayer || !onUpdatePlayerPhoto) return;

    setIsProcessing(true);
    setFeedbackMsg(null);
    try {
      const dataUrl = await fileToOptimizedDataUrl(file, 600, 600, 0.88);
      await onUpdatePlayerPhoto(selectedPlayer.id, dataUrl);
      setFeedbackMsg(`Photo saved for ${selectedPlayer.fullName}!`);
      setTimeout(() => setFeedbackMsg(null), 3000);
      onSaved();
    } catch (err) {
      console.error('Failed to update player photo:', err);
      setFeedbackMsg('Could not upload player photo.');
    } finally {
      setIsProcessing(false);
      if (playerFileInputRef.current) playerFileInputRef.current.value = '';
    }
  };

  const handleRemovePlayerPhoto = async () => {
    if (!selectedPlayer || !onUpdatePlayerPhoto) return;
    try {
      await onUpdatePlayerPhoto(selectedPlayer.id, '');
      setFeedbackMsg(`Photo removed for ${selectedPlayer.fullName}`);
      setTimeout(() => setFeedbackMsg(null), 2500);
      onSaved();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUrlUpdate = (newUrl: string) => {
    let updated: AcademyBranding;
    if (activeTab === 'logo') {
      updated = saveStoredBranding({ clubLogoUrl: newUrl });
    } else if (activeTab === 'president') {
      updated = saveStoredBranding({ presidentPhotoUrl: newUrl });
    } else if (activeTab === 'stadium') {
      updated = saveStoredBranding({ stadiumBannerUrl: newUrl });
    } else if (activeTab === 'facility') {
      updated = saveStoredBranding({ trainingGroundsUrl: newUrl });
    } else {
      updated = getStoredBranding();
    }
    setBranding(updated);
    setFeedbackMsg('Image applied to frame!');
    setTimeout(() => setFeedbackMsg(null), 2500);
    onSaved();
  };

  const handleSaveContactDetails = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = saveStoredBranding({
      academyPhone: phonePrimary.trim(),
      academySecondaryPhone: phoneSecondary.trim(),
      academyEmail: emailContact.trim(),
      academyAddress: headquartersAddress.trim(),
      presidentName: presidentName.trim()
    });
    setBranding(updated);
    setFeedbackMsg('Official Academy Phone Number & Contact Info updated!');
    setTimeout(() => setFeedbackMsg(null), 3500);
    onSaved();
  };

  const handleResetCurrent = () => {
    let updated: AcademyBranding;
    if (activeTab === 'logo') {
      updated = saveStoredBranding({ clubLogoUrl: '' });
    } else if (activeTab === 'president') {
      updated = saveStoredBranding({ presidentPhotoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80' });
    } else if (activeTab === 'stadium') {
      updated = saveStoredBranding({ stadiumBannerUrl: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1400&q=80' });
    } else if (activeTab === 'facility') {
      updated = saveStoredBranding({ trainingGroundsUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80' });
    } else {
      updated = getStoredBranding();
    }
    setBranding(updated);
    setFeedbackMsg('Reset current frame to default asset.');
    setTimeout(() => setFeedbackMsg(null), 2000);
    onSaved();
  };

  const handleResetAll = () => {
    const def = resetBrandingToDefaults();
    setBranding(def);
    setPhonePrimary(def.academyPhone || '+234 803 892 0000');
    setPhoneSecondary(def.academySecondaryPhone || '+234 9 291 4892');
    setEmailContact(def.academyEmail || 'trials@superstar.ng');
    setHeadquartersAddress(def.academyAddress || 'Moshood Abiola National Stadium (Package B), Abuja, FCT, Nigeria');
    setPresidentName(def.presidentName || 'Charles Udende (Karika)');
    setFeedbackMsg('All images and contact details restored to defaults.');
    setTimeout(() => setFeedbackMsg(null), 2500);
    onSaved();
  };

  // Curated presets for immediate aesthetic previews
  const logoPresets = [
    { label: "Star Crest (Default)", url: "" },
    { label: "Golden Eagle Shield", url: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=300&q=80" },
    { label: "Emerald Sphere", url: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=300&q=80" },
    { label: "Match Ball Crown", url: "https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?auto=format&fit=crop&w=300&q=80" }
  ];

  const presidentPresets = [
    { label: "President Portrait 1", url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80" },
    { label: "Executive Suit Portrait", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80" },
    { label: "Leadership Stance", url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80" }
  ];

  const stadiumPresets = [
    { label: "National Stadium Turf", url: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1400&q=80" },
    { label: "Matchday Floodlights", url: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1400&q=80" },
    { label: "Abuja Sunset Arena", url: "https://images.unsplash.com/photo-1489944445391-11688663c2da?auto=format&fit=crop&w=1400&q=80" }
  ];

  const facilityPresets = [
    { label: "Natural Turf Pitch", url: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80" },
    { label: "Tactical Training Session", url: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80" },
    { label: "Modern Football Pitch", url: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=1200&q=80" }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-panel-glow max-w-3xl w-full rounded-3xl border border-emerald-500/40 overflow-hidden shadow-2xl max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-[#042016] via-[#063323] to-[#042016] border-b border-emerald-500/25 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-400 text-[#00F59B] flex items-center justify-center">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-display">
                Academy Images, Logos & Contact Manager
              </h3>
              <p className="text-xs text-emerald-300/80">
                Upload custom images to any frame across the academy portal or update the official hotline
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-emerald-950/80 text-emerald-400 hover:text-white border border-emerald-500/30 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Strip */}
        <div className="flex items-center border-b border-emerald-950/80 bg-[#03150e] px-6 gap-2 overflow-x-auto text-xs py-2.5">
          <button
            onClick={() => setActiveTab('logo')}
            className={`px-3.5 py-2 rounded-xl font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'logo'
                ? 'bg-[#00F59B] text-[#041912] shadow'
                : 'text-emerald-300 hover:text-white hover:bg-emerald-950/60'
            }`}
          >
            <Star className="w-3.5 h-3.5" />
            <span>1. Club Crest / Logo</span>
          </button>

          <button
            onClick={() => setActiveTab('president')}
            className={`px-3.5 py-2 rounded-xl font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'president'
                ? 'bg-[#00F59B] text-[#041912] shadow'
                : 'text-emerald-300 hover:text-white hover:bg-emerald-950/60'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>2. President's Portrait</span>
          </button>

          <button
            onClick={() => setActiveTab('stadium')}
            className={`px-3.5 py-2 rounded-xl font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'stadium'
                ? 'bg-[#00F59B] text-[#041912] shadow'
                : 'text-emerald-300 hover:text-white hover:bg-emerald-950/60'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>3. National Stadium Banner</span>
          </button>

          <button
            onClick={() => setActiveTab('facility')}
            className={`px-3.5 py-2 rounded-xl font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'facility'
                ? 'bg-[#00F59B] text-[#041912] shadow'
                : 'text-emerald-300 hover:text-white hover:bg-emerald-950/60'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>4. Training Grounds Frame</span>
          </button>

          <button
            onClick={() => setActiveTab('player')}
            className={`px-3.5 py-2 rounded-xl font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'player'
                ? 'bg-[#00F59B] text-[#041912] shadow'
                : 'text-emerald-300 hover:text-white hover:bg-emerald-950/60'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>5. Player Squad Photos</span>
          </button>

          <button
            onClick={() => setActiveTab('phone')}
            className={`px-3.5 py-2 rounded-xl font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'phone'
                ? 'bg-[#00F59B] text-[#041912] shadow'
                : 'text-emerald-300 hover:text-white hover:bg-emerald-950/60'
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>6. Academy Phone & Hotline</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {feedbackMsg && (
            <div className="p-3.5 rounded-xl bg-emerald-950 border border-emerald-400 text-[#00F59B] text-xs font-semibold flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>{feedbackMsg}</span>
            </div>
          )}

          {/* Hidden File Input for main assets */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
          />

          {/* Hidden File Input for player photos */}
          <input
            type="file"
            ref={playerFileInputRef}
            onChange={handlePlayerPhotoUpload}
            accept="image/*"
            className="hidden"
          />

          {/* TAB 1: Club Logo / Crest */}
          {activeTab === 'logo' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-2xl bg-[#041a12] border border-emerald-500/20">
                {/* Logo Preview Box */}
                <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-emerald-400 to-[#00F59B] p-1 shadow-xl shrink-0 flex items-center justify-center">
                  <div className="w-full h-full bg-[#041912] rounded-[14px] flex items-center justify-center overflow-hidden p-2">
                    {branding.clubLogoUrl ? (
                      <img 
                        src={branding.clubLogoUrl} 
                        alt="Club Crest" 
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <Star className="w-12 h-12 text-[#00F59B] fill-[#00F59B]/20" />
                    )}
                  </div>
                </div>

                <div className="space-y-2 flex-1 text-center sm:text-left">
                  <span className="text-xs font-mono font-bold uppercase text-[#00F59B]">
                    OFFICIAL CLUB CREST / EMBLEM FRAME
                  </span>
                  <h4 className="text-lg font-bold text-white font-display">
                    Navbar, Header & Digital Pass Logo
                  </h4>
                  <p className="text-xs text-emerald-100/75 leading-relaxed">
                    This logo appears in the top navigation bar, footer brand crest, digital trial pass, and executive headers.
                  </p>

                  <div className="pt-2 flex flex-wrap gap-2 justify-center sm:justify-start">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isProcessing}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-[#00F59B] text-[#041912] hover:bg-[#34f8ac] transition flex items-center gap-1.5 shadow cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>{isProcessing ? 'Processing...' : 'Upload Logo File (PNG / SVG)'}</span>
                    </button>

                    <button
                      onClick={handleResetCurrent}
                      title="Reset to default logo"
                      className="px-3 py-2 rounded-xl text-xs font-semibold glass-panel text-emerald-300 hover:text-white cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Paste Image URL */}
              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/20 space-y-2">
                <label className="block text-xs font-semibold text-emerald-300">
                  Or Paste External Image URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://example.com/logo.png"
                    defaultValue={branding.clubLogoUrl}
                    onBlur={(e) => {
                      if (e.target.value !== branding.clubLogoUrl) {
                        handleUrlUpdate(e.target.value);
                      }
                    }}
                    className="flex-1 px-3 py-2 rounded-xl glass-input text-xs font-mono"
                  />
                </div>
              </div>

              {/* Presets */}
              <div>
                <span className="text-xs font-mono text-emerald-400 block mb-2 font-bold uppercase">
                  Quick Logo Presets
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {logoPresets.map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleUrlUpdate(preset.url)}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        branding.clubLogoUrl === preset.url
                          ? 'bg-emerald-900/80 border-[#00F59B] text-white'
                          : 'bg-[#041a12] border-emerald-500/20 text-emerald-300 hover:border-emerald-500/40'
                      }`}
                    >
                      <div className="w-10 h-10 mx-auto rounded-lg bg-[#041912] mb-1.5 flex items-center justify-center overflow-hidden">
                        {preset.url ? (
                          <img src={preset.url} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <Star className="w-6 h-6 text-[#00F59B]" />
                        )}
                      </div>
                      <div className="text-[11px] font-semibold">{preset.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: President Charles Udende Portrait */}
          {activeTab === 'president' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-2xl bg-[#041a12] border border-emerald-500/20">
                {/* President Portrait Frame */}
                <div className="w-32 h-36 rounded-2xl bg-gradient-to-tr from-[#00F59B] via-emerald-400 to-teal-500 p-1 shadow-xl shrink-0 flex items-center justify-center overflow-hidden">
                  <div className="w-full h-full bg-[#041912] rounded-[12px] flex items-center justify-center overflow-hidden relative">
                    {branding.presidentPhotoUrl ? (
                      <img 
                        src={branding.presidentPhotoUrl} 
                        alt="Charles Udende (Karika)" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-12 h-12 text-[#00F59B]" />
                    )}
                  </div>
                </div>

                <div className="space-y-2 flex-1 text-center sm:text-left">
                  <span className="text-xs font-mono font-bold uppercase text-[#00F59B]">
                    PRESIDENTIAL PORTRAIT FRAME
                  </span>
                  <h4 className="text-lg font-bold text-white font-display">
                    Charles Udende (Karika) Official Photo
                  </h4>
                  <p className="text-xs text-emerald-100/75 leading-relaxed">
                    This photo is displayed in the Presidential Leadership & Vision section and club leadership profile.
                  </p>

                  <div className="pt-2 flex flex-wrap gap-2 justify-center sm:justify-start">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isProcessing}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-[#00F59B] text-[#041912] hover:bg-[#34f8ac] transition flex items-center gap-1.5 shadow cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>{isProcessing ? 'Processing...' : 'Upload President Portrait (JPG / PNG)'}</span>
                    </button>

                    <button
                      onClick={handleResetCurrent}
                      title="Reset to default portrait"
                      className="px-3 py-2 rounded-xl text-xs font-semibold glass-panel text-emerald-300 hover:text-white cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Paste URL */}
              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/20 space-y-2">
                <label className="block text-xs font-semibold text-emerald-300">
                  Or Paste Portrait Image URL
                </label>
                <input
                  type="url"
                  placeholder="https://example.com/president-portrait.jpg"
                  defaultValue={branding.presidentPhotoUrl}
                  onBlur={(e) => {
                    if (e.target.value !== branding.presidentPhotoUrl) {
                      handleUrlUpdate(e.target.value);
                    }
                  }}
                  className="w-full px-3 py-2 rounded-xl glass-input text-xs font-mono"
                />
              </div>

              {/* Presets */}
              <div>
                <span className="text-xs font-mono text-emerald-400 block mb-2 font-bold uppercase">
                  Curated Portrait Presets
                </span>
                <div className="grid grid-cols-3 gap-3">
                  {presidentPresets.map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleUrlUpdate(preset.url)}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        branding.presidentPhotoUrl === preset.url
                          ? 'bg-emerald-900/80 border-[#00F59B] text-white'
                          : 'bg-[#041a12] border-emerald-500/20 text-emerald-300'
                      }`}
                    >
                      <img src={preset.url} alt="" className="w-full h-24 object-cover rounded-lg mb-1.5" />
                      <div className="text-[10px] font-semibold truncate">{preset.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: National Stadium Banner */}
          {activeTab === 'stadium' && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-emerald-500/25 overflow-hidden relative">
                <img 
                  src={branding.stadiumBannerUrl} 
                  alt="Moshood Abiola Stadium" 
                  className="w-full h-48 sm:h-56 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-4">
                  <div>
                    <span className="text-[10px] font-mono text-[#00F59B] uppercase font-bold">
                      HERO STADIUM & MATCHDAY SHOWCASE FRAME
                    </span>
                    <h4 className="text-base font-bold text-white">
                      Moshood Abiola National Stadium (Package B), Abuja
                    </h4>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isProcessing}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold bg-[#00F59B] text-[#041912] hover:bg-[#34f8ac] transition flex items-center gap-1.5 shadow cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Stadium Banner</span>
                </button>

                <button
                  onClick={handleResetCurrent}
                  className="px-3 py-2 rounded-xl text-xs font-semibold glass-panel text-emerald-300 hover:text-white cursor-pointer"
                >
                  Reset Default
                </button>
              </div>

              {/* Presets */}
              <div>
                <span className="text-xs font-mono text-emerald-400 block mb-2 font-bold uppercase">
                  Stadium Atmosphere Presets
                </span>
                <div className="grid grid-cols-3 gap-3">
                  {stadiumPresets.map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleUrlUpdate(preset.url)}
                      className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                        branding.stadiumBannerUrl === preset.url
                          ? 'border-[#00F59B] ring-2 ring-[#00F59B]/40'
                          : 'border-emerald-500/20 opacity-80 hover:opacity-100'
                      }`}
                    >
                      <img src={preset.url} alt="" className="w-full h-20 object-cover rounded-lg mb-1" />
                      <div className="text-[10px] font-semibold text-emerald-200 truncate">{preset.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Training Grounds Frame */}
          {activeTab === 'facility' && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-emerald-500/25 overflow-hidden relative">
                <img 
                  src={branding.trainingGroundsUrl} 
                  alt="Training Pitch" 
                  className="w-full h-48 sm:h-56 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-4">
                  <div>
                    <span className="text-[10px] font-mono text-[#00F59B] uppercase font-bold">
                      SUPERSTAR PERFORMANCE CENTRE FRAME
                    </span>
                    <h4 className="text-base font-bold text-white">
                      Training Complex & Gym Facilities
                    </h4>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isProcessing}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold bg-[#00F59B] text-[#041912] hover:bg-[#34f8ac] transition flex items-center gap-1.5 shadow cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Facility Image</span>
                </button>

                <button
                  onClick={handleResetCurrent}
                  className="px-3 py-2 rounded-xl text-xs font-semibold glass-panel text-emerald-300 hover:text-white cursor-pointer"
                >
                  Reset Default
                </button>
              </div>

              {/* Presets */}
              <div>
                <span className="text-xs font-mono text-emerald-400 block mb-2 font-bold uppercase">
                  Training Facility Presets
                </span>
                <div className="grid grid-cols-3 gap-3">
                  {facilityPresets.map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleUrlUpdate(preset.url)}
                      className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                        branding.trainingGroundsUrl === preset.url
                          ? 'border-[#00F59B] ring-2 ring-[#00F59B]/40'
                          : 'border-emerald-500/20 opacity-80 hover:opacity-100'
                      }`}
                    >
                      <img src={preset.url} alt="" className="w-full h-20 object-cover rounded-lg mb-1" />
                      <div className="text-[10px] font-semibold text-emerald-200 truncate">{preset.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: Player Squad Photos */}
          {activeTab === 'player' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-[#041a12] border border-emerald-500/20">
                <label className="block text-xs font-bold text-emerald-300 uppercase font-mono mb-2">
                  Select Player to Add or Update Photo:
                </label>
                
                {footballers.length === 0 ? (
                  <p className="text-xs text-emerald-200/70">No registered players yet. Register a player first.</p>
                ) : (
                  <select
                    value={selectedPlayerId}
                    onChange={(e) => setSelectedPlayerId(e.target.value)}
                    className="w-full p-3 rounded-xl glass-input text-xs font-semibold text-white bg-[#03150e]"
                  >
                    {footballers.map((p) => (
                      <option key={p.id} value={p.id} className="bg-[#041912] text-white">
                        {p.fullName} ({p.position}) — Status: {p.status}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {selectedPlayer && (
                <div className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-2xl bg-[#041a12] border border-emerald-500/20">
                  {/* Player Photo Frame */}
                  <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-emerald-400 to-[#00F59B] p-1 shadow-xl shrink-0 flex items-center justify-center">
                    <div className="w-full h-full bg-[#041912] rounded-[14px] flex items-center justify-center overflow-hidden">
                      {selectedPlayer.photoUrl ? (
                        <img 
                          src={selectedPlayer.photoUrl} 
                          alt={selectedPlayer.fullName} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-3xl font-display font-extrabold text-[#00F59B]">
                          {selectedPlayer.squadNumber || selectedPlayer.fullName.charAt(0)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2 flex-1 text-center sm:text-left">
                    <span className="text-xs font-mono font-bold uppercase text-[#00F59B]">
                      {selectedPlayer.position} &bull; {selectedPlayer.status}
                    </span>
                    <h4 className="text-lg font-bold text-white font-display">
                      {selectedPlayer.fullName}
                    </h4>
                    <p className="text-xs text-emerald-100/75">
                      {selectedPlayer.age} years old &bull; {selectedPlayer.height} cm &bull; Phone: {selectedPlayer.phone}
                    </p>

                    <div className="pt-2 flex flex-wrap gap-2 justify-center sm:justify-start">
                      <button
                        onClick={() => playerFileInputRef.current?.click()}
                        disabled={isProcessing}
                        className="px-4 py-2 rounded-xl text-xs font-bold bg-[#00F59B] text-[#041912] hover:bg-[#34f8ac] transition flex items-center gap-1.5 shadow cursor-pointer"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>{isProcessing ? 'Uploading...' : 'Upload Player Photo'}</span>
                      </button>

                      {selectedPlayer.photoUrl && (
                        <button
                          onClick={handleRemovePlayerPhoto}
                          className="px-3 py-2 rounded-xl text-xs font-semibold glass-panel text-rose-300 hover:text-white flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 6: Academy Phone & Hotline */}
          {activeTab === 'phone' && (
            <form onSubmit={handleSaveContactDetails} className="space-y-5">
              <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/30">
                <div className="flex items-center gap-2 mb-2 text-[#00F59B]">
                  <Phone className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase font-mono tracking-wider">
                    Official Superstar Academy Contact & Hotline (Abuja, Nigeria)
                  </span>
                </div>
                <p className="text-xs text-emerald-200/80 leading-relaxed">
                  These official phone numbers and contact details will appear in the top navbar, trial admissions desk, footer, WhatsApp link, and registration support lines.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-emerald-300 mb-1.5">
                    Primary Academy Hotline / Mobile <span className="text-[#00F59B]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phonePrimary}
                    onChange={(e) => setPhonePrimary(e.target.value)}
                    placeholder="+234 803 892 0000"
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-mono text-white"
                  />
                  <span className="text-[10px] text-emerald-400/80 mt-1 block">
                    Example: +234 803 892 0000 (Abuja line)
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-emerald-300 mb-1.5">
                    Secondary Office / Landline
                  </label>
                  <input
                    type="tel"
                    value={phoneSecondary}
                    onChange={(e) => setPhoneSecondary(e.target.value)}
                    placeholder="+234 9 291 4892"
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-mono text-white"
                  />
                  <span className="text-[10px] text-emerald-400/80 mt-1 block">
                    Abuja FCT Landline or alternate scout number
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-emerald-300 mb-1.5">
                    Official Scouting Email
                  </label>
                  <input
                    type="email"
                    required
                    value={emailContact}
                    onChange={(e) => setEmailContact(e.target.value)}
                    placeholder="trials@superstar.ng"
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-mono text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-emerald-300 mb-1.5">
                    Club President Name
                  </label>
                  <input
                    type="text"
                    required
                    value={presidentName}
                    onChange={(e) => setPresidentName(e.target.value)}
                    placeholder="Charles Udende (Karika)"
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-emerald-300 mb-1.5">
                  Headquarters & Stadium Pitch Address
                </label>
                <input
                  type="text"
                  required
                  value={headquartersAddress}
                  onChange={(e) => setHeadquartersAddress(e.target.value)}
                  placeholder="Moshood Abiola National Stadium (Package B), Abuja, FCT, Nigeria"
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-white"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#00F59B] text-[#041912] hover:bg-[#34f8ac] transition shadow cursor-pointer flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Phone Number & Contact Details</span>
                </button>
              </div>
            </form>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-[#03140e] border-t border-emerald-950 flex items-center justify-between">
          <button
            onClick={handleResetAll}
            className="text-xs text-emerald-400 hover:text-white flex items-center gap-1.5 cursor-pointer font-medium"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Images & Contacts to Defaults</span>
          </button>

          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#00F59B] text-[#041912] hover:bg-[#34f8ac] transition shadow cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
