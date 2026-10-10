import React from 'react';
import { ViewTab } from '../types';
import { Shield, Sparkles, ArrowRight, Activity, Award, Target, Zap, ChevronRight, Users } from 'lucide-react';

interface HeroSectionProps {
  onRegisterClick: () => void;
  onAdminClick: () => void;
  totalRegistered: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onRegisterClick,
  onAdminClick,
  totalRegistered,
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 pitch-grid">
      {/* Background neon glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 -left-20 w-80 h-80 bg-[#00F59B]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-emerald-800/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Announcement Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-panel border border-[#00F59B]/30 shadow-lg shadow-emerald-950/60 group hover:border-[#00F59B]/60 transition-all cursor-pointer"
               onClick={onRegisterClick}>
            <span className="flex h-2 w-2 rounded-full bg-[#00F59B] animate-ping" />
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
              Autumn 2026 Showcase Trials Open
            </span>
            <span className="text-[11px] font-bold text-[#041912] bg-[#00F59B] px-2 py-0.5 rounded-full flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
              Apply Now <ChevronRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Main Pitch Headline */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight font-display text-white leading-[1.08] drop-shadow-sm">
            FORGE YOUR LEGACY. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-emerald-200 via-[#00F59B] to-teal-200 bg-clip-text text-transparent">
              JOIN THE APEX ELITE.
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-xl text-emerald-100/80 max-w-2xl mx-auto leading-relaxed font-light">
            Europe’s premier accelerated talent academy bridging grassroots prodigies 
            to professional trials, UEFA licensed academies, and top-tier collegiate scholarships.
          </p>

          {/* Action CTAs */}
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onRegisterClick}
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold bg-[#00F59B] text-[#041912] hover:bg-[#2ffcb1] transition-all shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-3 group active:scale-98"
            >
              <span>Register For Trials</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onAdminClick}
              className="w-full sm:w-auto px-7 py-4 rounded-xl text-base font-semibold glass-panel text-emerald-200 hover:text-white hover:bg-emerald-950/60 hover:border-emerald-400/40 transition-all flex items-center justify-center gap-2.5 active:scale-98"
            >
              <Users className="w-5 h-5 text-[#00F59B]" />
              <span>Academy Dashboard</span>
              <span className="text-xs px-2 py-0.5 rounded-md bg-emerald-900/80 text-emerald-300 font-mono">
                {totalRegistered} Registered
              </span>
            </button>
          </div>
        </div>

        {/* Key Academy Metrics Strip */}
        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto">
          <div className="glass-panel p-4 sm:p-5 rounded-2xl border-emerald-500/20 text-center hover:border-emerald-500/40 transition-all">
            <div className="flex items-center justify-center w-10 h-10 mx-auto rounded-xl bg-emerald-950/80 text-[#00F59B] mb-2.5 border border-emerald-500/30">
              <Award className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-display">94.2%</div>
            <p className="text-xs text-emerald-300/80 font-medium mt-1">Pro Trial Placement Rate</p>
          </div>

          <div className="glass-panel p-4 sm:p-5 rounded-2xl border-emerald-500/20 text-center hover:border-emerald-500/40 transition-all">
            <div className="flex items-center justify-center w-10 h-10 mx-auto rounded-xl bg-emerald-950/80 text-[#00F59B] mb-2.5 border border-emerald-500/30">
              <Target className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-display">52+</div>
            <p className="text-xs text-emerald-300/80 font-medium mt-1">Scout Club Network</p>
          </div>

          <div className="glass-panel p-4 sm:p-5 rounded-2xl border-emerald-500/20 text-center hover:border-emerald-500/40 transition-all">
            <div className="flex items-center justify-center w-10 h-10 mx-auto rounded-xl bg-emerald-950/80 text-[#00F59B] mb-2.5 border border-emerald-500/30">
              <Zap className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-display">12</div>
            <p className="text-xs text-emerald-300/80 font-medium mt-1">UEFA Pro Staff Coaches</p>
          </div>

          <div className="glass-panel p-4 sm:p-5 rounded-2xl border-emerald-500/20 text-center hover:border-emerald-500/40 transition-all">
            <div className="flex items-center justify-center w-10 h-10 mx-auto rounded-xl bg-emerald-950/80 text-[#00F59B] mb-2.5 border border-emerald-500/30">
              <Activity className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-display">GPS & AI</div>
            <p className="text-xs text-emerald-300/80 font-medium mt-1">Biometric Load Tracking</p>
          </div>
        </div>

        {/* Tactical Pitch Visual Showcase Card */}
        <div className="mt-12 glass-panel-glow rounded-3xl p-6 sm:p-8 border border-emerald-500/30 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:max-w-md">
              <span className="text-xs font-bold uppercase tracking-wider text-[#00F59B] font-mono">
                THE APEX METRIC PROTOCOL
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-2">
                Evaluated by Premier League & Bundesliga Standards
              </h3>
              <p className="text-sm text-emerald-100/75 mt-3 leading-relaxed">
                Every trialist at Apex Elite undergoes comprehensive physical profiling, 
                high-speed video tactical analysis, Catapult GPS telemetry, and 1v1 positional mastery assessment.
              </p>
              
              <div className="mt-5 space-y-2.5 text-xs text-emerald-200">
                <div className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00F59B]" />
                  <span>Positional micro-tactics: Half-spaces, pressing triggers, transitional speed</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00F59B]" />
                  <span>Physical testing: 10m/30m split speed, agility T-test, Yo-Yo IR1 endurance</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00F59B]" />
                  <span>Direct submission to Verified Firestore Scout Registry database</span>
                </div>
              </div>
            </div>

            {/* Tactical Pitch Illustration */}
            <div className="w-full lg:w-auto flex-1 max-w-lg">
              <div className="relative aspect-[16/10] bg-[#042016] rounded-2xl border-2 border-emerald-500/30 p-4 shadow-2xl overflow-hidden flex flex-col justify-between">
                {/* Field markings */}
                <div className="absolute inset-0 border-2 border-emerald-500/20 m-2 rounded-lg pointer-events-none" />
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-emerald-500/25 -translate-y-1/2 pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 w-20 h-20 border-2 border-emerald-500/25 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-14 border-b-2 border-x-2 border-emerald-500/25 pointer-events-none" />
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-14 border-t-2 border-x-2 border-emerald-500/25 pointer-events-none" />

                {/* Tactical Nodes on Pitch */}
                <div className="relative z-10 flex justify-center">
                  <div className="px-2.5 py-1 rounded-full bg-emerald-950/90 border border-emerald-400 text-[10px] font-mono text-[#00F59B] shadow flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#00F59B] animate-pulse" />
                    STRIKER ZONE &bull; CLINICAL CONVERSION
                  </div>
                </div>

                <div className="relative z-10 flex justify-around px-4">
                  <div className="px-2 py-0.5 rounded-md bg-emerald-950/80 border border-emerald-500/30 text-[9px] font-mono text-emerald-200">
                    WING TRANSITION
                  </div>
                  <div className="px-2 py-0.5 rounded-md bg-emerald-900/90 border border-[#00F59B] text-[9px] font-mono text-[#00F59B]">
                    MIDFIELD HUB (360&deg; SCAN)
                  </div>
                  <div className="px-2 py-0.5 rounded-md bg-emerald-950/80 border border-emerald-500/30 text-[9px] font-mono text-emerald-200">
                    WING TRANSITION
                  </div>
                </div>

                <div className="relative z-10 flex justify-between items-center px-4">
                  <div className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/30 text-[9px] font-mono text-emerald-300">
                    DEFENSIVE LINE
                  </div>
                  <div className="px-2.5 py-1 rounded-full bg-[#00F59B] text-[#041912] font-bold text-[10px] font-mono shadow">
                    SWEEPER GK
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
