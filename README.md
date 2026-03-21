# 个人作品导航页

> 一个高质量的前端个人作品展示网站，支持深色/浅色主题、粒子背景动画、3D卡片倾斜效果。

## 特性

- 🎨 深色/浅色主题切换（记忆用户选择）
- ✨ Canvas 粒子背景动画（支持开关）
- 🃏 3D 卡片倾斜交互效果
- 🔍 项目按技术栈筛选
- 📱 响应式设计
- ⚡ 零依赖（仅 Vue 3 + Vite）

## 技术栈

- Vue 3 (Composition API)
- TypeScript
- Vite
- Canvas API

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 自定义内容

修改 `src/config.ts` 文件即可自定义整个网站内容：

```typescript
export const siteConfig: SiteConfig = {
  // 个人简介
  hero: {
    name: "Your Name",
    title: "Frontend Developer",
    slogan: "Build elegant and efficient web experiences"
  },

  // 技术栈（按分类）
  skills: [
    { name: "Frontend", skills: ["Vue 3", "React", "TypeScript"] },
    { name: "Engineering", skills: ["Vite", "Git", "CI/CD"] },
  ],

  // 作品展示
  projects: [
    {
      name: "Project Name",
      description: "Project description",
      techStack: ["Vue 3", "TypeScript"],
      cover: "",
      link: "https://example.com"
    }
  ],

  // 职业经历
  experiences: [
    {
      company: "Company Name",
      position: "Frontend Developer",
      period: "2022 - 至今",
      description: "工作描述"
    }
  ],

  // 职业规划
  careerGoals: [
    { title: "技术深度", description: "深入研究前端技术", icon: "🚀" }
  ],

  // 联系方式
  socialLinks: [
    { name: "GitHub", icon: "github", url: "https://github.com/xxx" },
    { name: "Email", icon: "email", url: "mailto:xxx@example.com", isEmail: true }
  ],

  // 简历链接
  resumeUrl: "/resume.pdf"
}
```

## 项目结构

```
g-nav-web/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   └── main.css
│   ├── components/
│   │   ├── ParticleBackground.vue  # 粒子背景
│   │   ├── HeroSection.vue         # 首页区域
│   │   ├── SkillsSection.vue       # 技术栈
│   │   ├── ProjectsSection.vue     # 作品展示
│   │   ├── ExperienceSection.vue   # 职业经历
│   │   ├── CareerGoalsSection.vue  # 职业规划
│   │   ├── ContactSection.vue      # 联系方式
│   │   └── TopBar.vue              # 顶部导航栏
│   ├── App.vue
│   ├── config.ts                   # 配置文件
│   ├── main.ts
│   └── vite-env.d.ts
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 扩展功能

### 特效开关

点击顶部导航栏的粒子图标可以开启/关闭粒子背景效果。

### 主题切换

点击顶部导航栏的月亮/太阳图标可以切换深色/浅色主题，主题设置会保存到 localStorage。

### 项目筛选

在作品展示区域，可以按技术栈筛选项目卡片。

## 许可证

MIT
