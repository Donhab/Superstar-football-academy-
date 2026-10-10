import React from 'react';
import { Shield, Trophy, MapPin, Mail, Phone, Award } from 'lucide-react';
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
                  <Shield className="w-5 h-5 text-[#00F59B]" />
                </div>
              </div>
              <span className="text-xl font-extrabold font-display text-white tracking-tight">
                APEX <span className="text-[#00F59B]">ELITE</span>
              </span>
            </div>
            <p className="text-xs text-emerald-300/70 leading-relaxed">
              Premier international football development institute preparing prospective collegiate and professional players for the global stage.
            </p>
            <div className="flex items-center gap-2 text-[11px] font-mono text-[#00F59B]">
              <Award className="w-4 h-4" />
              <span>UEFA Licensed Coaching Staff</span>
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
                  <span className="text-white font-medium block">Apex London HQ</span>
                  <span className="text-[11px] text-emerald-400/80">St George’s Park & Olympic Village</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#00F59B] shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-medium block">Apex Manchester Centre</span>
                  <span className="text-[11px] text-emerald-400/80">Platt Lane Regional Complex</span>
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
              For club scout accreditations or trial inquiries:
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#00F59B]" />
                <a href="mailto:trials@apexelite.football" className="hover:underline text-white font-mono">
                  trials@apexelite.football
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#00F59B]" />
                <span className="font-mono text-white">+44 (0) 20 7946 0892</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-emerald-950 flex flex-col sm:flex-row items-center justify-between text-[11px] text-emerald-500/80 gap-3">
          <p>&copy; {new Date().getFullYear()} Apex Elite Football Academy. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Player Safeguarding FA Compliant</span>
            <span>&bull;</span>
            <span>GDPR Data Protection</span>
            <span>&bull;</span>
            <span>Firestore Realtime Sync</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
