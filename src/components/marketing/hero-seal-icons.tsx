/** Hand-drawn seal marks for the Hero trust strip — glyphs fill the stamp circle. */

type MarkProps = { className?: string }

/** Laurel wreath + star — years of craft, not an hourglass. */
export function SealYears({ className }: MarkProps) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path
        d="M12.2 31.5c-4.2-3.2-6.4-7.6-6.4-12.4C5.8 11.2 10.4 6 16.2 6c1.4 0 2.7.3 3.8.8"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
      <path
        d="M27.8 31.5c4.2-3.2 6.4-7.6 6.4-12.4C34.2 11.2 29.6 6 23.8 6c-1.4 0-2.7.3-3.8.8"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
      <path
        d="M8.2 14.5c1.8-.2 3.3.6 4.2 1.8M8.8 19.2c1.9.1 3.4 1.1 4.1 2.5M10.2 24c1.8.4 3.1 1.5 3.7 2.9M29.8 14.5c-1.8-.2-3.3.6-4.2 1.8M29.2 19.2c-1.9.1-3.4 1.1-4.1 2.5M27.8 24c-1.8.4-3.1 1.5-3.7 2.9"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="m20 9.2 1.55 3.55 3.85.3-2.95 2.55.95 3.75L20 17.2l-3.4 2.15.95-3.75-2.95-2.55 3.85-.3L20 9.2Z"
        fill="currentColor"
      />
      <path d="M14.5 33.8h11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

/** Four filled tile faces — a finished layout, not empty frames. */
export function SealWorks({ className }: MarkProps) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect x="3.5" y="3.5" width="15" height="15" rx="1.4" fill="currentColor" opacity="0.92" />
      <rect x="21.5" y="3.5" width="15" height="15" rx="1.4" fill="currentColor" opacity="0.55" />
      <rect x="3.5" y="21.5" width="15" height="15" rx="1.4" fill="currentColor" opacity="0.55" />
      <rect x="21.5" y="21.5" width="15" height="15" rx="1.4" fill="currentColor" opacity="0.92" />
      <path
        d="M6.2 8.2h9.5M6.2 13.8h9.5M8.8 6.2v9.5M24.2 8.2h9.5M24.2 13.8h9.5M26.8 6.2v9.5M6.2 26.2h9.5M6.2 31.8h9.5M8.8 24.2v9.5M24.2 26.2h9.5M24.2 31.8h9.5M26.8 24.2v9.5"
        stroke="#fff8ee"
        strokeWidth="1.15"
        strokeLinecap="round"
        opacity="0.75"
      />
    </svg>
  )
}

export function SealGuarantee({ className }: MarkProps) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path
        d="M20 3.2 34.5 8.5v11.2c0 8.2-5.5 13.8-14.5 16.6C11 33.5 5.5 27.9 5.5 19.7V8.5L20 3.2Z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path
        d="m12.8 19.6 4.6 4.7 10-10.2"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function SealMeasure({ className }: MarkProps) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <g transform="rotate(-20 20 20)">
        <rect x="3.5" y="15.2" width="33" height="9.6" rx="2.4" stroke="currentColor" strokeWidth="2.2" />
        <path
          d="M8.2 24.1 9.9 16.4M13.4 24.1 15.1 16.4M18.6 24.1 20.3 16.4M23.8 24.1 25.5 16.4M29 24.1 30.7 16.4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </g>
      <circle cx="31.2" cy="9.2" r="3" fill="currentColor" />
    </svg>
  )
}
