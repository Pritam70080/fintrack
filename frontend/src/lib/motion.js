export const springGentle = { type: 'spring', stiffness: 280, damping: 24 }
export const springSnappy = { type: 'spring', stiffness: 420, damping: 28 }
export const entrance = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: springGentle }
