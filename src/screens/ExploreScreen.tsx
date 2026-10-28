import React, { useState } from 'react';
import { ASSETS } from '../data/assets';
import { MAP_LOCATIONS } from '../data/mockData';
import { ScreenId } from '../types';

interface ExploreScreenProps {
  onNavigate: (screen: ScreenId) => void;
  showToast: (msg: string, icon?: string) => void;
}

export const ExploreScreen: React.FC<ExploreScreenProps> = ({ onNavigate, showToast }) => {
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [selectedPinId, setSelectedPinId] = useState<string>('sanur');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const selectedLocation =
    MAP_LOCATIONS.find((loc) => loc.id === selectedPinId) || MAP_LOCATIONS[0];

  const categories = [
    { id: 'all', label: 'All (18)', icon: 'filter_alt' },
    { id: 'projects', label: 'Projects', icon: 'waves' },
    { id: 'repair', label: 'Net Repair', icon: 'build' },
    { id: 'collection', label: 'Collection Points', icon: 'delete_sweep' },
    { id: 'recycling', label: 'Recycling Partners', icon: 'autorenew' },
    { id: 'recovery', label: 'Authorized Recovery', icon: 'shield' },
  ];

  return (
    <div className="flex flex-col w-full pb-28 pt-2 max-w-lg mx-auto px-4 space-y-4">
      {/* Top Safety Pilot Banner */}
      <div className="bg-[#ffdbd1] text-[#460b00] px-4 py-2 rounded-full flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2 min-w-0">
          <span className="material-symbols-outlined text-[#ba1a1a] text-lg shrink-0">
            verified_user
          </span>
          <span className="text-xs font-medium truncate">
            Demo listings — strictly for prototype preview
          </span>
        </div>
        <span className="text-[10px] uppercase tracking-wider bg-[#ba1a1a]/10 px-2 py-0.5 rounded-full text-[#460b00] font-bold shrink-0">
          Testbed
        </span>
      </div>

      {/* View Switcher & Search */}
      <div className="flex flex-col gap-3">
        {/* Toggle Switcher */}
        <div className="bg-[#e8eff7] p-1 rounded-full flex items-center shadow-inner">
          <button
            onClick={() => setViewMode('map')}
            className={`flex-1 py-2 px-4 rounded-full text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 ${
              viewMode === 'map'
                ? 'bg-[#006a63] text-white shadow-sm'
                : 'text-[#41484b] hover:text-[#151c22]'
            }`}
          >
            <span className="material-symbols-outlined text-base">map</span>
            <span>Map View</span>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`flex-1 py-2 px-4 rounded-full text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 ${
              viewMode === 'list'
                ? 'bg-[#006a63] text-white shadow-sm'
                : 'text-[#41484b] hover:text-[#151c22]'
            }`}
          >
            <span className="material-symbols-outlined text-base">view_list</span>
            <span>List Directory</span>
          </button>
        </div>

        {/* Search Input */}
        <div className="relative flex items-center">
          <span className="material-symbols-outlined text-[#123b4a] absolute left-4 pointer-events-none text-xl">
            search
          </span>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white text-[#151c22] text-xs sm:text-sm pl-11 pr-10 py-3 rounded-full shadow-sm border border-[#e8eff7] focus:outline-none focus:ring-2 focus:ring-[#006a63] placeholder:text-[#72787c]"
            placeholder="Search locations, repair hubs, drop-offs..."
            type="text"
          />
          {searchQuery ? (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 text-[#72787c] hover:text-[#151c22]"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          ) : (
            <button
              onClick={() => showToast('Filters: showing verified Bali depots', 'tune')}
              className="absolute right-2 w-8 h-8 rounded-full bg-[#e8eff7] flex items-center justify-center text-[#41484b]"
            >
              <span className="material-symbols-outlined text-base">tune</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Chips Carousel */}
      <div className="w-full overflow-x-auto pb-1 flex items-center gap-1.5 no-scrollbar">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                showToast(`Filtered by ${cat.label}`, cat.icon);
              }}
              className={`shrink-0 py-1.5 px-3 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                isActive
                  ? 'bg-[#002531] text-white shadow-sm'
                  : 'bg-[#eef4fc] text-[#41484b] hover:bg-[#e8eff7]'
              }`}
            >
              <span className="material-symbols-outlined text-sm">{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* MAP VIEW CONTAINER */}
      {viewMode === 'map' && (
        <section className="flex flex-col gap-3">
          {/* Map Canvas Frame */}
          <div className="relative w-full h-[400px] rounded-3xl overflow-hidden shadow-md bg-[#002531] border border-[#dce3eb]">
            {/* Visual Radar Map Backdrop */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-all"
              style={{
                backgroundImage: `url(${ASSETS.benoaMap})`,
              }}
            >
              <div className="absolute inset-0 bg-[#002531]/30 backdrop-blur-[0.5px]"></div>
            </div>

            {/* Floating Radar Status HUD */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
              <div className="pointer-events-auto bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5 text-[#151c22]">
                <span className="w-2 h-2 rounded-full bg-[#006a63] animate-ping"></span>
                <span className="text-xs font-bold text-[#002531]">Sanur Waters • Live Radar</span>
              </div>
              <div className="pointer-events-auto flex flex-col gap-1.5">
                <button
                  onClick={() => showToast('Re-centered on your location', 'my_location')}
                  className="w-9 h-9 rounded-full bg-white text-[#002531] shadow-md flex items-center justify-center active:scale-90 transition-transform"
                  title="My Location"
                >
                  <span className="material-symbols-outlined text-lg">my_location</span>
                </button>
                <button
                  onClick={() => showToast('Switched maritime radar layer', 'layers')}
                  className="w-9 h-9 rounded-full bg-white text-[#002531] shadow-md flex items-center justify-center active:scale-90 transition-transform"
                  title="Toggle Layers"
                >
                  <span className="material-symbols-outlined text-lg">layers</span>
                </button>
              </div>
            </div>

            {/* Pin 1: Sanur Depot (Center) */}
            <div
              onClick={() => setSelectedPinId('sanur')}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20"
            >
              <div className="relative flex flex-col items-center group">
                <div className="bg-[#002531] text-white px-2.5 py-1 rounded-full shadow-lg text-[11px] font-bold flex items-center gap-1 mb-1 border-2 border-[#90f4e9] animate-bounce">
                  <span className="material-symbols-outlined text-xs text-[#90f4e9]">anchor</span>
                  <span className="whitespace-nowrap">Depot (Active)</span>
                </div>
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-transform ${
                    selectedPinId === 'sanur'
                      ? 'bg-[#006a63] text-white ring-4 ring-[#90f4e9] scale-110'
                      : 'bg-[#006a63] text-white'
                  }`}
                >
                  <span className="material-symbols-outlined text-2xl">recycling</span>
                </div>
                <div className="w-2 h-2 bg-[#002531] rounded-full mt-1"></div>
              </div>
            </div>

            {/* Pin 2: Banyuwangi Recovery Base (Top-left) */}
            <div
              onClick={() => setSelectedPinId('banyuwangi')}
              className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
            >
              <div className="relative flex flex-col items-center group">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md active:scale-110 transition-transform ${
                    selectedPinId === 'banyuwangi'
                      ? 'bg-[#460b00] text-white ring-4 ring-[#ffdbd1] scale-110'
                      : 'bg-[#64200d] text-white'
                  }`}
                >
                  <span className="material-symbols-outlined text-base">shield</span>
                </div>
                <span className="absolute -top-1 -right-1 bg-[#ffdbd1] text-[#460b00] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  4
                </span>
              </div>
            </div>

            {/* Pin 3: Serangan Net Repair Hub (Bottom-right) */}
            <div
              onClick={() => setSelectedPinId('serangan')}
              className="absolute bottom-16 right-1/4 -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
            >
              <div className="relative flex flex-col items-center group">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md active:scale-110 transition-transform ${
                    selectedPinId === 'serangan'
                      ? 'bg-[#123b4a] text-white ring-4 ring-[#90f4e9] scale-110'
                      : 'bg-[#123b4a] text-white'
                  }`}
                >
                  <span className="material-symbols-outlined text-base">build</span>
                </div>
                <span className="absolute -top-1 -right-1 bg-[#006a63] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  2
                </span>
              </div>
            </div>

            {/* Pin 4: Kusamba Coastal Bin Hub (Top-right) */}
            <div
              onClick={() => setSelectedPinId('kusamba')}
              className="absolute top-1/3 right-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
            >
              <div className="relative flex flex-col items-center group">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md active:scale-110 transition-transform ${
                    selectedPinId === 'kusamba'
                      ? 'bg-[#e8eff7] text-[#006a63] ring-4 ring-[#006a63] scale-110'
                      : 'bg-white text-[#002531]'
                  }`}
                >
                  <span className="material-symbols-outlined text-base">delete_sweep</span>
                </div>
              </div>
            </div>
          </div>

          {/* Active Detail Card (Bottom Overlay) */}
          <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-lg border border-[#e8eff7] flex flex-col gap-3 transition-all animate-in slide-in-from-bottom duration-200">
            {/* Header Meta */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                  <span className="bg-[#90f4e9] text-[#00504a] px-2.5 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">verified</span>
                    <span>{selectedLocation.statusBadge}</span>
                  </span>
                  <span className="bg-[#e8eff7] text-[#41484b] px-2 py-0.5 rounded-full text-[11px] font-medium">
                    {selectedLocation.distance}
                  </span>
                </div>
                <h2 className="text-base sm:text-lg font-bold text-[#151c22] truncate">
                  {selectedLocation.name}
                </h2>
                <p className="text-xs text-[#41484b] flex items-center gap-1 mt-0.5 truncate">
                  <span className="material-symbols-outlined text-sm text-[#006a63]">
                    location_on
                  </span>
                  <span>{selectedLocation.address}</span>
                </p>
              </div>
            </div>

            {/* Quick Specs Matrix */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="bg-[#f6faff] p-2.5 rounded-2xl border border-[#e8eff7]">
                <span className="text-[11px] text-[#41484b] flex items-center gap-1 font-medium">
                  <span className="material-symbols-outlined text-xs text-[#006a63]">schedule</span>
                  Hours
                </span>
                <span className="text-xs font-bold text-[#151c22] mt-0.5 block truncate">
                  {selectedLocation.hours}
                </span>
                <span className="text-[10px] text-[#006a63] font-bold flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#006a63]"></span>
                  <span>Open Now</span>
                </span>
              </div>
              <div className="bg-[#f6faff] p-2.5 rounded-2xl border border-[#e8eff7]">
                <span className="text-[11px] text-[#41484b] flex items-center gap-1 font-medium">
                  <span className="material-symbols-outlined text-xs text-[#123b4a]">
                    inventory_2
                  </span>
                  Capacity Status
                </span>
                <span className="text-xs font-bold text-[#151c22] mt-0.5 block truncate">
                  {selectedLocation.capacityLeft}
                </span>
                <div className="w-full bg-[#dce3eb] h-1.5 rounded-full mt-1 overflow-hidden">
                  <div
                    className="bg-[#006a63] h-full rounded-full"
                    style={{ width: `${selectedLocation.capacityPercent}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Accepted Fishing Gear Tags */}
            <div className="flex flex-col gap-1.5 pt-1">
              <span className="text-xs font-bold text-[#151c22]">Accepted Fishing Materials:</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedLocation.accepted.map((item, idx) => (
                  <span
                    key={idx}
                    className="bg-[#e8eff7] text-[#151c22] px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-xs text-[#006a63]">check</span>
                    <span>{item}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="grid grid-cols-3 gap-2 pt-1">
              <button
                onClick={() =>
                  showToast(
                    `Directions locked: ${selectedLocation.lat}, ${selectedLocation.lng}`,
                    'directions'
                  )
                }
                className="min-h-[44px] py-2 bg-[#006a63] hover:bg-[#007169] text-white rounded-full text-xs font-bold flex flex-col items-center justify-center gap-0.5 shadow-sm active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-base">directions</span>
                <span>Directions</span>
              </button>
              <button
                onClick={() => onNavigate('recycling')}
                className="min-h-[44px] py-2 bg-[#123b4a] hover:bg-[#002531] text-white rounded-full text-xs font-bold flex flex-col items-center justify-center gap-0.5 shadow-sm active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-base">menu_book</span>
                <span>Drop Guide</span>
              </button>
              <button
                onClick={() =>
                  showToast(`Calling ${selectedLocation.name} radio desk...`, 'support_agent')
                }
                className="min-h-[44px] py-2 bg-[#e8eff7] hover:bg-[#dce3eb] text-[#151c22] rounded-full text-xs font-bold flex flex-col items-center justify-center gap-0.5 active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-base text-[#006a63]">
                  support_agent
                </span>
                <span>Contact Hub</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* LIST VIEW DIRECTORY */}
      {viewMode === 'list' && (
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between py-1">
            <span className="text-xs font-bold text-[#151c22]">
              {MAP_LOCATIONS.length} Verified Facilities Nearby
            </span>
            <span className="text-xs text-[#006a63] font-semibold flex items-center gap-0.5">
              <span className="material-symbols-outlined text-sm">tune</span>
              <span>Sorted by Distance</span>
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {MAP_LOCATIONS.map((loc) => (
              <article
                key={loc.id}
                className="bg-white p-4 rounded-2xl shadow-sm border border-[#e8eff7] flex flex-col gap-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="bg-[#90f4e9] text-[#00504a] px-2 py-0.5 rounded-full text-[10px] font-bold">
                        {loc.statusBadge}
                      </span>
                      <span className="text-[11px] text-[#41484b] font-medium">{loc.distance}</span>
                    </div>
                    <h3 className="text-sm font-bold text-[#151c22] truncate">{loc.name}</h3>
                    <p className="text-xs text-[#41484b] truncate mt-0.5">{loc.address}</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-[#90f4e9]/30 text-[#006a63] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-xl">
                      {loc.type === 'repair'
                        ? 'build'
                        : loc.type === 'recovery'
                        ? 'shield'
                        : 'recycling'}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 py-1">
                  {loc.accepted.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-[#f6faff] text-[#41484b] text-[10px] px-2 py-0.5 rounded-full border border-[#e8eff7]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#e8eff7]">
                  <span className="text-xs text-[#006a63] font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">check_circle</span>
                    <span>{loc.capacityLeft}</span>
                  </span>
                  <button
                    onClick={() => {
                      setSelectedPinId(loc.id);
                      setViewMode('map');
                      showToast(`Focused on ${loc.name}`, 'pin_drop');
                    }}
                    className="px-3 py-1.5 rounded-full bg-[#006a63] text-white text-xs font-bold shadow-xs active:scale-95 transition-all flex items-center gap-1"
                  >
                    <span>View on Map</span>
                    <span className="material-symbols-outlined text-xs">arrow_forward</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Community Impact Counter Footer */}
      <div className="pt-2">
        <div className="w-full bg-[#eef4fc] rounded-2xl p-4 flex items-center justify-between border border-[#dce3eb]">
          <div className="flex flex-col text-left">
            <span className="text-xl font-bold text-[#006a63]">14,280 kg</span>
            <span className="text-xs text-[#41484b]">Ghost gear safely diverted this quarter</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#90f4e9] flex items-center justify-center text-[#00504a] shadow-xs">
            <span className="material-symbols-outlined text-xl">eco</span>
          </div>
        </div>
      </div>
    </div>
  );
};
