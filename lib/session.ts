import { getServerSession } from "next-auth/next";
import { NextAuthOptions, User } from "next-auth";
//@ts-ignore
import { AdapterUser } from "next-auth/adapter";
import GoogleProvider from "next-auth/providers/google";
import jsonwebtoken from "jsonwebtoken";
import { JWT } from "next-auth/jwt";
import { SessionInterface, UserProfile } from "@/common.types";
import { createUser, getUser } from "./action";

// import { createUser, getUser } from "./actions";
// import { SessionInterface, UserProfile } from "@/common.types";
export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // ...add more providers here
  ],
  jwt: {
    encode: ({ secret, token }) => {
      const encodeToken = jsonwebtoken.sign(
        {
          ...token,
          iss: "grafbase",
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 2,
        },
        secret
      );
      return encodeToken;
    },
    decode: async ({ secret, token }) => {
      const decodeToken = jsonwebtoken.verify(token!, secret) as JWT;
      return decodeToken;
    },
  },
  theme: {
    colorScheme: "light",
    logo: "/logo.svg",
  },
  callbacks: {
    async session({ session }) {
      const email = session?.user?.email as string;
      // connect the logged in user with our data base
      try {
        const data = (await getUser(email)) as { user?: UserProfile };
        const newSession = {
          ...session,
          user: { ...session?.user, ...data?.user },
        };
        return newSession;
      } catch (error) {
        console.log("======SESSION ERROR========================");
        console.log(error);
        console.log("====================================");
        return session;
      }
    },
    async signIn({ user }: { user: AdapterUser | User }) {
      try {
        //make a read if user is present
        const userExists = (await getUser(user?.email as string)) as {
          user?: UserProfile;
        };
        // make a user if not
        if (!userExists.user) {
          await createUser(
            user.name as string,
            user.email as string,
            user.image as string
          );
        }
        return true;
      } catch (error: any) {
        console.log(error);
        return false;
      }
    },
  },
};

export async function getCurrentUser() {
  const session = (await getServerSession(authOptions)) as SessionInterface;

  return session;
}
