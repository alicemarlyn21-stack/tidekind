import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ASSETS } from '../data/assets';

export const AuthModal: React.FC = () => {
  const {
    authModalOpen,
    setAuthModalOpen,
    authMode,
    setAuthMode,
    login,
    signup,
    switchDemoAccount,
    forgotPassword,
    resetPassword,
  } = useAuth();

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('Sanur, Bali');
  const [chapter, setChapter] = useState('Sanur Coastal Chapter');
  const [bio, setBio] = useState('Dedicated ocean steward protecting marine habitats from derelict gear.');

  // Password reset state
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [resetStage, setResetStage] = useState<'request' | 'submit'>('request');
  const [resetInfoMsg, setResetInfoMsg] = useState('');

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!authModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      if (authMode === 'login') {
        await login(email, password);
      } else if (authMode === 'signup') {
        if (!name.trim()) throw new Error('Please enter your full name.');
        await signup({ name, email, password, location, chapter, bio });
      } else if (authMode === 'forgot') {
        if (resetStage === 'request') {
          const res = await forgotPassword(email);
          setResetInfoMsg(res.message);
          if (res.debugToken) {
            setResetToken(res.debugToken);
            setResetInfoMsg(`${res.message} (Test Token generated: ${res.debugToken})`);
          }
          setResetStage('submit');
        } else {
          await resetPassword(resetToken, newPassword);
          setResetInfoMsg('Password reset successfully! Please log in.');
          setAuthMode('login');
          setResetStage('request');
        }
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoSwitch = async (demoEmail: string) => {
    setErrorMessage('');
    setIsSubmitting(true);
    try {
      await switchDemoAccount(demoEmail);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed switching demo user.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#002531]/75 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-[#dce3eb] overflow-hidden">
        {/* Header Ribbon */}
        <div className="bg-[#123b4a] text-white p-5 pb-4 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={ASSETS.logo} alt="Tidekind" className="h-7 w-auto object-contain" />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#90f4e9] uppercase tracking-wider font-['DM_Sans']">
                  Tidekind Multi-User Hub
                </span>
                <span className="text-base font-bold text-white font-['DM_Sans']">
                  {authMode === 'login' && 'Steward Sign In'}
                  {authMode === 'signup' && 'Create Steward Account'}
                  {authMode === 'forgot' && 'Account Recovery'}
                </span>
              </div>
            </div>

            <button
              onClick={() => setAuthModalOpen(false)}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              aria-label="Close"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="mt-4 flex rounded-xl bg-black/20 p-1">
            <button
              type="button"
              onClick={() => {
                setAuthMode('login');
                setErrorMessage('');
              }}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                authMode === 'login' ? 'bg-[#006a63] text-white shadow-xs' : 'text-white/70 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMode('signup');
                setErrorMessage('');
              }}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                authMode === 'signup' ? 'bg-[#006a63] text-white shadow-xs' : 'text-white/70 hover:text-white'
              }`}
            >
              Create Account
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMode('forgot');
                setErrorMessage('');
                setResetStage('request');
              }}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                authMode === 'forgot' ? 'bg-[#006a63] text-white shadow-xs' : 'text-white/70 hover:text-white'
              }`}
            >
              Reset Pass
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto no-scrollbar">
          {errorMessage && (
            <div className="p-3 rounded-2xl bg-[#ffdad6] border border-[#ba1a1a]/30 text-[#93000a] text-xs font-semibold flex items-center gap-2">
              <span className="material-symbols-outlined text-base shrink-0">error</span>
              <span>{errorMessage}</span>
            </div>
          )}

          {resetInfoMsg && (
            <div className="p-3 rounded-2xl bg-[#e8eff7] border border-[#006a63]/30 text-[#00504a] text-xs font-medium flex items-center gap-2">
              <span className="material-symbols-outlined text-base text-[#006a63] shrink-0">info</span>
              <span>{resetInfoMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {authMode === 'signup' && (
              <div>
                <label className="block text-[11px] font-bold text-[#41484b] mb-1">
                  Full Name / Callsign <span className="text-[#ba1a1a]">*</span>
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-3 text-[#72787c] text-lg">
                    person
                  </span>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Maya Lin"
                    className="w-full h-11 pl-10 pr-3 rounded-2xl bg-[#f6faff] text-xs font-medium border border-[#dce3eb] focus:border-[#006a63] focus:ring-1 focus:ring-[#006a63] outline-hidden"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[11px] font-bold text-[#41484b] mb-1">
                Email Address <span className="text-[#ba1a1a]">*</span>
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-3 text-[#72787c] text-lg">
                  mail
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full h-11 pl-10 pr-3 rounded-2xl bg-[#f6faff] text-xs font-medium border border-[#dce3eb] focus:border-[#006a63] focus:ring-1 focus:ring-[#006a63] outline-hidden"
                />
              </div>
            </div>

            {(authMode === 'login' || authMode === 'signup') && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-[11px] font-bold text-[#41484b]">
                    Password <span className="text-[#ba1a1a]">*</span>
                  </label>
                  {authMode === 'login' && (
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode('forgot');
                        setResetStage('request');
                      }}
                      className="text-[11px] text-[#006a63] hover:underline font-semibold"
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-3 text-[#72787c] text-lg">
                    lock
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    className="w-full h-11 pl-10 pr-10 rounded-2xl bg-[#f6faff] text-xs font-medium border border-[#dce3eb] focus:border-[#006a63] focus:ring-1 focus:ring-[#006a63] outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-[#72787c] hover:text-[#151c22]"
                  >
                    <span className="material-symbols-outlined text-lg">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>
            )}

            {authMode === 'signup' && (
              <>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-[#41484b] mb-1">Location</label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Sanur, Bali"
                      className="w-full h-10 px-3 rounded-xl bg-[#f6faff] text-xs border border-[#dce3eb]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#41484b] mb-1">Chapter</label>
                    <input
                      type="text"
                      value={chapter}
                      onChange={(e) => setChapter(e.target.value)}
                      placeholder="e.g. Sanur Reef Crew"
                      className="w-full h-10 px-3 rounded-xl bg-[#f6faff] text-xs border border-[#dce3eb]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#41484b] mb-1">Bio / Mission</label>
                  <textarea
                    rows={2}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Short description of your oceanic stewardship goals"
                    className="w-full p-2.5 rounded-xl bg-[#f6faff] text-xs border border-[#dce3eb]"
                  />
                </div>
              </>
            )}

            {authMode === 'forgot' && resetStage === 'submit' && (
              <>
                <div>
                  <label className="block text-[11px] font-bold text-[#41484b] mb-1">
                    Reset Token <span className="text-[#ba1a1a]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={resetToken}
                    onChange={(e) => setResetToken(e.target.value)}
                    placeholder="Paste 24-character token"
                    className="w-full h-11 px-3 rounded-2xl bg-[#f6faff] text-xs font-mono border border-[#dce3eb]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#41484b] mb-1">
                    New Password <span className="text-[#ba1a1a]">*</span>
                  </label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="New password (min 6 chars)"
                    className="w-full h-11 px-3 rounded-2xl bg-[#f6faff] text-xs border border-[#dce3eb]"
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 rounded-full bg-[#006a63] hover:bg-[#00504a] text-white text-xs font-bold shadow-md active:scale-98 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <>
                  <span className="material-symbols-outlined text-base">
                    {authMode === 'login' ? 'login' : authMode === 'signup' ? 'person_add' : 'sync'}
                  </span>
                  <span>
                    {authMode === 'login' && 'Sign In to Hub'}
                    {authMode === 'signup' && 'Register Steward Account'}
                    {authMode === 'forgot' && (resetStage === 'request' ? 'Request Reset Token' : 'Save New Password')}
                  </span>
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Personas Switcher for Testing */}
          <div className="pt-3 border-t border-[#e8eff7]">
            <span className="block text-[11px] font-bold text-[#72787c] mb-2 uppercase tracking-wider text-center">
              Quick Test Personas (Live Multi-User Verification)
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleDemoSwitch('alex@tidekind.org')}
                className="flex flex-col items-center p-2 rounded-2xl bg-[#f6faff] hover:bg-[#eef4fc] border border-[#dce3eb] text-center transition-all group"
                title="Alex Stewart (Tier 2 Steward)"
              >
                <img
                  src={ASSETS.alexSteward}
                  alt="Alex"
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-[#006a63]/40 group-hover:ring-[#006a63] mb-1"
                />
                <span className="text-[11px] font-bold text-[#151c22] leading-tight">Alex Stewart</span>
                <span className="text-[9px] text-[#006a63] font-semibold">Tier 2 Steward</span>
              </button>

              <button
                type="button"
                onClick={() => handleDemoSwitch('budi@tidekind.org')}
                className="flex flex-col items-center p-2 rounded-2xl bg-[#f6faff] hover:bg-[#eef4fc] border border-[#dce3eb] text-center transition-all group"
                title="Pak Budi Santoso (Coordinator)"
              >
                <img
                  src={ASSETS.pakBudiMending}
                  alt="Pak Budi"
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-[#006a63]/40 group-hover:ring-[#006a63] mb-1"
                />
                <span className="text-[11px] font-bold text-[#151c22] leading-tight">Pak Budi</span>
                <span className="text-[9px] text-[#006a63] font-semibold">Master Rigger</span>
              </button>

              <button
                type="button"
                onClick={() => handleDemoSwitch('sarah@tidekind.org')}
                className="flex flex-col items-center p-2 rounded-2xl bg-[#f6faff] hover:bg-[#eef4fc] border border-[#dce3eb] text-center transition-all group"
                title="Dr. Sarah Jenkins (Lead Scientist / Admin)"
              >
                <img
                  src={ASSETS.sarahJenkins}
                  alt="Sarah"
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-[#006a63]/40 group-hover:ring-[#006a63] mb-1"
                />
                <span className="text-[11px] font-bold text-[#151c22] leading-tight">Dr. Sarah</span>
                <span className="text-[9px] text-[#006a63] font-semibold">Lead Scientist</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
