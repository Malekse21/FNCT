# style.md — Latexo Website Design System
# Inspired by the clean, modern card-based layout with bold typography

---

## 1. AESTHETIC DIRECTION

**Style:** Modern editorial — clean white surfaces, oversized bold typography, colorful accent cards, photographic elements composited into UI cards.

**Tone:** Confident, approachable, structured. Premium without being cold. Uses color as a functional accent, not decoration.

**Key differentiator:** The contrast between the stark white background and bold saturated card colors. Cards feel alive while the layout feels controlled.

---

## 2. COLOR PALETTE

### Background Colors
```
--color-bg-primary:      #FFFFFF   /* main page background */
--color-bg-secondary:    #F5F4F0   /* soft warm off-white for sections */
--color-bg-tertiary:     #EEECEA   /* slightly darker warm grey for hover states */
```

### Card Accent Colors
```
--color-accent-green:    #C8FF00   /* primary accent — lime green, high energy */
--color-accent-purple:   #C4A8F0   /* soft purple — secondary card */
--color-accent-blue:     #A8D8E0   /* light teal blue — tertiary card */
--color-accent-beige:    #E8E4DC   /* warm neutral — default card */
```

### Text Colors
```
--color-text-primary:    #0F0F0F   /* near black — headings */
--color-text-secondary:  #6B6B6B   /* medium grey — body text, descriptions */
--color-text-tertiary:   #9B9B9B   /* light grey — labels, metadata */
--color-text-on-accent:  #0F0F0F   /* dark text on bright accent cards */
--color-text-inverse:    #FFFFFF   /* white text on dark elements */
```

### UI Colors
```
--color-border:          #E8E6E2   /* subtle card borders */
--color-border-strong:   #D0CEC8   /* stronger dividers */
--color-shadow:          rgba(0, 0, 0, 0.06)   /* card shadows */
--color-shadow-hover:    rgba(0, 0, 0, 0.12)   /* elevated shadow on hover */
```

### Navigation & Interactive
```
--color-nav-bg:          #FFFFFF   /* navbar background */
--color-nav-pill:        #F0EEE8   /* nav item hover pill */
--color-button-primary:  #0F0F0F   /* primary button — dark */
--color-button-secondary:#F0EEE8   /* secondary button — warm white */
--color-icon-bg:         #0F0F0F   /* icon buttons — dark circles */
--color-icon-icon:       #FFFFFF   /* icon inside dark button */
```

---

## 3. TYPOGRAPHY

### Font Families
```
--font-display:  'Cabinet Grotesk', 'Familjen Grotesk', sans-serif
/* Bold, geometric, slightly wide — for all headlines */
/* Fallback: 'DM Sans', sans-serif */

--font-body:     'DM Sans', 'Plus Jakarta Sans', sans-serif
/* Clean, readable, modern — for body text, labels, UI */

--font-mono:     'DM Mono', 'Courier New', monospace
/* For tags, labels, metadata, code-like elements */
```

### Type Scale
```
--text-xs:    11px / line-height: 1.4 / letter-spacing: 0.08em
--text-sm:    13px / line-height: 1.5 / letter-spacing: 0.02em
--text-base:  15px / line-height: 1.6 / letter-spacing: 0
--text-md:    17px / line-height: 1.6 / letter-spacing: -0.01em
--text-lg:    22px / line-height: 1.4 / letter-spacing: -0.02em
--text-xl:    32px / line-height: 1.2 / letter-spacing: -0.03em
--text-2xl:   48px / line-height: 1.1 / letter-spacing: -0.04em
--text-3xl:   64px / line-height: 1.0 / letter-spacing: -0.05em
--text-hero:  80px / line-height: 0.96/ letter-spacing: -0.06em
```

### Font Weights
```
--weight-regular:  400
--weight-medium:   500
--weight-bold:     700
--weight-black:    900   /* used for hero titles and card headings */
```

