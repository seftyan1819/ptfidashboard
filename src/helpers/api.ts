import { useAuthStore } from '@/stores'

export type ApiOptions = {
  formData?: boolean
  signal?: AbortSignal
  // hideError?: boolean
  refreshToken?: boolean
}

const wrapper =
  (method: 'get' | 'post' | 'put' | 'delete') =>
    async <TResponse = unknown, TRequest = unknown>(
      path: string,
      data?: TRequest,
      options?: ApiOptions
    ): Promise<TResponse> => {
      if (path.charAt(path.length - 1) !== '/') {
        console.warn(`URL path "${path}" should end with "/".`)
      }

      const baseUrl = import.meta.env.VITE_API_URL
      const auth = useAuthStore()

      let searchParams
      if (method === 'get' && data) {
        const params = data as Record<string, string>
        Object.keys(params).forEach(key =>
          params[key] === undefined ? delete params[key] : {}
        )
        searchParams =
        '?' + new URLSearchParams(params as Record<string, string>).toString()
      } else {
        searchParams = ''
      }

      const accessToken = !options?.refreshToken
        ? await auth.getAccessToken()
        : undefined

      const headers: Record<string, string> = { Accept: 'application/json' }
      if (!(data instanceof FormData)) {
        headers['Content-Type'] = 'application/json'
      }

      if (accessToken) {
        headers.Authorization = `Bearer ${accessToken}`
      }

      const response = await fetch(baseUrl + path + searchParams, {
        signal: options?.signal,
        method,
        headers,
        credentials: 'include',
        body:
          ['post', 'put', 'delete'].includes(method)
          && data !== null
          && data !== undefined
            ? data instanceof FormData ? data : JSON.stringify(data)
            : undefined,
      })

      let result
      try {
        result = await response.json()
      } catch {
        result = null
      }

      if (!response.ok) {
        // if (!options?.hideError) {
        //   app.showSnackbar({
        //     text: result?.detail ?? response.statusText,
        //     type: 'error',
        //   })
        // }

        throw {
          message: result?.detail ?? response.statusText,
          data: result,
        }
      }
      return result
    }

export const api = {
  get: wrapper('get'),
  post: wrapper('post'),
  put: wrapper('put'),
  delete: wrapper('delete'),
}
