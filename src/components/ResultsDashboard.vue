<script setup>
import { useAssessmentStore } from '../stores/assessment'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { ref } from 'vue'

const store = useAssessmentStore()
const { readinessRating, totalScore, maxPossibleScore, scoresByStage, flaggedItems, businessProfile } = storeToRefs(store)

const reportRef = ref(null)
const isExporting = ref(false)

async function exportPDF() {
    if (!reportRef.value) return
    isExporting.value = true
    
    try {
        const element = reportRef.value
        const canvas = await html2canvas(element, {
            scale: 2, // Higher resolution
            useCORS: true,
            logging: false
        })
        
        const imgData = canvas.toDataURL('image/png')
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        })
        
        const imgWidth = 210
        const imgHeight = (canvas.height * imgWidth) / canvas.width
        
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
        pdf.save(`SMC_Assessment_${businessProfile.value.name || 'Report'}.pdf`)
    } catch (error) {
        console.error('Export failed', error)
        alert('Failed to generate PDF. Please try again.')
    } finally {
        isExporting.value = false
    }
}

const readinessClass = computed(() => {
    const level = readinessRating.value.level
    if (level === 'Strong readiness') return 'text-success'
    if (level === 'Moderate readiness') return 'text-info'
    if (level === 'Weak readiness') return 'text-warning'
    return 'text-error'
})

const gaugeColor = computed(() => {
     const level = readinessRating.value.level
    if (level === 'Strong readiness') return 'text-success'
    if (level === 'Moderate readiness') return 'text-info'
    if (level === 'Weak readiness') return 'text-warning'
    return 'text-error'
})
</script>

