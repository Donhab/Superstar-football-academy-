import React from 'react';
import { Star, ShieldCheck, Award, Quote, CheckCircle2, ChevronRight, User } from 'lucide-react';

interface PresidentSectionProps {
  onRegisterClick: () => void;
}

export const PresidentSection: React.FC<PresidentSectionProps> = ({ onRegisterClick }) => {
  return (
    <section className="py-16 lg:py-20 border-t border-emerald-950/70 bg-[#020e08] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#00F59B]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="glass-panel-glow rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#00F59B]/30 relative overflow-hidden shadow-2xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* President Portrait / Crest Card */}
            <div className="lg:col-span-5 flex flex-col items-center text-center">
              <div className="relative">
                {/* Glowing ring */}
                <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-3xl bg-gradient-to-tr from-[#00F59B] via-emerald-400 to-teal-500 p-1 shadow-2xl shadow-emerald-500/20">
                  <div className="w-full h-full rounded-[22px] bg-[#041a12] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#00F59B_1px,transparent_1px)] [background-size:16px_16px]" />
                    
                    <div className="w-20 h-20 rounded-2xl bg-emerald-950/90 border-2 border-[#00F59B] flex items-center justify-center mb-3 shadow-lg shadow-emerald-900/50">
                      <Star className="w-10 h-10 text-[#00F59B] fill-[#00F59B]/20" />
                    </div>

                    <span className="text-xs font-mono font-bold text-[#00F59B] uppercase tracking-wider">
                      CLUB PRESIDENT
                    </span>
                    <span className="text-xl font-extrabold text-white font-display mt-1">
                      Charles Udende
                    </span>
                    <span className="text-xs font-mono text-emerald-300 font-bold bg-emerald-950/90 px-3 py-0.5 rounded-full border border-emerald-500/30 mt-1">
                      (Karika)
                    </span>
                  </div>
                </div>

                {/* Badge overlay */}
                <div className="absolute -bottom-3 -right-2 px-3 py-1 rounded-full bg-[#00F59B] text-[#041912] font-black text-[10px] font-mono shadow-lg flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  FOUNDER & PATRON
                </div>
              </div>

              <div className="mt-6 flex flex-wrap justify-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500/30 text-[11px] font-mono text-emerald-300">
                  Abuja FCT Football Patron
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500/30 text-[11px] font-mono text-emerald-300">
                  Grassroots Visionary
                </span>
              </div>
            </div>

            {/* Presidential Vision & Message */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/30 text-xs font-mono text-[#00F59B] mb-4">
                <Award className="w-3.5 h-3.5" />
                EXECUTIVE LEADERSHIP & VISION
              </div>

              <h3 className="text-2xl sm:text-4xl font-extrabold text-white font-display leading-tight">
                "Building Nigeria's Next Generation of World-Class Champions."
              </h3>

              <div className="mt-5 relative text-emerald-100/85 text-xs sm:text-sm leading-relaxed space-y-3 font-light">
                <Quote className="w-8 h-8 text-[#00F59B]/20 absolute -top-4 -left-3 -z-10" />
                <p>
                  "Nigeria is blessed with unmatched raw football talent. At <strong className="text-white font-semibold">Superstar Football Academy</strong>, our mandate in Abuja is to elevate this natural gift with world-class tactical discipline, modern sports science, and integrity.
                </p>
                <p>
                  We are not just training players to kick a ball; we are molding elite professionals, future national team stalwarts, and global ambassadors who will represent Nigeria with pride across Europe and worldwide."
                </p>
              </div>

              {/* President's Pillars */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-emerald-200">
                <div className="flex items-center gap-2.5 bg-[#031c12] p-2.5 rounded-xl border border-emerald-500/20">
                  <CheckCircle2 className="w-4 h-4 text-[#00F59B] shrink-0" />
                  <span>Transparent Merit-Based Trial Screening</span>
                </div>
                <div className="flex items-center gap-2.5 bg-[#031c12] p-2.5 rounded-xl border border-emerald-500/20">
                  <CheckCircle2 className="w-4 h-4 text-[#00F59B] shrink-0" />
                  <span>Moshood Abiola Stadium Pitch 1 Operations</span>
                </div>
                <div className="flex items-center gap-2.5 bg-[#031c12] p-2.5 rounded-xl border border-emerald-500/20">
                  <CheckCircle2 className="w-4 h-4 text-[#00F59B] shrink-0" />
                  <span>Direct NPFL & European Scouting Pipelines</span>
                </div>
                <div className="flex items-center gap-2.5 bg-[#031c12] p-2.5 rounded-xl border border-emerald-500/20">
                  <CheckCircle2 className="w-4 h-4 text-[#00F59B] shrink-0" />
                  <span>Character, Education & Safeguarding</span>
                </div>
              </div>

              {/* Signature Block & CTA */}
              <div className="mt-8 pt-5 border-t border-emerald-900/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="font-display font-extrabold text-white text-base">
                    Charles Udende <span className="text-[#00F59B] font-mono text-sm">(Karika)</span>
                  </div>
                  <div className="text-[11px] text-emerald-400 font-mono">
                    President, Superstar Football Academy &bull; Abuja, Nigeria
                  </div>
                </div>

                <button
                  onClick={onRegisterClick}
                  className="px-6 py-3 rounded-xl text-xs font-bold bg-[#00F59B] text-[#041912] hover:bg-[#34f8ac] transition shadow-lg shadow-emerald-500/20 flex items-center gap-2 cursor-pointer"
                >
                  <span>Apply For President's Trials</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
