<script setup lang="ts">
import { ref } from 'vue'
import type { SocialLink } from '../config'

defineProps<{
  socialLinks: SocialLink[]
  resumeUrl: string
}>()

const copySuccess = ref(false)

const getIconSvg = (icon: string) => {
  const icons: Record<string, string> = {
    github: `<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>`,
    blog: `<path d="M4 11a9 9 0 0 1 9 9M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1"/>`,
    email: `<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>`
  }
  return icons[icon] || icons.blog
}

const handleClick = (link: SocialLink) => {
  if (link.isEmail) {
    copyEmail(link.url.replace('mailto:', ''))
  } else {
    window.open(link.url, '_blank')
  }
}

const copyEmail = async (email: string) => {
  try {
    await navigator.clipboard.writeText(email)
    copySuccess.value = true
    setTimeout(() => {
      copySuccess.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}
</script>

<template>
  <section class="contact section">
    <div class="container">
      <h2 class="section-title">联系方式</h2>

      <div class="contact-links">
        <button
          v-for="link in socialLinks"
          :key="link.name"
          class="contact-btn"
          @click="handleClick(link)"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            v-html="getIconSvg(link.icon)"
          ></svg>
          <span>{{ link.name }}</span>
        </button>
      </div>

      <div class="resume-section">
        <a :href="resumeUrl" class="resume-btn" download>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          <span>下载简历</span>
        </a>
      </div>

      <p v-if="copySuccess" class="copy-toast">邮箱已复制到剪贴板</p>
    </div>
  </section>
</template>

<style scoped>
.contact {
  background: var(--bg-secondary);
  text-align: center;
}

.contact-links {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.contact-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 12px;
  color: var(--text-primary);
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.contact-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
  transform: translateY(-3px);
  box-shadow: 0 10px 20px var(--shadow);
}

.contact-btn svg {
  width: 24px;
  height: 24px;
}

.resume-section {
  margin-top: 1rem;
}

.resume-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, var(--accent) 0%, #8b5cf6 100%);
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.resume-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 30px var(--shadow-strong);
}

.copy-toast {
  margin-top: 1.5rem;
  padding: 0.75rem 1.5rem;
  background: var(--accent);
  color: white;
  border-radius: 8px;
  display: inline-block;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
