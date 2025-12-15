<script setup>
import { ref, watch, computed } from 'vue'

const props = defineProps({
    modelValue: {
        type: Object,
        default: () => ({})
    },
    isNew: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['update:modelValue', 'save', 'cancel'])

const form = ref({ ...props.modelValue })

// Sync prop changes to form
watch(() => props.modelValue, (newVal) => {
    form.value = { ...newVal }
}, { deep: true })

function save() {
    emit('save', form.value)
}

const stages = [
    "Foundation & Legal",
    "Market & Offering",
    "Operational Strategy & Capability",
    "Financial Health & Economics",
    "Investment & Future Readiness"
]

const types = ["text", "select", "date", "scorable"]
</script>

<template>
  <div class="modal modal-open">
    <div class="modal-box w-11/12 max-w-2xl bg-base-100">
      <h3 class="font-bold text-lg mb-4">{{ isNew ? 'Add Question' : 'Edit Question' }}</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Stage -->
          <div class="form-control w-full">
            <label class="label"><span class="label-text">Stage</span></label>
            <select class="select select-bordered" v-model="form.stage">
                <option v-for="s in stages" :key="s">{{ s }}</option>
            </select>
          </div>

          <!-- Type -->
           <div class="form-control w-full">
            <label class="label"><span class="label-text">Type</span></label>
            <select class="select select-bordered" v-model="form.type">
                <option v-for="t in types" :key="t">{{ t }}</option>
            </select>
          </div>
          
           <!-- Indicator -->
          <div class="form-control w-full md:col-span-2">
            <label class="label"><span class="label-text">Indicator (Internal Ref)</span></label>
            <input type="text" class="input input-bordered" v-model="form.indicator" placeholder="e.g. Market Readiness" />
          </div>

           <!-- Question -->
          <div class="form-control w-full md:col-span-2">
            <label class="label"><span class="label-text">Question Text (User Facing)</span></label>
            <input type="text" class="input input-bordered" v-model="form.question" placeholder="e.g. How big is the market?" />
          </div>

          <!-- Key Text / Example -->
          <div class="form-control w-full md:col-span-2">
            <label class="label"><span class="label-text">Example / Key Text</span></label>
            <input type="text" class="input input-bordered" v-model="form.key_text" />
            <label class="label"><span class="label-text-alt">Shown in italics below the question</span></label>
          </div>
          
           <!-- Guidance -->
          <div class="form-control w-full md:col-span-2">
            <label class="label"><span class="label-text">Guidance</span></label>
            <textarea class="textarea textarea-bordered h-24" v-model="form.guidance"></textarea>
          </div>

          <!-- Options (if Select) -->
          <div v-if="form.type === 'select'" class="form-control w-full md:col-span-2">
             <label class="label"><span class="label-text">Options (comma separated)</span></label>
             <input type="text" class="input input-bordered" 
                    :value="form.options ? form.options.join(', ') : ''" 
                    @input="e => form.options = e.target.value.split(',').map(s => s.trim())" 
              />
          </div>

      </div>

      <div class="modal-action">
        <button class="btn btn-ghost" @click="$emit('cancel')">Cancel</button>
        <button class="btn btn-secondary text-white" @click="save">Save</button>
      </div>
    </div>
  </div>
</template>
