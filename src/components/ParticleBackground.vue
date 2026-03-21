<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  alpha: number
}

const canvasRef = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let particles: Particle[] = []
let animationId: number | null = null
let mouseX = 0
let mouseY = 0
let isEnabled = ref(true)

const props = defineProps<{
  enabled?: boolean
}>()

const initParticles = (width: number, height: number) => {
  particles = []
  const count = Math.min(80, Math.floor((width * height) / 15000))

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
      alpha: Math.random() * 0.5 + 0.2
    })
  }
}

const drawParticle = (p: Particle) => {
  if (!ctx) return

  // 鼠标交互 - 粒子被排斥
  const dx = p.x - mouseX
  const dy = p.y - mouseY
  const dist = Math.sqrt(dx * dx + dy * dy)
  const maxDist = 150

  let offsetX = 0
  let offsetY = 0

  if (dist < maxDist) {
    const force = (maxDist - dist) / maxDist
    const angle = Math.atan2(dy, dx)
    offsetX = Math.cos(angle) * force * 30
    offsetY = Math.sin(angle) * force * 30
  }

  ctx.beginPath()
  ctx.arc(p.x + offsetX, p.y + offsetY, p.size, 0, Math.PI * 2)
  ctx.fillStyle = `rgba(59, 130, 246, ${p.alpha})`
  ctx.fill()
}

const drawConnection = () => {
  if (!ctx) return

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x
      const dy = particles[i].y - particles[j].y
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < 120) {
        ctx.beginPath()
        ctx.moveTo(particles[i].x, particles[i].y)
        ctx.lineTo(particles[j].x, particles[j].y)
        ctx.strokeStyle = `rgba(59, 130, 246, ${0.15 * (1 - dist / 120)})`
        ctx.stroke()
      }
    }
  }
}

const animate = () => {
  if (!canvasRef.value || !ctx || !props.enabled) return

  const width = canvasRef.value.width
  const height = canvasRef.value.height

  ctx.clearRect(0, 0, width, height)

  particles.forEach(p => {
    p.x += p.vx
    p.y += p.vy

    // 边界反弹
    if (p.x < 0 || p.x > width) p.vx *= -1
    if (p.y < 0 || p.y > height) p.vy *= -1

    // 保持在边界内
    p.x = Math.max(0, Math.min(width, p.x))
    p.y = Math.max(0, Math.min(height, p.y))

    drawParticle(p)
  })

  drawConnection()

  animationId = requestAnimationFrame(animate)
}

const handleResize = () => {
  if (!canvasRef.value) return

  canvasRef.value.width = window.innerWidth
  canvasRef.value.height = window.innerHeight
  initParticles(window.innerWidth, window.innerHeight)
}

const handleMouseMove = (e: MouseEvent) => {
  mouseX = e.clientX
  mouseY = e.clientY
}

onMounted(() => {
  if (!canvasRef.value) return

  ctx = canvasRef.value.getContext('2d')
  handleResize()

  window.addEventListener('resize', handleResize)
  window.addEventListener('mousemove', handleMouseMove)

  animate()
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('mousemove', handleMouseMove)
})

// 暴露方法给父组件
defineExpose({
  setEnabled: (enabled: boolean) => {
    isEnabled.value = enabled
    if (enabled) {
      animate()
    }
  }
})
</script>

<template>
  <canvas
    ref="canvasRef"
    class="particle-canvas"
    :class="{ disabled: !enabled }"
  />
</template>

<style scoped>
.particle-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
}

.particle-canvas.disabled {
  opacity: 0;
  transition: opacity 0.5s ease;
}
</style>
