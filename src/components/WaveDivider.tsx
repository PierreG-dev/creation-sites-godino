interface WaveDividerProps {
  fillColor?: string
  className?: string
  flip?: boolean
}

export function WaveDivider({
  fillColor = '#FAF7F2',
  className = '',
  flip = false,
}: WaveDividerProps) {
  return (
    <div
      className={`w-full overflow-hidden leading-none ${flip ? 'scale-y-[-1]' : ''} ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 90"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="w-full h-12 md:h-16 lg:h-20 block"
      >
        <path
          d="M0,20 C180,80 360,0 540,40 C720,80 900,10 1080,50 C1260,90 1380,30 1440,45 L1440,90 L0,90 Z"
          fill={fillColor}
        />
      </svg>
    </div>
  )
}

export function WaveDividerSmooth({
  fillColor = '#FAF7F2',
  className = '',
  flip = false,
}: WaveDividerProps) {
  return (
    <div
      className={`w-full overflow-hidden leading-none ${flip ? 'scale-y-[-1]' : ''} ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 60"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="w-full h-8 md:h-12 lg:h-16 block"
      >
        <path
          d="M0,30 Q360,60 720,30 Q1080,0 1440,30 L1440,60 L0,60 Z"
          fill={fillColor}
        />
      </svg>
    </div>
  )
}
