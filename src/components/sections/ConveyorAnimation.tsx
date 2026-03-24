import { CSSProperties, useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { theme } from '../../styles/theme'

interface HardwareItem {
  id: number
  icon: string
  label: string
  transformedIcon: string
  transformedLabel: string
}

const hardwareTypes: Omit<HardwareItem, 'id'>[] = [
  { icon: '💻', label: 'Old Laptop', transformedIcon: '🖥️', transformedLabel: 'Docker Host' },
  { icon: '🖥️', label: 'Office PC', transformedIcon: '🛡️', transformedLabel: 'Firewall' },
  { icon: '🗄️', label: 'Surplus Gear', transformedIcon: '☸️', transformedLabel: 'K8s Node' },
  { icon: '📱', label: 'Old Device', transformedIcon: '🔐', transformedLabel: 'Auth Server' },
  { icon: '🖨️', label: 'Thin Client', transformedIcon: '📊', transformedLabel: 'Monitoring' },
]

export function ConveyorAnimation() {
  const [items, setItems] = useState<HardwareItem[]>([])
  const nextIdRef = useRef(0)

  useEffect(() => {
    // Add initial item
    const firstItem = { ...hardwareTypes[0], id: 0 }
    setItems([firstItem])
    nextIdRef.current = 1

    // Add new items periodically
    const interval = setInterval(() => {
      const newId = nextIdRef.current
      const typeIndex = newId % hardwareTypes.length
      const newItem = { ...hardwareTypes[typeIndex], id: newId }

      setItems(prev => {
        // Keep only recent items (remove ones that finished animating)
        const recent = prev.filter(item => item.id > newId - 4)
        return [...recent, newItem]
      })

      nextIdRef.current += 1
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const containerStyle: CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '300px',
    overflow: 'hidden',
    background: theme.colors.background,
  }

  // Conveyor belt
  const beltStyle: CSSProperties = {
    position: 'absolute',
    bottom: '50px',
    left: 0,
    right: 0,
    height: '12px',
    background: '#1a1a24',
    borderTop: `2px solid ${theme.colors.border}`,
    borderBottom: `2px solid ${theme.colors.border}`,
  }

  // Tunnel/Machine
  const machineStyle: CSSProperties = {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    bottom: '30px',
    width: '120px',
    height: '180px',
    zIndex: 20,
  }

  const machineBodyStyle: CSSProperties = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '140px',
    background: `linear-gradient(180deg, #1e293b 0%, #0f172a 100%)`,
    borderRadius: '20px 20px 0 0',
    border: `2px solid ${theme.colors.border}`,
    borderBottom: 'none',
    boxShadow: `
      0 0 30px rgba(74, 158, 255, 0.2),
      0 0 60px rgba(81, 207, 102, 0.1),
      inset 0 0 30px rgba(0,0,0,0.5)
    `,
  }

  // Entry/Exit openings
  const openingStyle = (side: 'left' | 'right'): CSSProperties => ({
    position: 'absolute',
    [side]: '-2px',
    bottom: '20px',
    width: '25px',
    height: '70px',
    background: side === 'left'
      ? 'linear-gradient(90deg, #0a0a0f 0%, rgba(10,10,15,0) 100%)'
      : 'linear-gradient(90deg, rgba(10,10,15,0) 0%, #0a0a0f 100%)',
    zIndex: 25,
  })

  const rollerStyle = (position: number): CSSProperties => ({
    position: 'absolute',
    bottom: '44px',
    left: `${position}%`,
    transform: 'translateX(-50%)',
    width: '28px',
    height: '28px',
    background: '#2a2a3a',
    border: `3px solid ${theme.colors.border}`,
    borderRadius: '50%',
    zIndex: 5,
  })

  return (
    <div style={containerStyle}>
      {/* Conveyor Belt */}
      <div style={beltStyle}>
        {/* Belt texture moving left to right */}
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: '-100px',
            width: 'calc(100% + 200px)',
            height: '100%',
            backgroundImage: `repeating-linear-gradient(90deg,
              transparent 0px,
              transparent 30px,
              rgba(255,255,255,0.08) 30px,
              rgba(255,255,255,0.08) 34px
            )`,
          }}
          animate={{ x: [0, 34] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Rollers */}
      {[8, 22, 36, 64, 78, 92].map((pos, i) => (
        <div key={i} style={rollerStyle(pos)}>
          <motion.div
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              border: `2px dashed rgba(255,255,255,0.2)`,
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      ))}

      {/* Transformation Machine */}
      <div style={machineStyle}>
        <div style={machineBodyStyle}>
          {/* Machine label */}
          <div style={{
            position: 'absolute',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
          }}>
            <motion.div
              style={{ fontSize: '24px' }}
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ⚡
            </motion.div>
            <div style={{
              fontSize: '10px',
              fontWeight: 'bold',
              color: theme.colors.primary,
              letterSpacing: '0.1em',
              marginTop: '4px',
            }}>
              TRANSFORM
            </div>
          </div>

          {/* Energy lines */}
          <svg style={{ position: 'absolute', top: '60px', left: '10px', right: '10px', height: '60px', width: '100px' }}>
            {[0, 1, 2].map(i => (
              <motion.line
                key={i}
                x1="10"
                y1={15 + i * 20}
                x2="90"
                y2={15 + i * 20}
                stroke={i % 2 === 0 ? theme.colors.primary : theme.colors.basic}
                strokeWidth="2"
                strokeDasharray="8 4"
                initial={{ pathLength: 0, opacity: 0.3 }}
                animate={{
                  pathLength: [0, 1],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </svg>

          {/* Sparkles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                left: `${15 + (i % 4) * 25}%`,
                top: `${30 + Math.floor(i / 4) * 35}%`,
                width: '6px',
                height: '6px',
                background: i % 2 === 0 ? theme.colors.basic : theme.colors.primary,
                borderRadius: '50%',
                boxShadow: `0 0 10px ${i % 2 === 0 ? theme.colors.basic : theme.colors.primary}`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0.5, 1.2, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.15,
              }}
            />
          ))}
        </div>

        {/* Entry/Exit shadows */}
        <div style={openingStyle('left')} />
        <div style={openingStyle('right')} />
      </div>

      {/* Hardware Items */}
      <AnimatePresence>
        {items.map((item) => (
          <HardwareItemComponent key={item.id} item={item} />
        ))}
      </AnimatePresence>

      {/* Labels */}
      <div style={{
        position: 'absolute',
        bottom: '10px',
        left: '12%',
        fontSize: theme.fontSize.sm,
        color: theme.colors.textMuted,
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
      }}>
        <span style={{
          width: '10px',
          height: '10px',
          background: '#ef4444',
          borderRadius: '50%',
          boxShadow: '0 0 6px #ef4444',
        }} />
        Old Hardware
      </div>
      <div style={{
        position: 'absolute',
        bottom: '10px',
        right: '12%',
        fontSize: theme.fontSize.sm,
        color: theme.colors.textMuted,
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
      }}>
        <span style={{
          width: '10px',
          height: '10px',
          background: theme.colors.success,
          borderRadius: '50%',
          boxShadow: `0 0 6px ${theme.colors.success}`,
        }} />
        Enterprise Ready
      </div>
    </div>
  )
}

function HardwareItemComponent({ item }: { item: HardwareItem }) {
  const [phase, setPhase] = useState<'entering' | 'inside' | 'exiting'>('entering')

  // Animation phases with timing
  useEffect(() => {
    // Enter tunnel at 40% of animation (3.6s into 9s)
    const enterTimer = setTimeout(() => setPhase('inside'), 3600)
    // Exit tunnel at 55% of animation (4.95s)
    const exitTimer = setTimeout(() => setPhase('exiting'), 4950)

    return () => {
      clearTimeout(enterTimer)
      clearTimeout(exitTimer)
    }
  }, [])

  const isTransformed = phase === 'exiting'
  const isHidden = phase === 'inside'

  const containerStyle: CSSProperties = {
    position: 'absolute',
    bottom: '68px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '6px',
    zIndex: isHidden ? 5 : 15,
  }

  const iconContainerStyle: CSSProperties = {
    position: 'relative',
    width: '56px',
    height: '56px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  const iconStyle: CSSProperties = {
    fontSize: '42px',
    filter: isTransformed
      ? 'drop-shadow(0 0 8px rgba(81, 207, 102, 0.6))'
      : 'grayscale(60%) brightness(0.7) drop-shadow(0 2px 4px rgba(0,0,0,0.5))',
    transition: 'filter 0.4s ease',
  }

  const labelStyle: CSSProperties = {
    fontSize: '11px',
    fontWeight: 600,
    color: isTransformed ? theme.colors.success : theme.colors.textMuted,
    whiteSpace: 'nowrap',
    textShadow: isTransformed ? `0 0 8px ${theme.colors.success}` : 'none',
    transition: 'all 0.4s ease',
  }

  return (
    <motion.div
      style={containerStyle}
      initial={{ left: '-80px', opacity: 0 }}
      animate={{
        left: ['0%', '42%', '42%', '58%', '58%', '100%'],
        opacity: isHidden ? 0 : 1,
      }}
      transition={{
        left: {
          duration: 9,
          times: [0, 0.40, 0.45, 0.55, 0.60, 1],
          ease: 'linear',
        },
        opacity: {
          duration: 0.3,
        }
      }}
      exit={{ opacity: 0 }}
    >
      <div style={iconContainerStyle}>
        {/* Glow ring for transformed items */}
        {isTransformed && (
          <motion.div
            style={{
              position: 'absolute',
              inset: '-8px',
              borderRadius: '50%',
              background: `radial-gradient(circle, rgba(81, 207, 102, 0.3) 0%, transparent 70%)`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}

        {/* Transformation flash */}
        {phase === 'exiting' && (
          <motion.div
            style={{
              position: 'absolute',
              inset: '-20px',
              borderRadius: '50%',
              background: `radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(81, 207, 102, 0.4) 40%, transparent 70%)`,
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
        )}

        <motion.span
          style={iconStyle}
          animate={isTransformed ? {
            scale: [1, 1.3, 1.1],
            rotate: [0, -10, 10, 0],
          } : {}}
          transition={{ duration: 0.5 }}
        >
          {isTransformed ? item.transformedIcon : item.icon}
        </motion.span>
      </div>

      <motion.span
        style={labelStyle}
        animate={isTransformed ? { scale: [1, 1.15, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        {isTransformed ? item.transformedLabel : item.label}
      </motion.span>

      {/* Dust/wear particles for old hardware */}
      {!isTransformed && !isHidden && (
        <>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                top: `${20 + i * 15}%`,
                left: `${70 + i * 10}%`,
                width: '4px',
                height: '4px',
                background: 'rgba(139, 92, 60, 0.6)',
                borderRadius: '50%',
              }}
              animate={{
                y: [0, -10, 0],
                opacity: [0.6, 0, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </>
      )}

      {/* Shine particles for transformed hardware */}
      {isTransformed && (
        <>
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                top: `${10 + i * 20}%`,
                left: `${20 + i * 15}%`,
                width: '5px',
                height: '5px',
                background: theme.colors.success,
                borderRadius: '50%',
                boxShadow: `0 0 6px ${theme.colors.success}`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </>
      )}
    </motion.div>
  )
}
