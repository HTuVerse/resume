<script setup>
import { computed, defineAsyncComponent, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { homeHero, profile, profileContacts, resumeProjects, skillGroups, technologies } from '../data/profile'
import { resumeDocument } from '../data/resume'
import PortfolioIcon from './PortfolioIcon.vue'
import '../styles/mobile.css'

const ProfileIllustration = defineAsyncComponent(() => import('./ProfileIllustration.vue'))
const ResumePreview = defineAsyncComponent(() => import('./ResumePreview.vue'))
const TechnologyIcon = defineAsyncComponent(() => import('./TechnologyIcon.vue'))

const route = useRoute()
const router = useRouter()
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
const menuOpen = ref(false)
const siteHeader = ref(null)
const headerHidden = ref(false)
const searchOpen = ref(false)
const searchInput = ref(null)
const query = ref('')
const activeFilter = ref('all')
const toast = ref('')
const detailDirection = ref(0)
const headerScrollThreshold = 12
let headerScrollEdge = 0
let toastTimer
const tabs = [
  { to: '/', label: '首页', icon: 'home' },
  { to: '/projects', label: '项目导航', icon: 'folder' },
  { to: '/tech-stack', label: '技术栈', icon: 'code' },
  { to: '/resume', label: '简历', icon: 'resume' },
  { to: '/contact', label: '联系我', icon: 'user' },
]
const filters = [
  { id: 'all', label: '全部项目' }, { id: 'core', label: '核心项目' },
  { id: 'java', label: 'Java 后端' }, { id: 'cloud', label: '微服务' }, { id: 'ai', label: 'AI 应用' },
]
const shortcuts = [
  { to: '/projects', title: '项目导航', description: '浏览我的项目作品', image: '/assets/mobile/optimized/location.webp' },
  { to: '/tech-stack', title: '技术栈', description: '我的技术能力图谱', image: '/assets/mobile/optimized/code-stack.webp' },
  { to: '/resume', title: '简历', description: '查看我的完整简历', image: '/assets/mobile/optimized/id-photo.webp' },
  { to: '/contact', title: '联系我', description: '合作与交流', image: '/assets/mobile/optimized/contact-chat.webp' },
]
const projects = computed(() => {
  const value = query.value.trim().toLowerCase()
  return resumeProjects.filter(project =>
    (activeFilter.value === 'all' || project.filters.includes(activeFilter.value)) &&
    (!value || [project.title, project.description, ...project.allTags].join(' ').toLowerCase().includes(value)))
})
const project = computed(() => resumeProjects.find(item => item.id === route.params.id))
const isDetail = computed(() => route.name === 'project-detail')
const isActive = to => to === '/' ? route.path === '/' : route.path.startsWith(to)
const activeTabIndex = computed(() => tabs.findIndex(tab => isActive(tab.to)))
const hasSiteHeader = computed(() => Boolean(route.name) && !isDetail.value)

watch([() => route.path, () => route.name], ([, name], [, previousName]) => {
  headerHidden.value = false
  headerScrollEdge = window.scrollY
  if (previousName === 'projects' && name === 'project-detail') detailDirection.value = 1
  else if (previousName === 'project-detail' && name === 'projects') detailDirection.value = -1
  else detailDirection.value = 0
})
watch(() => route.fullPath, () => { menuOpen.value = false; toast.value = '' })
watch(() => route.hash, (hash) => {
  if (route.name === 'projects' && hash === '#project-search') searchOpen.value = true
}, { immediate: true })
onMounted(() => window.addEventListener('scroll', updateHeaderOnScroll, { passive: true }))
onUnmounted(() => {
  window.removeEventListener('scroll', updateHeaderOnScroll)
  clearTimeout(toastTimer)
})

function updateHeaderOnScroll() {
  const header = siteHeader.value
  if (!header || route.name === 'home') return

  const page = document.scrollingElement
  const maxScroll = Math.max(0, page.scrollHeight - page.clientHeight)
  const scrollY = Math.min(maxScroll, Math.max(0, window.scrollY))
  const focused = document.activeElement
  if (scrollY <= 1 || (header.contains(focused) && focused.matches(':focus-visible'))) {
    headerHidden.value = false
    headerScrollEdge = scrollY
    return
  }

  if (headerHidden.value) {
    headerScrollEdge = Math.max(headerScrollEdge, scrollY)
    if (headerScrollEdge - scrollY < headerScrollThreshold) return
    headerHidden.value = false
  } else {
    headerScrollEdge = Math.min(headerScrollEdge, scrollY)
    const hideStart = Math.min(header.offsetHeight, maxScroll)
    if (scrollY < hideStart - 1 || scrollY - headerScrollEdge < headerScrollThreshold) return
    menuOpen.value = false
    headerHidden.value = true
  }
  headerScrollEdge = scrollY
}

function notify(message) {
  toast.value = message
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => { toast.value = '' }, 2800)
}
async function toggleSearch() {
  searchOpen.value = !searchOpen.value
  if (searchOpen.value) { await nextTick(); searchInput.value?.focus() }
  else query.value = ''
}
async function shareProject() {
  try {
    const data = { title: project.value.title, url: window.location.href }
    if (navigator.share) await navigator.share(data)
    else if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(data.url)
      notify('项目链接已复制')
    } else notify('请通过浏览器地址栏复制项目链接')
  } catch (error) {
    if (error.name !== 'AbortError') notify('暂时无法分享，请复制浏览器地址栏链接')
  }
}
function backToProjects() { router.push('/projects') }
function scrollBehavior() { return reducedMotion.matches ? 'auto' : 'smooth' }
function scrollTop() { window.scrollTo({ top: 0, behavior: scrollBehavior() }) }
</script>

