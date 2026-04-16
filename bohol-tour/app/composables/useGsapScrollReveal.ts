import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Additive GSAP scroll animations — safe alongside the existing .sr system.
 *
 * Attribute targets:
 *   data-gsap="reveal-img"  → slide-up entrance (transform only, clearProps
 *                              restores hover:scale after animation)
 *   data-gsap="reveal"      → fade + slide-up (use ONLY on elements without .sr)
 *   data-gsap="stagger"     → stagger direct children (use ONLY on containers
 *                              whose children do NOT already have .sr class)
 */
export const useGsapScrollReveal = () => {
  let ctx: gsap.Context | null = null

  onMounted(() => {
    gsap.registerPlugin(ScrollTrigger)

    ctx = gsap.context(() => {
      // ── Image entrance: y-only so hover:scale still works after ──────────
      gsap.utils.toArray<HTMLElement>('[data-gsap="reveal-img"]').forEach((el) => {
        const triggerEl = el.closest<HTMLElement>('[class*="overflow-hidden"]') ?? el
        gsap.from(el, {
          y: 24,
          duration: 1.05,
          ease: 'power2.out',
          clearProps: 'transform',
          scrollTrigger: {
            trigger: triggerEl,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        })
      })

      // ── Generic fade-up (only for elements without .sr class) ────────────
      gsap.utils.toArray<HTMLElement>('[data-gsap="reveal"]').forEach((el) => {
        gsap.from(el, {
          y: 36,
          opacity: 0,
          duration: 0.95,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: el,
            start: 'top 86%',
            toggleActions: 'play none none none',
          },
        })
      })

      // ── Stagger children (only for containers whose children lack .sr) ───
      gsap.utils.toArray<HTMLElement>('[data-gsap="stagger"]').forEach((container) => {
        const items = Array.from(container.querySelectorAll<HTMLElement>(':scope > *'))
        if (!items.length) return
        gsap.from(items, {
          y: 42,
          opacity: 0,
          duration: 0.72,
          stagger: 0.1,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: container,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        })
      })
    })
  })

  onUnmounted(() => {
    ctx?.revert()
    ctx = null
  })
}
