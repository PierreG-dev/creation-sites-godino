import { Star } from 'lucide-react'
import type { Testimonial } from '@/data/testimonials'

interface TestimonialCardProps {
  testimonial: Testimonial
  className?: string
}

export function TestimonialCard({ testimonial, className = '' }: TestimonialCardProps) {
  return (
    <div
      className={`bg-white border border-mid rounded-3xl p-7 shadow-soft flex flex-col gap-5 ${className}`}
    >
      {/* Stars */}
      <div className="flex gap-0.5">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star
            key={i}
            className="w-4 h-4 text-accent fill-accent"
            strokeWidth={0}
          />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-warmDark leading-relaxed text-[0.9375rem] flex-1">
        &ldquo;{testimonial.text}&rdquo;
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-3 pt-2 border-t border-mid">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent/20 to-accent2/20 flex items-center justify-center flex-shrink-0">
          <span className="text-sm font-semibold text-warmDark font-mono">
            {testimonial.avatar}
          </span>
        </div>
        <div>
          <div className="font-semibold text-warmDark text-sm">{testimonial.name}</div>
          <div className="text-textMuted text-xs">
            {testimonial.role} — {testimonial.city}
          </div>
        </div>
        <div className="ml-auto text-textMuted text-xs">{testimonial.date}</div>
      </div>
    </div>
  )
}
