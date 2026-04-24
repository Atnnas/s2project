export default function Footer() {
  const socialLinks = [
    {
      href: "https://www.facebook.com/profile.php?id=61584523825008",
      icon: "fa-brands fa-facebook-f",
      label: "Facebook",
    },
    {
      href: "https://www.instagram.com/s2project_marketing/",
      icon: "fa-brands fa-instagram",
      label: "Instagram",
    },
    {
      href: "https://api.whatsapp.com/send?phone=50660060026",
      icon: "fa-brands fa-whatsapp",
      label: "WhatsApp",
    },
  ];

  return (
    <footer data-navbar-theme="dark" className="bg-primary text-white mt-auto">
      <div className="max-w-[1920px] mx-auto px-6 md:px-[clamp(2rem,10vw,10rem)] py-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Left: Copyright */}
          <p className="text-[10px] uppercase tracking-[0.15em] font-semibold text-white/40 order-3 sm:order-1">
            &copy; 2026 S2 Project. Todos los derechos reservados.
          </p>

          {/* Center: Social Icons */}
          <div className="flex items-center gap-3 order-1 sm:order-2">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-9 h-9 flex items-center justify-center rounded-full border border-white/10 text-white/50 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-300"
              >
                <i className={`${social.icon} text-sm`}></i>
              </a>
            ))}
          </div>

          {/* Right: Legal Links + Dev Credit */}
          <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.15em] font-semibold order-2 sm:order-3">
            <a href="/privacidad" className="text-white/40 hover:text-white/80 transition-colors duration-300">
              Privacidad
            </a>
            <span className="text-white/10">|</span>
            <a href="/terminos" className="text-white/40 hover:text-white/80 transition-colors duration-300">
              Términos
            </a>
            <span className="text-white/10">|</span>
            <span className="text-white/25">
              by <span className="text-white/40">kumaDev.inc</span>
            </span>
          </div>

        </div>
      </div>
    </footer>
  );
}
