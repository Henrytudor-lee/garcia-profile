<script setup lang="ts">
import type { SkillCategory } from '../config'

defineProps<{
  skills: SkillCategory[]
}>()
</script>

<template>
  <section class="skills section">
    <div class="container">
      <h2 class="section-title">技术栈</h2>

      <div class="skills-grid">
        <div
          v-for="category in skills"
          :key="category.name"
          class="skill-card"
        >
          <h3 class="skill-category">{{ category.name }}</h3>
          <div class="skill-tags">
            <span
              v-for="skill in category.skills"
              :key="skill"
              class="skill-tag"
            >
              {{ skill }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skills {
  background: var(--bg-secondary);
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.skill-card {
  background: var(--bg-card);
  padding: 2rem;
  border-radius: 16px;
  border: 1px solid var(--border);
  transition: all 0.3s ease;
}

.skill-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px var(--shadow);
}

.skill-category {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid var(--accent);
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.skill-tag {
  padding: 0.5rem 1rem;
  background: var(--bg-primary);
  border: 1px solid var(--border);
  border-radius: 20px;
  font-size: 0.875rem;
  color: var(--text-secondary);
  transition: all 0.2s ease;
  cursor: default;
}

.skill-tag:hover {
  background: var(--accent);
  color: white;
  border-color: var(--accent);
  transform: scale(1.05);
}
</style>
