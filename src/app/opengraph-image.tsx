import { ImageResponse } from 'next/og'

export const alt = 'Плиточник Горыныч — укладка плитки в Санкт-Петербурге'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(145deg, #fff2d8 0%, #f4e4c7 55%, #e8d2a8 100%)',
          color: '#211b17',
          padding: '64px 72px',
          fontFamily: 'Georgia, "Times New Roman", serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 64,
              height: 64,
              borderRadius: 999,
              background: '#8b1712',
              color: '#fff2d8',
              fontSize: 30,
              fontFamily: 'Georgia, "Times New Roman", serif',
            }}
          >
            Г
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ fontSize: 28, letterSpacing: 1 }}>Плиточник Горыныч</div>
            <div style={{ fontSize: 18, color: '#4a4038' }}>Ровно. Надёжно. Надолго.</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 980 }}>
          <div style={{ fontSize: 64, lineHeight: 1.08 }}>
            Навожу порядок даже в драконьем логове.
          </div>
          <div style={{ fontSize: 26, color: '#4a4038' }}>
            Укладка плитки и керамогранита в Санкт-Петербурге. Гор работает лично.
          </div>
        </div>
      </div>
    ),
    size,
  )
}