### Typography Rules
- Hero headings: font-weight 900, very tight letter-spacing (-0.05em to -0.06em)
- Card headings: font-weight 700-900, tight letter-spacing
- Body text: font-weight 400, normal letter-spacing
- Labels/eyebrows: font-weight 500, uppercase, wide letter-spacing (0.08em)
- NEVER use Inter or Roboto
- Headings should feel heavy and confident — not delicate

---

## 4. SPACING SYSTEM

```
--space-1:   4px
--space-2:   8px
--space-3:   12px
--space-4:   16px
--space-5:   20px
--space-6:   24px
--space-8:   32px
--space-10:  40px
--space-12:  48px
--space-16:  64px
--space-20:  80px
--space-24:  96px
--space-32:  128px
```

### Layout Spacing
```
--page-padding-x:     48px    /* horizontal page padding desktop */
--page-padding-x-md:  24px    /* tablet */
--page-padding-x-sm:  16px    /* mobile */
--section-gap:        80px    /* vertical gap between sections */
--card-gap:           16px    /* gap between cards in grid */
--card-padding:       24px    /* internal card padding */
```

---

## 5. BORDER RADIUS

```
--radius-sm:    8px    /* tags, small pills */
--radius-md:    12px   /* buttons, small cards */
--radius-lg:    16px   /* standard cards */
--radius-xl:    20px   /* large feature cards */
--radius-2xl:   24px   /* hero cards, image containers */
--radius-full:  9999px /* pills, badges, circular elements */
```

### Rule
Cards use `--radius-xl` (20px) or `--radius-2xl` (24px).
Tags and badges use `--radius-full`.
Buttons use `--radius-full` for pill shape or `--radius-md` for rectangular.

---

## 6. SHADOWS

```
--shadow-xs:   0 1px 2px rgba(0,0,0,0.04)
--shadow-sm:   0 2px 8px rgba(0,0,0,0.06)
--shadow-md:   0 4px 16px rgba(0,0,0,0.08)
--shadow-lg:   0 8px 32px rgba(0,0,0,0.10)
--shadow-xl:   0 16px 48px rgba(0,0,0,0.12)
```

Cards use `--shadow-sm` at rest, `--shadow-lg` on hover.
Navigation bar uses `--shadow-xs`.
No hard/offset shadows — all shadows are soft and centered.

---

## 7. NAVIGATION

### Structure
```
[Logo]  [Nav Links]  ...spacer...  [CTA Button]  [Icon Button]  [Menu Icon]
```

