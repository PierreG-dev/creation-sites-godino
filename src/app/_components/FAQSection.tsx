'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import type { FAQ } from '@/data/faq'

interface FAQSectionProps {
  faqs: FAQ[]
}

export default function FAQSection({ faqs }: FAQSectionProps) {
  const [openId, setOpenId] = useState<number | null>(faqs[0]?.id ?? null)

  return (
    <div className="space-y-3">
      {faqs.map((faq) => {
        const isOpen = openId === faq.id
        return (
          <div
            key={faq.id}
            className="bg-white border border-mid rounded-2xl overflow-hidden shadow-soft"
          >
            <button
              onClick={() => setOpenId(isOpen ? null : faq.id)}
              className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-cream/50 transition-colors"
              aria-expanded={isOpen}
            >
              <span className="font-medium text-warmDark text-[0.9375rem] leading-snug">
                {faq.question}
              </span>
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                  isOpen ? 'bg-accent text-white' : 'bg-mid text-textMuted'
                }`}
              >
                {isOpen ? (
                  <Minus className="w-3.5 h-3.5" strokeWidth={2.5} />
                ) : (
                  <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
                )}
              </div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                >
                  <div className="px-6 pb-5">
                    <div className="w-full h-px bg-mid mb-4" />
                    <p className="text-textMuted text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
