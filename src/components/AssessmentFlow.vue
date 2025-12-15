<script setup>
import { ref, computed } from 'vue'
import { useAssessmentStore } from '../stores/assessment'
import { storeToRefs } from 'pinia'
import ScoreIndicator from './ScoreIndicator.vue'

const store = useAssessmentStore()
const { currentAssessment, maxPossibleScore, answers } = storeToRefs(store)
const emit = defineEmits(['complete'])

// Group questions by stage
const stages = computed(() => {
    if (!currentAssessment.value) return []
    const groups = {}
    currentAssessment.value.items.forEach(item => {
        if (!groups[item.stage]) groups[item.stage] = []
        groups[item.stage].push(item)
    })
    return Object.keys(groups).map(key => ({
        name: key,
        items: groups[key]
    }))
})

const currentStageIndex = ref(0)
const currentStage = computed(() => stages.value[currentStageIndex.value])

function nextStage() {
    if (currentStageIndex.value < stages.value.length - 1) {
        currentStageIndex.value++
    } else {
        emit('complete')
    }
}

function prevStage() {
    if (currentStageIndex.value > 0) {
        currentStageIndex.value--
    }
}

function updateAnswer(id, val) {
    store.setAnswer(id, val)
}
</script>

<template>
  <div v-if="currentStage">
    
    <!-- Progress -->
    <div class="mb-6">
        <h3 class="text-lg font-bold mb-2">{{ currentStage.name }}</h3>
        <progress class="progress progress-primary w-full" :value="currentStageIndex + 1" :max="stages.length + 1"></progress> <!-- +1 for review step -->
        <div class="text-xs text-right mt-1">Stage {{ currentStageIndex + 1 }} of {{ stages.length }}</div>
    </div>

    <!-- Questions -->
    <div class="space-y-6">
        <div v-for="item in currentStage.items" :key="item.id" class="card bg-base-100 border border-base-200 p-4 shadow-sm hover:shadow-md transition-shadow">
            
            <div class="flex flex-col md:flex-row justify-between gap-4">
                <div class="md:w-2/3">
                    <div class="badge badge-secondary badge-outline mb-2">{{ item.indicator }}</div>
                    <p class="font-medium text-lg">{{ item.question || item.indicator }}</p>
                    <p v-if="item.key_text && item.type === 'scorable'" class="text-sm text-base-content/60 mt-1 italic">{{ item.key_text }}</p>
                    <p v-if="item.guidance" class="text-sm text-base-content/70 mt-1">{{ item.guidance }}</p>
                </div>

                <div class="md:w-1/3 flex items-center justify-end">
                    <!-- Text Input -->
                    <div v-if="item.type === 'text'" class="w-full">
                         <input 
                            type="text" 
                            class="input input-bordered w-full" 
                            :value="answers[item.id]" 
                            @input="e => updateAnswer(item.id, e.target.value)"
                            placeholder="Type here..."
                          />
                    </div>

                    <!-- Select Input -->
                    <div v-else-if="item.type === 'select'" class="w-full">
                        <select 
                            class="select select-bordered w-full"
                            :value="answers[item.id] || ''" 
                            @change="e => updateAnswer(item.id, e.target.value)"
                        >
                             <option disabled selected value="">Pick one</option>
                             <option v-for="opt in item.options" :key="opt">{{ opt }}</option>
                        </select>
                    </div>
                    
                    <!-- Date Input (Month/Year) -->
                     <div v-else-if="item.type === 'date'" class="w-full">
                         <input 
                            type="month" 
                            class="input input-bordered w-full" 
                            :value="answers[item.id]" 
                            @input="e => updateAnswer(item.id, e.target.value)"
                          />
                    </div>

                    <!-- Scoring Mode -->
                    <div v-else-if="item.type === 'scorable'">
                        <ScoreIndicator 
                            :modelValue="answers[item.id]" 
                            @update:modelValue="val => updateAnswer(item.id, val)" 
                        />
                    </div>
                </div>
            </div>

        </div>
    </div>

    <!-- Navigation -->
    <div class="flex justify-between mt-8">
        <button class="btn btn-ghost" @click="prevStage" :disabled="currentStageIndex === 0">Back</button>
        <button class="btn btn-secondary text-white" @click="nextStage">
            {{ currentStageIndex === stages.length - 1 ? 'Finish & Review' : 'Next Stage' }}
        </button>
    </div>

  </div>
</template>
