import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const PROJECTS_CONFIG = [
  {
    id: 'hira-diary',
    name: 'Hira Diary: Diamond Hishab',
    accentColor: '#0ea5e9',
    category: 'Productivity',
    iconSource: 'https://play-lh.googleusercontent.com/Z_Qw6Qsv6Wr2I9aEofGck2cRiKP16C_ZewYMUSMvYtmPo3hCJl0MDQZc_Xq4tgUcy_kb5x-PpTcZrngC8wqN2ho=s256',
    screens: [
      'https://play-lh.googleusercontent.com/vJpioW5FoZw6oBuZ8-pedEHdhi0gNOZD-ShI8KOc8pnKfJQwjKnKYajrPhUtrD2FQefNBnn0MCFRle_afhGZew=s0',
      'https://play-lh.googleusercontent.com/vnXCJpXP7OY4CUW4gDfhZONkiFspXjKXFZgxRCM3r-7EFWwM7shseNCQNAYxTkvEQlFN_Ne6hse_WbYFK4MU1Q=s0',
      'https://play-lh.googleusercontent.com/jR2IwcJDSRqrM-jRTd8UFDa32hJIJwTYgrWhZAT4tx47nx5SEHLYc0Y_ypH1Qa_FYbbR4g9SybPM5OYwBEFhAEI=s0',
      'https://play-lh.googleusercontent.com/quw6SKM4q4JHY04-aYKY6afCKKmEzPpKPm7Y_yf4qFHNx5J19kC5R03x9W88gIWEgXuLGwX9GjaaGtUOKhs0=s0'
    ]
  },
  {
    id: 'smart-notefusion',
    name: 'Smart NoteFusion: Expense Note',
    accentColor: '#10b981',
    category: 'Productivity',
    iconSource: 'public/assets/projects/smart-notefusion/icon.png',
    screens: [
      'public/assets/projects/smart-notefusion/screenshot-1.jpg',
      'public/assets/projects/smart-notefusion/screenshot-2.jpg',
      'public/assets/projects/smart-notefusion/screenshot-3.jpg',
      'public/assets/projects/smart-notefusion/screenshot-4.jpg'
    ]
  },
  {
    id: 'tech-info-hub',
    name: 'Tech Info Hub',
    accentColor: '#6366f1',
    category: 'Education',
    iconSource: 'public/assets/projects/tech-info-hub/icon.png',
    screens: [
      'public/assets/projects/tech-info-hub/screenshot-1.jpg',
      'public/assets/projects/tech-info-hub/screenshot-2.jpg',
      'public/assets/projects/tech-info-hub/screenshot-3.jpg',
      'public/assets/projects/tech-info-hub/screenshot-4.jpg'
    ]
  },
  {
    id: 'vyonic',
    name: 'Vyonic - Health & Fitness',
    accentColor: '#f43f5e',
    category: 'Health & Fitness',
    iconSource: 'https://play-lh.googleusercontent.com/1WE2ZOpfykZcnghaEGHrIhdCD2f-UDraNFilfV5_JOygY86Wv7bvSWtgLQapUpgP0tLy3CKVBEZilqsoft69VBE=s256',
    screens: [
      'https://play-lh.googleusercontent.com/FmQTFdNX2lH0TSudJEIugIJ8qqa2WCJIlEEU2ayqhkCtd4xNdnImS1r4rwHnM6DZj7Maj09D9JUkJsLdX86tXi0=s0',
      'https://play-lh.googleusercontent.com/bfHBqVB58Y_VmVnCldkvJ7PgFAXzJ4WXlRQj_u8XAZQ_13ncQjgDlzz3cCTUeeotj5YYoLBYFYcXirzOJOLo=s0',
      'https://play-lh.googleusercontent.com/Xj1W4Rp-22MLPAboG6JLCP8XXIPmIqL47XUjUR8eE3WkSvgdNkufvg8A3dFqEgPx88ijC4-qdIZjpcCO2ogBdWc=s0',
      'https://play-lh.googleusercontent.com/uqgbWT69ApbjPtLr3Flesn1BrhO7VHGRt_Mvlp_WADjdcfDZS4FGRHgDtLSgu18iLCuq7YITBpG6XWFhupPi_Po=s0'
    ]
  },
  {
    id: 'art-puzzle',
    name: 'Art Puzzle Story : Jigsaw',
    accentColor: '#f59e0b',
    category: 'Entertainment',
    iconSource: 'public/assets/projects/art-puzzle/icon.png',
    screens: [
      'public/assets/projects/art-puzzle/screenshot-1.jpg',
      'public/assets/projects/art-puzzle/screenshot-2.jpg',
      'public/assets/projects/art-puzzle/screenshot-3.jpg',
      'public/assets/projects/art-puzzle/screenshot-4.jpg'
    ]
  },
  {
    id: 'doc-scanner',
    name: 'Doc Scanner Pro – PDF Maker',
    accentColor: '#2563eb',
    category: 'Utilities',
    iconSource: 'https://play-lh.googleusercontent.com/gH0i34GJ_QtFafzrV3_RqZK3nT022DN4hCpR57S5UWJ1o1is3UYxvBLtW75DJRcPLGcQr3VxX3CXTgL9GfVWuQ=s256',
    screens: [
      'https://play-lh.googleusercontent.com/LpXL_z_6jh2aCY9JCN7gDQI_e7EIAPUS4u0Y8HSwPje2hgke7PBWfXIpxinCsP-ZXz_uMwnJa19dHxcEX2Sm=s0',
      'https://play-lh.googleusercontent.com/nNxJm5rgoaF1s1nnyOVS1x_t0DBFUIDDRhK9qZVkm89L0riLH22UjkaYiBe7R1u7C6G-usws8oAczcvDteCT41M=s0',
      'https://play-lh.googleusercontent.com/eouuhe36gsoS1sES1G6Yo6D2Goq3_4fgHyeJFuBNJ_wgIuZOwNVwwOkrhtBnchWCa2lHPwhT-HfEkgA7IAbSvw=s0',
      'https://play-lh.googleusercontent.com/_SBFij9jy0OfKBzoY-MNIbvM-q_CGKx3YqU0_4YzH8avOIBTh0sRZ4RCwxPBohDpaCXrLVZsS2bcVJq4RKju=s0'
    ]
  },
  {
    id: 'astro-live-chat',
    name: 'Astro Live Chat',
    accentColor: '#8b5cf6',
    category: 'Lifestyle',
    iconSource: 'public/assets/projects/astro-live-chat/icon.png',
    screens: [
      'public/assets/projects/astro-live-chat/screenshot-1.jpg',
      'public/assets/projects/astro-live-chat/screenshot-2.jpg',
      'public/assets/projects/astro-live-chat/screenshot-3.jpg',
      'public/assets/projects/astro-live-chat/screenshot-4.jpg'
    ]
  },
  {
    id: 'astro-live-chat-partner',
    name: 'AstroLiveChat Partners',
    accentColor: '#0d9488',
    category: 'Business',
    iconSource: 'public/assets/projects/astro-live-chat-partner/icon.png',
    screens: [
      'public/assets/projects/astro-live-chat-partner/screenshot-1.jpg',
      'public/assets/projects/astro-live-chat-partner/screenshot-2.jpg',
      'https://play-lh.googleusercontent.com/8yYW62Ei3PIjP2_YBgjKrisZ6_70uAOFtmZc6S7fJ7-EL99YddBUp-FBzQ5H5JJfuutjh4cP3qkodY3hqAiuDbk=s0',
      'https://play-lh.googleusercontent.com/bgRDeYZIT1gF0SsdS8V7BxBV1WptL5I9clJTMn1QXEa4HaiLib3J0USQaiaTYxZibpCQI0yHHRucUWM5Tlt3HA=s0'
    ]
  }
];

