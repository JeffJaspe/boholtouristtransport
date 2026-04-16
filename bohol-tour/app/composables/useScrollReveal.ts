/**
 * Attaches IntersectionObserver to all elements with class `.sr`
 * and adds `.sr-visible` when they enter the viewport.
 * Call once per page/layout with onMounted.
 */
export const useScrollReveal = (threshold = 0.12) => {
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (typeof IntersectionObserver === 'undefined') return

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('sr-visible')
            observer?.unobserve(entry.target)
          }
        })
      },
      { threshold, rootMargin: '0px 0px -40px 0px' },
    )

    document.querySelectorAll('.sr').forEach((el) => observer!.observe(el))
  })

  onUnmounted(() => {
    observer?.disconnect()
    observer = null
  })
}
