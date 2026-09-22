# Ankit Bari — Portfolio

A minimal, fast, and interactive developer portfolio built with **Next.js 16**, **React 19**, **Tailwind CSS v4**, and **TypeScript**.

It showcases my work, experience, open-source contributions, skills, and writing — with a dark/light theme and smooth motion.

---

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) 16 (App Router)
- **Library:** [React](https://react.dev/) 19
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) v4
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Animation:** [Framer Motion](https://www.framer.com/motion/), [GSAP](https://greensock.com/gsap/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/)
- **Icons:** [Lucide React](https://lucide.dev/), [React Icons](https://react-icons.github.io/react-icons/)
- **Deployment:** [Vercel](https://vercel.com/) with Analytics & Speed Insights

---

## Features

- Responsive, grid-based layout with blueprint-style micro-details
- Dark and light mode with system preference detection
- Interactive GitHub contribution graph
- Project showcase with detail pages
- Experience timeline
- Open-source contributions section
- Skills and technologies grid
- Blog listing
- Contact and resume pages

---

## 🎨 Use This Portfolio as a Template

This portfolio is **openly available for anyone to fork, customize, and use as the foundation for their own portfolio design.** Whether you're building your first portfolio or looking for a polished starting point, you're free to take what you need.

### Option 1: Fork it (recommended)

1. Click **Fork** in the top-right corner of this repository.
2. In your fork, replace my content with yours:
   - Name, bio, and headshot (`public/me.png`)
   - Projects in `src/data/projectsData.ts`
   - Blog posts in `src/data/blogsData.ts`
   - Experience and skills in `src/app/page.tsx` and `src/app/experience/page.tsx`
   - Social links and resume (`public/Ankit_Bari_Resume.pdf`)
3. Update site metadata in `src/app/layout.tsx` (`title`, `description`, `metadataBase`, social URLs).
4. Set your own environment variables in `.env.local` (GitHub/Hugging Face tokens, site URL).
5. Deploy:

```bash
npm install
npm run build
vercel deploy
```

### Option 2: Clone it

```bash
git clone https://github.com/ankitbari/ankitbari.git my-portfolio
cd my-portfolio
npm install
npm run dev
```

Then follow the same customization steps above.

### What to customize

| Area | Where |
|---|---|
| Personal info & social links | `src/app/page.tsx`, `src/app/layout.tsx` |
| Projects | `src/data/projectsData.ts` |
| Blogs / writing | `src/data/blogsData.ts` |
| Experience & resume | `src/app/experience/page.tsx`, `src/app/resume/page.tsx` |
| Contact form | `src/app/contact/page.tsx` |
| Images & assets | `public/` |
| Site URL & metadata | `src/app/layout.tsx`, `.env.local` |

> **Note:** This template ships with my personal data (name, projects, links, and API tokens in `.env.local`). Remember to strip out any credentials and replace everything with your own before going public.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 20 or later
- npm / yarn / pnpm / bun

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
npm run build
```

### Start the production server

```bash
npm start
```

### Lint

```bash
npm run lint
```

---

## Project Structure

```text
Portfolio
├── src/
│   ├── app/                 # Next.js App Router pages & API routes
│   ├── components/          # Feature components & pixel-perfect primitives
│   ├── data/                # Projects, blogs, and highlights data
│   └── lib/                 # Utility functions
├── public/                  # Static assets (me.png, placeholder.png, resume.pdf)
├── next.config.ts           # Next.js configuration
├── tsconfig.json            # TypeScript configuration
└── package.json
```

---

## Deployment

This site is optimized for deployment on [Vercel](https://vercel.com/). Connect your GitHub repository to Vercel and deploy with zero configuration.

For other platforms, use the static or Node.js output mode configured in `next.config.ts`.

---

## Connect

- **GitHub:** [ankitbari](https://github.com/ankitbari)
- **Twitter / X:** [@aijadugar](https://x.com/aijadugar)
- **LinkedIn:** [Ankit Bari](https://www.linkedin.com/in/aijadugar)
- **Hugging Face:** [aijadugar](https://huggingface.co/aijadugar)
- **Substack:** [aijadugar](https://substack.com/@aijadugar)

---

## License

This project is open source. Feel free to use it, modify it, and share it. If you build something cool on top of it, I'd love to see it.

Built with purpose, precision, and a little bit of chaos.