import React from "react";

interface DlonLogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
}

export const DlonLogo: React.FC<DlonLogoProps> = ({
  className = "",
  iconOnly = false,
  size = "md",
}) => {
  const dimensions = {
    sm: { icon: "w-8 h-8", text: "text-lg", subtitle: "text-[7px]" },
    md: { icon: "w-12 h-12", text: "text-2xl", subtitle: "text-[9px]" },
    lg: { icon: "w-20 h-20", text: "text-4xl", subtitle: "text-[12px]" },
    xl: { icon: "w-32 h-32", text: "text-6xl", subtitle: "text-[15px]" },
  };

  const current = dimensions[size];

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {/* SVG Icon */}
      <div className={`${current.icon} relative group select-none`}>
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-[#D4AF37]/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <svg
          viewBox="0 0 120 120"
          fill="currentColor"
          className="w-full h-full text-white filter drop-shadow-[0_2px_8px_rgba(212,175,55,0.25)] transition-transform duration-300 group-hover:scale-[1.03]"
        >
          {/* Dot on the left - gold accent */}
          <circle cx="28" cy="60" r="7.5" fill="#D4AF37" />

          {/* Top Hook of the 'D' */}
          <path
            d="M 52,60 
               C 52,43 62,35 83,35 
               L 96,35 
               C 107,35 113,42 113,54 
               L 113,57 
               L 95,57 
               L 95,53 
               C 95,49 92,47 86,47 
               L 77,47 
               C 66,47 62,52 62,60 
               Z"
            className="fill-white"
          />

          {/* Bottom Hook of the 'D' */}
          <path
            d="M 52,60 
               C 52,77 62,85 83,85 
               L 96,85 
               C 107,85 113,78 113,66 
               L 113,63 
               L 95,63 
               L 95,67 
               C 95,71 92,73 86,73 
               L 77,73 
               C 66,73 62,68 62,60 
               Z"
            className="fill-white"
          />
        </svg>
      </div>

      {!iconOnly && (
        <div className="mt-3 flex flex-col items-center">
          {/* Main Logo Text "DLON.io" */}
          <div className="flex items-baseline font-sans font-bold tracking-widest text-white select-none">
            <span className={`${current.text} font-extrabold uppercase tracking-[0.25em]`}>
              DLOn
            </span>
            <span className={`${current.text} text-[#D4AF37] font-normal tracking-[0.1em]`}>
              .io
            </span>
          </div>

          {/* Subtitle "TECHNOLOGY SOLUTIONS FOR ENTREPRENEURS" */}
          <div className={`mt-2 font-sans font-medium tracking-[0.38em] text-white/50 uppercase text-center whitespace-nowrap leading-none ${current.subtitle}`}>
            Technology Solutions For Entrepreneurs
          </div>
        </div>
      )}
    </div>
  );
};
