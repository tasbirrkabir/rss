"use client";

import { createContext, useContext } from "react";

import type { PublicHomeContent, PublicSiteConfig } from "@/lib/public-content";
import {
  staticHomeContent,
  staticSiteConfig,
  whatsappUrl,
} from "@/lib/public-content";

/**
 * Client-side access to DB-backed site content.
 *
 * Root layout (server) loads SiteConfig + HomeContent from the database and
 * passes them in. Any client component can then read live content with
 * useSiteConfig() — with the static launch values as a safe fallback so the
 * site never breaks if the provider is missing (e.g. on /admin pages).
 */

export type SiteConfigBundle = {
  config: PublicSiteConfig;
  home: PublicHomeContent;
  /** Build a pre-filled wa.me link from the configured WhatsApp number. */
  whatsappUrl: (text: string) => string;
};

const SiteConfigContext = createContext<SiteConfigBundle | null>(null);

const fallbackBundle: SiteConfigBundle = {
  config: staticSiteConfig,
  home: staticHomeContent,
  whatsappUrl: (text: string) =>
    whatsappUrl(staticSiteConfig.whatsappNumber, text),
};

export function SiteConfigProvider({
  config,
  home,
  children,
}: {
  config: PublicSiteConfig;
  home: PublicHomeContent;
  children: React.ReactNode;
}) {
  const bundle: SiteConfigBundle = {
    config,
    home,
    whatsappUrl: (text: string) => whatsappUrl(config.whatsappNumber, text),
  };
  return (
    <SiteConfigContext.Provider value={bundle}>
      {children}
    </SiteConfigContext.Provider>
  );
}

export function useSiteConfig(): SiteConfigBundle {
  return useContext(SiteConfigContext) ?? fallbackBundle;
}
