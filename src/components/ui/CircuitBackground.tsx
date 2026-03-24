import { CSSProperties } from 'react'
import { motion } from 'framer-motion'
import { theme } from '../../styles/theme'

export function CircuitBackground() {
  const containerStyle: CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
    pointerEvents: 'none',
    zIndex: 0,
  }

  // Circuit board grid pattern
  const gridSize = 60
  const gridLines = []

  // Vertical lines
  for (let i = 0; i < 30; i++) {
    gridLines.push(
      <line
        key={`v-${i}`}
        x1={i * gridSize}
        y1="0"
        x2={i * gridSize}
        y2="100%"
        stroke={theme.colors.border}
        strokeWidth="0.5"
        opacity="0.3"
      />
    )
  }

  // Horizontal lines
  for (let i = 0; i < 50; i++) {
    gridLines.push(
      <line
        key={`h-${i}`}
        x1="0"
        y1={i * gridSize}
        x2="100%"
        y2={i * gridSize}
        stroke={theme.colors.border}
        strokeWidth="0.5"
        opacity="0.3"
      />
    )
  }

  // Circuit nodes (connection points)
  const nodes = [
    { x: 120, y: 180, type: 'chip' },
    { x: 360, y: 120, type: 'node' },
    { x: 540, y: 300, type: 'chip' },
    { x: 180, y: 420, type: 'node' },
    { x: 780, y: 180, type: 'chip' },
    { x: 660, y: 480, type: 'node' },
    { x: 900, y: 360, type: 'chip' },
    { x: 1080, y: 120, type: 'node' },
    { x: 1200, y: 300, type: 'chip' },
    { x: 420, y: 540, type: 'node' },
    { x: 1020, y: 540, type: 'chip' },
    { x: 240, y: 660, type: 'node' },
    { x: 600, y: 720, type: 'chip' },
    { x: 840, y: 660, type: 'node' },
    { x: 1140, y: 480, type: 'chip' },
  ]

  // Circuit traces between nodes
  const traces = [
    { from: nodes[0], to: nodes[1], color: theme.colors.basic },
    { from: nodes[1], to: nodes[2], color: theme.colors.primary },
    { from: nodes[2], to: nodes[4], color: theme.colors.basic },
    { from: nodes[0], to: nodes[3], color: theme.colors.primary },
    { from: nodes[4], to: nodes[6], color: theme.colors.basic },
    { from: nodes[5], to: nodes[6], color: theme.colors.primary },
    { from: nodes[6], to: nodes[7], color: theme.colors.basic },
    { from: nodes[7], to: nodes[8], color: theme.colors.primary },
    { from: nodes[3], to: nodes[9], color: theme.colors.basic },
    { from: nodes[5], to: nodes[10], color: theme.colors.primary },
    { from: nodes[9], to: nodes[11], color: theme.colors.basic },
    { from: nodes[11], to: nodes[12], color: theme.colors.primary },
    { from: nodes[12], to: nodes[13], color: theme.colors.basic },
    { from: nodes[10], to: nodes[14], color: theme.colors.primary },
  ]

  return (
    <div style={containerStyle}>
      <svg
        width="100%"
        height="100%"
        style={{ position: 'absolute', top: 0, left: 0 }}
        preserveAspectRatio="xMinYMin slice"
      >
        <defs>
          {/* Gradient for traces */}
          <linearGradient id="traceGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={theme.colors.basic} stopOpacity="0.4" />
            <stop offset="50%" stopColor={theme.colors.basic} stopOpacity="0.8" />
            <stop offset="100%" stopColor={theme.colors.basic} stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="traceGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={theme.colors.primary} stopOpacity="0.4" />
            <stop offset="50%" stopColor={theme.colors.primary} stopOpacity="0.8" />
            <stop offset="100%" stopColor={theme.colors.primary} stopOpacity="0.4" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background grid */}
        {gridLines}

        {/* Circuit traces */}
        {traces.map((trace, i) => {
          // Create an L-shaped path between nodes
          const midX = trace.from.x + (trace.to.x - trace.from.x) / 2
          const path = `M ${trace.from.x} ${trace.from.y} L ${midX} ${trace.from.y} L ${midX} ${trace.to.y} L ${trace.to.x} ${trace.to.y}`

          return (
            <g key={i}>
              {/* Trace line */}
              <motion.path
                d={path}
                fill="none"
                stroke={trace.color}
                strokeWidth="2"
                opacity="0.15"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Animated pulse along trace */}
              <motion.circle
                r="3"
                fill={trace.color}
                filter="url(#glow)"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              >
                <animateMotion
                  dur={`${4 + Math.random() * 3}s`}
                  repeatCount="indefinite"
                  path={path}
                />
              </motion.circle>
            </g>
          )
        })}

        {/* Circuit nodes */}
        {nodes.map((node, i) => (
          <g key={i}>
            {node.type === 'chip' ? (
              // Chip component (square with pins)
              <g>
                <motion.rect
                  x={node.x - 15}
                  y={node.y - 15}
                  width="30"
                  height="30"
                  fill={theme.colors.surface}
                  stroke={theme.colors.border}
                  strokeWidth="1"
                  rx="2"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
                {/* Chip pins */}
                {[-10, 0, 10].map((offset, j) => (
                  <g key={j}>
                    <rect
                      x={node.x + offset - 2}
                      y={node.y - 20}
                      width="4"
                      height="5"
                      fill={theme.colors.textMuted}
                      opacity="0.3"
                    />
                    <rect
                      x={node.x + offset - 2}
                      y={node.y + 15}
                      width="4"
                      height="5"
                      fill={theme.colors.textMuted}
                      opacity="0.3"
                    />
                  </g>
                ))}
              </g>
            ) : (
              // Simple node (circle)
              <motion.circle
                cx={node.x}
                cy={node.y}
                r="6"
                fill={theme.colors.surface}
                stroke={theme.colors.border}
                strokeWidth="1"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            )}
          </g>
        ))}
      </svg>

      {/* Gradient overlays */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '400px',
          background: `linear-gradient(180deg, ${theme.colors.background} 0%, transparent 100%)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '200px',
          background: `linear-gradient(0deg, ${theme.colors.background} 0%, transparent 100%)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          width: '200px',
          background: `linear-gradient(90deg, ${theme.colors.background} 0%, transparent 100%)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: '200px',
          background: `linear-gradient(270deg, ${theme.colors.background} 0%, transparent 100%)`,
        }}
      />
    </div>
  )
}
