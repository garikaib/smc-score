export const assessmentConfig = {
    "scoring_bands": [
        {
            "label": "GREAT",
            "threshold": 15.0,
            "meaning": "Strong practice fully in place"
        },
        {
            "label": "GOOD",
            "threshold": 10.0,
            "meaning": "Acceptable practice with room to improve"
        },
        {
            "label": "BORDERLINE",
            "threshold": 5.0,
            "meaning": "Weak area that needs attention"
        },
        {
            "label": "FLAG",
            "threshold": -5.0,
            "meaning": "Critical gap or risk"
        }
    ],
    "assessments": {
        "basic": {
            "title": "Basic Assessment",
            "items": [
                {
                    "id": "basic_6",
                    "stage": "Foundation & Legal",
                    "indicator": "Nature of Business",
                    "question": "What is the nature of your business?",
                    "key_text": "Describe what your business does.",
                    "type": "text"
                },
                {
                    "id": "basic_7",
                    "stage": "Foundation & Legal",
                    "indicator": "Type of Business",
                    "question": "Which category best describes your business?",
                    "key_text": "Services",
                    "type": "select",
                    "options": ["Services", "Manufacturing", "Retail", "Agriculture", "Technology"]
                },
                {
                    "id": "basic_9",
                    "stage": "Foundation & Legal",
                    "indicator": "Operational Duration",
                    "question": "When did your business commence operations?",
                    "key_text": "Less than 6 months",
                    "type": "date"
                },
                {
                    "id": "basic_10",
                    "stage": "Market & Offering",
                    "indicator": "Market Readiness",
                    "question": "How developed is the market for your product/service?",
                    "key_text": "Example: No Ready Market",
                    "type": "scorable"
                },
                {
                    "id": "basic_11",
                    "stage": "Market & Offering",
                    "indicator": "Necessity",
                    "question": "Is your product/service considered essential or a 'nice-to-have'?",
                    "key_text": "Example: Essential Product/Service",
                    "type": "scorable"
                },
                {
                    "id": "basic_12",
                    "stage": "Market & Offering",
                    "indicator": "Uniqueness",
                    "question": "How unique is your offering compared to competitors?",
                    "key_text": "Example: Unique Product/Service",
                    "type": "scorable"
                },
                {
                    "id": "basic_13",
                    "stage": "Market & Offering",
                    "indicator": "Product Completeness",
                    "question": "Is your product fully developed and ready for sale, or does it require more research?",
                    "key_text": "Example: Established & Ready Product",
                    "type": "scorable"
                },
                {
                    "id": "basic_17",
                    "stage": "Operational Strategy & Capability",
                    "indicator": "Outsourcing Level",
                    "question": "What percentage of your operations are outsourced?",
                    "key_text": "Example: Close to 10%",
                    "type": "scorable"
                },
                {
                    "id": "basic_18",
                    "stage": "Operational Strategy & Capability",
                    "indicator": "Strategic Fit",
                    "question": "How closely related is this new idea to your main business core?",
                    "key_text": "Example: Related",
                    "type": "scorable"
                },
                {
                    "id": "basic_19",
                    "stage": "Financial Health & Economics",
                    "indicator": "Margins & Volume",
                    "question": "Do you have strong profit margins or high sales volume?",
                    "key_text": "Example: Great Volume Great Margin",
                    "type": "scorable"
                },
                {
                    "id": "basic_20",
                    "stage": "Financial Health & Economics",
                    "indicator": "Capital Expenditure",
                    "question": "Is your business setup expensive (CAPEX intensive)?",
                    "key_text": "Example: No CAPEX",
                    "type": "scorable"
                },
                {
                    "id": "basic_21",
                    "stage": "Financial Health & Economics",
                    "indicator": "Revenue Model",
                    "question": "Is your revenue recurring (subscription/repeat) or one-off?",
                    "key_text": "Example: High Initial Fee + Recurring Rev",
                    "type": "scorable"
                },
                {
                    "id": "basic_22",
                    "stage": "Investment & Future Readiness",
                    "indicator": "Financial Independence",
                    "question": "Are you dependent on external funding or self-sponsored?",
                    "key_text": "Example: Independent",
                    "type": "scorable"
                },
                {
                    "id": "basic_23",
                    "stage": "Investment & Future Readiness",
                    "indicator": "Independence Timeline",
                    "question": "How soon will the business be operationally independent?",
                    "key_text": "Example: Less than 6 months",
                    "type": "scorable"
                }
            ]
        },
        "advanced": {
            "title": "Advanced Assessment",
            "items": [
                {
                    "id": "advanced_16",
                    "stage": "Market & Offering",
                    "indicator": "Market Potential",
                    "question": "What is the estimated size of your target demographic?",
                    "key_text": "Example: > 25% of Target Demographic",
                    "type": "scorable"
                },
                {
                    "id": "advanced_17",
                    "stage": "Market & Offering",
                    "indicator": "Competitive Landscape",
                    "question": "Describe your competition level and market growth.",
                    "key_text": "Example: Few (0-1) direct rivals; Market is growing.",
                    "type": "scorable"
                },
                {
                    "id": "advanced_18",
                    "stage": "Market & Offering",
                    "indicator": "Proprietary Edge",
                    "question": "Do you have registered trademarks or proprietary technology?",
                    "key_text": "Example: Registered Trademark AND Proprietary Process/Tech",
                    "type": "scorable"
                },
                {
                    "id": "advanced_27",
                    "stage": "Financial Health & Economics",
                    "indicator": "Recurring Revenue",
                    "question": "Is your revenue model based on recurring fees?",
                    "key_text": "Example: Once Off Fee",
                    "type": "scorable"
                },
                {
                    "id": "advanced_30",
                    "stage": "Financial Health & Economics",
                    "indicator": "Core Profitability",
                    "question": "What is your net profit margin?",
                    "key_text": "Example: >25% Net Profit Margin.",
                    "type": "scorable"
                },
                {
                    "id": "advanced_32",
                    "stage": "Investment & Future Readiness",
                    "indicator": "Time to Profitability",
                    "question": "How long until you break even?",
                    "key_text": "Example: ≤6 Months.",
                    "type": "scorable"
                }
            ]
        }
    }
}
