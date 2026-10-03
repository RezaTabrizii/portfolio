<!--
  CAD cursor: 5px square dot, 28px corner-bracket reticle that trails and snaps around
  links/buttons, viewport crosshair hairlines and a mono X/Y readout.
  Styles: app/assets/css/cursor.css. Mount once inside <ClientOnly>.
  Targets: data-cursor (extra interactive), data-cursor-label="…" (readout text),
  data-cursor="text" (force I-beam). Disabled on coarse pointers; no lag with reduced motion.
-->
<script setup lang="ts">
import { onBeforeUnmount, onMounted, useTemplateRef } from 'vue'

const props = withDefaults(defineProps<{
  crosshair?: boolean
  coords?: boolean
  snap?: boolean
  size?: number
  bracket?: number
  padding?: number
  smoothing?: number
}>(), { crosshair: true, coords: true, snap: true, size: 28, bracket: 8, padding: 4, smoothing: 0.2 })

const INTERACTIVE = 'a,button,[role="button"],summary,label,select,[data-cursor]'
const TEXTY = 'input:not([type=checkbox]):not([type=radio]):not([type=button]):not([type=submit]):not([type=range]),textarea,[contenteditable="true"],[data-cursor="text"]'
// const pad4 = (n: number) => String(Math.max(0, Math.round(n))).padStart(4, '0')

const root = useTemplateRef<HTMLDivElement>('root')
const dot = useTemplateRef<HTMLDivElement>('dot')
const box = useTemplateRef<HTMLDivElement>('box')
// const lineH = useTemplateRef<HTMLDivElement>('lineH')
// const lineV = useTemplateRef<HTMLDivElement>('lineV')
const label = useTemplateRef<HTMLDivElement>('label')

let cleanup: (() => void) | undefined

onMounted(() => {
  const el = root.value
  if (!el || !window.matchMedia('(pointer: fine)').matches) return

  const k = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 1 : props.smoothing
  document.documentElement.classList.add('rt-cursor-on')

  let mx = -100
  let my = -100
  let bx = mx
  let by = my
  let bw = props.size
  let bh = props.size
  let br = 2
  let target: Element | null = null
  let raf = 0

  const setTarget = (node: EventTarget | null) => {
    const t = node instanceof Element ? node.closest(`${TEXTY},${INTERACTIVE}`) : null
    if (t === target) return
    target = t
    el.dataset.state = !t ? 'idle' : t.matches(TEXTY) ? 'text' : 'hover'
  }
  const onMove = (e: MouseEvent) => {
    mx = e.clientX
    my = e.clientY
    el.style.opacity = '1'
    setTarget(e.target)
  }
  const onLeave = () => {
    el.style.opacity = '0'
  }
  const onDown = () => {
    el.dataset.down = '1'
  }
  const onUp = () => {
    delete el.dataset.down
  }
  const onScroll = () => setTarget(document.elementFromPoint(mx, my))

  const tick = () => {
    let tx = mx
    let ty = my
    let tw = props.size
    let th = props.size
    let tr = 2
    const hovering = !!target && el.dataset.state === 'hover'

    if (props.snap && target && hovering) {
      const r = target.getBoundingClientRect()
      tw = r.width + props.padding * 2
      th = r.height + props.padding * 2
      tx = r.left + r.width / 2
      ty = r.top + r.height / 2
      const rad = Number.parseFloat(getComputedStyle(target).borderTopLeftRadius) || 0
      tr = rad ? Math.min(rad + props.padding, th / 2) : 2
    }

    bx += (tx - bx) * k
    by += (ty - by) * k
    bw += (tw - bw) * k
    bh += (th - bh) * k
    br += (tr - br) * k

    if (box.value) {
      const b = box.value
      b.style.width = `${bw}px`
      b.style.height = `${bh}px`
      b.style.transform = `translate3d(${bx - bw / 2}px,${by - bh / 2}px,0) scale(${el.dataset.down ? 0.92 : 1})`
      b.style.setProperty('--r', `${br}px`)
      b.style.setProperty('--b', `${Math.min(props.bracket + (bw - props.size) * 0.08, bw / 2, bh / 2)}px`)
    }
    if (dot.value) dot.value.style.transform = `translate3d(${mx}px,${my}px,0)`
    // Crosshair hairlines disabled
    // if (lineH.value && lineV.value) {
    //   lineH.value.style.transform = `translate3d(0,${my}px,0)`
    //   lineV.value.style.transform = `translate3d(${mx}px,0,0)`
    // }
    if (label.value) {
      label.value.textContent = hovering
        ? (target!.getAttribute('data-cursor-label') || target!.getAttribute('aria-label') || '')
        : '' // X/Y readout disabled: `X ${pad4(mx)}  Y ${pad4(my)}`
      const lw = label.value.offsetWidth
      const lh = label.value.offsetHeight
      const vw = window.innerWidth
      const vh = window.innerHeight
      let lx = hovering ? bx - bw / 2 : mx + 14
      let ly = hovering ? by + bh / 2 + 6 : my + 14
      // No room below: flip the label above the reticle/pointer
      if (ly + lh > vh - 4) ly = hovering ? by - bh / 2 - 6 - lh : my - 14 - lh
      lx = Math.max(4, Math.min(lx, vw - lw - 4))
      label.value.style.transform = `translate3d(${lx}px,${ly}px,0)`
    }
    raf = requestAnimationFrame(tick)
  }

  window.addEventListener('mousemove', onMove, { passive: true })
  window.addEventListener('mousedown', onDown)
  window.addEventListener('mouseup', onUp)
  window.addEventListener('scroll', onScroll, { passive: true })
  document.addEventListener('mouseleave', onLeave)
  raf = requestAnimationFrame(tick)

  cleanup = () => {
    cancelAnimationFrame(raf)
    window.removeEventListener('mousemove', onMove)
    window.removeEventListener('mousedown', onDown)
    window.removeEventListener('mouseup', onUp)
    window.removeEventListener('scroll', onScroll)
    document.removeEventListener('mouseleave', onLeave)
    document.documentElement.classList.remove('rt-cursor-on')
  }
})

onBeforeUnmount(() => cleanup?.())
</script>

<template>
  <div
    ref="root"
    class="rt-cursor"
    data-state="idle"
    aria-hidden="true"
  >
    <!-- Crosshair hairlines disabled
    <template v-if="crosshair">
      <div
        ref="lineH"
        class="rt-cursor__line-h"
      />
      <div
        ref="lineV"
        class="rt-cursor__line-v"
      />
    </template>
    -->
    <div
      ref="box"
      class="rt-cursor__box"
    >
      <span class="rt-cursor__c rt-cursor__c--tl" />
      <span class="rt-cursor__c rt-cursor__c--tr" />
      <span class="rt-cursor__c rt-cursor__c--bl" />
      <span class="rt-cursor__c rt-cursor__c--br" />
    </div>
    <div
      ref="dot"
      class="rt-cursor__dot"
    />
    <div
      v-if="coords"
      ref="label"
      class="rt-cursor__label"
    />
  </div>
</template>
