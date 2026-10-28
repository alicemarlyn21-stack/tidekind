import React, { useState } from 'react';
import { ASSETS } from '../data/assets';
import { ScreenId } from '../types';

interface CommunityFeedScreenProps {
  onNavigate: (screen: ScreenId) => void;
  showToast: (msg: string, icon?: string) => void;
}

export const CommunityFeedScreen: React.FC<CommunityFeedScreenProps> = ({
  onNavigate,
  showToast,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'volunteer' | 'repair' | 'verified'>('all');
  const [likes, setLikes] = useState<{ [key: string]: { count: number; liked: boolean } }>({
    post1: { count: 28, liked: false },
    post2: { count: 19, liked: false },
    post3: { count: 42, liked: false },
  });
  const [isVolunteerRegistered, setIsVolunteerRegistered] = useState(false);
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [newPostText, setNewPostText] = useState('');

  const toggleLike = (postId: string) => {
    setLikes((prev) => {
      const current = prev[postId];
      const liked = !current.liked;
      const count = liked ? current.count + 1 : current.count - 1;
      showToast(liked ? 'Marked as helpful' : 'Unmarked', 'thumb_up');
      return { ...prev, [postId]: { count, liked } };
    });
  };

  const handleRegisterCrew = () => {
    setIsVolunteerRegistered(!isVolunteerRegistered);
    showToast(
      isVolunteerRegistered
        ? 'Shift registration cancelled'
        : 'Registered for Benoa Port crew shift!',
      isVolunteerRegistered ? 'info' : 'task_alt'
    );
  };

  const handleShare = () => {
    showToast('Link copied to clipboard!', 'share');
  };

  return (
    <div className="flex flex-col w-full pb-28 pt-2 max-w-lg mx-auto px-4 space-y-4">
      {/* Guidelines Notice Banner */}
      <div className="bg-[#123b4a] text-white rounded-3xl p-4 shadow-sm relative overflow-hidden flex items-start gap-3 border border-white/10">
        <div className="p-2 rounded-full bg-[#006a63] text-white shrink-0 flex items-center justify-center">
          <span className="material-symbols-outlined text-base">verified_user</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#90f4e9] uppercase tracking-wider">
              Field Standards
            </span>
            <span className="material-symbols-outlined text-xs opacity-60">info</span>
          </div>
          <p className="text-xs text-[#a6ccdf] mt-0.5 leading-snug">
            Respectful, collaborative marine action. Never post sensitive wildlife coordinates or
            unverified claims.
          </p>
        </div>
      </div>

      {/* Quick Action & Post Trigger */}
      <div className="bg-white rounded-3xl p-3 shadow-sm border border-[#e8eff7] flex items-center gap-2.5">
        <div className="w-10 h-10 rounded-2xl bg-[#e8eff7] flex items-center justify-center text-[#006a63] shrink-0">
          <span className="material-symbols-outlined text-xl">edit_note</span>
        </div>
        <button
          onClick={() => setIsComposerOpen(true)}
          className="flex-1 text-left bg-[#f6faff] hover:bg-[#eef4fc] text-[#41484b] text-xs font-medium py-2.5 px-4 rounded-full transition-colors truncate border border-[#e8eff7]"
        >
          Share an update, request volunteers, or report gear...
        </button>
        <button
          onClick={() => {
            setIsComposerOpen(true);
            showToast('Ready to attach camera photo', 'add_a_photo');
          }}
          className="w-10 h-10 rounded-full bg-[#e8eff7] hover:bg-[#dce3eb] flex items-center justify-center text-[#002531] shrink-0"
          title="Attach Field Photo"
        >
          <span className="material-symbols-outlined text-lg">add_a_photo</span>
        </button>
      </div>

      {/* Filter Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        <button
          onClick={() => setActiveTab('all')}
          className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
            activeTab === 'all'
              ? 'bg-[#006a63] text-white shadow-xs'
              : 'bg-[#e8eff7] text-[#41484b] hover:bg-[#dce3eb]'
          }`}
        >
          All Updates
        </button>
        <button
          onClick={() => setActiveTab('volunteer')}
          className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
            activeTab === 'volunteer'
              ? 'bg-[#006a63] text-white shadow-xs'
              : 'bg-[#e8eff7] text-[#41484b] hover:bg-[#dce3eb]'
          }`}
        >
          Volunteer Requests
        </button>
        <button
          onClick={() => setActiveTab('repair')}
          className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
            activeTab === 'repair'
              ? 'bg-[#006a63] text-white shadow-xs'
              : 'bg-[#e8eff7] text-[#41484b] hover:bg-[#dce3eb]'
          }`}
        >
          Repair & Repurposing
        </button>
        <button
          onClick={() => setActiveTab('verified')}
          className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
            activeTab === 'verified'
              ? 'bg-[#006a63] text-white shadow-xs'
              : 'bg-[#e8eff7] text-[#41484b] hover:bg-[#dce3eb]'
          }`}
        >
          Verified Outcomes
        </button>
      </div>

      {/* Feed Container */}
      <div className="space-y-4">
        {/* POST 1: Repair Milestone (Budi Santoso) */}
        {(activeTab === 'all' || activeTab === 'repair') && (
          <article className="bg-white rounded-3xl p-4 sm:p-5 shadow-sm border border-[#e8eff7] flex flex-col gap-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative shrink-0">
                  <div className="w-11 h-11 rounded-full bg-[#123b4a] text-white flex items-center justify-center text-xs font-bold">
                    BS
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-[#90f4e9] text-[#00201d] rounded-full p-0.5 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[12px] font-bold">anchor</span>
                  </div>
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-[#151c22] truncate">Budi Santoso</span>
                    <span className="material-symbols-outlined text-[#006a63] text-sm">verified</span>
                  </div>
                  <span className="text-[11px] text-[#41484b] truncate">
                    Serangan Fishermen Cooperative Lead
                  </span>
                  <span className="text-[10px] text-[#72787c]">2h ago • Serangan Depot, Bali</span>
                </div>
              </div>
              <button
                onClick={() => showToast('Flagged for marine community review', 'flag')}
                className="text-[#72787c] hover:text-[#ba1a1a] p-1 rounded-full"
                title="Flag"
              >
                <span className="material-symbols-outlined text-lg">flag</span>
              </button>
            </div>

            <div>
              <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-[11px] font-bold bg-[#90f4e9]/50 text-[#00504a]">
                <span className="material-symbols-outlined text-xs">build_circle</span>
                <span>#RepairBeforeReplace</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#151c22] leading-relaxed">
              Completed our weekend net mending session with 14 local fishers. Instead of discarding
              damaged trammel nets, we reinforced 240 meters with recycled twine provided by
              TIDEKIND depot.
            </p>

            <div className="rounded-2xl overflow-hidden bg-[#002531] relative h-48">
              <img
                src={ASSETS.fishermenRepairing}
                alt="Fishermen repairing nets"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 bg-[#002531]/80 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 text-white text-xs font-semibold">
                <span className="material-symbols-outlined text-xs text-[#90f4e9]">straighten</span>
                <span>240m Restored</span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-1 flex items-center justify-between border-t border-[#e8eff7]">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleLike('post1')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    likes.post1.liked
                      ? 'bg-[#90f4e9] text-[#00504a]'
                      : 'bg-[#f6faff] hover:bg-[#eef4fc] text-[#41484b]'
                  }`}
                >
                  <span className="material-symbols-outlined text-base">thumb_up</span>
                  <span>{likes.post1.count} Helpful</span>
                </button>
                <button
                  onClick={() => showToast('Viewing 6 comments from Serangan stewards', 'comment')}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#f6faff] hover:bg-[#eef4fc] text-[#41484b] text-xs font-semibold"
                >
                  <span className="material-symbols-outlined text-base">mode_comment</span>
                  <span>6</span>
                </button>
              </div>
              <button
                onClick={handleShare}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#f6faff] hover:bg-[#eef4fc] text-[#41484b] text-xs font-semibold"
              >
                <span className="material-symbols-outlined text-base">share</span>
                <span>Share</span>
              </button>
            </div>
          </article>
        )}

        {/* POST 2: Volunteer Opportunity (Sarah Jenkins) */}
        {(activeTab === 'all' || activeTab === 'volunteer') && (
          <article className="bg-white rounded-3xl p-4 sm:p-5 shadow-sm border border-[#e8eff7] flex flex-col gap-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative shrink-0">
                  <div className="w-11 h-11 rounded-full bg-[#006a63] text-white flex items-center justify-center text-xs font-bold">
                    SJ
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-[#ffdbd1] text-[#460b00] rounded-full p-0.5 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[12px] font-bold">campaign</span>
                  </div>
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-[#151c22] truncate">Sarah Jenkins</span>
                    <span className="material-symbols-outlined text-[#006a63] text-sm">handshake</span>
                  </div>
                  <span className="text-[11px] text-[#41484b] truncate">
                    Ocean Action Bali Coordinator
                  </span>
                  <span className="text-[10px] text-[#72787c]">5h ago • Benoa Port Hub</span>
                </div>
              </div>
              <button
                onClick={() => showToast('Flagged for marine review', 'flag')}
                className="text-[#72787c] hover:text-[#ba1a1a] p-1 rounded-full"
              >
                <span className="material-symbols-outlined text-lg">flag</span>
              </button>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-0.5 rounded-full text-[11px] font-bold bg-[#ffdbd1] text-[#460b00]">
                #VolunteerOpportunity
              </span>
              <span className="px-3 py-0.5 rounded-full text-[11px] font-semibold bg-[#e8eff7] text-[#002531]">
                This Thursday, 08:30 WITA
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#151c22] leading-relaxed">
              Seeking 5 volunteers this Thursday at Benoa Port to assist with weighing, tagging, and
              baling nylon trawl nets before shipment to recycling facility. Gloves and safety boots
              provided.
            </p>

            {/* Crew Capacity Box */}
            <div className="bg-[#eef4fc] rounded-2xl p-4 flex flex-col gap-2.5 border border-[#dce3eb]">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#41484b] font-medium">Crew Capacity</span>
                <span className="font-bold text-[#006a63]">
                  {isVolunteerRegistered ? '4/5 spots filled' : '3/5 spots filled'}
                </span>
              </div>
              <div className="w-full bg-[#dce3eb] rounded-full h-2.5 overflow-hidden flex">
                <div
                  className="bg-[#006a63] h-full rounded-full transition-all duration-300"
                  style={{ width: isVolunteerRegistered ? '80%' : '60%' }}
                ></div>
              </div>
              <div className="flex items-center justify-between pt-1">
                <div className="flex -space-x-2 overflow-hidden">
                  <div className="w-6 h-6 rounded-full bg-[#002531] text-white text-[10px] flex items-center justify-center font-bold">
                    RA
                  </div>
                  <div className="w-6 h-6 rounded-full bg-[#90f4e9] text-[#00201d] text-[10px] flex items-center justify-center font-bold">
                    WT
                  </div>
                  <div className="w-6 h-6 rounded-full bg-[#ffdbd1] text-[#460b00] text-[10px] flex items-center justify-center font-bold">
                    LK
                  </div>
                </div>
                <span className="text-xs text-[#41484b]">
                  {isVolunteerRegistered ? '1 berth open' : '2 berths open'}
                </span>
              </div>

              <button
                onClick={handleRegisterCrew}
                className={`w-full mt-1 py-3 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all ${
                  isVolunteerRegistered
                    ? 'bg-[#90f4e9] text-[#00201d]'
                    : 'bg-[#006a63] hover:bg-[#123b4a] text-white'
                }`}
              >
                <span className="material-symbols-outlined text-base">
                  {isVolunteerRegistered ? 'check' : 'person_add'}
                </span>
                <span>{isVolunteerRegistered ? 'Registered for Shift' : 'Register to Help'}</span>
              </button>
            </div>

            {/* Actions */}
            <div className="pt-1 flex items-center justify-between border-t border-[#e8eff7]">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleLike('post2')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    likes.post2.liked
                      ? 'bg-[#90f4e9] text-[#00504a]'
                      : 'bg-[#f6faff] hover:bg-[#eef4fc] text-[#41484b]'
                  }`}
                >
                  <span className="material-symbols-outlined text-base">thumb_up</span>
                  <span>{likes.post2.count} Helpful</span>
                </button>
                <button
                  onClick={() => showToast('Opening comments...', 'comment')}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#f6faff] hover:bg-[#eef4fc] text-[#41484b] text-xs font-semibold"
                >
                  <span className="material-symbols-outlined text-base">mode_comment</span>
                  <span>4</span>
                </button>
              </div>
              <button
                onClick={handleShare}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#f6faff] hover:bg-[#eef4fc] text-[#41484b] text-xs font-semibold"
              >
                <span className="material-symbols-outlined text-base">share</span>
                <span>Share</span>
              </button>
            </div>
          </article>
        )}

        {/* POST 3: Circular Recycling Milestone (PT Daur Samudera) */}
        {(activeTab === 'all' || activeTab === 'verified') && (
          <article className="bg-white rounded-3xl p-4 sm:p-5 shadow-sm border border-[#e8eff7] flex flex-col gap-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative shrink-0">
                  <div className="w-11 h-11 rounded-full bg-[#002531] text-white flex items-center justify-center text-xs font-bold">
                    DS
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-[#006a63] text-white rounded-full p-0.5 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[12px] font-bold">recycling</span>
                  </div>
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-[#151c22] truncate">PT Daur Samudera</span>
                    <span className="material-symbols-outlined text-[#006a63] text-sm">verified</span>
                  </div>
                  <span className="text-[11px] text-[#41484b] truncate">
                    Recycling Partner • Industrial Tier
                  </span>
                  <span className="text-[10px] text-[#72787c]">1d ago • Sidoarjo Facility</span>
                </div>
              </div>
              <button
                onClick={() => showToast('Flagged for review', 'flag')}
                className="text-[#72787c] hover:text-[#ba1a1a] p-1 rounded-full"
              >
                <span className="material-symbols-outlined text-lg">flag</span>
              </button>
            </div>

            <div>
              <span className="px-3 py-0.5 rounded-full text-[11px] font-bold bg-[#90f4e9] text-[#00504a]">
                #MaterialCircularity
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#151c22] leading-relaxed">
              First batch of 450kg marine nylon from the Kuta pilot successfully cleaned and chipped
              for pellet extrusion test! Traceability batch certificate #ID-KT-088 verified.
            </p>

            {/* Reclaimed Polymer Stat Card */}
            <div className="bg-[#eef4fc] rounded-2xl p-4 flex items-center justify-between border border-[#dce3eb]">
              <div className="flex flex-col">
                <span className="text-[11px] text-[#72787c] font-semibold">Reclaimed Polymer</span>
                <span className="text-xl font-bold text-[#002531]">450 kg Net Mass</span>
                <span className="text-xs font-bold text-[#006a63] flex items-center gap-1 mt-0.5">
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  <span>Extrusion Ready</span>
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[#90f4e9]/30 flex items-center justify-center text-[#006a63]">
                <span className="material-symbols-outlined text-2xl">token</span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-1 flex items-center justify-between border-t border-[#e8eff7]">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleLike('post3')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    likes.post3.liked
                      ? 'bg-[#90f4e9] text-[#00504a]'
                      : 'bg-[#f6faff] hover:bg-[#eef4fc] text-[#41484b]'
                  }`}
                >
                  <span className="material-symbols-outlined text-base">thumb_up</span>
                  <span>{likes.post3.count} Helpful</span>
                </button>
                <button
                  onClick={() => showToast('Opening comments...', 'comment')}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#f6faff] hover:bg-[#eef4fc] text-[#41484b] text-xs font-semibold"
                >
                  <span className="material-symbols-outlined text-base">mode_comment</span>
                  <span>8</span>
                </button>
              </div>
              <button
                onClick={handleShare}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#f6faff] hover:bg-[#eef4fc] text-[#41484b] text-xs font-semibold"
              >
                <span className="material-symbols-outlined text-base">share</span>
                <span>Share</span>
              </button>
            </div>
          </article>
        )}
      </div>

      {/* Post Composer Modal */}
      {isComposerOpen && (
        <div className="fixed inset-0 z-50 bg-[#002531]/70 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl space-y-3">
            <div className="flex items-center justify-between border-b pb-2 border-[#e8eff7]">
              <h3 className="text-base font-bold text-[#151c22]">Share Field Update</h3>
              <button
                onClick={() => setIsComposerOpen(false)}
                className="w-8 h-8 rounded-full bg-[#e8eff7] flex items-center justify-center text-[#41484b]"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>

            <textarea
              value={newPostText}
              onChange={(e) => setNewPostText(e.target.value)}
              placeholder="What did you observe or salvage today? Share details, coordinates or request sorting volunteers..."
              className="w-full p-3 rounded-2xl bg-[#f6faff] text-xs text-[#151c22] border border-[#dce3eb] focus:outline-none focus:ring-2 focus:ring-[#006a63] resize-none"
              rows={4}
            ></textarea>

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => showToast('Attached marine camera snapshot', 'photo_camera')}
                  className="px-3 py-1.5 rounded-full bg-[#e8eff7] text-[#002531] text-xs font-semibold flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-base">photo_camera</span>
                  <span>Photo</span>
                </button>
                <button
                  type="button"
                  onClick={() => showToast('Location pinned to Sanur Port', 'location_on')}
                  className="px-3 py-1.5 rounded-full bg-[#e8eff7] text-[#002531] text-xs font-semibold flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-base">location_on</span>
                  <span>Port Hub</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsComposerOpen(false);
                  setNewPostText('');
                  showToast('Field update posted to community feed!', 'task_alt');
                }}
                className="px-5 py-2.5 rounded-full bg-[#006a63] text-white text-xs font-bold active:scale-95 transition-all"
              >
                Post Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
