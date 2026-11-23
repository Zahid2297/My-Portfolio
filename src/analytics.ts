import { GA_MEASUREMENT_ID } from "./config";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const PLACEHOLDER = "G-XXXXXXXXXX";

/** Loads the standard gtag.js snippet once, when a real measurement ID is set. */
export function initAnalytics() {
  const id = GA_MEASUREMENT_ID;
  if (!id || id === PLACEHOLDER || !/^G-[A-Z0-9]+$/i.test(id)) return;
  if (document.getElementById("ga-gtag")) return;

  const script = document.createElement("script");
  script.id = "ga-gtag";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  const dataLayer = window.dataLayer;
  function gtag() {
    dataLayer.push(arguments);
  }
  window.gtag = gtag as unknown as Window["gtag"];
  window.gtag("js", new Date());
  window.gtag("config", id);
}
