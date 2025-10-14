<script setup lang="ts">
  import { useLogin } from '@/api/auth.api'
  import { useAuthStore } from '@/stores'
  import { object, string } from 'yup'

  // const router = useRouter()
  const auth = useAuthStore()

  const { errors, handleSubmit, defineField } = useForm({
    validationSchema: toTypedSchema(
      object({
        user_id: string().label('Username').required(),
        password: string().label('Password').required(),
      })
    ),
  })

  const [userId, userIdAttrs] = defineField('user_id')
  const [password, passwordAttrs] = defineField('password')

  const { mutate, isLoading } = useLogin(
    data => {
      auth.setAccessToken(data.access)
    },
  )
</script>

<template>
  <VCard class="my-4" :elevation="5">
    <form @submit.prevent="handleSubmit(mutate)()">
      <VCardText>
        <p class="text-h6 text-center pb-4">Login</p>
        <VTextField
          v-bind="userIdAttrs"
          v-model="userId"
          class="mb-4"
          color="primary"
          :error-messages="errors.user_id"
          hide-details="auto"
          label="Username"
          name="user_id"
          placeholder="Enter Username or ID"
          rounded="pill"
          variant="outlined"
        />
        <VTextField
          v-bind="passwordAttrs"
          v-model="password"
          color="primary"
          :error-messages="errors.password"
          hide-details="auto"
          label="Password"
          name="password"
          placeholder="Enter Password"
          rounded="pill"
          type="password"
          variant="outlined"
        />
      </VCardText>
      <VCardActions class="justify-center pb-6">
        <VBtn
          class="px-12 font-weight-bold"
          color="primary"
          :loading="isLoading"
          text="Login"
          type="submit"
          variant="elevated"
        />
      </VCardActions>
    </form>
  </VCard>
</template>
