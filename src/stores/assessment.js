import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { assessmentConfig } from '../data/assessment-config'

export const useAssessmentStore = defineStore('assessment', () => {
    // State
    const config = ref(assessmentConfig) // Reactive config
    const answerState = reactive({}) // questionId -> value
    const currentAssessmentId = ref(null)
    const businessProfile = reactive({
        sector: '',
        location: '',
        name: ''
    })

    // Actions
    function startAssessment(id) {
        if (config.value.assessments[id]) {
            currentAssessmentId.value = id
        }
    }

    function setAnswer(questionId, value) {
        answerState[questionId] = value
    }

    // Admin Actions
    function updateQuestion(assessmentType, id, data) {
        const assessment = config.value.assessments[assessmentType]
        if (!assessment) return

        const index = assessment.items.findIndex(i => i.id === id)
        if (index !== -1) {
            assessment.items[index] = { ...assessment.items[index], ...data }
        }
    }

    function addQuestion(assessmentType, data) {
        const assessment = config.value.assessments[assessmentType]
        if (!assessment) return

        // Generate ID if not provided
        if (!data.id) {
            data.id = `${assessmentType}_${Date.now()}`
        }
        assessment.items.push(data)
    }

    function deleteQuestion(assessmentType, id) {
        const assessment = config.value.assessments[assessmentType]
        if (!assessment) return

        assessment.items = assessment.items.filter(i => i.id !== id)
        // Also cleanup answers? Maybe not strictly needed for MVP but good practice
        delete answerState[id]
    }

    function reorderQuestions(assessmentType, newItems) {
        const assessment = config.value.assessments[assessmentType]
        if (assessment) {
            assessment.items = newItems
        }
    }

    function exportConfig() {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(config.value, null, 4));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "assessment-config.json");
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }


    // Getters
    const currentAssessment = computed(() => {
        if (!currentAssessmentId.value) return null
        return config.value.assessments[currentAssessmentId.value]
    })

    const maxPossibleScore = computed(() => {
        if (!currentAssessment.value) return 0
        let max = 0
        const items = currentAssessment.value.items.filter(i => i.type === 'scorable')

        items.forEach(item => {
            if (answerState[item.id] !== undefined) {
                max += 15
            }
        })
        return max
    })

    const totalScore = computed(() => {
        let match = 0
        Object.values(answerState).forEach(val => {
            if (typeof val === 'number') {
                match += val
            }
        })
        return match
    })

    const readinessRating = computed(() => {
        if (maxPossibleScore.value === 0) return { percent: 0, level: 'Pending' }
        const percent = (totalScore.value / maxPossibleScore.value) * 100
        let level = 'Critical gaps'
        if (percent >= 80) level = 'Strong readiness'
        else if (percent >= 60) level = 'Moderate readiness'
        else if (percent >= 40) level = 'Weak readiness'

        return {
            percent: Math.round(percent),
            level
        }
    })

    const scoresByStage = computed(() => {
        if (!currentAssessment.value) return {}
        const groups = {}
        currentAssessment.value.items.forEach(item => {
            if (!groups[item.stage]) {
                groups[item.stage] = { total: 0, max: 0, flags: 0, items: [] }
            }
            groups[item.stage].items.push(item)

            if (answerState[item.id] !== undefined && typeof answerState[item.id] === 'number') {
                groups[item.stage].total += answerState[item.id]
                groups[item.stage].max += 15
                if (answerState[item.id] === -5) {
                    groups[item.stage].flags++
                }
            }
        })
        return groups
    })

    const flaggedItems = computed(() => {
        if (!currentAssessment.value) return []
        return currentAssessment.value.items.filter(item => answerState[item.id] === -5)
    })

    return {
        // State
        config,
        currentAssessmentId,
        businessProfile,
        answers: answerState,
        // Actions
        startAssessment,
        setAnswer,
        updateQuestion,
        addQuestion,
        deleteQuestion,
        reorderQuestions,
        exportConfig,
        // Getters
        currentAssessment,
        maxPossibleScore,
        totalScore,
        readinessRating,
        scoresByStage,
        flaggedItems
    }
})
