interface StepCardProps {
  step: number
  title: string
  description: string
  icon?: React.ReactNode
  isLast?: boolean
}

export function StepCard({ step, title, description, icon, isLast = false }: StepCardProps) {
  return (
    <div className="relative flex gap-6">
      {/* Step number + connector */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div className="w-12 h-12 rounded-full bg-accent text-white font-mono font-medium text-lg flex items-center justify-center flex-shrink-0 shadow-soft-lg z-10">
          {step}
        </div>
        {!isLast && (
          <div className="w-0.5 flex-1 bg-gradient-to-b from-accent/40 to-mid mt-2 min-h-[3rem]" />
        )}
      </div>

      {/* Content */}
      <div className="pb-10 flex-1 min-w-0">
        <div className="flex items-start gap-3 mb-2">
          {icon && (
            <div className="w-8 h-8 rounded-xl bg-mid flex items-center justify-center flex-shrink-0 text-accent2 mt-0.5">
              {icon}
            </div>
          )}
          <h3 className="font-playfair text-xl text-warmDark leading-snug">
            {title}
          </h3>
        </div>
        <p className="text-textMuted leading-relaxed text-[0.9375rem]">
          {description}
        </p>
      </div>
    </div>
  )
}
