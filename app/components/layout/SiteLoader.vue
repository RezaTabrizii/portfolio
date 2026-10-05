<!--
  Initial page loader in the CAD style: crosshair hairlines open out, a corner-bracket frame
  with dimension marks appears, the RT glyph is traced stroke by stroke and then filled, and
  a mono counter runs. It is server-rendered and driven by CSS, so it is on screen before
  hydration. On mount it waits for window load + fonts (and a short minimum time), then
  finishes the counter, wipes up and unmounts.
  Styles: app/assets/css/loader.css. Shown once per tab session unless `oncePerSession` is false.
-->
<script setup lang="ts">
const props = withDefaults(defineProps<{
  title?: string
  subtitle?: string
  loadingLabel?: string
  oncePerSession?: boolean
  minDuration?: number
  maxDuration?: number
}>(), { title: '', subtitle: '', loadingLabel: 'Loading', oncePerSession: true, minDuration: 1400, maxDuration: 5000 })

const SESSION_KEY = 'rt-loaded'
const SKIP_CLASS = 'rt-skip-loader'

// Subpaths of public/rt-symbol-black.svg, split so each traces on its own.
const GLYPH = [
  'M36 52L54 34H156V70H54Z',
  'M224 34H326L344 52L326 70H224Z',
  'M166 34H214V286L190 310L166 286Z',
  'M76 86H156V118H112V168H156V200H112V262H76Z',
  'M224 86H304V200H224V168H268V118H224Z',
  'M224 210H264L304 230V262H286L224 231Z',
]

// Hide the loader before first paint on repeat visits in the same tab.
if (props.oncePerSession) {
  useHead({
    script: [{
      key: 'rt-skip-loader',
      tagPosition: 'head',
      innerHTML: `try{sessionStorage.getItem('${SESSION_KEY}')&&document.documentElement.classList.add('${SKIP_CLASS}')}catch(e){}`,
    }],
    noscript: [{ key: 'rt-loader-noscript', innerHTML: '<style>.rt-loader{display:none!important}</style>' }],
  })
}

const visible = ref(true)
const state = ref<'loading' | 'done'>('loading')

const wait = (ms: number) => new Promise<void>(r => setTimeout(r, ms))
const windowLoaded = () => document.readyState === 'complete'
  ? Promise.resolve()
  : new Promise<void>(r => window.addEventListener('load', () => r(), { once: true }))

onMounted(async () => {
  const html = document.documentElement
  if (html.classList.contains(SKIP_CLASS)) {
    visible.value = false
    return
  }
  if (props.oncePerSession) {
    try {
      sessionStorage.setItem(SESSION_KEY, '1')
    }
    catch { /* storage blocked: show it every time */ }
  }

  // performance.now() counts from navigation start, so time spent before hydration counts too.
  const remaining = Math.max(0, (prefersReducedMotion() ? 0 : props.minDuration) - performance.now())
  await Promise.race([
    Promise.all([windowLoaded(), document.fonts?.ready, wait(remaining)]),
    wait(props.maxDuration),
  ])
  state.value = 'done'
})

function onAnimationEnd(e: AnimationEvent) {
  if (e.target === e.currentTarget && e.animationName === 'rt-loader-exit') visible.value = false
}
</script>

<template>
  <div
    v-if="visible"
    class="rt-loader"
    :data-state="state"
    aria-hidden="true"
    @animationend="onAnimationEnd"
  >
    <div class="rt-loader__inner">
      <div class="rt-loader__grid dot-grid" />
      <div class="rt-loader__line-h" />
      <div class="rt-loader__line-v" />

      <div class="rt-loader__frame">
        <span class="rt-loader__c rt-loader__c--tl" />
        <span class="rt-loader__c rt-loader__c--tr" />
        <span class="rt-loader__c rt-loader__c--bl" />
        <span class="rt-loader__c rt-loader__c--br" />

        <div class="rt-loader__dim rt-loader__dim--x">
          <span>308</span>
        </div>
        <div class="rt-loader__dim rt-loader__dim--y">
          <span>276</span>
        </div>

        <svg
          class="rt-loader__glyph"
          viewBox="36 34 308 276"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            v-for="(d, i) in GLYPH"
            :key="i"
            :d="d"
            :style="{ '--i': i }"
            pathLength="1"
            vector-effect="non-scaling-stroke"
          />
        </svg>
      </div>

      <div class="rt-loader__meta rt-loader__meta--tl">
        {{ title }}
      </div>
      <div class="rt-loader__meta rt-loader__meta--tr">
        {{ subtitle }}
      </div>
      <div class="rt-loader__meta rt-loader__meta--bl">
        <span class="rt-loader__blink" />{{ loadingLabel }}
      </div>
      <div class="rt-loader__meta rt-loader__meta--br">
        <span class="rt-loader__count" />
      </div>
      <div class="rt-loader__bar" />
    </div>
  </div>
</template>