<template>
  <div class="space-y-8 animate-fade-in">
    
    <!-- Top Summary -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="card bg-base-100 shadow border border-base-200">
            <div class="card-body text-center">
                <h3 class="card-title justify-center">Overall Readiness</h3>
                <div class="radial-progress mx-auto my-4" :class="gaugeColor" :style="`--value:${readinessRating.percent}; --size:8rem;`">
                    <span class="text-3xl font-bold text-base-content">{{ readinessRating.percent }}%</span>
                </div>
                <div class="text-xl font-bold" :class="readinessClass">{{ readinessRating.level }}</div>
                <p class="text-sm text-base-content/60">Total Score: {{ totalScore }} / {{ maxPossibleScore }}</p>
            </div>
        </div>

        <div class="card bg-base-100 shadow border border-base-200">
            <div class="card-body">
                <h3 class="card-title">Analysis</h3>
                <div v-if="flaggedItems.length > 0">
                    <div class="alert alert-error shadow-sm mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        <span>{{ flaggedItems.length }} Critical Red Flags found.</span>
                    </div>
                     <ul class="list-disc list-inside text-sm space-y-1">
                        <li v-for="item in flaggedItems" :key="item.id" class="text-error font-medium">
                            {{ item.indicator }}
                        </li>
                    </ul>
                </div>
                <div v-else class="alert alert-success shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>No critical flags identified!</span>
                </div>
            </div>
        </div>
    </div>

    <!-- Stage Breakdown -->
    <div>
        <h3 class="text-xl font-bold mb-4">Stage Breakdown</h3>
        <div class="overflow-x-auto">
            <table class="table w-full">
                <thead>
                    <tr>
                        <th>Stage</th>
                        <th>Score</th>
                        <th>Status</th>
                        <th>Items</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(data, stageName) in scoresByStage" :key="stageName">
                        <td class="font-medium">{{ stageName }}</td>
                        <td>
                             <div class="flex items-center gap-2">
                                <progress class="progress progress-primary w-20" :value="data.total" :max="data.max"></progress>
                                <span class="text-xs">{{ data.total }}/{{ data.max }}</span>
                             </div>
                        </td>
                        <td>
                            <span v-if="data.flags > 0" class="badge badge-error gap-1 text-white">
                                {{ data.flags }} Flags
                            </span>
                            <span v-else-if="data.total/data.max < 0.5" class="badge badge-warning text-white">Weak</span>
                            <span v-else class="badge badge-success text-white">Good</span>
                        </td>
                         <td class="text-xs text-base-content/60">
                             {{ data.items.length }} indicators
                         </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <!-- Actions -->
    <div class="flex justify-center pt-8">
        <button class="btn btn-outline btn-secondary" @click="exportPDF" :disabled="isExporting">
            <span v-if="isExporting" class="loading loading-spinner"></span>
            {{ isExporting ? 'Generating...' : 'Download PDF Report' }}
        </button>
    </div>

    <!-- Hidden Report Template (Visible to html2canvas) -->
    <div class="fixed top-0 left-[-9999px] w-[210mm] min-h-[297mm] p-10 font-sans" style="background-color: #ffffff; color: #000000;" ref="reportRef">
        
        <!-- Header -->
        <div class="flex justify-between items-start pb-4 mb-8" style="border-bottom: 2px solid #A50000;">
            <img src="/logo.jpg" alt="SMC" class="h-20 w-auto object-contain" />
            <div class="text-right">
                <h1 class="text-3xl font-bold" style="color: #0E966C;">Readiness Report</h1>
                <p style="color: #6b7280;">{{ new Date().toLocaleDateString() }}</p>
            </div>
        </div>

        <!-- Business Info -->
        <div class="mb-8 p-4 rounded-lg" style="background-color: #f9fafb; border-left: 4px solid #0E966C;">
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <span class="block text-xs uppercase tracking-wide" style="color: #6b7280;">Business Name</span>
                    <span class="text-lg font-bold">{{ businessProfile.name || 'N/A' }}</span>
                </div>
                <div>
                     <span class="block text-xs uppercase tracking-wide" style="color: #6b7280;">Sector</span>
                     <span class="text-lg">{{ businessProfile.sector || 'N/A' }}</span>
                </div>
            </div>
        </div>

        <!-- Score Summary -->
        <div class="flex items-center gap-8 mb-8">
            <div class="w-1/3 text-center">
                 <!-- Simple CSS Gauge instead of daisyui component -->
                 <div class="mx-auto flex items-center justify-center rounded-full" 
                      style="width: 6rem; height: 6rem; border: 8px solid #0E966C;">
                    <span class="text-2xl font-bold" style="color: #000000;">{{ readinessRating.percent }}%</span>
                </div>
                <div class="text-sm font-bold mt-2 uppercase" style="color: #4b5563;">Readiness Score</div>
            </div>
            <div class="w-2/3">
                 <h2 class="text-2xl font-bold" :style="{
                    color: readinessRating.level === 'Critical gaps' ? '#A50000' : 
                           readinessRating.level === 'Weak readiness' ? '#E6A300' : '#0E966C'
                 }">{{ readinessRating.level }}</h2>
                 <p class="mt-1" style="color: #4b5563;">Based on a total score of {{ totalScore }} out of a possible {{ maxPossibleScore }}.</p>
            </div>
        </div>

        <!-- Flags -->
        <div v-if="flaggedItems.length > 0" class="mb-8">
            <h3 class="text-lg font-bold mb-2 pb-1" style="color: #A50000; border-bottom: 1px solid #e5e7eb;">Critical Red Flags</h3>
            <ul class="list-disc list-inside space-y-1">
                <li v-for="item in flaggedItems" :key="item.id" style="color: #1f2937;">
                    <span class="font-semibold">{{ item.indicator }}:</span> {{ item.question }}
                </li>
            </ul>
        </div>

        <!-- Detailed Breakdown -->
        <div class="mb-8">
             <h3 class="text-lg font-bold mb-4 pb-1" style="color: #0E966C; border-bottom: 1px solid #e5e7eb;">Stage Breakdown</h3>
             <table class="w-full text-sm">
                <thead>
                    <tr class="text-left" style="background-color: #f3f4f6;">
                        <th class="p-2">Stage</th>
                        <th class="p-2">Score</th>
                        <th class="p-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(data, stageName) in scoresByStage" :key="stageName" style="border-bottom: 1px solid #f3f4f6;">
                        <td class="p-2 font-medium">{{ stageName }}</td>
                        <td class="p-2">
                             <div class="flex items-center gap-2">
                                <div class="w-24 rounded-full h-2" style="background-color: #e5e7eb;">
                                    <div class="h-2 rounded-full" style="background-color: #0E966C;" :style="`width: ${(data.total/data.max)*100}%`"></div>
                                </div>
                                <span>{{ data.total }}/{{ data.max }}</span>
                             </div>
                        </td>
                        <td class="p-2">
                             <span v-if="data.flags > 0" class="font-bold" style="color: #A50000;">{{ data.flags }} Flags</span>
                             <span v-else-if="data.total/data.max < 0.5" class="font-bold" style="color: #E6A300;">Weak</span>
                             <span v-else class="font-bold" style="color: #0E966C;">Good</span>
                        </td>
                    </tr>
                </tbody>
             </table>
        </div>

        <!-- Footer -->
        <div class="mt-auto pt-8 text-center text-xs" style="color: #6b7280; border-top: 1px solid #e5e7eb;">
            <p>Social Marketing Centre Assessment | Generated on {{ new Date().toLocaleDateString() }}</p>
        </div>

    </div>

  </div>
</template>
