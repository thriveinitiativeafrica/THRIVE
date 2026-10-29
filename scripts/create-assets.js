const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function createOgImage() {
  const width = 1200;
  const height = 630;

  const svgOverlay = Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="glow" cx="20%" cy="30%" r="70%">
          <stop offset="0%" stop-color="#47227D" stop-opacity="0.9" />
          <stop offset="50%" stop-color="#2E1650" stop-opacity="1" />
          <stop offset="100%" stop-color="#1F0E37" stop-opacity="1" />
        </radialGradient>
        <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#F5E39E" />
          <stop offset="50%" stop-color="#D4A017" />
          <stop offset="100%" stop-color="#E2AC1F" />
        </linearGradient>
      </defs>

      <!-- Background -->
      <rect width="${width}" height="${height}" fill="url(#glow)" />

      <!-- Concentric Decorative Arc Shapes -->
      <circle cx="1150" cy="100" r="350" fill="none" stroke="#E2AC1F" stroke-width="1.5" opacity="0.12" />
      <circle cx="1150" cy="100" r="260" fill="none" stroke="#E2AC1F" stroke-width="1" opacity="0.15" />
      <circle cx="1150" cy="100" r="170" fill="none" stroke="#E2AC1F" stroke-width="1.5" opacity="0.1" />

      <circle cx="100" cy="600" r="280" fill="none" stroke="#9F75D6" stroke-width="1.5" opacity="0.1" />
      <circle cx="100" cy="600" r="180" fill="none" stroke="#9F75D6" stroke-width="1" opacity="0.12" />

      <!-- Text Content -->
      <g transform="translate(120, 230)">
        <text x="0" y="40" font-family="Georgia, serif" font-size="54" font-weight="bold" fill="#FFFFFF" letter-spacing="-0.5">
          THRIVE <tspan fill="url(#goldGrad)">Initiative</tspan>
        </text>
        <text x="0" y="85" font-family="sans-serif" font-size="16" font-weight="600" fill="#F5E39E" letter-spacing="3">
          TRANSFORMING HOPE, RIGHTS, INCLUSION, VISION &amp; EMPOWERMENT
        </text>

        <text x="0" y="160" font-family="Georgia, serif" font-size="32" font-style="italic" fill="#FAF6EC" letter-spacing="-0.2">
          Empowering People. Uplifting Communities.
        </text>
        <text x="0" y="205" font-family="sans-serif" font-size="20" fill="#E1D8EB" opacity="0.9">
          Grassroots humanitarian action across Lagos and Nigerian communities.
        </text>

        <!-- Category Badges -->
        <g transform="translate(0, 260)">
          <rect x="0" y="0" width="190" height="38" rx="19" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" />
          <text x="95" y="24" font-family="sans-serif" font-size="13" font-weight="bold" fill="#FAF6EC" text-anchor="middle">
            Clean Water &amp; Health
          </text>

          <rect x="205" y="0" width="180" height="38" rx="19" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" />
          <text x="295" y="24" font-family="sans-serif" font-size="13" font-weight="bold" fill="#FAF6EC" text-anchor="middle">
            Child Education
          </text>

          <rect x="400" y="0" width="210" height="38" rx="19" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" />
          <text x="505" y="24" font-family="sans-serif" font-size="13" font-weight="bold" fill="#FAF6EC" text-anchor="middle">
            Women Empowerment
          </text>
        </g>
      </g>
    </svg>
  `);

  const emblemBuffer = await sharp('public/logo/thrive-emblem.png')
    .resize(200, 200)
    .toBuffer();

  await sharp(svgOverlay)
    .composite([
      { input: emblemBuffer, top: 70, left: 910 }
    ])
    .png()
    .toFile('public/og-default.png');

  console.log('og-default.png created successfully!');
}

createOgImage().catch(console.error);
