<script setup lang="ts">
import type { Group, Object3D, WebGLRenderer } from 'three'

/**
 * Interactive 3D logo: drag (or arrow keys) to spin it freely on any axis, with inertia
 * and a slow idle spin. three.js is imported on the first user interaction so it stays out of
 * the prerender, the main bundle and the initial load; the flat glyph shows until the model is ready.
 */
const props = withDefaults(defineProps<{
  lightSrc?: string
  darkSrc?: string
  fallbackSrc?: string
}>(), {
  lightSrc: '/models/rt-logo-black.glb',
  darkSrc: '/models/rt-logo-white.glb',
  fallbackSrc: '/brand/rt-glyph.png',
})

const colorMode = useColorMode()
const container = ref<HTMLDivElement>()
const ready = ref(false)
const dragging = ref(false)

let cleanup: (() => void) | undefined

// Booting WebGL (renderer, environment map, shader compile) is a ~1s main-thread task on slow
// devices, so it waits for the first interaction instead of competing with the initial load.
const WAKE_EVENTS = ['pointermove', 'pointerdown', 'keydown', 'touchstart', 'wheel', 'scroll'] as const

onMounted(() => {
  const wake = () => {
    stopWaiting()
    init()
  }
  const stopWaiting = () => {
    for (const type of WAKE_EVENTS) window.removeEventListener(type, wake)
    cleanup = undefined
  }
  for (const type of WAKE_EVENTS) window.addEventListener(type, wake, { once: true, passive: true })
  cleanup = stopWaiting
})

