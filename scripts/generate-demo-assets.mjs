import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const PUBLIC_IMAGES = "public/images";
const PUBLIC_LOGO = "public/logo";
const APP_DIR = "src/app";

fs.mkdirSync(PUBLIC_IMAGES, { recursive: true });
fs.mkdirSync(PUBLIC_LOGO, { recursive: true });
fs.mkdirSync(APP_DIR, { recursive: true });

function escapeXml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Creates an SVG template with editorial brutalist styling:
 * dark rich slate bg, hairline grid, red accent framing, bold typography,
 * category badge, and custom vector illustration.
 */
function createCardSvg({
  width,
  height,
  title,
  subtitle,
  category,
  badgeText = "DEMO PICTURE",
  theme = "red", // 'red', 'dark', 'forest', 'lake', 'sunset'
  iconType = "scooter",
}) {
  let accentColor = "#F5222D";
  let bgGradient1 = "#16171b";
  let bgGradient2 = "#0e0f12";

  if (theme === "forest") {
    accentColor = "#2EA043";
    bgGradient1 = "#111b14";
    bgGradient2 = "#0c120e";
  } else if (theme === "lake") {
    accentColor = "#388BFD";
    bgGradient1 = "#101726";
    bgGradient2 = "#0b0f19";
  } else if (theme === "sunset") {
    accentColor = "#F0883E";
    bgGradient1 = "#1c1412";
    bgGradient2 = "#100b0a";
  }

  // Draw custom vector artwork based on iconType
  let illustration = "";
  const cx = width / 2;
  const cy = height * 0.44;

  if (iconType === "scooter") {
    illustration = `
      <g transform="translate(${cx - 150}, ${cy - 85}) scale(1.5)">
        <!-- Back wheel -->
        <circle cx="45" cy="115" r="28" fill="none" stroke="${accentColor}" stroke-width="8"/>
        <circle cx="45" cy="115" r="14" fill="#222" stroke="${accentColor}" stroke-width="4"/>
        <circle cx="45" cy="115" r="4" fill="#FFF"/>

        <!-- Front wheel -->
        <circle cx="160" cy="115" r="28" fill="none" stroke="${accentColor}" stroke-width="8"/>
        <circle cx="160" cy="115" r="14" fill="#222" stroke="${accentColor}" stroke-width="4"/>
        <circle cx="160" cy="115" r="4" fill="#FFF"/>

        <!-- Scooter body & deck -->
        <path d="M45,115 L70,85 L115,85 L125,115 L160,115" fill="none" stroke="#F5F3EE" stroke-width="6" stroke-linecap="round"/>
        <path d="M60,85 C60,55 90,55 105,75 L80,105 Z" fill="${accentColor}" opacity="0.9"/>
        <rect x="75" y="55" width="45" height="14" rx="6" fill="#F5F3EE"/>

        <!-- Stem & Handlebars -->
        <line x1="125" y1="115" x2="148" y2="40" stroke="#F5F3EE" stroke-width="7" stroke-linecap="round"/>
        <line x1="148" y1="40" x2="135" y2="35" stroke="${accentColor}" stroke-width="9" stroke-linecap="round"/>
        <circle cx="152" cy="42" r="7" fill="#F5F3EE"/>

        <!-- Speed accent lines -->
        <line x1="10" y1="90" x2="28" y2="90" stroke="${accentColor}" stroke-width="4" stroke-linecap="round" opacity="0.7"/>
        <line x1="18" y1="105" x2="30" y2="105" stroke="${accentColor}" stroke-width="4" stroke-linecap="round" opacity="0.7"/>
      </g>
    `;
  } else if (iconType === "owner") {
    illustration = `
      <g transform="translate(${cx - 100}, ${cy - 110}) scale(1.3)">
        <!-- Avatar circle backdrop -->
        <circle cx="75" cy="75" r="72" fill="#1e2025" stroke="${accentColor}" stroke-width="4"/>
        <!-- Head & shoulders silhouette -->
        <circle cx="75" cy="52" r="26" fill="#F5F3EE"/>
        <!-- Helmet / stylish visor cap -->
        <path d="M48,46 C48,26 102,26 102,46 L108,50 L42,50 Z" fill="${accentColor}"/>
        <!-- Sunglasses / visor -->
        <rect x="58" y="50" width="34" height="10" rx="3" fill="#111"/>
        <!-- Shoulders / jacket -->
        <path d="M30,126 C30,92 50,86 75,86 C100,86 120,92 120,126 Z" fill="#F5F3EE"/>
        <!-- Jacket collar -->
        <polygon points="75,94 62,118 75,130 88,118" fill="${accentColor}"/>
      </g>
    `;
  } else if (iconType === "shop") {
    illustration = `
      <g transform="translate(${cx - 140}, ${cy - 90}) scale(1.4)">
        <!-- Store building -->
        <rect x="25" y="35" width="150" height="95" fill="#181a20" stroke="#F5F3EE" stroke-width="4"/>
        <!-- Awning stripes -->
        <path d="M15,35 L185,35 L175,60 L25,60 Z" fill="${accentColor}"/>
        <path d="M35,35 L55,35 L45,60 L25,60 Z" fill="#FFF" opacity="0.8"/>
        <path d="M75,35 L95,35 L85,60 L65,60 Z" fill="#FFF" opacity="0.8"/>
        <path d="M115,35 L135,35 L125,60 L105,60 Z" fill="#FFF" opacity="0.8"/>
        <path d="M155,35 L175,35 L165,60 L145,60 Z" fill="#FFF" opacity="0.8"/>
        <!-- Door & Windows -->
        <rect x="40" y="70" width="45" height="40" fill="#242830" stroke="#F5F3EE" stroke-width="2"/>
        <rect x="110" y="70" width="40" height="60" fill="${accentColor}" stroke="#F5F3EE" stroke-width="3"/>
        <circle cx="140" cy="100" r="3" fill="#FFF"/>
        <!-- Sign -->
        <rect x="50" y="15" width="100" height="16" fill="#111" stroke="${accentColor}" stroke-width="2"/>
        <text x="100" y="27" fill="#F5F3EE" font-size="10" font-family="sans-serif" font-weight="900" text-anchor="middle" letter-spacing="1">DEMO SHOP</text>
      </g>
    `;
  } else if (iconType === "nature" || iconType === "tea") {
    illustration = `
      <g transform="translate(${cx - 150}, ${cy - 90}) scale(1.5)">
        <!-- Rolling hills / tea rows -->
        <path d="M0,110 Q50,70 100,100 T200,85 L200,130 L0,130 Z" fill="${accentColor}" opacity="0.3"/>
        <path d="M0,120 Q60,85 120,115 T200,105 L200,130 L0,130 Z" fill="${accentColor}" opacity="0.6"/>
        <path d="M0,130 Q70,95 140,125 T200,115 L200,140 L0,140 Z" fill="${accentColor}"/>
        <!-- Sun / morning light -->
        <circle cx="100" cy="50" r="26" fill="#F5F3EE" opacity="0.9"/>
        <!-- Stylized tea leaves -->
        <path d="M95,45 C95,30 110,35 110,45 C110,55 95,50 95,45 Z" fill="${accentColor}"/>
        <path d="M105,45 C105,30 90,35 90,45 C90,55 105,50 105,45 Z" fill="${accentColor}"/>
      </g>
    `;
  } else if (iconType === "lake") {
    illustration = `
      <g transform="translate(${cx - 150}, ${cy - 80}) scale(1.5)">
        <!-- Distant hills -->
        <polygon points="0,95 45,60 90,95" fill="${accentColor}" opacity="0.4"/>
        <polygon points="75,95 130,50 185,95" fill="${accentColor}" opacity="0.5"/>
        <polygon points="140,95 175,70 200,95" fill="${accentColor}" opacity="0.3"/>
        <!-- Water ripples -->
        <rect x="0" y="95" width="200" height="35" fill="${accentColor}" opacity="0.2"/>
        <line x1="20" y1="105" x2="90" y2="105" stroke="#F5F3EE" stroke-width="3" stroke-linecap="round"/>
        <line x1="110" y1="105" x2="180" y2="105" stroke="#F5F3EE" stroke-width="3" stroke-linecap="round"/>
        <line x1="40" y1="118" x2="160" y2="118" stroke="#F5F3EE" stroke-width="3" stroke-linecap="round"/>
        <!-- Lotus or bird silhouette -->
        <path d="M90,85 Q100,75 110,85 Q100,80 90,85 Z" fill="#FFF"/>
      </g>
    `;
  } else if (iconType === "waterfall") {
    illustration = `
      <g transform="translate(${cx - 120}, ${cy - 100}) scale(1.4)">
        <!-- Rock cliffs -->
        <polygon points="20,10 55,10 65,140 10,140" fill="#181a20" stroke="#F5F3EE" stroke-width="3"/>
        <polygon points="115,10 160,10 170,140 105,140" fill="#181a20" stroke="#F5F3EE" stroke-width="3"/>
        <!-- Falling water stream -->
        <rect x="62" y="10" width="46" height="120" fill="${accentColor}" opacity="0.8"/>
        <line x1="72" y1="15" x2="72" y2="125" stroke="#FFF" stroke-width="4" stroke-dasharray="10 6"/>
        <line x1="85" y1="15" x2="85" y2="125" stroke="#FFF" stroke-width="5" stroke-dasharray="14 8"/>
        <line x1="98" y1="15" x2="98" y2="125" stroke="#FFF" stroke-width="4" stroke-dasharray="12 6"/>
        <!-- Mist spray -->
        <ellipse cx="85" cy="130" rx="40" ry="12" fill="#F5F3EE" opacity="0.8"/>
      </g>
    `;
  } else if (iconType === "road") {
    illustration = `
      <g transform="translate(${cx - 150}, ${cy - 85}) scale(1.5)">
        <!-- Perspective road -->
        <polygon points="85,30 115,30 180,130 20,130" fill="#1c1e24" stroke="#F5F3EE" stroke-width="3"/>
        <!-- Center dashed lane marker -->
        <line x1="100" y1="35" x2="100" y2="125" stroke="${accentColor}" stroke-width="6" stroke-dasharray="14 10"/>
        <!-- Horizon sun -->
        <circle cx="100" cy="30" r="22" fill="#F5F3EE"/>
        <!-- Mountain peaks left/right -->
        <polygon points="0,50 35,20 70,50" fill="${accentColor}" opacity="0.5"/>
        <polygon points="130,50 165,18 200,50" fill="${accentColor}" opacity="0.5"/>
      </g>
    `;
  } else if (iconType === "video") {
    illustration = `
      <g transform="translate(${cx - 100}, ${cy - 90}) scale(1.4)">
        <!-- Video frame -->
        <rect x="0" y="0" width="140" height="95" rx="10" fill="#1c1e24" stroke="#F5F3EE" stroke-width="4"/>
        <!-- Big Play Button -->
        <circle cx="70" cy="48" r="30" fill="${accentColor}"/>
        <polygon points="62,34 86,48 62,62" fill="#FFFFFF"/>
        <!-- Timeline bar -->
        <line x1="15" y1="82" x2="125" y2="82" stroke="#444" stroke-width="4" stroke-linecap="round"/>
        <line x1="15" y1="82" x2="65" y2="82" stroke="${accentColor}" stroke-width="4" stroke-linecap="round"/>
      </g>
    `;
  } else if (iconType === "town") {
    illustration = `
      <g transform="translate(${cx - 140}, ${cy - 80}) scale(1.4)">
        <!-- Town buildings -->
        <rect x="15" y="45" width="35" height="75" fill="#1c1f26" stroke="#F5F3EE" stroke-width="3"/>
        <rect x="55" y="25" width="45" height="95" fill="${accentColor}" stroke="#F5F3EE" stroke-width="3"/>
        <rect x="105" y="40" width="35" height="80" fill="#1c1f26" stroke="#F5F3EE" stroke-width="3"/>
        <rect x="145" y="55" width="35" height="65" fill="#242832" stroke="#F5F3EE" stroke-width="3"/>
        <!-- Windows -->
        <rect x="68" y="38" width="8" height="10" fill="#FFF"/>
        <rect x="80" y="38" width="8" height="10" fill="#FFF"/>
        <rect x="68" y="55" width="8" height="10" fill="#FFF"/>
        <rect x="80" y="55" width="8" height="10" fill="#FFF"/>
        <!-- Ground / road -->
        <line x1="0" y1="120" x2="195" y2="120" stroke="#F5F3EE" stroke-width="4"/>
      </g>
    `;
  } else {
    // Default abstract / comparison
    illustration = `
      <g transform="translate(${cx - 100}, ${cy - 75}) scale(1.4)">
        <circle cx="40" cy="50" r="32" fill="none" stroke="${accentColor}" stroke-width="6"/>
        <circle cx="100" cy="50" r="32" fill="none" stroke="#F5F3EE" stroke-width="6"/>
        <path d="M40,30 L100,70" stroke="${accentColor}" stroke-width="5"/>
      </g>
    `;
  }

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${bgGradient1}"/>
          <stop offset="100%" stop-color="${bgGradient2}"/>
        </linearGradient>
        <pattern id="dotPattern" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.5" fill="#FFF" opacity="0.08"/>
        </pattern>
      </defs>

      <!-- Background -->
      <rect width="${width}" height="${height}" fill="url(#bgGrad)"/>
      <rect width="${width}" height="${height}" fill="url(#dotPattern)"/>

      <!-- Border Frame -->
      <rect x="18" y="18" width="${width - 36}" height="${height - 36}" fill="none" stroke="#FFFFFF" stroke-width="1.5" opacity="0.15"/>
      <rect x="24" y="24" width="${width - 48}" height="${height - 48}" fill="none" stroke="${accentColor}" stroke-width="1" opacity="0.3"/>

      <!-- Corner Crosses -->
      <g stroke="#FFFFFF" stroke-width="2" opacity="0.4">
        <line x1="28" y1="36" x2="44" y2="36"/>
        <line x1="36" y1="28" x2="36" y2="44"/>

        <line x1="${width - 44}" y1="36" x2="${width - 28}" y2="36"/>
        <line x1="${width - 36}" y1="28" x2="${width - 36}" y2="44"/>

        <line x1="28" y1="${height - 36}" x2="44" y2="${height - 36}"/>
        <line x1="36" y1="${height - 44}" x2="36" y2="${height - 28}"/>

        <line x1="${width - 44}" y1="${height - 36}" x2="${width - 28}" y2="${height - 36}"/>
        <line x1="${width - 36}" y1="${height - 44}" x2="${width - 36}" y2="${height - 28}"/>
      </g>

      <!-- Top Badge / Header -->
      <g transform="translate(48, 48)">
        <!-- Category Pill -->
        <rect x="0" y="0" width="190" height="34" fill="#0D0E11" stroke="${accentColor}" stroke-width="1.5"/>
        <text x="14" y="22" fill="#F5F3EE" font-size="13" font-family="'Segoe UI', Roboto, sans-serif" font-weight="800" letter-spacing="2">
          ${escapeXml(category.toUpperCase())}
        </text>

        <!-- DEMO Stamp -->
        <rect x="${width - 96 - 150}" y="0" width="150" height="34" fill="${accentColor}"/>
        <text x="${width - 96 - 75}" y="22" fill="#FFFFFF" font-size="13" font-family="'Segoe UI', Roboto, sans-serif" font-weight="900" text-anchor="middle" letter-spacing="2">
          ${escapeXml(badgeText.toUpperCase())}
        </text>
      </g>

      <!-- Central Graphic Illustration -->
      ${illustration}

      <!-- Bottom Content Panel -->
      <g transform="translate(48, ${height - 130})">
        <rect x="0" y="0" width="${width - 96}" height="84" fill="#0D0E11" opacity="0.85" stroke="#FFFFFF" stroke-width="1" stroke-opacity="0.1"/>
        <rect x="0" y="0" width="8" height="84" fill="${accentColor}"/>

        <!-- Main Title -->
        <text x="24" y="38" fill="#F5F3EE" font-size="${Math.min(34, Math.round(width * 0.038))}" font-family="'Segoe UI', Roboto, sans-serif" font-weight="900" letter-spacing="1.5">
          ${escapeXml(title.toUpperCase())}
        </text>

        <!-- Subtitle -->
        <text x="24" y="64" fill="#A0A5B2" font-size="${Math.min(15, Math.round(width * 0.018))}" font-family="'Segoe UI', Roboto, sans-serif" font-weight="600" letter-spacing="1">
          ${escapeXml(subtitle.toUpperCase())}
        </text>

        <!-- Right Label / Watermark -->
        <text x="${width - 120}" y="48" fill="${accentColor}" font-size="12" font-family="'Segoe UI', Roboto, sans-serif" font-weight="800" text-anchor="end" letter-spacing="1.5">
          DEMO ASSET · 2026
        </text>
      </g>
    </svg>
  `;
}

/**
 * Creates vector logos & badges for mark.png, mark-white.png, logo-full.png, icon.png
 */
function createLogoMarkSvg({ width, height, isWhite = false }) {
  const fg = isWhite ? "#FFFFFF" : "#F5222D";
  const bg = isWhite ? "none" : "#111111";

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="markGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FF4D4F"/>
          <stop offset="100%" stop-color="#CF1322"/>
        </linearGradient>
      </defs>

      <!-- Outer badge container -->
      <rect x="10" y="10" width="${width - 20}" height="${height - 20}" rx="32" fill="${bg}" stroke="${fg}" stroke-width="12"/>

      <!-- Modern Geometric "D" Monogram -->
      <g transform="translate(${width * 0.22}, ${height * 0.18}) scale(${width / 368})">
        <!-- Stem -->
        <rect x="30" y="30" width="36" height="180" rx="8" fill="${fg}"/>
        <!-- Curved Loop -->
        <path d="M50,30 L110,30 C165,30 205,65 205,120 C205,175 165,210 110,210 L50,210 Z" fill="none" stroke="${fg}" stroke-width="36" stroke-linejoin="round"/>
        <!-- Inner accent dot / scooter wheel core -->
        <circle cx="115" cy="120" r="22" fill="#F5222D"/>
        <circle cx="115" cy="120" r="10" fill="#FFFFFF"/>
      </g>

      <!-- "DEMO" Pill at bottom -->
      <rect x="${width * 0.5 - 60}" y="${height - 65}" width="120" height="28" rx="6" fill="${fg}"/>
      <text x="${width * 0.5}" y="${height - 46}" fill="${isWhite ? '#111' : '#FFF'}" font-size="14" font-family="'Segoe UI', Roboto, sans-serif" font-weight="900" text-anchor="middle" letter-spacing="3">DEMO</text>
    </svg>
  `;
}

