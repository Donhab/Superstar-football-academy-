import React from 'react';
import { Shield, CheckCircle, Calendar, MapPin, Users, Award, Clock, ArrowRight } from 'lucide-react';

interface AcademyProgramsProps {
  onRegisterClick: () => void;
}

export const AcademyPrograms: React.FC<AcademyProgramsProps> = ({ onRegisterClick }) => {
  return (
    <section className="py-16 lg:py-24 border-t border-emerald-950/60 bg-[#03110b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-[#00F59B] font-mono">
            PATHWAY ARCHITECTURE
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display mt-2">
            Engineered For The Highest Level
          </h2>
          <p className="mt-4 text-emerald-100/75 text-sm sm:text-base leading-relaxed">
            Our syllabus integrates CAF & NFF elite youth methodology, sports science, and competitive showcase fixtures against NPFL reserve squads and European touring scouts.
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
              <span className="text-xs text-emerald-100 font-medium">Club / District representative experience</span>
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
                Targeted preparation for professional contract trials across Nigerian NPFL clubs, European leagues, and US collegiate athletic scholarships.
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

        {/* Trial Days & Schedule info */}
        <div className="mt-14 glass-panel rounded-3xl p-6 sm:p-8 border border-emerald-500/25">
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
                className="w-full md:w-auto px-6 py-3.5 rounded-xl text-sm font-bold bg-[#00F59B] text-[#041912] hover:bg-[#34f8ac] transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
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
