---
name: Bibliotheca & Quill
colors:
  surface: '#fff8f3'
  surface-dim: '#e4d8c9'
  surface-bright: '#fff8f3'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fef2e2'
  surface-container: '#f8ecdd'
  surface-container-high: '#f2e6d7'
  surface-container-highest: '#ece1d2'
  on-surface: '#201b12'
  on-surface-variant: '#444748'
  inverse-surface: '#363025'
  inverse-on-surface: '#fbefe0'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c8c6c5'
  secondary: '#5f5e5a'
  on-secondary: '#ffffff'
  secondary-container: '#e5e2dc'
  on-secondary-container: '#656460'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#350f03'
  on-tertiary-container: '#b2755f'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474746'
  secondary-fixed: '#e5e2dc'
  secondary-fixed-dim: '#c9c6c1'
  on-secondary-fixed: '#1c1c18'
  on-secondary-fixed-variant: '#474743'
  tertiary-fixed: '#ffdbcf'
  tertiary-fixed-dim: '#feb69d'
  on-tertiary-fixed: '#350f03'
  on-tertiary-fixed-variant: '#6b3927'
  background: '#fff8f3'
  on-background: '#201b12'
  surface-variant: '#ece1d2'
typography:
  display-lg:
    fontFamily: EB Garamond
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: EB Garamond
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: EB Garamond
    fontSize: 32px
    fontWeight: '500'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: EB Garamond
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Noto Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Noto Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1140px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
---

## Brand & Style
The design system focuses on a **Literary Minimalist** aesthetic, blending the tactile warmth of a private library with the precision of modern digital tools. It targets writers, editors, and literary enthusiasts, evoking a sense of focused creativity, intellectual rigor, and quiet inspiration.

The visual direction leans into a **Modern-Skeuomorphic** hybrid:
- **Minimalism:** Clean layouts with generous margins reminiscent of well-set book pages.
- **Tactile Elements:** Subtle use of linen and parchment textures to create a physical sense of "place."
- **Playful Sophistication:** Interactions should feel deliberate and graceful, mirroring the rhythmic flow of a fountain pen on paper.
- **Bi-lingual Harmony:** The system balances the verticality of Korean script with the horizontal flow of Latin characters through careful baseline alignment and shared optical weights.

## Colors
The palette is rooted in the "Golden Age" of publishing, utilizing high-contrast tones for readability and deep, earth-based hues for emotional grounding.

- **Ink Black (#1A1A1A):** Used for primary text and core brand elements. It is a softened black to reduce eye strain on digital screens.
- **Parchment Cream (#F9F6F0):** The primary background color. It provides a warm, organic alternative to stark white, mimicking high-quality archival paper.
- **Library Wood (#5D2E1D):** A deep mahogany used for secondary accents, borders, and structural navigation elements to provide warmth.
- **Scholarly Teal (#1B6B73):** The modern digital accent. Used for calls-to-action, active states, and highlighting key interactive moments.
- **Stone Grey (#8C8376):** A neutral mid-tone for secondary labels and disabled states, pulled from the color of traditional letterpress lead types.

## Typography
The typography strategy employs a "Classic/Modern" pairing. 

- **Headings:** **EB Garamond** provides the literary soul of the design system. It handles both English and a wide variety of glyphs with elegance. For Korean headings, use **Noto Serif KR** as the fallback, ensuring the weight matches the stroke thickness of Garamond.
- **Body:** **Noto Sans** is selected for its exceptional multi-language support (English and Korean) and neutral clarity, ensuring long-form writer profiles are comfortable to read.
- **UI Labels:** **Hanken Grotesk** is used for buttons and micro-copy to provide a contemporary, "designed" feel that contrasts against the bookish body text.

**Formatting Note:** Use generous paragraph spacing (1.5x font size) and ensure a maximum line length of 70 characters for body text to maintain optimal readability.

## Layout & Spacing
The layout philosophy is based on **Editorial Proportions**. Surfaces should feel like sections of a manuscript or spread of a magazine.

- **Grid System:** Use a 12-column fluid grid for desktop with 24px gutters. For mobile, shift to a 4-column grid with 16px gutters.
- **Rhythm:** Spacing follows an 8px base unit. Use larger vertical margins (64px+) between major sections to mimic the "breathing room" found in luxury book design.
- **Alignment:** While text is left-aligned for readability, card layouts and image placements should often be centered or staggered to create a more dynamic, "scrapbook" feel.

## Elevation & Depth
Depth is created through **Tonal Layering** and **Soft Diffusion** rather than hard shadows.

- **Surfaces:** Use the secondary color (Parchment) as the base. Use a slightly lighter or "purer" cream for elevated cards.
- **Shadows:** Shadows should be extremely diffused (Blur: 20px-40px) with very low opacity (5-8%) and a slight tint of the tertiary Library Wood color. This mimics the way a heavy piece of cardstock sits on a wooden desk.
- **Textures:** Apply a subtle "Grain" or "Linen" SVG overlay on primary surfaces. This texture should be almost invisible, felt rather than seen, to give the UI a tactile quality.
- **Interactive Depth:** When hovering over buttons, they should not "lift" (shadow increase) but rather "press" (shadow decrease and subtle color shift), mimicking the mechanical feel of a typewriter key.

## Shapes
The shape language is **Organic and Soft**. 

- **Standard Radius:** 0.5rem (8px) for buttons and input fields to maintain a friendly, approachable feel.
- **Large Radius:** 1.5rem (24px) for cards and modals, suggesting the rounded edges of a well-worn notebook or leather-bound journal.
- **Accents:** Use circular "stamp" or "wax seal" shapes for profile pictures and notification badges to reinforce the writer/literary metaphor.

## Components
- **Buttons:** Primary buttons use the Scholarly Teal background with white text. Secondary buttons use an outline of Ink Black with a faint Parchment fill.
- **Chips/Tags:** Use the Library Wood color at 10% opacity for the background with Library Wood text. These should resemble library card index tabs.
- **Input Fields:** Styled as a single bottom border (like a lined notebook) or a fully enclosed box with a subtle 1px border in Stone Grey. Focus states should transition the border to Scholarly Teal.
- **Cards:** Use a "Paper Stack" effect—a card with a 1px border and a very slight offset shadow to imply layers of paper.
- **Progress Indicators:** Styled as "Ink Wells" filling up or a fountain pen nib moving across a line.
- **Lists:** Use custom bullet points like an asterisk (*) or a small "quill" icon to maintain the playful literary theme.