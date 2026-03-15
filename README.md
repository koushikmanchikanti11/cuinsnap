## What is CUinSnap?

CUinSnap is a mobile-first web app built for a college food stall. Anyone — students, visitors, staff — can walk up, snap a photo, slap a `#tag` and a comment on it, and share it instantly to a live public gallery. No account. No sign-in. Just snap and share.

```
Home → Camera → add #tag + comment → Share to Gallery
                                   ↘ Download as Polaroid
```

The camera page features a **Polaroid Now i-Type SVG** illustration. When you hit the shutter, the photo physically ejects from the camera's film slot with a **Framer Motion spring animation** — exactly like a real Polaroid developing.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Animation | Framer Motion |
| ORM | Prisma |
| Database | Neon DB (Serverless PostgreSQL) |
| Storage | Vercel Blob |
| Deployment | Vercel |
| Fonts | Playfair Display + DM Sans |

---

## Features

- **Polaroid Now SVG camera** — detailed i-Type illustration with flash, lens, rainbow stripe, and film eject slot
- **Spring-physics eject animation** — photo paper grows from the camera slot on capture (Framer Motion)
- **Front / rear camera toggle** — smooth spring-animated toggle, red dot lights up on lens in selfie mode
- **6 photo filters** — None, B&W, Warm, Cool, Sepia, Retro — applied at capture time via Canvas API
- **Pick from gallery** — upload any photo from your device
- **Live Polaroid editor** — real-time preview as you type your `#tag` and comment
- **Auto datetime** — stamped automatically, not editable
- **Download** — save the Polaroid card as a PNG
- **Share to Gallery** — POST to DB, instantly visible in the public gallery
- **Gallery** — newest-first grid, each card has a subtle random tilt
- **No auth** — fully public, zero friction
- **Mobile-first** — built for phones at the stall

---

## Project Structure

```
cuinsnap/
├── app/
│   ├── layout.tsx              # Root layout — Navbar + Footer
│   ├── page.tsx                # Home page
│   ├── camera/page.tsx         # Camera page (Client Component)
│   ├── editor/page.tsx         # Polaroid editor (Client Component)
│   ├── gallery/page.tsx        # Gallery (Server + Client)
│   └── api/snaps/route.ts      # GET + POST API handlers
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Name-only sticky navbar
│   │   └── Footer.tsx          # Simple footer
│   ├── camera/
│   │   ├── PolaroidNowCamera.tsx  # SVG camera + Framer Motion eject
│   │   ├── CameraToggle.tsx       # Front/rear toggle
│   │   ├── FilterBar.tsx          # Filter pill row
│   │   └── CameraControls.tsx     # Shutter, flip, file-pick
│   ├── polaroid/
│   │   └── PolaroidCard.tsx    # ⭐ Reusable Polaroid component
│   ├── editor/
│   │   ├── EditorForm.tsx      # Tag + comment inputs
│   │   └── EditorActions.tsx   # Download + Upload buttons
│   └── gallery/
│       └── GalleryGrid.tsx     # Responsive grid
│
├── lib/
│   ├── prisma.ts               # Prisma client singleton
│   └── utils.ts                # cn() + date helpers
│
├── prisma/
│   └── schema.prisma           # DB schema
│
├── .env.local                  # Environment variables
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Neon DB](https://neon.tech) account (free tier works)
- A [Vercel](https://vercel.com) account for deployment

### 1. Clone the repo

```bash
git clone https://github.com/your-username/cuinsnap.git
cd cuinsnap
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root:

