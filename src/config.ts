// =====================================================
// 配置文件 - 修改此文件即可自定义整个网站内容
// =====================================================

export interface Project {
  name: string
  description: string
  techStack: string[]
  cover: string
  link: string
}

export interface Experience {
  company: string
  position: string
  period: string
  description: string
}

export interface SkillCategory {
  name: string
  skills: string[]
}

export interface CareerGoal {
  title: string
  description: string
  icon: string
}

export interface SocialLink {
  name: string
  icon: string
  url: string
  isEmail?: boolean
}

export interface SiteConfig {
  hero: {
    name: string
    title: string
    slogan: string
  }
  skills: SkillCategory[]
  projects: Project[]
  experiences: Experience[]
  careerGoals: CareerGoal[]
  socialLinks: SocialLink[]
  resumeUrl: string
}

// =====================================================
// 在此修改你的个人信息
// =====================================================
export const siteConfig: SiteConfig = {
  hero: {
    name: "Garcia",
    title: "Frontend Developer",
    slogan: "构建优雅高效的Web体验"
  },

  skills: [
    {
      name: "Frontend",
      skills: ["Vue 3", "React", "TypeScript", "Next.js", "CSS3", "Tailwind"]
    },
    {
      name: "Engineering",
      skills: ["Vite", "Webpack", "Git", "CI/CD", "Testing", "Performance"]
    },
    {
      name: "Visualization",
      skills: ["Three.js", "Canvas", "Recharts", "ECharts", "D3.js"]
    }
  ],

  projects: [
    {
      name: "Fitness App",
      description: "移动端健身追踪应用，支持训练记录、数据分析",
      techStack: ["Vue 3", "Ionic", "Capacitor", "Supabase"],
      cover: "",
      link: "https://fitness.garcia.dev"
    },
    {
      name: "Fit Stat",
      description: "健身数据可视化平台，展示训练趋势和成就",
      techStack: ["Next.js", "Recharts", "Supabase"],
      cover: "",
      link: "https://fitstat.garcia.dev"
    },
    {
      name: "Fitness Manage",
      description: "健身管理后台系统",
      techStack: ["Next.js", "Tailwind", "Supabase"],
      cover: "",
      link: "https://manage.garcia.dev"
    },
    {
      name: "Garcia 3D",
      description: "3D可视化展示项目",
      techStack: ["Next.js", "Three.js", "React Three Fiber"],
      cover: "",
      link: "https://3d.garcia.dev"
    },
    {
      name: "Photo Handler",
      description: "照片处理工具",
      techStack: ["Next.js", "Canvas API"],
      cover: "",
      link: "https://photo.garcia.dev"
    },
    {
      name: "AI Nav Web",
      description: "AI生成的个人导航页",
      techStack: ["Vue 3", "Vite", "TypeScript", "Canvas"],
      cover: "",
      link: "https://nav.garcia.dev"
    }
  ],

  experiences: [
    {
      company: "科技公司",
      position: "前端开发工程师",
      period: "2022 - 至今",
      description: "负责多个Web应用的前端开发，使用Vue3和Next.js构建高性能应用"
    },
    {
      company: "创业公司",
      position: "全栈开发工程师",
      period: "2020 - 2022",
      description: "从0到1构建产品，负责前端和后端开发"
    }
  ],

  careerGoals: [
    {
      title: "技术深度",
      description: "深入研究前端工程化和性能优化",
      icon: "🚀"
    },
    {
      title: "架构能力",
      description: "提升系统设计和团队协作能力",
      icon: "🏗️"
    },
    {
      title: "职业发展",
      description: "成为高级前端工程师或技术负责人",
      icon: "🎯"
    }
  ],

  socialLinks: [
    {
      name: "GitHub",
      icon: "github",
      url: "https://github.com/garcia"
    },
    {
      name: "Blog",
      icon: "blog",
      url: "https://blog.garcia.dev"
    },
    {
      name: "Email",
      icon: "email",
      url: "mailto:garcia@example.com",
      isEmail: true
    }
  ],

  resumeUrl: "/resume.pdf"
}
