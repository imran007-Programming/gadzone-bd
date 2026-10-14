import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

// Sanitize URL env vars: next-auth's client code runs `new URL(...)` on
// NEXTAUTH_URL / AUTH_URL at module-evaluation time, and a value that starts
// with `https://` but is otherwise unparseable (e.g. `https://` on its own,
// stray whitespace/quotes) throws and crashes the whole build during
// prerendering. Drop unparseable values so NextAuth falls back to
// trustHost / request host instead of crashing. Never throw here.
for (const key of ["NEXTAUTH_URL", "AUTH_URL"] as const) {
  const raw = process.env[key];
  if (raw === undefined) continue;
  try {
    new URL(raw);
  } catch {
    // Retry once with a cleaned-up variant (stray whitespace / surrounding
    // quotes, as happens when a value is pasted into a dashboard).
    const cleaned = raw.trim().replace(/^["']|["']$/g, "");
    try {
      new URL(cleaned);
      process.env[key] = cleaned;
    } catch {
      delete process.env[key];
    }
  }
}

const adminEmails = (process.env.ADMIN_EMAILS ?? "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

// Sanitize Google OAuth credentials: pasting from a dashboard often adds
// stray whitespace or surrounding quotes, which makes Auth.js throw a
// `Configuration` error at sign-in time (the /api/auth/signin/google route
// then redirects to /api/auth/error?error=Configuration). Trim those here.
// Only presence is ever logged — values stay secret.
for (const key of ["GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET"] as const) {
  const raw = process.env[key];
  if (raw === undefined) continue;
  const cleaned = raw.trim().replace(/^["']|["']$/g, "");
  if (cleaned !== raw) process.env[key] = cleaned;
}

const googleClientId = process.env.GOOGLE_CLIENT_ID ?? "";
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET ?? "";
if (!googleClientId || !googleClientSecret) {
  console.warn(
    "[auth] GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET missing — Google sign-in will fail with a Configuration error."
  );
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  // Secret comes from env only (AUTH_SECRET or NEXTAUTH_SECRET). Never hardcoded.
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
  providers: [
    Google({
      // Empty-string fallbacks keep the build from crashing when env vars are
      // missing; sign-in itself will fail at runtime and the UI explains why.
      // Values were sanitized above (whitespace/quotes trimmed).
      clientId: googleClientId,
      clientSecret: googleClientSecret,
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
