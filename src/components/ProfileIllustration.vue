<script setup>
defineProps({ name: { type: String, required: true } })
</script>

<template>
  <img
    class="profile-illustration"
    :class="{ 'profile-illustration--marker': name === 'verified' }"
    :src="`/assets/profile-icons/${name}.webp`"
    alt=""
    width="160"
    height="160"
  />
</template>

<style scoped>
.profile-illustration {
  display: block;
  width: var(--profile-icon-size, 42px);
  height: var(--profile-icon-size, 42px);
  flex: 0 0 auto;
  padding: 3px;
  border: 1px solid #d5e8fc;
  border-radius: 27%;
  background: linear-gradient(145deg, #f8fcff, #e6f2ff);
  box-shadow: inset 0 1px #fff, 0 2px 5px #3a79bd12;
  object-fit: contain;
}

.profile-illustration--marker {
  --profile-icon-size: 18px;
  padding: 0;
  border: 0;
  background: transparent;
  box-shadow: none;
}
</style>
