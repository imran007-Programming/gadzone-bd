import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const adminEmails = (process.env.ADMIN_EMAILS ?? "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  // Secret comes from env only (AUTH_SECRET or NEXTAUTH_SECRET). Never hardcoded.
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
  providers: [
    Google({
      // Empty-string fallbacks keep the build from crashing when env vars are
      // missing; sign-in itself will fail at runtime and the UI explains why.
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    jwt({ token }) {
      const email = token.email?.toLowerCase();
      token.role = email && adminEmails.includes(email) ? "admin" : "customer";
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.role = (token.role as "admin" | "customer" | undefined) ?? "customer";
      }
      return session;
    },
  },
});
