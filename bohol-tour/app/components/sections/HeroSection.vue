<template>
  <section ref="heroRef" class="relative min-h-screen flex items-center overflow-hidden">
    <!-- ── Layered background ─────────────────────────── -->
    <div class="absolute inset-0 z-0">
      <img
        src="https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=1920&q=90"
        alt="Bohol paradise beach"
        class="w-full h-full object-cover scale-105 transition-transform duration-[10000ms]"
        :style="{ transform: `scale(1.05) translateY(${parallax}px)` }"
        fetchpriority="high"
      />
      <!-- Chocolate Hills image sequence canvas (GSAP scroll-driven) -->
      <!-- Sits above the fallback img, below the gradient overlays       -->
      <canvas
        ref="heroCanvas"
        class="absolute inset-0 w-full h-full pointer-events-none"
        style="opacity:0;transition:opacity 0.8s ease;"
        aria-hidden="true"
      />
      <!-- Deep layered gradients -->
      <div class="absolute inset-0 bg-gradient-to-b from-slate-900/10 via-slate-900/40 to-slate-900/85" />
      <div class="absolute inset-0 bg-gradient-to-r from-ocean-950/60 via-transparent to-transparent" />
    </div>

    <!-- ── Decorative glows ───────────────────────────── -->
    <div class="absolute top-1/3 right-0 w-[600px] h-[600px] bg-teal-500/8 rounded-full blur-[100px] z-0 animate-float" />
    <div class="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-ocean-500/10 rounded-full blur-[80px] z-0 animate-float-delayed" />

    <!-- ── Main content ───────────────────────────────── -->
    <div class="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-44">
      <div class="max-w-3xl">
        <!-- Eyebrow -->
        <div class="flex items-center gap-3 mb-8 animate-fade-in">
          <div class="h-px w-10 bg-gradient-to-r from-sand-400 to-transparent" />
          <span class="text-sand-300 text-xs font-bold uppercase tracking-[0.25em]">
            The Pearl of the Philippines
          </span>
        </div>

        <!-- Heading -->
        <h1
          class="font-display text-[clamp(3rem,8vw,6rem)] font-bold text-white leading-[1.02] mb-8 animate-slide-up"
          style="animation-delay: 0.08s"
        >
          Explore Bohol<br />
          <em class="not-italic text-gradient-warm">Like Never Before</em>
        </h1>

        <!-- Subheading -->
        <p
          class="text-white/65 text-base sm:text-lg md:text-xl max-w-xl leading-relaxed mb-12 animate-slide-up font-light"
          style="animation-delay: 0.18s"
        >
          Chocolate Hills, ancient tarsiers, sea-turtle snorkeling, and fireflies over mangroves — the island has a thousand faces. We'll show you all of them.
        </p>

        <!-- CTAs -->
        <div
          class="flex flex-wrap items-center gap-4 mb-20 animate-slide-up"
          style="animation-delay: 0.28s"
        >
          <NuxtLink
            to="/tours"
            class="group relative inline-flex items-center gap-3 px-8 py-4 bg-ocean-600 hover:bg-ocean-500 text-white font-semibold rounded-2xl text-base transition-all duration-300 btn-press shadow-[0_4px_24px_-4px_rgba(2,132,199,0.6)] hover:shadow-[0_8px_32px_-4px_rgba(2,132,199,0.7)] overflow-hidden"
          >
            <!-- Shine sweep on hover -->
            <div class="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12" />
            <span class="relative">Book Your Adventure</span>
            <div
              class="relative w-7 h-7 bg-white/15 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </NuxtLink>

          <a
            href="#tours"
            class="inline-flex items-center gap-2 px-8 py-4 glass text-white font-semibold rounded-2xl text-base transition-all duration-300 hover:bg-white/15 btn-press"
          >
            <svg class="w-4 h-4 text-sand-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Watch Tour Video
          </a>
        </div>

        <!-- Floating stats row -->
        <div
          class="grid grid-cols-2 sm:grid-cols-4 gap-3 animate-slide-up"
          style="animation-delay: 0.38s"
        >
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="glass rounded-2xl px-4 py-3.5 flex flex-col gap-1 hover:bg-white/15 transition-colors duration-300"
          >
            <div class="text-2xl sm:text-3xl font-bold text-white leading-none">{{ stat.value }}</div>
            <div class="text-2xs text-white/50 font-semibold uppercase tracking-widest">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- ── Floating review card ───────────────────────── -->
    <div
      class="absolute bottom-24 right-6 lg:right-16 z-20 glass-light rounded-2xl p-4 max-w-[200px] shadow-xl hidden md:flex items-center gap-3 animate-slide-in-right"
      style="animation-delay: 0.55s"
    >
      <img
        src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=48&q=80"
        alt="Guest"
        class="w-10 h-10 rounded-xl object-cover shrink-0"
      />
      <div>
        <div class="flex gap-0.5 mb-1">
          <svg v-for="s in 5" :key="s" class="w-3 h-3 text-sand-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>
        <p class="text-slate-800 text-xs font-semibold leading-tight">"Absolutely magical!"</p>
        <p class="text-slate-400 text-2xs mt-0.5">Sarah C. · Singapore</p>
      </div>
    </div>

    <!-- ── Bottom wave ────────────────────────────────── -->
    <div class="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
      <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" class="w-full">
        <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,10 1440,40 L1440,80 L0,80 Z" fill="white" />
      </svg>
    </div>

    <!-- ── Scroll indicator ───────────────────────────── -->
    <div class="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 animate-bounce">
      <div class="w-5 h-8 border-2 border-white/30 rounded-full flex items-start justify-center p-1">
        <div class="w-1 h-2 bg-white/60 rounded-full animate-pulse-slow" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// ── Preserved originals ───────────────────────────────────────────────────────