```env
# Neon DB — get from neon.tech dashboard
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"

# Vercel Blob — get from Vercel dashboard → Storage tab
BLOB_READ_WRITE_TOKEN="vercel_blob_rw_xxxxxxxx"

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

> For a quick local demo, you can skip `BLOB_READ_WRITE_TOKEN` and store images as base64 strings directly in the DB. Keep photos under 500KB by setting canvas quality to `0.82`.

### 4. Set up the database

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 5. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> **Note:** `getUserMedia` (camera access) requires HTTPS or `localhost`. It will not work over HTTP on a remote URL.

---

## Database Schema

```prisma
model Snap {
  id        String   @id @default(cuid())
  imageUrl  String   // Vercel Blob URL or base64
  tag       String?  @db.VarChar(60)
  comment   String?  @db.VarChar(150)
  createdAt DateTime @default(now())

  @@index([createdAt(sort: Desc)])
}
```

---

## API Routes

| Method | Route | Description |
|---|---|---|
| `GET` | `/api/snaps` | Fetch all snaps, newest first |
| `POST` | `/api/snaps` | Upload a new snap `{ imageUrl, tag, comment }` |

---

## Camera Animation — How It Works

The camera page uses a **Polaroid Now i-Type SVG** (no Three.js, no WebGL — just SVG + Framer Motion). The live `getUserMedia` video stream runs in a hidden `<video>` element off-screen. On shutter press:

1. The **camera body shakes** (Framer Motion keyframe animation)
2. The **flash burst** fires over the flash unit (opacity + scale)
3. The captured frame is drawn to a hidden `<canvas>` with the selected CSS filter applied
4. The **Polaroid paper grows from the film slot** (height: 0 → 156px, then drops with rotation — spring physics)
5. After 1.4s, the app navigates to `/editor` with the image in `sessionStorage`

```tsx
// Framer Motion eject — three staggered springs
<motion.div
  initial={{ height: 0, y: 0, rotate: 0 }}
  animate={snapped
    ? { height: 156, y: 17, rotate: 1.1 }
    : { height: 0,   y: 0,  rotate: 0  }
  }
  transition={{
    height:  { type: "spring", stiffness: 140, damping: 13, delay: 0.15 },
    y:       { type: "spring", stiffness: 120, damping: 10, delay: 0.70 },
    rotate:  { type: "spring", stiffness: 100, damping: 8,  delay: 0.75 },
  }}
/>
```

**Why SVG + Framer Motion and not Three.js?**
The camera is a decorative UI element — not a product configurator. Three.js would add ~600KB, require a `.glb` model file, and struggle on mid-range Android phones. The SVG approach is ~6KB, loads instantly, and runs at 60fps on any device.

---

## Filters

Filters are stored in state and applied to the canvas at capture time — not live on the `<video>` element — so the viewfinder stays performant.

| Filter | CSS Value |
|---|---|
| None | `none` |
| B&W | `grayscale(1)` |
| Warm | `sepia(0.4) saturate(1.3) hue-rotate(-10deg)` |
| Cool | `saturate(0.85) hue-rotate(20deg) brightness(1.05)` |
| Sepia | `sepia(0.8)` |
| Retro | `sepia(0.3) contrast(1.1) saturate(1.2) brightness(0.95)` |

---

## Design System

### Colors

| Token | Hex | Usage |
|---|---|---|
| Cream | `#FDF6EC` | Page background |
| Brown | `#3B1F0A` | Navbar, footer, text |
| Orange | `#E8622A` | Accent, CTAs, tags |
| Soft | `#F5ECD7` | Secondary surfaces |
| Card | `#FFFEF9` | Polaroid card background |

### Typography

| Role | Font | Size |
|---|---|---|
| Logo / Display | Playfair Display | 22–42px |
| Body / UI | DM Sans | 12–16px |

### Key Tailwind config additions

```ts
// tailwind.config.ts
theme: {
  extend: {
    boxShadow: {
      polaroid: "0 3px 10px rgba(0,0,0,0.13), 0 1px 3px rgba(0,0,0,0.08)",
    },
    fontFamily: {
      playfair: ["var(--font-playfair)"],
      "dm-sans": ["var(--font-dm-sans)"],
    },
  },
},
```

---

## Deploying to Vercel

```bash
# 1. Push to GitHub
git push origin main

# 2. Import at vercel.com → New Project → select your repo

# 3. Add environment variables in Vercel dashboard:
#    DATABASE_URL
#    BLOB_READ_WRITE_TOKEN
#    NEXT_PUBLIC_APP_URL

# 4. Deploy — Vercel auto-detects Next.js

# 5. Run migrations against production DB
npx prisma migrate deploy
```

Add this to `next.config.ts` to allow Vercel Blob image domains:

```ts
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
    ],
  },
};
export default nextConfig;
```

---

## Known Limitations

| | |
|---|---|
| No moderation | Anyone can post — fine for a closed college stall |
| No pagination | Loads all snaps; add cursor pagination beyond ~200 entries |
| Camera requires HTTPS | `getUserMedia` won't work on plain HTTP |
| Base64 in DB | Large images bloat DB — use Vercel Blob for production |

---

## Roadmap

- [ ] Emoji reactions per snap (IP-based, no auth)
- [ ] Live snap count badge on navbar
- [ ] Printable QR code for the stall
- [ ] Admin PIN to delete snaps
- [ ] PWA — installable on phones via `manifest.json`

---

## Contributing

This is a college hackathon project. PRs welcome — keep it simple, keep it fun.

1. Fork the repo
2. Create a branch: `git checkout -b feature/your-idea`
3. Commit: `git commit -m "add: your idea"`
4. Push and open a PR

---

<div align="center">

Built with ❤️ at CU · **CUinSnap v1.0.0**

</div># cuinsnap
