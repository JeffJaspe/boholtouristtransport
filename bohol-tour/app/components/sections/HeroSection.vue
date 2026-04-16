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
      <!-- Deep layered gradients -->
      <div class="absolute inset-0 bg-gradient-to-b from-slate-900/10 via-slate-900/40 to-slate-900/85" />
      <div class="absolute inset-0 bg-gradient-to-r from-ocean-950/60 via-transparent to-transparent" />
    </div>

    <!-- ── Decorative glows ───────────────────────────── -->
    <div class="absolute top-1/3 right-0 w-[600px] h-[600px] bg-teal-500/8 rounded-full blur-[100px] z-0 animate-float" />
    <div class="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-ocean-500/10 rounded-full blur-[80px] z-0 animate-float-delayed" />

    <!-- ── Drifting clouds (GSAP animated, loop) ────────── -->
    <div class="absolute inset-0 z-[3] pointer-events-none overflow-hidden" aria-hidden="true">
      <div data-cloud="1" class="absolute will-change-transform" style="top:7%;opacity:0.35">
        <svg width="280" height="72" viewBox="0 0 280 72" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="140" cy="52" rx="130" ry="20" fill="white"/>
          <ellipse cx="88" cy="40" rx="68" ry="28" fill="white"/>
          <ellipse cx="192" cy="36" rx="56" ry="24" fill="white"/>
          <ellipse cx="134" cy="28" rx="44" ry="22" fill="white"/>
        </svg>
      </div>
      <div data-cloud="2" class="absolute will-change-transform" style="top:22%;opacity:0.22">
        <svg width="210" height="58" viewBox="0 0 210 58" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="105" cy="42" rx="96" ry="16" fill="white"/>
          <ellipse cx="66" cy="32" rx="50" ry="22" fill="white"/>
          <ellipse cx="148" cy="28" rx="44" ry="18" fill="white"/>
        </svg>
      </div>
      <div data-cloud="3" class="absolute will-change-transform" style="top:14%;opacity:0.18">
        <svg width="175" height="50" viewBox="0 0 175 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="88" cy="36" rx="80" ry="14" fill="white"/>
          <ellipse cx="56" cy="26" rx="44" ry="18" fill="white"/>
          <ellipse cx="124" cy="22" rx="38" ry="16" fill="white"/>
        </svg>
      </div>
    </div>

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

    <!-- ── Tarsier mascot (GSAP: float, sway, blink) ───── -->
    <div
      ref="tarsierRef"
      class="absolute bottom-52 right-4 lg:right-8 z-[19] w-14 h-20 pointer-events-none select-none hidden lg:block"
      aria-hidden="true"
    >
      <svg viewBox="0 0 120 168" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full drop-shadow-xl">
        <!-- Tail -->
        <path d="M58 144 Q74 158 78 172 Q80 183 70 181" stroke="#7A5520" stroke-width="5" stroke-linecap="round" fill="none"/>
        <!-- Body -->
        <ellipse cx="60" cy="118" rx="20" ry="26" fill="#9B7430"/>
        <!-- Arms -->
        <path d="M40 110 Q21 122 17 134" stroke="#9B7430" stroke-width="7" stroke-linecap="round"/>
        <path d="M80 110 Q99 122 103 134" stroke="#9B7430" stroke-width="7" stroke-linecap="round"/>
        <!-- Fingers left -->
        <circle cx="14" cy="135" r="3.5" fill="#B08840"/>
        <circle cx="9" cy="141" r="3" fill="#B08840"/>
        <circle cx="17" cy="143" r="3" fill="#B08840"/>
        <!-- Fingers right -->
        <circle cx="106" cy="135" r="3.5" fill="#B08840"/>
        <circle cx="111" cy="141" r="3" fill="#B08840"/>
        <circle cx="103" cy="143" r="3" fill="#B08840"/>
        <!-- Head -->
        <circle cx="60" cy="68" r="34" fill="#B08840"/>
        <!-- Left ear -->
        <ellipse cx="27" cy="48" rx="11" ry="15" fill="#9B7430" transform="rotate(-18 27 48)"/>
        <ellipse cx="27" cy="48" rx="5.5" ry="8" fill="#D4A870" transform="rotate(-18 27 48)"/>
        <!-- Right ear -->
        <ellipse cx="93" cy="48" rx="11" ry="15" fill="#9B7430" transform="rotate(18 93 48)"/>
        <ellipse cx="93" cy="48" rx="5.5" ry="8" fill="#D4A870" transform="rotate(18 93 48)"/>
        <!-- Eye sockets -->
        <circle cx="42" cy="68" r="22" fill="#2A1A0A"/>
        <circle cx="78" cy="68" r="22" fill="#2A1A0A"/>
        <!-- Eye whites -->
        <circle cx="42" cy="68" r="17" fill="#F5F0E8"/>
        <circle cx="78" cy="68" r="17" fill="#F5F0E8"/>
        <!-- Irises -->
        <circle cx="42" cy="68" r="12" fill="#3D2B1A"/>
        <circle cx="78" cy="68" r="12" fill="#3D2B1A"/>
        <!-- Pupils -->
        <circle cx="42" cy="68" r="7" fill="#080604"/>
        <circle cx="78" cy="68" r="7" fill="#080604"/>
        <!-- Eye shines -->
        <circle cx="38" cy="63" r="3.5" fill="white" opacity="0.9"/>
        <circle cx="46" cy="74" r="2" fill="white" opacity="0.4"/>
        <circle cx="74" cy="63" r="3.5" fill="white" opacity="0.9"/>
        <circle cx="82" cy="74" r="2" fill="white" opacity="0.4"/>
        <!-- Nose -->
        <ellipse cx="60" cy="82" rx="5.5" ry="3.5" fill="#7A4F2A"/>
        <!-- Mouth -->
        <path d="M54 89 Q60 94 66 89" stroke="#7A4F2A" stroke-width="1.5" stroke-linecap="round" fill="none"/>
        <!-- Cheek blush -->
        <ellipse cx="32" cy="76" rx="8" ry="5" fill="#D4956A" opacity="0.2"/>
        <ellipse cx="88" cy="76" rx="8" ry="5" fill="#D4956A" opacity="0.2"/>
        <!-- Blink overlays: GSAP animates attr.ry 0 → 17 → 0 for blink -->
        <ellipse class="tarsier-blink" cx="42" cy="68" rx="17" ry="0" fill="#B08840"/>
        <ellipse class="tarsier-blink" cx="78" cy="68" rx="17" ry="0" fill="#B08840"/>
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

