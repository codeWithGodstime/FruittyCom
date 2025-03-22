import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/token/`,
            {
              email: credentials.email,
              password: credentials.password,
            }
          );

          // ✅ Ensure the response is successful
          if (response.status !== 200) {
            return null; // Return null to indicate failure
          }

          const user = response.data; // ✅ Use response.data directly
          return user; // ✅ Ensure user object is returned
        } catch (error) {
          console.error("Login failed:", error.response?.data || error.message);
          return null; // Return null on error
        }
      },
    }),
  ],

  // ✅ Callbacks should be outside providers
  callbacks: {
    async jwt({ token, user }) {
    //   console.log(token, user, "JWT called");
      if (user) {
        token.access = user.access; // ✅ Save access token
        token.refresh = user.refresh;
        token.user = user.user;
      }
      return token;
    },

    async session({ session, token }) {
    //   console.log(session, token, "Session called");
      if (token) {
        session.access = token.access; // ✅ Add access token to session
        session.refresh = token.refresh;
        session.user = token.user;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
