# 🎨 MUAB Platform - Next.js + Express

> Professional digital creator platform built with Next.js 16, TypeScript, Express.js, and Tailwind CSS 4

## 🚀 Quick Start

\`\`\`bash
# Install dependencies
npm install

# Configure environment
cp .env.example .env.local
# Edit .env.local with your MongoDB URI and secrets

# Run development servers (Next.js + Express)
npm run dev
\`\`\`

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/api/health

## 🛠 Tech Stack

**Frontend**: Next.js 16 • React 19 • TypeScript • Tailwind CSS 4  
**Backend**: Express.js • MongoDB • Mongoose • JWT • Bcrypt  
**Tools**: ESLint • Nodemon • Concurrently • ts-node

## ✨ What's Been Built

### Implemented ✅
- Dark/light theme with persistence
- Responsive sidebar navigation + header
- Dashboard with stats cards
- Express API with RESTful routes
- MUAB design system integrated
- TypeScript full-stack
- AI Assistant UI panel

### In Progress 🚧
- Product management pages
- Authentication flow
- Database models
- Charts and analytics

## 🔌 API Routes

- \`POST /api/auth/register\` - Register user
- \`POST /api/auth/login\` - Login  
- \`GET /api/products\` - List products
- \`POST /api/products\` - Create product
- \`GET /api/events\` - List events
- \`GET /api/finance/earnings\` - Get earnings

## 💻 Scripts

\`\`\`bash
npm run dev              # Run both Next.js + Express
npm run dev:next         # Next.js only (port 3000)
npm run dev:server       # Express only (port 5000)
npm run build            # Build for production
\`\`\`

## 🎨 Design System

\`\`\`css
--color-primary: #6B46C1;    /* Purple */
--color-accent: #00B8D4;     /* Cyan */
\`\`\`

## 📊 Migration Progress

- ✅ Phase 1: Foundation complete
- 🚧 Phase 2: Core pages in progress  
- 📋 Phase 3: Features planned
- 📋 Phase 4: Polish planned

**Built with ❤️ for MUAB**
