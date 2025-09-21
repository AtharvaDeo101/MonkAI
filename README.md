# MusicAI - AI-Powered Music Generation App

A modern web application for generating music using AI, built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🎵 AI-powered music generation from text descriptions
- 🎧 Copyright-free music library
- 🎨 Beautiful geometric design with custom color scheme
- 📱 Fully responsive design
- ⚡ Built with Next.js 14 and TypeScript
- 🎭 Smooth animations with Framer Motion

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn package manager

### Installation

1. Clone the repository:
\`\`\`bash
git clone <your-repo-url>
cd musicai-app
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

5. Run the backend server: 
\'\'\'bash
uvicorn app:app --reload
\'\'\'

## Project Structure

\`\`\`
musicai-app/
├── app/                    # Next.js app directory
│   ├── dashboard/         # Dashboard page
│   ├── generate/          # Music generation page
│   ├── login/             # Login page
│   ├── signup/            # Signup page
│   ├── tracks/            # Music library page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/            # Reusable components
│   ├── ui/               # UI components (shadcn/ui)
│   ├── layout/           # Layout components
│   ├── dashboard-slideshow.tsx
│   └── music-visualizer.tsx
├── lib/                  # Utility functions
│   └── utils.ts
├── hooks/                # Custom React hooks
│   └── use-mobile.tsx
└── public/               # Static assets
\`\`\`

## Color Scheme

The application uses a custom color palette:
- **#000000** - Primary background (pure black)
- **#26282B** - Secondary background (dark gray)
- **#5F85DB** - Accent color (blue)
- **#FAF7F0** - Text color (light cream)

## Technologies Used

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Radix UI** - Accessible UI primitives
- **Lucide React** - Icons
- **shadcn/ui** - UI component library

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


