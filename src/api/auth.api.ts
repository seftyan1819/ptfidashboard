import { api, type ApiOptions } from '@/helpers/api'

export type User = {
  user_id: string
  role: string
}
export type LoginData = { user_id: string; password: string }
export type TokenResponse = { access: string; refresh: string }
export type RefreshTokenResponse = { access: string }

export const obtainToken = (data: LoginData, options?: ApiOptions) =>
  api.post<TokenResponse>('auth/token/', data, options)
export const refreshToken = (options?: ApiOptions) =>
  api.post<RefreshTokenResponse>('auth/token/refresh/', null, options)
export const submitLogout = () => api.post('auth/logout/', null)

export const getUser = (options?: ApiOptions) =>
  api.get<User>(`auth/user/`, null, options)

export const useLogin = (
  onSuccess: (data: TokenResponse) => void,
  onError?: (error: Error) => void,
) =>
  useMutation<TokenResponse, LoginData>({
    mutation: async data => await obtainToken(data),
    onSuccess,
    onError,
  })
export const useLogout = (
  onSuccess: () => void,
  onError?: (error: Error) => void,
) =>
  useMutation({
    mutation: submitLogout,
    onSuccess,
    onError,
  })

export const useAccount = () => useQuery({
  query: context => getUser(context),
  key: ['account'],
})
