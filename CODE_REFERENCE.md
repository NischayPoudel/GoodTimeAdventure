# Goodtime Adventure Landing Page - Complete Code Reference

## Files Modified/Created

### 1. `src/components/site-navbar.tsx` ✨ NEW
Modern, responsive navbar with activities dropdown and mobile menu.

**Key Features:**
- Scroll-based opacity transitions
- 3-column activities dropdown
- Mobile hamburger menu with accordion
- Full keyboard accessibility
- Smooth animations

**Lines of Code**: ~262
**Dependencies**: framer-motion, lucide-react, React hooks

---

### 2. `src/components/Hero.tsx` ✨ UPDATED
Complete redesign from dark theme to light minimal aesthetic.

**Old Design**: Dark background with image overlay
**New Design**: Light gradient with 3D floating orb

**Key Features:**
- Two-column responsive layout
- Gradient floating orb with 3D effects
- Staggered container animations
- Badge, headline, CTA buttons, trust chips
- Animated background elements
- Subtle grid texture overlay

**Lines of Code**: ~263
**Dependencies**: framer-motion, ArrowRight icon

---

### 3. `src/components/featured-experiences.tsx` ✨ NEW
Beautiful card grid showcasing adventure experiences.

**Key Features:**
- 3 responsive columns
- Gradient image placeholders
- Interactive hover effects
- Difficulty badges with color coding
- Price and CTA display
- Staggered animations on scroll

**Cards Included:**
1. Everest Base Camp Trek - $1,299 (Challenging)
2. Annapurna Sunrise Trek - $849 (Moderate)
3. Chitwan Jungle Safari - $399 (Easy)

**Lines of Code**: ~220
**Dependencies**: framer-motion, lucide-react icons

---

### 4. `src/app/layout.tsx` ✨ UPDATED
- Replaced `Navbar` with `SiteNavbar`
- Removed hardcoded `pt-20` margin
- Added Geist Mono font
- Enhanced metadata

**Changes Summary:**
```diff
- import { Navbar } from '@/components/Navbar'
+ import { SiteNavbar } from '@/components/site-navbar'

- <Navbar />
- <main className="min-h-screen pt-20">
+ <SiteNavbar />
+ <main className="min-h-screen">
```

---

### 5. `src/app/page.tsx` ✨ UPDATED
Simplified home page focusing on landing experience.

**Old Version:**
- Database connection
- Multiple components
- Async data fetching

**New Version:**
- Clean, fast landing page
- Hero + Featured Experiences
- No database calls
- Fully static rendering

```tsx
import { Hero } from '@/components/Hero'
import { FeaturedExperiences } from '@/components/featured-experiences'

export default function Home() {
  return (
    <div className="bg-white">
      <Hero />
      <FeaturedExperiences />
    </div>
  )
}
```

---

### 6. `src/app/globals.css` ✨ UPDATED
Complete redesign from dark theme to light minimal design.

**Color Scheme Changes:**
```diff
- Dark background (hsl 12 15% 8%)
+ Light background (hsl 0 0% 100%)

- Light text (hsl 210 40% 98%)
+ Dark text (hsl 0 0% 3.6%)

- Blue accent (200 100% 45%)
+ Emerald accent (142 71% 45%)

+ Cyan secondary (186 100% 50%)
```

**New Features:**
- Light theme color variables
- Glass morphism classes
- Gradient text utilities
- Smooth scrollbar styling
- Focus ring utilities
- Accessibility improvements

---

### 7. `package.json` ✨ UPDATED
Added lucide-react dependency.

```json
{
  "dependencies": {
    // ... existing ...
    "lucide-react": "^0.456.0",
    // ... existing ...
  }
}
```

---

## Component Code Samples

### SiteNavbar - Dropdown Menu Structure
```tsx
const activitiesDropdown: DropdownCategory[] = [
  {
    title: 'Trekking',
    items: [
      { icon: '⛏️', title: 'Everest Base Camp', description: 'Legendary Himalayan trek' },
      { icon: '🏔️', title: 'Annapurna Circuit', description: 'Stunning mountain loop' },
      { icon: '🌲', title: 'Langtang Valley', description: 'Intimate alpine experience' },
    ],
  },
  // Tours, Adventure...
]
```

### Hero - Floating Orb Animation
```tsx
const floatVariants = {
  initial: { y: 0 },
  animate: {
    y: [-20, 20, -20],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}
```

### Featured Experiences - Difficulty Config
```tsx
const difficultyConfig = {
  Easy: { color: 'bg-emerald-100 text-emerald-700', icon: '🌤️' },
  Moderate: { color: 'bg-amber-100 text-amber-700', icon: '⛅' },
  Challenging: { color: 'bg-rose-100 text-rose-700', icon: '⛈️' },
}
```

---

## Tailwind CSS Classes Used

### Layout & Spacing
- `flex`, `grid`, `absolute`, `relative`, `fixed`
- `gap-*`, `p-*`, `m-*`, `w-*`, `h-*`
- `max-w-7xl`, `mx-auto`, `px-4 md:px-0`