const parallax = ref(0)
const heroRef = ref<HTMLElement | null>(null)
const tarsierRef = ref<HTMLElement | null>(null)
let gsapCtx: gsap.Context | null = null

const stats = [
  { value: '50+', label: 'Tours' },
  { value: '2K+', label: 'Travelers' },
  { value: '4.9★', label: 'Rating' },
  { value: '10yr', label: 'Experience' },
]

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  gsapCtx = gsap.context(() => {
    const vw = window.innerWidth
    const isMobile = vw < 1024
    const speed = isMobile ? 0.65 : 1

    // ── Drifting clouds (continuous horizontal loop) ──────────────────────
    gsap.fromTo('[data-cloud="1"]',
      { x: -380 },
      { x: vw + 380, duration: 30 / speed, ease: 'none', repeat: -1 },
    )
    gsap.fromTo('[data-cloud="2"]',
      { x: vw + 300 },
      { x: -300, duration: 38 / speed, ease: 'none', repeat: -1, delay: 7 },
    )
    gsap.fromTo('[data-cloud="3"]',
      { x: -480 },
      { x: vw + 480, duration: 47 / speed, ease: 'none', repeat: -1, delay: 17 },
    )

    // ── Tarsier idle (desktop only, keeps things calm on mobile) ──────────
    if (tarsierRef.value && !isMobile) {
      // Gentle float
      gsap.to(tarsierRef.value, {
        y: -10,
        duration: 2.8,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })
      // Subtle sway
      gsap.to(tarsierRef.value, {
        rotation: 2.5,
        transformOrigin: 'bottom center',
        duration: 4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 1,
      })
      // Natural double-blink (SVG attr animation — no transform conflict)
      const blinkTl = gsap.timeline({ repeat: -1, repeatDelay: 3.5 })
      blinkTl
        .to('.tarsier-blink', { attr: { ry: 17 }, duration: 0.07, ease: 'power2.in' })
        .to('.tarsier-blink', { attr: { ry: 0 }, duration: 0.10, ease: 'power2.out', delay: 0.04 })
        .to('.tarsier-blink', { attr: { ry: 17 }, duration: 0.06, ease: 'power2.in', delay: 0.12 })
        .to('.tarsier-blink', { attr: { ry: 0 }, duration: 0.10, ease: 'power2.out' })
    }

    // ── Hero text scroll parallax (cinematic depth as hero exits viewport) ─
    const textWrap = heroRef.value?.querySelector<HTMLElement>('.max-w-3xl')
    if (textWrap) {
      gsap.to(textWrap, {
        scrollTrigger: {
          trigger: heroRef.value,
          start: 'top top',
          end: '75% top',
          scrub: 1.2,
        },
        y: isMobile ? -40 : -75,
        ease: 'none',
      })
    }
  })

  // Keep existing scroll-driven parallax on bg image (unchanged)
  const onScroll = () => { parallax.value = window.scrollY * 0.15 }
  window.addEventListener('scroll', onScroll, { passive: true })
  onUnmounted(() => window.removeEventListener('scroll', onScroll))
})

onUnmounted(() => {
  gsapCtx?.revert()
  gsapCtx = null
})
</script>
