interface GitHubTokenResponse {
    access_token: string;
    token_type: string;
    scope: string;
}

interface GitHubUser {
    id: number;
    login: string;
    name: string | null;
    email: string | null;
    avatar_url: string;
}

interface GitHubEmail {
    email: string;
    primary: boolean;
    verified: boolean;
    visibility: string | null;
}

export class GitHubOAuthService {
    private clientId: string;
    private clientSecret: string;
    private redirectUri: string;

    constructor() {
        this.clientId = process.env.GITHUB_CLIENT_ID || "";
        this.clientSecret = process.env.GITHUB_CLIENT_SECRET || "";
        this.redirectUri = process.env.GITHUB_OAUTH_REDIRECT_URI || "";

        if (!this.clientId || !this.clientSecret || !this.redirectUri) {
            console.warn("⚠️ GitHub OAuth not configured. Missing environment variables:");
            if (!this.clientId) console.warn("  - GITHUB_CLIENT_ID");
            if (!this.clientSecret) console.warn("  - GITHUB_CLIENT_SECRET");
            if (!this.redirectUri) console.warn("  - GITHUB_OAUTH_REDIRECT_URI");
        } else {
            console.log("✅ GitHub OAuth configured successfully");
        }
    }

    async exchangeCodeForToken(code: string): Promise<string> {
        if (!this.clientId || !this.clientSecret) {
            throw new Error("GitHub OAuth not configured");
        }

        const response = await fetch("https://github.com/login/oauth/access_token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                client_id: this.clientId,
                client_secret: this.clientSecret,
                code,
                redirect_uri: this.redirectUri,
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("[GitHub OAuth] Token exchange failed:", errorText);
            throw new Error(`GitHub token exchange failed: ${response.statusText}`);
        }

        const data = (await response.json()) as GitHubTokenResponse;

        if (!data.access_token) {
            console.error("[GitHub OAuth] No access token in response:", data);
            throw new Error("No access token received from GitHub");
        }

        return data.access_token;
    }

    async getUserInfo(accessToken: string): Promise<{ openId: string; name: string | null; email: string | null }> {
        // Fetch user profile
        const userResponse = await fetch("https://api.github.com/user", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: "application/vnd.github.v3+json",
            },
        });

        if (!userResponse.ok) {
            const errorText = await userResponse.text();
            console.error("[GitHub OAuth] User fetch failed:", errorText);
            throw new Error(`GitHub user fetch failed: ${userResponse.statusText}`);
        }

        const user = (await userResponse.json()) as GitHubUser;

        // Fetch user emails if email is not public
        let email = user.email;
        if (!email) {
            const emailsResponse = await fetch("https://api.github.com/user/emails", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    Accept: "application/vnd.github.v3+json",
                },
            });

            if (emailsResponse.ok) {
                const emails = (await emailsResponse.json()) as GitHubEmail[];
                const primaryEmail = emails.find((e) => e.primary && e.verified);
                email = primaryEmail?.email || emails[0]?.email || null;
            }
        }

        return {
            openId: `github:${user.id}`,
            name: user.name || user.login,
            email,
        };
    }
}

export const githubOAuth = new GitHubOAuthService();
