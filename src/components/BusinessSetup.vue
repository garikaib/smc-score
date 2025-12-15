<script setup>
import { useAssessmentStore } from '../stores/assessment'

const store = useAssessmentStore()
</script>

<template>
  <div class="card bg-base-100">
    <div class="card-body">
      <h2 class="card-title">Business Profile</h2>
      <p>Please enter your business details to get started.</p>
      
      <div class="form-control w-full max-w-xs">
        <label class="label">
          <span class="label-text">Business Name</span>
        </label>
        <input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" v-model="store.businessProfile.name" />
      </div>

      <div class="form-control w-full max-w-xs">
        <label class="label">
            <span class="label-text">Sector</span>
        </label>
        <select class="select select-bordered" v-model="store.businessProfile.sector">
            <option disabled value="">Pick one</option>
            <option>Services</option>
            <option>Manufacturing</option>
            <option>Retail</option>
            <option>Technology</option>
            <option>Agriculture</option>
        </select>
       </div>

    </div>
  </div>
</template>
