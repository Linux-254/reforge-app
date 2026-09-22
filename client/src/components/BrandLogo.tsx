import type { SVGProps } from "react";

interface BrandLogoIconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  showBackground?: boolean;
}

/**
 * ReForge Circular Emblem
 * Exactly styled after the user's uploaded emblem image:
 * A circular forest landscape featuring rolling green hills, a glowing cream sun,
 * dual unfurling sprout leaves with dark vein detail, and a winding river path.
 */
export function BrandLogoIcon({
  size = 40,
  className = "",
  ...props
}: BrandLogoIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-label="ReForge emblem"
      {...props}
    >
      <defs>
        {/* Circle Clip */}
        <clipPath id="rf-circle-clip">
          <circle cx="24" cy="24" r="24" />
        </clipPath>

        {/* Deep Forest Sky/Landscape Gradient */}
        <radialGradient id="rf-forest-sky" cx="30" cy="12" r="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4a7c4e" />
          <stop offset="50%" stopColor="#22543d" />
          <stop offset="100%" stopColor="#0d2e1c" />
        </radialGradient>

        {/* Soft Sun Radial Glow */}
        <radialGradient id="rf-sun-glow" cx="29" cy="15" r="10" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fffde8" stopOpacity="1" />
          <stop offset="60%" stopColor="#fef3c7" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#fde68a" stopOpacity="0" />
        </radialGradient>

        {/* Hill Gradients */}
        <linearGradient id="rf-hill-back" x1="0" y1="12" x2="48" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2d5e3b" />
          <stop offset="100%" stopColor="#193f25" />
        </linearGradient>

        <linearGradient id="rf-hill-mid" x1="0" y1="20" x2="48" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1e4a2c" />
          <stop offset="100%" stopColor="#0f2b18" />
        </linearGradient>

        <linearGradient id="rf-hill-fore" x1="12" y1="30" x2="36" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3b7a48" />
          <stop offset="100%" stopColor="#1e4627" />
        </linearGradient>
      </defs>

      <g clipPath="url(#rf-circle-clip)">
        {/* Background Base Circle */}
        <circle cx="24" cy="24" r="24" fill="url(#rf-forest-sky)" />

        {/* Distant Hills */}
        <path
          d="M-4 28C6 22 16 21 26 25C34 28 42 24 52 20V48H-4V28Z"
          fill="url(#rf-hill-back)"
        />

        {/* Sun Disk in Upper Right */}
        <circle cx="29" cy="15" r="5.5" fill="#fef08a" />
        <circle cx="29" cy="15" r="8" fill="url(#rf-sun-glow)" opacity="0.6" />

        {/* Midground Rolling Hills */}
        <path
          d="M-4 34C8 28 20 29 32 33C40 35 48 31 52 29V48H-4V34Z"
          fill="url(#rf-hill-mid)"
        />

        {/* Foreground Mound */}
        <path
          d="M-2 42C10 34 22 34 36 39C42 41 48 40 50 39V48H-2V42Z"
          fill="url(#rf-hill-fore)"
        />

        {/* Winding Path / River Stem (Cream #fdfbf7) */}
        <path
          d="M24 30C23 33 20 34.5 18 36.5C15.5 39 14 41 18 43.5C21 45.5 24 46.5 22 48H28C29 46.5 26 45 23.5 43C21 41 21.5 39.5 23 37.5C24.5 35.5 26.5 33.5 25.5 30H24Z"
          fill="#fefcf6"
        />

        {/* Sprout Stem */}
        <path
          d="M23.2 32C23.2 27 22.8 23 24 18H25C26 23 25.8 27 25.8 32H23.2Z"
          fill="#fefcf6"
        />

        {/* Left Leaf */}
        <path
          d="M24 23.5C20 23 12 18 8 15C12 21 18 26.5 23.8 27.2Z"
          fill="#fefcf6"
        />
        {/* Left Leaf Vein */}
        <path
          d="M23.5 26.8C18.5 25 13.5 20.8 9.8 16.5"
          stroke="#183d22"
          strokeWidth="0.85"
          strokeLinecap="round"
        />

        {/* Right Leaf */}
        <path
          d="M24.8 21.5C29 19.5 35 18.5 38 18C33 22 28.5 25.5 24.2 26.5Z"
          fill="#fefcf6"
        />
        {/* Right Leaf Vein */}
        <path
          d="M24.6 26.2C28.2 24.8 32.5 22 36.5 19.2"
          stroke="#183d22"
          strokeWidth="0.85"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

/**
 * ReForge Complete Logo Brand Lockup
 */
export function BrandLogo({
  className = "",
  iconSize = 40,
  textClass = "text-foreground",
}: {
  className?: string;
  iconSize?: number;
  textClass?: string;
}) {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <BrandLogoIcon size={iconSize} className="transition-transform duration-300 hover:scale-105" />
      <span className={`font-serif text-2xl font-bold tracking-tight ${textClass}`}>
        Re<span className="text-primary font-extrabold">Forge</span>
      </span>
    </div>
  );
}
