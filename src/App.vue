<script setup>
import { onMounted, onUnmounted, provide, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import MobilePortfolio from './components/MobilePortfolio.vue'
import PortfolioIcon from './components/PortfolioIcon.vue'
import SiteHeader from './components/SiteHeader.vue'
import { profile } from './data/profile'

const route = useRoute()
const resumePreviewOpen = ref(false)
provide('resumePreviewOpen', resumePreviewOpen)
watch(() => route.name, (name) => {
  if (name !== 'resume') resumePreviewOpen.value = false
})

const mobileQuery = window.matchMedia('(max-width: 900px)')
const isMobile = ref(mobileQuery.matches)
const updateViewport = (event) => { isMobile.value = event.matches }
onMounted(() => mobileQuery.addEventListener('change', updateViewport))
onUnmounted(() => mobileQuery.removeEventListener('change', updateViewport))
</script>

<template>
  <MobilePortfolio v-if="isMobile" />
  <div v-else class="web-portfolio">
    <SiteHeader />
    <RouterView v-slot="{ Component, route: pageRoute }">
      <component :is="Component" :key="pageRoute.path" class="web-route" :class="{ 'portfolio-route--anchor': pageRoute.hash }" />
    </RouterView>
    <footer class="web-footer web-container">
      <RouterLink to="/" class="web-footer-brand">
        <img src="/assets/wihon-logo.webp" alt="" width="192" height="144" /> {{ profile.name }} · 个人作品集
      </RouterLink>
      <a :href="profile.github" target="_blank" rel="noopener noreferrer">GitHub <PortfolioIcon name="external" /></a>
      <RouterLink v-if="route.name !== 'contact'" to="/contact">联系我 <PortfolioIcon name="arrow" /></RouterLink>
    </footer>
  </div>
</template>
