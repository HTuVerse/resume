<script setup>
import { inject, onMounted, onUnmounted, ref } from 'vue'
import { resumeDocument } from '../data/resume'
import PortfolioIcon from './PortfolioIcon.vue'

const dialog = ref(null)
const imageRegion = ref(null)
const previewImage = ref(null)
const previewButton = ref(null)
const isOpen = inject('resumePreviewOpen')
const maxZoom = 4
let opener
let zoom = 1
let previousTouch
let imageOffset = { x: 0, y: 0 }
let imageResizeObserver

onMounted(() => {
  if (isOpen.value) dialog.value.showModal()
  imageResizeObserver = new ResizeObserver(() => {
    if (dialog.value.open && zoom > 1) setImagePosition(zoom, imageOffset.x, imageOffset.y)
  })
  imageResizeObserver.observe(imageRegion.value)
})
onUnmounted(() => imageResizeObserver?.disconnect())

function openPreview(event) {
  opener = event.currentTarget
  dialog.value.showModal()
  isOpen.value = true
  previousTouch = undefined
  setImagePosition(1, 0, 0)
}

function closePreview() {
  dialog.value.close()
}

function restoreFocus() {
  isOpen.value = false
  const button = opener ?? previewButton.value
  button?.focus({ preventScroll: true })
}

function touchPosition(event) {
  const [first, second] = Array.from(event.touches).filter(touch => imageRegion.value.contains(touch.target))
  if (!first) return
  if (!second) return { x: first.clientX, y: first.clientY, distance: 0 }

  return {
    x: (first.clientX + second.clientX) / 2,
    y: (first.clientY + second.clientY) / 2,
    distance: Math.hypot(first.clientX - second.clientX, first.clientY - second.clientY),
  }
}

function rememberTouches(event) {
  previousTouch = touchPosition(event)
}

function setImagePosition(nextZoom, x, y) {
  const region = imageRegion.value
  const image = previewImage.value
  zoom = nextZoom
  region.classList.toggle('resume-image-scroll--zoomed', zoom > 1)

  if (zoom === 1) {
    imageOffset = { x: 0, y: 0 }
    image.style.removeProperty('transform')
    region.scrollTo(-x, -y)
    return
  }

  imageOffset = {
    x: Math.min(0, Math.max(x, region.clientWidth - image.offsetWidth * zoom)),
    y: Math.min(0, Math.max(y, region.clientHeight - image.offsetHeight * zoom)),
  }
  region.scrollTo(0, 0)
  image.style.transform = `translate(${imageOffset.x}px, ${imageOffset.y}px) scale(${zoom})`
}

function moveImage(event) {
  const currentTouch = touchPosition(event)
  const previous = previousTouch
  previousTouch = currentTouch
  if (!previous || !currentTouch) return

  const region = imageRegion.value
  if (previous.distance && currentTouch.distance) {
    const nextZoom = Math.min(maxZoom, Math.max(1, zoom * currentTouch.distance / previous.distance))
    const ratio = nextZoom / zoom
    const { left, top } = region.getBoundingClientRect()
    const imageX = previous.x - left - imageOffset.x + region.scrollLeft
    const imageY = previous.y - top - imageOffset.y + region.scrollTop
    setImagePosition(nextZoom, currentTouch.x - left - imageX * ratio, currentTouch.y - top - imageY * ratio)
  } else if (!previous.distance && !currentTouch.distance) {
    const dx = currentTouch.x - previous.x
    const dy = currentTouch.y - previous.y
    if (zoom > 1) {
      setImagePosition(zoom, imageOffset.x + dx, imageOffset.y + dy)
    } else {
      region.scrollBy(-dx, -dy)
    }
  }
}
</script>

