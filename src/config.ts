/**
 * Site settings that should change in one place.
 *
 * Google Analytics: set VITE_GA_MEASUREMENT_ID in `.env` (see `.env.example`),
 * or replace the fallback below. Analytics stays off while the ID is the placeholder.
 *
 * WhatsApp: digits only, country code included. 91 is India for 7349629157.
 * wa.me needs the country code or the chat will not open on the right number.
 */
const FALLBACK_GA_MEASUREMENT_ID = "G-XXXXXXXXXX";

export const GA_MEASUREMENT_ID =
  import.meta.env.VITE_GA_MEASUREMENT_ID?.trim() || FALLBACK_GA_MEASUREMENT_ID;

export const WHATSAPP_NUMBER = "917349629157";