const parallax = ref(0)
const heroRef = ref<HTMLElement | null>(null)

const stats = [
  { value: '50+', label: 'Tours' },
  { value: '2K+', label: 'Travelers' },
  { value: '4.9★', label: 'Rating' },
  { value: '10yr', label: 'Experience' },
]

// ── Chocolate Hills image sequence ────────────────────────────────────────────
const heroCanvas = ref<HTMLCanvasElement | null>(null)

/** Total frames in /public/chocolate-hills/frame_001.jpg … frame_060.jpg */
const TOTAL_FRAMES = 60
const frameSrc = (n: number) =>
  `/ChocolateHillsFrames/frame_${String(n).padStart(3, '0')}.jpg`

// Mutable state — not reactive intentionally (GSAP mutates these directly)
const frames: HTMLImageElement[] = []
let currentFrame = 0
let sequenceReady = false
let gsapCtx: gsap.Context | null = null

// ── Canvas helpers ────────────────────────────────────────────────────────────

function drawFrame(n: number) {
  const canvas = heroCanvas.value
  const img = frames[n]
  if (!canvas || !img?.naturalWidth) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  currentFrame = n

  // Cover-fit: fill canvas while preserving the image's aspect ratio
  const cw = canvas.offsetWidth
  const ch = canvas.offsetHeight
  const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight)
  const dw = img.naturalWidth * scale
  const dh = img.naturalHeight * scale

  ctx.clearRect(0, 0, cw, ch)
  ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh)
}

function resizeCanvas() {
  const canvas = heroCanvas.value
  if (!canvas) return

  // Cap DPR at 2 — beyond that the quality gain doesn't justify the memory
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  canvas.width = Math.floor(canvas.offsetWidth * dpr)
  canvas.height = Math.floor(canvas.offsetHeight * dpr)

  // Setting .width resets ctx state; re-apply scale for crisp rendering
  const ctx = canvas.getContext('2d')
  if (ctx) ctx.scale(dpr, dpr)

  if (sequenceReady) drawFrame(currentFrame)
}

// ── Frame preloader ───────────────────────────────────────────────────────────

