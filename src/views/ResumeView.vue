<script setup>
import PortfolioIcon from '../components/PortfolioIcon.vue'
import ProfileIllustration from '../components/ProfileIllustration.vue'
import ResumePreview from '../components/ResumePreview.vue'
import { profile, resumeProjects } from '../data/profile'
import { resumeDocument } from '../data/resume'
</script>

<template>
  <main class="web-container web-page">
    <header class="web-page-heading web-page-heading--split">
      <div>
        <p class="web-kicker">RESUME</p>
        <h1>个人简历 <PortfolioIcon name="sparkle" /></h1>
        <p>{{ profile.name }} · {{ profile.role }}</p>
      </div>
      <a class="web-button web-button--primary" :href="resumeDocument.pdfUrl" :download="resumeDocument.fileName">
        <PortfolioIcon name="download" /> 下载简历 PDF
      </a>
    </header>

    <div class="web-resume-layout">
      <aside class="web-resume-sidebar" aria-label="简历摘要">
        <section class="web-panel web-resume-card">
          <h2><ProfileIllustration name="school" />教育背景</h2>
          <strong>{{ profile.school }}</strong>
          <p>{{ profile.major }} · {{ profile.educationPeriod }}</p>
          <p>{{ profile.grade }}</p>
        </section>
        <section class="web-panel web-resume-card">
          <h2><ProfileIllustration name="resume" />实习经历</h2>
          <strong>{{ profile.internship.employer }}</strong>
          <p>{{ profile.internship.role }} · {{ profile.internship.period }}</p>
          <p>{{ profile.internship.summary }}</p>
        </section>
        <section class="web-panel web-resume-card">
          <h2><ProfileIllustration name="honors" />荣誉证书</h2>
          <ul class="web-resume-checks">
            <li v-for="certificate in profile.certificates" :key="certificate"><ProfileIllustration name="verified" />{{ certificate }}</li>
          </ul>
        </section>
        <section class="web-panel web-resume-card">
          <h2><ProfileIllustration name="projects" />项目经历</h2>
          <ul class="web-resume-links">
            <li v-for="project in resumeProjects" :key="project.id">
              <RouterLink :to="project.detailTo">{{ project.title }} <PortfolioIcon name="arrow" /></RouterLink>
            </li>
          </ul>
        </section>
      </aside>

      <ResumePreview class="web-panel web-resume-preview" />
    </div>
  </main>
</template>
