import React, { useState, useRef } from 'react';
import { Footballer, PlayerStatus } from '../types';
import { fileToOptimizedDataUrl } from '../services/brandingService';
import { 
  X, 
  Shield, 
  Calendar, 
  Ruler, 
  Phone, 
  Mail, 
  HeartHandshake, 
  FileText, 
  Edit3, 
  Check, 
  Clock, 
  Award,
  Sparkles,
  Share2,
  Trash2,
  Camera,
  Upload,
  User
} from 'lucide-react';

interface PlayerDossierModalProps {
  player: Footballer;
  onClose: () => void;
  onUpdateStatus: (id: string, newStatus: PlayerStatus, scoutNotes?: string) => Promise<void>;
  onDeleteRequest: (player: Footballer) => void;
  onUpdatePhoto?: (id: string, photoUrl: string) => Promise<void>;
}

export const PlayerDossierModal: React.FC<PlayerDossierModalProps> = ({
  player,
  onClose,
  onUpdateStatus,
  onDeleteRequest,
  onUpdatePhoto,
}) => {
  const [currentStatus, setCurrentStatus] = useState<PlayerStatus>(player.status);
  const [notes, setNotes] = useState(player.scoutNotes || '');
  const [playerPhoto, setPlayerPhoto] = useState(player.photoUrl || '');
  const [isSavingNotes, setIsSavingNotes] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [notesSavedToast, setNotesSavedToast] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value as PlayerStatus;
    setCurrentStatus(val);
    await onUpdateStatus(player.id, val, notes);
  };

  const handleSaveNotes = async () => {
    setIsSavingNotes(true);
    await onUpdateStatus(player.id, currentStatus, notes);
    setIsSavingNotes(false);
    setNotesSavedToast(true);
    setTimeout(() => setNotesSavedToast(false), 2500);
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingPhoto(true);
    try {
      const dataUrl = await fileToOptimizedDataUrl(file, 500, 500, 0.85);
      setPlayerPhoto(dataUrl);
      if (onUpdatePhoto) {
        await onUpdatePhoto(player.id, dataUrl);
      }
    } catch (err) {
      console.error('Failed to update photo:', err);
    } finally {
      setIsUploadingPhoto(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const getStatusBadge = (status: PlayerStatus) => {
    switch (status) {
      case 'Active Academy Member':
        return 'bg-emerald-500/20 text-[#00F59B] border-emerald-500/40';
      case 'Accepted':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
      case 'Pending Trial':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'Declined':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      default:
        return 'bg-emerald-950 text-emerald-300 border-emerald-500/30';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-panel-glow max-w-2xl w-full rounded-3xl border border-emerald-500/40 overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
        
        {/* Hidden File Input for Player Photo */}
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handlePhotoUpload} 
          accept="image/*" 
          className="hidden" 
        />

        {/* Header Banner */}
        <div className="relative bg-gradient-to-r from-[#042016] via-[#063323] to-[#042016] p-6 border-b border-emerald-500/20 flex items-start justify-between">
          <div className="flex items-center gap-4">
            {/* Player Image Frame */}
            <div className="relative group">
              <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-emerald-400 to-[#00F59B] p-0.5 shadow-lg overflow-hidden shrink-0">
                <div className="w-full h-full bg-[#041912] rounded-[14px] flex items-center justify-center overflow-hidden">
                  {playerPhoto ? (
                    <img 
                      src={playerPhoto} 
                      alt={player.fullName} 
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <span className="font-display font-black text-2xl text-[#00F59B]">
                      {player.squadNumber || player.fullName.charAt(0)}
                    </span>
                  )}
                </div>
              </div>

              {/* Upload badge on player photo */}
              <div className="absolute -bottom-1 -right-1 flex gap-1">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  title="Change or upload player photo"
                  className="p-1.5 rounded-lg bg-[#00F59B] text-[#041912] hover:bg-white transition shadow cursor-pointer"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
                {playerPhoto && (
                  <button
                    type="button"
                    onClick={async () => {
                      setPlayerPhoto('');
                      if (onUpdatePhoto) {
                        await onUpdatePhoto(player.id, '');
                      }
                    }}
                    title="Remove player photo"
                    className="p-1.5 rounded-lg bg-rose-900/80 text-rose-200 hover:bg-rose-800 transition shadow cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-extrabold text-white font-display">
                  {player.fullName}
                </h3>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(currentStatus)}`}>
                  {currentStatus}
                </span>
              </div>
              <p className="text-xs text-emerald-300/80 font-mono mt-1">
                REF: {player.id} &bull; Registered {new Date(player.createdAt).toLocaleDateString()}
              </p>
              {isUploadingPhoto && (
                <span className="text-[11px] text-[#00F59B] font-mono animate-pulse">Uploading photo...</span>
              )}
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-emerald-950/80 text-emerald-400 hover:text-white hover:bg-emerald-900 border border-emerald-500/30 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-2xl bg-[#041a12] border border-emerald-500/20">
              <span className="text-[10px] font-mono text-emerald-400 uppercase">POSITION</span>
              <p className="text-sm font-bold text-white mt-0.5">{player.position}</p>
            </div>

            <div className="p-3 rounded-2xl bg-[#041a12] border border-emerald-500/20">
              <span className="text-[10px] font-mono text-emerald-400 uppercase">PREFERRED FOOT</span>
              <p className="text-sm font-bold text-white mt-0.5">{player.preferredFoot}</p>
            </div>

            <div className="p-3 rounded-2xl bg-[#041a12] border border-emerald-500/20">
              <span className="text-[10px] font-mono text-emerald-400 uppercase">HEIGHT</span>
              <p className="text-sm font-bold text-white mt-0.5">{player.height} cm</p>
            </div>

            <div className="p-3 rounded-2xl bg-[#041a12] border border-emerald-500/20">
              <span className="text-[10px] font-mono text-emerald-400 uppercase">AGE / DOB</span>
              <p className="text-sm font-bold text-white mt-0.5">{player.age} yrs ({player.dob})</p>
            </div>
          </div>

          {/* Contact Details */}
          <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/20 space-y-2.5">
            <span className="text-xs font-mono font-bold text-[#00F59B] uppercase flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" />
              DIRECT CONTACTS
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2 text-emerald-200">
                <span className="text-emerald-400 font-medium">Phone:</span>
                <a href={`tel:${player.phone}`} className="hover:underline text-white font-mono">{player.phone}</a>
              </div>
              <div className="flex items-center gap-2 text-emerald-200">
                <span className="text-emerald-400 font-medium">Email:</span>
                <a href={`mailto:${player.email}`} className="hover:underline text-white">{player.email}</a>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="pt-2 border-t border-emerald-900/50 mt-2 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
              <div className="flex items-center gap-1.5 text-amber-300">
                <HeartHandshake className="w-3.5 h-3.5" />
                <span className="font-semibold">Emergency Contact:</span>
                <span className="text-white">{player.emergencyContactName} ({player.emergencyContactRelation || 'Guardian'})</span>
              </div>
              <span className="font-mono text-emerald-300">{player.emergencyContactPhone}</span>
            </div>
          </div>

          {/* Bio / Playing History */}
          <div>
            <span className="text-xs font-mono font-bold text-[#00F59B] uppercase block mb-2 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" />
              BIO & COMPETITIVE HISTORY
            </span>
            <div className="p-4 rounded-2xl bg-[#041a12] border border-emerald-500/20 text-xs sm:text-sm text-emerald-100/90 leading-relaxed whitespace-pre-wrap">
              {player.bio || "No specific playing history provided by candidate."}
            </div>
          </div>

          {/* Scout Notes & Evaluation */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-[#00F59B] uppercase flex items-center gap-1.5">
                <Edit3 className="w-3.5 h-3.5" />
                COACH & SCOUT ASSESSMENT NOTES
              </span>
              {notesSavedToast && (
                <span className="text-[11px] text-[#00F59B] font-bold flex items-center gap-1 animate-pulse">
                  <Check className="w-3.5 h-3.5" /> Saved to database!
                </span>
              )}
            </div>

            <textarea
              rows={3}
              placeholder="Add technical trial evaluation, tactical strengths, work rate remarks, test scores..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-3 rounded-xl glass-input text-xs sm:text-sm text-white placeholder-emerald-700 resize-none"
            />
            
            <div className="mt-2 flex justify-end">
              <button
                type="button"
                onClick={handleSaveNotes}
                disabled={isSavingNotes}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-800 hover:bg-emerald-700 text-white transition-all flex items-center gap-1.5 cursor-pointer"
              >
                {isSavingNotes ? 'Saving...' : 'Save Scout Notes'}
              </button>
            </div>
          </div>

          {/* Status Changer Bar */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950 to-teal-950 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <label className="text-xs font-bold text-white block">Update Academy Status</label>
              <span className="text-[11px] text-emerald-300">Synchronizes directly to the Firestore collection</span>
            </div>

            <select
              value={currentStatus}
              onChange={handleStatusChange}
              className="px-3 py-2 rounded-xl glass-input text-xs font-bold text-white bg-[#041912] cursor-pointer"
            >
              <option value="Pending Trial">Pending Trial</option>
              <option value="Accepted">Accepted</option>
              <option value="Active Academy Member">Active Academy Member</option>
              <option value="Declined">Declined</option>
            </select>
          </div>

        </div>

        {/* Footer actions */}
        <div className="p-4 bg-[#03140e] border-t border-emerald-950 flex items-center justify-between">
          <button
            onClick={() => {
              onClose();
              onDeleteRequest(player);
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-rose-400 hover:text-rose-200 hover:bg-rose-950/40 border border-rose-500/20 transition-all cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete Player</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-[#00F59B] text-[#041912] hover:bg-[#34f8ac] transition-all cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
