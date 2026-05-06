'use client';

import type { AppUser } from './supabase';

const KEY = 'vexlap-session';

export function saveSession(u: AppUser) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEY, JSON.stringify(u));
}

export function loadSession(): AppUser | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AppUser;
  } catch {
    return null;
  }
}

export function clearSession() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(KEY);
}
