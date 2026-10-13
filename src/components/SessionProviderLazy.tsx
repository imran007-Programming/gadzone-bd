"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";

// next-auth/react evaluates NEXTAUTH_URL at module-evaluation time, and the
// production value can be invalid. /_not-found is always statically
// prerendered inside the root layout, so a statically imported
// SessionProvider crashes the build. next/dynamic with ssr:false is only
// allowed in Client Components, so this wrapper keeps the SessionProvider
// chunk out of server prerendering entirely — it loads in the browser only.
const SessionProvider = dynamic(() => import("@/components/SessionProvider"), {
  ssr: false,
});

export default function SessionProviderLazy({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
