/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_ENV: string;
  readonly VITE_SITE_URL: string;
  readonly VITE_SITE_NAME: string;
  readonly VITE_WHATSAPP_NUMBER: string;
  readonly VITE_WHATSAPP_URL: string;
  readonly VITE_WHATSAPP_MESSAGE: string;
  readonly VITE_INSTAGRAM_HANDLE: string;
  readonly VITE_INSTAGRAM_URL: string;
  readonly VITE_CONTACT_EMAIL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
