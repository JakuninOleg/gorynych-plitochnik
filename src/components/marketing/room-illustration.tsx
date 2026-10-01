type RoomProps = {
  id: string
  room: 'bathroom' | 'kitchen' | 'hall'
  tileLabel: string
  tileWidth: number
  tileHeight: number
  palette: { name: string; color: string; light: string }
  grout: string
  surface: 'walls' | 'floor'
  offset: boolean
  length: number
  width: number
  className?: string | undefined
}

export function RoomIllustration({ id, room, tileLabel, tileWidth: tw, tileHeight: th, palette, grout, surface, offset, length, width, className }: RoomProps) {
  const ref = (name: string) => `url(#${id}-${name})`
  const isMarble = palette.name === 'Мрамор'
  const isPatterned = palette.name === 'Синий'
  function tile(x: number, y: number) {
    return <g transform={`translate(${x} ${y})`}>
      <rect x=".8" y=".8" width={tw - 1.6} height={th - 1.6} rx=".7" fill={ref('ceramic')} />
      <path d={`M2 ${th * .62} Q${tw * .25} ${th * .44} ${tw * .53} ${th * .55} T${tw - 2} ${th * .32}`} fill="none" stroke={palette.light} strokeWidth={isMarble ? '1.5' : '.6'} opacity={isMarble ? '.7' : '.28'} />
      {isMarble && <path d={`M${tw * .15} 2 Q${tw * .4} ${th * .3} ${tw * .3} ${th * .7} L${tw * .6} ${th - 2}`} fill="none" stroke="#b0b1ab" strokeWidth=".6" opacity=".65" />}
      {isPatterned && <g transform={`translate(${tw / 2} ${th / 2}) scale(${Math.min(tw, th) / 31})`} fill={palette.light} opacity=".7">
        {[0, 90, 180, 270].map(angle => <path key={angle} transform={`rotate(${angle})`} d="M0-2C-8-6-8-12-3-11C0-10 2-7 0-2ZM2 0C6-7 12-7 11-3C10 0 7 2 2 0Z" />)}
        <circle r="1.7" fill="#f6ead1" />
      </g>}
      <path d={`M2 ${th - 2}H${tw - 2}V2`} fill="none" stroke="#273942" strokeWidth=".6" opacity=".13" />
    </g>
  }
  return (
    <svg className={className} viewBox="0 0 720 670" role="img" aria-label={`${room === 'bathroom' ? 'Ванная' : room === 'kitchen' ? 'Кухня' : 'Прихожая'}: ${tileLabel}, ${palette.name}, ${offset ? 'со смещением' : 'прямая раскладка'}`}>
      <defs>
        <linearGradient id={`${id}-ceramic`} x2=".7" y2="1"><stop stopColor={palette.light} /><stop offset=".3" stopColor={palette.color} /><stop offset="1" stopColor={palette.color} /></linearGradient>
        <pattern id={`${id}-tiles`} width={tw} height={offset ? th * 2 : th} patternUnits="userSpaceOnUse">
          <rect width={tw} height={offset ? th * 2 : th} fill={grout} />
          {tile(0, 0)}{offset && <>{tile(-tw / 2, th)}{tile(tw / 2, th)}</>}
        </pattern>
        <pattern id={`${id}-left`} href={`#${id}-tiles`} patternTransform="matrix(1 -.364 0 1 96 236)" />
        <pattern id={`${id}-right`} href={`#${id}-tiles`} patternTransform="matrix(1 .364 0 1 360 140)" />
        <pattern id={`${id}-floor`} href={`#${id}-tiles`} patternTransform="matrix(.8 .3 -.8 .3 360 404)" />
        <pattern id={`${id}-wood`} width="18" height="180" patternUnits="userSpaceOnUse"><rect width="18" height="180" fill="#ae8053" /><path d="M3 0q9 30 2 60t2 65v55M11 0q-6 60 0 120t0 60" fill="none" stroke="#76502f" strokeWidth="1" opacity=".35" /></pattern>
        <pattern id={`${id}-stone`} width="65" height="30" patternUnits="userSpaceOnUse"><rect width="65" height="30" fill="#cab493" /><path d="M0 29h65M32 0v30" stroke="#98805f" strokeWidth="1.4" /><path d="M4 3h23m10 3h20" stroke="#ecddbf" opacity=".55" /></pattern>
        <linearGradient id={`${id}-porcelain`} x2=".4" y2="1"><stop stopColor="#fffdf5" /><stop offset=".48" stopColor="#eeeade" /><stop offset="1" stopColor="#c9c9be" /></linearGradient>
        <linearGradient id={`${id}-brass`}><stop stopColor="#8d612d" /><stop offset=".35" stopColor="#e5c68a" /><stop offset=".7" stopColor="#b89154" /><stop offset="1" stopColor="#765124" /></linearGradient>
        <linearGradient id={`${id}-mirror`} x2="1" y2="1"><stop stopColor="#708f98" /><stop offset=".4" stopColor="#dae5df" /><stop offset=".6" stopColor="#92afb5" /><stop offset="1" stopColor="#cdd6cc" /></linearGradient>
        <linearGradient id={`${id}-shade`}><stop stopColor="#152631" stopOpacity=".22" /><stop offset="1" stopColor="#152631" stopOpacity="0" /></linearGradient>
        <linearGradient id={`${id}-floorLight`} x2="0" y2="1"><stop stopColor="#938475" /><stop offset="1" stopColor="#d9cbb0" /></linearGradient>
        <radialGradient id={`${id}-light`}><stop stopColor="#ffedb0" stopOpacity=".65" /><stop offset="1" stopColor="#fff0c4" stopOpacity="0" /></radialGradient>
        <filter id={`${id}-shadow`} x="-30%" y="-50%" width="160%" height="200%"><feGaussianBlur stdDeviation="7" /></filter>
      </defs>

      {/* Thin stone portal and architectural sketch behind the live room. */}
      <path d="M65 507V236C65 79 211 32 358 32s294 47 294 204v271" fill="none" stroke="#9b805b" strokeWidth="22" />
      <path d="M65 507V236C65 79 211 32 358 32s294 47 294 204v271" fill="none" stroke={ref('stone')} strokeWidth="18" />
      <path d="M65 390h-20m20-70h-20m20-70h-20m3-72 23 8m28-67-19-13m78-59 11 23m103-45v24m102-2-7 24m94 20-13 21m65 45-21 13m40 55-23 4m15 67h20m-20 70h20" fill="none" stroke="#856c4b" strokeWidth="1.8" />
      <path d="M39 526V228C39 62 196 10 358 10s319 52 319 218v298" fill="none" stroke="#987c51" strokeWidth=".8" strokeDasharray="5 8" opacity=".45" />
      <ellipse cx="360" cy="583" rx="267" ry="35" fill="#5d503d" opacity=".14" filter={ref('shadow')} />
      <ellipse cx="357" cy="163" rx="227" ry="155" fill={ref('light')} />

      {/* The back corner is higher than the front: consistent isometric geometry. */}
      <path d="M86 238L360 138 633 238V501L356 610 86 501Z" fill="#aa9576" stroke="#7d684e" strokeWidth="1.5" />
      <polygon points="96,236 360,140 360,404 96,500" fill={surface === 'walls' ? ref('left') : '#e5deca'} />
      <polygon points="360,140 620,236 620,500 360,404" fill={surface === 'walls' ? ref('right') : '#f3ead5'} />
      <polygon points="96,500 360,404 620,500 356,600" fill={surface === 'floor' ? ref('floor') : ref('floorLight')} />
      <polygon points="96,236 360,140 360,404 96,500" fill={ref('shade')} />
      <path d="M96 236L360 140 620 236M360 140V404M96 500L360 404 620 500" fill="none" stroke="#6b6454" strokeWidth="1.6" />
      <path d="M96 230L360 134 620 230" fill="none" stroke="#f4ead3" strokeWidth="7" />
      <path d="M96 481L360 385 620 481" fill="none" stroke="#e2d5bc" strokeWidth="6" />
      <path d="M86 501L356 610 633 501V512L356 622 86 512Z" fill="#bda786" stroke="#8d7453" strokeWidth="1.5" />

      {room === 'bathroom' && <>
        {/* Mirror, sconces, oak vanity and a stone basin. */}
        <g transform="matrix(1 -.364 0 1 154 269)">
          <ellipse cx="55" cy="8" rx="43" ry="55" fill={ref('brass')} stroke="#836b46" strokeWidth="1.3" />
          <ellipse cx="55" cy="8" rx="37" ry="49" fill={ref('mirror')} />
          <path d="M35 37L76-29M26 20L67-36" stroke="#fffaf0" strokeWidth="5" opacity=".5" />
          <path d="M-1-18v48m110-48v48" stroke={ref('brass')} strokeWidth="5" />
          <rect x="-6" y="-24" width="10" height="23" rx="4" fill="#fff2d4" stroke="#cbb18a" />
          <rect x="105" y="-24" width="10" height="23" rx="4" fill="#fff2d4" stroke="#cbb18a" />
        </g>
        <ellipse cx="219" cy="485" rx="78" ry="15" fill="#32392d" opacity=".15" />
        <path d="M139 398L251 358 281 374 169 417Z" fill="#f2ead9" stroke="#a89982" strokeWidth="2" />
        <path d="M139 398L169 417V482L139 464Z" fill="#765334" stroke="#725132" strokeWidth="1" />
        <path d="M169 417L281 374V441L169 482Z" fill={ref('wood')} stroke="#725132" strokeWidth="1.5" />
        <path d="M173 447L277 407" stroke="#76502f" strokeWidth="2" />
        <path d="M207 424L239 412m-32 41 32-12" stroke={ref('brass')} strokeWidth="3" strokeLinecap="round" />
        <ellipse cx="211" cy="387" rx="46" ry="16" transform="rotate(-18 211 387)" fill={ref('porcelain')} stroke="#a69f8d" strokeWidth="1.5" />
        <ellipse cx="211" cy="383" rx="35" ry="10" transform="rotate(-18 211 383)" fill="#cacdc3" />
        <path d="M235 368v-29q0-12-12-8v9" fill="none" stroke={ref('brass')} strokeWidth="5" strokeLinecap="round" />
        {/* Recessed shelf and shower: inset depth, not a flat dark block. */}
        <g transform="matrix(1 .364 0 1 455 244)">
          <rect x="0" y="0" width="65" height="83" rx="1" fill="#6e7e78" stroke="#e6dfcf" strokeWidth="6" />
          <path d="M4 4h57v9H12v63H4Z" fill="#455851" /><path d="M4 43h57" stroke="#e1d8c4" strokeWidth="3" />
          <rect x="17" y="21" width="10" height="20" rx="2" fill="#ebddb7" /><rect x="37" y="18" width="9" height="23" rx="2" fill="#b59658" />
          <rect x="16" y="62" width="30" height="9" rx="2" fill="#e0d6bf" />
        </g>
        <path d="M571 401V302q0-18-22-24" fill="none" stroke={ref('brass')} strokeWidth="5" />
        <ellipse cx="546" cy="278" rx="20" ry="6" transform="rotate(20 546 278)" fill={ref('brass')} />
        <path d="M560 385q-25 8-14 33t17 3" fill="none" stroke="#a28553" strokeWidth="2" />
        {/* A freestanding bathtub: continuous rim, bowl and tapered front. */}
        <ellipse cx="451" cy="526" rx="110" ry="21" transform="rotate(-14 451 526)" fill="#394b40" opacity=".14" />
        <path d="M342 465Q344 491 366 531Q389 555 433 542L542 502Q570 488 571 443Z" fill={ref('porcelain')} stroke="#979c90" strokeWidth="1.5" />
        <path d="M342 465C324 438 394 411 455 404C516 397 580 415 571 443C564 466 461 502 403 501C374 500 350 487 342 465Z" fill="#fffdf4" stroke="#b5b5a6" strokeWidth="2" />
        <path d="M357 459C346 441 405 421 458 416C509 411 557 422 554 441C550 457 464 487 408 488C383 489 365 474 357 459Z" fill="#d0d9d1" stroke="#c1c2b4" strokeWidth="2" />
        <path d="M359 460C373 473 391 481 415 480C467 476 531 454 552 441" fill="none" stroke="#e6ede5" strokeWidth="6" />
        <path d="M389 407v-34q0-14 13-10l10 4v13" fill="none" stroke={ref('brass')} strokeWidth="5" strokeLinecap="round" />
        <path d="M366 531l-6 10m160-33 5 10" stroke="#967348" strokeWidth="6" strokeLinecap="round" />
        <g transform="translate(298 418)">
          <path d="M-10 0h20l-3 23H-7Z" fill="#b88754" stroke="#826140" strokeWidth="1.5" />
          <path d="M0 1V-38m0 18-14-12m14 19 14-15" fill="none" stroke="#576b4b" strokeWidth="2" />
          <ellipse cx="-12" cy="-30" rx="5" ry="11" transform="rotate(-37 -12 -30)" fill="#71815a" />
          <ellipse cx="12" cy="-27" rx="5" ry="10" transform="rotate(32 12 -27)" fill="#88946d" />
          <ellipse cx="0" cy="-39" rx="4" ry="10" fill="#677c50" />
        </g>
      </>}

      {room === 'kitchen' && <>
        <path d="M131 384L356 302 584 386V471L356 557 131 471Z" fill="#295361" stroke="#233e45" strokeWidth="2" />
        <path d="M123 378L356 293 592 378V392L356 481 123 392Z" fill="#c5a071" stroke="#806443" strokeWidth="2" />
        <path d="M181 413v72m58-51v73m59-51v74m58-51v75m57-95v75m58-97v75m58-97v75" stroke="#60808a" strokeWidth="1.5" />
        <path d="M179 425l26 10m91 27 24 9m90-16 23-9m39-14 24-9" stroke={ref('brass')} strokeWidth="3" />
        <path d="M398 370l70-25 48 17-70 26Z" fill="#d8d7c9" stroke="#9a9d8d" strokeWidth="2" />
        <path d="M443 351v-43q0-16 18-10v17" fill="none" stroke={ref('brass')} strokeWidth="6" />
        <path d="M175 379l58 22 46-16-59-21Z" fill="#2e3330" stroke="#807d6a" strokeWidth="1" />
        <ellipse cx="205" cy="380" rx="10" ry="4" fill="none" stroke="#b0b2a2" /><ellipse cx="246" cy="386" rx="10" ry="4" fill="none" stroke="#b0b2a2" />
        <path d="M413 217l96 35v54l-96-36Z" fill={ref('wood')} stroke="#7b5736" strokeWidth="2" /><path d="M423 241l75 27m-75-8 75 27" stroke="#e4c697" strokeWidth="2" />
        <g transform="translate(210 302)"><path d="M-14 0h28l-4 30H-10Z" fill="#d6c5a4" stroke="#a18b66" /><path d="M0 0V-47m0 32-20-16m20 7 17-22" stroke="#526447" strokeWidth="3" /><ellipse cx="-17" cy="-34" rx="7" ry="14" transform="rotate(-30 -17 -34)" fill="#738061" /><ellipse cx="15" cy="-46" rx="7" ry="14" transform="rotate(35 15 -46)" fill="#849271" /></g>
      </>}

      {room === 'hall' && <>
        <g transform="matrix(1 .364 0 1 432 245)"><path d="M0 0h93v191H0Z" fill="#e9e1cf" stroke="#ac9270" strokeWidth="5" /><path d="M12 13h68v68H12Zm0 87h68v77H12Z" fill="none" stroke="#bea98b" strokeWidth="3" /><circle cx="75" cy="93" r="4" fill={ref('brass')} /></g>
        <path d="M134 425l124-45 45 20-124 45Z" fill={ref('wood')} stroke="#806042" strokeWidth="2" />
        <path d="M143 430v63m30-52v62m88-107v62m33-51v62" stroke="#84603d" strokeWidth="9" />
        <g transform="matrix(1 -.364 0 1 169 293)"><ellipse cx="30" cy="0" rx="37" ry="52" fill={ref('mirror')} stroke={ref('brass')} strokeWidth="5" /></g>
        <path d="M157 331l88-32v9l-88 32Z" fill="#a87d4e" /><path d="M176 326v27m22-36v27m22-35v27" stroke="#7a633f" strokeWidth="3" strokeLinecap="round" />
      </>}

      <path d="M92 536L347 638M370 637L637 530" fill="none" stroke="#92794e" strokeWidth="1.2" strokeDasharray="4 5" />
      <path d="M92 529v14m255 88v14m23-15v14m267-121v14" stroke="#92794e" strokeWidth="1.5" />
      <text x="205" y="600" fill="#6b573b" fontSize="17" transform="rotate(22 205 600)">{length.toFixed(1)} м</text>
      <text x="490" y="594" fill="#6b573b" fontSize="17" transform="rotate(-22 490 594)">{width.toFixed(1)} м</text>
    </svg>
  )
}
