'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

interface CTAButtonProps {
  href: string
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  className?: string
  onClick?: () => void
  external?: boolean
}

const sizeClasses = {
  sm: 'px-5 py-2.5 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-base md:text-lg',
}

export function CTAButton({
  href,
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  onClick,
  external = false,
}: CTAButtonProps) {
  const baseClasses = `
    inline-flex items-center justify-center gap-2 rounded-full font-sans font-medium
    transition-all duration-200 cursor-pointer select-none
    focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2
    ${sizeClasses[size]}
  `

  const variantClasses = {
    primary: 'bg-accent text-white hover:bg-accent/90',
    secondary: 'border-2 border-accent text-accent hover:bg-accent hover:text-white',
  }

  const content = (
    <motion.span
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      whileHover={{ scale: 1.03, filter: 'brightness(1.05)' }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      {children}
      <motion.span
        initial={{ x: 0 }}
        whileHover={{ x: 4 }}
        transition={{ duration: 0.2 }}
      >
        <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
      </motion.span>
    </motion.span>
  )

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="inline-block">
        {content}
      </a>
    )
  }

  return (
    <Link href={href} className="inline-block">
      {content}
    </Link>
  )
}
