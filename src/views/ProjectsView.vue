<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import PortfolioIcon from '../components/PortfolioIcon.vue'
import WebProjectCard from '../components/WebProjectCard.vue'
import { profile, resumeProjects } from '../data/profile'

const route = useRoute()
const searchInput = ref(null)
const query = ref('')
const category = ref('all')
const technology = ref('')
const categories = [
  { id: 'all', label: '全部项目', icon: 'grid' },
  { id: 'core', label: '核心项目', icon: 'star' },
  { id: 'java', label: 'Java 后端', icon: 'code' },
  { id: 'cloud', label: '微服务', icon: 'cloud' },
  { id: 'ai', label: 'AI 应用', icon: 'ai' },
].map(item => ({
  ...item,
  count: resumeProjects.filter(project => item.id === 'all' || project.filters.includes(item.id)).length,
}))
const technologies = ['Spring Boot', 'Spring Cloud', 'Spring AI', 'Redis', 'Docker', 'pgvector']
const projects = computed(() => {
  const keyword = query.value.trim().toLowerCase()

  return resumeProjects.filter(project =>
    (category.value === 'all' || project.filters.includes(category.value)) &&
    (!technology.value || project.allTags.includes(technology.value)) &&
    [project.fullTitle, project.description, ...project.allTags].join(' ').toLowerCase().includes(keyword))
})

watch(() => route.hash, async (hash) => {
  if (hash === '#project-search') {
    await nextTick()
    searchInput.value?.focus({ preventScroll: true })
  }
}, { immediate: true })

function resetFilters() {
  category.value = 'all'
  technology.value = ''
  query.value = ''
}
</script>

<template>
  <main class="web-container web-page">
    <header class="web-page-heading">
      <p class="web-kicker">PROJECTS</p>
      <h1>项目导航 <PortfolioIcon name="sparkle" /></h1>
      <p>查看我在微服务、企业级 SaaS 与 AI 应用开发中的项目实践。</p>
    </header>

    <div class="web-project-layout">
      <aside class="web-panel web-project-sidebar" aria-labelledby="project-category-title">
        <h2 id="project-category-title">项目分类</h2>
        <button
          v-for="item in categories" :key="item.id" type="button" class="web-category"
          :aria-pressed="category === item.id" @click="category = item.id"
        >
          <PortfolioIcon :name="item.icon" /><span>{{ item.label }}</span><small>{{ item.count }}</small>
        </button>
        <a :href="profile.github" class="web-sidebar-link" target="_blank" rel="noopener noreferrer">
          <PortfolioIcon name="external" /> 我的 GitHub
        </a>
      </aside>

      <section class="web-project-results" aria-labelledby="project-result-title">
        <div class="web-panel web-project-toolbar">
          <div class="web-tech-filters" aria-label="按技术栈筛选">
            <button type="button" :aria-pressed="!technology" @click="technology = ''">全部技术</button>
            <button
              v-for="tag in technologies" :key="tag" type="button" :aria-pressed="technology === tag"
              @click="technology = technology === tag ? '' : tag"
            >{{ tag }}</button>
          </div>
          <label class="web-search">
            <PortfolioIcon name="search" />
            <input id="project-search" ref="searchInput" v-model="query" type="search" aria-label="搜索项目" placeholder="搜索项目或技术" />
          </label>
        </div>
        <h2 id="project-result-title" class="web-result-count" aria-live="polite">共 {{ projects.length }} 个项目</h2>
        <TransitionGroup name="portfolio-result" tag="div" class="web-project-list">
          <WebProjectCard v-for="project in projects" :key="project.id" :project="project" />
          <div v-if="!projects.length" key="empty" class="web-panel web-empty">
            <span class="web-symbol"><PortfolioIcon name="search" /></span>
            <h3>没有找到匹配的项目</h3>
            <p>试试其他关键词，或清除当前筛选条件。</p>
            <button type="button" class="web-button" @click="resetFilters">查看全部项目</button>
          </div>
        </TransitionGroup>
      </section>
    </div>
  </main>
</template>
