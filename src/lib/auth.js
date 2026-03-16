import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        await connectDB();
        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          // RECHAZAR inicio de sesión si el correo no está registrado previamente
          console.log(`Acceso denegado para: ${user.email}`);
          return false; 
        } else {
          // Usuario existe, procedemos y actualizamos sus datos de Google (foto/nombre)
          await User.findOneAndUpdate(
            { email: user.email },
            { name: user.name, image: user.image }
          );
          return true;
        }
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        await connectDB();
        const dbUser = await User.findOne({ email: user.email });
        if (dbUser) {
          token.role = dbUser.role;
          token.image = dbUser.image; // Persistir imagen de DB en el token
        }
      }
      // Manejar actualización manual de la sesión (ej. cambio de nombre)
      if (trigger === "update" && session?.name) {
        token.name = session.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
        session.user.image = token.image; // Servir imagen de DB en la sesión
      }
      return session;
    },
  },
  pages: {
    signIn: '/admin/login',
    error: '/admin/error',
  },
};