### Specs
- Height: 64px
- Background: white, no border, very subtle shadow on scroll
- Logo: circular icon, accent green fill (#C8FF00), dark icon inside
- Nav links: 14px, font-weight 500, color `--color-text-secondary`
- Nav links on hover: background pill `--color-nav-pill`, color `--color-text-primary`
- CTA button: outlined pill — border 1.5px solid `--color-border-strong`, 
  background white, text dark, hover background `--color-bg-tertiary`
- Icon buttons: 36px circle, dark background `--color-button-primary`, 
  white icon inside
- Spacing between nav items: 4px gap
- Nav is NOT sticky by default — becomes sticky + adds subtle shadow on scroll

---

## 8. CARD SYSTEM

### Card Anatomy
```
┌─────────────────────────────┐
│ [Tag pills row]    [Icon]   │  ← card header, 16px padding
│                             │
│ Card Title                  │  ← large bold heading
│                             │
│ Description text            │  ← 13px body, 2-3 lines max
│                             │
│ ┌─────────────────────────┐ │
│ │   [Photo/Image]         │ │  ← bottom half image, fills card width
│ │                         │ │
│ │  [Read More →]          │ │  ← CTA overlay on image, bottom left
│ └─────────────────────────┘ │
└─────────────────────────────┘
```

### Card Sizes
```
--card-width-sm:   280px   /* compact card */
--card-width-md:   320px   /* standard card */
--card-width-lg:   380px   /* feature card */
--card-height:     480px   /* fixed height for card rows */
```

### Card Variants
1. **Accent card** (first/featured): Lime green background `#C8FF00`, dark text
2. **Muted card**: Warm beige `#E8E4DC`, dark text
3. **Tinted card**: Soft purple or teal, dark text
4. **Dark card**: `#0F0F0F` background, white text

### Card Rules
- All cards in a row share the same height
- Image fills bottom 55% of card, no border radius on image itself
- Image has slight rounded corners where it meets card edges (overflow: hidden on card)
- Card background color bleeds behind the image subtly
- First card in a carousel is always the accent (green) variant
- Cards scroll horizontally on mobile — no wrapping to grid

### Tag Pills
```
background: rgba(0,0,0,0.08)  on accent cards
background: rgba(0,0,0,0.06)  on neutral cards
border-radius: --radius-full
padding: 4px 10px
font-size: 11px
font-weight: 500
color: --color-text-primary
```

### Card Icon (top right)
- 32px circle
- Semi-transparent white background: rgba(255,255,255,0.5)
- Dark icon inside
- Represents the category/type of card

### Read More CTA (overlaid on image)
```
background: rgba(255,255,255,0.92)
backdrop-filter: blur(8px)
border-radius: --radius-full
padding: 8px 16px
font-size: 12px
font-weight: 600
color: #0F0F0F
display: flex
align-items: center
gap: 6px
```
Arrow icon: 20px circle, dark fill, white arrow inside.
Position: absolute, bottom-left of image, 16px from edges.

---

## 9. SECTION LAYOUT

### Eyebrow + Heading Pattern
```
EYEBROW TEXT          ← 11px, uppercase, letter-spacing 0.08em, color --color-text-tertiary
Big Bold Heading      ← --text-2xl or larger, font-weight 900, color --color-text-primary
```

### Horizontal Card Scroll
- Cards displayed in a horizontal scrolling row
- Navigation arrows: 40px dark circles, right side of heading row
- Arrows: left arrow slightly muted when at start, right arrow active
- On desktop: show 3.5 cards (hint of 4th)
- On tablet: show 2.5 cards
- On mobile: show 1.2 cards
- No scrollbar visible: `scrollbar-width: none`

---

## 10. BUTTONS

### Primary Button (dark)
```
background: #0F0F0F
color: #FFFFFF
border-radius: --radius-full
padding: 12px 24px
font-size: 14px
font-weight: 600
border: none
cursor: pointer
transition: background 200ms, transform 150ms

hover:
  background: #333333
  transform: translateY(-1px)

active:
  transform: translateY(0)
```

### Secondary Button (outlined)
```
background: transparent
color: #0F0F0F
border: 1.5px solid #D0CEC8
border-radius: --radius-full
padding: 11px 23px
font-size: 14px
font-weight: 500

hover:
  background: #F0EEE8
  border-color: #B0AEA8
```

### Icon Button (circle)
```
width: 40px
height: 40px
border-radius: 50%
background: #0F0F0F
color: #FFFFFF
display: flex
align-items: center
justify-content: center
border: none
cursor: pointer

hover:
  background: #333333
  transform: scale(1.05)
```

---

## 11. MOTION & ANIMATION

### Principles
- Subtle, purposeful, never distracting
- Ease: `cubic-bezier(0.16, 1, 0.3, 1)` for entrances (fast start, slow settle)
- Ease: `cubic-bezier(0.4, 0, 0.2, 1)` for UI interactions
- Duration: 150ms for micro (hover), 280ms for transitions, 500ms for entrances

### Card Hover
```
transform: translateY(-4px)
box-shadow: --shadow-lg
transition: transform 280ms cubic-bezier(0.16, 1, 0.3, 1),
            box-shadow 280ms ease
```

### Page Load Stagger
Cards animate in on load with staggered reveal:
```
opacity: 0 → 1
transform: translateY(20px) → translateY(0)
duration: 500ms
delay: 0ms, 80ms, 160ms, 240ms per card
```

### Scroll Carousel
```
scroll-behavior: smooth
scroll-snap-type: x mandatory
scroll-snap-align: start (on each card)
```

---

## 12. IMAGERY STYLE

### Photography
- Subjects photographed against solid colored backgrounds (not white)
- Colors should complement or contrast the card accent color
- Composition: subject slightly off-center, looking slightly away
- Mood: confident, modern, editorial — not stock-photo generic
- Crop: portrait orientation, top half of body or face only

### Image Treatment in Cards
- Image bleeds to card edges on left, right, bottom
- Top of image has slight fade to card background color
- Image fills exactly 55% of card height
- No border radius on image itself — card's overflow:hidden handles rounding

---

## 13. RESPONSIVE BREAKPOINTS

```
--bp-sm:   480px   /* large phone */
--bp-md:   768px   /* tablet */
--bp-lg:   1024px  /* small desktop */
--bp-xl:   1280px  /* standard desktop */
--bp-2xl:  1536px  /* large desktop */
```

---

## 14. IMPLEMENTATION NOTES FOR AI CODERS

When building components using this style guide:

1. **Card rows are always horizontal scroll** — never wrap to grid on desktop
2. **Typography is the hero** — if in doubt, make the heading bigger and tighter
3. **Card accent color rotates** — first card lime green, others neutral/tinted
4. **Shadows are always soft** — no hard box shadows, no offset shadows
5. **Border radius is generous** — cards feel rounded and friendly, not sharp
6. **White space is generous** — section padding is 80px+ vertically
7. **Buttons are always pill-shaped** for primary CTAs
8. **Navigation links have no underlines** — hover state is a background pill
9. **Images always have a colored background** in their card — never white
10. **Letter-spacing on headings is always negative** — pulls characters together

### Tailwind CSS Custom Config
```javascript
// tailwind.config.js additions:
theme: {
  extend: {
    fontFamily: {
      display: ['Cabinet Grotesk', 'Familjen Grotesk', 'sans-serif'],
      body: ['DM Sans', 'Plus Jakarta Sans', 'sans-serif'],
      mono: ['DM Mono', 'monospace'],
    },
    colors: {
      accent: {
        green:  '#C8FF00',
        purple: '#C4A8F0',
        blue:   '#A8D8E0',
        beige:  '#E8E4DC',
      },
      brand: {
        black: '#0F0F0F',
        warm:  '#F5F4F0',
      }
    },
    letterSpacing: {
      'tightest': '-0.06em',
      'tighter':  '-0.04em',
      'tight':    '-0.02em',
    },
    borderRadius: {
      'xl':  '20px',
      '2xl': '24px',
    }
  }
}
```

### CSS Variables (paste in :root)
```css
:root {
  --color-bg-primary:    #FFFFFF;
  --color-bg-secondary:  #F5F4F0;
  --color-bg-tertiary:   #EEECEA;
  --color-accent-green:  #C8FF00;
  --color-accent-purple: #C4A8F0;
  --color-accent-blue:   #A8D8E0;
  --color-accent-beige:  #E8E4DC;
  --color-text-primary:  #0F0F0F;
  --color-text-secondary:#6B6B6B;
  --color-text-tertiary: #9B9B9B;
  --color-border:        #E8E6E2;
  --color-border-strong: #D0CEC8;
  --shadow-sm:  0 2px 8px rgba(0,0,0,0.06);
  --shadow-md:  0 4px 16px rgba(0,0,0,0.08);
  --shadow-lg:  0 8px 32px rgba(0,0,0,0.10);
  --radius-sm:  8px;
  --radius-md:  12px;
  --radius-lg:  16px;
  --radius-xl:  20px;
  --radius-2xl: 24px;
  --font-display: 'Cabinet Grotesk', sans-serif;
  --font-body:    'DM Sans', sans-serif;
  --font-mono:    'DM Mono', monospace;
}
```
