import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  // A database is optional, but required to persist accounts in a database
  database: process.env.DATABASE_URL,

  callbacks: {
    session: async (session, user) => {
      // 本当はちゃんとJWTとユーザーのチェックが必要
      session.user.id = user.id as number;
      return session;
    },
  },
});
