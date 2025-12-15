<script setup>
import { computed, ref, defineAsyncComponent } from 'vue'
import draggable from 'vuedraggable'
import { useAssessmentStore } from '../../stores/assessment'
import QuestionForm from './QuestionForm.vue'

const props = defineProps(['type'])
const store = useAssessmentStore()

// Access the specific assessment items from store config
// Using a computed with get/set for vuedraggable v-model
const items = computed({
    get: () => store.config.assessments[props.type].items,
    set: (val) => store.reorderQuestions(props.type, val)
})

const editingItem = ref(null)
const isAddingKey = ref(false)

function edit(item) {
    editingItem.value = { ...item }
    isAddingKey.value = false
}

function add() {
    editingItem.value = { 
        stage: 'Market & Offering',
        type: 'scorable',
        question: '',
        indicator: ''
    }
    isAddingKey.value = true
}

function save(data) {
    if (isAddingKey.value) {
        store.addQuestion(props.type, data)
    } else {
        store.updateQuestion(props.type, data.id, data)
    }
    editingItem.value = null
}

function remove(id) {
    if (confirm('Are you sure you want to delete this question?')) {
        store.deleteQuestion(props.type, id)
    }
}
</script>

<template>
  <div class="p-4">
    <div class="flex justify-between items-center mb-4">
        <h3 class="text-xl font-bold uppercase text-secondary">{{ type }} Assessment Questions</h3>
        <button class="btn btn-secondary btn-sm text-white" @click="add">+ Add Question</button>
    </div>

    <draggable 
        v-model="items" 
        item-key="id" 
        class="space-y-2"
        ghost-class="opacity-50"
    >
        <template #item="{element}">
            <div class="card bg-base-100 border border-base-200 p-3 flex flex-row items-center gap-4 cursor-move hover:shadow-md transition-shadow">
                <div class="cursor-grab text-base-content/40">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/></svg>
                </div>
                <div class="flex-1">
                    <div class="flex items-center gap-2 mb-1">
                        <span class="badge badge-sm badge-outline">{{ element.stage }}</span>
                        <span class="badge badge-sm badge-ghost">{{ element.type }}</span>
                    </div>
                    <p class="font-medium text-sm">{{ element.question || element.indicator }}</p>
                </div>
                <div class="flex gap-2">
                    <button class="btn btn-square btn-ghost btn-sm" @click="edit(element)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                    </button>
                    <button class="btn btn-square btn-ghost btn-sm text-error" @click="remove(element.id)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                </div>
            </div>
        </template>
    </draggable>

    <QuestionForm 
        v-if="editingItem" 
        :modelValue="editingItem" 
        :isNew="isAddingKey"
        @save="save" 
        @cancel="editingItem = null" 
    />
  </div>
</template>
