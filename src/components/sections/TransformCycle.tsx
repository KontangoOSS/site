import { CSSProperties, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { theme } from '../../styles/theme'
import { Container } from '../ui/Container'

interface ProcessStep {
  icon: string
  title: string
  description: string
  color: string
}

// The actual transformation process
const processSteps: ProcessStep[] = [
  {
    icon: '🗑️',
    title: 'Source',
    description: 'Find surplus hardware',
    color: '#ef4444', // red for "old/discarded"
  },
  {
    icon: '🔧',
    title: 'Prepare',
    description: 'Wipe & test equipment',
    color: theme.colors.intermediate,
  },
  {
    icon: '💿',
    title: 'Install',
    description: 'Deploy open source OS',
    color: theme.colors.primary,
  },
  {
    icon: '🔗',
    title: 'Configure',
    description: 'Network & security setup',
    color: theme.colors.primary,
  },
  {
    icon: '🚀',
    title: 'Deploy',
    description: 'Launch your services',
    color: theme.colors.basic,
  },
  {
    icon: '🏢',
    title: 'Enterprise',
    description: 'Run forever. Free.',
    color: theme.colors.basic,
  },
]

export function TransformCycle() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const sectionStyle: CSSProperties = {
    paddingTop: theme.spacing.xxxl,
    paddingBottom: theme.spacing.xxxl,
    position: 'relative',
    overflow: 'hidden',
  }

  const headerStyle: CSSProperties = {
    textAlign: 'center',
    marginBottom: theme.spacing.xxl,
  }

  const titleStyle: CSSProperties = {
    fontSize: theme.fontSize['4xl'],
    fontWeight: theme.fontWeight.bold,
    marginBottom: theme.spacing.md,
    color: theme.colors.textPrimary,
  }

  const subtitleStyle: CSSProperties = {
    fontSize: theme.fontSize.lg,
    color: theme.colors.textSecondary,
  }

  const cycleContainerStyle: CSSProperties = {
    position: 'relative',
    width: '100%',
    maxWidth: '800px',
    margin: '0 auto',
    aspectRatio: '1',
  }

  // Calculate positions around the circle
  const radius = 280
  const centerX = 400
  const centerY = 400
  const itemSize = 120

  const getItemPosition = (index: number, total: number) => {
    // Start from the top (-90 degrees) and go clockwise
    const angle = ((index / total) * 360 - 90) * (Math.PI / 180)
    return {
      x: centerX + radius * Math.cos(angle) - itemSize / 2,
      y: centerY + radius * Math.sin(angle) - itemSize / 2,
    }
  }

  const itemStyle = (index: number): CSSProperties => {
    const pos = getItemPosition(index, processSteps.length)
    return {
      position: 'absolute',
      left: pos.x,
      top: pos.y,
      width: itemSize,
      height: itemSize,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      background: theme.colors.surface,
      border: `2px solid ${theme.colors.border}`,
      borderRadius: '50%',
      padding: theme.spacing.sm,
      zIndex: 10,
    }
  }

  const iconStyle: CSSProperties = {
    fontSize: '28px',
    marginBottom: '4px',
  }

  const itemTitleStyle: CSSProperties = {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.textPrimary,
    lineHeight: 1.2,
  }

  const itemDescStyle: CSSProperties = {
    fontSize: '10px',
    color: theme.colors.textMuted,
    lineHeight: 1.2,
  }

  // Create curved arrow path between items
  const createArrowPath = (fromIndex: number, toIndex: number) => {
    const fromAngle = (fromIndex / processSteps.length) * 360 - 90
    const toAngle = (toIndex / processSteps.length) * 360 - 90

    const startAngleRad = (fromAngle + 20) * Math.PI / 180
    const endAngleRad = (toAngle - 20) * Math.PI / 180

    const startX = centerX + (radius) * Math.cos(startAngleRad)
    const startY = centerY + (radius) * Math.sin(startAngleRad)
    const endX = centerX + (radius) * Math.cos(endAngleRad)
    const endY = centerY + (radius) * Math.sin(endAngleRad)

    // Control point for the curve
    const midAngle = ((fromAngle + toAngle) / 2 + (toAngle < fromAngle ? 180 : 0)) * Math.PI / 180
    const ctrlRadius = radius + 40
    const ctrlX = centerX + ctrlRadius * Math.cos(midAngle)
    const ctrlY = centerY + ctrlRadius * Math.sin(midAngle)

    return `M ${startX} ${startY} Q ${ctrlX} ${ctrlY} ${endX} ${endY}`
  }

  return (
    <section style={sectionStyle}>
      <Container size="xl">
        <div style={headerStyle}>
          <h2 style={titleStyle}>The Transformation Process</h2>
          <p style={subtitleStyle}>
            From dumpster find to enterprise infrastructure in 6 steps
          </p>
        </div>

        <div style={cycleContainerStyle}>
          <svg
            viewBox="0 0 800 800"
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          >
            <defs>
              {/* Arrow marker */}
              <marker
                id="processArrow"
                markerWidth="12"
                markerHeight="8"
                refX="10"
                refY="4"
                orient="auto"
              >
                <polygon
                  points="0 0, 12 4, 0 8"
                  fill={theme.colors.basic}
                  opacity="0.8"
                />
              </marker>

              {/* Gradient for the outer ring */}
              <linearGradient id="processRingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.3" />
                <stop offset="50%" stopColor={theme.colors.primary} stopOpacity="0.3" />
                <stop offset="100%" stopColor={theme.colors.basic} stopOpacity="0.3" />
              </linearGradient>
            </defs>

            {/* Outer rotating ring - shows the cycle */}
            <motion.circle
              cx={centerX}
              cy={centerY}
              r={radius + 50}
              fill="none"
              stroke="url(#processRingGradient)"
              strokeWidth="2"
              strokeDasharray="15 10"
              animate={{ rotate: 360 }}
              transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
              style={{ transformOrigin: 'center' }}
            />

            {/* Center hub with transformation icon */}
            <motion.circle
              cx={centerX}
              cy={centerY}
              r="60"
              fill={theme.colors.surface}
              stroke={theme.colors.basic}
              strokeWidth="3"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Center icon */}
            <text
              x={centerX}
              y={centerY - 5}
              textAnchor="middle"
              fontSize="32"
              dominantBaseline="middle"
            >
              ⚡
            </text>
            <text
              x={centerX}
              y={centerY + 25}
              textAnchor="middle"
              fill={theme.colors.textMuted}
              fontSize="10"
              fontWeight="bold"
            >
              TRANSFORM
            </text>

            {/* Connecting arrows between steps */}
            {processSteps.map((step, index) => {
              const nextIndex = (index + 1) % processSteps.length
              const path = createArrowPath(index, nextIndex)
              const isLastToFirst = index === processSteps.length - 1

              return (
                <g key={`arrow-${index}`}>
                  {/* Arrow path */}
                  <path
                    d={path}
                    fill="none"
                    stroke={isLastToFirst ? theme.colors.basic : theme.colors.border}
                    strokeWidth={isLastToFirst ? 3 : 2}
                    markerEnd="url(#processArrow)"
                    opacity={isLastToFirst ? 0.9 : 0.5}
                  />

                  {/* Animated particle along path */}
                  <motion.circle
                    r="5"
                    fill={step.color}
                    filter="url(#glow)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.4,
                    }}
                  >
                    <animateMotion
                      dur="2s"
                      repeatCount="indefinite"
                      path={path}
                      begin={`${index * 0.4}s`}
                    />
                  </motion.circle>
                </g>
              )
            })}

            {/* Step numbers */}
            {processSteps.map((step, index) => {
              const angle = ((index / processSteps.length) * 360 - 90) * Math.PI / 180
              const numRadius = radius - itemSize / 2 - 25
              const x = centerX + numRadius * Math.cos(angle)
              const y = centerY + numRadius * Math.sin(angle)

              return (
                <g key={`num-${index}`}>
                  <circle
                    cx={x}
                    cy={y}
                    r="14"
                    fill={step.color}
                    opacity="0.9"
                  />
                  <text
                    x={x}
                    y={y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="white"
                    fontSize="12"
                    fontWeight="bold"
                  >
                    {index + 1}
                  </text>
                </g>
              )
            })}
          </svg>

          {/* Process step items */}
          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              style={itemStyle(index)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{
                scale: 1.15,
                borderColor: step.color,
                boxShadow: `0 0 30px ${step.color}50`,
                zIndex: 20,
              }}
            >
              <div style={iconStyle}>{step.icon}</div>
              <div style={{ ...itemTitleStyle, color: step.color }}>{step.title}</div>
              <div style={itemDescStyle}>{step.description}</div>
            </motion.div>
          ))}
        </div>

        {/* Detailed steps below the cycle */}
        <div style={{
          display: isMobile ? 'none' : 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: theme.spacing.md,
          marginTop: theme.spacing.xxl,
        }}>
          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              style={{
                padding: theme.spacing.md,
                background: theme.colors.surface,
                border: `1px solid ${theme.colors.border}`,
                borderRadius: theme.borderRadius.lg,
                textAlign: 'center',
                position: 'relative',
              }}
              whileHover={{
                borderColor: step.color,
                transform: 'translateY(-4px)',
              }}
              transition={{ duration: 0.2 }}
            >
              {/* Step number badge */}
              <div style={{
                position: 'absolute',
                top: '-12px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: step.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 'bold',
                color: 'white',
              }}>
                {index + 1}
              </div>

              <div style={{ fontSize: '24px', marginTop: theme.spacing.sm }}>{step.icon}</div>
              <div style={{
                fontSize: theme.fontSize.sm,
                fontWeight: theme.fontWeight.bold,
                color: step.color,
                marginTop: theme.spacing.xs,
              }}>
                {step.title}
              </div>
              <div style={{
                fontSize: theme.fontSize.xs,
                color: theme.colors.textMuted,
                marginTop: '4px',
              }}>
                {getStepDetail(index)}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}

function getStepDetail(index: number): string {
  const details = [
    'Thrift stores, eBay, corporate surplus, IT recyclers',
    'Clean drives, test RAM, check fans and power',
    'Proxmox, OPNsense, TrueNAS, Ubuntu Server',
    'VLANs, firewalls, VPN, monitoring stack',
    'Docker, Kubernetes, databases, applications',
    'Enterprise infrastructure at zero ongoing cost',
  ]
  return details[index]
}
