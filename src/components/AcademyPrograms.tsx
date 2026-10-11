import React from 'react';
import { Shield, CheckCircle, Calendar, MapPin, Users, Award, Clock, ArrowRight, Camera, Building2 } from 'lucide-react';

interface AcademyProgramsProps {
  onRegisterClick: () => void;
  trainingGroundsUrl?: string;
  onOpenBrandingModal?: () => void;
}

export const AcademyPrograms: React.FC<AcademyProgramsProps> = ({ 
  onRegisterClick,
  trainingGroundsUrl,
  onOpenBrandingModal 
}) => {
  const defaultFacility = "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80";
  const displayFacility = trainingGroundsUrl || defaultFacility;

  return (
    <section className="py-16 lg:py-24 border-t border-emerald-950/60 bg-[#03110b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-[#00F59B] font-mono">
            PATHWAY ARCHITECTURE & HIGH PERFORMANCE
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display mt-2">
            Engineered For Elite Development
          </h2>
          <p className="mt-4 text-emerald-100/75 text-sm sm:text-base leading-relaxed">
            Our syllabus integrates CAF & NFF youth methodology, sports science, and competitive showcase fixtures against NPFL reserve squads and international European scouts.
          </p>
        </div>

        {/* 3 Core Development Squads */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* U15 Foundation */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-500/20 hover:border-[#00F59B]/50 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-emerald-950 border border-emerald-500/30 text-emerald-300">
                  AGES 13 - 15
                </span>
                <span className="text-[#00F59B] text-xs font-semibold">Tier 1 Youth</span>
              </div>
              <h3 className="text-2xl font-bold text-white font-display mt-4 group-hover:text-[#00F59B] transition-colors">
                U15 Foundation Squad
              </h3>
              <p className="text-xs text-emerald-100/70 mt-2.5 leading-relaxed">
                Refining motor dexterity, two-footed ball mastery, spatial cognition, and small-sided rondos under intense pressure.
              </p>
              
              <ul className="mt-6 space-y-2.5 text-xs text-emerald-200/90">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#00F59B] shrink-0" />
                  <span>3x Tactical on-pitch sessions / week</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#00F59B] shrink-0" />
                  <span>Individual ball control & body mechanics</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#00F59B] shrink-0" />
                  <span>Quarterly scout assessment reports</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-emerald-900/40">
              <span className="text-[11px] text-emerald-400 font-mono block mb-2">TRIAL REQUIREMENT</span>
              <span className="text-xs text-emerald-100 font-medium">Club / District representative experience in Nigeria</span>
            </div>
          </div>

          {/* U18 Elite Pathway */}
          <div className="glass-panel-glow p-6 sm:p-8 rounded-3xl border-2 border-[#00F59B]/40 hover:border-[#00F59B] transition-all flex flex-col justify-between relative shadow-2xl group">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#00F59B] text-[#041912] text-[10px] font-extrabold uppercase tracking-wider shadow">
              FLAGSHIP PROGRAM
            </div>

            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-[#042016] border border-emerald-400/40 text-[#00F59B]">
                  AGES 16 - 18
                </span>
                <span className="text-[#00F59B] text-xs font-semibold">Pro Stepping Stone</span>
              </div>
              <h3 className="text-2xl font-bold text-white font-display mt-4 group-hover:text-[#00F59B] transition-colors">
                U18 Elite Academy
              </h3>
              <p className="text-xs text-emerald-100/70 mt-2.5 leading-relaxed">
                Full-time tactical immersion, GPS vest monitoring, position-specific masterclasses, and NPFL youth league showcases.
              </p>

              <ul className="mt-6 space-y-2.5 text-xs text-emerald-200/90">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#00F59B] shrink-0" />
                  <span>Daily training + Strength & Conditioning gym</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#00F59B] shrink-0" />
                  <span>Direct tactical video analysis breakdowns</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#00F59B] shrink-0" />
                  <span>Official showcase matches vs NPFL academies & scouts</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-emerald-900/40">
              <span className="text-[11px] text-[#00F59B] font-mono block mb-2">TRIAL REQUIREMENT</span>
              <span className="text-xs text-emerald-100 font-medium">State youth team / Academy trialist baseline</span>
            </div>
          </div>

          {/* U21 Pro Showcase */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-500/20 hover:border-[#00F59B]/50 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-emerald-950 border border-emerald-500/30 text-emerald-300">
                  AGES 19 - 21
                </span>
                <span className="text-[#00F59B] text-xs font-semibold">Contract Ready</span>
              </div>
              <h3 className="text-2xl font-bold text-white font-display mt-4 group-hover:text-[#00F59B] transition-colors">
                U21 Pro Showcase Squad
              </h3>
              <p className="text-xs text-emerald-100/70 mt-2.5 leading-relaxed">
                Targeted preparation for professional contract trials across Nigerian NPFL clubs, European leagues, and international showcases.
              </p>

              <ul className="mt-6 space-y-2.5 text-xs text-emerald-200/90">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#00F59B] shrink-0" />
                  <span>FIFA / NFF licensed agent & scout showcase days</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#00F59B] shrink-0" />
                  <span>High-intensity tactical periodization</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#00F59B] shrink-0" />
                  <span>Verified physical dossier sent to European clubs</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-emerald-900/40">
              <span className="text-[11px] text-emerald-400 font-mono block mb-2">TRIAL REQUIREMENT</span>
              <span className="text-xs text-emerald-100 font-medium">Proven competitive youth or state league pedigree</span>
            </div>
          </div>

        </div>

        {/* IMAGE FRAME: Training Ground & Performance Centre Image Card */}
        <div className="mt-14 rounded-3xl overflow-hidden border border-emerald-500/30 glass-panel-glow relative group">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            {/* Visual Image Frame */}
            <div className="lg:col-span-7 h-64 sm:h-80 relative overflow-hidden bg-emerald-950">
              <img 
                src={displayFacility} 
                alt="Superstar Football Academy Training Facilities" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#041a12]/90 hidden lg:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#041a12] via-transparent to-transparent lg:hidden" />

              {/* Admin Camera upload button */}
              {onOpenBrandingModal && (
                <button
                  onClick={onOpenBrandingModal}
                  title="Change Training Facility Image Frame"
                  className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/75 hover:bg-[#00F59B] text-white hover:text-[#041912] border border-emerald-400/50 text-xs font-bold transition shadow cursor-pointer opacity-90 group-hover:opacity-100"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Change Facility Image</span>
                </button>
              )}

              <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-sm border border-emerald-500/30 text-[11px] font-mono text-[#00F59B]">
                SUPERSTAR PERFORMANCE GROUNDS &bull; ABUJA
              </div>
            </div>

            {/* Description & Specifications */}
            <div className="lg:col-span-5 p-6 sm:p-8 space-y-4 bg-[#03150e]">
              <span className="text-xs font-mono font-bold text-[#00F59B] uppercase tracking-wider block">
                FACILITIES & SPORTS SCIENCE
              </span>
              <h3 className="text-2xl font-bold text-white font-display">
                World-Class Infrastructure in the Capital
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/75 leading-relaxed">
                Superstar Football Academy provides floodlit grass pitches, high-performance biometric gym, hydrotherapy recovery baths, and dedicated tactical video analysis suites.
              </p>

              <div className="space-y-2 pt-2 text-xs text-emerald-200">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#00F59B]" />
                  <span>Package B Main & Practice Natural Turf Pitches</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#00F59B]" />
                  <span>On-site Medical, Physiotherapy & Safeguarding Clinic</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Trial Days & Schedule info */}
        <div className="mt-10 glass-panel rounded-3xl p-6 sm:p-8 border border-emerald-500/25">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 text-xs font-mono mb-3 border border-emerald-500/30">
                <Calendar className="w-3.5 h-3.5 text-[#00F59B]" />
                UPCOMING OPEN TRIAL CALENDAR
              </div>
              <h4 className="text-xl sm:text-2xl font-bold text-white font-display">
                Abuja FCT & Regional Talent Assessments
              </h4>
              <p className="text-xs sm:text-sm text-emerald-100/75 mt-2 max-w-xl">
                Candidates must submit their application online through our public portal. 
                Selected trialists will receive formal SMS & email confirmation with pitch entry accreditation.
              </p>
              
              <div className="mt-4 flex flex-wrap gap-4 text-xs text-emerald-200">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#00F59B]" />
                  <span>Moshood Abiola National Stadium (Package B), Abuja</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#00F59B]" />
                  <span>Morning Session: 08:30 &bull; Afternoon: 15:00</span>
                </div>
              </div>
            </div>

            <div className="flex md:justify-end">
              <button
                onClick={onRegisterClick}
                className="w-full md:w-auto px-6 py-3.5 rounded-xl text-sm font-bold bg-[#00F59B] text-[#041912] hover:bg-[#34f8ac] transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer"
              >
                <span>Register Player Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
