"use client";

// Simple in-memory store for sharing name across pages
// Uses sessionStorage for persistence across navigation

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
