<script setup>
import { ref } from 'vue'
import { useAssessmentStore } from '../../stores/assessment'
import QuestionList from './QuestionList.vue'

const store = useAssessmentStore()
const activeTab = ref('basic')
</script>

<template>
  <div class="p-6 bg-base-200 min-h-screen">
    <div class="max-w-5xl mx-auto">
        
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold text-secondary">Admin Configuration</h1>
            <div class="flex gap-2">
                 <button class="btn btn-outline btn-secondary" @click="store.exportConfig">
                    Export JSON
                </button>
                <button class="btn btn-ghost" @click="$emit('close')">Exit</button>
            </div>
        </div>

        <div class="bg-base-100 rounded-lg shadow-xl overflow-hidden min-h-[600px]">
            <!-- Tabs -->
            <div class="tabs tabs-boxed bg-base-100 p-4 border-b border-base-200 justify-start rounded-none">
                <a class="tab tab-lg" 
                   :class="{ 'tab-active': activeTab === 'basic' }"
                   @click="activeTab = 'basic'">Basic Assessment</a> 
                <a class="tab tab-lg" 
                   :class="{ 'tab-active': activeTab === 'advanced' }"
                   @click="activeTab = 'advanced'">Advanced Assessment</a>
            </div>

            <!-- Content -->
            <div class="p-0">
                <QuestionList v-if="activeTab === 'basic'" type="basic" />
                <QuestionList v-if="activeTab === 'advanced'" type="advanced" key="advanced" />
            </div>
        </div>

    </div>
  </div>
</template>
