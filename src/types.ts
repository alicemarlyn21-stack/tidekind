export type ScreenId =
  | 'welcome'
  | 'home'
  | 'explore'
  | 'actions'
  | 'project-details'
  | 'shorescan'
  | 'report-gear'
  | 'dossiers'
  | 'community-feed'
  | 'recycling'
  | 'profile'
  | 'navigator';

export interface ToastMessage {
  id: string;
  message: string;
  icon?: string;
  type?: 'success' | 'info' | 'warning' | 'error';
}

export interface GearReport {
  id: string;
  gearType: string;
  condition: string;
  locationName: string;
  coords: string;
  date: string;
  time: string;
  notes: string;
  threatLevel: string;
  hasWildlifeEntanglement: boolean;
  status: 'Under Review' | 'Action Planned' | 'Verified & Salvaged';
  imageUrl?: string;
  submittedAt: string;
  confidence?: string;
  assignedTeam?: string;
}

export interface ShoreScanSample {
  id: string;
  key: 'sanur' | 'reef' | 'buoy' | 'clean';
  title: string;
  icon: string;
  bgUrl: string;
  badgeText: string;
  confText: string;
  category: string;
  risk: string;
  notes: string;
  hasBox: boolean;
  coordinates: string;
  temp: string;
  ram: string;
  exposure: string;
}