<template>
  <div
    class="mobile-portfolio"
    :class="[`mobile-portfolio--${route.name}`, { 'mobile-portfolio--detail': isDetail, 'portfolio-route--anchor': route.hash }]"
    :style="{ '--m-detail-direction': detailDirection }"
  >
    <header
      v-if="hasSiteHeader"
      ref="siteHeader"
      class="m-site-header"
      :class="{ 'm-site-header--hidden': headerHidden }"
      :inert="headerHidden"
    >
      <RouterLink class="m-brand" to="/" aria-label="刘伟鸿的个人主页">
        <img src="/assets/wihon-logo.webp" alt="" width="192" height="144" />
        <strong>{{ profile.name }}</strong>
      </RouterLink>
      <div class="m-header-actions">
        <RouterLink class="m-navigation-pill" :to="{ name: 'home', hash: '#navigation' }" @click="menuOpen = false">进入导航 <PortfolioIcon name="arrow" /></RouterLink>
        <button class="m-icon-button" type="button" :aria-expanded="menuOpen" aria-controls="mobile-menu" aria-label="切换导航菜单" @click="menuOpen = !menuOpen"><PortfolioIcon :name="menuOpen ? 'close' : 'menu'" /></button>
      </div>
      <Transition name="m-menu">
        <nav v-show="menuOpen" id="mobile-menu" class="m-menu" aria-label="快捷导航" :inert="!menuOpen"><RouterLink v-for="tab in tabs" :key="tab.to" :to="tab.to" @click="menuOpen = false"><PortfolioIcon :name="tab.icon" />{{ tab.label }}</RouterLink></nav>
      </Transition>
    </header>

    <main v-if="route.name === 'home'" class="m-home">
      <section class="m-home-hero" aria-labelledby="home-title">
        <div class="m-home-copy">
          <h1 id="home-title">你好，我是<span>{{ profile.name }}</span></h1>
          <h2>Java 后端开发 <em>/</em> AI 应用开发</h2>
          <p>软件工程本科生，专注 Spring Boot、<br />Spring Cloud 与 Spring AI。<br />用技术连接业务，用代码创造价值。</p>
        </div>
        <img class="m-home-art" v-bind="homeHero" fetchpriority="high" />
      </section>
      <div class="m-home-actions">
        <RouterLink class="m-button m-button--primary" to="/projects">查看我的项目 <PortfolioIcon name="arrow" /></RouterLink>
        <a class="m-button" :href="resumeDocument.pdfUrl" :download="resumeDocument.fileName"><PortfolioIcon name="download" />下载简历</a>
      </div>
      <section id="navigation" class="m-shortcuts" aria-label="个人主页导航">
        <RouterLink v-for="item in shortcuts" :key="item.to" :to="item.to"><img :src="item.image" alt="" /><span><strong>{{ item.title }}</strong><small>{{ item.description }}</small></span></RouterLink>
      </section>
      <div class="m-home-note"><PortfolioIcon name="code" /><span>微服务架构</span><i></i><span>企业级 SaaS</span><i></i><span>AI 应用开发</span></div>
    </main>

    <main v-else-if="route.name === 'projects'" class="m-page m-projects">
      <header class="m-page-heading m-projects-heading"><div><h1>项目导航 <i class="m-sparkle"></i></h1><p>查看我的项目作品、技术实践与仓库入口</p></div><button class="m-icon-button" type="button" aria-label="搜索项目" :aria-expanded="searchOpen" aria-controls="project-search" @click="toggleSearch"><PortfolioIcon :name="searchOpen ? 'close' : 'search'" /></button></header>
      <Transition name="m-search">
        <label v-if="searchOpen" id="project-search" class="m-search"><PortfolioIcon name="search" /><input ref="searchInput" v-model="query" type="search" placeholder="搜索项目、技术栈或关键词" aria-label="搜索项目、技术栈或关键词" /></label>
      </Transition>
      <section class="m-filters" aria-label="项目分类"><button v-for="filter in filters" :key="filter.id" type="button" :aria-pressed="activeFilter === filter.id" :class="{ active: activeFilter === filter.id }" @click="activeFilter = filter.id">{{ filter.label }}</button></section>
      <TransitionGroup name="portfolio-result" tag="section" class="m-project-list" aria-label="项目列表" aria-live="polite">
        <RouterLink v-for="item in projects" :key="item.id" :to="item.detailTo" class="m-project-card">
          <div class="m-project-card-copy"><h2>{{ item.title }}</h2><span class="m-outline-badge">{{ item.note }}</span><p>{{ item.description }}</p><div class="m-tags"><span v-for="tag in item.tags.slice(0, 4)" :key="tag">{{ tag }}</span></div><div class="m-project-status"><span><i></i>{{ item.categoryLabel }}</span><PortfolioIcon name="arrow" /></div></div>
          <img :src="item.mobileImage" :alt="`${item.shortName} 项目插图`" />
        </RouterLink>
        <div v-if="!projects.length" key="empty" class="m-empty"><PortfolioIcon name="search" /><h2>没有找到相关项目</h2><p>试试其他关键词或分类</p><button class="m-button" type="button" @click="query = ''; activeFilter = 'all'">查看全部项目</button></div>
      </TransitionGroup>
      <a class="m-repository-card" :href="profile.github" target="_blank" rel="noopener noreferrer"><div><h2>我的代码仓库 <PortfolioIcon name="external" /></h2><p>从想法到实现，记录每一次技术实践</p><div class="m-tags"><span>GitHub</span><span>Java</span><span>开源代码</span></div></div><img src="/assets/mobile/optimized/code.webp" alt="" loading="lazy" /></a>
      <p class="m-page-footnote">用技术解决真实问题，在实践中持续成长</p>
    </main>

    <main v-else-if="isDetail && project" :key="project.id" class="m-page m-detail">
      <header class="m-detail-header"><button class="m-icon-button" type="button" aria-label="返回项目导航" @click="backToProjects"><PortfolioIcon name="back" /></button><h1>项目详情</h1><button class="m-icon-button" type="button" aria-label="分享项目" @click="shareProject"><PortfolioIcon name="share" /></button></header>
      <div class="m-detail-art" :class="`m-detail-art--${project.id}`"><img :src="project.mobileImage" :alt="`${project.shortName} 项目插图`" fetchpriority="high" /></div>
      <section class="m-detail-copy"><div class="m-detail-title"><h2>{{ project.title }}</h2><span class="m-outline-badge">{{ project.note }}</span></div><p>{{ project.description }}</p><div class="m-tags m-tags--detail"><span v-for="tag in project.allTags" :key="tag">{{ tag }}</span></div></section>
      <section class="m-detail-meta" aria-label="项目信息"><div><PortfolioIcon name="code" /><span><strong>开发语言</strong><small>{{ project.allTags[0] }}</small></span></div><div><PortfolioIcon name="folder" /><span><strong>项目类型</strong><small>{{ project.id === 'liteshop' ? '企业级 SaaS' : 'AI Agent' }}</small></span></div><div><PortfolioIcon name="user" /><span><strong>开发方式</strong><small>{{ project.note }}</small></span></div></section>
      <section class="m-highlights"><h2>项目亮点</h2><ul><li v-for="item in project.highlights" :key="item.title"><span class="m-check"><PortfolioIcon name="check" /></span><span><strong>{{ item.title }}：</strong>{{ item.description }}</span></li></ul></section>
      <div class="m-detail-actions"><a class="m-button" :href="project.repo" target="_blank" rel="noopener noreferrer"><img src="/assets/mobile/optimized/github.webp" alt="" />查看仓库</a><RouterLink class="m-button m-button--primary" to="/resume"><PortfolioIcon name="resume" />查看简历</RouterLink></div>
    </main>

    <main v-else-if="isDetail" class="m-page"><div class="m-empty"><h1>暂未找到这个项目</h1><RouterLink class="m-button m-button--primary" to="/projects">返回项目导航</RouterLink></div></main>

    <main v-else-if="route.name === 'tech-stack'" class="m-page m-tech">
      <header class="m-page-heading"><div><h1>技术栈 <i class="m-sparkle"></i></h1><p>持续学习，构建更好的技术能力</p></div></header>
      <section class="m-tech-overview">
        <h2 class="m-section-title">技术栈总览</h2>
        <div class="m-tech-grid">
          <article v-for="item in technologies" :key="item.name">
            <TechnologyIcon :src="item.image" :label="item.name" :has-embedded-label="item.hasEmbeddedLabel" />
            <h3>{{ item.name }}</h3>
          </article>
        </div>
      </section>
      <section class="m-skill-groups">
        <h2 class="m-section-title">能力分组</h2>
        <article v-for="group in skillGroups" :key="group.title">
          <TechnologyIcon :src="group.image" />
          <div><h3>{{ group.title }}</h3><p>{{ group.description }}</p></div>
        </article>
      </section>
      <p class="m-page-footnote">让每一项技术，都在真实项目中落地</p>
    </main>

    <main v-else-if="route.name === 'contact'" class="m-page m-contact">
      <header class="m-page-heading m-contact-heading"><div><h1>联系我 <i class="m-sparkle"></i></h1><p>期待与你的交流与合作</p></div><img src="/assets/mobile/optimized/contact-hero.webp" alt="挥手问候的开发者" fetchpriority="high" /></header>
      <section class="m-contact-section">
        <h2 class="m-section-title">联系方式</h2>
        <div class="m-contact-list">
          <component
            :is="item.href ? 'a' : 'div'" v-for="item in profileContacts" :key="item.label"
            :href="item.href" :target="item.external ? '_blank' : undefined" :rel="item.external ? 'noopener noreferrer' : undefined"
          >
            <ProfileIllustration :name="item.illustration" />
            <span><strong>{{ item.label }}</strong><small>{{ item.value }}</small></span>
            <PortfolioIcon v-if="item.href" name="arrow" />
          </component>
        </div>
      </section>
      <section class="m-contact-section m-download-section">
        <h2 class="m-section-title">简历与更多</h2>
        <a class="m-download-card" :href="resumeDocument.pdfUrl" :download="resumeDocument.fileName">
          <ProfileIllustration name="resume" />
          <span><strong>我的简历</strong><small>{{ profile.role }}简历.pdf</small></span>
          <PortfolioIcon name="download" />
        </a>
      </section>
      <section class="m-social-section">
        <h2 class="m-section-title">社交与联系</h2>
        <div>
          <a :href="`tel:${profile.phone}`"><ProfileIllustration name="phone" /><small>电话联系</small></a>
          <a :href="`mailto:${profile.email}`"><ProfileIllustration name="mail" /><small>邮件联系</small></a>
          <a :href="profile.github" target="_blank" rel="noopener noreferrer"><ProfileIllustration name="github" /><small>GitHub</small></a>
          <button type="button" @click="scrollTop"><ProfileIllustration name="top" /><small>顶部</small></button>
        </div>
      </section>
    </main>

    <main v-else-if="route.name === 'resume'" class="m-page m-resume">
      <header class="m-page-heading"><div><h1>我的简历 <i class="m-sparkle"></i></h1><p>{{ profile.name }} · {{ profile.role }}</p></div></header>
      <section class="m-resume-intro">
        <img src="/assets/wihon-logo.webp" alt="" width="192" height="144" />
        <div><h2>{{ profile.name }}</h2><p>{{ profile.role }}</p><span>微服务 · 企业级 SaaS · AI 应用</span></div>
      </section>
      <a class="m-button m-button--primary m-resume-download" :href="resumeDocument.pdfUrl" :download="resumeDocument.fileName"><PortfolioIcon name="download" />下载完整简历 PDF</a>
      <section class="m-resume-info">
        <h2 class="m-section-title">教育背景</h2>
        <div><ProfileIllustration name="school" /><div><strong>{{ profile.school }}</strong><p>{{ profile.major }} · {{ profile.educationPeriod }}</p><small>{{ profile.grade }}</small></div></div>
      </section>
      <section class="m-resume-info">
        <h2 class="m-section-title">实习经历</h2>
        <div>
          <ProfileIllustration name="resume" />
          <div>
            <strong>{{ profile.internship.employer }}</strong>
            <p>{{ profile.internship.role }} · {{ profile.internship.period }}</p>
            <small>{{ profile.internship.summary }}</small>
          </div>
        </div>
      </section>
      <section class="m-certificates">
        <h2 class="m-section-title"><ProfileIllustration name="honors" />荣誉证书</h2>
        <p v-for="certificate in profile.certificates" :key="certificate"><ProfileIllustration name="verified" />{{ certificate }}</p>
      </section>
      <ResumePreview class="m-resume-preview" />
    </main>

    <nav class="m-tabbar" aria-label="移动端主导航">
      <RouterLink v-for="tab in tabs" :key="tab.to" :to="tab.to" :class="{ active: isActive(tab.to) }" :aria-current="isActive(tab.to) ? 'page' : undefined"><PortfolioIcon :name="tab.icon" /><span>{{ tab.label }}</span></RouterLink>
      <span v-if="route.name && activeTabIndex >= 0" class="m-tab-indicator" aria-hidden="true" :style="{ '--m-tab-index': activeTabIndex }"></span>
    </nav>
    <Transition name="m-toast"><div v-if="toast" class="m-toast-message" role="status">{{ toast }}</div></Transition>
  </div>
</template>