function preloadFrames(): Promise<boolean> {
  return new Promise((resolve) => {
    let done = 0
    let ok = 0

    const tick = (success: boolean) => {
      if (success) ok++
      if (++done === TOTAL_FRAMES) resolve(ok > TOTAL_FRAMES / 2)
    }

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image()
      img.onload = () => tick(true)
      img.onerror = () => tick(false)
      img.src = frameSrc(i)
      frames.push(img)
    }
  })
}

// ── Device capability check ───────────────────────────────────────────────────

function isLowEnd(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// ── Fallback: original text parallax (no sequence) ───────────────────────────

function setupFallbackParallax() {
  const isMobile = window.innerWidth < 1024
  const textWrap = heroRef.value?.querySelector<HTMLElement>('.max-w-3xl')
  if (!textWrap) return

  gsapCtx = gsap.context(() => {
    gsap.to(textWrap, {
      y: isMobile ? -40 : -75,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.value,
        start: 'top top',
        end: '75% top',
        scrub: 1.2,
      },
    })
  })
}

// ── Main setup ────────────────────────────────────────────────────────────────

onMounted(async () => {
  gsap.registerPlugin(ScrollTrigger)

  // Existing bg-image parallax (Vue-driven, unchanged)
  const onScroll = () => { parallax.value = window.scrollY * 0.15 }
  window.addEventListener('scroll', onScroll, { passive: true })
  onUnmounted(() => window.removeEventListener('scroll', onScroll))

  // Abort sequence on low-end devices or when canvas ref is absent
  console.log('[Seq] isLowEnd:', isLowEnd(), '| canvas:', !!heroCanvas.value)
  if (isLowEnd() || !heroCanvas.value) {
    setupFallbackParallax()
    return
  }

  // Size the canvas before loading so first draw is correct
  resizeCanvas()
  console.log('[Seq] canvas size:', heroCanvas.value?.offsetWidth, heroCanvas.value?.offsetHeight)

  // Preload — resolve(false) if more than half the frames failed
  const loaded = await preloadFrames()
  console.log('[Seq] frames loaded:', loaded, '| first frame src:', frames[0]?.src, '| naturalWidth:', frames[0]?.naturalWidth)

  if (!loaded) {
    setupFallbackParallax()
    return
  }

  // ── Sequence is ready ─────────────────────────────────────────────────────
  sequenceReady = true
  drawFrame(0)
  console.log('[Seq] first frame drawn, fading canvas in')

  // Fade canvas in — the static beach img beneath acts as the load-state fallback
  if (heroCanvas.value) heroCanvas.value.style.opacity = '1'

  const isMobile = window.innerWidth < 1024
  const textWrap = heroRef.value?.querySelector<HTMLElement>('.max-w-3xl')
  const scrollDist = window.innerHeight * 2.5   // pin duration: 2.5× viewport
  const frameObj = { frame: 0 }

  gsapCtx = gsap.context(() => {
    gsap.to(frameObj, {
      frame: TOTAL_FRAMES - 1,

      ease: 'none',

      onUpdate() {
        const f = Math.round(frameObj.frame)

        // Skip redundant draws (same frame)
        if (f !== currentFrame) drawFrame(f)

        // Text parallax driven in sync with the frame animation
        if (textWrap) {
          const progress = frameObj.frame / (TOTAL_FRAMES - 1)
          gsap.set(textWrap, { y: progress * (isMobile ? -40 : -75) })
        }
      },

      scrollTrigger: {
        trigger: heroRef.value,
        start: 'top top',
        end: `+=${scrollDist}`,
        pin: true,           // hero sticks while frames play
        anticipatePin: 1,    // eliminates jump when pin activates
        scrub: 0.5,          // smooth lag between scroll and animation
      },
    })
  })

  // Refresh layout after canvas resize so ScrollTrigger recalculates pin spacer
  const onResize = () => {
    resizeCanvas()
    ScrollTrigger.refresh()
  }
  window.addEventListener('resize', onResize, { passive: true })
  onUnmounted(() => window.removeEventListener('resize', onResize))
})

onUnmounted(() => {
  gsapCtx?.revert()
  gsapCtx = null
  frames.length = 0   // release image references
})
</script>
