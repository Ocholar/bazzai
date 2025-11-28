export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

export const APP_TITLE = import.meta.env.VITE_APP_TITLE || "App";

export const APP_LOGO = "https://placehold.co/128x128/E1E7EF/1F2937?text=App";

// Generate GitHub OAuth login URL
export const getLoginUrl = () => {
  const clientId = "Ov23liFUp6GWScjoRxZL";
  const redirectUri = "https://bazz-ai-agentic-team-production.up.railway.app/api/oauth/callback";

  if (!clientId || !redirectUri) {
    console.warn("Missing GitHub auth configuration");
    return "/login-error";
  }

  try {
    const url = new URL("https://github.com/login/oauth/authorize");
    url.searchParams.set("client_id", clientId);
    url.searchParams.set("redirect_uri", redirectUri);
    url.searchParams.set("scope", "read:user user:email");
    return url.toString();
  } catch (e) {
    console.error("Failed to construct GitHub login URL", e);
    return "/login-error";
  }
};
