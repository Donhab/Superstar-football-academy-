import React from 'react';
import { ViewTab } from '../types';
import { Star, Shield, Users, UserPlus, Trophy, Database, CheckCircle2, AlertCircle, Phone } from 'lucide-react';
import { ACADEMY_INFO } from '../config/academyInfo';

interface NavbarProps {
  currentTab: ViewTab;
  onSelectTab: (tab: ViewTab) => void;
  pendingCount: number;
  totalCount: number;
  isFirebaseLive: boolean;
  onOpenFirebaseModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  pendingCount,
  totalCount,
  isFirebaseLive,
  onOpenFirebaseModal,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-emerald-500/20 bg-[#041510]/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <button 
            onClick={() => onSelectTab('home')}
            className="flex items-center gap-3 group text-left transition-transform active:scale-95"
          >
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-400 to-[#00F59B] p-0.5 shadow-lg shadow-emerald-900/40">
              <div className="w-full h-full bg-[#041912] rounded-[10px] flex items-center justify-center transition-colors group-hover:bg-[#06241a]">
                <Star className="w-6 h-6 text-[#00F59B] fill-[#00F59B]/20 transition-transform group-hover:scale-110" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#00F59B] rounded-full animate-ping opacity-75" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#00F59B] rounded-full" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight font-display text-white">
                  SUPERSTAR <span className="text-[#00F59B]">FOOTBALL</span>
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded bg-emerald-950/80 border border-emerald-500/30 text-emerald-300">
                  ACADEMY
                </span>
              </div>
              <p className="text-[11px] text-emerald-400/80 tracking-wide font-medium">
                Abuja, Nigeria &bull; NFF & Global Pathway
              </p>
            </div>
          </button>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-[#062319]/60 p-1.5 rounded-full border border-emerald-500/20 shadow-inner">
            <button
              onClick={() => onSelectTab('home')}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                currentTab === 'home'
                  ? 'bg-[#00F59B] text-[#041912] shadow-md shadow-emerald-500/30 font-bold'
                  : 'text-emerald-200/80 hover:text-white hover:bg-emerald-950/40'
              }`}
            >
              Overview
            </button>

            <button
              onClick={() => onSelectTab('programs')}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 ${
                currentTab === 'programs'
                  ? 'bg-[#00F59B] text-[#041912] shadow-md shadow-emerald-500/30 font-bold'
                  : 'text-emerald-200/80 hover:text-white hover:bg-emerald-950/40'
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              Programs & Trials
            </button>

            <button
              onClick={() => onSelectTab('register')}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 ${
                currentTab === 'register'
                  ? 'bg-[#00F59B] text-[#041912] shadow-md shadow-emerald-500/30 font-bold'
                  : 'text-emerald-200/80 hover:text-white hover:bg-emerald-950/40'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              Trial Registration
            </button>

            <button
              onClick={() => onSelectTab('admin')}
              className={`relative px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all flex items-center gap-2 ${
                currentTab === 'admin'
                  ? 'bg-[#00F59B] text-[#041912] shadow-md shadow-emerald-500/30 font-bold'
                  : 'text-emerald-200/80 hover:text-white hover:bg-emerald-950/40'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Management Dashboard</span>
              {pendingCount > 0 && (
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                  currentTab === 'admin' ? 'bg-[#041912] text-[#00F59B]' : 'bg-[#00F59B] text-[#041912]'
                }`}>
                  {pendingCount}
                </span>
              )}
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5">
            {/* Direct Phone desk link */}
            <a
              href={`tel:${ACADEMY_INFO.phonePrimary.replace(/\s+/g, '')}`}
              title="Call Academy Desk (Abuja)"
              className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-emerald-200 hover:text-white glass-panel border-emerald-500/25 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#00F59B]" />
              <span>{ACADEMY_INFO.phonePrimary}</span>
            </a>

            {/* Database status pill */}
            <button
              onClick={onOpenFirebaseModal}
              title="Firebase Firestore connection details"
              className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                isFirebaseLive
                  ? 'bg-emerald-950/70 border-emerald-500/40 text-[#00F59B] hover:bg-emerald-900/50'
                  : 'bg-emerald-950/40 border-emerald-500/20 text-emerald-300 hover:bg-emerald-900/40'
              }`}
            >
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              <span className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${isFirebaseLive ? 'bg-[#00F59B] animate-pulse' : 'bg-emerald-400'}`} />
                {isFirebaseLive ? 'Firestore Live' : 'Storage Active'}
              </span>
            </button>

            {/* Quick Toggle CTA */}
            {currentTab !== 'admin' ? (
              <button
                onClick={() => onSelectTab('admin')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold tracking-wide bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-500 hover:to-teal-500 transition-all shadow-lg shadow-emerald-950/50 border border-emerald-400/30"
              >
                <Users className="w-4 h-4" />
                <span>Admin View</span>
              </button>
            ) : (
              <button
                onClick={() => onSelectTab('register')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold tracking-wide bg-[#00F59B] text-[#041912] hover:bg-[#34f8ac] transition-all shadow-lg shadow-emerald-500/20"
              >
                <UserPlus className="w-4 h-4" />
                <span>Public Form</span>
              </button>
            )}
          </div>

        </div>

        {/* Mobile secondary tab strip */}
        <div className="md:hidden flex items-center justify-between pb-3 pt-1 border-t border-emerald-950/50 gap-1 overflow-x-auto text-[11px]">
          <button
            onClick={() => onSelectTab('home')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-semibold ${
              currentTab === 'home' ? 'bg-[#00F59B] text-[#041912]' : 'text-emerald-300'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => onSelectTab('programs')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-semibold ${
              currentTab === 'programs' ? 'bg-[#00F59B] text-[#041912]' : 'text-emerald-300'
            }`}
          >
            Programs
          </button>
          <button
            onClick={() => onSelectTab('register')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-semibold ${
              currentTab === 'register' ? 'bg-[#00F59B] text-[#041912]' : 'text-emerald-300'
            }`}
          >
            Register
          </button>
          <button
            onClick={() => onSelectTab('admin')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-semibold flex items-center gap-1 ${
              currentTab === 'admin' ? 'bg-[#00F59B] text-[#041912]' : 'text-emerald-300'
            }`}
          >
            <span>Dashboard</span>
            {pendingCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-emerald-900 text-[#00F59B] text-[9px] flex items-center justify-center font-bold">
                {pendingCount}
              </span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
};
