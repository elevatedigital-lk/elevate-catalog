/**
 * The one motif: a shoemaker's last (the hand-shaped mould every pair of
 * shoes begins from), as a single reusable shape. Mounted once, referenced
 * everywhere via `clip-path: url(#last-motif)` (photos, dividers) or by
 * drawing the raw path (buttons' corner, the hero shape, list bullets).
 *
 * Path lives in a 0..1 unit square (clipPathUnits="objectBoundingBox") so it
 * scales to whatever element clips to it, square or not.
 */
export const LAST_PATH =
  "M0.07,0.64 C0.00,0.56 0.00,0.39 0.09,0.30 C0.15,0.24 0.22,0.20 0.31,0.18 C0.44,0.15 0.57,0.15 0.68,0.19 C0.81,0.23 0.92,0.30 0.99,0.43 C1.03,0.50 1.02,0.57 0.96,0.61 C0.90,0.66 0.79,0.67 0.69,0.64 C0.60,0.75 0.44,0.82 0.29,0.82 C0.18,0.82 0.11,0.77 0.05,0.70 Z";

export default function MotifDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden focusable="false">
      <defs>
        <clipPath id="last-motif" clipPathUnits="objectBoundingBox">
          <path d={LAST_PATH} />
        </clipPath>
      </defs>
    </svg>
  );
}
