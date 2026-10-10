import React, { useState } from 'react';
import { FirebaseConnectionConfig } from '../types';
import { 
  DEFAULT_FIREBASE_CONFIG, 
  getStoredFirebaseConfig, 
  saveStoredFirebaseConfig, 
  initializeFirebaseService,
  isFirebaseConfigured
} from '../firebase';
import { 
  Database, 
  X, 
  Copy, 
  Check, 
  ExternalLink, 
  ShieldCheck, 
  KeyRound, 
  RefreshCw,
  Info
} from 'lucide-react';

interface FirebaseConfigModalProps {
  onClose: () => void;
  onConfigSaved: () => void;
}

export const FirebaseConfigModal: React.FC<FirebaseConfigModalProps> = ({ onClose, onConfigSaved }) => {
  const [config, setConfig] = useState<FirebaseConnectionConfig>(getStoredFirebaseConfig());
  const [copiedRules, setCopiedRules] = useState(false);
  const [copiedTemplate, setCopiedTemplate] = useState(false);
  const [testResult, setTestResult] = useState<{ status: 'idle' | 'testing' | 'live' | 'mock'; msg?: string }>({ status: 'idle' });

  const isConfigured = isFirebaseConfigured(config);

  const handleSave = () => {
    saveStoredFirebaseConfig(config);
    const result = initializeFirebaseService();
    if (result.isLive) {
      setTestResult({ status: 'live', msg: 'Successfully connected to live Firebase Firestore!' });
    } else {
      setTestResult({ 
        status: 'mock', 
        msg: isFirebaseConfigured(config) 
          ? `Could not reach Firestore (${result.error || 'Check network / rules'}). Running in local fallback mode.`
          : 'Placeholder credentials detected. Running in seamless Local Storage fallback mode.' 
      });
    }
    onConfigSaved();
  };

  const handleResetToPlaceholders = () => {
    setConfig(DEFAULT_FIREBASE_CONFIG);
    saveStoredFirebaseConfig(DEFAULT_FIREBASE_CONFIG);
    initializeFirebaseService();
    setTestResult({ status: 'mock', msg: 'Reset to default placeholders. Running in local fallback mode.' });
    onConfigSaved();
  };

  const firestoreRulesSnippet = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /footballers/{footballerId} {
      allow read, write: if true;
    }
  }
}`;

  const copyRules = () => {
    navigator.clipboard.writeText(firestoreRulesSnippet);
    setCopiedRules(true);
    setTimeout(() => setCopiedRules(false), 2000);
  };

  const copyConfigTemplate = () => {
    const jsonStr = JSON.stringify(DEFAULT_FIREBASE_CONFIG, null, 2);
    navigator.clipboard.writeText(jsonStr);
    setCopiedTemplate(true);
    setTimeout(() => setCopiedTemplate(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-panel-glow max-w-2xl w-full rounded-3xl border border-emerald-500/30 overflow-hidden shadow-2xl max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-[#042016] to-[#063323] border-b border-emerald-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-400 text-[#00F59B] flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-display">
                Firebase Firestore Settings
              </h3>
              <p className="text-xs text-emerald-300/80">
                Configure live Firebase credentials or use local mock persistence
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-emerald-950/80 text-emerald-400 hover:text-white border border-emerald-500/30"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs">
          
          {/* Status banner */}
          <div className={`p-4 rounded-2xl border flex items-start gap-3 ${
            isConfigured 
              ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-200' 
              : 'bg-amber-950/40 border-amber-500/30 text-amber-200'
          }`}>
            <Info className="w-5 h-5 shrink-0 mt-0.5 text-[#00F59B]" />
            <div className="space-y-1">
              <span className="font-bold block">
                {isConfigured ? 'Custom Firebase Credentials Configured' : 'Using Placeholder Credentials & Local Storage'}
              </span>
              <p className="text-[11px] leading-relaxed opacity-90">
                The application works immediately out-of-the-box with full real-time subscription emulation. 
                To write to your real Google Cloud Firebase project, paste your credentials below.
              </p>
            </div>
          </div>

          {/* Configuration Form Inputs */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-300 uppercase tracking-wider font-mono">
                Project Credentials
              </span>
              <button
                type="button"
                onClick={copyConfigTemplate}
                className="text-[#00F59B] hover:underline flex items-center gap-1 font-mono text-[11px]"
              >
                {copiedTemplate ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                Copy JSON Template
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-emerald-400 font-medium mb-1">API Key</label>
                <input
                  type="text"
                  placeholder="AIzaSy..."
                  value={config.apiKey}
                  onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg glass-input font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-emerald-400 font-medium mb-1">Project ID</label>
                <input
                  type="text"
                  placeholder="superstar-football-academy"
                  value={config.projectId}
                  onChange={(e) => setConfig({ ...config, projectId: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg glass-input font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-emerald-400 font-medium mb-1">Auth Domain</label>
                <input
                  type="text"
                  placeholder="superstar-football-academy.firebaseapp.com"
                  value={config.authDomain}
                  onChange={(e) => setConfig({ ...config, authDomain: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg glass-input font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-emerald-400 font-medium mb-1">App ID</label>
                <input
                  type="text"
                  placeholder="1:123456789:web:abcdef"
                  value={config.appId}
                  onChange={(e) => setConfig({ ...config, appId: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg glass-input font-mono text-[11px]"
                />
              </div>
            </div>
          </div>

          {/* Test feedback */}
          {testResult.msg && (
            <div className={`p-3 rounded-xl border text-xs font-mono ${
              testResult.status === 'live' 
                ? 'bg-emerald-950 border-emerald-400 text-[#00F59B]' 
                : 'bg-emerald-950/70 border-emerald-500/30 text-emerald-200'
            }`}>
              {testResult.msg}
            </div>
          )}

          {/* Firestore Security Rules Guide */}
          <div className="p-4 rounded-2xl bg-[#041a12] border border-emerald-500/20 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#00F59B]" />
                Recommended Firestore Security Rules
              </span>
              <button
                type="button"
                onClick={copyRules}
                className="text-[#00F59B] hover:underline flex items-center gap-1 font-mono text-[11px]"
              >
                {copiedRules ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                Copy Rules
              </button>
            </div>
            <pre className="p-3 rounded-xl bg-black/60 border border-emerald-950 font-mono text-[11px] text-emerald-300 overflow-x-auto">
              {firestoreRulesSnippet}
            </pre>
            <p className="text-[11px] text-emerald-400/80">
              Paste these rules into your Firebase Console under: <strong>Firestore Database &gt; Rules</strong>.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-[#03140e] border-t border-emerald-950 flex items-center justify-between">
          <button
            onClick={handleResetToPlaceholders}
            className="text-xs text-emerald-400 hover:text-white flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset to Placeholders
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold glass-panel text-emerald-200 hover:bg-emerald-950/60"
            >
              Close
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-[#00F59B] text-[#041912] hover:bg-[#34f8ac]"
            >
              Save & Test Connection
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
