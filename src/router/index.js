import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: '刘伟鸿｜Java Developer' },
  },
  {
    path: '/resume',
    name: 'resume',
    component: () => import('../views/ResumeView.vue'),
    meta: { title: '个人简历｜刘伟鸿' },
  },
  {
    path: '/projects',
    name: 'projects',
    component: () => import('../views/ProjectsView.vue'),
    meta: { title: '项目作品｜刘伟鸿' },
  },
  {
    path: '/projects/:id',
    name: 'project-detail',
    component: () => import('../views/ProjectDetailView.vue'),
    meta: { title: '项目详情｜刘伟鸿' },
  },
  {
    path: '/tech-stack',
    name: 'tech-stack',
    component: () => import('../views/TechStackView.vue'),
    meta: { title: '技术栈｜刘伟鸿' },
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/ContactView.vue'),
    meta: { title: '联系我｜刘伟鸿' },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const header = document.querySelector('.web-header, .m-site-header')
      const stickyHeight = header && getComputedStyle(header).position === 'sticky' ? header.offsetHeight : 0
      const top = stickyHeight + 12
      return { el: to.hash, top, behavior: reduceMotion ? 'auto' : 'smooth' }
    }

    return { top: 0 }
  },
})

router.afterEach((to) => {
  document.title = to.meta.title || '刘伟鸿｜Java Developer'
})

export default router
