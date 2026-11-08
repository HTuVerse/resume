<script setup>
import PortfolioIcon from './PortfolioIcon.vue'

defineProps({ project: { type: Object, required: true } })
</script>

<template>
  <article class="web-panel web-project-card">
    <div class="web-project-cover" :class="`web-project-cover--${project.id}`">
      <img :src="project.image" alt="" loading="lazy" width="960" height="720" />
    </div>
    <div class="web-project-copy">
      <p class="web-project-category">{{ project.badge }} <span>{{ project.categoryLabel }}</span></p>
      <h3><RouterLink class="web-project-title" :to="project.detailTo">{{ project.title }}</RouterLink></h3>
      <p class="web-project-description">{{ project.description }}</p>
      <ul class="web-tags" aria-label="项目技术栈">
        <li v-for="tag in project.tags.slice(0, 4)" :key="tag">{{ tag }}</li>
      </ul>
    </div>
    <span class="web-project-arrow" aria-hidden="true"><PortfolioIcon name="arrow" /></span>
  </article>
</template>
