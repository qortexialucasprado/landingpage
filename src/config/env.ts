const whatsappNumber =
  import.meta.env.VITE_WHATSAPP_NUMBER ?? "5521968261797";

const whatsappBaseUrl =
  import.meta.env.VITE_WHATSAPP_URL ?? `https://wa.me/${whatsappNumber}`;

const whatsappMessage = import.meta.env.VITE_WHATSAPP_MESSAGE ?? "";

export const siteEnv = {
  appEnv: import.meta.env.VITE_APP_ENV ?? "production",
  siteUrl: import.meta.env.VITE_SITE_URL ?? "",
  siteName:
    import.meta.env.VITE_SITE_NAME ?? "Lucas Prado Personal Trainer",
  whatsappNumber,
  instagramHandle:
    import.meta.env.VITE_INSTAGRAM_HANDLE ?? "teamlucasprado",
  instagramUrl:
    import.meta.env.VITE_INSTAGRAM_URL ??
    "https://instagram.com/teamlucasprado",
  contactEmail:
    import.meta.env.VITE_CONTACT_EMAIL ?? "lucasspradoo01@gmail.com",
};

export function getWhatsAppUrl(): string {
  if (!whatsappMessage.trim()) {
    return whatsappBaseUrl;
  }

  const separator = whatsappBaseUrl.includes("?") ? "&" : "?";
  return `${whatsappBaseUrl}${separator}text=${encodeURIComponent(whatsappMessage)}`;
}
