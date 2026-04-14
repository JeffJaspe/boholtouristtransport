<template>
  <div>
    <SectionsHeroSection />
    <SectionsFeaturedTours />
    <SectionsWhyChooseUs />
    <SectionsTestimonialsSection />
    <SectionsGallerySection />
    <SectionsContactSection />
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })

useSeoMeta({
  title: 'Bohol Tourist Transport | Explore Bohol Like Never Before',
  description:
    'Premium Bohol tour packages — Chocolate Hills, island hopping, tarsiers, beaches, and more. Book your adventure today.',
  ogTitle: 'Bohol Tourist Transport',
  ogDescription: 'Explore Bohol\'s wonders with our curated tour packages.',
  ogImage: 'https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=1200&q=80',
})
</script>
