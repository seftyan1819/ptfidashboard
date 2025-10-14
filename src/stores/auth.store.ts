import { getUser, refreshToken, type User } from '@/api/auth.api'
import dayjs from 'dayjs'
import { decodeJwt } from 'jose'

export const useAuthStore = defineStore('auth', () => {
  // states
  const accessToken = ref<string>()
  const accessExpired = ref<number>()
  const user = ref<User>()
  const ready = ref(false)

  // getters
  const isLoggedIn = computed(() => accessToken.value)

  // actions
  const setAccessToken = async (token: string) => {
    accessToken.value = token
    user.value = await getUser()
  }
  const clearAccessToken = () => {
    accessToken.value = undefined
    user.value = undefined
  }
  const getAccessToken = async () => {
    if (accessToken.value && dayjs(accessExpired.value).diff() < 5000) {
      await refreshLogin()
    }
    return accessToken.value
  }
  const refreshLogin = async () => {
    try {
      const result = await refreshToken({ refreshToken: true })
      accessToken.value = result.access
      const jwt = decodeJwt(result.access)
      accessExpired.value = jwt.exp! * 1000
      if (!user.value) {
        user.value = await getUser()
      }
    } catch {
      accessToken.value = undefined
    } finally {
      ready.value = true
    }
  }

  return {
    user,
    isLoggedIn,
    ready,
    setAccessToken,
    getAccessToken,
    clearAccessToken,
    refreshLogin,
  }
})
