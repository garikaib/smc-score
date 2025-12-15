<script setup>
import { useAssessmentStore } from '../stores/assessment'
import { assessmentConfig } from '../data/assessment-config'

const { startAssessment } = useAssessmentStore()
const emit = defineEmits(['start'])

function select(type) {
    startAssessment(type)
    emit('start')
}
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div v-for="(assessment, key) in assessmentConfig.assessments" :key="key" class="card w-full bg-base-100 shadow-xl border border-base-200">
      <div class="card-body">
        <h2 class="card-title">{{ assessment.title }}</h2>
        <p>Evaluate your business readiness using our {{ key }} framework.</p>
        <div class="card-actions justify-end">
          <button class="btn btn-secondary text-white" @click="select(key)">Start Assessment</button>
        </div>
      </div>
    </div>
  </div>
</template>
