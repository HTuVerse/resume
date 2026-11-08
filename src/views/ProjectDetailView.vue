<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import PortfolioIcon from '../components/PortfolioIcon.vue'
import { resumeProjects } from '../data/profile'

const route = useRoute()
const project = computed(() => resumeProjects.find(item => item.id === route.params.id))
const shareStatus = ref('')

watch(project, () => { shareStatus.value = '' })

async function shareProject() {
  const currentProject = project.value
  const data = { title: currentProject.title, url: window.location.href }
  try {
    if (navigator.share) {
      await navigator.share(data)
      return
    }
    await navigator.clipboard.writeText(data.url)
    if (project.value === currentProject) shareStatus.value = '已复制项目链接'
  } catch (error) {
    if (error.name !== 'AbortError' && project.value === currentProject) {
      shareStatus.value = '请从地址栏复制项目链接'
    }
  }
}
</script>

<template>
  <main class="web-container web-page">
    <nav class="web-breadcrumb" aria-label="当前位置">
      <RouterLink to="/projects"><PortfolioIcon name="back" /> 项目导航</RouterLink>
      <PortfolioIcon name="arrow" />
      <span aria-current="page">项目详情</span>
    </nav>
    <div v-if="project" class="web-detail-layout">
      <figure class="web-panel web-detail-figure">
        <div class="web-project-cover" :class="`web-project-cover--${project.id}`">
          <img :src="project.image" :alt="`${project.shortName} 项目主题插图`" width="960" height="720" fetchpriority="high" />
        </div>
        <figcaption><PortfolioIcon name="folder" /> {{ project.shortName }} · 项目插图</figcaption>
      </figure>

      <article class="web-detail-copy">
        <p class="web-kicker">{{ project.badge }}</p>
        <h1>{{ project.title }}</h1>
        <p class="web-detail-summary">{{ project.description }}</p>
        <ul class="web-tags" aria-label="项目技术栈"><li v-for="tag in project.allTags" :key="tag">{{ tag }}</li></ul>

        <section class="web-detail-highlights" aria-labelledby="project-highlights-title">
          <h2 id="project-highlights-title">项目亮点 <PortfolioIcon name="sparkle" /></h2>
          <ul>
            <li v-for="item in project.highlights" :key="item.title">
              <span class="web-check"><PortfolioIcon name="check" /></span>
              <div><h3>{{ item.title }}</h3><p>{{ item.description }}</p></div>
            </li>
          </ul>
        </section>
      </article>

      <aside class="web-detail-aside" aria-labelledby="project-info-title">
        <div class="web-panel web-detail-info">
          <h2 id="project-info-title">项目信息</h2>
          <dl>
            <div><PortfolioIcon name="code" /><div><dt>开发语言</dt><dd>{{ project.allTags[0] }}</dd></div></div>
            <div><PortfolioIcon name="layers" /><div><dt>项目类型</dt><dd>{{ project.categoryLabel }}</dd></div></div>
            <div><PortfolioIcon name="user" /><div><dt>开发方式</dt><dd>{{ project.note }}</dd></div></div>
          </dl>
        </div>
        <a class="web-button web-button--primary" :href="project.repo" target="_blank" rel="noopener noreferrer">
          <PortfolioIcon name="external" /> 查看 GitHub 仓库
        </a>
        <button type="button" class="web-button" @click="shareProject"><PortfolioIcon name="share" /> 分享项目</button>
        <p v-if="shareStatus" class="web-share-status" role="status">{{ shareStatus }}</p>
      </aside>
    </div>
    <div v-else class="web-panel web-empty">
      <h1>暂未找到这个项目</h1>
      <RouterLink class="web-button web-button--primary" to="/projects">返回项目导航</RouterLink>
    </div>
  </main>
</template>
