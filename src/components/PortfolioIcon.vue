<script setup>
defineProps({ name: String })
const paths = {
  forward: 'M3 12h17m-7-7 7 7-7 7',
  sparkle: 'M12 2c0 6-4 10-10 10 6 0 10 4 10 10 0-6 4-10 10-10-6 0-10-4-10-10Z',
  layers: 'm2 8 10-5 10 5-10 5-10-5Zm0 5 10 5 10-5M2 18l10 5 10-5',
  message: 'M21 11a9 9 0 0 1-9 9c-1.5 0-2.8-.3-4-.9L3 21l1.5-4.8A9 9 0 1 1 21 11ZM8 11h.1m3.9 0h.1m3.9 0h.1',
  grid: 'M3 3h7v7H3Zm11 0h7v7h-7ZM3 14h7v7H3Zm11 0h7v7h-7Z',
  star: 'm12 2 3 6.3 7 .9-5 4.9 1.2 6.9-6.2-3.3L5.8 21 7 14.1 2 9.2l7-.9Z',
  github: 'M9 19c-4.3 1.4-4.3-2.5-6-3m12 6v-3.3a2.9 2.9 0 0 0-.8-2.2c2.7-.3 5.5-1.3 5.5-6a4.6 4.6 0 0 0-1.2-3.2 4.3 4.3 0 0 0-.1-3.3s-1-.3-3.4 1.3a13.1 13.1 0 0 0-6 0C6.6 3.7 5.6 4 5.6 4a4.3 4.3 0 0 0-.1 3.3 4.6 4.6 0 0 0-1.2 3.2c0 4.7 2.8 5.7 5.5 6a2.9 2.9 0 0 0-.8 2.2V22',
  home: 'm3 10 9-7 9 7M5 9v12h5v-7h4v7h5V9',
  folder: 'M3 7V5h7l2 3h9v13H3V7Zm0 5h18',
  code: 'm7 6-6 6 6 6m10-12 6 6-6 6M14 4l-4 16',
  resume: 'M5 3h10l4 4v14H5V3Zm9 0v5h5M8 12h8m-8 4h6',
  user: 'M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM4 21v-2a8 8 0 0 1 16 0v2H4Z',
  arrow: 'm9 5 7 7-7 7',
  back: 'm15 5-7 7 7 7',
  search: 'M19 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Zm-2 6 5 6',
  download: 'M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5',
  share: 'M12 16V2m-5 5 5-5 5 5M6 10H3v12h18V10h-3',
  mail: 'M2 5h20v15H2V5Zm0 1 10 8L22 6',
  phone: 'M7 2h10v20H7V2Zm4 17h2',
  pin: 'M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Zm-5 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z',
  cloud: 'M7 18H5a4 4 0 1 1 1-8 6 6 0 0 1 12-1 4.5 4.5 0 0 1 0 9h-1M9 15l3-3 3 3m-3-3v10',
  ai: 'M9 3a3 3 0 0 0-5 3 4 4 0 0 0-1 7 4 4 0 0 0 4 6 3 3 0 0 0 5 2V4a3 3 0 0 0-3-1Zm6 0a3 3 0 0 1 5 3 4 4 0 0 1 1 7 4 4 0 0 1-4 6 3 3 0 0 1-5 2M7 8l5 3 5-3M7 15l5-2 5 2',
  database: 'M21 5c0 2-4 3-9 3S3 7 3 5s4-3 9-3 9 1 9 3Zm0 0v14c0 2-4 3-9 3s-9-1-9-3V5m0 7c0 2 4 3 9 3s9-1 9-3',
  server: 'M3 3h18v7H3V3Zm0 11h18v7H3v-7Zm4-7h.1M7 18h.1M11 7h6m-6 11h6',
  school: 'm2 8 10-5 10 5-10 5L2 8Zm4 3v8l6 3 6-3v-8m4-3v9',
  top: 'M12 21V3m-7 7 7-7 7 7',
  check: 'm5 12 4 4L19 6',
  external: 'M14 3h7v7m0-7L10 14M10 4H3v17h17v-7',
  menu: 'M3 5h18M3 12h18M3 19h18',
  close: 'm5 5 14 14M19 5 5 19',
  link: 'm10 13 4-4M8 16l-2 2a4 4 0 0 1-6-6l5-5a4 4 0 0 1 6 0m2 1 2-2a4 4 0 1 1 6 6l-5 5a4 4 0 0 1-6 0',
}
</script>

<template>
  <svg class="p-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path :d="paths[name] || paths.code" /></svg>
</template>
