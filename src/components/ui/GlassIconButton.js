import './GlassIconButton.css';

const gradientMapping = {
  primary: 'linear-gradient(135deg, #396542, #2a4d32)',
  dark: 'linear-gradient(135deg, #1d2729, #111819)',
  pastel: 'linear-gradient(135deg, #cadedd, #b0c9c7)',
  cream: 'linear-gradient(135deg, #fdf9e1, #e8e3c3)'
};

export default function GlassIconButton({ 
  icon, 
  color = 'primary', 
  isActive = false,
  className = '',
  iconClassName = '',
  darkMode = false,
  onClick
}) {
  const backgroundStyle = gradientMapping[color] ? { background: gradientMapping[color] } : { background: color };

  return (
    <div 
      className={`glass-btn-3d-container relative ${isActive ? 'glass-btn-3d-active' : ''} ${darkMode ? 'dark-mode-glass' : ''} ${className}`}
      onClick={onClick}
    >
      <div className="glass-btn-3d w-full h-full rounded-2xl">
        <span className="glass-btn-3d__back rounded-2xl"></span>
        <span className="glass-btn-3d__front rounded-2xl" style={backgroundStyle}>
          <span className={`material-symbols-outlined m-auto relative z-10 transition-colors duration-300 ${iconClassName}`} aria-hidden="true">
            {icon}
          </span>
        </span>
      </div>
    </div>
  );
}
