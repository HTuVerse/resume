<script setup>
import { useRoute } from 'vue-router'
import { profile } from '../data/profile'
import PortfolioIcon from './PortfolioIcon.vue'

const route = useRoute()
const navigation = [
  { name: 'home', label: '首页', icon: 'home' },
  { name: 'projects', label: '项目', icon: 'folder' },
  { name: 'tech-stack', label: '技术栈', icon: 'layers' },
  { name: 'resume', label: '简历', icon: 'resume' },
  { name: 'contact', label: '联系我', icon: 'message' },
]

function isActive(name) {
  return route.name === name || (name === 'projects' && route.name === 'project-detail')
}

function focusCurrentSearch() {
  if (route.name === 'projects') document.getElementById('project-search')?.focus()
}
</script>

<template>
  <header class="web-header">
    <div class="web-header-inner web-container">
      <RouterLink class="web-brand" to="/" aria-label="刘伟鸿的个人主页">
        <img class="web-brand-mark" src="/assets/wihon-logo.webp" alt="" width="192" height="144" />
        <span><strong>{{ profile.name }}</strong><small>个人导航 / 作品集</small></span>
      </RouterLink>

      <nav class="web-nav" aria-label="主导航">
        <RouterLink
          v-for="item in navigation" :key="item.name" :to="{ name: item.name }"
          :class="{ 'is-active': isActive(item.name) }"
        >
          <PortfolioIcon :name="item.icon" />{{ item.label }}
        </RouterLink>
      </nav>

      <div class="web-header-actions">
        <RouterLink
          class="web-icon-button" :to="{ name: 'projects', hash: '#project-search' }"
          aria-label="搜索项目" title="搜索项目" @click="focusCurrentSearch"
        >
          <PortfolioIcon name="search" />
        </RouterLink>
        <RouterLink class="web-button web-button--primary web-header-cta" :to="{ name: 'home', hash: '#navigation' }">
          进入导航 <PortfolioIcon name="forward" />
        </RouterLink>
      </div>
    </div>
  </header>
</template>
