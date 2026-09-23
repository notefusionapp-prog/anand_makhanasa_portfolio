import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Master AM Monogram SVG (512x512)
// Designed for ultra-high contrast, simple geometry, razor-sharp 16px readability
const masterSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0b1b3d"/>
      <stop offset="100%" stop-color="#050a17"/>
    </linearGradient>
    <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="100%" stop-color="#0d6efd"/>
    </linearGradient>
  </defs>
  
  <!-- Outer Rounded Squircle Badge -->
  <rect width="512" height="512" rx="128" fill="url(#bgGrad)"/>
  <rect x="8" y="8" width="496" height="496" rx="120" fill="none" stroke="#1e3a8a" stroke-width="16" opacity="0.6"/>
  
  <!-- Geometric AM Monogram -->
  <g transform="translate(48, 88)">
    <!-- Letter A in pure Crisp White -->
    <!-- Left leg, crossbar, and right leg of A -->
    <path d="M 96 280 L 150 96 L 204 280 L 166 280 L 150 220 L 114 220 L 102 280 Z M 122 188 L 142 188 L 132 144 Z" 
          fill="#ffffff" 
          stroke="#ffffff" 
          stroke-width="8" 
          stroke-linejoin="round"/>
    
    <!-- Letter M in Tech Flutter Cyan-Blue -->
    <path d="M 224 280 L 224 96 L 272 216 L 320 96 L 320 280 L 284 280 L 284 172 L 254 248 L 242 248 L 212 172 L 212 280 Z" 
          fill="url(#accentGrad)" 
          stroke="url(#accentGrad)" 
          stroke-width="8" 
          stroke-linejoin="round"/>
          
    <!-- Sridix Brand Electric Orange Dot Accent -->
    <circle cx="348" cy="112" r="18" fill="#f95721" />
  </g>
</svg>`;

// Write master SVG to public/favicon.svg
fs.writeFileSync(path.join(publicDir, 'favicon.svg'), masterSvg);
console.log('Created public/favicon.svg');

async function buildFavicons() {
  const svgBuffer = Buffer.from(masterSvg);

  // 16x16 PNG
  await sharp(svgBuffer)
    .resize(16, 16)
    .png()
    .toFile(path.join(publicDir, 'favicon-16x16.png'));
  console.log('Created public/favicon-16x16.png');

  // 32x32 PNG
  await sharp(svgBuffer)
    .resize(32, 32)
    .png()
    .toFile(path.join(publicDir, 'favicon-32x32.png'));
  console.log('Created public/favicon-32x32.png');

  // 48x48 PNG (Standard favicon size)
  await sharp(svgBuffer)
    .resize(48, 48)
    .png()
    .toFile(path.join(publicDir, 'favicon-48x48.png'));
  console.log('Created public/favicon-48x48.png');

  // Also write 32x32 as favicon.ico
  await sharp(svgBuffer)
    .resize(32, 32)
    .png()
    .toFile(path.join(publicDir, 'favicon.ico'));
  console.log('Created public/favicon.ico');

  // Apple Touch Icon (180x180)
  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('Created public/apple-touch-icon.png');

  // High-Res Master (512x512)
  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'icon-512.png'));
  console.log('Created public/icon-512.png');

  // OpenGraph Social Share Card (1200x630)
  const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#070d1e"/>
        <stop offset="60%" stop-color="#0b1b3d"/>
        <stop offset="100%" stop-color="#050a17"/>
      </linearGradient>
      <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#38bdf8"/>
        <stop offset="100%" stop-color="#0d6efd"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#bg)"/>
    <!-- Top accent border line -->
    <rect width="1200" height="8" fill="url(#accent)"/>
    
    <!-- Background subtle rings -->
    <circle cx="1050" cy="315" r="260" fill="none" stroke="#1e3a8a" stroke-width="2" opacity="0.4"/>
    <circle cx="1050" cy="315" r="380" fill="none" stroke="#1e3a8a" stroke-width="1.5" opacity="0.25"/>

    <!-- AM Monogram Badge -->
    <rect x="80" y="80" width="100" height="100" rx="24" fill="#0b1b3d" stroke="#1e3a8a" stroke-width="3"/>
    <text x="130" y="145" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="44" font-weight="900" fill="#ffffff" text-anchor="middle" dominant-baseline="central">AM</text>
    <circle x="160" cy="100" r="5" fill="#f95721" />

    <!-- Name and Title -->
    <text x="80" y="240" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="60" font-weight="800" fill="#ffffff" letter-spacing="-1">Anand Makhanasa</text>
    <text x="80" y="305" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="32" font-weight="700" fill="#38bdf8" letter-spacing="-0.5">Senior Flutter &amp; Mobile Application Developer</text>
    
    <!-- Description -->
    <text x="80" y="380" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="22" font-weight="400" fill="#94a3b8">Specializing in Flutter, Dart, Firebase, REST APIs, Bloc/Cubit,</text>
    <text x="80" y="415" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="22" font-weight="400" fill="#94a3b8">and high-performance cross-platform Android &amp; iOS applications.</text>
    
    <!-- Badges -->
    <rect x="80" y="480" width="220" height="46" rx="23" fill="#1e293b" stroke="#334155" stroke-width="1"/>
    <text x="190" y="509" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="700" fill="#ffffff" text-anchor="middle">8 Published Apps</text>

    <rect x="320" y="480" width="240" height="46" rx="23" fill="#1e293b" stroke="#334155" stroke-width="1"/>
    <text x="440" y="509" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="700" fill="#ffffff" text-anchor="middle">2.5+ Years Experience</text>

    <rect x="580" y="480" width="200" height="46" rx="23" fill="#1e293b" stroke="#334155" stroke-width="1"/>
    <text x="680" y="509" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="700" fill="#ffffff" text-anchor="middle">Android &amp; iOS</text>

    <!-- Bottom URL watermark -->
    <text x="80" y="585" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="600" fill="#64748b">anandmakhanasa.com</text>
  </svg>`;

  await sharp(Buffer.from(ogSvg))
    .resize(1200, 630)
    .png()
    .toFile(path.join(publicDir, 'og-image.png'));
  console.log('Created public/og-image.png');
}

buildFavicons().catch(console.error);
