export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) return

  const { isAuthenticated } = useAuth()

  if (!isAuthenticated.value && to.path !== '/admin/login') {
    return navigateTo('/admin/login')
  }

  if (isAuthenticated.value && to.path === '/admin/login') {
    return navigateTo('/admin')
  }
})
