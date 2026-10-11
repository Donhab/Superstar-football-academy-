import React from 'react';
import { Star, Trophy, MapPin, Mail, Phone, Award, MessageCircle, Camera } from 'lucide-react';
import { ViewTab } from '../types';
import { ACADEMY_INFO } from '../config/academyInfo';

interface FooterProps {
  onSelectTab: (tab: ViewTab) => void;
  onOpenFirebaseModal: () => void;
  clubLogoUrl?: string;
  academyPhone?: string;
  academySecondaryPhone?: string;
  academyEmail?: string;
  academyAddress?: string;
  onOpenBrandingModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onSelectTab, 
  onOpenFirebaseModal,
  clubLogoUrl,
  academyPhone = ACADEMY_INFO.phonePrimary,
  academySecondaryPhone = ACADEMY_INFO.phoneSecondary,
  academyEmail = ACADEMY_INFO.email,
  academyAddress = ACADEMY_INFO.headquarters,
  onOpenBrandingModal
}) => {
  return (
    <footer className="border-t border-emerald-950/80 bg-[#020d08] text-emerald-200/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: Brand & Crest */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-[#00F59B] p-0.5 shadow">
                <div className="w-full h-full bg-[#041912] rounded-[10px] flex items-center justify-center overflow-hidden">
                  {clubLogoUrl ? (
                    <img src={clubLogoUrl} alt="Club Crest" className="w-full h-full object-contain p-0.5" />
                  ) : (
                    <Star className="w-5 h-5 text-[#00F59B] fill-[#00F59B]/20" />
                  )}
                </div>
              </div>
              <span className="text-xl font-extrabold font-display text-white tracking-tight">
                SUPERSTAR <span className="text-[#00F59B]">FOOTBALL</span>
              </span>
            </div>
            <p className="text-xs text-emerald-300/70 leading-relaxed">
              Superstar Football Academy (Abuja, Nigeria) is a premier international football development institute under the leadership of Club President <strong>Charles Udende (Karika)</strong>.
            </p>
            <div className="space-y-1 text-[11px] font-mono text-[#00F59B]">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>President: Charles Udende (Karika)</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400">
                <span>&bull;</span>
                <span>NFF & CAF Certified Technical Staff</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3 text-xs">
            <span className="font-bold text-white uppercase tracking-wider font-mono">
              Academy Portal
            </span>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onSelectTab('home')} className="hover:text-[#00F59B] transition-colors cursor-pointer">
                  Academy Overview
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('programs')} className="hover:text-[#00F59B] transition-colors cursor-pointer">
                  Pathways & Showcases
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('register')} className="hover:text-[#00F59B] transition-colors font-semibold text-[#00F59B] cursor-pointer">
                  Trial Application Form
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('admin')} className="hover:text-[#00F59B] transition-colors cursor-pointer">
                  Coach & Scout Dashboard
                </button>
              </li>
              {onOpenBrandingModal && (
                <li>
                  <button onClick={onOpenBrandingModal} className="hover:text-[#00F59B] transition-colors text-[#00F59B] flex items-center gap-1 cursor-pointer">
                    <Camera className="w-3 h-3" />
                    <span>Manage Images & Logos</span>
                  </button>
                </li>
              )}
              <li>
                <button onClick={onOpenFirebaseModal} className="hover:text-[#00F59B] transition-colors text-emerald-400 cursor-pointer">
                  Firestore Integration Settings
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Training Campuses */}
          <div className="space-y-3 text-xs">
            <span className="font-bold text-white uppercase tracking-wider font-mono">
              Headquarters & Pitches
            </span>
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#00F59B] shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-medium block">Superstar Abuja National HQ</span>
                  <span className="text-[11px] text-emerald-400/80">{academyAddress}</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#00F59B] shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-medium block">Superstar Lagos Assessment Hub</span>
                  <span className="text-[11px] text-emerald-400/80">Teslim Balogun Stadium, Surulere, Nigeria</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Col 4: Trial Inquiries & Official Hotline */}
          <div className="space-y-3 text-xs">
            <span className="font-bold text-white uppercase tracking-wider font-mono">
              Scouting Desk & Hotline
            </span>
            <p className="text-[11px] text-emerald-300/70">
              For NPFL club scouts, European scouts or trial candidate inquiries:
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#00F59B]" />
                <a href={`mailto:${academyEmail}`} className="hover:underline text-white font-mono">
                  {academyEmail}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#00F59B]" />
                <a href={`tel:${academyPhone.replace(/\s+/g, '')}`} className="hover:underline font-mono text-white font-bold">
                  {academyPhone}
                </a>
              </div>
              {academySecondaryPhone && (
                <div className="flex items-center gap-2 text-emerald-400">
                  <Phone className="w-3.5 h-3.5 text-[#00F59B]" />
                  <span className="font-mono text-white text-[11px]">{academySecondaryPhone} (Office)</span>
                </div>
              )}
              <div className="pt-1">
                <a 
                  href={`https://wa.me/${academyPhone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-500/30 text-[#00F59B] hover:bg-emerald-900/60 transition text-[11px] font-mono cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Academy Hotline</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-emerald-950 flex flex-col sm:flex-row items-center justify-between text-[11px] text-emerald-500/80 gap-3">
          <p>&copy; {new Date().getFullYear()} Superstar Football Academy (Abuja, Nigeria). All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>NFF Accredited Youth Academy</span>
            <span>&bull;</span>
            <span>FIFA Guarding Compliant</span>
            <span>&bull;</span>
            <span>Firestore Realtime Sync</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
