import React, { useState } from 'react';
import { ASSETS } from '../data/assets';
import { ScreenId, User } from '../types';
import { useAuth } from '../context/AuthContext';

interface ProfileScreenProps {
  onNavigate: (screen: ScreenId) => void;
  showToast: (msg: string, icon?: string) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ onNavigate, showToast }) => {
  const {
    user,
    logout,
    updateProfile,
    logActivity,
    switchDemoAccount,
    setAuthModalOpen,
    setAuthMode,
    activityLogs,
  } = useAuth();

  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isPassModalOpen, setIsPassModalOpen] = useState(false);

  // Settings Toggles
  const [tideAlerts, setTideAlerts] = useState(true);
  const [salvageCalls, setSalvageCalls] = useState(true);
  const [fuzzyGps, setFuzzyGps] = useState(true);

  // Log Form State
  const [logCategory, setLogCategory] = useState('Net Recovery');
  const [logWeight, setLogWeight] = useState('24');
  const [logHours, setLogHours] = useState('3.5');
  const [logLocation, setLogLocation] = useState('Serangan Harbor Dock #4');
  const [verificationMethod, setVerificationMethod] = useState('Co-op Scale Station #3');
  const [isSubmittingLog, setIsSubmittingLog] = useState(false);

  // Edit Profile Form State
  const [editName, setEditName] = useState(user?.name || '');
  const [editBio, setEditBio] = useState(user?.bio || '');
  const [editLocation, setEditLocation] = useState(user?.location || '');
  const [editChapter, setEditChapter] = useState(user?.chapter || '');
  const [editAvatar, setEditAvatar] = useState(user?.avatar || '');
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // Sync edit form with current user
  React.useEffect(() => {
    if (user) {
      setEditName(user.name);
      setEditBio(user.bio);
      setEditLocation(user.location);
      setEditChapter(user.chapter);
      setEditAvatar(user.avatar);
    }
  }, [user]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editName.trim()) {
      showToast('Name cannot be empty', 'error');
      return;
    }
    setIsSavingProfile(true);
    try {
      await updateProfile({
        name: editName.trim(),
        bio: editBio.trim(),
        location: editLocation.trim(),
        chapter: editChapter.trim(),
        avatar: editAvatar.trim(),
      });
      setIsEditProfileOpen(false);
      showToast('Steward profile updated successfully!', 'badge');
    } catch (err: any) {
      showToast(err.message || 'Failed updating profile', 'error');
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleSubmitLog = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingLog(true);
    try {
      await logActivity({
        category: logCategory,
        weightKg: Number(logWeight) || 0,
        hours: Number(logHours) || 1,
        location: logLocation,
        verificationMethod,
      });
      setIsLogModalOpen(false);
      showToast(`Logged ${logWeight} kg at ${logLocation}! Personal impact updated.`, 'task_alt');
    } catch (err: any) {
      showToast(err.message || 'Failed saving salvage log', 'error');
    } finally {
      setIsSubmittingLog(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    showToast('Signed out of steward account', 'logout');
  };

  const handleQuickSwitch = async (email: string) => {
    try {
      await switchDemoAccount(email);
      showToast(`Switched account!`, 'sync');
    } catch (err: any) {
      showToast(err.message || 'Failed switching account', 'error');
    }
  };

  const userLogs = activityLogs.filter((l) => l.userId === user?.id);

  return (
    <div className="flex flex-col w-full pb-28 pt-2 max-w-lg mx-auto px-4 space-y-4">
      {/* If Not Authenticated Banner */}
      {!user ? (
        <div className="rounded-3xl bg-[#eef4fc] p-6 text-center border border-[#dce3eb] shadow-sm space-y-3">
          <div className="w-14 h-14 mx-auto rounded-full bg-[#90f4e9] text-[#006a63] flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl">account_circle</span>
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#151c22]">Guest Oceanic Steward</h2>
            <p className="text-xs text-[#41484b] mt-1">
              Sign in or create an account to record verified ghost gear salvage, join harbor sorties, and personalize your steward credentials.
            </p>
          </div>
          <div className="flex gap-2 justify-center pt-1">
            <button
              onClick={() => {
                setAuthMode('login');
                setAuthModalOpen(true);
              }}
              className="px-5 py-2.5 rounded-full bg-[#006a63] text-white text-xs font-bold shadow-md active:scale-95 transition-all"
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setAuthMode('signup');
                setAuthModalOpen(true);
              }}
              className="px-5 py-2.5 rounded-full bg-white text-[#006a63] border border-[#006a63]/40 text-xs font-bold hover:bg-[#e8eff7] active:scale-95 transition-all"
            >
              Create Account
            </button>
          </div>
        </div>
      ) : (
        /* Top Profile Card */
        <div className="relative overflow-hidden rounded-3xl bg-white p-5 shadow-sm border border-[#e8eff7]">
          {/* Decorative Ambient Glow */}
          <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[#90f4e9]/30 blur-2xl pointer-events-none"></div>

          {/* Avatar & Identity */}
          <div className="relative flex items-center gap-4">
            <div className="relative shrink-0">
              <img
                src={user.avatar || ASSETS.userProfile}
                alt={user.name}
                className="h-20 w-20 rounded-full object-cover shadow-sm ring-2 ring-[#006a63]/40 bg-[#eef4fc]"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = ASSETS.userProfile;
                }}
              />
              <div
                className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#006a63] text-white shadow-md ring-2 ring-white"
                title="Verified Active Steward"
              >
                <span className="material-symbols-outlined text-[14px]">verified</span>
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h1 className="text-lg font-bold text-[#151c22] truncate">{user.name}</h1>
                <span className="px-2 py-0.5 rounded-full bg-[#90f4e9] text-[#00504a] text-[10px] font-bold">
                  {user.badge || 'Steward'}
                </span>
              </div>
              <p className="text-xs text-[#41484b] flex items-center gap-1 mt-0.5 truncate">
                <span className="material-symbols-outlined text-sm text-[#006a63]">anchor</span>
                <span>{user.chapter || 'Bali Coastal Chapter'}</span>
              </p>
              <p className="text-xs text-[#72787c] flex items-center gap-1 mt-0.5">
                <span className="material-symbols-outlined text-sm">location_on</span>
                <span>{user.location || 'Denpasar, Bali'}</span>
              </p>
              <p className="text-[11px] text-[#41484b] line-clamp-2 mt-1.5 italic font-sans leading-tight">
                "{user.bio}"
              </p>
            </div>
          </div>

          {/* Quick Edit Profile & QR Pass Row */}
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => setIsEditProfileOpen(true)}
              className="flex-1 h-9 rounded-full bg-[#e8eff7] hover:bg-[#dce3eb] text-[#002531] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <span className="material-symbols-outlined text-base">edit</span>
              <span>Edit Profile</span>
            </button>

            <button
              onClick={() => setIsPassModalOpen(true)}
              className="flex-1 h-9 rounded-full bg-[#006a63] hover:bg-[#00504a] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
            >
              <span className="material-symbols-outlined text-base">qr_code_2</span>
              <span>Harbor Pass</span>
            </button>
          </div>

          {/* Verified Contribution Stats */}
          <div className="mt-4 grid grid-cols-2 gap-2 pt-1">
            <div className="rounded-2xl bg-[#f6faff] p-3 flex flex-col justify-between border border-[#e8eff7]">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-[#41484b] font-medium">Gear Diverted</span>
                <span className="material-symbols-outlined text-[#006a63] text-base">recycling</span>
              </div>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-xl font-bold text-[#002531]">
                  {user.stats?.gearDivertedKg || 0}
                </span>
                <span className="text-xs text-[#006a63] font-bold">kg</span>
              </div>
              <span className="text-[10px] text-[#006a63] font-semibold flex items-center gap-0.5 mt-0.5">
                <span className="material-symbols-outlined text-xs">verified</span>
                <span>Weight-certified</span>
              </span>
            </div>

            <div className="rounded-2xl bg-[#f6faff] p-3 flex flex-col justify-between border border-[#e8eff7]">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-[#41484b] font-medium">Hours Logged</span>
                <span className="material-symbols-outlined text-[#006a63] text-base">timer</span>
              </div>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-xl font-bold text-[#002531]">
                  {user.stats?.hoursLogged || 0}
                </span>
                <span className="text-xs text-[#72787c]">hrs</span>
              </div>
              <span className="text-[10px] text-[#72787c] mt-0.5">
                Across {user.stats?.sortiesCount || 0} sorties
              </span>
            </div>

            <div className="rounded-2xl bg-[#f6faff] p-3 flex flex-col justify-between border border-[#e8eff7]">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-[#41484b] font-medium">Projects Done</span>
                <span className="material-symbols-outlined text-[#006a63] text-base">task_alt</span>
              </div>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-xl font-bold text-[#002531]">
                  {user.stats?.projectsDone || 0}
                </span>
                <span className="text-xs text-[#006a63] font-bold">actions</span>
              </div>
              <span className="text-[10px] text-[#72787c] mt-0.5">Verified attendance</span>
            </div>

            <div className="rounded-2xl bg-[#f6faff] p-3 flex flex-col justify-between border border-[#e8eff7]">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-[#41484b] font-medium">Account Role</span>
                <span className="material-symbols-outlined text-[#006a63] text-base">military_tech</span>
              </div>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-base font-bold text-[#002531]">{user.role}</span>
              </div>
              <span className="text-[10px] text-[#006a63] font-semibold mt-0.5">
                {user.email}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Action Strip: Log Activity */}
      {user && (
        <button
          onClick={() => setIsLogModalOpen(true)}
          className="w-full h-12 rounded-2xl bg-[#002531] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md hover:bg-[#123b4a] active:scale-98 transition-all"
        >
          <span className="material-symbols-outlined text-lg text-[#90f4e9]">add_circle</span>
          <span>Record New Gear Salvage or Volunteer Hours</span>
        </button>
      )}

      {/* Recent Personal Logs */}
      {user && userLogs.length > 0 && (
        <div className="rounded-3xl bg-white p-5 shadow-sm border border-[#e8eff7] space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#151c22]">Your Recorded Sorties</h3>
            <span className="text-xs text-[#72787c]">{userLogs.length} entries</span>
          </div>

          <div className="space-y-2">
            {userLogs.map((log) => (
              <div
                key={log.id}
                className="p-3 rounded-2xl bg-[#f6faff] border border-[#e8eff7] flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#90f4e9]/50 text-[#006a63] flex items-center justify-center">
                    <span className="material-symbols-outlined text-base">
                      {log.category.includes('Mending') ? 'carpenter' : 'scale'}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#151c22]">{log.category}</h4>
                    <p className="text-[10px] text-[#72787c]">{log.location} • {log.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-[#002531]">+{log.weightKg} kg</span>
                  <p className="text-[10px] text-[#006a63] font-semibold">{log.hours} hrs</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Settings & Preferences Section */}
      <div className="rounded-3xl bg-white p-5 shadow-sm border border-[#e8eff7] space-y-4">
        <h3 className="text-sm font-bold text-[#151c22]">Steward Vessel & Operational Settings</h3>

        <div className="space-y-3">
          {/* Toggle 1 */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <span className="material-symbols-outlined text-[#006a63] mt-0.5 text-lg">water_drop</span>
              <div>
                <h4 className="text-xs font-bold text-[#151c22]">Tide & Weather Alerts</h4>
                <p className="text-[11px] text-[#72787c]">
                  Receive notifications 1 hour before optimal low tide survey windows
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input
                type="checkbox"
                checked={tideAlerts}
                onChange={(e) => {
                  setTideAlerts(e.target.checked);
                  showToast(e.target.checked ? 'Tide alerts active' : 'Tide alerts muted');
                }}
                className="sr-only peer"
              />
              <div className="w-10 h-5 bg-[#c1c7cb] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#006a63]"></div>
            </label>
          </div>

          <div className="h-[1px] bg-[#e8eff7] w-full"></div>

          {/* Toggle 2 */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <span className="material-symbols-outlined text-[#006a63] mt-0.5 text-lg">radar</span>
              <div>
                <h4 className="text-xs font-bold text-[#151c22]">Emergency Snag Dispatch</h4>
                <p className="text-[11px] text-[#72787c]">
                  Allow local dive teams to notify your station for urgent ghost gear towing
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input
                type="checkbox"
                checked={salvageCalls}
                onChange={(e) => {
                  setSalvageCalls(e.target.checked);
                  showToast(e.target.checked ? 'Dive salvage calls active' : 'Calls paused');
                }}
                className="sr-only peer"
              />
              <div className="w-10 h-5 bg-[#c1c7cb] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#006a63]"></div>
            </label>
          </div>

          <div className="h-[1px] bg-[#e8eff7] w-full"></div>

          {/* Toggle 3 */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <span className="material-symbols-outlined text-[#006a63] mt-0.5 text-lg">share_location</span>
              <div>
                <h4 className="text-xs font-bold text-[#151c22]">Fuzzy GPS Privacy</h4>
                <p className="text-[11px] text-[#72787c]">
                  Fuzz my home berth coords by 500m on the community public map
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input
                type="checkbox"
                checked={fuzzyGps}
                onChange={(e) => {
                  setFuzzyGps(e.target.checked);
                  showToast(e.target.checked ? 'Fuzzy GPS enabled (500m jitter)' : 'Precise GPS broadcasted');
                }}
                className="sr-only peer"
              />
              <div className="w-10 h-5 bg-[#c1c7cb] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#006a63]"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Multi-User Persona Switcher (For Evaluation & Multi-user verification) */}
      <div className="rounded-3xl bg-white p-5 shadow-sm border border-[#e8eff7] space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#151c22]">Multi-User Test Switchboard</h3>
          <span className="text-[10px] font-bold text-[#006a63] bg-[#90f4e9]/40 px-2 py-0.5 rounded-full">
            Live Testing
          </span>
        </div>
        <p className="text-xs text-[#72787c]">
          Switch between distinct accounts in seconds to test concurrent collaboration, project memberships, and isolated private credentials:
        </p>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => handleQuickSwitch('alex@tidekind.org')}
            className={`p-2.5 rounded-2xl border flex flex-col items-center text-center transition-all ${
              user?.email === 'alex@tidekind.org'
                ? 'bg-[#eef4fc] border-[#006a63] ring-2 ring-[#006a63]/30'
                : 'bg-[#f6faff] border-[#dce3eb] hover:bg-[#eef4fc]'
            }`}
          >
            <img src={ASSETS.alexSteward} alt="Alex" className="w-9 h-9 rounded-full object-cover mb-1" />
            <span className="text-[11px] font-bold text-[#151c22]">Alex Stewart</span>
            <span className="text-[9px] text-[#006a63] font-semibold">Tier 2 Steward</span>
          </button>

          <button
            onClick={() => handleQuickSwitch('budi@tidekind.org')}
            className={`p-2.5 rounded-2xl border flex flex-col items-center text-center transition-all ${
              user?.email === 'budi@tidekind.org'
                ? 'bg-[#eef4fc] border-[#006a63] ring-2 ring-[#006a63]/30'
                : 'bg-[#f6faff] border-[#dce3eb] hover:bg-[#eef4fc]'
            }`}
          >
            <img src={ASSETS.pakBudiMending} alt="Budi" className="w-9 h-9 rounded-full object-cover mb-1" />
            <span className="text-[11px] font-bold text-[#151c22]">Pak Budi</span>
            <span className="text-[9px] text-[#006a63] font-semibold">Coordinator</span>
          </button>

          <button
            onClick={() => handleQuickSwitch('sarah@tidekind.org')}
            className={`p-2.5 rounded-2xl border flex flex-col items-center text-center transition-all ${
              user?.email === 'sarah@tidekind.org'
                ? 'bg-[#eef4fc] border-[#006a63] ring-2 ring-[#006a63]/30'
                : 'bg-[#f6faff] border-[#dce3eb] hover:bg-[#eef4fc]'
            }`}
          >
            <img src={ASSETS.sarahJenkins} alt="Sarah" className="w-9 h-9 rounded-full object-cover mb-1" />
            <span className="text-[11px] font-bold text-[#151c22]">Dr. Sarah</span>
            <span className="text-[9px] text-[#006a63] font-semibold">Admin / Lead</span>
          </button>
        </div>

        <button
          onClick={() => {
            setAuthMode('signup');
            setAuthModalOpen(true);
          }}
          className="w-full py-2 rounded-xl bg-[#f6faff] hover:bg-[#e8eff7] text-[#006a63] text-xs font-bold border border-dashed border-[#006a63]/40 flex items-center justify-center gap-1.5 transition-colors"
        >
          <span className="material-symbols-outlined text-base">person_add</span>
          <span>Register a Brand New Account</span>
        </button>
      </div>

      {/* Sign Out Button */}
      {user && (
        <div className="pt-2 flex flex-col items-center">
          <button
            onClick={handleLogout}
            className="w-full h-11 rounded-full bg-[#ffdad6] hover:bg-[#ffb5a1] text-[#93000a] text-xs font-bold flex items-center justify-center gap-2 active:scale-95 transition-all shadow-xs"
          >
            <span className="material-symbols-outlined text-base">logout</span>
            <span>Sign Out of {user.name}</span>
          </button>
          <p className="mt-2 text-[10px] text-[#72787c] text-center">
            Tidekind Marine Network Protocol • v2.4-Bali • ID: {user.id}
          </p>
        </div>
      )}

      {/* Modal: Edit Profile */}
      {isEditProfileOpen && user && (
        <div className="fixed inset-0 z-50 bg-[#002531]/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-3xl p-5 shadow-2xl border border-[#dce3eb] space-y-4 max-h-[85vh] overflow-y-auto no-scrollbar">
            <div className="flex items-center justify-between border-b pb-2.5 border-[#e8eff7]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#006a63]">edit_square</span>
                <h3 className="text-sm font-bold text-[#151c22]">Edit Steward Profile</h3>
              </div>
              <button
                onClick={() => setIsEditProfileOpen(false)}
                className="w-8 h-8 rounded-full bg-[#e8eff7] flex items-center justify-center text-[#41484b]"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-[#41484b] block mb-1">Display Name</label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full h-11 px-3 rounded-2xl bg-[#f6faff] text-xs font-semibold border border-[#dce3eb]"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#41484b] block mb-1">Profile Avatar URL</label>
                <input
                  type="url"
                  value={editAvatar}
                  onChange={(e) => setEditAvatar(e.target.value)}
                  className="w-full h-11 px-3 rounded-2xl bg-[#f6faff] text-xs font-mono border border-[#dce3eb]"
                />
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[10px] text-[#72787c] font-semibold">Preset avatars:</span>
                  {[
                    { label: 'Steward 1', url: ASSETS.alexSteward },
                    { label: 'Rigger', url: ASSETS.pakBudiMending },
                    { label: 'Scientist', url: ASSETS.sarahJenkins },
                    { label: 'Robot/Bot', url: `https://api.dicebear.com/7.x/bottts/svg?seed=${user.id}` },
                  ].map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setEditAvatar(p.url)}
                      className="text-[10px] px-2 py-0.5 rounded-full bg-[#e8eff7] text-[#002531] hover:bg-[#90f4e9]"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-[#41484b] block mb-1">Berth / Location</label>
                  <input
                    type="text"
                    value={editLocation}
                    onChange={(e) => setEditLocation(e.target.value)}
                    className="w-full h-11 px-3 rounded-2xl bg-[#f6faff] text-xs border border-[#dce3eb]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-[#41484b] block mb-1">Chapter</label>
                  <input
                    type="text"
                    value={editChapter}
                    onChange={(e) => setEditChapter(e.target.value)}
                    className="w-full h-11 px-3 rounded-2xl bg-[#f6faff] text-xs border border-[#dce3eb]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#41484b] block mb-1">Personal Bio</label>
                <textarea
                  rows={3}
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  className="w-full p-3 rounded-2xl bg-[#f6faff] text-xs border border-[#dce3eb]"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditProfileOpen(false)}
                  className="flex-1 h-11 rounded-full bg-[#e8eff7] text-[#002531] text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingProfile}
                  className="flex-1 h-11 rounded-full bg-[#006a63] text-white text-xs font-bold shadow-md active:scale-95 disabled:opacity-50"
                >
                  {isSavingProfile ? 'Saving...' : 'Save Profile Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: View Muster Pass */}
      {isPassModalOpen && user && (
        <div className="fixed inset-0 z-50 bg-[#002531]/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl text-center relative border border-[#dce3eb]">
            <button
              onClick={() => setIsPassModalOpen(false)}
              className="absolute right-4 top-4 h-8 w-8 rounded-full bg-[#e8eff7] flex items-center justify-center text-[#41484b]"
            >
              <span className="material-symbols-outlined text-base">close</span>
            </button>

            <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#90f4e9] text-[#00504a] text-xs font-bold mb-2">
              Boarding & Staging Pass
            </span>
            <h3 className="text-base font-bold text-[#151c22]">Kuta Net Sort Berth #12</h3>
            <p className="text-xs text-[#72787c] mt-0.5">
              Steward: {user.name} ({user.id})
            </p>

            {/* QR Code graphic */}
            <div className="my-4 mx-auto w-40 h-40 rounded-2xl bg-[#f6faff] p-3 flex flex-col items-center justify-center border border-dashed border-[#c1c7cb]">
              <span className="material-symbols-outlined text-6xl text-[#002531] mb-1">qr_code_2</span>
              <span className="text-[10px] font-mono text-[#72787c] font-bold">SCAN AT DOCK GANTRY</span>
            </div>

            <div className="rounded-2xl bg-[#123b4a] text-white p-3 text-left border border-white/10">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#90f4e9] font-medium">Muster Time</span>
                <span className="font-bold">07:45 WITA (Sharp)</span>
              </div>
              <p className="text-[11px] text-[#7fa5b7] mt-1">
                Bring puncture-resistant gloves and deck boots. High-vis vest provided on arrival.
              </p>
            </div>

            <button
              onClick={() => {
                setIsPassModalOpen(false);
                showToast('Pass cached for offline harbor gate check', 'badge');
              }}
              className="mt-3 w-full h-11 rounded-full bg-[#006a63] text-white text-xs font-bold shadow-xs active:scale-95"
            >
              Save to Offline Wallet
            </button>
          </div>
        </div>
      )}

      {/* Modal: Log New Contribution */}
      {isLogModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#002531]/70 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl space-y-3">
            <div className="flex items-center justify-between border-b pb-2 border-[#e8eff7]">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-[#90f4e9] flex items-center justify-center text-[#006a63]">
                  <span className="material-symbols-outlined text-lg">add</span>
                </div>
                <h3 className="text-sm font-bold text-[#151c22]">Log Salvage Activity</h3>
              </div>
              <button
                onClick={() => setIsLogModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#e8eff7] flex items-center justify-center text-[#41484b]"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>

            <form onSubmit={handleSubmitLog} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-[#72787c] block mb-1">Activity Category</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setLogCategory('Net Recovery')}
                    className={`h-10 rounded-full text-xs font-bold flex items-center justify-center gap-1 shadow-xs transition-colors ${
                      logCategory === 'Net Recovery'
                        ? 'bg-[#006a63] text-white'
                        : 'bg-[#e8eff7] text-[#002531]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-base">set_meal</span>
                    <span>Net Recovery</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setLogCategory('Volunteer Hours')}
                    className={`h-10 rounded-full text-xs font-bold flex items-center justify-center gap-1 shadow-xs transition-colors ${
                      logCategory === 'Volunteer Hours'
                        ? 'bg-[#006a63] text-white'
                        : 'bg-[#e8eff7] text-[#002531]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-base">hourglass_bottom</span>
                    <span>Volunteer Hours</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-[#72787c] block mb-1">Net Mass (kg)</label>
                  <input
                    type="number"
                    value={logWeight}
                    onChange={(e) => setLogWeight(e.target.value)}
                    className="w-full h-11 px-3 rounded-2xl bg-[#f6faff] text-xs font-semibold border border-[#dce3eb]"
                    required
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-[#72787c] block mb-1">Hours Spent</label>
                  <input
                    type="number"
                    step="0.5"
                    value={logHours}
                    onChange={(e) => setLogHours(e.target.value)}
                    className="w-full h-11 px-3 rounded-2xl bg-[#f6faff] text-xs font-semibold border border-[#dce3eb]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#72787c] block mb-1">Muster / Harbor Location</label>
                <input
                  type="text"
                  value={logLocation}
                  onChange={(e) => setLogLocation(e.target.value)}
                  className="w-full h-11 px-3 rounded-2xl bg-[#f6faff] text-xs font-semibold border border-[#dce3eb]"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#72787c] block mb-1">Verification Method</label>
                <select
                  value={verificationMethod}
                  onChange={(e) => setVerificationMethod(e.target.value)}
                  className="w-full h-11 px-3 rounded-2xl bg-[#f6faff] text-xs font-semibold border border-[#dce3eb]"
                >
                  <option value="Co-op Scale Station #3">Co-op Scale Station #3</option>
                  <option value="Harbor Gantry Scale #1">Harbor Gantry Scale #1</option>
                  <option value="Visual Drone Estimate">Visual Drone Estimate</option>
                  <option value="Depot Certified Weight Slip">Depot Certified Weight Slip</option>
                </select>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsLogModalOpen(false)}
                  className="flex-1 h-11 rounded-full bg-[#e8eff7] text-[#002531] text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingLog}
                  className="flex-1 h-11 rounded-full bg-[#006a63] text-white text-xs font-bold shadow-md active:scale-95 disabled:opacity-50"
                >
                  {isSubmittingLog ? 'Recording...' : 'Submit Certified Log'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
