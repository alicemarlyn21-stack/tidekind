import React, { useState } from 'react';
import { ASSETS } from '../data/assets';
import { ScreenId } from '../types';

interface ProfileScreenProps {
  onNavigate: (screen: ScreenId) => void;
  showToast: (msg: string, icon?: string) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ onNavigate, showToast }) => {
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [isPassModalOpen, setIsPassModalOpen] = useState(false);
  const [tideAlerts, setTideAlerts] = useState(true);
  const [salvageCalls, setSalvageCalls] = useState(true);
  const [fuzzyGps, setFuzzyGps] = useState(true);

  const [logWeight, setLogWeight] = useState('24');
  const [logLocation, setLogLocation] = useState('Serangan Harbor Dock #4');

  return (
    <div className="flex flex-col w-full pb-28 pt-2 max-w-lg mx-auto px-4 space-y-4">
      {/* Top Profile Card */}
      <div className="relative overflow-hidden rounded-3xl bg-white p-5 shadow-sm border border-[#e8eff7]">
        {/* Decorative Ambient Glow */}
        <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[#90f4e9]/30 blur-2xl pointer-events-none"></div>

        {/* Avatar & Identity */}
        <div className="relative flex items-center gap-4">
          <div className="relative shrink-0">
            <img
              src={ASSETS.alexSteward}
              alt="Alex Steward"
              className="h-20 w-20 rounded-full object-cover shadow-sm ring-2 ring-[#006a63]/40"
            />
            <div
              className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#006a63] text-white shadow-md ring-2 ring-white"
              title="Verified Tier 2 Steward"
            >
              <span className="material-symbols-outlined text-[14px]">verified</span>
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h1 className="text-lg font-bold text-[#151c22] truncate">Alex Steward</h1>
              <span className="px-2 py-0.5 rounded-full bg-[#90f4e9] text-[#00504a] text-[10px] font-bold">
                Tier 2 Steward
              </span>
            </div>
            <p className="text-xs text-[#41484b] flex items-center gap-1 mt-0.5 truncate">
              <span className="material-symbols-outlined text-sm text-[#006a63]">anchor</span>
              <span>Serangan Harbor Chapter</span>
            </p>
            <p className="text-xs text-[#72787c] flex items-center gap-1 mt-0.5">
              <span className="material-symbols-outlined text-sm">location_on</span>
              <span>Denpasar, Bali</span>
            </p>
          </div>
        </div>

        {/* Verified Contribution Stats */}
        <div className="mt-4 grid grid-cols-2 gap-2 pt-1">
          <div className="rounded-2xl bg-[#f6faff] p-3 flex flex-col justify-between border border-[#e8eff7]">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-[#41484b] font-medium">Gear Diverted</span>
              <span className="material-symbols-outlined text-[#006a63] text-base">recycling</span>
            </div>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-xl font-bold text-[#002531]">340</span>
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
              <span className="text-xl font-bold text-[#002531]">18</span>
              <span className="text-xs text-[#72787c]">hrs</span>
            </div>
            <span className="text-[10px] text-[#72787c] mt-0.5">Across 6 sorties</span>
          </div>

          <div className="rounded-2xl bg-[#f6faff] p-3 flex flex-col justify-between border border-[#e8eff7]">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-[#41484b] font-medium">Projects Done</span>
              <span className="material-symbols-outlined text-[#006a63] text-base">task_alt</span>
            </div>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-xl font-bold text-[#002531]">4</span>
              <span className="text-xs text-[#006a63] font-bold">harbors</span>
            </div>
            <span className="text-[10px] text-[#72787c] mt-0.5">100% attendance</span>
          </div>

          <div className="rounded-2xl bg-[#f6faff] p-3 flex flex-col justify-between border border-[#e8eff7]">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-[#41484b] font-medium">Gear Dossiers</span>
              <span className="material-symbols-outlined text-[#006a63] text-base">
                document_scanner
              </span>
            </div>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-xl font-bold text-[#002531]">3</span>
              <span className="text-xs text-[#72787c]">verified</span>
            </div>
            <span className="text-[10px] text-[#006a63] font-semibold mt-0.5">
              ShoreScan AI tagged
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex flex-col gap-2">
          <button
            onClick={() => setIsLogModalOpen(true)}
            className="w-full h-11 rounded-full bg-[#006a63] hover:bg-[#123b4a] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-lg">add_circle</span>
            <span>Log New Contribution</span>
          </button>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onNavigate('dossiers')}
              className="h-10 rounded-full bg-[#e8eff7] hover:bg-[#dce3eb] text-[#002531] text-xs font-bold flex items-center justify-center gap-1 active:scale-95"
            >
              <span className="material-symbols-outlined text-sm text-[#006a63]">folder_shared</span>
              <span>My Dossiers (3)</span>
            </button>
            <button
              onClick={() => showToast('Harbor profile settings ready to edit', 'tune')}
              className="h-10 rounded-full bg-[#e8eff7] hover:bg-[#dce3eb] text-[#002531] text-xs font-bold flex items-center justify-center gap-1 active:scale-95"
            >
              <span className="material-symbols-outlined text-sm text-[#72787c]">tune</span>
              <span>Edit Profile</span>
            </button>
          </div>
        </div>
      </div>

      {/* Upcoming Activity Card */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#006a63] animate-ping"></span>
            <h2 className="text-xs font-bold text-[#151c22]">Upcoming Activity</h2>
          </div>
          <span className="text-[11px] font-bold text-[#006a63]">Confirmed</span>
        </div>

        <div className="p-4 sm:p-5 rounded-3xl bg-[#123b4a] text-white shadow-md relative overflow-hidden">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#90f4e9] text-[#00504a] text-[10px] font-bold mb-1">
                Harbor Sort & Drop-off
              </span>
              <h3 className="text-base font-bold text-white">Kuta Harbor Net Sorting</h3>
              <p className="text-xs text-[#7fa5b7] mt-0.5 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">calendar_today</span>
                <span>Saturday, 08:00 WITA</span>
              </p>
            </div>
            <div className="rounded-2xl bg-white/10 backdrop-blur-md px-3 py-1.5 text-center shrink-0 border border-white/10">
              <span className="block text-[9px] uppercase text-[#90f4e9] font-bold tracking-wider">
                Berth
              </span>
              <span className="block text-xl font-bold text-white">#12</span>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-full bg-[#006a63] flex items-center justify-center text-white shrink-0">
                <span className="material-symbols-outlined text-xs">near_me</span>
              </div>
              <div>
                <p className="text-xs font-bold text-white leading-tight">Muster Point Bravo</p>
                <p className="text-[10px] text-[#7fa5b7]">Dry Dock Gantry Gate</p>
              </div>
            </div>
            <button
              onClick={() => setIsPassModalOpen(true)}
              className="h-8 px-3.5 rounded-full bg-[#90f4e9] text-[#00201d] text-xs font-bold flex items-center gap-1 hover:bg-[#73d7cd] active:scale-95 transition-all shadow-xs"
            >
              <span className="material-symbols-outlined text-sm">qr_code_2</span>
              <span>View Pass</span>
            </button>
          </div>
        </div>
      </div>

      {/* Earned Badges Carousel */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xs font-bold text-[#151c22]">Earned Badges</h2>
            <p className="text-[11px] text-[#72787c]">Validated skills & harbor certifications</p>
          </div>
          <span className="text-xs font-bold text-[#006a63]">3 Unlocked</span>
        </div>

        <div className="flex gap-2.5 overflow-x-auto pb-1 no-scrollbar">
          {/* Badge 1 */}
          <div className="shrink-0 w-36 rounded-2xl bg-white p-3 shadow-xs border border-[#e8eff7] flex flex-col items-center text-center">
            <div className="h-10 w-10 rounded-full bg-[#90f4e9] flex items-center justify-center text-[#006a63] mb-1.5">
              <span className="material-symbols-outlined text-xl">waves</span>
            </div>
            <h4 className="text-xs font-bold text-[#151c22]">Tidekeeper Lvl 1</h4>
            <p className="text-[10px] text-[#72787c] mt-0.5 line-clamp-2">
              Awarded for 300+ kg ghost gear diversion
            </p>
            <span className="mt-2 text-[10px] text-[#006a63] font-bold flex items-center gap-0.5">
              <span className="material-symbols-outlined text-xs">military_tech</span> Verified
            </span>
          </div>

          {/* Badge 2 */}
          <div className="shrink-0 w-36 rounded-2xl bg-white p-3 shadow-xs border border-[#e8eff7] flex flex-col items-center text-center">
            <div className="h-10 w-10 rounded-full bg-[#c2e8fb] flex items-center justify-center text-[#002531] mb-1.5">
              <span className="material-symbols-outlined text-xl">hardware</span>
            </div>
            <h4 className="text-xs font-bold text-[#151c22]">Master Knot Untangler</h4>
            <p className="text-[10px] text-[#72787c] mt-0.5 line-clamp-2">
              Lead deck hand for entangled nylon rigs
            </p>
            <span className="mt-2 text-[10px] text-[#006a63] font-bold flex items-center gap-0.5">
              <span className="material-symbols-outlined text-xs">military_tech</span> Certified
            </span>
          </div>

          {/* Badge 3 */}
          <div className="shrink-0 w-36 rounded-2xl bg-white p-3 shadow-xs border border-[#e8eff7] flex flex-col items-center text-center">
            <div className="h-10 w-10 rounded-full bg-[#90f4e9]/50 flex items-center justify-center text-[#006a63] mb-1.5">
              <span className="material-symbols-outlined text-xl">photo_camera</span>
            </div>
            <h4 className="text-xs font-bold text-[#151c22]">ShoreScan Pioneer</h4>
            <p className="text-[10px] text-[#72787c] mt-0.5 line-clamp-2">
              First 3 micro-plastic & drift net detections
            </p>
            <span className="mt-2 text-[10px] text-[#006a63] font-bold flex items-center gap-0.5">
              <span className="material-symbols-outlined text-xs">military_tech</span> Pioneer
            </span>
          </div>

          {/* Badge 4 (Locked) */}
          <div className="shrink-0 w-36 rounded-2xl bg-[#eef4fc]/60 p-3 border border-dashed border-[#dce3eb] flex flex-col items-center text-center opacity-70">
            <div className="h-10 w-10 rounded-full bg-[#dce3eb] flex items-center justify-center text-[#72787c] mb-1.5">
              <span className="material-symbols-outlined text-xl">sailing</span>
            </div>
            <h4 className="text-xs font-bold text-[#151c22]">Deep Reef Diver</h4>
            <p className="text-[10px] text-[#72787c] mt-0.5">2 more deep sorties needed</p>
            <span className="mt-2 text-[10px] text-[#72787c] flex items-center gap-0.5">
              <span className="material-symbols-outlined text-xs">lock</span> Locked
            </span>
          </div>
        </div>
      </div>

      {/* Contribution History */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xs font-bold text-[#151c22]">Contribution History</h2>
            <p className="text-[11px] text-[#72787c]">Validated chain of salvage logs</p>
          </div>
          <button
            onClick={() => showToast('Exporting certified CSV ledger...', 'download')}
            className="text-xs text-[#006a63] font-bold hover:underline"
          >
            Export Log
          </button>
        </div>

        <div className="space-y-2">
          {/* History 1 */}
          <div className="rounded-2xl bg-white p-3.5 shadow-xs border border-[#e8eff7]">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-full bg-[#90f4e9]/40 flex items-center justify-center text-[#006a63] shrink-0">
                  <span className="material-symbols-outlined text-base">scale</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#151c22]">45 kg Monofilament Gillnet</h4>
                  <p className="text-[11px] text-[#72787c]">Jimbaran Drive • May 14</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#90f4e9] text-[#00504a] text-[10px] font-bold">
                <span className="material-symbols-outlined text-[12px]">verified</span>
                <span>Verified</span>
              </span>
            </div>
            <div className="mt-2.5 flex items-center justify-between rounded-xl bg-[#f6faff] px-2.5 py-1 text-[11px] border border-[#e8eff7]">
              <span className="text-[#41484b]">Audited by Serangan Co-op</span>
              <span className="font-mono text-[#002531] font-bold">Chain ID #7721</span>
            </div>
          </div>

          {/* History 2 */}
          <div className="rounded-2xl bg-white p-3.5 shadow-xs border border-[#e8eff7]">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-full bg-[#c2e8fb]/60 flex items-center justify-center text-[#001f29] shrink-0">
                  <span className="material-symbols-outlined text-base">volunteer_activism</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#151c22]">
                    4 Hrs Beach Triage & Spooling
                  </h4>
                  <p className="text-[11px] text-[#72787c]">Sanur Reef Clean • May 02</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#90f4e9] text-[#00504a] text-[10px] font-bold">
                <span className="material-symbols-outlined text-[12px]">verified</span>
                <span>Verified</span>
              </span>
            </div>
            <div className="mt-2.5 flex items-center justify-between rounded-xl bg-[#f6faff] px-2.5 py-1 text-[11px] border border-[#e8eff7]">
              <span className="text-[#41484b]">Validated by Field Lead Wayan</span>
              <span className="font-mono text-[#002531] font-bold">12 volunteers total</span>
            </div>
          </div>

          {/* History 3 */}
          <div className="rounded-2xl bg-white p-3.5 shadow-xs border border-[#e8eff7]">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-full bg-[#ffdbd1] flex items-center justify-center text-[#64200d] shrink-0">
                  <span className="material-symbols-outlined text-base">radar</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#151c22]">ShoreScan #SS-2025-042</h4>
                  <p className="text-[11px] text-[#72787c]">Serangan Outer Reef • Today 10:14</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#ffdad6] text-[#ba1a1a] text-[10px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ba1a1a] animate-pulse"></span>
                <span>Under Review</span>
              </span>
            </div>
            <div className="mt-2.5 flex items-center justify-between rounded-xl bg-[#f6faff] px-2.5 py-1 text-[11px] border border-[#e8eff7]">
              <span className="text-[#41484b]">Pending Quorum (2 of 3 signed)</span>
              <span className="font-semibold text-[#006a63]">Live Triage</span>
            </div>
          </div>
        </div>
      </div>

      {/* Preferences & Field Safety */}
      <div className="space-y-2">
        <h2 className="text-xs font-bold text-[#151c22]">Preferences & Field Safety</h2>
        <div className="rounded-3xl bg-white p-4 shadow-xs border border-[#e8eff7] space-y-3">
          {/* Toggle 1 */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <span className="material-symbols-outlined text-[#006a63] mt-0.5 text-lg">
                tsunami
              </span>
              <div>
                <h4 className="text-xs font-bold text-[#151c22]">Tide & Drift Net Alerts</h4>
                <p className="text-[11px] text-[#72787c]">
                  Receive notification when currents push ghost rigs into Serangan
                </p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input
                type="checkbox"
                checked={tideAlerts}
                onChange={(e) => {
                  setTideAlerts(e.target.checked);
                  showToast(e.target.checked ? 'Tide alerts enabled' : 'Tide alerts muted');
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
              <span className="material-symbols-outlined text-[#006a63] mt-0.5 text-lg">
                scuba_diving
              </span>
              <div>
                <h4 className="text-xs font-bold text-[#151c22]">Urgent Dive Salvage Calls</h4>
                <p className="text-[11px] text-[#72787c]">
                  Priority dispatch ping when mammal entanglement is reported nearby
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
              <span className="material-symbols-outlined text-[#006a63] mt-0.5 text-lg">
                share_location
              </span>
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
                  showToast(
                    e.target.checked
                      ? 'Fuzzy GPS enabled (500m jitter)'
                      : 'Precise GPS broadcasted'
                  );
                }}
                className="sr-only peer"
              />
              <div className="w-10 h-5 bg-[#c1c7cb] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#006a63]"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Sign Out / Protocol ID */}
      <div className="pt-2 flex flex-col items-center">
        <button
          onClick={() => showToast('Switched to guest vessel mode', 'logout')}
          className="w-full h-11 rounded-full bg-[#e8eff7] hover:bg-[#ffdad6] text-[#002531] hover:text-[#ba1a1a] text-xs font-bold flex items-center justify-center gap-2 active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-base">logout</span>
          <span>Sign Out & Switch Vessel ID</span>
        </button>
        <p className="mt-2 text-[10px] text-[#72787c] text-center">
          Tidekind Marine Network Protocol • v2.4-Bali • ID: TK-BLI-88930
        </p>
      </div>

      {/* Modal: View Muster Pass */}
      {isPassModalOpen && (
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
            <p className="text-xs text-[#72787c] mt-0.5">Steward: Alex Steward (TK-BLI-88930)</p>

            {/* QR Code graphic */}
            <div className="my-4 mx-auto w-40 h-40 rounded-2xl bg-[#f6faff] p-3 flex flex-col items-center justify-center border border-dashed border-[#c1c7cb]">
              <span className="material-symbols-outlined text-6xl text-[#002531] mb-1">
                qr_code_2
              </span>
              <span className="text-[10px] font-mono text-[#72787c] font-bold">
                SCAN AT DOCK GANTRY
              </span>
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

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsLogModalOpen(false);
                showToast(`Logged ${logWeight} kg net at ${logLocation}!`, 'task_alt');
              }}
              className="space-y-3"
            >
              <div>
                <label className="text-[11px] font-bold text-[#72787c] block mb-1">
                  Activity Category
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    className="h-10 rounded-full bg-[#006a63] text-white text-xs font-bold flex items-center justify-center gap-1 shadow-xs"
                  >
                    <span className="material-symbols-outlined text-base">set_meal</span>
                    <span>Net Recovery</span>
                  </button>
                  <button
                    type="button"
                    className="h-10 rounded-full bg-[#e8eff7] text-[#002531] text-xs font-bold flex items-center justify-center gap-1"
                  >
                    <span className="material-symbols-outlined text-base">hourglass_bottom</span>
                    <span>Volunteer Hours</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#72787c] block mb-1">
                  Quantity / Net Mass (kg)
                </label>
                <input
                  type="number"
                  value={logWeight}
                  onChange={(e) => setLogWeight(e.target.value)}
                  className="w-full h-11 px-3 rounded-2xl bg-[#f6faff] text-xs font-semibold border border-[#dce3eb]"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#72787c] block mb-1">
                  Muster / Harbor Location
                </label>
                <input
                  type="text"
                  value={logLocation}
                  onChange={(e) => setLogLocation(e.target.value)}
                  className="w-full h-11 px-3 rounded-2xl bg-[#f6faff] text-xs font-semibold border border-[#dce3eb]"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#72787c] block mb-1">
                  Verification Method
                </label>
                <div className="p-3 rounded-2xl bg-[#eef4fc] flex items-center justify-between text-xs border border-[#dce3eb]">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#006a63]">domain_verification</span>
                    <span className="text-[#002531] font-semibold">Co-op Scale Station #3</span>
                  </div>
                  <span className="text-[10px] text-[#006a63] font-bold">Auto-Pair</span>
                </div>
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
                  className="flex-1 h-11 rounded-full bg-[#006a63] text-white text-xs font-bold shadow-md active:scale-95"
                >
                  Submit Log
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
