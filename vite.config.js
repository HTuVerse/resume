import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue()],
  server: {
    host: true,
    warmup: {
      clientFiles: ['./src/App.vue', './src/views/HomeView.vue', './src/components/MobilePortfolio.vue'],
    },
  },
})
