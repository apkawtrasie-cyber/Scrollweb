# Card Positions & Sizes — Manual Tuning Guide

This document explains how to manually adjust card positions, sizes, and explosion distances in `src/components/sections/CardReveal.tsx`.

---

## 1. Card Size

At the top of the file you'll find the `CARD` constant:

```ts
const CARD = {
  mobile:  { w: 110, h: 140 },
  desktop: { w: 150, h: 185 },
};
```

- **`w`** — card width in pixels
- **`h`** — card height in pixels

Change these values to resize **all** cards at once. Both the covering (closed) and exploded (open) layouts use these dimensions.

---

## 2. Covering Positions (Closed State)

The `getCoveringPositions()` function defines where cards sit when they cover the photo. Cards are arranged in a **3-2-2 grid**:

```
   [0]  [1]  [2]     ← top row (3 cards)
     [3]  [4]         ← middle row (2 cards)
     [5]  [6]         ← bottom row (2 cards, highest z-index)
```

### What to change:

| Variable | What it controls |
|----------|-----------------|
| `gx` | Horizontal gap between cards (px) |
| `gy` | Vertical gap between cards (px) |
| `topY` | Y position of the top row center |
| `midY` | Y position of the middle row center |
| `botY` | Y position of the bottom row center |

Each position has:
- **`x`** — horizontal offset from photo center (negative = left, positive = right)
- **`y`** — vertical offset from photo center (negative = up, positive = down)
- **`z`** — z-index (higher = on top of other cards)

### Example: Move card #3 further left

Find this line:
```ts
{ x: -(cw / 2 + gx), y: midY, z: 4 },
```
Change to:
```ts
{ x: -(cw + gx * 2), y: midY, z: 4 },
```

---

## 3. Exploded Positions (Scroll Open State)

The `getExploded()` function defines where cards fly to when the user scrolls. Each card gets:

- **`x`** — horizontal distance from center (uses viewport width `vw`)
- **`y`** — vertical distance from center (uses viewport height `vh`)
- **`scale`** — size multiplier (1.0 = same size, 1.1 = 10% bigger)

### Multipliers explained

```ts
{ x: -(vw * 0.30), y: -(vh * 0.24), scale: 1.0 }
```

- `vw * 0.30` means 30% of viewport width to the left
- `vh * 0.24` means 24% of viewport height upward

### To keep cards closer to center:
Reduce the multipliers (e.g. `0.30` → `0.20`)

### To push cards further out:
Increase the multipliers (e.g. `0.30` → `0.40`)

### Mobile vs Desktop
Each position has separate values for mobile (`m ? ...`) and desktop (`: ...`):
```ts
x: -(m ? vw * 0.22 : vw * 0.30)
//        ^^^^^^^^    ^^^^^^^^
//        mobile      desktop
```

---

## 4. Photo Size

Photo dimensions are set directly in JSX classes:

```
w-[144px] h-[192px]        ← mobile
sm:w-[160px] sm:h-[216px]  ← tablet
md:w-[176px] md:h-[240px]  ← desktop
```

Change these Tailwind values to resize the photo.

---

## 5. Neon Glow Around Photo

Two `<div>` elements create the asymmetric glow:

1. **Main glow** (stronger, offset left/top) — `width: 300, height: 300`
2. **Secondary glow** (weaker, offset right/bottom) — `width: 200, height: 200`

Adjust:
- `transform: "translate(-58%, -54%)"` — offset position (% of glow element)
- `rgba(57,255,20, 0.12)` — opacity of the glow (higher = brighter)
- `filter: "blur(30px)"` — blur radius (higher = softer)

---

## 6. Scroll Speed

```ts
end: "+=120%",   // pin duration (% of viewport height)
scrub: 0.3,      // smoothing (lower = snappier, higher = smoother)
```

- Increase `120%` to slow down the animation (more scroll needed)
- Decrease to speed it up (less scroll needed)

---

## 7. Quick Reference: Card Index Map

| Index | Skill | Grid Position | Explode Direction |
|-------|-------|--------------|-------------------|
| 0 | HTML & CSS | top-left | top-left |
| 1 | React | top-center | top-center |
| 2 | TypeScript | top-right | top-right |
| 3 | Next.js | mid-left | mid-left |
| 4 | GSAP & Motion | mid-right | mid-right |
| 5 | Tailwind CSS | bottom-left | bottom-left |
| 6 | Node.js | bottom-right | bottom-right |