async function init() {
  const el = container.value
  if (!el) return
  const THREE = await import('three')
  const [{ GLTFLoader }, { RoomEnvironment }] = await Promise.all([
    import('three/examples/jsm/loaders/GLTFLoader.js'),
    import('three/examples/jsm/environments/RoomEnvironment.js'),
  ])
  // Unmounted while the chunks were loading.
  if (!container.value) return

  let renderer: WebGLRenderer
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  }
  catch {
    return // No WebGL: keep the flat glyph.
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.domElement.className = 'absolute inset-0 size-full'
  el.appendChild(renderer.domElement)

  const scene = new THREE.Scene()
  const pmrem = new THREE.PMREMGenerator(renderer)
  const envMap = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
  scene.environment = envMap

  // Fit the model's bounding sphere (radius ~1.35) to ~80% of the frame height.
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100)
  camera.position.z = 6.3

  // Rotations are applied to the pivot, so swapping models keeps the current orientation.
  const pivot: Group = new THREE.Group()
  pivot.rotation.set(-0.25, 0.5, 0)
  scene.add(pivot)

  const loader = new GLTFLoader()
  const cache = new Map<string, Promise<Object3D>>()
  function load(src: string) {
    if (!cache.has(src)) {
      cache.set(src, loader.loadAsync(src).then((gltf) => {
        const model = gltf.scene
        model.position.sub(new THREE.Box3().setFromObject(model).getCenter(new THREE.Vector3()))
        return model
      }))
    }
    return cache.get(src)!
  }

  let current: Object3D | undefined
  async function showModel() {
    const src = colorMode.value === 'dark' ? props.darkSrc : props.lightSrc
    try {
      const model = await load(src)
      if (!cache.size) return // Disposed meanwhile.
      if (current) pivot.remove(current)
      pivot.add(model)
      current = model
      ready.value = true
    }
    catch (e) {
      console.error('[LogoModel] failed to load', src, e)
    }
  }
  const stopWatch = watch(() => colorMode.value, showModel, { immediate: true })

  function resize() {
    const { clientWidth: w, clientHeight: h } = el
    if (!w || !h) return
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
  }
  const resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(el)
  resize()

  // Free rotation around the screen axes; velocity is in radians per second.
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  const IDLE_SPIN = 0.35
  const DRAG_SPEED = 0.01
  const axisX = new THREE.Vector3(1, 0, 0)
  const axisY = new THREE.Vector3(0, 1, 0)
  const q = new THREE.Quaternion()
  const velocity = { x: 0, y: 0 }

  function rotateBy(dx: number, dy: number) {
    pivot.quaternion.premultiply(q.setFromAxisAngle(axisY, dx))
    pivot.quaternion.premultiply(q.setFromAxisAngle(axisX, dy))
  }

  let last: { x: number, y: number, t: number } | undefined
  function onPointerDown(e: PointerEvent) {
    if (e.button !== 0) return
    el.setPointerCapture(e.pointerId)
    dragging.value = true
    velocity.x = velocity.y = 0
    last = { x: e.clientX, y: e.clientY, t: e.timeStamp }
  }
  function onPointerMove(e: PointerEvent) {
    if (!dragging.value || !last) return
    const dx = (e.clientX - last.x) * DRAG_SPEED
    const dy = (e.clientY - last.y) * DRAG_SPEED
    const dt = Math.max((e.timeStamp - last.t) / 1000, 1 / 240)
    rotateBy(dx, dy)
    velocity.x = dx / dt
    velocity.y = dy / dt
    last = { x: e.clientX, y: e.clientY, t: e.timeStamp }
  }
  function onPointerUp(e: PointerEvent) {
    if (!dragging.value) return
    dragging.value = false
    // A pause before release means the user stopped the spin.
    if (last && e.timeStamp - last.t > 80) velocity.x = velocity.y = 0
    last = undefined
  }
  function onKeyDown(e: KeyboardEvent) {
    const step = 0.2
    const keys: Record<string, [number, number]> = {
      ArrowLeft: [-step, 0],
      ArrowRight: [step, 0],
      ArrowUp: [0, -step],
      ArrowDown: [0, step],
    }
    const delta = keys[e.key]
    if (!delta) return
    e.preventDefault()
    velocity.x = velocity.y = 0
    rotateBy(...delta)
  }
  el.addEventListener('pointerdown', onPointerDown)
  el.addEventListener('pointermove', onPointerMove)
  el.addEventListener('pointerup', onPointerUp)
  el.addEventListener('pointercancel', onPointerUp)
  el.addEventListener('keydown', onKeyDown)

  const clock = new THREE.Clock()
  function frame() {
    const dt = Math.min(clock.getDelta(), 0.1)
    if (!dragging.value) {
      const damping = Math.exp(-3 * dt)
      velocity.x *= damping
      velocity.y *= damping
      const idle = reducedMotion.matches ? 0 : IDLE_SPIN
      // Settle back into a gentle idle spin once the flick has decayed.
      rotateBy((Math.abs(velocity.x) > idle ? velocity.x : idle) * dt, velocity.y * dt)
    }
    renderer.render(scene, camera)
  }

  // Only render while on screen.
  const intersection = new IntersectionObserver(([entry]) => {
    clock.getDelta()
    renderer.setAnimationLoop(entry?.isIntersecting ? frame : null)
  })
  intersection.observe(el)

  cleanup = () => {
    stopWatch()
    intersection.disconnect()
    resizeObserver.disconnect()
    renderer.setAnimationLoop(null)
    el.removeEventListener('pointerdown', onPointerDown)
    el.removeEventListener('pointermove', onPointerMove)
    el.removeEventListener('pointerup', onPointerUp)
    el.removeEventListener('pointercancel', onPointerUp)
    el.removeEventListener('keydown', onKeyDown)
    for (const model of cache.values()) {
      model.then(m => m.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          o.geometry.dispose()
          for (const mat of [o.material].flat()) mat.dispose()
        }
      })).catch(() => {})
    }
    cache.clear()
    envMap.dispose()
    pmrem.dispose()
    renderer.dispose()
    renderer.domElement.remove()
  }
}

onBeforeUnmount(() => cleanup?.())
</script>

<template>
  <div
    ref="container"
    role="img"
    aria-label="3D logo — drag or use the arrow keys to rotate"
    tabindex="0"
    class="relative size-full touch-none outline-none select-none focus-visible:ring-2 focus-visible:ring-ring/50"
    :class="dragging ? 'cursor-grabbing' : 'cursor-grab'"
  >
    <img
      :src="fallbackSrc"
      alt=""
      width="56"
      height="56"
      class="pointer-events-none absolute top-1/2 left-1/2 w-14 -translate-1/2 mix-blend-multiply transition-opacity duration-500 dark:mix-blend-screen dark:invert"
      :class="ready ? 'opacity-0' : 'opacity-85'"
    >
  </div>
</template>
