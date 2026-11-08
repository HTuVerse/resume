<script setup>
import PortfolioIcon from '../components/PortfolioIcon.vue'
import WebProjectCard from '../components/WebProjectCard.vue'
import { homeHero, profile, resumeProjects } from '../data/profile'
import { resumeDocument } from '../data/resume'

const baseUrl = import.meta.env.BASE_URL
const shortcuts = [
  { to: '/projects', title: '项目导航', description: '浏览我的项目作品', image: 'location', color: 'mint' },
  { to: '/tech-stack', title: '技术栈', description: '了解我的技术能力', image: 'code-stack', color: 'violet' },
  { to: '/resume', title: '个人简历', description: '查看教育与项目经历', image: 'id-photo', color: 'sky' },
  { to: '/contact', title: '联系我', description: '合作与交流', image: 'contact-chat', color: 'blue' },
]
</script>

<template>
  <main class="web-container web-home">
    <section id="about" class="web-hero" aria-labelledby="web-home-title">
      <div class="web-hero-copy">
        <p class="web-hero-eyebrow"><PortfolioIcon name="sparkle" /> 个人作品集 <span></span> DEVELOPER PORTFOLIO</p>
        <h1 id="web-home-title">你好，我是<span>{{ profile.name }}</span></h1>
        <p class="web-hero-role">{{ profile.role }}</p>
        <p class="web-hero-intro">软件工程本科生，专注微服务、企业级 SaaS 与 AI 应用开发。在 LiteShop 和 FlowAgent 中实践 Spring Cloud、Spring AI 与分布式系统设计。</p>

        <div class="web-actions">
          <RouterLink class="web-button web-button--primary" to="/projects"><PortfolioIcon name="code" /> 查看我的项目</RouterLink>
          <a class="web-button" :href="resumeDocument.pdfUrl" :download="resumeDocument.fileName"><PortfolioIcon name="download" /> 下载简历</a>
        </div>
        <p class="web-hero-school"><PortfolioIcon name="school" /> {{ profile.school }} · {{ profile.major }}</p>
      </div>
      <div class="web-hero-art">
        <img v-bind="homeHero" fetchpriority="high" />
      </div>
      <span class="web-hero-index" aria-hidden="true">JAVA / CLOUD / AI</span>
    </section>

    <nav id="navigation" class="web-shortcuts" aria-label="作品集导航">
      <RouterLink v-for="item in shortcuts" :key="item.to" :to="item.to" class="web-panel web-shortcut">
        <span class="web-shortcut-icon" :class="`web-shortcut-icon--${item.color}`">
          <img :src="`${baseUrl}assets/mobile/optimized/${item.image}.webp`" alt="" />
        </span>
        <span class="web-shortcut-copy"><strong>{{ item.title }}</strong><small>{{ item.description }}</small></span>
        <PortfolioIcon name="arrow" />
      </RouterLink>
    </nav>

    <section class="web-home-projects" aria-labelledby="web-featured-title">
      <div class="web-section-top">
        <div>
          <p class="web-kicker">SELECTED PROJECTS</p>
          <h2 id="web-featured-title">精选项目 <PortfolioIcon name="sparkle" /></h2>
        </div>
        <RouterLink to="/projects" class="web-text-link">查看全部 <PortfolioIcon name="forward" /></RouterLink>
      </div>
      <div class="web-featured-grid">
        <WebProjectCard v-for="project in resumeProjects" :key="project.id" :project="project" />
      </div>
    </section>
  </main>
</template>
