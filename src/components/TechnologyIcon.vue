<script setup>
defineProps({
  src: { type: String, required: true },
  label: String,
  hasEmbeddedLabel: Boolean,
})
</script>

<template>
  <span
    class="technology-icon"
    :class="{ 'technology-icon--framed': !hasEmbeddedLabel, 'technology-icon--captioned': label && !hasEmbeddedLabel }"
    aria-hidden="true"
  >
    <img :src="src" alt="" width="256" height="256" />
    <span v-if="label && !hasEmbeddedLabel" class="technology-icon-caption">{{ label }}</span>
  </span>
</template>

<style scoped>
.technology-icon {
  position: relative;
  display: grid;
  width: var(--technology-icon-size, 76px);
  aspect-ratio: 1;
  flex: 0 0 auto;
  place-items: center;
}

.technology-icon img { position: relative; display: block; width: 100%; height: 100%; object-fit: contain; }

.technology-icon--framed::before {
  position: absolute;
  inset: 8%;
  border: 1px solid #9bcdf8;
  border-radius: 21%;
  background:
    radial-gradient(ellipse at 12% 102%, #e2effe 0 38%, transparent 40%),
    radial-gradient(ellipse at 100% 0%, #e5f2ff 0 20%, transparent 22%),
    linear-gradient(150deg, #f9fcff 36%, #eef6ff 75%, #e2efff);
  box-shadow: inset 0 0 0 1px #ffffffc7, 0 2px 4px #3889d63d;
  content: '';
}

.technology-icon--framed img { width: 86%; height: 86%; }

.technology-icon--captioned img {
  position: absolute;
  top: 9%;
  left: 14%;
  width: 72%;
  height: 64%;
}

.technology-icon-caption {
  position: absolute;
  inset: 71% 9% auto;
  color: #0d3066;
  font-size: calc(var(--technology-icon-size, 76px) * .115);
  font-weight: 850;
  line-height: 1.15;
  text-align: center;
  white-space: nowrap;
}
</style>
