import React, { useState } from 'react';
import { ASSETS } from '../data/assets';
import { ScreenId } from '../types';

interface RecyclingScreenProps {
  onNavigate: (screen: ScreenId) => void;
  showToast: (msg: string, icon?: string) => void;
}

export const RecyclingScreen: React.FC<RecyclingScreenProps> = ({ onNavigate, showToast }) => {
  const [activeFilter, setActiveFilter] = useState<'repair' | 'collection' | 'recycling'>('repair');
  const [search, setSearch] = useState('');
  const [isSlotModalOpen, setIsSlotModalOpen] = useState(false);

  return (
    <div className="flex flex-col w-full pb-28 pt-2 max-w-lg mx-auto px-4 space-y-4">
      {/* Top Header */}
      <div className="flex items-center gap-2.5 pt-1">
        <button
          onClick={() => onNavigate('home')}
          className="w-9 h-9 rounded-full bg-[#e8eff7] flex items-center justify-center text-[#002531] hover:bg-[#dce3eb] transition-colors"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
        </button>
        <div className="flex flex-col min-w-0">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#006a63]">
            Circularity Network
          </span>
          <h1 className="text-lg font-bold text-[#151c22]">Resource Exchange</h1>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative w-full">
        <span className="material-symbols-outlined text-[#72787c] absolute left-3.5 top-1/2 -translate-y-1/2 text-xl">
          search
        </span>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-11 pl-11 pr-10 bg-white text-[#151c22] placeholder:text-[#72787c] text-xs sm:text-sm rounded-full shadow-xs border border-[#e8eff7] focus:outline-none focus:ring-2 focus:ring-[#006a63]"
          placeholder="Search nylon 6, lofts, depots, riggers..."
          type="text"
        />
        <button
          onClick={() => showToast('Filtering facilities in Bali & East Java', 'tune')}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-[#72787c]"
        >
          <span className="material-symbols-outlined text-base">tune</span>
        </button>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        <button
          onClick={() => setActiveFilter('repair')}
          className={`shrink-0 h-9 px-4 rounded-full text-xs font-bold shadow-xs flex items-center gap-1.5 transition-all ${
            activeFilter === 'repair'
              ? 'bg-[#006a63] text-white'
              : 'bg-[#e8eff7] text-[#41484b] hover:bg-[#dce3eb]'
          }`}
        >
          <span className="material-symbols-outlined text-base">handyman</span>
          <span>Repair Lofts & Mending</span>
        </button>
        <button
          onClick={() => setActiveFilter('collection')}
          className={`shrink-0 h-9 px-4 rounded-full text-xs font-bold shadow-xs flex items-center gap-1.5 transition-all ${
            activeFilter === 'collection'
              ? 'bg-[#006a63] text-white'
              : 'bg-[#e8eff7] text-[#41484b] hover:bg-[#dce3eb]'
          }`}
        >
          <span className="material-symbols-outlined text-base">warehouse</span>
          <span>Collection & Drop Depots</span>
        </button>
        <button
          onClick={() => setActiveFilter('recycling')}
          className={`shrink-0 h-9 px-4 rounded-full text-xs font-bold shadow-xs flex items-center gap-1.5 transition-all ${
            activeFilter === 'recycling'
              ? 'bg-[#006a63] text-white'
              : 'bg-[#e8eff7] text-[#41484b] hover:bg-[#dce3eb]'
          }`}
        >
          <span className="material-symbols-outlined text-base">recycling</span>
          <span>Recycling & Chipping Hubs</span>
        </button>
      </div>

      {/* Active Trade-in Bonus Banner */}
      <div className="w-full bg-[#123b4a] text-white rounded-3xl p-4 sm:p-5 relative overflow-hidden shadow-md border border-white/10">
        <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-[#90f4e9]/10 pointer-events-none blur-2xl"></div>
        <div className="flex items-start gap-3 relative z-10">
          <div className="w-10 h-10 rounded-2xl bg-[#006a63] text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
            <span className="material-symbols-outlined text-xl">currency_exchange</span>
          </div>
          <div className="flex flex-col gap-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="bg-[#90f4e9]/20 text-[#90f4e9] text-[10px] font-bold px-2 py-0.5 rounded-full">
                Active Trade-in Bonus
              </span>
              <span className="text-[#7fa5b7] text-[10px] font-semibold">Bali Pilot Zone</span>
            </div>
            <p className="text-xs text-[#e8eff7] leading-relaxed">
              <strong className="text-[#90f4e9] font-bold">Circular Net Trade-in:</strong> Receive{' '}
              <span className="text-white font-bold">Rp 4,000 / kg</span> incentive for clean sorted
              monofilament or exchange directly for repaired leadline spools.
            </p>
            <div className="pt-1 flex items-center gap-2">
              <button
                onClick={() => onNavigate('explore')}
                className="inline-flex items-center gap-1 text-xs text-[#90f4e9] font-bold hover:underline"
              >
                <span>Find nearest weigh station</span>
                <span className="material-symbols-outlined text-xs">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Facilities List Header */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#006a63]"></span>
          <span className="text-xs font-bold text-[#151c22]">Verified Maritime Facilities</span>
        </div>
        <span className="text-xs text-[#72787c]">3 Results Nearby</span>
      </div>

      {/* Facilities Cards */}
      <div className="space-y-4">
        {/* Facility 1: Serangan Loft */}
        {(activeFilter === 'repair' || activeFilter === 'collection') && (
          <div className="w-full bg-white rounded-3xl p-4 sm:p-5 shadow-sm border border-[#e8eff7] flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between gap-2">
                <span className="bg-[#90f4e9]/40 text-[#00504a] text-[10px] px-2.5 py-0.5 rounded-full font-bold">
                  Net Repair Service
                </span>
                <div className="flex items-center gap-1 text-[#72787c] text-[11px] font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#006a63] shrink-0"></span>
                  <span>Open Mon-Sat</span>
                </div>
              </div>
              <h2 className="text-base font-bold text-[#151c22] pt-0.5">
                Serangan Artisanal Net Mending Loft
              </h2>
              <div className="flex items-center gap-1 text-[#41484b] text-xs">
                <span className="material-symbols-outlined text-sm text-[#006a63]">
                  verified_user
                </span>
                <span className="truncate">Master Riggers: Pak Budi & Serangan Fisher Co-op</span>
              </div>
            </div>

            <div className="w-full h-36 rounded-2xl overflow-hidden relative shadow-inner bg-[#002531]">
              <img
                src={ASSETS.pakBudiMending}
                alt="Pak Budi Mending"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm text-xs text-[#151c22] font-bold">
                <span className="material-symbols-outlined text-xs text-[#006a63]">pace</span>
                <span>24–48h Turnaround</span>
              </div>
            </div>

            <div className="bg-[#f6faff] p-3 rounded-2xl border border-[#e8eff7] space-y-1">
              <span className="text-[10px] text-[#72787c] uppercase tracking-wider font-bold">
                Accepted Services
              </span>
              <div className="flex flex-wrap gap-1.5 pt-0.5">
                <span className="bg-white text-[#151c22] text-xs px-2.5 py-1 rounded-full border border-[#e8eff7]">
                  Trammel net re-braiding
                </span>
                <span className="bg-white text-[#151c22] text-xs px-2.5 py-1 rounded-full border border-[#e8eff7]">
                  Patch stitching
                </span>
                <span className="bg-white text-[#151c22] text-xs px-2.5 py-1 rounded-full border border-[#e8eff7]">
                  Cork line replacement
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-[#41484b]">
              <div className="flex items-center gap-1 truncate">
                <span className="material-symbols-outlined text-base text-[#006a63]">near_me</span>
                <span className="truncate">Jl. Pelabuhan Serangan No. 8</span>
              </div>
              <span className="text-xs font-bold text-[#006a63] shrink-0">3.2 km away</span>
            </div>

            <div className="flex flex-col gap-2 pt-1">
              <button
                onClick={() => setIsSlotModalOpen(true)}
                className="w-full h-11 rounded-full bg-[#006a63] hover:bg-[#123b4a] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-base">calendar_month</span>
                <span>Request Mending Slot</span>
              </button>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() =>
                    showToast('Directions plotted to Serangan Harbor Dock', 'directions')
                  }
                  className="h-10 rounded-full bg-[#e8eff7] text-[#002531] text-xs font-bold flex items-center justify-center gap-1 active:scale-95"
                >
                  <span className="material-symbols-outlined text-sm text-[#006a63]">
                    directions
                  </span>
                  <span>Directions</span>
                </button>
                <button
                  onClick={() => showToast('Calling Serangan Fisher Co-op loft...', 'call')}
                  className="h-10 rounded-full bg-[#e8eff7] text-[#002531] text-xs font-bold flex items-center justify-center gap-1 active:scale-95"
                >
                  <span className="material-symbols-outlined text-sm text-[#006a63]">call</span>
                  <span>Call Workshop</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Facility 2: Kusamba Coastal Shredder */}
        {(activeFilter === 'collection' || activeFilter === 'repair') && (
          <div className="w-full bg-white rounded-3xl p-4 sm:p-5 shadow-sm border border-[#e8eff7] flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between gap-2">
                <span className="bg-[#90f4e9] text-[#00504a] text-[10px] px-2.5 py-0.5 rounded-full font-bold">
                  Gear Collection Depot
                </span>
                <div className="flex items-center gap-1 text-[#72787c] text-[11px] font-semibold">
                  <span className="material-symbols-outlined text-xs">schedule</span>
                  <span>Daily 08:00 - 17:00</span>
                </div>
              </div>
              <h2 className="text-base font-bold text-[#151c22] pt-0.5">
                Kusamba Coastal Shredder & Collection Depot
              </h2>
              <div className="flex items-center gap-1 text-[#41484b] text-xs">
                <span className="material-symbols-outlined text-sm text-[#006a63]">location_on</span>
                <span className="truncate">Kusamba Fisher Port, Klungkung</span>
              </div>
            </div>

            <div className="bg-[#eef4fc] p-3 rounded-2xl border border-[#dce3eb] space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#151c22]">Weekly Depot Load</span>
                <span className="font-bold text-[#006a63]">65% Full (780 / 1,200 kg)</span>
              </div>
              <div className="w-full h-2.5 bg-[#dce3eb] rounded-full overflow-hidden flex">
                <div className="h-full bg-[#006a63] rounded-full" style={{ width: '65%' }}></div>
              </div>
              <span className="text-[#72787c] text-[10px] block">
                Capacity resets every Monday morning after barge transfer.
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] text-[#72787c] uppercase tracking-wider font-bold">
                Accepted Materials
              </span>
              <div className="flex flex-wrap gap-1.5">
                <span className="inline-flex items-center gap-1 bg-[#e8eff7] text-[#151c22] text-xs px-2.5 py-0.5 rounded-full font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#006a63]"></span>Nylon 6 gillnets
                </span>
                <span className="inline-flex items-center gap-1 bg-[#e8eff7] text-[#151c22] text-xs px-2.5 py-0.5 rounded-full font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#006a63]"></span>HDPE trawl lines
                </span>
                <span className="inline-flex items-center gap-1 bg-[#e8eff7] text-[#151c22] text-xs px-2.5 py-0.5 rounded-full font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#006a63]"></span>Plastic floats
                </span>
                <span className="inline-flex items-center gap-1 bg-[#ffdad6] text-[#ba1a1a] text-xs px-2.5 py-0.5 rounded-full font-bold">
                  <span className="material-symbols-outlined text-xs">block</span>NO wire traps
                </span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-[#f6faff] border border-[#e8eff7] flex items-start gap-2.5">
              <span className="material-symbols-outlined text-[#006a63] text-lg shrink-0 mt-0.5">
                cleaning_services
              </span>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#151c22]">Preparation Guide</span>
                <p className="text-[11px] text-[#41484b] mt-0.5">
                  Must be salt-rinsed and free of organic matter before drop-off to qualify for
                  compensation.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() =>
                  showToast('Drop-off scheduled at Kusamba weigh station', 'schedule')
                }
                className="h-10 rounded-full bg-[#006a63] text-white text-xs font-bold flex items-center justify-center gap-1 shadow-xs active:scale-95"
              >
                <span className="material-symbols-outlined text-sm">schedule</span>
                <span>Schedule Drop-off</span>
              </button>
              <button
                onClick={() =>
                  showToast('Guide: Clean monofilament nets qualify for Rp 4,000/kg', 'info')
                }
                className="h-10 rounded-full bg-[#e8eff7] text-[#002531] text-xs font-bold flex items-center justify-center gap-1 active:scale-95"
              >
                <span className="material-symbols-outlined text-sm text-[#006a63]">info</span>
                <span>Material Guide</span>
              </button>
            </div>
          </div>
        )}

        {/* Facility 3: PT Daur Samudera Chipping Facility */}
        {(activeFilter === 'recycling' || activeFilter === 'repair') && (
          <div className="w-full bg-white rounded-3xl p-4 sm:p-5 shadow-sm border border-[#e8eff7] flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between gap-2">
                <span className="bg-[#c2e8fb] text-[#001f29] text-[10px] px-2.5 py-0.5 rounded-full font-bold">
                  Certified Industrial Recycler
                </span>
                <div className="flex items-center gap-1 text-[#006a63] text-xs font-bold">
                  <span className="material-symbols-outlined text-sm">verified</span>
                  <span>ISO 14001</span>
                </div>
              </div>
              <h2 className="text-base font-bold text-[#151c22] pt-0.5">
                PT Daur Samudera Polymer Chipping Facility
              </h2>
              <div className="flex items-center gap-1 text-[#41484b] text-xs">
                <span className="material-symbols-outlined text-sm text-[#006a63]">factory</span>
                <span className="truncate">Banyuwangi Industrial Marine Corridor</span>
              </div>
            </div>

            <div className="w-full h-32 rounded-2xl overflow-hidden relative shadow-inner bg-[#002531]">
              <img
                src={ASSETS.polymerPlant}
                alt="Polymer Chipping"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#002531]/80 via-transparent to-transparent flex items-end p-3">
                <span className="text-white text-xs font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-[#90f4e9]">token</span>
                  <span>High-purity recycled ocean granules (rPA6)</span>
                </span>
              </div>
            </div>

            <div className="space-y-1 bg-[#f6faff] p-3 rounded-2xl border border-[#e8eff7]">
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[#006a63] text-base shrink-0 mt-0.5">
                  change_circle
                </span>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#151c22]">Circular Destination</span>
                  <p className="text-[11px] text-[#41484b]">
                    Reclaimed marine pellets batch-certified for high-tensile outdoor furniture &
                    technical textiles.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-[#e8eff7] text-xs">
                <span className="text-[#72787c]">Minimum Consignment</span>
                <span className="font-bold text-[#002531] bg-[#e8eff7] px-2 py-0.5 rounded-full">
                  50 kg bulk
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-1">
              <button
                onClick={() =>
                  showToast('Consignment inquiry sent to PT Daur Samudera desk', 'local_shipping')
                }
                className="w-full h-10 rounded-full bg-[#006a63] hover:bg-[#123b4a] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-base">local_shipping</span>
                <span>Inquire for Bulk Batch</span>
              </button>
              <button
                onClick={() =>
                  showToast('Verified Certificate #DSM-8831: 100% Post-consumer Ghost Nylon', 'verified')
                }
                className="w-full h-10 rounded-full bg-[#e8eff7] text-[#002531] text-xs font-bold flex items-center justify-center gap-1 active:scale-95"
              >
                <span className="material-symbols-outlined text-base text-[#006a63]">
                  workspace_premium
                </span>
                <span>View Circularity Certificate</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Rigger / Partner Callout */}
      <div className="w-full bg-[#eef4fc] rounded-3xl p-5 shadow-sm border border-[#dce3eb] flex flex-col items-center text-center gap-2">
        <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-[#006a63] shadow-xs">
          <span className="material-symbols-outlined text-2xl">add_business</span>
        </div>
        <div className="flex flex-col max-w-xs">
          <h3 className="text-sm font-bold text-[#151c22]">Are you a rigger or recycling partner?</h3>
          <p className="text-xs text-[#41484b] mt-0.5">
            Expand your reach across East Java and Bali fishermen while bolstering ocean recovery.
          </p>
        </div>
        <button
          onClick={() => showToast('Opening partner accreditation application', 'handshake')}
          className="w-full h-11 rounded-full bg-[#002531] hover:bg-[#123b4a] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all mt-1"
        >
          <span className="material-symbols-outlined text-base">handshake</span>
          <span>Offer a Repair or Drop Service (Submit for Review)</span>
        </button>
      </div>

      {/* Request Mending Slot Modal */}
      {isSlotModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#002531]/70 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl space-y-3">
            <div className="flex items-center justify-between border-b pb-2 border-[#e8eff7]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#006a63] text-xl">
                  calendar_month
                </span>
                <h3 className="text-sm font-bold text-[#151c22]">Request Mending Slot</h3>
              </div>
              <button
                onClick={() => setIsSlotModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#e8eff7] flex items-center justify-center text-[#41484b]"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <label className="font-bold text-[#002531] block mb-1">Select Service</label>
                <select className="w-full h-11 px-3 rounded-2xl bg-[#f6faff] border border-[#dce3eb]">
                  <option>Trammel net re-braiding</option>
                  <option>Patch stitching</option>
                  <option>Cork line replacement</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-[#002531] block mb-1">Preferred Date</label>
                <input
                  type="date"
                  defaultValue="2025-05-20"
                  className="w-full h-11 px-3 rounded-2xl bg-[#f6faff] border border-[#dce3eb]"
                />
              </div>

              <div>
                <label className="font-bold text-[#002531] block mb-1">Net Length (approx)</label>
                <input
                  type="text"
                  defaultValue="40 meters"
                  className="w-full h-11 px-3 rounded-2xl bg-[#f6faff] border border-[#dce3eb]"
                />
              </div>

              <button
                onClick={() => {
                  setIsSlotModalOpen(false);
                  showToast('Slot booked with Master Rigger Pak Budi!', 'task_alt');
                }}
                className="w-full mt-2 py-3 rounded-full bg-[#006a63] text-white font-bold active:scale-95"
              >
                Confirm Mending Reservation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
