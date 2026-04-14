'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface SectionWrapperProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  once?: boolean
}

export function SectionWrapper({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  once = true,
}: SectionWrapperProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: '-80px' })

  const directionMap = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: 40 },
    right: { y: 0, x: -40 },
    none: { y: 0, x: 0 },
  }

  const initial = {
    opacity: 0,
    ...directionMap[direction],
  }

  const animate = isInView
    ? { opacity: 1, y: 0, x: 0 }
    : initial

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{
        duration: 0.7,
        ease: [0.21, 1.11, 0.81, 0.99],
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface StaggerWrapperProps {
  children: React.ReactNode[]
  className?: string
  staggerDelay?: number
  itemClassName?: string
}

export function StaggerWrapper({
  children,
  className = '',
  staggerDelay = 0.1,
}: StaggerWrapperProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
        hidden: {},
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.21, 1.11, 0.81, 0.99] },
        },
      }}
    >
      {children}
    </motion.div>
  )
}
