# Styleguide for Anniversary Timeline Site - Sage Green Theme

## Overview
This styleguide defines the Sage Green theme for the Anniversary Timeline Site, creating a serene and organic atmosphere perfect for a garden-themed or rustic-chic celebration. The palette combines soft sage green with earthy neutrals and a warm, elegant metallic accent. All styles are optimized for responsiveness and readability using light backgrounds. Implementation uses Tailwind CSS v4 with CSS variables for consistency.

## Dynamic Elements
Event backgrounds use color-mix with light white bases and theme vars (e.g., --event-bg-0: color-mix(in srgb, var(--topcoat-white) 95% var(--primary))).

## Styleguide 1: Sage Green

#### Overview
This styleguide creates a serene and organic atmosphere, perfect for a garden-themed or rustic-chic celebration. The palette combines soft sage green with earthy neutrals and a warm, elegant metallic accent. All styles are optimized for responsiveness and readability.

#### Color Palette

##### Core Colors
| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Primary Sage | `#9CAF97` | `rgb(156, 175, 151)` | Main accents, titles, buttons, subtle highlights |
| Secondary Sand | `#E6E1D8` | `rgb(230, 225, 216)` | Backgrounds, neutral sections, secondary text |
| Highlight Gold | `#A18A5F` | `rgb(161, 138, 95)` | Celebratory elements, key interactive states, important headings |
| Topcoat White | `#FFFFFF` | `rgb(255, 255, 255)` | Base overlays, cards, text on dark backgrounds |
| Text Gray | `#4A4A4A` | `rgb(74, 74, 74)` | Main body text for readability |

##### Dynamic Mixing
Use CSS variables for subtle gradients and shadows with light backgrounds.
* Event BG 0: color-mix(in srgb, var(--topcoat-white) 95% var(--primary))
* Event BG 1: color-mix(in srgb, var(--topcoat-white) 90% var(--primary))
* Shadows: 0 12.5px 100px -10px rgba(156, 175, 151, 0.4), 0 10px 10px -10px rgba(156, 175, 151, 0.3)

#### Typography
* **Headings (H1, H2, H3):** Use a clean serif font like **Playfair Display** or **Lora** for an elegant, timeless feel.
* **Body Text:** Use a sans-serif font like **Inter** or **Lato** for high legibility on all screen sizes.
* **Special Accents:** A script or cursive font like **Dancing Script** or **Allura** can be used for names, dates, and special captions.

#### Spacing & Layout
* **Shadows:** Use soft, subtle shadows with the Primary Sage color to create depth without harsh lines.
* **Borders:** Opt for thin, crisp borders in **Highlight Gold** or a subtle shade of **Primary Sage** for a refined look.
* **Radius:** Use rounded corners (`rounded-lg`) on all cards, buttons, and image containers for a soft and approachable feel.

## Implementation Notes
- **CSS Vars**: In globals.css, define vars under .theme-sage for the Sage Green theme (e.g., --primary: #9CAF97; --secondary: #E6E1D8; ...).
- **Tailwind**: Extend @theme with Sage-specific colors (e.g., --color-primary: var(--primary); use bg-primary).
- **Light Backgrounds**: All elements use light backgrounds with white-based mixes for event tints; no dark mode support.
- **Components**: Use --primary, --secondary, etc. (e.g., bg-[var(--secondary)]).
- **Testing**: Verify polaroids, buttons, nav, and event bgs render correctly with light Sage theme.