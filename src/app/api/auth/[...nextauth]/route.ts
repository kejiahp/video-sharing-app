import bcrypt from "bcrypt";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User.model";
import dbConnect from "@/utils/db-connect";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        try {
          await dbConnect();

          if (!credentials?.email || !credentials?.password) {
            throw new Error("Invalid username or password");
          }

          const user = await User.findOne({
            email: credentials.email,
          });

          if (!user) {
            throw new Error("Invalid credentials");
          }

          const isCorrectPassword = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isCorrectPassword) {
            throw new Error("Invalid credentials");
          }

          return { id: user._id, name: user.username, email: user.email };
        } catch (err: any) {
          throw new Error("Server Error");
        }
      },
    }),
  ],
  callbacks: {
    session({ session, token }) {
      if (token) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    },
    async jwt({ token, user }) {
      await dbConnect();

      const dbUser = await User.findOne({ email: token.email });

      if (!dbUser) {
        token.id = user?.id;
        return token;
      }

      token.id = dbUser._id.toString();
      token.role = dbUser.type;

      return token;
    },
  },
  pages: {
    signIn: "/",
  },
  debug: process.env.NODE_ENV === "development",
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