function createFullLogoSvg({ width, height }) {
  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <!-- Background -->
      <rect width="${width}" height="${height}" fill="#111111"/>

      <!-- Logo Mark (Left) -->
      <g transform="translate(40, 40) scale(0.7)">
        <rect x="0" y="0" width="368" height="516" rx="40" fill="#18181b" stroke="#F5222D" stroke-width="16"/>
        <rect x="60" y="80" width="50" height="340" rx="12" fill="#F5222D"/>
        <path d="M90,80 L200,80 C290,80 340,140 340,250 C340,360 290,420 200,420 L90,420 Z" fill="none" stroke="#F5222D" stroke-width="50" stroke-linejoin="round"/>
        <circle cx="200" cy="250" r="38" fill="#F5222D"/>
        <circle cx="200" cy="250" r="16" fill="#FFF"/>
      </g>

      <!-- Typography (Right) -->
      <g transform="translate(340, 150)">
        <text x="0" y="80" fill="#F5F3EE" font-size="110" font-family="'Segoe UI', Impact, sans-serif" font-weight="900" letter-spacing="6">DEMO</text>
        <text x="0" y="180" fill="#F5222D" font-size="110" font-family="'Segoe UI', Impact, sans-serif" font-weight="900" letter-spacing="6">SCOOTY</text>
        <text x="4" y="235" fill="#8E8E93" font-size="24" font-family="'Segoe UI', Roboto, sans-serif" font-weight="700" letter-spacing="5">SREEMANGAL · BANGLADESH</text>
      </g>
    </svg>
  `;
}

// Definition of all image targets to generate
const IMAGES_TO_GENERATE = [
  {
    name: "about-shop",
    w: 1344,
    h: 768,
    formats: ["png", "webp"],
    config: {
      title: "Demo Scooty Storefront",
      subtitle: "Demo Road · Sreemangal Town Base",
      category: "Storefront & Pickup",
      badgeText: "Demo Picture",
      iconType: "shop",
      theme: "red",
    },
  },
  {
    name: "hero-scooty",
    w: 864,
    h: 1152,
    formats: ["png", "webp"],
    config: {
      title: "Demo Scooty 01",
      subtitle: "Flagship Automatic · Tea Garden Ready",
      category: "Hero Vehicle",
      badgeText: "Demo Picture",
      iconType: "scooter",
      theme: "red",
    },
  },
  {
    name: "scooter-02",
    w: 864,
    h: 1152,
    formats: ["png", "webp"],
    config: {
      title: "Demo Mini Scooty",
      subtitle: "Light & Easy · Effortless On Garden Lanes",
      category: "Fleet Model 01",
      badgeText: "Demo Picture",
      iconType: "scooter",
      theme: "red",
    },
  },
  {
    name: "scooter-standard",
    w: 864,
    h: 1152,
    formats: ["png", "webp"],
    config: {
      title: "Demo Standard Scooty",
      subtitle: "All-Day Comfort · Town To Forest Loops",
      category: "Fleet Model 02",
      badgeText: "Demo Picture",
      iconType: "scooter",
      theme: "red",
    },
  },
  {
    name: "owner-radiyan-hossen",
    w: 960,
    h: 960,
    formats: ["jpg"],
    config: {
      title: "Demo Owner & Founder",
      subtitle: "Personal Handover · Direct Road Advice",
      category: "Founder Portrait",
      badgeText: "Demo Picture",
      iconType: "owner",
      theme: "red",
    },
  },
  {
    name: "real-tea-break",
    w: 1280,
    h: 720,
    formats: ["jpg"],
    config: {
      title: "Demo Field Notes: Tea Break",
      subtitle: "Roadside Chai Beside The Rolling Garden Slopes",
      category: "Field Journal",
      badgeText: "Demo Picture",
      iconType: "tea",
      theme: "sunset",
    },
  },
  {
    name: "real-town-ride",
    w: 1280,
    h: 720,
    formats: ["jpg"],
    config: {
      title: "Demo Field Notes: Town To Trail",
      subtitle: "Connecting Sreemangal Town With The Green Trails",
      category: "Field Journal",
      badgeText: "Demo Picture",
      iconType: "road",
      theme: "red",
    },
  },
  {
    name: "rider-road",
    w: 1344,
    h: 768,
    formats: ["png", "webp"],
    config: {
      title: "Demo Rider On The Road",
      subtitle: "Scenic Plantation Vistas On Two Wheels",
      category: "Social Proof",
      badgeText: "Demo Picture",
      iconType: "road",
      theme: "red",
    },
  },
  {
    name: "journal-cng",
    w: 1344,
    h: 768,
    formats: ["png", "webp"],
    config: {
      title: "Demo Scooty Vs Local Transit",
      subtitle: "Independence vs Fixed Route Schedules",
      category: "Route Insights",
      badgeText: "Demo Picture",
      iconType: "abstract",
      theme: "red",
    },
  },
  {
    name: "story-freedom",
    w: 1344,
    h: 768,
    formats: ["png", "webp"],
    config: {
      title: "The Freedom Of Two Wheels",
      subtitle: "Stop Where You Want · Take The Small Road",
      category: "Visual Story 01",
      badgeText: "Demo Picture",
      iconType: "scooter",
      theme: "sunset",
    },
  },
  {
    name: "story-road",
    w: 1344,
    h: 768,
    formats: ["png", "webp"],
    config: {
      title: "Beyond The Main Road",
      subtitle: "Exploring Sreemangal's Quiet Hinterlands",
      category: "Visual Story 02",
      badgeText: "Demo Picture",
      iconType: "road",
      theme: "red",
    },
  },
  {
    name: "video-sreemangal-tour",
    w: 1280,
    h: 720,
    formats: ["jpg"],
    config: {
      title: "Demo Sreemangal Scooty Tour",
      subtitle: "Cinematic Ride Preview · Towns, Forests & Lakes",
      category: "Video Tour",
      badgeText: "Demo Video",
      iconType: "video",
      theme: "red",
    },
  },
  {
    name: "dest-baikka",
    w: 1152,
    h: 864,
    formats: ["png", "webp"],
    config: {
      title: "Baikka Beel Wetland",
      subtitle: "Bird Watching Tower & Open Wetland Horizons",
      category: "Destination 01",
      badgeText: "Demo Picture",
      iconType: "lake",
      theme: "lake",
    },
  },
  {
    name: "dest-hamham",
    w: 864,
    h: 1152,
    formats: ["png", "webp"],
    config: {
      title: "Ham Ham Waterfall",
      subtitle: "Deep Rainforest Trek & Cascade",
      category: "Destination 02",
      badgeText: "Demo Picture",
      iconType: "waterfall",
      theme: "forest",
    },
  },
  {
    name: "dest-hidden-roads",
    w: 1152,
    h: 864,
    formats: ["png", "webp"],
    config: {
      title: "Hidden Tea Garden Roads",
      subtitle: "Quiet Back-Country Trails Away From Traffic",
      category: "Destination 03",
      badgeText: "Demo Picture",
      iconType: "road",
      theme: "forest",
    },
  },
  {
    name: "dest-lawachara",
    w: 1152,
    h: 864,
    formats: ["png", "webp"],
    config: {
      title: "Lawachara National Park",
      subtitle: "Evergreen Canopy & Forest Reserve Ride",
      category: "Destination 04",
      badgeText: "Demo Picture",
      iconType: "nature",
      theme: "forest",
    },
  },
  {
    name: "dest-madhabpur",
    w: 1152,
    h: 864,
    formats: ["png", "webp"],
    config: {
      title: "Madhabpur Lake",
      subtitle: "Lotus Covered Waters Surrounded By Tea Slopes",
      category: "Destination 05",
      badgeText: "Demo Picture",
      iconType: "lake",
      theme: "lake",
    },
  },
  {
    name: "dest-tea-gardens",
    w: 1152,
    h: 864,
    formats: ["png", "webp"],
    config: {
      title: "Rolling Tea Gardens",
      subtitle: "Endless Green Hills · The Tea Capital Of Bangladesh",
      category: "Destination 06",
      badgeText: "Demo Picture",
      iconType: "tea",
      theme: "forest",
    },
  },
  {
    name: "dest-town",
    w: 1344,
    h: 768,
    formats: ["png", "webp"],
    config: {
      title: "Sreemangal Town",
      subtitle: "Local Chai Stalls, Seven-Layer Tea & Crossroads",
      category: "Destination 07",
      badgeText: "Demo Picture",
      iconType: "town",
      theme: "red",
    },
  },
];

async function main() {
  console.log("Generating demo pictures and brand assets...");

  for (const item of IMAGES_TO_GENERATE) {
    const svgContent = createCardSvg({
      width: item.w,
      height: item.h,
      ...item.config,
    });
    const svgBuffer = Buffer.from(svgContent);

    for (const fmt of item.formats) {
      const ext = fmt === "jpg" ? "jpg" : fmt;
      const targetPath = path.join(PUBLIC_IMAGES, `${item.name}.${ext}`);

      let pipeline = sharp(svgBuffer);
      if (fmt === "webp") {
        pipeline = pipeline.webp({ quality: 90 });
      } else if (fmt === "jpg") {
        pipeline = pipeline.jpeg({ quality: 90 });
      } else if (fmt === "png") {
        pipeline = pipeline.png({ quality: 90, compressionLevel: 8 });
      }

      await pipeline.toFile(targetPath);
      console.log(`Generated: ${targetPath} (${item.w}x${item.h})`);
    }
  }

  // Also duplicate demo-owner as demo-owner.jpg
  const ownerSrc = path.join(PUBLIC_IMAGES, "owner-radiyan-hossen.jpg");
  const demoOwnerTarget = path.join(PUBLIC_IMAGES, "demo-owner.jpg");
  fs.copyFileSync(ownerSrc, demoOwnerTarget);
  console.log(`Copied: ${demoOwnerTarget}`);

  // Logos: mark.png, mark-white.png, logo-full.png, logo.svg
  const markSvgRed = createLogoMarkSvg({ width: 368, height: 516, isWhite: false });
  await sharp(Buffer.from(markSvgRed))
    .png()
    .toFile(path.join(PUBLIC_LOGO, "mark.png"));
  console.log("Generated: public/logo/mark.png");

  const markSvgWhite = createLogoMarkSvg({ width: 368, height: 516, isWhite: true });
  await sharp(Buffer.from(markSvgWhite))
    .png()
    .toFile(path.join(PUBLIC_LOGO, "mark-white.png"));
  console.log("Generated: public/logo/mark-white.png");

  const fullLogoSvg = createFullLogoSvg({ width: 944, height: 478 });
  await sharp(Buffer.from(fullLogoSvg))
    .png()
    .toFile(path.join(PUBLIC_LOGO, "logo-full.png"));
  console.log("Generated: public/logo/logo-full.png");

  // Save public/logo.svg as clean vector
  fs.writeFileSync(path.join("public", "logo.svg"), markSvgRed);
  console.log("Generated: public/logo.svg");

  // App icons: icon.png (256x256), apple-icon.png (180x180), opengraph-image.png (1200x630)
  const iconSvg = createLogoMarkSvg({ width: 256, height: 256, isWhite: false });
  await sharp(Buffer.from(iconSvg))
    .png()
    .toFile(path.join(APP_DIR, "icon.png"));
  console.log("Generated: src/app/icon.png");

  const appleIconSvg = createLogoMarkSvg({ width: 180, height: 180, isWhite: true });
  await sharp(Buffer.from(appleIconSvg))
    .png()
    .toFile(path.join(APP_DIR, "apple-icon.png"));
  console.log("Generated: src/app/apple-icon.png");

  const ogCardSvg = createCardSvg({
    width: 1200,
    height: 630,
    title: "Demo Scooty Rental",
    subtitle: "Explore Sreemangal On Two Wheels · Freedom In The Tea Capital",
    category: "Demo Scooty Showcase",
    badgeText: "Demo System",
    iconType: "scooter",
    theme: "red",
  });
  await sharp(Buffer.from(ogCardSvg))
    .png()
    .toFile(path.join(APP_DIR, "opengraph-image.png"));
  console.log("Generated: src/app/opengraph-image.png");

  console.log("\nAll demo pictures and brand assets created successfully!");
}

main().catch((err) => {
  console.error("Failed to generate demo assets:", err);
  process.exit(1);
});
