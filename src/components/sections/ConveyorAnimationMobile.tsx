import { CSSProperties, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { theme } from '../../styles/theme'

interface HardwareItem {
  icon: string
  label: string
  transformedIcon: string
  transformedLabel: string
}

const hardwareTypes: HardwareItem[] = [
  { icon: '💻', label: 'Old Laptop', transformedIcon: '🖥️', transformedLabel: 'Server' },
  { icon: '🖥️', label: 'Office PC', transformedIcon: '🛡️', transformedLabel: 'Firewall' },
  { icon: '🗄️', label: 'Old Gear', transformedIcon: '☸️', transformedLabel: 'K8s' },
]

export function ConveyorAnimationMobile() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransformed, setIsTransformed] = useState(false)

  useEffect(() => {
    const transformTimer = setTimeout(() => setIsTransformed(true), 1500)
    const nextTimer = setTimeout(() => {
      setIsTransformed(false)
      setCurrentIndex((prev) => (prev + 1) % hardwareTypes.length)
    }, 3500)

    return () => {
      clearTimeout(transformTimer)
      clearTimeout(nextTimer)
    }
  }, [currentIndex])

  const currentItem = hardwareTypes[currentIndex]

  const containerStyle: CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '200px',
    overflow: 'hidden',
    background: theme.colors.background,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.lg,
  }

  const machineStyle: CSSProperties = {
    width: '80px',
    height: '100px',
    background: `linear-gradient(180deg, #1e293b 0%, #0f172a 100%)`,
    borderRadius: '12px',
    border: `2px solid ${theme.colors.border}`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    boxShadow: isTransformed
      ? `0 0 20px rgba(81, 207, 102, 0.4)`
      : `0 0 15px rgba(74, 158, 255, 0.2)`,
    transition: 'box-shadow 0.5s ease',
  }

  const itemContainerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing.xs,
  }

  const iconStyle: CSSProperties = {
    fontSize: '36px',
    filter: isTransformed
      ? 'drop-shadow(0 0 6px rgba(81, 207, 102, 0.6))'
      : 'grayscale(60%) brightness(0.7)',
    transition: 'filter 0.5s ease',
  }

  const labelStyle: CSSProperties = {
    fontSize: theme.fontSize.sm,
    fontWeight: 600,
    color: isTransformed ? theme.colors.success : theme.colors.textMuted,
    textShadow: isTransformed ? `0 0 6px ${theme.colors.success}` : 'none',
    transition: 'all 0.5s ease',
  }

  const arrowStyle: CSSProperties = {
    fontSize: '24px',
    color: theme.colors.primary,
  }

  return (
    <div style={containerStyle}>
      {/* Before transformation */}
      <motion.div
        style={itemContainerStyle}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isTransformed ? 0.3 : 1, y: isTransformed ? -10 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <span style={iconStyle}>{currentItem.icon}</span>
        <span style={labelStyle}>{currentItem.label}</span>
      </motion.div>

      {/* Arrow */}
      <motion.div
        style={arrowStyle}
        animate={{
          y: [0, 5, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
        }}
      >
        ↓
      </motion.div>

      {/* Transformation Machine */}
      <div style={machineStyle}>
        <motion.div
          style={{ fontSize: '20px' }}
          animate={{
            scale: isTransformed ? [1, 1.3, 1] : 1,
            rotate: isTransformed ? [0, 10, -10, 0] : 0,
          }}
          transition={{ duration: 0.5 }}
        >
          ⚡
        </motion.div>
        <div
          style={{
            fontSize: '8px',
            fontWeight: 'bold',
            color: theme.colors.primary,
            letterSpacing: '0.1em',
          }}
        >
          TRANSFORM
        </div>
      </div>

      {/* Arrow */}
      <motion.div
        style={arrowStyle}
        animate={{
          y: [0, 5, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          delay: 0.3,
        }}
      >
        ↓
      </motion.div>

      {/* After transformation */}
      <motion.div
        style={itemContainerStyle}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isTransformed ? 1 : 0.3, y: isTransformed ? 0 : 10 }}
        transition={{ duration: 0.5 }}
      >
        <span style={iconStyle}>{currentItem.transformedIcon}</span>
        <span style={labelStyle}>{currentItem.transformedLabel}</span>
      </motion.div>
    </div>
  )
}
