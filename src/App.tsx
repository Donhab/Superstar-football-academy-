/**
 * Superstar Football Academy - Main Application
 */

import React, { useState, useEffect, useCallback } from 'react';
import { ViewTab, Footballer, PlayerStatus } from './types';
import { 
  subscribeToFootballers, 
  updateFootballerStatus, 
  deleteFootballer, 
  resetSampleFootballers, 
  initializeFirebaseService,
  isFirebaseConfigured
} from './firebase';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PresidentSection } from './components/PresidentSection';
import { AcademyPrograms } from './components/AcademyPrograms';
import { RegistrationForm } from './components/RegistrationForm';
import { AdminDashboard } from './components/AdminDashboard';
import { PlayerDossierModal } from './components/PlayerDossierModal';
import { FirebaseConfigModal } from './components/FirebaseConfigModal';
import { Footer } from './components/Footer';
import { CheckCircle2, AlertCircle, Info, Database } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<ViewTab>('home');
  const [footballers, setFootballers] = useState<Footballer[]>([]);
  const [isFirebaseLive, setIsFirebaseLive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Active modals
  const [selectedPlayer, setSelectedPlayer] = useState<Footballer | null>(null);
  const [showFirebaseModal, setShowFirebaseModal] = useState(false);

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' | 'error' } | null>(null);

  const showToast = useCallback((text: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  }, []);

  // Subscribe to footballers collection
  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = subscribeToFootballers((players, isLive) => {
      setFootballers(players);
      setIsFirebaseLive(isLive);
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Update Status
  const handleUpdateStatus = async (id: string, newStatus: PlayerStatus, scoutNotes?: string) => {
    try {
      await updateFootballerStatus(id, newStatus, scoutNotes);
      showToast(`Status updated to "${newStatus}"`, 'success');
      
      // If modal open, keep updated
      if (selectedPlayer && selectedPlayer.id === id) {
        setSelectedPlayer((prev) => prev ? { ...prev, status: newStatus, scoutNotes: scoutNotes ?? prev.scoutNotes } : null);
      }
    } catch (err: any) {
      showToast(err?.message || 'Error updating status', 'error');
    }
  };

  // Delete Player
  const handleDeletePlayer = async (id: string) => {
    try {
      await deleteFootballer(id);
      showToast('Player record removed from academy database', 'info');
      if (selectedPlayer?.id === id) {
        setSelectedPlayer(null);
      }
    } catch (err: any) {
      showToast(err?.message || 'Error deleting player', 'error');
    }
  };

  // Reset sample data
  const handleResetSampleData = () => {
    const seeded = resetSampleFootballers();
    setFootballers(seeded);
    showToast('Loaded 7 sample academy footballers!', 'success');
  };

  const pendingCount = footballers.filter((f) => f.status === 'Pending Trial').length;

  return (
    <div className="min-h-screen bg-[#04130d] text-emerald-50 flex flex-col font-sans selection:bg-[#00F59B] selection:text-[#041912]">
      
      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        pendingCount={pendingCount}
        totalCount={footballers.length}
        isFirebaseLive={isFirebaseLive}
        onOpenFirebaseModal={() => setShowFirebaseModal(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* VIEW 1: Home / Public Landing Page */}
        {currentTab === 'home' && (
          <div>
            <HeroSection
              onRegisterClick={() => setCurrentTab('register')}
              onAdminClick={() => setCurrentTab('admin')}
              totalRegistered={footballers.length}
            />

            <PresidentSection
              onRegisterClick={() => setCurrentTab('register')}
            />

            <AcademyPrograms
              onRegisterClick={() => setCurrentTab('register')}
            />

            {/* Quick Registration Teaser on Home */}
            <div className="border-t border-emerald-950/60 bg-[#020e08] py-16">
              <div className="max-w-4xl mx-auto px-4 text-center">
                <span className="text-xs font-mono font-bold text-[#00F59B] uppercase tracking-wider">
                  DIRECT ADMISSIONS
                </span>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-white font-display mt-2">
                  Ready To Showcase Your Talent?
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100/75 mt-3 max-w-xl mx-auto">
                  Take the first step towards professional club assessment in Abuja. Applications are reviewed within 48 hours by our certified technical scouting staff.
                </p>
                <div className="mt-6 flex justify-center">
                  <button
                    onClick={() => setCurrentTab('register')}
                    className="px-8 py-4 rounded-xl text-sm font-bold bg-[#00F59B] text-[#041912] hover:bg-[#34f8ac] transition-all shadow-xl shadow-emerald-500/25 cursor-pointer"
                  >
                    Open Trial Application Form
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 1 (Sub): Programs Tab */}
        {currentTab === 'programs' && (
          <div className="pt-6">
            <AcademyPrograms
              onRegisterClick={() => setCurrentTab('register')}
            />
          </div>
        )}

        {/* VIEW 1 (Sub): Registration Form Tab */}
        {currentTab === 'register' && (
          <RegistrationForm
            onSuccess={(newId) => {
              showToast(`Application #${newId} logged with status Pending Trial!`, 'success');
            }}
            onGoToAdmin={() => setCurrentTab('admin')}
          />
        )}

        {/* VIEW 2: Academy Management Dashboard (Admin Panel) */}
        {currentTab === 'admin' && (
          <AdminDashboard
            footballers={footballers}
            isFirebaseLive={isFirebaseLive}
            onUpdateStatus={handleUpdateStatus}
            onDeletePlayer={handleDeletePlayer}
            onSelectPlayer={(player) => setSelectedPlayer(player)}
            onOpenRegister={() => setCurrentTab('register')}
            onResetSampleData={handleResetSampleData}
          />
        )}

      </main>

      {/* Footer */}
      <Footer
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenFirebaseModal={() => setShowFirebaseModal(true)}
      />

      {/* MODAL: Player Scout Dossier */}
      {selectedPlayer && (
        <PlayerDossierModal
          player={selectedPlayer}
          onClose={() => setSelectedPlayer(null)}
          onUpdateStatus={handleUpdateStatus}
          onDeleteRequest={(player) => {
            handleDeletePlayer(player.id);
          }}
        />
      )}

      {/* MODAL: Firebase Firestore Settings */}
      {showFirebaseModal && (
        <FirebaseConfigModal
          onClose={() => setShowFirebaseModal(false)}
          onConfigSaved={() => {
            const check = initializeFirebaseService();
            setIsFirebaseLive(check.isLive);
            showToast(check.isLive ? 'Connected to live Firestore!' : 'Firebase settings updated', 'info');
          }}
        />
      )}

      {/* Global Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl glass-panel-glow border border-emerald-400/40 text-xs font-semibold text-white shadow-2xl animate-in slide-in-from-bottom-5">
          {toastMessage.type === 'success' && <CheckCircle2 className="w-4 h-4 text-[#00F59B]" />}
          {toastMessage.type === 'info' && <Info className="w-4 h-4 text-cyan-400" />}
          {toastMessage.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400" />}
          <span>{toastMessage.text}</span>
        </div>
      )}

    </div>
  );
}
