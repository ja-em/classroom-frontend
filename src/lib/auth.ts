import { AuthOptions, getServerSession } from "next-auth";
import { decode, JwtPayload } from "jsonwebtoken";
import CredentialsProvider from "next-auth/providers/credentials";
import { gql, request } from "graphql-request";
import { ISession, IUser } from "@/app/types/interface/auth";
import { redirect } from "next/navigation";

const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(loginInput: { username: $username, password: $password }) {
      accessToken
      refreshToken
    }
  }
`;

// const REFRESH_MUTATION = gql`
//   mutation Refresh($refreshToken: String!) {
//     refreshToken(refreshTokenInput: { refreshToken: $refreshToken }) {
//       accessToken
//       refreshToken
//     }
//   }
// `;

interface ITokenResponse {
  accessToken: string;
  refreshToken: string;
}
export const authOption: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const data = await request<{ login: ITokenResponse }>(
          "http://localhost:3000/graphql",
          LOGIN_MUTATION,
          {
            username: credentials?.username,
            password: credentials?.password,
          }
        );

        const user: IUser = {
          id: Date.now().toString(),
          ...data.login,
        };
        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as IUser).accessToken;
        token.refreshToken = (user as IUser).refreshToken;
        const data = decode((user as IUser).accessToken) as JwtPayload;
        token.expiredIn = data?.exp ?? 0;
      }
      return token;
    },

    async session({ session, token }) {
      const newSession = session as unknown as ISession;

      newSession.accessToken = token.accessToken as string;
      newSession.refreshToken = token.refreshToken as string;
      newSession.expiredIn = token.expiredIn as number;
      session.user = {
        name: "admin",
      };
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const verifySession = async () => {
  const session = (await getServerSession(authOption)) as ISession;
  if (!session) {
    return null;
  }
  const jwtExpiredIn = session.expiredIn * 1000;

  if (jwtExpiredIn < Date.now()) {
    return null;
  }
  return session;
};
