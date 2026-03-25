'use client'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'left' | 'right' | 'none'
}

export default function FadeIn({ children, className, delay = 0, direction = 'up' }: Props) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: direction === 'up' ? 28 : 0,
        x: direction === 'left' ? 28 : direction === 'right' ? -28 : 0,
      }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
