import React from 'react';
import { Star, ShieldCheck, Award, Quote, CheckCircle2, ChevronRight, User, Camera } from 'lucide-react';

interface PresidentSectionProps {
  onRegisterClick: () => void;
  presidentPhotoUrl?: string;
  onOpenBrandingModal?: () => void;
}

export const PresidentSection: React.FC<PresidentSectionProps> = ({ 
  onRegisterClick, 
  presidentPhotoUrl,
  onOpenBrandingModal 
}) => {
  return (
    <section className="py-16 lg:py-20 border-t border-emerald-950/70 bg-[#020e08] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#00F59B]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="glass-panel-glow rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#00F59B]/30 relative overflow-hidden shadow-2xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* President Portrait / Crest Card */}
            <div className="lg:col-span-5 flex flex-col items-center text-center">
              <div className="relative group">
                {/* Glowing ring */}
                <div className="w-52 h-60 sm:w-60 sm:h-72 rounded-3xl bg-gradient-to-tr from-[#00F59B] via-emerald-400 to-teal-500 p-1 shadow-2xl shadow-emerald-500/20">
                  <div className="w-full h-full rounded-[22px] bg-[#041a12] flex flex-col items-center justify-between p-4 text-center relative overflow-hidden">
                    
                    {/* Portrait Photo Frame */}
                    <div className="w-full h-44 sm:h-52 rounded-2xl overflow-hidden bg-emerald-950 relative border border-emerald-500/30">
                      {presidentPhotoUrl ? (
                        <img 
                          src={presidentPhotoUrl} 
                          alt="Charles Udende (Karika)" 
                          className="w-full h-full object-cover object-top transition-transform group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-[#06291d] to-[#041912]">
                          <User className="w-16 h-16 text-[#00F59B]/60 mb-2" />
                          <span className="text-[11px] font-mono text-emerald-300">Official Portrait</span>
                        </div>
                      )}

                      {/* Quick upload trigger button on portrait */}
                      {onOpenBrandingModal && (
                        <button
                          onClick={onOpenBrandingModal}
                          title="Change President Portrait Image"
                          className="absolute bottom-2 right-2 p-2 rounded-xl bg-black/75 hover:bg-[#00F59B] text-white hover:text-[#041912] border border-emerald-500/40 transition-all opacity-80 group-hover:opacity-100 shadow cursor-pointer"
                        >
                          <Camera className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="pt-2 pb-1">
                      <div className="text-base sm:text-lg font-extrabold text-white font-display">
                        Charles Udende <span className="text-[#00F59B] font-mono text-xs">(Karika)</span>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-300 font-bold uppercase tracking-wider block">
                        Club President & Founder
                      </span>
                    </div>

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
