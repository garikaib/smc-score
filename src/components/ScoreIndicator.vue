<script setup>
import { defineProps } from 'vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const bands = [
    { label: 'Great', value: 15, class: 'btn-secondary text-white' }, // Teal
    { label: 'Good', value: 10, class: 'btn-info text-white' },  // Keep info for distinction, or use Accent
    { label: 'Borderline', value: 5, class: 'btn-accent text-white' }, // Gold
    { label: 'Flag', value: -5, class: 'btn-primary text-white' } // Red
]

function select(val) {
    emit('update:modelValue', val)
}
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <button 
        v-for="band in bands" 
        :key="band.value"
        class="btn btn-sm"
        :class="[
            band.class, 
            modelValue === band.value ? 'ring-2 ring-offset-2 ring-black' : 'opacity-60 hover:opacity-100'
        ]"
        @click="select(band.value)"
    >
        {{ band.label }}
    </button>
  </div>
</template>
