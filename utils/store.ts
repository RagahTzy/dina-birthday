"use client";

// Simple in-memory store for sharing name across pages
// Uses sessionStorage for persistence across navigation

const AUTHORIZED_NAMES = ["dina", "dina anita"];

export const normalizeName = (name: string): string =>
  name
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();

export const isAuthorizedName = (name: string): boolean =>
  AUTHORIZED_NAMES.includes(normalizeName(name));

export const getAuthorizedDisplayName = (name: string): string => {
  const normalized = normalizeName(name);
  if (normalized === "dina anita") return "Dina Anita";
  if (normalized === "dina") return "Dina";
  return name.trim();
};

export const getStoredName = (): string => {
  if (typeof window === "undefined") return "";
  return sessionStorage.getItem("birthday_name") || "";
};

export const setStoredName = (name: string): void => {
  if (typeof window === "undefined") return;
  sessionStorage.setItem("birthday_name", name);
};

export const clearStoredName = (): void => {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem("birthday_name");
};
