import React, { useState } from 'react';
import { PlayerPosition, PreferredFoot } from '../types';
import { registerFootballer, calculateAge } from '../firebase';
import confetti from 'canvas-confetti';
import { 
  UserPlus, 
  Sparkles, 
  Shield, 
  Phone, 
  Mail, 
  User, 
  Calendar, 
  Ruler, 
  HeartHandshake, 
  FileText, 
  CheckCircle2, 
  Flame, 
  ChevronRight,
  Crosshair,
  Compass,
  ShieldAlert,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

interface RegistrationFormProps {
  onSuccess: (newPlayerId: string) => void;
  onGoToAdmin: () => void;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSuccess, onGoToAdmin }) => {
  // Form State
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('2007-05-15');
  const [position, setPosition] = useState<PlayerPosition>('Midfielder');
  const [preferredFoot, setPreferredFoot] = useState<PreferredFoot>('Right');
  const [height, setHeight] = useState<number>(180);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [emergencyContactName, setEmergencyContactName] = useState('');
  const [emergencyContactPhone, setEmergencyContactPhone] = useState('');
  const [emergencyContactRelation, setEmergencyContactRelation] = useState('Parent/Guardian');
  const [bio, setBio] = useState('');

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [createdPlayerId, setCreatedPlayerId] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const calculatedAge = calculateAge(dob);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Basic validation
    if (!fullName.trim()) {
      setErrorMsg('Please enter the player full name.');
      return;
    }
    if (!dob) {
      setErrorMsg('Please provide a valid date of birth.');
      return;
    }
    if (!phone.trim() || !email.trim()) {
      setErrorMsg('Please provide both phone number and email address.');
      return;
    }
    if (!emergencyContactName.trim() || !emergencyContactPhone.trim()) {
      setErrorMsg('Please provide emergency contact name and phone number for trial safety.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Write operation to Firestore collection "footballers", status saved as "Pending Trial"
      const docId = await registerFootballer({
        fullName: fullName.trim(),
        dob,
        age: calculatedAge,
        position,
        preferredFoot,
        height: Number(height),
        phone: phone.trim(),
        email: email.trim(),
        emergencyContactName: emergencyContactName.trim(),
        emergencyContactPhone: emergencyContactPhone.trim(),
        emergencyContactRelation: emergencyContactRelation.trim(),
        bio: bio.trim(),
        status: 'Pending Trial'
      });

      // Confetti burst
      confetti({
        particleCount: 110,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00F59B', '#10B981', '#064e3b', '#ffffff']
      });

      setCreatedPlayerId(docId);
      setShowSuccessModal(true);
      onSuccess(docId);
    } catch (err: any) {
      console.error('Registration submission error:', err);
      setErrorMsg(err?.message || 'Failed to submit registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setFullName('');
    setDob('2007-05-15');
    setPosition('Midfielder');
    setPreferredFoot('Right');
    setHeight(180);
    setPhone('');
    setEmail('');
    setEmergencyContactName('');
    setEmergencyContactPhone('');
    setBio('');
    setShowSuccessModal(false);
    setCreatedPlayerId(null);
  };

  return (
    <div className="py-12 lg:py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-mono mb-3">
          <UserPlus className="w-3.5 h-3.5 text-[#00F59B]" />
          OFFICIAL TALENT ENTRY PORTAL
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
          Trial Registration
        </h2>
        <p className="mt-3 text-sm text-emerald-100/75">
          Submit candidate player credentials for evaluation by the Apex Elite scouting panel. 
          Applications are logged directly to the live academy Firestore registry.
        </p>
      </div>

      {/* Main Glass Card Form */}
      <div className="glass-panel-glow rounded-3xl p-6 sm:p-10 border border-emerald-500/30 relative shadow-2xl">
        
        {errorMsg && (
          <div className="mb-6 p-4 rounded-xl bg-red-950/80 border border-red-500/40 text-red-200 text-sm flex items-center gap-3">
            <ShieldAlert className="w-5 h-5 text-red-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* SECTION 1: Player Identity */}
          <div>
            <div className="flex items-center gap-2.5 mb-4 pb-2 border-b border-emerald-900/50">
              <User className="w-4 h-4 text-[#00F59B]" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-300 font-mono">
                1. Player Identity & Age Verification
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-medium text-emerald-200 mb-1.5">
                  Full Name <span className="text-[#00F59B]">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g. Marcus Rashford"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl glass-input text-sm placeholder-emerald-700 font-medium"
                  />
                </div>
              </div>

              {/* Date of Birth */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-medium text-emerald-200">
                    Date of Birth <span className="text-[#00F59B]">*</span>
                  </label>
                  <span className="text-[11px] font-mono text-[#00F59B] font-semibold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                    Calculated Age: {calculatedAge} yrs
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="date"
                    required
                    min="2003-01-01"
                    max="2014-12-31"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl glass-input text-sm text-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: Tactical Profile & Position */}
          <div>
            <div className="flex items-center gap-2.5 mb-4 pb-2 border-b border-emerald-900/50">
              <Crosshair className="w-4 h-4 text-[#00F59B]" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-300 font-mono">
                2. Tactical Role & Physical Specifications
              </h3>
            </div>

            {/* Position Selector Cards */}
            <div className="mb-5">
              <label className="block text-xs font-medium text-emerald-200 mb-2">
                Primary Position <span className="text-[#00F59B]">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { pos: 'Striker' as PlayerPosition, role: 'Forward / Winger', code: 'FWD' },
                  { pos: 'Midfielder' as PlayerPosition, role: 'Central / Playmaker', code: 'MID' },
                  { pos: 'Defender' as PlayerPosition, role: 'Center-back / Full-back', code: 'DEF' },
                  { pos: 'Goalkeeper' as PlayerPosition, role: 'Shot-stopper / Sweeper', code: 'GK' }
                ].map((item) => {
                  const isSelected = position === item.pos;
                  return (
                    <button
                      key={item.pos}
                      type="button"
                      onClick={() => setPosition(item.pos)}
                      className={`p-3.5 rounded-xl border text-left transition-all relative overflow-hidden ${
                        isSelected
                          ? 'bg-emerald-900/80 border-[#00F59B] shadow-lg shadow-emerald-500/20 text-white'
                          : 'bg-[#041a12]/60 border-emerald-500/20 text-emerald-200/80 hover:border-emerald-500/40 hover:bg-[#06241a]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-[#00F59B]">{item.code}</span>
                        {isSelected && (
                          <div className="w-2 h-2 rounded-full bg-[#00F59B] shadow-sm shadow-[#00F59B]" />
                        )}
                      </div>
                      <div className="text-sm font-bold mt-2 font-display">{item.pos}</div>
                      <div className="text-[11px] text-emerald-300/70 mt-0.5 truncate">{item.role}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
              {/* Preferred Foot */}
              <div>
                <label className="block text-xs font-medium text-emerald-200 mb-2">
                  Preferred Foot <span className="text-[#00F59B]">*</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Left', 'Right', 'Both'] as PreferredFoot[]).map((foot) => {
                    const isSelected = preferredFoot === foot;
                    return (
                      <button
                        key={foot}
                        type="button"
                        onClick={() => setPreferredFoot(foot)}
                        className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all text-center ${
                          isSelected
                            ? 'bg-[#00F59B] text-[#041912] border-[#00F59B] shadow-md shadow-emerald-500/30 font-extrabold'
                            : 'glass-input text-emerald-200 hover:border-emerald-500/40'
                        }`}
                      >
                        {foot} {foot === 'Both' ? '🦶🦶' : '⚽'}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Height Slider & Input */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-medium text-emerald-200">
                    Height (cm) <span className="text-[#00F59B]">*</span>
                  </label>
                  <span className="text-xs font-mono font-bold text-[#00F59B]">
                    {height} cm ({(height / 100).toFixed(2)} m)
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={150}
                    max={205}
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className="flex-1 accent-[#00F59B] cursor-pointer"
                  />
                  <input
                    type="number"
                    min={140}
                    max={215}
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className="w-20 px-2.5 py-1.5 rounded-lg glass-input text-xs font-mono text-center font-bold text-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 3: Contact & Emergency Information */}
          <div>
            <div className="flex items-center gap-2.5 mb-4 pb-2 border-b border-emerald-900/50">
              <Phone className="w-4 h-4 text-[#00F59B]" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-300 font-mono">
                3. Direct & Emergency Contacts
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="block text-xs font-medium text-emerald-200 mb-1.5">
                  Player Phone Number <span className="text-[#00F59B]">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+44 7700 900000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl glass-input text-sm placeholder-emerald-700"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-emerald-200 mb-1.5">
                  Player Email Address <span className="text-[#00F59B]">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="player@talentpool.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl glass-input text-sm placeholder-emerald-700"
                />
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/20">
              <div className="flex items-center gap-2 text-xs font-bold text-[#00F59B] mb-3">
                <HeartHandshake className="w-4 h-4" />
                <span>Emergency Contact (Parent / Guardian / Coach)</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Contact Full Name"
                    value={emergencyContactName}
                    onChange={(e) => setEmergencyContactName(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg glass-input text-xs placeholder-emerald-700"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    required
                    placeholder="Contact Phone Number"
                    value={emergencyContactPhone}
                    onChange={(e) => setEmergencyContactPhone(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg glass-input text-xs placeholder-emerald-700"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Relationship (e.g. Mother, Father, Agent)"
                    value={emergencyContactRelation}
                    onChange={(e) => setEmergencyContactRelation(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg glass-input text-xs placeholder-emerald-700"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 4: Short Bio & Playing History */}
          <div>
            <div className="flex items-center gap-2.5 mb-4 pb-2 border-b border-emerald-900/50">
              <FileText className="w-4 h-4 text-[#00F59B]" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-300 font-mono">
                4. Playing History & Scout Bio
              </h3>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-emerald-200">
                  Bio / Previous Clubs / Key Achievements
                </label>
                <span className="text-[11px] font-mono text-emerald-400">
                  {bio.length} / 500 chars
                </span>
              </div>
              <textarea
                rows={4}
                maxLength={500}
                placeholder="Mention previous youth academies, representative honors, primary attributes (e.g. sprint burst, aerial dominance, set pieces, dribbling), and current club team..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full p-4 rounded-xl glass-input text-sm placeholder-emerald-700 resize-none"
              />
            </div>
          </div>

          {/* Submission Notice & Button */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-emerald-300/80 flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#00F59B]" />
              <span>Registered records will be tagged as <strong>"Pending Trial"</strong> in Firestore.</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-bold bg-[#00F59B] text-[#041912] hover:bg-[#34f8ac] disabled:opacity-50 transition-all shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2.5 group cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#041912] border-t-transparent rounded-full animate-spin" />
                  <span>Submitting to Firestore...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Submit Trial Registration</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>

        </form>
      </div>

      {/* SUCCESS NOTIFICATION MODAL */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="glass-panel-glow max-w-lg w-full rounded-3xl p-6 sm:p-8 border-2 border-[#00F59B]/50 text-center relative shadow-2xl">
            
            <div className="w-16 h-16 rounded-2xl bg-emerald-950/90 border border-[#00F59B] text-[#00F59B] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/30">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#00F59B] bg-emerald-950 px-3 py-1 rounded-full border border-emerald-500/30">
              REGISTRATION LOGGED &bull; STATUS: PENDING TRIAL
            </span>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-3">
              Application Received!
            </h3>

            <p className="text-sm text-emerald-100/80 mt-2">
              Welcome to the talent pool, <span className="font-bold text-white">{fullName}</span>. 
              Your profile has been successfully saved to the Academy Firestore registry.
            </p>

            {/* Trial Pass Card */}
            <div className="mt-5 p-4 rounded-2xl bg-[#042016] border border-emerald-500/30 text-left font-mono text-xs space-y-2">
              <div className="flex justify-between items-center text-emerald-300">
                <span>REFERENCE ID:</span>
                <span className="font-bold text-[#00F59B]">{createdPlayerId}</span>
              </div>
              <div className="flex justify-between items-center text-emerald-300">
                <span>POSITION:</span>
                <span className="text-white font-sans font-bold">{position} ({preferredFoot} Foot)</span>
              </div>
              <div className="flex justify-between items-center text-emerald-300">
                <span>STATUS:</span>
                <span className="px-2 py-0.5 rounded bg-amber-950/80 border border-amber-500/40 text-amber-300 font-sans font-bold">
                  Pending Trial
                </span>
              </div>
              <div className="flex justify-between items-center text-emerald-300">
                <span>ASSESSMENT VENUE:</span>
                <span className="text-white font-sans">Apex Elite Centre, Pitch A</span>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={onGoToAdmin}
                className="w-full sm:w-1/2 py-3 px-4 rounded-xl text-xs font-bold bg-[#00F59B] text-[#041912] hover:bg-[#34f8ac] transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
              >
                <span>View In Admin Panel</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleResetForm}
                className="w-full sm:w-1/2 py-3 px-4 rounded-xl text-xs font-semibold glass-panel text-emerald-200 hover:text-white hover:bg-emerald-950/60 transition-all"
              >
                Register Another Player
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
