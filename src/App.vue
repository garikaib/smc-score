<script setup>
import { computed, ref } from 'vue'
import logo from './assets/logo.jpg'
import PasswordProtection from './components/PasswordProtection.vue'
import { useAssessmentStore } from './stores/assessment'
import { storeToRefs } from 'pinia'
import BusinessSetup from './components/BusinessSetup.vue'
import AssessmentSelect from './components/AssessmentSelect.vue'
import AssessmentFlow from './components/AssessmentFlow.vue'
import ResultsDashboard from './components/ResultsDashboard.vue'
import AdminDashboard from './components/admin/AdminDashboard.vue'

const store = useAssessmentStore()
const { currentAssessmentId } = storeToRefs(store)

const showResults = ref(false)
const showAdmin = ref(false)

const currentView = computed(() => {
    if (showAdmin.value) return 'admin'
    if (showResults.value) return 'results'
    if (!currentAssessmentId.value) return 'setup'
    return 'assessment'
})

function onAssessmentComplete() {
    showResults.value = true
}
</script>

<template>
  <PasswordProtection>
    <div class="min-h-screen bg-base-200 p-4 font-sans text-base-content">
      <div class="max-w-4xl mx-auto bg-base-100 rounded-lg shadow-xl overflow-hidden min-h-[600px] flex flex-col">
        <!-- Header -->
        <!-- Header -->
        <header class="bg-base-100 border-b border-base-200 p-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div class="flex items-center gap-4">
              <img :src="logo" alt="SMC Logo" class="h-16 w-auto object-contain" />
              <div>
                  <h1 class="text-2xl font-bold text-secondary">Business Assessment</h1>
                  <p class="text-sm text-base-content/70">Evaluate your business readiness</p>
              </div>
          </div>
          
          <div v-if="currentAssessmentId" class="badge badge-accent badge-outline font-semibold uppercase tracking-wider">
              {{ currentAssessmentId }}
          </div>
        </header>
        
        <!-- Main Content Area -->
        <main class="flex-1 p-6">
          
          <div v-if="!currentAssessmentId" class="space-y-8">
              <BusinessSetup />
              <div class="divider">THEN</div>
              <AssessmentSelect @start="() => {}" />
          </div>

          <div v-else-if="currentView === 'admin'">
              <AdminDashboard @close="showAdmin = false" />
          </div>

          <div v-else-if="currentView === 'results'">
              <ResultsDashboard />
          </div>

          <div v-else>
              <AssessmentFlow @complete="onAssessmentComplete" />
          </div>

        </main>

        <!-- Footer -->
        <footer class="bg-base-200 p-4 text-center text-sm text-base-content/60 flex justify-between items-center">
          <span>Results are indicative. Consult a professional for detailed advice.</span>
          <button class="btn btn-xs btn-ghost opacity-50 hover:opacity-100" @click="showAdmin = true">Admin</button>
        </footer>
      </div>
    </div>
  </PasswordProtection>
</template>

<style scoped>
/* Scoped styles if needed, but Tailwind should handle most */
</style>
