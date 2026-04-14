<template>
  <section id="contact" class="py-28 bg-white overflow-hidden relative">
    <!-- Background dot grid -->
    <div class="absolute inset-0 dot-grid opacity-40 pointer-events-none" />

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-16 items-start">

        <!-- ── Left ────────────────────────────────── -->
        <div>
          <div class="flex items-center gap-3 mb-5 sr">
            <div class="h-px w-8 bg-gradient-to-r from-ocean-600 to-transparent" />
            <span class="text-ocean-600 text-xs font-bold uppercase tracking-[0.2em]">Get In Touch</span>
          </div>

          <h2 class="font-display text-[clamp(2rem,5vw,3.25rem)] font-bold text-slate-900 leading-tight mb-6 sr sr-d1">
            Let's plan your<br />
            <span class="text-gradient">dream trip</span>
          </h2>

          <p class="text-slate-500 text-lg leading-relaxed mb-12 max-w-md sr sr-d2">
            Drop us a message and our Bohol specialists will get back to you within a few hours.
          </p>

          <!-- Contact cards -->
          <div class="space-y-4">
            <div
              v-for="(info, i) in contactInfo"
              :key="info.label"
              class="group flex items-center gap-4 p-4 rounded-2xl border border-slate-100 bg-white hover:bg-slate-50 hover:border-ocean-100 transition-all duration-300 shadow-sm hover:shadow-card cursor-default sr"
              :class="`sr-d${i + 2}`"
            >
              <div class="w-11 h-11 bg-ocean-50 group-hover:bg-ocean-100 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300 group-hover:scale-110 transition-transform">
                <svg class="w-5 h-5 text-ocean-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" :d="info.icon" />
                </svg>
              </div>
              <div>
                <div class="text-2xs font-bold text-slate-400 uppercase tracking-widest mb-0.5">{{ info.label }}</div>
                <div class="text-slate-800 font-semibold text-sm">{{ info.value }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- ── Right: Form ─────────────────────────── -->
        <div class="sr sr-right">
          <div class="bg-white rounded-4xl p-8 shadow-xl-soft border border-slate-100/80">
            <!-- Success state -->
            <Transition
              enter-active-class="transition duration-400 ease-spring"
              enter-from-class="opacity-0 scale-95"
              enter-to-class="opacity-100 scale-100"
            >
              <div v-if="sent" class="py-10 text-center">
                <div class="relative w-16 h-16 mx-auto mb-5">
                  <div class="absolute inset-0 bg-green-200 rounded-full animate-ping-slow opacity-50" />
                  <div class="relative w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <h3 class="text-lg font-bold text-slate-900 mb-2">Message Sent!</h3>
                <p class="text-slate-500 text-sm">We'll reply to you within a few hours. Salamat! 🌴</p>
              </div>
            </Transition>

            <form v-if="!sent" @submit.prevent="handleSubmit" class="space-y-4">
              <div class="mb-6">
                <h3 class="font-bold text-slate-900 text-lg">Send Us a Message</h3>
                <p class="text-slate-400 text-sm mt-1">We usually respond within 2–3 hours</p>
              </div>

              <div class="grid sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Name</label>
                  <input
                    v-model="form.name"
                    type="text"
                    placeholder="Your name"
                    required
                    class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent focus:bg-white transition-all duration-200"
                  />
                </div>
                <div>
                  <label class="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Email</label>
                  <input
                    v-model="form.email"
                    type="email"
                    placeholder="your@email.com"
                    required
                    class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent focus:bg-white transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Subject</label>
                <input
                  v-model="form.subject"
                  type="text"
                  placeholder="Tour inquiry, custom package, group booking..."
                  class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent focus:bg-white transition-all duration-200"
                />
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Message</label>
                <textarea
                  v-model="form.message"
                  rows="4"
                  placeholder="Tell us about your dream Bohol trip — group size, dates, interests..."
                  required
                  class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-transparent focus:bg-white transition-all duration-200 resize-none"
                />
              </div>

              <button
                type="submit"
                :disabled="loading"
                class="group w-full py-4 bg-ocean-600 hover:bg-ocean-700 disabled:bg-ocean-400 text-white font-bold rounded-xl transition-all duration-300 btn-press flex items-center justify-center gap-3 hover:shadow-glow-ocean relative overflow-hidden"
              >
                <div class="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-600 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
                <svg v-if="loading" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <span class="relative">{{ loading ? 'Sending...' : 'Send Message' }}</span>
                <svg v-if="!loading" class="relative w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
useScrollReveal()

const form = reactive({ name: '', email: '', subject: '', message: '' })
const loading = ref(false)
const sent = ref(false)

const contactInfo = [
  {
    label: 'Address',
    value: 'Tagbilaran City, Bohol, Philippines 6300',
    icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
  },
  {
    label: 'Phone',
    value: '+63 (38) 412-0000',
    icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
  },
  {
    label: 'Email',
    value: 'hello@bohol-tours.ph',
    icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  },
  {
    label: 'Hours',
    value: 'Mon–Sat: 7:00 AM – 7:00 PM',
    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
  },
]

const handleSubmit = async () => {
  loading.value = true
  await new Promise((r) => setTimeout(r, 1200))
  loading.value = false
  sent.value = true
}
</script>
