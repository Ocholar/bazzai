export const COOKIE_NAME = "auth_token";
export const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;
export const UNAUTHED_ERR_MSG = "Unauthorized";

export const APP_TITLE = import.meta.env.VITE_APP_TITLE || "App";

export const APP_LOGO = "https://placehold.co/128x128/E1E7EF/1F2937?text=App";

// Generate GitHub OAuth login URL
export const getLoginUrl = () => {
  const origin = typeof window !== "undefined" ? window.location.origin : "https://bazztech.co.ke";
  const redirectUri = encodeURIComponent(`${origin}/api/oauth/callback`);
  return `https://github.com/login/oauth/authorize?client_id=Ov23liFUp6GWScjoRxZL&redirect_uri=${redirectUri}&scope=read%3Auser+user%3Aemail`;
};
