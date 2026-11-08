<script setup>
import PortfolioIcon from '../components/PortfolioIcon.vue'
import TechnologyIcon from '../components/TechnologyIcon.vue'
import { skillGroups, technologies } from '../data/profile'
</script>

<template>
  <main class="web-container web-page">
    <header class="web-page-heading">
      <p class="web-kicker">TECH STACK</p>
      <h1>技术栈 <PortfolioIcon name="sparkle" /></h1>
      <p>围绕 Java 后端、数据服务与 AI 应用构建技术能力。</p>
    </header>
    <section class="web-tech-grid" aria-label="技术栈总览">
      <article v-for="item in technologies" :key="item.name" class="web-panel web-tech-tile">
        <TechnologyIcon :src="item.image" :label="item.name" :has-embedded-label="item.hasEmbeddedLabel" />
        <h2>{{ item.name }}</h2>
      </article>
    </section>
    <section class="web-skill-section" aria-labelledby="web-skills-title">
      <h2 id="web-skills-title">能力分组</h2>
      <div class="web-skill-grid">
        <article v-for="group in skillGroups" :key="group.title" class="web-panel web-skill-card">
          <TechnologyIcon :src="group.image" />
          <div><h3>{{ group.title }}</h3><p>{{ group.description }}</p></div>
        </article>
      </div>
    </section>
  </main>
</template>
