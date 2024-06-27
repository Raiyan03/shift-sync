import NextAuth, { CredentialsSignin } from "next-auth";
// import Credentials from "next-auth/providers/credentials";
import Credentials from "next-auth/providers/credentials";
import { saltAndHashPassword, getUserFromDB } from "@/app/lib/utilities";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        role:{label: "Role", type:"select"}
      },

      authorize: async (credentials) => {
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;

        let user = null;

        if (!email || !password) {
          throw new CredentialsSignin("Please Provide both email & password");
        }

        const hashedPass = await saltAndHashPassword(password);

        user = await getUserFromDB(email, hashedPass);

        if(!user){
          throw new Error("Invalid User Name or Password")
        }

        return user;
      },
    }),
  ],
  pages:{
    signIn: '/login'
  },
  callbacks:{
    // async authorized({request, auth}){
    //   const {pathname} = request.nextUrl;
    //   if(pathname == "/dashboard") return !!auth
    //   return true;
    // },

    async session({session, token}) {
      if(token?.sub && token?.role && token?.id){
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },

    async jwt({token, user}){
      if(user){
        token.id = user.id
        token.role = user.role
      }
      
      return token
    },

    signIn: async({user, account}) =>{
      if(account?.provider === "credentials"){
        return true;
      }else{
        return false;
      }
    }
  }
  // secret: process.env.AUTH_SECRET,
});