### Typography
- `text-5xl md:text-6xl lg:text-7xl` (large headings)
- `font-bold`, `font-semibold`, `font-medium`, `font-light`
- `tracking-tight` (tight letter spacing)
- `text-gray-900`, `text-gray-600`, `text-gray-700`

### Colors & Backgrounds
- `bg-white`, `bg-gradient-to-br`
- `from-emerald-500`, `via-cyan-500`, `to-blue-500`
- `border-gray-200`, `border-white/20`
- `shadow-sm`, `shadow-lg`, `shadow-2xl`

### Effects & Filters
- `backdrop-blur-sm`, `backdrop-blur-md`
- `blur-3xl`, `blur-2xl`
- `rounded-full`, `rounded-2xl`, `rounded-xl`, `rounded-lg`
- `opacity-*`, `hover:opacity-*`

### Responsive Classes
- `hidden md:flex lg:grid` (responsive visibility)
- `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` (responsive grids)
- `text-base md:text-lg lg:text-2xl` (responsive typography)

### Hover & Interactive States
- `hover:scale-105`, `hover:shadow-lg`
- `hover:bg-white/80`, `hover:text-gray-900`
- `hover:border-gray-400`, `hover:translate-x-1`
- `transition-all duration-300`, `transition-colors duration-300`

---

## Animation & Motion

### Framer Motion Patterns

**Container Animations:**
```tsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}
```

**Item Animations:**
```tsx
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
}
```

**Float Animations:**
```tsx
const floatVariants = {
  animate: {
    y: [-20, 20, -20],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}
```

---

## CSS Gradients

### Hero Orb (3D Effect)
```css
/* Main sphere */
.orb {
  @apply rounded-full;
  background: linear-gradient(
    to bottom right,
    rgb(52, 211, 153), /* emerald-400 */
    rgb(34, 211, 238), /* cyan-300 */
    rgb(59, 130, 246)  /* blue-400 */
  );
}

/* Inner highlight */
.orb-inner {
  background: linear-gradient(
    to bottom right,
    rgba(255, 255, 255, 0.4),
    transparent
  );
}
```

### Background Gradients
```css
/* Main background */
.hero-bg {
  @apply bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20;
}

/* Animated blobs */
.blob {
  @apply rounded-full blur-3xl;
  background: linear-gradient(to bottom right, rgb(...), transparent);
  animation: float 8s ease-in-out infinite;
}
```

---

## Accessibility Features

### Keyboard Navigation
```tsx
// Focus visible styles in globals.css
button:focus-visible,
a:focus-visible {
  @apply outline-none ring-2 ring-emerald-500 ring-offset-2 rounded-lg;
}
```

### ARIA Labels
```tsx
<button
  onClick={() => setIsMobileOpen(!isMobileOpen)}
  className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
  aria-label="Toggle menu"
>
  {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
</button>
```

### Semantic HTML
```tsx
<nav className="fixed top-0 left-0 right-0 z-50">
  {/* Navigation content */}
</nav>

<section className="relative py-20 md:py-28">
  {/* Section content */}
</section>
```

---

## Performance Optimizations

### CSS Gradients (No Images)
```tsx
// Uses pure CSS gradients instead of image files
const gradient = "from-slate-400 via-slate-300 to-slate-200"
```

### GPU-Accelerated Animations
```tsx
// Using transforms for better performance
animate={{
  y: [-20, 20, -20],  // translateY
  scale: [1, 1.2, 1], // scale
  opacity: [1, 0.8, 1], // opacity
}}
```

### Lazy Loading Ready
```tsx
// Images can be lazy loaded once integrated
<Image
  src={imageUrl}
  alt="Experience"
  loading="lazy"
  onLoad={() => setImageLoaded(true)}
/>
```

---

## File Sizes Summary

| File | Size | Type |
|------|------|------|
| site-navbar.tsx | ~6KB | Component |
| Hero.tsx | ~8KB | Component |
| featured-experiences.tsx | ~7KB | Component |
| globals.css | ~4KB | Styles |
| layout.tsx | ~2KB | Layout |
| page.tsx | ~0.5KB | Page |
| **Total** | **~27.5KB** | **Average** |

---

## Browser Compatibility

✅ Chrome 90+
✅ Firefox 88+
✅ Safari 14+
✅ Edge 90+
⚠️ IE 11 (partial support)

**Required Features:**
- CSS Grid
- CSS Flexbox
- CSS backdrop-filter
- CSS Gradients
- ES2020+ JavaScript

---

## Environment Setup

### Required
- Node.js 18+
- npm 9+ (or yarn/pnpm)

### Environment Variables
None required for landing page.

### Installation
```bash
npm install
npm run dev
# http://localhost:3000
```

---

## Quick Reference

### Component Props
All components are `'use client'` and use React hooks for state management.

### Export Functions
- `SiteNavbar()` - Navbar component
- `Hero()` - Hero section component
- `FeaturedExperiences()` - Featured cards component

### Tailwind Variants
- Button sizes: `default`, `sm`, `lg`, `icon`
- Button variants: `default`, `outline`, `ghost`, etc.

---

**Generated**: January 15, 2026
**Version**: 1.0
**Status**: Complete & Production Ready
