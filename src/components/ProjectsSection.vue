<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Project } from '../config'

const props = defineProps<{
  projects: Project[]
}>()

const emit = defineEmits<{
  (e: 'openDetail', project: Project): void
}>()

// 筛选状态
const activeFilter = ref<string>('全部')
const allTechs = computed(() => {
  const techs = new Set<string>()
  props.projects.forEach(p => p.techStack.forEach(t => techs.add(t)))
  return ['全部', ...Array.from(techs)]
})

const filteredProjects = computed(() => {
  if (activeFilter.value === '全部') {
    return props.projects
  }
  return props.projects.filter(p => p.techStack.includes(activeFilter.value))
})

const setFilter = (tech: string) => {
  activeFilter.value = tech
}

// 3D卡片倾斜效果
const cardRefs = ref<HTMLElement[]>([])

const handleMouseMove = (e: MouseEvent, index: number) => {
  const card = cardRefs.value[index]
  if (!card) return

  const rect = card.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top

  const centerX = rect.width / 2
  const centerY = rect.height / 2

  const rotateX = (y - centerY) / centerY * -10
  const rotateY = (x - centerX) / centerX * 10

  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
  card.style.boxShadow = `${-rotateY * 2}px ${rotateX * 2}px 30px var(--shadow-strong)`
}

const handleMouseLeave = (index: number) => {
  const card = cardRefs.value[index]
  if (!card) return

  card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)'
  card.style.boxShadow = '0 10px 30px var(--shadow)'
}

const openProject = (project: Project) => {
  window.open(project.link, '_blank')
}

const setCardRef = (el: HTMLElement | null, index: number) => {
  if (el) cardRefs.value[index] = el
}
</script>

<template>
  <section class="projects section">
    <div class="container">
      <h2 class="section-title">作品展示</h2>

      <!-- 筛选 -->
      <div class="filter-bar">
        <button
          v-for="tech in allTechs"
          :key="tech"
          class="filter-btn"
          :class="{ active: activeFilter === tech }"
          @click="setFilter(tech)"
        >
          {{ tech }}
        </button>
      </div>

      <!-- 项目卡片 -->
      <div class="projects-grid">
        <div
          v-for="(project, index) in filteredProjects"
          :key="project.name"
          :ref="(el) => setCardRef(el as HTMLElement, index)"
          class="project-card"
          @mousemove="handleMouseMove($event, index)"
          @mouseleave="handleMouseLeave(index)"
          @click="openProject(project)"
        >
          <div class="project-cover">
            <div class="project-icon">
              {{ project.name.charAt(0) }}
            </div>
          </div>

          <div class="project-info">
            <h3 class="project-name">{{ project.name }}</h3>
            <p class="project-desc">{{ project.description }}</p>

            <div class="project-techs">
              <span
                v-for="tech in project.techStack"
                :key="tech"
                class="tech-badge"
              >
                {{ tech }}
              </span>
            </div>
          </div>

          <div class="project-link">
            <span>查看项目</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M7 17L17 7M17 7H7M17 7V17"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- 无结果提示 -->
      <p v-if="filteredProjects.length === 0" class="no-result">
        暂无匹配的项目
      </p>
    </div>
  </section>
</template>

<style scoped>
.projects {
  background: var(--bg-primary);
}

.filter-bar {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 3rem;
}

.filter-btn {
  padding: 0.5rem 1.25rem;
  border: 1px solid var(--border);
  border-radius: 20px;
  background: var(--bg-card);
  color: var(--text-secondary);
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.filter-btn.active {
  background: var(--accent);
  border-color: var(--accent);
  color: white;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 2rem;
}

.project-card {
  background: var(--bg-card);
  border-radius: 16px;
  border: 1px solid var(--border);
  overflow: hidden;
  cursor: pointer;
  transition: box-shadow 0.3s ease;
  box-shadow: 0 10px 30px var(--shadow);
  transform-style: preserve-3d;
}

.project-card:hover .project-link {
  opacity: 1;
  transform: translateY(0);
}

.project-cover {
  height: 160px;
  background: linear-gradient(135deg, var(--accent) 0%, #8b5cf6 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.project-cover::before {
  content: '';
  position: absolute;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%);
  transform: rotate(45deg);
}

.project-icon {
  width: 64px;
  height: 64px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  font-weight: 700;
  color: white;
  backdrop-filter: blur(10px);
}

.project-info {
  padding: 1.5rem;
}

.project-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.project-desc {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: 1rem;
  line-height: 1.5;
}

.project-techs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-badge {
  padding: 0.25rem 0.75rem;
  background: var(--bg-secondary);
  border-radius: 12px;
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.project-link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  background: var(--bg-secondary);
  color: var(--accent);
  font-size: 0.875rem;
  font-weight: 500;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;
}

.project-link:hover {
  background: var(--accent);
  color: white;
}

.no-result {
  text-align: center;
  color: var(--text-muted);
  padding: 3rem;
}

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>
