# Approved direction: warm gold

Current direction: retain the original gold accent (#E0BC76) and button gradient (#F0D59F to #C9A361), with no blue UI accents or lighting. The palette preview picker is retired; previous saved palette selections no longer override this direction. Light/dark controls and animations remain.

| Role | Dark | Light |
| --- | --- | --- |
| Background | #0B0B0A | #F7F6F2 |
| Surface | #151513 | #FFFFFF |
| Raised surface | #201F1C | #ECE9E1 |
| Subtle surface | #10100E | #F1EEE7 |
| Text | #F5F4F1 | #26241F |
| Muted text | #A5A29B | #69655C |
| Accent | #E0BC76 | #926520 |
| Secondary glow | #A58B6024 | #B59C7020 |

Animated lights: champagne #D4B784, muted bronze #9C825C, amber #B78046. Photo overlays use warm charcoal. Original photographs and third-party logos remain unchanged.

---

## Previous exploration (superseded)

# Tech Judge color palettes

The default is Current Gold. The Colors preview control can temporarily override it in your browser. These are the actual shared design tokens, not colors sampled from photography. Transparent colors use eight-digit hex: the final two digits set opacity.

## Current palette: base and content

| Role | Dark mode | Light mode |
| --- | --- | --- |
| Page background | #08090C | #F5F5F8 |
| Card / surface | #111318 | #FFFFFF |
| Raised surface | #191C23 | #EAEAF0 |
| Subtle surface | #0C0E13 | #EDEDF3 |
| Headings and primary text | #F3F4F6 | #20212A |
| Supporting text | #9B9DA7 | #636571 |
| Accent text / active state | #E0BC76 | #926520 |
| Accent text gradient endpoint | #F1D7A3 | #795319 |
| Dividers / borders | #FFFFFF15 | #22263A20 |
| Soft gold glow | #B082361F | #D8AF5C25 |
| Soft blue glow | #3D659724 | #779CDE20 |
| General shadow | #00000055 | #3434530D |

## Current palette: buttons, photography and motion

These colors are shared by both modes unless noted.

| Role | Color |
| --- | --- |
| Primary button gradient start | #F0D59F |
| Primary button gradient end | #C9A361 |
| Primary button text | #161410 |
| Warm animated light | #D4B784 |
| Blue animated light | #356BB0 |
| Bronze animated light | #B78046 |
| Accent on dark photo overlays | #F5E6C6 |
| Ambient field opacity | 24% dark / 18% light |
| Header | Page background at 85% opacity |
| Floating display controls | Card surface at 94% opacity |
| Hero light fields | Warm light at 17%, blue light at 13% |
| Moving hero beam | Warm light at 22% |
| Primary CTA band glow | Warm light at 35% |
| Showcase border | Accent at 28% |
| Selected service tab border | Accent at 35% |
| Button highlight | #FFFFFF55 |
| Floating shadow | #00000033 / #00000055 |
| Pricing panel | Button colors mixed with #FFFFFF / #EEEEEE |
| Pricing CTA | #17171C background, #FFFFFF text |
| Pricing explanatory text | #5C594F |

Photography and logos retain their original image colors. Dark image overlays, white text and black shadows are intentional neutral colors, not additional brand accents. Gradients blend the tokens above rather than introducing a separate fixed palette.

## Alternative directions

Each alternative changes backgrounds, surfaces, text, buttons, active states, lighting and the calculator treatment. Each has a light-mode counterpart.

| Direction | Dark background | Main accent | Secondary light | Main text | Light background | Light accent |
| --- | --- | --- | --- | --- | --- | --- |
| Midnight & Champagne | #0B1220 | #DFC28D | #739CCF | #F5F6FA | #F5F6FA | #836128 |
| Graphite & Electric Blue | #0B0F17 | #85B5FF | #4D73E8 | #F5F7FC | #F5F7FC | #285CAF |
| Obsidian & Copper | #120F10 | #E7AB86 | #879CC4 | #FAF5F1 | #FAF5F1 | #98502E |
| Ink & Iris | #100F18 | #B8ABFF | #739CE8 | #F6F4FC | #F6F4FC | #6550AD |
| Carbon & Platinum | #101214 | #D5DEE5 | #7995AA | #F5F7F8 | #F5F7F8 | #465E71 |

### How I would choose

- Midnight & Champagne: retain a premium gold identity, but anchor it in navy.
- Graphite & Electric Blue: strongest gold-free choice for an IT-led identity.
- Obsidian & Copper: warmer, with more emphasis on buildings and residential work.
- Ink & Iris: expressive and contemporary, less conventional for a local IT partner.
- Carbon & Platinum: restrained and architectural, letting photography carry the color.

My gold-free recommendation is Graphite & Electric Blue. Carbon & Platinum is the alternative if understated luxury matters more than a strong accent.

## Scroll motion

Shared across all pages. Content fades and rises 24px as it enters the viewport, with a short sibling stagger. It runs once per page visit, preserves visible content when navigating by keyboard, and is disabled when the visitor requests reduced motion. Navigation and fixed display controls remain stable. Content stays visible without JavaScript and in print.
