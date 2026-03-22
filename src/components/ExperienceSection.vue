<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Experience } from '../config'

defineProps<{
  experiences: Experience[]
}>()

// Timeline dot colors
const dotColors = ['blue', 'purple', 'emerald', 'indigo', 'rose']

const getDotColor = (index: number) => {
  return dotColors[index % dotColors.length]
}

// 滚动动画
const visibleItems = ref<Set<number>>(new Set())

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.getAttribute('data-index') || '0')
          visibleItems.value.add(index)
        }
      })
    },
    { threshold: 0.2 }
  )

  document.querySelectorAll('.timeline-item').forEach(item => {
    observer.observe(item)
  })
})
</script>

<template>
  <section class="experience section">
    <div class="container">
      <h2 class="section-title">职业经历</h2>

      <div class="timeline">
        <div
          v-for="(exp, index) in experiences"
          :key:="index"
          class="timeline-item"
          :data-index="index"
          :class="[`dot-${getDotColor(index)}`, { visible: visibleItems.has(index) }]"
        >
          <div class="timeline-dot"></div>

          <div class="timeline-content">
            <div class="exp-header">
              <div class="exp-period">{{ exp.period }}</div>
              <h3 class="exp-position">{{ exp.position }}</h3>
              <h4 class="exp-company">{{ exp.company }}</h4>
            </div>

            <p class="exp-description">{{ exp.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.experience {
  background: var(--bg-warm);
}

.timeline {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 100%;
  background: var(--border);
}

.timeline-item {
  position: relative;
  display: flex;
  justify-content: flex-end;
  padding-right: calc(50% + 30px);
  margin-bottom: 3rem;
  opacity: 0;
  transform: translateX(-30px);
  transition: all 0.6s ease;
}

.timeline-item:nth-child(even) {
  justify-content: flex-start;
  padding-right: 0;
  padding-left: calc(50% + 30px);
  transform: translateX(30px);
}

.timeline-item.visible {
  opacity: 1;
  transform: translateX(0);
}

.timeline-dot {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 3px solid var(--bg-secondary);
  z-index: 1;
}

.dot-blue .timeline-dot { background: var(--color-blue); box-shadow: 0 0 0 3px var(--color-blue); }
.dot-purple .timeline-dot { background: var(--color-purple); box-shadow: 0 0 0 3px var(--color-purple); }
.dot-emerald .timeline-dot { background: var(--color-emerald); box-shadow: 0 0 0 3px var(--color-emerald); }
.dot-indigo .timeline-dot { background: var(--color-indigo); box-shadow: 0 0 0 3px var(--color-indigo); }
.dot-rose .timeline-dot { background: var(--color-rose); box-shadow: 0 0 0 3px var(--color-rose); }

.timeline-content {
  background: var(--bg-card);
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid var(--border);
  max-width: 400px;
  transition: all 0.3s ease;
}

.timeline-content:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px var(--shadow);
}

.exp-header {
  margin-bottom: 0.75rem;
}

.exp-period {
  font-size: 0.75rem;
  color: var(--accent);
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.exp-position {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
}

.exp-company {
  font-size: 0.875rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.exp-description {
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

@media (max-width: 768px) {
  .timeline::before {
    left: 20px;
  }

  .timeline-item,
  .timeline-item:nth-child(even) {
    padding-left: 60px;
    padding-right: 0;
    justify-content: flex-start;
  }

  .timeline-dot {
    left: 20px;
  }

  .timeline-content {
    max-width: 100%;
  }
}
</style>