async function fetchBuffer(source) {
  if (source.startsWith('http://') || source.startsWith('https://')) {
    const res = await fetch(source, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${source}`);
    const arrayBuffer = await res.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } else {
    return fs.readFileSync(path.resolve(source));
  }
}

function generateCleanFallbackSvg(project) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 960" width="540" height="960">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0b1b3d"/>
      <stop offset="100%" stop-color="#050a17"/>
    </linearGradient>
    <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e293b"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
  </defs>
  <rect width="540" height="960" fill="url(#bg)"/>
  
  <!-- Subtle Top App Header Bar -->
  <rect x="0" y="0" width="540" height="88" fill="#0f1f42" opacity="0.9"/>
  <circle cx="48" cy="44" r="16" fill="${project.accentColor}" opacity="0.3"/>
  <rect x="80" y="36" width="160" height="16" rx="8" fill="#ffffff" opacity="0.8"/>

  <!-- Center Decorative App Mockup Preview -->
  <g transform="translate(45, 140)">
    <!-- Main Card -->
    <rect width="450" height="220" rx="24" fill="url(#cardGrad)" stroke="${project.accentColor}" stroke-width="2" stroke-opacity="0.4"/>
    <circle cx="60" cy="60" r="28" fill="${project.accentColor}" opacity="0.25"/>
    <circle cx="60" cy="60" r="14" fill="${project.accentColor}"/>
    <rect x="110" y="44" width="220" height="18" rx="9" fill="#ffffff" opacity="0.9"/>
    <rect x="110" y="72" width="140" height="12" rx="6" fill="#94a3b8" opacity="0.7"/>

    <rect x="40" y="125" width="115" height="60" rx="14" fill="#0f172a" stroke="#334155" stroke-width="1"/>
    <rect x="165" y="125" width="115" height="60" rx="14" fill="#0f172a" stroke="#334155" stroke-width="1"/>
    <rect x="290" y="125" width="120" height="60" rx="14" fill="#0f172a" stroke="#334155" stroke-width="1"/>
  </g>

  <!-- Secondary Cards -->
  <g transform="translate(45, 395)">
    <rect width="450" height="140" rx="20" fill="url(#cardGrad)" stroke="#334155" stroke-width="1"/>
    <rect x="30" y="30" width="180" height="16" rx="8" fill="#ffffff" opacity="0.8"/>
    <rect x="30" y="58" width="260" height="12" rx="6" fill="#64748b" opacity="0.7"/>
    <rect x="30" y="80" width="200" height="12" rx="6" fill="#64748b" opacity="0.7"/>
    <circle cx="390" cy="70" r="24" fill="${project.accentColor}" opacity="0.3"/>
  </g>

  <g transform="translate(45, 560)">
    <rect width="450" height="140" rx="20" fill="url(#cardGrad)" stroke="#334155" stroke-width="1"/>
    <rect x="30" y="30" width="200" height="16" rx="8" fill="#ffffff" opacity="0.8"/>
    <rect x="30" y="58" width="280" height="12" rx="6" fill="#64748b" opacity="0.7"/>
    <rect x="30" y="80" width="220" height="12" rx="6" fill="#64748b" opacity="0.7"/>
  </g>

  <!-- Bottom Nav Bar Simulation -->
  <rect x="0" y="872" width="540" height="88" fill="#081026" opacity="0.95"/>
  <circle cx="90" cy="916" r="14" fill="#64748b" opacity="0.5"/>
  <circle cx="270" cy="916" r="18" fill="${project.accentColor}"/>
  <circle cx="450" cy="916" r="14" fill="#64748b" opacity="0.5"/>
</svg>`;
}

async function run() {
  console.log('--- Starting Project Image Optimization ---');

  for (const proj of PROJECTS_CONFIG) {
    console.log(`\nProcessing: ${proj.name} (${proj.id})`);
    
    // Modern structure: /public/images/projects/<id>/
    const targetDir = path.resolve(`public/images/projects/${proj.id}`);
    fs.mkdirSync(targetDir, { recursive: true });

    // Legacy backup structure: /public/assets/projects/<id>/
    const legacyDir = path.resolve(`public/assets/projects/${proj.id}`);
    fs.mkdirSync(legacyDir, { recursive: true });

    // 1. Fallback SVG
    const fallbackSvg = generateCleanFallbackSvg(proj);
    fs.writeFileSync(path.join(targetDir, 'fallback.svg'), fallbackSvg);

    // 2. Icon Optimization
    try {
      console.log(`  Downloading/Reading icon: ${proj.iconSource}`);
      const iconBuf = await fetchBuffer(proj.iconSource);

      // Icon 128x128 WebP
      await sharp(iconBuf)
        .resize(128, 128, { fit: 'cover' })
        .webp({ quality: 85 })
        .toFile(path.join(targetDir, 'icon.webp'));

      // Icon 64x64 WebP (for small pills)
      await sharp(iconBuf)
        .resize(64, 64, { fit: 'cover' })
        .webp({ quality: 80 })
        .toFile(path.join(targetDir, 'icon-64w.webp'));

      // Also ensure legacy PNG exists
      await sharp(iconBuf)
        .resize(128, 128)
        .png()
        .toFile(path.join(legacyDir, 'icon.png'));

      console.log(`  ✓ Created icon.webp, icon-64w.webp, and legacy icon.png`);
    } catch (e) {
      console.error(`  ✗ Error optimizing icon for ${proj.id}:`, e.message);
    }

    // 3. Screens Optimization (screen-01.webp, screen-01-320w.webp, etc.)
    for (let i = 0; i < proj.screens.length; i++) {
      const screenIdx = i + 1;
      const screenSource = proj.screens[i];
      const screenNumStr = screenIdx < 10 ? `0${screenIdx}` : `${screenIdx}`;
      const targetBase = `screen-${screenNumStr}`;

      try {
        console.log(`  Processing screen ${screenIdx}: ${screenSource.substring(0, 70)}...`);
        const screenBuf = await fetchBuffer(screenSource);

        // Read metadata
        const meta = await sharp(screenBuf).metadata();
        const width = meta.width || 640;
        const height = meta.height || 1280;

        // 640w master WebP (for crisp display on high-DPI phone mockups)
        const targetWidth = Math.min(640, width);
        await sharp(screenBuf)
          .resize(targetWidth, null, { withoutEnlargement: true })
          .webp({ quality: 82, effort: 5 })
          .toFile(path.join(targetDir, `${targetBase}.webp`));

        // 320w responsive WebP (for mobile screens and small thumbnails)
        await sharp(screenBuf)
          .resize(320, null, { withoutEnlargement: true })
          .webp({ quality: 78, effort: 4 })
          .toFile(path.join(targetDir, `${targetBase}-320w.webp`));

        // Legacy compatibility: screenshot-1.jpg
        await sharp(screenBuf)
          .resize(targetWidth, null, { withoutEnlargement: true })
          .jpeg({ quality: 80 })
          .toFile(path.join(legacyDir, `screenshot-${screenIdx}.jpg`));

        console.log(`  ✓ Created ${targetBase}.webp, ${targetBase}-320w.webp, screenshot-${screenIdx}.jpg`);
      } catch (e) {
        console.error(`  ✗ Error processing screen ${screenIdx} for ${proj.id}:`, e.message);
      }
    }
  }

  console.log('\n--- Optimization Complete! ---');
}

run().catch(console.error);
