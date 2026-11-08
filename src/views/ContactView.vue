<script setup>
import PortfolioIcon from '../components/PortfolioIcon.vue'
import ProfileIllustration from '../components/ProfileIllustration.vue'
import { profile, profileContacts } from '../data/profile'
import { resumeDocument } from '../data/resume'
</script>

<template>
  <main class="web-container web-page web-contact">
    <header class="web-page-heading web-contact-heading">
      <div>
        <p class="web-kicker">CONTACT</p>
        <h1>联系我 <PortfolioIcon name="sparkle" /></h1>
        <p>期待与你交流开发经验、项目实践与合作机会。</p>
      </div>
      <img src="/assets/mobile/optimized/contact-hero.webp" alt="" width="960" height="640" fetchpriority="high" />
    </header>

    <section class="web-panel web-contact-list" aria-label="联系方式">
      <component
        :is="item.href ? 'a' : 'div'" v-for="item in profileContacts" :key="item.label" class="web-contact-row"
        :href="item.href" :target="item.external ? '_blank' : undefined" :rel="item.external ? 'noopener noreferrer' : undefined"
      >
        <ProfileIllustration :name="item.illustration" />
        <strong>{{ item.label }}</strong><span>{{ item.value }}</span>
        <PortfolioIcon v-if="item.href" :name="item.external ? 'external' : 'arrow'" />
      </component>
    </section>

    <div class="web-contact-grid">
      <section class="web-panel web-contact-panel">
        <h2>简历下载</h2>
        <a class="web-file-link" :href="resumeDocument.pdfUrl" :download="resumeDocument.fileName">
          <ProfileIllustration name="resume" />
          <span><strong>我的简历</strong><small>{{ profile.role }} · PDF</small></span>
          <PortfolioIcon name="download" />
        </a>
      </section>
      <section class="web-panel web-contact-panel">
        <h2>社交与更多</h2>
        <div class="web-contact-shortcuts">
          <a :href="`mailto:${profile.email}`"><ProfileIllustration name="mail" />邮件联系</a>
          <a :href="profile.github" target="_blank" rel="noopener noreferrer"><ProfileIllustration name="github" />GitHub</a>
          <RouterLink to="/projects"><ProfileIllustration name="projects" />查看项目</RouterLink>
        </div>
      </section>
    </div>
  </main>
</template>
