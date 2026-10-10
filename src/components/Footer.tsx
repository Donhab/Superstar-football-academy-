import React from 'react';
import { Star, Trophy, MapPin, Mail, Phone, Award } from 'lucide-react';
import { ViewTab } from '../types';

interface FooterProps {
  onSelectTab: (tab: ViewTab) => void;
  onOpenFirebaseModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, onOpenFirebaseModal }) => {
  return (
    <footer className="border-t border-emerald-950/80 bg-[#020d08] text-emerald-200/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: Brand & Crest */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-[#00F59B] p-0.5">
                <div className="w-full h-full bg-[#041912] rounded-[10px] flex items-center justify-center">
                  <Star className="w-5 h-5 text-[#00F59B] fill-[#00F59B]/20" />
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
                <button onClick={() => onSelectTab('home')} className="hover:text-[#00F59B] transition-colors">
                  Academy Overview
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('programs')} className="hover:text-[#00F59B] transition-colors">
                  Pathways & Showcases
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('register')} className="hover:text-[#00F59B] transition-colors font-semibold text-[#00F59B]">
                  Trial Application Form
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('admin')} className="hover:text-[#00F59B] transition-colors">
                  Coach & Scout Dashboard
                </button>
              </li>
              <li>
                <button onClick={onOpenFirebaseModal} className="hover:text-[#00F59B] transition-colors text-emerald-400">
                  Firestore Integration Settings
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Training Campuses */}
          <div className="space-y-3 text-xs">
            <span className="font-bold text-white uppercase tracking-wider font-mono">
              Training Campuses
            </span>
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#00F59B] shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-medium block">Superstar Abuja National HQ</span>
                  <span className="text-[11px] text-emerald-400/80">Moshood Abiola Stadium, Package B, FCT</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#00F59B] shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-medium block">Superstar Lagos Assessment Hub</span>
                  <span className="text-[11px] text-emerald-400/80">Teslim Balogun Stadium, Surulere</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Col 4: Trial Inquiries */}
          <div className="space-y-3 text-xs">
            <span className="font-bold text-white uppercase tracking-wider font-mono">
              Scouting Desk
            </span>
            <p className="text-[11px] text-emerald-300/70">
              For NPFL club scouts, international scouts or trial inquiries:
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#00F59B]" />
                <a href="mailto:trials@superstar.ng" className="hover:underline text-white font-mono">
                  trials@superstar.ng
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#00F59B]" />
                <span className="font-mono text-white">+234 (0) 9 291 4892 / +234 803 892 0000</span>
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
