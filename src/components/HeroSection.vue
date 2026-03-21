<script setup lang="ts">
import { ref, onMounted } from 'vue'

defineProps<{
  name: string
  title: string
  slogan: string
}>()

const isVisible = ref(false)
const typedText = ref('')
const fullSlogan = ref('')

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 300)

  // 打字机效果
  fullSlogan.value = '构建优雅高效的Web体验'
  let index = 0
  const typeInterval = setInterval(() => {
    if (index <= fullSlogan.value.length) {
      typedText.value = fullSlogan.value.slice(0, index)
      index++
    } else {
      clearInterval(typeInterval)
    }
  }, 100)
})
</script>

<template>
  <section class="hero">
    <div class="hero-content">
      <div class="hero-avatar">
        <div class="avatar-circle">
          {{ name.charAt(0) }}
        </div>
      </div>

      <h1 class="hero-name" :class="{ visible: isVisible }">
        {{ name }}
      </h1>

      <h2 class="hero-title" :class="{ visible: isVisible }">
        {{ title }}
      </h2>

      <p class="hero-slogan" :class="{ visible: isVisible }">
        <span class="typing-text">{{ typedText }}</span>
        <span class="cursor">|</span>
      </p>

      <div class="hero-scroll" :class="{ visible: isVisible }">
        <span>向下滚动</span>
        <div class="scroll-arrow"></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
}

.hero-content {
  text-align: center;
  z-index: 1;
}

.hero-avatar {
  margin-bottom: 2rem;
}

.avatar-circle {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent) 0%, #8b5cf6 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  font-weight: 700;
  color: white;
  margin: 0 auto;
  box-shadow: 0 20px 40px var(--shadow-strong);
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.hero-name {
  font-size: 4rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s ease;
}

.hero-name.visible {
  opacity: 1;
  transform: translateY(0);
}

.hero-title {
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--accent);
  margin-bottom: 1.5rem;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s ease 0.2s;
}

.hero-title.visible {
  opacity: 1;
  transform: translateY(0);
}

.hero-slogan {
  font-size: 1.25rem;
  color: var(--text-secondary);
  min-height: 2rem;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s ease 0.4s;
}

.hero-slogan.visible {
  opacity: 1;
  transform: translateY(0);
}

.typing-text {
  font-family: 'Courier New', monospace;
}

.cursor {
  animation: blink 1s step-end infinite;
  color: var(--accent);
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

.hero-scroll {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-muted);
  font-size: 0.875rem;
  opacity: 0;
  transition: opacity 0.8s ease 0.6s;
}

.hero-scroll.visible {
  opacity: 1;
}

.scroll-arrow {
  width: 20px;
  height: 30px;
  border: 2px solid var(--text-muted);
  border-radius: 10px;
  position: relative;
}

.scroll-arrow::before {
  content: '';
  position: absolute;
  top: 6px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 8px;
  background: var(--accent);
  border-radius: 2px;
  animation: scrollDown 1.5s ease-in-out infinite;
}

@keyframes scrollDown {
  0%, 100% {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
  50% {
    opacity: 0.5;
    transform: translateX(-50%) translateY(10px);
  }
}

@media (max-width: 768px) {
  .hero-name {
    font-size: 2.5rem;
  }

  .hero-title {
    font-size: 1.25rem;
  }

  .avatar-circle {
    width: 100px;
    height: 100px;
    font-size: 2.5rem;
  }
}
</style>
