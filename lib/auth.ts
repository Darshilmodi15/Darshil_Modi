import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const DEV_EMAIL = "darshil@mission.local";
const DEV_PASSWORD = "mission-control";

export function getAdminCredentials() {
  const email =
    process.env.MISSION_CONTROL_EMAIL ||
    (process.env.NODE_ENV === "development" ? DEV_EMAIL : "");
  const password =
    process.env.MISSION_CONTROL_PASSWORD ||
    (process.env.NODE_ENV === "development" ? DEV_PASSWORD : "");

  return {
    email,
    password,
    isDevFallback:
      process.env.NODE_ENV === "development" &&
      (!process.env.MISSION_CONTROL_EMAIL || !process.env.MISSION_CONTROL_PASSWORD)
  };
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/mission-control/login"
  },
  providers: [
    CredentialsProvider({
      name: "Mission Control",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const admin = getAdminCredentials();

        if (
          credentials?.email === admin.email &&
          credentials?.password === admin.password
        ) {
          return {
            id: "darshil-modi",
            name: "Darshil Modi",
            email: admin.email
          };
        }

        return null;
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email;
      }

      return session;
    }
  }
};
