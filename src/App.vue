<script setup lang="ts">
import { ref } from 'vue'
import { siteConfig } from './config'
import TopBar from './components/TopBar.vue'
import ParticleBackground from './components/ParticleBackground.vue'
import HeroSection from './components/HeroSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import ExperienceSection from './components/ExperienceSection.vue'
import CareerGoalsSection from './components/CareerGoalsSection.vue'
import ContactSection from './components/ContactSection.vue'

const particlesEnabled = ref(true)
const particleRef = ref<InstanceType<typeof ParticleBackground> | null>(null)

const handleToggleParticles = (enabled: boolean) => {
  particlesEnabled.value = enabled
}
</script>

<template>
  <div class="app">
    <ParticleBackground ref="particleRef" :enabled="particlesEnabled" />

    <TopBar ref="topBarRef" @toggle-particles="handleToggleParticles" />

    <main>
      <HeroSection
        :name="siteConfig.hero.name"
        :title="siteConfig.hero.title"
        :slogan="siteConfig.hero.slogan"
      />

      <SkillsSection :skills="siteConfig.skills" />

      <ProjectsSection :projects="siteConfig.projects" />

      <ExperienceSection :experiences="siteConfig.experiences" />

      <CareerGoalsSection :goals="siteConfig.careerGoals" />

      <ContactSection
        :social-links="siteConfig.socialLinks"
        :resume-url="siteConfig.resumeUrl"
      />
    </main>

    <footer class="footer">
      <p>© 2024 {{ siteConfig.hero.name }}. All rights reserved.</p>
    </footer>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
}

.footer {
  padding: 2rem;
  text-align: center;
  color: var(--text-muted);
  font-size: 0.875rem;
  background: var(--bg-primary);
  border-top: 1px solid var(--border);
}
</style>
