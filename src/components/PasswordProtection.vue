<script setup>
import { ref, onMounted } from 'vue'

const isAuthenticated = ref(false)
const password = ref('')
const error = ref('')

const CORRECT_PASSWORD = 'smc' // Simple basic password

onMounted(() => {
  if (localStorage.getItem('smc_auth') === 'true') {
    isAuthenticated.value = true
  }
})

function checkPassword() {
  if (password.value === CORRECT_PASSWORD) {
    isAuthenticated.value = true
    localStorage.setItem('smc_auth', 'true')
    error.value = ''
  } else {
    error.value = 'Incorrect password'
    password.value = ''
  }
}
</script>

<template>
  <div v-if="!isAuthenticated" class="min-h-screen bg-base-200 flex items-center justify-center p-4">
    <div class="card w-full max-w-sm shadow-2xl bg-base-100">
      <div class="card-body">
        <h2 class="card-title justify-center text-primary mb-4">Access Restricted</h2>
        <p class="text-center text-base-content/70 mb-4">Please enter the password to continue.</p>
        
        <form @submit.prevent="checkPassword" class="form-control gap-4">
          <input 
            v-model="password" 
            type="password" 
            placeholder="Password" 
            class="input input-bordered w-full" 
            autofocus
          />
          <span v-if="error" class="text-error text-sm text-center">{{ error }}</span>
          <button type="submit" class="btn btn-primary w-full">Enter</button>
        </form>
      </div>
    </div>
  </div>
  
  <slot v-else></slot>
</template>
