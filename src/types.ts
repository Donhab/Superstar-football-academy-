export type PlayerPosition = 'Striker' | 'Midfielder' | 'Defender' | 'Goalkeeper';
export type PreferredFoot = 'Left' | 'Right' | 'Both';
export type PlayerStatus = 'Pending Trial' | 'Accepted' | 'Active Academy Member' | 'Declined';

export interface Footballer {
  id: string;
  fullName: string;
  dob: string; // YYYY-MM-DD
  age?: number;
  position: PlayerPosition;
  preferredFoot: PreferredFoot;
  height: number; // in cm
  phone: string;
  email: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelation: string;
  bio: string;
  status: PlayerStatus;
  createdAt: string; // ISO string
  trialDate?: string;
  scoutNotes?: string;
  squadNumber?: number;
}

export type ViewTab = 'home' | 'register' | 'programs' | 'admin';

export interface FirebaseConnectionConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}
