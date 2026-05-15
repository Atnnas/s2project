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
    async signIn({ user }) {
      try {
        await connectDB();
        
        // POWER USER: David Artavia
        const isSuperAdmin = user.email === "david.artavia.rodriguez@gmail.com";
        
        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser && !isSuperAdmin) {
          // RECHAZAR inicio de sesión si el correo no está registrado previamente
          console.log(`Acceso denegado para: ${user.email} (No existe)`);
          return false; 
        }
        
        if (!isSuperAdmin && existingUser && !existingUser.isActive) {
          // RECHAZAR inicio de sesión si el usuario existe pero está desactivado
          console.log(`Acceso denegado para: ${user.email} (Cuenta inactiva)`);
          return '/admin/error?error=inactive';
        } else if (isSuperAdmin) {
          // Asegurar que el superadmin siempre tenga el rol Admin y esté activo
          await User.findOneAndUpdate(
            { email: user.email },
            { 
              name: user.name, 
              image: user.image,
              role: 'Admin',
              isActive: true 
            },
            { upsert: true }
          );
          return true;
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
          token.isActive = dbUser.isActive;
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
        session.user.isActive = token.isActive;
      }
      return session;
    },
  },
  pages: {
    signIn: '/admin/login',
    error: '/admin/error',
  },
};
