export default function Footer() {
  return (
    <footer className="bg-primary text-white py-20 px-6 mt-auto">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        {/* Main CTA */}
        <div className="space-y-2">
          <h2 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tighter leading-none">
            INICIA TU HISTORIA AQUI
          </h2>
          <p className="text-sm md:text-md font-display uppercase tracking-[0.3em] font-medium opacity-80">
            S2-PROJECT.COM
          </p>
        </div>

        {/* Social Section */}
        <div className="space-y-6 pt-8">
          <h3 className="text-xl md:text-2xl font-display font-black uppercase tracking-widest opacity-90">
            SOCIAL
          </h3>
          <div className="flex justify-center items-center gap-6">
            <a href="#" className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all hover:scale-110 active:scale-95 border border-white/10">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-8.74h-2.94v-3.403h2.94v-2.511c0-2.91 1.777-4.496 4.375-4.496 1.243 0 2.312.093 2.623.134v3.041l-1.799.001c-1.412 0-1.685.671-1.685 1.656v2.17h3.367l-.438 3.403h-2.929v8.74h6.028c.731 0 1.325-.593 1.325-1.324v-21.351c0-.732-.594-1.325-1.325-1.325z"/>
              </svg>
            </a>
            <a href="#" className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all hover:scale-110 active:scale-95 border border-white/10">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.266.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="#" className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all hover:scale-110 active:scale-95 border border-white/10">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.407 3.481 2.239 2.24 3.478 5.226 3.477 8.406-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.669zm6.722-3.736l.363.216c1.448.86 3.329 1.315 5.259 1.316 5.462 0 9.907-4.445 9.91-9.909.003-2.646-1.02-5.132-2.88-6.991-1.859-1.859-4.343-2.882-6.993-2.883-5.463 0-9.91 4.446-9.913 9.91-.001 2.15.565 4.254 1.637 6.096l.236.406-1.082 3.957 4.053-1.072zm11.954-6.761c-.307-.154-1.817-.897-2.098-.998-.282-.102-.487-.154-.692.154-.205.308-.795.998-.974 1.205-.179.206-.359.231-.666.077-.308-.154-1.299-.479-2.476-1.529-.915-.817-1.534-1.825-1.713-2.133-.18-.308-.019-.475.134-.627.138-.137.308-.359.461-.538.154-.18.205-.308.308-.513.102-.205.051-.385-.026-.538-.077-.154-.692-1.667-.948-2.282-.25-.601-.523-.519-.718-.529l-.615-.013c-.205 0-.538.077-.82.385-.282.308-1.077 1.051-1.077 2.564 0 1.513 1.103 2.974 1.256 3.18.154.205 2.17 3.313 5.257 4.645.735.316 1.307.505 1.754.646.737.234 1.407.201 1.938.122.591-.088 1.817-.743 2.074-1.461.256-.718.256-1.333.179-1.461-.076-.128-.282-.205-.59-.359z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Footer legal */}
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-widest font-black">
          <div className="opacity-40">
            <p>© {new Date().getFullYear()} S2 Project. Todos los derechos reservados.</p>
          </div>
          <div className="flex items-center gap-8">
            <div className="flex gap-6 opacity-40">
              <a href="#" className="hover:opacity-100 transition-opacity">Privacidad</a>
              <a href="#" className="hover:opacity-100 transition-opacity">Términos</a>
            </div>
            <div className="flex items-center gap-2 group">
              <span className="opacity-30">Developed by</span>
              <span className="opacity-60 group-hover:opacity-100 transition-opacity text-white">kumaDev.inc</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
