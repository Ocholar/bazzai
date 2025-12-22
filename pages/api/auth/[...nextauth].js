import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export default NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Only allow specific GitHub usernames or org members
      const allowedAdmins = ["your-github-username"];
      if (allowedAdmins.includes(profile.login)) {
        return true;
      }
      return false;
    },
    async session({ session, token, user }) {
      // Optionally add admin flag to session
      session.isAdmin = true;
      return session;
    },
  },
});
