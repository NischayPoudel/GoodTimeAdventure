// Apple iOS-like animation presets for Framer Motion

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.3, ease: "easeOut" }
}

export const slideUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.175, 0.885, 0.32, 1.275] }
}

export const slideDown = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.175, 0.885, 0.32, 1.275] }
}

export const slideLeft = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5, ease: [0.175, 0.885, 0.32, 1.275] }
}

export const slideRight = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5, ease: [0.175, 0.885, 0.32, 1.275] }
}

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.4, ease: [0.175, 0.885, 0.32, 1.275] }
}

export const expandWidth = {
  initial: { opacity: 0, width: 0 },
  animate: { opacity: 1, width: "auto" },
  transition: { duration: 0.3, ease: "easeOut" }
}

export const staggerContainer = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
      ease: "easeOut"
    }
  }
}

export const staggerItem = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  }
}

// Hover animations
export const hoverScale = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: { duration: 0.2 }
}

export const hoverGlow = {
  whileHover: { 
    boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.3)",
    y: -4
  },
  transition: { duration: 0.2 }
}

// Page transitions
export const pageTransition = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.3, ease: "easeOut" }
}

// Bounce animation
export const bounce = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

// Pulse animation
export const pulse = {
  animate: {
    opacity: [1, 0.5, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

// Rotate animation
export const rotate = {
  animate: {
    rotate: 360,
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "linear"
    }
  }
}
