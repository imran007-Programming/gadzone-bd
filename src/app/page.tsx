import { connection } from "next/server";
import HomeClient from "@/components/HomeClient";

// Allow this route to block on connection() instead of requiring a
// non-empty static shell (Cache Components validation).
export const instant = false;

// Home must not be statically prerendered: it imports next-auth/react,
// whose module scope parses NEXTAUTH_URL, and an invalid value crashes the
// build during prerendering. Awaiting connection() makes this route render
// on demand instead.
export default async function Home() {
  await connection();
  return <HomeClient />;
}
