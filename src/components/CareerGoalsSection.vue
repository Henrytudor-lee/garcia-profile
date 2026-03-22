<script setup lang="ts">
import type { CareerGoal } from '../config'

defineProps<{
  goals: CareerGoal[]
}>()

const goalColors = ['blue', 'emerald', 'purple', 'amber']

const getGoalColor = (index: number) => {
  return goalColors[index % goalColors.length]
}
</script>

<template>
  <section class="career-goals section">
    <div class="container">
      <h2 class="section-title">职业规划</h2>

      <div class="goals-grid">
        <div
          v-for="(goal, index) in goals"
          :key="goal.title"
          class="goal-card"
          :class="`goal-${getGoalColor(index)}`"
        >
          <div class="goal-icon">{{ goal.icon }}</div>
          <h3 class="goal-title">{{ goal.title }}</h3>
          <p class="goal-desc">{{ goal.description }}</p>

          <div class="goal-progress">
            <div class="progress-bar">
              <div class="progress-fill"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.career-goals {
  background: var(--bg-primary);
}

.goals-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 900px;
  margin: 0 auto;
}

.goal-card {
  background: var(--bg-card);
  padding: 2rem;
  border-radius: 16px;
  border: 1px solid var(--border);
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.goal-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
}

.goal-blue::before { background: linear-gradient(90deg, var(--color-blue), var(--color-cyan)); }
.goal-emerald::before { background: linear-gradient(90deg, var(--color-emerald), var(--color-cyan)); }
.goal-purple::before { background: linear-gradient(90deg, var(--color-purple), var(--color-rose)); }
.goal-amber::before { background: linear-gradient(90deg, var(--color-amber), var(--color-orange)); }

.goal-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px var(--shadow);
}

.goal-blue:hover { border-color: var(--color-blue); }
.goal-emerald:hover { border-color: var(--color-emerald); }
.goal-purple:hover { border-color: var(--color-purple); }
.goal-amber:hover { border-color: var(--color-amber); }

.goal-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.goal-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.goal-desc {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.goal-progress {
  padding-top: 1rem;
  border-top: 1px solid var(--border);
}

.progress-bar {
  height: 6px;
  background: var(--bg-secondary);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  width: 70%;
  border-radius: 3px;
  animation: progressGlow 2s ease-in-out infinite;
}

.goal-blue .progress-fill { background: linear-gradient(90deg, var(--color-blue), var(--color-cyan)); }
.goal-emerald .progress-fill { background: linear-gradient(90deg, var(--color-emerald), var(--color-cyan)); }
.goal-purple .progress-fill { background: linear-gradient(90deg, var(--color-purple), var(--color-rose)); }
.goal-amber .progress-fill { background: linear-gradient(90deg, var(--color-amber), var(--color-orange)); }

@keyframes progressGlow {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}
</style>