<template>
  <section aria-label="完整简历预览">
    <div class="resume-preview-heading">
      <h2>完整简历预览</h2>
      <button ref="previewButton" class="resume-preview-open" type="button" aria-haspopup="dialog" @click="openPreview">
        查看大图 <PortfolioIcon name="search" />
      </button>
    </div>
    <button class="resume-preview-thumbnail" type="button" aria-label="查看简历大图" aria-haspopup="dialog" @click="openPreview">
      <img :src="resumeDocument.previewUrl" :alt="resumeDocument.imageAlt" :width="resumeDocument.previewWidth" :height="resumeDocument.previewHeight" loading="lazy" />
    </button>

    <Teleport to="body">
      <dialog ref="dialog" class="resume-image-dialog" aria-label="简历大图" @click.self="closePreview" @close="restoreFocus">
        <div class="resume-image-panel">
          <header class="resume-image-heading">
            <h2>简历大图</h2>
            <button class="resume-image-close" type="button" autofocus @click="closePreview">
              <PortfolioIcon name="close" /> 关闭
            </button>
          </header>
          <div
            ref="imageRegion" class="resume-image-scroll" role="region" aria-label="简历图片" tabindex="0"
            :style="{ aspectRatio: `${resumeDocument.previewWidth} / ${resumeDocument.previewHeight}` }"
            @touchstart="rememberTouches" @touchend="rememberTouches" @touchcancel="rememberTouches"
            @touchmove.prevent="moveImage"
          >
            <img ref="previewImage" :src="resumeDocument.previewUrl" :alt="resumeDocument.imageAlt" :width="resumeDocument.previewWidth" :height="resumeDocument.previewHeight" loading="lazy" />
          </div>
        </div>
      </dialog>
    </Teleport>
  </section>
</template>

<style scoped>
.resume-preview-open {
  display: inline-flex;
  min-height: 36px;
  padding: 0;
  align-items: center;
  gap: 6px;
  border: 0;
  color: #145acb;
  background: transparent;
  font: inherit;
  font-size: 13px;
  font-weight: 700;
  white-space: nowrap;
  cursor: pointer;
}

.resume-preview-open:hover { text-decoration: underline; }
.resume-preview-open .p-icon, .resume-image-close .p-icon { width: 16px; height: 16px; }
.resume-preview-thumbnail {
  display: block;
  width: 100%;
  padding: 0;
  overflow: hidden;
  border: 1px solid #e0eafa;
  border-radius: 8px;
  background: #fff;
  cursor: zoom-in;
}

.resume-preview-thumbnail img { display: block; width: 100%; height: auto; }
:global(html:has(.resume-image-dialog[open])) { overflow: hidden; }

.resume-image-dialog {
  --resume-dialog-gutter: clamp(.375rem, min(3vw, 3dvh), .75rem);
  width: min(57.5rem, calc(100% - 2 * var(--resume-dialog-gutter)));
  max-width: none;
  max-height: calc(100dvh - 2 * var(--resume-dialog-gutter));
  padding: 0;
  overflow: hidden;
  border: 1px solid #d5e4f8;
  border-radius: 15px;
  color: #142653;
  background: #f4f8ff;
  box-shadow: 0 24px 70px #102d5b55;
}

.resume-image-dialog::backdrop { background: #102340a6; }
.resume-image-panel { display: flex; max-height: calc(100dvh - 2 * var(--resume-dialog-gutter) - 2px); flex-direction: column; }
.resume-image-heading {
  display: flex;
  min-height: clamp(2.5rem, 12dvh, 3.375rem);
  padding: 6px 12px 6px 16px;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  border-bottom: 1px solid #dce7f8;
  background: #fff;
}

.resume-image-heading h2 { font-size: 16px; }
.resume-image-close {
  display: inline-flex;
  min-height: clamp(2rem, 9dvh, 2.5rem);
  padding: 0 11px;
  align-items: center;
  gap: 6px;
  border: 1px solid #cbdffc;
  border-radius: 9px;
  color: #1454c5;
  background: #edf5ff;
  font: inherit;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
}

.resume-image-close:hover { background: #e0edff; }
.resume-image-scroll {
  position: relative;
  min-height: 0;
  margin: clamp(.25rem, min(1.3vw, 2dvh), .875rem);
  overflow: auto;
  overscroll-behavior: contain;
  scrollbar-gutter: stable;
  touch-action: none;
}

.resume-image-scroll img {
  position: absolute;
  inset: 0 auto auto 0;
  width: 100%;
  height: auto;
  pointer-events: none;
  transform-origin: top left;
  user-select: none;
}

.resume-image-scroll--zoomed { overflow: hidden; }
.resume-image-scroll:focus-visible { outline: 2px solid #286be7; outline-offset: -2px; }
</style>
