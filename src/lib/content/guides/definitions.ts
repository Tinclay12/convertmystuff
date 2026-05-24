import type { GuideDefinition } from "@/lib/content/types";

const HEALTH_DISCLAIMER =
  "This content is for general educational purposes only and is not medical advice. BMI, calorie, and macro estimates are screening tools—not diagnoses. Consult a qualified healthcare provider or registered dietitian before changing diet, exercise, or treatment plans, especially if you have a medical condition.";

const FINANCE_DISCLAIMER =
  "This content is for general educational purposes only and is not financial, tax, or legal advice. Loan, interest, and payment examples are illustrative. Consult a licensed financial advisor, accountant, or attorney for decisions about borrowing, investing, or taxes.";

const REAL_ESTATE_DISCLAIMER =
  "This content is for general educational purposes only and is not investment, legal, or tax advice. Cap rate, NOI, DSCR, and cash flow examples depend on assumptions that vary by market and property. Consult qualified professionals before purchasing or financing real estate.";

export const whatIsBmiGuide: GuideDefinition = {
  slug: "what-is-bmi",
  title: "What Is BMI? Body Mass Index Explained",
  summary:
    "Learn how body mass index is calculated, what WHO categories mean, and when BMI is a useful screening tool versus a misleading number.",
  metaTitle: "What Is BMI? Body Mass Index Categories and Formula",
  metaDescription:
    "Learn what BMI measures, how the formula works, WHO category ranges, and when body mass index can be misleading. Includes a free calculator link.",
  keywords: ["what is bmi", "body mass index", "bmi categories", "bmi formula"],
  intro:
    "Body mass index (BMI) is a simple ratio of weight to height used as a population-level screening tool. It helps estimate whether an adult's weight may fall outside a commonly referenced healthy range. BMI does not measure body fat directly, but decades of epidemiological research link BMI ranges to health outcomes at the population level. For individuals, BMI is best treated as one data point among many—not a diagnosis on its own.",
  primaryToolId: "bmi-calculator",
  relatedToolIds: ["calorie-calculator", "macro-calculator"],
  relatedGuideSlugs: ["bmi-categories-and-limitations", "tdee-and-calorie-deficits"],
  categorySlug: "health-fitness-calculators",
  subcategoryId: "body-metrics",
  lastReviewed: "2026-05-23",
  disclaimer: HEALTH_DISCLAIMER,
  faqs: [
    {
      question: "What is a healthy BMI for adults?",
      answer:
        "Under WHO guidelines, a BMI between 18.5 and 24.9 is classified as normal weight for most adults. Below 18.5 is underweight, 25.0 to 29.9 is overweight, and 30.0 or above is obese. Individual health depends on many factors beyond this single number.",
    },
    {
      question: "How do I calculate BMI in pounds and inches?",
      answer:
        "Convert weight to kilograms (divide pounds by 2.205) and height to meters (multiply inches by 0.0254), then divide weight by height squared. Alternatively, use the formula 703 × weight (lb) ÷ height (in)². A BMI calculator handles both unit systems automatically.",
    },
    {
      question: "Can athletes have a high BMI and still be healthy?",
      answer:
        "Yes. Muscle is denser than fat, so athletes and people with significant lean mass often register as overweight or obese on BMI despite low body fat. Waist circumference, body composition testing, and clinical evaluation provide better context for muscular individuals.",
    },
    {
      question: "Is BMI accurate for older adults?",
      answer:
        "BMI may understate health risk in older adults because age-related muscle loss (sarcopenia) can keep weight stable while fat percentage rises. Healthcare providers may consider additional metrics such as grip strength, gait speed, and waist circumference alongside BMI.",
    },
    {
      question: "Should children use adult BMI categories?",
      answer:
        "No. Children and adolescents require age- and sex-specific BMI-for-age percentiles on growth charts, not adult cutoffs. Pediatric BMI interpretation accounts for normal growth patterns that change throughout development.",
    },
  ],
  sections: [
    {
      id: "what-bmi-measures",
      heading: "What BMI measures and why it exists",
      paragraphs: [
        "Body mass index compares your weight to your height and produces a single number used to classify adults into weight categories. Belgian statistician Adolphe Quetelet developed the concept in the 19th century, and the World Health Organization adopted standardized adult cutoffs in the late 1990s after reviewing global mortality and morbidity data.",
        "BMI was never intended to diagnose individual disease. It was designed as an inexpensive, non-invasive screening tool that works across large populations without specialized equipment. Public health agencies, insurers, and researchers still use BMI because it correlates reasonably well with body fat at the group level and requires only a scale and a height measurement.",
        "Understanding what BMI does and does not measure helps you use it appropriately. It reflects total body mass relative to stature, not body composition, fitness level, bone density, or metabolic health. When you know your BMI, treat it as a starting point for further questions rather than a final verdict on your health.",
      ],
    },
    {
      id: "formula",
      heading: "The BMI formula and unit conversions",
      paragraphs: [
        "The standard formula is BMI = weight (kg) ÷ height (m)². Height is squared because taller people naturally carry more mass, and squaring height adjusts for that relationship in a way that produces comparable numbers across different statures.",
        "If you measure in US customary units, convert pounds to kilograms by dividing by 2.205 and inches to meters by multiplying by 0.0254 before applying the formula. The shortcut formula 703 × weight (lb) ÷ height (in)² gives the same result without manual conversion steps.",
        "The output is a unitless index, not a percentage. A BMI of 24.2 and a BMI of 31.5 are both plain numbers on the same scale. Always use the same unit system throughout a single calculation—mixing kilograms with inches without converting will produce a meaningless result.",
      ],
      linkedToolIds: ["bmi-calculator"],
    },
    {
      id: "categories",
      heading: "WHO adult BMI categories",
      paragraphs: [
        "The World Health Organization defines four primary adult categories: underweight below 18.5, normal weight from 18.5 to 24.9, overweight from 25.0 to 29.9, and obese at 30.0 or above. These thresholds were established by reviewing the relationship between BMI and mortality across diverse populations.",
        "Obesity is further divided into Class I (30.0–34.9), Class II (35.0–39.9), and Class III (40.0 and above) for clinical and research purposes. Higher classes are associated with greater prevalence of cardiovascular disease, type 2 diabetes, and certain cancers at the population level.",
        "Some Asian populations may face elevated health risks at lower BMI values, leading organizations like the WHO Western Pacific Region to suggest overweight cutoffs starting at 23.0. Always consider ethnicity-specific guidance when available, and consult a healthcare provider for personalized interpretation.",
      ],
    },
    {
      id: "worked-examples",
      heading: "Worked examples with real numbers",
      paragraphs: [
        "Example 1: A person weighing 70 kg (154 lb) and standing 170 cm (5 ft 7 in, or 1.70 m) tall calculates as 70 ÷ (1.70)² = 70 ÷ 2.89 ≈ 24.2. This falls in the upper end of the normal weight range under WHO guidelines.",
        "Example 2: A person weighing 90 kg (198 lb) at 180 cm (5 ft 11 in, or 1.80 m) calculates as 90 ÷ (1.80)² = 90 ÷ 3.24 ≈ 27.8. This classifies as overweight, though body composition could shift the clinical picture significantly if the person carries substantial muscle mass.",
        "Example 3: Using US units directly, someone at 165 lb and 64 in tall gets 703 × 165 ÷ 64² = 703 × 165 ÷ 4096 ≈ 28.3, also in the overweight range. Running these numbers through a BMI calculator confirms manual results and reduces rounding errors.",
      ],
      linkedToolIds: ["bmi-calculator"],
    },
    {
      id: "athletes",
      heading: "BMI for athletes and muscular individuals",
      paragraphs: [
        "Athletes, bodybuilders, and people in physically demanding occupations often have BMI values in the overweight or obese range despite low body fat percentages. Muscle tissue weighs more per unit volume than fat, so a lean, muscular frame can produce a high BMI that misrepresents health risk.",
        "Professional football players, rugby athletes, and competitive weightlifters routinely exceed BMI 30 while maintaining excellent cardiovascular fitness and metabolic profiles. Relying on BMI alone for these populations would misclassify a large share of healthy individuals.",
        "If you train regularly and carry significant muscle, supplement BMI with waist-to-height ratio, body fat percentage from DEXA or bioelectrical impedance, or a simple waist circumference measurement. A waist below 40 inches (102 cm) for men or 35 inches (88 cm) for women is a commonly cited threshold for elevated abdominal fat risk, independent of BMI.",
      ],
    },
    {
      id: "older-adults",
      heading: "BMI considerations for older adults",
      paragraphs: [
        "Aging changes body composition even when scale weight stays stable. Adults over 65 often lose skeletal muscle while gaining visceral fat—a process called sarcopenic obesity. BMI may remain in the normal range while metabolic and functional health decline.",
        "Some geriatric research suggests that slightly higher BMI values (25 to 27) may be associated with lower mortality in adults over 75, possibly because extra weight provides a buffer against illness-related weight loss. This remains an area of active study and should not be interpreted as a recommendation to gain weight.",
        "Older adults benefit from combining BMI with functional assessments: grip strength, walking speed, and recent unintentional weight change. A registered dietitian or geriatrician can help interpret BMI in the context of frailty risk, protein needs, and chronic conditions.",
      ],
    },
    {
      id: "limitations",
      heading: "When BMI is misleading or inappropriate",
      paragraphs: [
        "BMI should not be used for children, adolescents, or pregnant individuals. Pediatric BMI requires age- and sex-specific percentile charts. During pregnancy, weight gain follows trimester-specific guidelines that adult BMI categories cannot capture.",
        "People with edema, ascites, or large muscle mass may have BMI values that poorly reflect adiposity. Individuals with amputations need adjusted weight estimates. BMI also does not distinguish between visceral fat (more metabolically harmful) and subcutaneous fat.",
        "BMI is a screening tool, not a diagnostic test. A BMI outside the normal range warrants further evaluation—not automatic alarm. Blood pressure, lipids, fasting glucose, family history, and lifestyle factors together paint a more complete picture than any single index.",
      ],
    },
    {
      id: "next-steps",
      heading: "Practical next steps after calculating BMI",
      paragraphs: [
        "If your BMI falls in the normal range, maintain balanced nutrition and regular physical activity. Periodic re-checks every year or two help track trends, since gradual weight change may not be obvious day to day.",
        "If your BMI suggests overweight or obesity and you want to make changes, estimating your total daily energy expenditure (TDEE) is a practical next step. TDEE accounts for age, sex, height, weight, and activity level to produce a personalized calorie target for weight loss, maintenance, or gain.",
        "Consult a healthcare provider before starting aggressive diet or exercise programs, especially if you have diabetes, heart disease, eating disorder history, or take medications affected by weight change. Professional guidance ensures your plan is safe and sustainable.",
      ],
      linkedToolIds: ["calorie-calculator", "macro-calculator"],
    },
  ],
};

export const bmiCategoriesGuide: GuideDefinition = {
  slug: "bmi-categories-and-limitations",
  title: "BMI Categories and Limitations",
  summary:
    "Understand the full range of WHO BMI categories, obesity classes, population-specific cutoffs, and alternative metrics when BMI alone is not enough.",
  metaTitle: "BMI Categories and Limitations - WHO Ranges Explained",
  metaDescription:
    "Understand WHO BMI categories, who should not rely on BMI alone, and alternative metrics to consider alongside body mass index.",
  keywords: ["bmi categories", "bmi limitations", "who bmi ranges", "bmi for athletes"],
  intro:
    "BMI categories group adults into weight ranges based on height and weight. They are useful for quick screening but have well-known limitations for certain populations. Knowing the full category table, obesity subclasses, and when to use alternative metrics helps you interpret BMI results with appropriate nuance rather than treating a single number as definitive.",
  primaryToolId: "bmi-calculator",
  relatedToolIds: ["calorie-calculator"],
  relatedGuideSlugs: ["what-is-bmi", "tdee-and-calorie-deficits"],
  categorySlug: "health-fitness-calculators",
  subcategoryId: "body-metrics",
  lastReviewed: "2026-05-23",
  disclaimer: HEALTH_DISCLAIMER,
  faqs: [
    {
      question: "What are the four main BMI categories?",
      answer:
        "WHO adult categories are underweight (below 18.5), normal weight (18.5–24.9), overweight (25.0–29.9), and obese (30.0 and above). Obesity is subdivided into Class I, II, and III for clinical context.",
    },
    {
      question: "What is Class III obesity?",
      answer:
        "Class III obesity, sometimes called severe or morbid obesity, is a BMI of 40.0 or higher. Class I covers 30.0–34.9 and Class II covers 35.0–39.9. Higher classes correlate with increased health risks at the population level.",
    },
    {
      question: "What metrics are better than BMI for athletes?",
      answer:
        "Body fat percentage, waist circumference, waist-to-height ratio, and DEXA scans provide more accurate body composition data for muscular individuals. BMI alone cannot distinguish muscle from fat.",
    },
    {
      question: "Do BMI cutoffs differ for Asian populations?",
      answer:
        "Yes. WHO Western Pacific Region guidance suggests overweight begins at BMI 23.0 and obesity at 27.5 for some Asian populations, reflecting earlier onset of metabolic risk at lower BMI values.",
    },
  ],
  sections: [
    {
      id: "who-ranges",
      heading: "Standard adult BMI ranges at a glance",
      paragraphs: [
        "The WHO ranges most commonly cited for adults divide the BMI scale into four primary bands: underweight below 18.5, normal weight from 18.5 to 24.9, overweight from 25.0 to 29.9, and obese at 30.0 or higher. These cutoffs were chosen because epidemiological data show inflection points in mortality and disease prevalence near these thresholds.",
        "Each category represents a range, not a precise target. A BMI of 24.9 and a BMI of 18.5 both fall within normal weight, yet an individual at either boundary may have very different body compositions, fitness levels, and health profiles.",
        "National health surveys report the distribution of BMI across populations using these categories, which is why they remain the standard reference in clinical guidelines, research papers, and public health communications worldwide.",
      ],
    },
    {
      id: "full-table",
      heading: "Complete WHO category breakdown",
      paragraphs: [
        "Underweight: BMI less than 18.5. Associated with increased risk of malnutrition, osteoporosis, and immune dysfunction at the population level, though individual causes vary widely.",
        "Normal weight: BMI 18.5 to 24.9. Generally associated with the lowest all-cause mortality in large epidemiological studies, though individual outcomes depend on fitness, diet quality, genetics, and other factors.",
        "Overweight: BMI 25.0 to 29.9. Elevated risk for hypertension, type 2 diabetes, and cardiovascular disease compared to normal weight groups in population studies. Many individuals in this range are metabolically healthy.",
        "Obese: BMI 30.0 and above. Further divided into subclasses described below. Population-level risk for chronic disease increases with each step up the scale.",
      ],
    },
    {
      id: "obesity-classes",
      heading: "Obesity classes I, II, and III",
      paragraphs: [
        "Class I obesity spans BMI 30.0 to 34.9. This is the most common obesity classification and may be managed through lifestyle changes, medical nutrition therapy, or pharmacotherapy depending on individual circumstances.",
        "Class II obesity covers BMI 35.0 to 39.9, sometimes called severe obesity. Healthcare providers may discuss more intensive interventions, including bariatric surgery eligibility, when lifestyle modifications alone are insufficient.",
        "Class III obesity is BMI 40.0 and above, also referred to as severe or morbid obesity. This classification is associated with the highest population-level rates of comorbid conditions and is a common threshold for surgical weight-loss candidacy discussions.",
      ],
    },
    {
      id: "population-cutoffs",
      heading: "Population-specific cutoff variations",
      paragraphs: [
        "Standard WHO cutoffs were derived primarily from studies of European and North American populations. Research shows that Asian populations may experience type 2 diabetes and cardiovascular risk at lower BMI values, prompting some health authorities to recommend lower overweight thresholds.",
        "The WHO Western Pacific Region suggests overweight at BMI 23.0 and obesity at 27.5 for Asian populations. Japan uses locally defined criteria as well. If you are of Asian descent, ask your healthcare provider which cutoffs apply to your evaluation.",
        "Other groups require different tools entirely. Pacific Islander populations, for example, may have higher average BMI with different body composition profiles. Children, pregnant individuals, and the elderly all require specialized charts rather than standard adult categories.",
      ],
    },
    {
      id: "athletes-limitations",
      heading: "Why BMI fails for athletes and muscular adults",
      paragraphs: [
        "BMI assumes that higher weight relative to height indicates excess adiposity. That assumption breaks down when a significant portion of body mass is skeletal muscle, bone, or water rather than fat.",
        "Studies of NFL players found that the majority classify as obese by BMI while maintaining body fat percentages comparable to or lower than the general population. Similar patterns appear in rugby, powerlifting, and military special operations populations.",
        "If you exercise four or more days per week with resistance training, treat BMI as a rough checkpoint only. Pair it with waist circumference, body fat measurement, or performance metrics like resting heart rate and blood panel results for a meaningful assessment.",
      ],
    },
    {
      id: "alternatives",
      heading: "Alternative metrics to use alongside BMI",
      paragraphs: [
        "Waist circumference measures abdominal fat accumulation. Values above 40 inches (102 cm) for men or 35 inches (88 cm) for women suggest elevated visceral fat risk regardless of BMI category.",
        "Waist-to-height ratio divides waist by height. A ratio below 0.5 is a commonly cited target associated with lower cardiometabolic risk. This metric adjusts automatically for stature and is easy to measure at home.",
        "Body fat percentage from DEXA, hydrostatic weighing, or bioelectrical impedance directly estimates adiposity. Fitness professionals and clinics offer these tests when BMI alone provides insufficient clarity.",
        "Other useful measures include waist-to-hip ratio, grip strength, blood pressure, fasting glucose, and HDL cholesterol. Together they form a more complete cardiometabolic profile than any single index.",
      ],
    },
    {
      id: "combining-metrics",
      heading: "Combining BMI with other health data",
      paragraphs: [
        "A person with BMI 27, a 34-inch waist, normal blood pressure, and regular exercise may have lower actual health risk than someone with BMI 23, a 38-inch waist, and prediabetes. Context matters more than any single number.",
        "Healthcare providers often use BMI as a triage step: normal BMI with no other risk factors may need no further weight-related workup, while elevated BMI triggers additional screening for glucose, lipids, and blood pressure.",
        "Track trends over time rather than fixating on a single reading. A BMI that has risen two points over five years signals a different concern than a stable BMI at the upper end of normal, even if both readings fall in the same category today.",
      ],
    },
    {
      id: "when-to-seek-help",
      heading: "When to consult a healthcare provider",
      paragraphs: [
        "Seek professional guidance if your BMI is below 18.5 or above 30, if you have gained or lost more than 10 pounds unintentionally in six months, or if you have a family history of diabetes or heart disease regardless of BMI.",
        "A registered dietitian can help with evidence-based nutrition plans. A physician can order blood work and assess whether weight-related interventions are appropriate for your specific health profile.",
        "Do not self-diagnose based on BMI categories alone. Screening categories exist to prompt conversation and further evaluation, not to label you as healthy or unhealthy without additional clinical context.",
      ],
      linkedToolIds: ["bmi-calculator", "calorie-calculator"],
    },
  ],
};

export const tdeeGuide: GuideDefinition = {
  slug: "tdee-and-calorie-deficits",
  title: "TDEE and Calorie Deficits Explained",
  summary:
    "Learn how total daily energy expenditure is estimated with Mifflin-St Jeor, how activity multipliers work, and how to set a safe calorie deficit for weight loss.",
  metaTitle: "TDEE and Calorie Deficits - Daily Calorie Guide",
  metaDescription:
    "Learn how total daily energy expenditure (TDEE) works, common deficit sizes for weight loss, and when to consult a professional.",
  keywords: ["tdee", "calorie deficit", "daily calorie needs", "weight loss calories"],
  intro:
    "Total daily energy expenditure (TDEE) is an estimate of how many calories you burn per day including activity. Weight loss typically requires eating below TDEE; maintenance matches it. Understanding how TDEE is calculated—and how to apply a deficit safely—turns abstract calorie numbers into a practical daily target you can actually follow.",
  primaryToolId: "calorie-calculator",
  relatedToolIds: ["macro-calculator", "bmi-calculator"],
  relatedGuideSlugs: ["what-is-bmi", "bmi-categories-and-limitations"],
  categorySlug: "health-fitness-calculators",
  subcategoryId: "nutrition",
  lastReviewed: "2026-05-23",
  disclaimer: HEALTH_DISCLAIMER,
  faqs: [
    {
      question: "What is the difference between BMR and TDEE?",
      answer:
        "BMR (basal metabolic rate) estimates calories burned at complete rest. TDEE multiplies BMR by an activity factor to include daily movement, exercise, and non-exercise activity. TDEE is the number you use for diet planning.",
    },
    {
      question: "How many calories should I cut to lose one pound per week?",
      answer:
        "A deficit of roughly 500 calories per day below TDEE is commonly cited as producing about one pound of weight loss per week, since one pound of fat stores approximately 3,500 calories. Individual results vary based on metabolism, adherence, and water fluctuations.",
    },
    {
      question: "What is the Mifflin-St Jeor equation?",
      answer:
        "For men: BMR = 10 × weight(kg) + 6.25 × height(cm) − 5 × age + 5. For women: BMR = 10 × weight(kg) + 6.25 × height(cm) − 5 × age − 161. Multiply the result by an activity factor to get TDEE.",
    },
    {
      question: "Is it safe to eat 1,200 calories per day?",
      answer:
        "1,200 calories is a common minimum cited for women, but adequacy depends on age, size, activity, and health status. Very low calorie diets should be supervised by a healthcare provider, especially for men, athletes, or anyone with medical conditions.",
    },
    {
      question: "Why did my weight loss stall despite a deficit?",
      answer:
        "Plateaus happen due to metabolic adaptation, increased hunger leading to hidden overeating, reduced non-exercise activity, and water retention from stress or sodium. Re-estimate TDEE at your new weight and verify portion accuracy before cutting calories further.",
    },
  ],
  sections: [
    {
      id: "tdee-basics",
      heading: "What TDEE represents",
      paragraphs: [
        "Total daily energy expenditure (TDEE) is the sum of all calories your body uses in a 24-hour period. It includes basal metabolic rate (the energy needed to keep organs functioning at rest), the thermic effect of food (calories burned digesting meals), and all physical activity from structured exercise to fidgeting.",
        "If you eat exactly your TDEE, weight stays roughly stable over time. Eat above it consistently and you gain weight; eat below it consistently and you lose weight. TDEE is an estimate, not a precise measurement, but it provides a useful anchor for planning.",
        "Individual TDEE varies by 10 to 15 percent even among people of the same age, sex, and size due to genetics, muscle mass, hormone levels, and daily movement patterns. Treat calculator output as a starting point and adjust based on real-world results over two to four weeks.",
      ],
      linkedToolIds: ["calorie-calculator"],
    },
    {
      id: "bmr-vs-tdee",
      heading: "BMR versus TDEE: the relationship",
      paragraphs: [
        "Basal metabolic rate (BMR) accounts for roughly 60 to 75 percent of TDEE in sedentary individuals. It covers breathing, circulation, cell repair, and brain function—the non-negotiable costs of staying alive.",
        "TDEE equals BMR multiplied by an activity factor that ranges from about 1.2 for sedentary lifestyles to 1.9 or higher for very active individuals. A person with a BMR of 1,600 calories and a moderate activity factor of 1.55 would estimate TDEE at roughly 2,480 calories per day.",
        "Confusing BMR with TDEE is a common mistake that leads to eating too little. If your calculator shows 1,500 calories, check whether that is BMR or TDEE before setting your diet target. Eating at BMR while maintaining normal daily activity creates an unintentional deficit.",
      ],
    },
    {
      id: "mifflin-st-jeor",
      heading: "The Mifflin-St Jeor equation",
      paragraphs: [
        "The Mifflin-St Jeor equation is the most widely validated BMR formula for healthy adults. For men: BMR = 10 × weight(kg) + 6.25 × height(cm) − 5 × age(years) + 5. For women: BMR = 10 × weight(kg) + 6.25 × height(cm) − 5 × age(years) − 161.",
        "Example for a 35-year-old woman weighing 68 kg (150 lb), 165 cm (5 ft 5 in) tall: BMR = 10(68) + 6.25(165) − 5(35) − 161 = 680 + 1,031.25 − 175 − 161 = 1,375 calories at rest.",
        "Example for a 40-year-old man weighing 82 kg (181 lb), 178 cm (5 ft 10 in) tall: BMR = 10(82) + 6.25(178) − 5(40) + 5 = 820 + 1,112.5 − 200 + 5 = 1,738 calories at rest. Older equations like Harris-Benedict exist but Mifflin-St Jeor tends to be more accurate for modern populations.",
      ],
      linkedToolIds: ["calorie-calculator"],
    },
    {
      id: "activity-multipliers",
      heading: "Activity multipliers explained",
      paragraphs: [
        "After calculating BMR, multiply by an activity factor to estimate TDEE. Sedentary (little or no exercise, desk job): multiply by 1.2. Lightly active (light exercise 1–3 days per week): multiply by 1.375.",
        "Moderately active (moderate exercise 3–5 days per week): multiply by 1.55. Very active (hard exercise 6–7 days per week): multiply by 1.725. Extra active (physical job plus daily training, or twice-daily sessions): multiply by 1.9.",
        "Most people overestimate their activity level. If you exercise three times per week for 30 minutes but sit for eight hours daily, moderately active (1.55) may overstate your burn. Start with a lower factor and adjust upward if weight trends suggest you are eating too little.",
      ],
    },
    {
      id: "maintenance-calories",
      heading: "Finding your maintenance calorie level",
      paragraphs: [
        "Maintenance calories equal your TDEE—the intake at which weight remains stable. To empirically find maintenance, eat a consistent calorie amount for two to three weeks while tracking morning body weight. If weight is flat, you are near maintenance.",
        "Using the earlier example of a woman with BMR 1,375 and moderate activity: TDEE = 1,375 × 1.55 ≈ 2,131 calories per day. Eating roughly 2,100 to 2,150 calories daily should maintain her current weight, assuming the activity estimate is accurate.",
        "Recalculate TDEE after every 10 to 15 pounds of weight change, since lighter bodies burn fewer calories. Maintenance is not a fixed number—it shifts as your mass, muscle, and activity patterns evolve.",
      ],
      linkedToolIds: ["calorie-calculator"],
    },
    {
      id: "deficit-math",
      heading: "Deficit math and expected weight loss rates",
      paragraphs: [
        "One pound of stored body fat contains approximately 3,500 calories. A daily deficit of 500 calories theoretically produces about one pound of fat loss per week (500 × 7 = 3,500). A 250-calorie daily deficit targets roughly half a pound per week.",
        "Example: TDEE is 2,400 calories. A 500-calorie deficit sets a target of 1,900 calories per day. Over four weeks, that is a 14,000-calorie cumulative deficit, suggesting about four pounds of fat loss—though scale weight also reflects water, glycogen, and gut contents.",
        "Larger deficits produce faster initial loss but increase hunger, muscle loss risk, and adherence difficulty. A 750 to 1,000 calorie deficit may be appropriate for someone with significant excess weight under medical supervision, but most adults do well starting at 300 to 500 below TDEE.",
      ],
    },
    {
      id: "safety-minimums",
      heading: "Safety minimums and when to slow down",
      paragraphs: [
        "General guidance often cites 1,200 calories as a minimum for women and 1,500 for men, but these floors are not universal. Smaller individuals, older adults, and people with high activity levels may need more even during weight loss.",
        "Warning signs that your deficit is too aggressive include persistent fatigue, hair loss, mood changes, loss of menstrual cycle, frequent illness, and inability to concentrate. These signal that your body is not receiving adequate energy or nutrients.",
        "Very low calorie diets (below 800 calories) should only be undertaken with medical supervision. If you have diabetes, heart disease, kidney disease, a history of eating disorders, or take medications affected by food intake, consult your healthcare provider before any calorie restriction.",
      ],
    },
    {
      id: "adjusting-over-time",
      heading: "Adjusting your target as you progress",
      paragraphs: [
        "Metabolic adaptation means your body may burn slightly fewer calories as you lose weight, partly because a lighter body requires less energy and partly because non-exercise activity may decrease unconsciously. Re-run your TDEE calculation every month or after every 10 pounds lost.",
        "Weight loss is not linear. Daily fluctuations of one to three pounds from sodium, carbohydrates, hydration, and digestion are normal. Evaluate progress using weekly averages over four to six weeks rather than reacting to any single scale reading.",
        "Once you reach your goal weight, transition to maintenance by gradually increasing calories by 100 to 150 per week while monitoring weight. Jumping straight back to pre-diet intake often causes rapid regain. Macro calculators can help distribute your target across protein, carbs, and fat.",
      ],
      linkedToolIds: ["macro-calculator", "calorie-calculator"],
    },
  ],
};

export const understandingCapRateGuide: GuideDefinition = {
  slug: "understanding-cap-rate",
  title: "Understanding Cap Rate in Real Estate",
  summary:
    "Cap rate expresses net operating income as a percentage of property value—learn the formula, a full worked example, and how cap rate differs from cash-on-cash return.",
  metaTitle: "Understanding Cap Rate - Capitalization Rate Guide",
  metaDescription:
    "Learn what cap rate means, how to calculate it from NOI, and how to compare properties without treating any rate as universally good or bad.",
  keywords: ["what is cap rate", "capitalization rate", "cap rate formula", "good cap rate"],
  intro:
    "Capitalization rate (cap rate) expresses a property's net operating income as a percentage of its value. Investors use it to compare yields across deals before diving into financing details. Cap rate answers a simple question: if I bought this property all-cash, what annual return would operating income represent relative to price? It is one of the first metrics every rental investor should understand.",
  primaryToolId: "cap-rate-calculator",
  relatedToolIds: ["noi-calculator", "rental-deal-analyzer", "dscr-calculator"],
  relatedGuideSlugs: ["rental-deal-analysis-basics", "rental-property-analysis-step-by-step"],
  categorySlug: "real-estate-calculators",
  subcategoryId: "investment-metrics",
  lastReviewed: "2026-05-23",
  disclaimer: REAL_ESTATE_DISCLAIMER,
  faqs: [
    {
      question: "What is a good cap rate for rental property?",
      answer:
        "There is no universal good cap rate. Higher cap rates often reflect higher risk, lower-growth markets, or properties needing work. Lower cap rates may indicate stable, in-demand locations. Compare cap rates among similar property types in the same submarket.",
    },
    {
      question: "How do you calculate cap rate?",
      answer:
        "Cap rate = Net Operating Income (NOI) ÷ Property Value (or Purchase Price). If NOI is $24,000 and the property costs $300,000, cap rate = $24,000 ÷ $300,000 = 8%.",
    },
    {
      question: "Does cap rate include mortgage payments?",
      answer:
        "No. Cap rate uses NOI, which is income after operating expenses but before debt service, income taxes, and capital expenditures. Financing is layered on separately through cash-on-cash return and DSCR.",
    },
    {
      question: "What is the difference between cap rate and cash-on-cash return?",
      answer:
        "Cap rate assumes an all-cash purchase and ignores leverage. Cash-on-cash return divides annual pre-tax cash flow (after mortgage payments) by total cash invested (down payment plus closing costs). Leverage can make cash-on-cash higher or lower than cap rate.",
    },
  ],
  sections: [
    {
      id: "definition",
      heading: "What cap rate measures",
      paragraphs: [
        "Cap rate = NOI ÷ property value. It answers: if I bought this property all-cash, what annual return would operating income represent relative to price? A 7% cap rate means every $100 of property value generates $7 of net operating income per year.",
        "Cap rate ignores financing entirely. Two investors buying the same property at the same price with different loan terms will calculate the same cap rate but different cash-on-cash returns. That is why cap rate is called an unlevered yield—it isolates the property's operating performance from your capital structure.",
        "Cap rate also ignores future appreciation, tax benefits, and capital expenditure timing. It is a snapshot metric based on current or projected income and current price, not a complete investment return picture.",
      ],
      linkedToolIds: ["noi-calculator", "cap-rate-calculator"],
    },
    {
      id: "formula-walkthrough",
      heading: "Cap rate formula step by step",
      paragraphs: [
        "Step 1: Calculate gross potential rent (all units at market rent, fully occupied). Step 2: Subtract vacancy and credit loss (typically 5–10% of gross rent). Step 3: Add other income (laundry, parking, pet fees). Step 4: Subtract operating expenses (taxes, insurance, maintenance, management, utilities not paid by tenants). The result is NOI.",
        "Step 5: Divide NOI by purchase price or current market value. Example: Gross rent $36,000, vacancy loss $1,800 (5%), other income $600, operating expenses $10,800. Effective gross income = $36,000 − $1,800 + $600 = $34,800. NOI = $34,800 − $10,800 = $24,000.",
        "If purchase price is $300,000: Cap rate = $24,000 ÷ $300,000 = 0.08 = 8%. You can verify this with a cap rate calculator by entering income, expenses, and price directly.",
      ],
      linkedToolIds: ["noi-calculator", "cap-rate-calculator"],
    },
    {
      id: "worked-example",
      heading: "Full worked property example",
      paragraphs: [
        "Consider a four-unit property listed at $480,000. Each unit rents for $950 per month ($3,800 total). Annual gross rent = $45,600. Assume 7% vacancy loss ($3,192), yielding effective gross income of $42,408.",
        "Operating expenses: property taxes $5,200, insurance $2,400, maintenance reserve $3,600, property management (8% of EGI) $3,393, water/sewer $1,800. Total operating expenses = $16,393. NOI = $42,408 − $16,393 = $26,015.",
        "Cap rate = $26,015 ÷ $480,000 = 5.42%. In a market where similar fourplexes trade at 6–7% cap rates, this property may be priced for a premium location or below-market rents with upside potential. Always compare against local comps, not national averages.",
      ],
      linkedToolIds: ["cap-rate-calculator", "rental-deal-analyzer"],
    },
    {
      id: "cap-vs-coc",
      heading: "Cap rate versus cash-on-cash return",
      paragraphs: [
        "Cap rate treats the purchase as all-cash. Cash-on-cash return accounts for financing: CoC = Annual Pre-Tax Cash Flow ÷ Total Cash Invested. Cash invested includes down payment, closing costs, and initial repairs.",
        "Using the fourplex example: purchase $480,000, 25% down ($120,000), closing costs $8,000, total cash invested $128,000. Loan $360,000 at 7% for 30 years ≈ $2,395/month ($28,740/year). NOI $26,015 − debt service $28,740 = −$2,725 annual cash flow. Cash-on-cash = −$2,725 ÷ $128,000 = −2.13%.",
        "The property shows a 5.42% cap rate but negative cash flow with this financing. This is common in low-cap-rate markets or with high interest rates. Cap rate tells you about the asset; cash-on-cash tells you about your deal with leverage. Both numbers matter.",
      ],
      linkedToolIds: ["cash-on-cash-calculator", "dscr-calculator"],
    },
    {
      id: "what-affects-cap-rates",
      heading: "What drives cap rates up or down",
      paragraphs: [
        "Location and demand: properties in strong job-growth markets with limited supply typically trade at lower cap rates (higher prices relative to income). Secondary and tertiary markets often show higher cap rates compensating for perceived risk.",
        "Property condition and age: deferred maintenance, outdated systems, or environmental issues push cap rates higher because buyers demand compensation for capex risk. Turnkey properties in good condition command lower cap rates.",
        "Interest rate environment: when debt costs rise, buyers require higher yields, pushing cap rates up and property values down. Asset type matters too—multifamily, retail, office, and industrial each have distinct cap rate ranges in the same metro area.",
      ],
    },
    {
      id: "comparing-properties",
      heading: "How to compare properties using cap rate",
      paragraphs: [
        "Compare apples to apples: same property type, similar unit count, similar age and condition, within the same submarket. A single-family rental cap rate in a suburban neighborhood is not comparable to a downtown mixed-use building cap rate.",
        "Use cap rate as a screening filter, not a final decision. Set a minimum cap rate threshold for your market and pass on properties below it unless there is a clear value-add story (below-market rents, renovation upside, rezoning potential).",
        "When two properties have similar cap rates, dig into expense assumptions. One owner self-manages and skips maintenance reserves; another uses professional management and fully reserves for capex. Normalized NOI comparisons reveal which deal is actually stronger.",
      ],
      linkedToolIds: ["rental-deal-analyzer"],
    },
    {
      id: "limitations",
      heading: "Limitations of cap rate analysis",
      paragraphs: [
        "Cap rate uses a single year's NOI and ignores rent growth, expense inflation, and future capital expenditures. A property with 5% cap rate today but strong rent growth may outperform a 7% cap rate property in a declining market over a five-year hold.",
        "Cap rate does not account for tax benefits (depreciation), financing terms, or exit cap rate changes. Internal rate of return (IRR) and equity multiple capture multi-year returns more completely but require more assumptions.",
        "Seller-provided financials often understate expenses or overstate achievable rents. Always verify income and expense line items independently. A cap rate based on inflated NOI is meaningless.",
      ],
    },
    {
      id: "going-deeper",
      heading: "When to move beyond cap rate",
      paragraphs: [
        "Once cap rate passes your initial screen, layer in financing (cash flow, DSCR, cash-on-cash), tax analysis (depreciation, 1031 exchange eligibility), and sensitivity testing (what if vacancy rises 5% or rates increase 1%?).",
        "The rental deal analyzer combines income, expenses, and loan terms in one dashboard. Use it when you want to share assumptions with partners, compare multiple scenarios, or evaluate whether a property meets your specific return targets.",
        "Cap rate is the first filter in a funnel, not the last. It quickly eliminates overpriced deals and highlights candidates worth deeper underwriting. Pair it with the step-by-step rental analysis guide for a complete workflow.",
      ],
      linkedToolIds: ["rental-deal-analyzer", "dscr-calculator"],
    },
  ],
};

export const jsonToCsvGuide: GuideDefinition = {
  slug: "json-to-csv-for-excel",
  title: "JSON to CSV for Excel",
  summary:
    "Convert JSON arrays into flat CSV files for Excel with guidance on nested structures, UTF-8 encoding, and step-by-step import settings.",
  metaTitle: "JSON to CSV for Excel - Conversion Guide",
  metaDescription:
    "Convert JSON arrays to CSV for Excel import. Learn flattening basics, delimiter choices, and common pitfalls when opening CSV in spreadsheets.",
  keywords: ["json to csv excel", "json to csv", "convert json for spreadsheet"],
  intro:
    "Excel and Google Sheets import CSV easily, but JSON is hierarchical. Converting JSON to CSV flattens records into rows and columns suitable for spreadsheet analysis. This guide covers when and how to flatten nested structures, avoid encoding problems, and import cleanly into Excel without mangled dates, broken special characters, or misaligned columns.",
  primaryToolId: "json-to-csv",
  relatedToolIds: ["csv-to-json", "csv-to-html-table", "json-formatter"],
  categorySlug: "developer-tools",
  lastReviewed: "2026-05-23",
  faqs: [
    {
      question: "Can Excel open JSON files directly?",
      answer:
        "Excel does not natively open JSON as a structured table. You need to convert JSON to CSV or use Power Query (Get Data → From JSON) in Excel 2016 and later. CSV conversion is the simplest path for flat or lightly nested data.",
    },
    {
      question: "How do I handle nested JSON objects in CSV?",
      answer:
        "Flatten nested objects using dot notation (user.name, user.email) or underscore separators (user_name, user_email). Arrays of objects become multiple rows; arrays of primitives may become comma-separated values in a single cell or require separate handling.",
    },
    {
      question: "Why are special characters broken in my CSV?",
      answer:
        "The file is likely not saved as UTF-8, or Excel opened it with the wrong encoding. Save CSV as UTF-8 with BOM for best Excel compatibility on Windows. Use Data → From Text/CSV in Excel to explicitly select UTF-8 encoding.",
    },
    {
      question: "Why does Excel change my ID numbers?",
      answer:
        "Excel auto-converts long numeric strings to scientific notation and strips leading zeros. Import via Data → From Text/CSV and set affected columns to Text format before loading.",
    },
  ],
  sections: [
    {
      id: "why-convert",
      heading: "Why convert JSON to CSV for Excel",
      paragraphs: [
        "JSON is the standard format for API responses and NoSQL exports, but Excel works best with flat, tabular data. CSV (comma-separated values) is the simplest interchange format that Excel opens natively without add-ins or scripts.",
        "Converting JSON to CSV lets you sort, filter, pivot, and chart data using familiar spreadsheet tools. It is especially useful when sharing data with non-developers who need to review records without running code.",
        "The conversion is lossy when JSON contains deep nesting, mixed-type arrays, or recursive structures. Understanding these limits upfront saves time—you may need to preprocess or split complex JSON before conversion.",
      ],
      linkedToolIds: ["json-to-csv"],
    },
    {
      id: "flattening",
      heading: "Flattening nested JSON objects",
      paragraphs: [
        "A nested object like {\"user\": {\"name\": \"Alice\", \"email\": \"alice@example.com\"}} becomes flat columns: user.name and user.email (or user_name and user_email depending on your converter settings). Each top-level key in a JSON array of objects becomes a column.",
        "Arrays of objects typically expand to one row per object. An orders array inside a customer record may produce multiple rows with duplicated customer fields, or the converter may serialize the array as a JSON string in one cell—check your tool's behavior.",
        "Deeply nested structures produce wide CSV files with dozens or hundreds of columns. Preview the output before importing large datasets. You may want to select only the fields you need rather than flattening everything.",
      ],
      linkedToolIds: ["json-to-csv", "json-formatter"],
    },
    {
      id: "nested-decision-tree",
      heading: "Decision tree for nested JSON structures",
      paragraphs: [
        "Is your JSON a flat array of objects with primitive values only? Convert directly—no preprocessing needed. Example: [{\"id\": 1, \"name\": \"Alice\"}, {\"id\": 2, \"name\": \"Bob\"}].",
        "Does each record contain one level of nested objects? Flatten with dot notation. Example: {\"id\": 1, \"address\": {\"city\": \"Portland\", \"state\": \"OR\"}} becomes columns id, address.city, address.state.",
        "Does each record contain arrays of objects (one-to-many relationships)? Decide: (a) create one row per child object with parent fields repeated, (b) serialize the array as JSON text in one cell, or (c) split into two CSV files (parent table and child table linked by ID).",
        "Does your JSON contain arrays of arrays, recursive references, or mixed types? Preprocess with a script or use JSON formatter to inspect structure first. These patterns rarely convert cleanly to a single flat CSV without custom logic.",
      ],
      linkedToolIds: ["json-to-csv", "json-formatter"],
    },
    {
      id: "utf8-encoding",
      heading: "UTF-8 encoding and special characters",
      paragraphs: [
        "CSV files must use consistent character encoding. UTF-8 supports virtually all characters including accented letters, CJK characters, emoji, and currency symbols. Always export CSV as UTF-8.",
        "On Windows, Excel sometimes misdetects UTF-8 files opened by double-clicking. UTF-8 with BOM (byte order mark) improves auto-detection. Without BOM, use Excel's Data → Get Data → From Text/CSV and explicitly select UTF-8 (65001) encoding.",
        "Test with a known special character before converting large files. A row containing é, ñ, 中文, or € that displays correctly confirms your encoding pipeline works end to end.",
      ],
    },
    {
      id: "excel-import-steps",
      heading: "Step-by-step Excel import",
      paragraphs: [
        "Method 1 (recommended for control): Open Excel → Data tab → Get Data → From File → From Text/CSV. Select your CSV file. In the preview dialog, verify delimiter (comma), encoding (UTF-8), and column data types. Set ID and zip code columns to Text before loading.",
        "Method 2 (quick open): Double-click the CSV file. Excel uses regional default delimiter and auto-detects types—fast but risky for leading zeros, dates, and special characters. Fine for simple, English-only datasets.",
        "Method 3 (Power Query for JSON): Data → Get Data → From File → From JSON. Power Query parses JSON natively and lets you expand nested columns in the query editor. Useful when you want to skip a separate conversion step and work directly from JSON.",
        "After import, scan the first and last rows for truncation, misaligned columns, or #NUM! errors. These indicate delimiter conflicts (unescaped commas in data) or type coercion issues.",
      ],
      linkedToolIds: ["csv-to-html-table"],
    },
    {
      id: "common-pitfalls",
      heading: "Common pitfalls and how to avoid them",
      paragraphs: [
        "Leading zeros stripped: US zip codes (02101), invoice numbers (00456), and phone fragments lose leading zeros when Excel treats them as numbers. Import as Text.",
        "Date format confusion: ISO dates (2026-05-23) may display differently based on regional settings. Consider converting dates to a consistent format before CSV export, or set column type to Date during import.",
        "Unescaped commas and quotes: Fields containing commas must be wrapped in double quotes in CSV. Fields containing double quotes must escape them as \"\". Quality converters handle this automatically; verify with fields that contain commas.",
        "Empty vs null vs missing keys: JSON null, empty string, and absent keys may all appear as blank cells but mean different things. Document your convention or add a placeholder value for nulls if the distinction matters for analysis.",
      ],
    },
    {
      id: "delimiters",
      heading: "Choosing delimiters and quoting",
      paragraphs: [
        "Comma is the default CSV delimiter. If your data contains many commas (addresses, descriptions), tab-separated values (TSV) or pipe-delimited (|) formats reduce quoting complexity. Excel accepts all three via the Text Import Wizard.",
        "Semicolon delimiters are common in European locales where comma is the decimal separator. Match delimiter to your Excel regional settings or specify explicitly during import.",
        "Always enable quoting for fields that contain the delimiter character. Most JSON-to-CSV tools quote automatically when needed. Preview a few rows with known problematic values to confirm.",
      ],
      linkedToolIds: ["json-to-csv"],
    },
    {
      id: "workflow-tips",
      heading: "End-to-end workflow tips",
      paragraphs: [
        "Start small: convert 10–20 records, import into Excel, and verify column alignment, encoding, and data types before processing the full dataset.",
        "Use JSON formatter to validate and pretty-print your source JSON before conversion. Malformed JSON (trailing commas, single quotes, unquoted keys) causes silent errors or partial output.",
        "For recurring conversions, save your Power Query steps or document your converter settings (flatten separator, array handling, null behavior). Consistency prevents surprises when the API schema changes.",
        "Need a quick visual check without Excel? Convert CSV to HTML table for browser preview. This catches layout issues before sharing files with stakeholders.",
      ],
      linkedToolIds: ["json-to-csv", "csv-to-json", "csv-to-html-table"],
    },
  ],
};

export const rentalDealAnalysisGuide: GuideDefinition = {
  slug: "rental-deal-analysis-basics",
  title: "Rental Deal Analysis Basics",
  summary:
    "Screen rental properties in the right order—NOI, cap rate, then leverage metrics—with a full numeric walkthrough from gross rent to cash flow.",
  metaTitle: "Rental Deal Analysis Basics - Cap Rate, Cash Flow & DSCR",
  metaDescription:
    "Learn how to screen rental properties with cap rate, NOI, cash-on-cash return, and DSCR before underwriting a full deal.",
  keywords: ["rental deal analysis", "rental property analysis", "investment property screening"],
  intro:
    "Rental deal analysis combines income, expenses, and financing to estimate whether a property meets your return targets. Start with simple metrics, then layer in leverage. This guide walks through the recommended screening order, explains each metric's role, and provides a complete numeric example you can replicate for any listing.",
  primaryToolId: "rental-deal-analyzer",
  relatedToolIds: ["cap-rate-calculator", "noi-calculator", "dscr-calculator", "cash-on-cash-calculator"],
  relatedGuideSlugs: ["understanding-cap-rate", "rental-property-analysis-step-by-step"],
  categorySlug: "real-estate-calculators",
  subcategoryId: "investment-metrics",
  lastReviewed: "2026-05-23",
  disclaimer: REAL_ESTATE_DISCLAIMER,
  faqs: [
    {
      question: "What is the first metric to check on a rental property?",
      answer:
        "Start with gross rent and verify it against market comps. Then subtract vacancy and operating expenses to calculate NOI. Divide NOI by asking price for cap rate as an unlevered yield check before adding financing assumptions.",
    },
    {
      question: "What is a good DSCR for rental property?",
      answer:
        "Most lenders require DSCR of 1.20 to 1.25 or higher, meaning NOI covers debt service by at least 120–125%. A DSCR below 1.0 means the property does not generate enough income to cover the mortgage from operations alone.",
    },
    {
      question: "What expenses should I include in NOI?",
      answer:
        "Include property taxes, insurance, maintenance, property management, utilities paid by owner, HOA fees, and vacancy allowance. Exclude mortgage payments, income taxes, depreciation, and capital expenditures from NOI.",
    },
    {
      question: "When should I use the full rental deal analyzer?",
      answer:
        "Use the full analyzer when a property passes initial cap rate screening and you want to model financing, compare scenarios, or share a breakdown with partners. It combines NOI, cap rate, cash flow, cash-on-cash, and DSCR in one view.",
    },
  ],
  sections: [
    {
      id: "why-analyze",
      heading: "Why structured deal analysis matters",
      paragraphs: [
        "Buying rental property based on gut feel or listing photos alone leads to expensive mistakes. Structured analysis forces you to verify income, stress-test expenses, and quantify returns before committing capital.",
        "A consistent screening process lets you compare ten properties in an afternoon and focus deep diligence on the two or three that meet your criteria. Without a standard order of operations, it is easy to skip steps or cherry-pick favorable assumptions.",
        "The goal is not a perfect prediction of future performance—it is eliminating bad deals early and entering good deals with eyes open about risks and return drivers.",
      ],
    },
    {
      id: "screening-order",
      heading: "Suggested screening order",
      paragraphs: [
        "Step 1: Verify gross rent against market comps (rentometer, local listings, property manager quotes). Step 2: Apply vacancy and credit loss (typically 5–10%). Step 3: Estimate operating expenses (taxes, insurance, maintenance, management, utilities). Step 4: Calculate NOI.",
        "Step 5: Divide NOI by purchase price for cap rate. Compare to your market minimum. Step 6: If cap rate passes, add financing—down payment, interest rate, loan term, closing costs. Step 7: Calculate monthly cash flow, cash-on-cash return, and DSCR.",
        "This order matters because cap rate evaluates the asset independent of your financing. A property with a strong cap rate but negative cash flow at current rates tells a different story than a weak cap rate property with positive cash flow due to a large down payment.",
      ],
      linkedToolIds: ["cap-rate-calculator", "noi-calculator"],
    },
    {
      id: "gross-rent-vacancy",
      heading: "Gross rent and vacancy assumptions",
      paragraphs: [
        "Gross potential rent is the total if every unit were occupied at market rent for a full year. Never use the seller's in-place rent without verifying—it may be above or below market.",
        "Vacancy and credit loss account for empty units, turnover gaps, and non-paying tenants. A 5% vacancy rate ($1,800 on $36,000 gross) is optimistic for many markets; 8–10% is safer for initial screening. Class C properties and seasonal markets may need higher allowances.",
        "Other income includes laundry, parking, pet fees, storage, and utility bill-back. These can add 2–5% to effective gross income on multifamily properties. Verify which fees actually exist rather than assuming.",
      ],
    },
    {
      id: "operating-expenses",
      heading: "Operating expense line items",
      paragraphs: [
        "Property taxes: use the actual assessed amount from county records, not the seller's figure. Reassessments after sale can increase taxes significantly in some jurisdictions.",
        "Insurance: get a quote for landlord policy covering the specific property. Insurance costs have risen sharply in many markets—using outdated estimates understates expenses.",
        "Maintenance and repairs: budget 5–10% of gross rent for routine maintenance, or $500–1,000 per unit per year as a rule of thumb. Older properties need more. Property management: 8–10% of collected rent if you hire a manager; include it even if you plan to self-manage initially.",
        "Owner-paid utilities, HOA fees, lawn care, pest control, and licensing fees all reduce NOI. When in doubt, use the seller's actual trailing twelve-month expenses from their Schedule E tax return rather than estimates.",
      ],
      linkedToolIds: ["noi-calculator"],
    },
    {
      id: "noi-calculation",
      heading: "Calculating net operating income",
      paragraphs: [
        "NOI = Effective Gross Income − Operating Expenses. Effective gross income = Gross rent − Vacancy loss + Other income. NOI is always before debt service, income taxes, and capital expenditures.",
        "NOI represents what the property earns from operations alone. It is the numerator in cap rate and the basis for DSCR. Consistent NOI calculation lets you compare properties on equal footing regardless of how each owner finances their purchase.",
        "If seller NOI seems too high, check for excluded management fees, understated maintenance, or inflated rent assumptions. Normalize expenses to market rates before trusting the number.",
      ],
      linkedToolIds: ["noi-calculator", "cap-rate-calculator"],
    },
    {
      id: "numeric-walkthrough",
      heading: "Complete numeric walkthrough",
      paragraphs: [
        "Property: duplex listed at $350,000. Unit A rents $1,400/month, Unit B rents $1,200/month. Gross rent = $2,600 × 12 = $31,200. Vacancy (7%) = $2,184. Other income (laundry) = $300. Effective gross income = $31,200 − $2,184 + $300 = $29,316.",
        "Expenses: taxes $3,800, insurance $1,600, maintenance $2,500, management (8%) $2,345, water/sewer $1,200. Total = $11,445. NOI = $29,316 − $11,445 = $17,871. Cap rate = $17,871 ÷ $350,000 = 5.11%.",
        "Financing: 25% down ($87,500), closing $6,000, total cash in $93,500. Loan $262,500 at 6.75% for 30 years = $1,703/month ($20,436/year). Annual cash flow = $17,871 − $20,436 = −$2,565. Cash-on-cash = −$2,565 ÷ $93,500 = −2.74%. DSCR = $17,871 ÷ $20,436 = 0.87.",
        "This deal fails cash flow and DSCR screening at these terms despite a reasonable cap rate. You might negotiate price, increase down payment, or pass. The numbers tell you where to focus—here, price or financing terms need improvement.",
      ],
      linkedToolIds: ["rental-deal-analyzer", "dscr-calculator", "cash-on-cash-calculator"],
    },
    {
      id: "leverage-metrics",
      heading: "Cash-on-cash return and DSCR explained",
      paragraphs: [
        "Cash-on-cash return = Annual Pre-Tax Cash Flow ÷ Total Cash Invested. It measures the yield on your actual out-of-pocket dollars. A 10% cash-on-cash means you earn $0.10 per year for every dollar invested, before tax benefits.",
        "Debt service coverage ratio (DSCR) = NOI ÷ Annual Debt Service. Lenders typically require 1.20–1.25 minimum. Below 1.0 means the property cannot cover its mortgage from rental income—a red flag unless you plan to subsidize from other income.",
        "These metrics interact: a larger down payment improves cash flow and DSCR but reduces cash-on-cash (more capital deployed). Finding the right balance depends on your goals—cash flow now versus equity build and appreciation over time.",
      ],
      linkedToolIds: ["dscr-calculator", "cash-on-cash-calculator"],
    },
    {
      id: "full-analyzer",
      heading: "When to use the full rental deal analyzer",
      paragraphs: [
        "The rental deal analyzer combines all inputs—purchase price, rent, expenses, loan terms, down payment—into one dashboard with a breakdown table. Use it when initial screening shows a viable deal and you want to model scenarios quickly.",
        "Compare multiple financing options side by side: 20% vs 25% down, 30-year vs 15-year term, different interest rates. Sensitivity analysis reveals which variables matter most for your specific deal.",
        "Share the analyzer output with partners, lenders, or mentors to align on assumptions before making an offer. Transparent numbers build confidence and catch errors early in the process.",
      ],
      linkedToolIds: ["rental-deal-analyzer"],
    },
  ],
};

export const mortgageAmortizationGuide: GuideDefinition = {
  slug: "mortgage-amortization-explained",
  title: "Mortgage Amortization Explained",
  summary:
    "See how each mortgage payment splits between principal and interest over time, with sample schedule rows, PITI breakdown, and the impact of extra payments.",
  metaTitle: "Mortgage Amortization Explained - Schedule & Interest",
  metaDescription:
    "Understand how mortgage amortization works, why early payments are mostly interest, and how to compare loan terms.",
  keywords: ["mortgage amortization", "amortization schedule", "mortgage interest"],
  intro:
    "Amortization is the process of paying off a loan through scheduled payments that include both principal and interest. The split changes every month over the loan term. Understanding amortization helps you compare loan offers, decide between 15- and 30-year terms, plan extra principal payments, and see how much of your housing cost actually builds equity versus paying the lender.",
  primaryToolId: "mortgage-calculator-pro",
  relatedToolIds: ["loan-payment-calculator", "mortgage-calculator", "loan-to-value-calculator"],
  categorySlug: "finance-calculators",
  subcategoryId: "loans-payments",
  lastReviewed: "2026-05-23",
  disclaimer: FINANCE_DISCLAIMER,
  faqs: [
    {
      question: "Why are early mortgage payments mostly interest?",
      answer:
        "Interest is calculated on the remaining balance each month. Early in the loan, the balance is highest, so the interest portion is largest. As principal is paid down, the balance shrinks and more of each payment goes toward principal.",
    },
    {
      question: "What is PITI?",
      answer:
        "PITI stands for Principal, Interest, Taxes, and Insurance—the four components of a typical monthly mortgage payment. Principal and interest repay the loan; taxes and insurance are often held in escrow by the lender.",
    },
    {
      question: "How much do extra payments save?",
      answer:
        "Extra principal payments reduce the balance faster, which lowers total interest paid and may shorten the loan term. On a $300,000 loan at 6.5% for 30 years, an extra $200/month can save over $80,000 in interest and pay off the loan roughly 7 years early.",
    },
    {
      question: "Is a 15-year mortgage always better than 30-year?",
      answer:
        "A 15-year term builds equity faster and pays less total interest, but monthly payments are significantly higher. Choose based on cash flow, other financial goals, and whether the lower rate on 15-year loans justifies the higher payment for your budget.",
    },
  ],
  sections: [
    {
      id: "what-is-amortization",
      heading: "What mortgage amortization means",
      paragraphs: [
        "Amortization is the gradual repayment of a loan through equal periodic payments that cover both principal and interest. Each payment reduces the outstanding balance, which in turn reduces the interest charged on the next payment.",
        "Fully amortizing loans reach a zero balance at the end of the term. Partially amortizing or interest-only loans may require a balloon payment. Most residential mortgages in the US are fully amortizing fixed-rate or adjustable-rate loans.",
        "The amortization schedule is a table showing every payment over the life of the loan: payment number, payment amount, principal portion, interest portion, and remaining balance. Reviewing this schedule reveals the true cost of borrowing beyond the monthly payment figure.",
      ],
      linkedToolIds: ["mortgage-calculator-pro"],
    },
    {
      id: "payment-split",
      heading: "How principal and interest split over time",
      paragraphs: [
        "Interest each month = remaining balance × (annual rate ÷ 12). Principal each month = total payment − interest. On a $300,000 loan at 6.5% for 30 years, the monthly payment is approximately $1,896.",
        "Payment 1: interest = $300,000 × 0.065/12 = $1,625; principal = $1,896 − $1,625 = $271. Payment 2: balance is $299,729; interest = $1,624; principal = $272. The pattern continues—principal grows, interest shrinks.",
        "By year 15 on this loan, roughly half of each payment goes to principal. By year 25, about 75% goes to principal. The curve is slow at first, which surprises many first-time buyers who expect equal splits from day one.",
      ],
      linkedToolIds: ["mortgage-calculator-pro", "loan-payment-calculator"],
    },
    {
      id: "sample-rows",
      heading: "Sample amortization schedule rows",
      paragraphs: [
        "Loan: $300,000, 6.5% annual rate, 30-year term, monthly payment $1,896. Month 1: payment $1,896, principal $271, interest $1,625, balance $299,729. Month 12: payment $1,896, principal $288, interest $1,608, balance $296,525.",
        "Month 60 (year 5): payment $1,896, principal $355, interest $1,541, balance $279,163. Month 120 (year 10): payment $1,896, principal $451, interest $1,445, balance $252,089. Month 180 (year 15): payment $1,896, principal $573, interest $1,323, balance $216,236.",
        "Month 360 (final): payment $1,896, principal $1,886, interest $10, balance $0. Total paid over 30 years: $682,632 ($300,000 principal + $382,632 interest). The interest total often shocks borrowers who focus only on the monthly payment.",
      ],
      linkedToolIds: ["mortgage-calculator-pro"],
    },
    {
      id: "piti-breakdown",
      heading: "PITI: the full monthly housing payment",
      paragraphs: [
        "Principal and interest (P&I) repay the loan itself. On the example above, P&I is $1,896. Property taxes vary by jurisdiction—$3,600/year ($300/month) is illustrative for many US markets. Homeowner's insurance might run $1,200/year ($100/month).",
        "PITI = $1,896 + $300 + $100 = $2,296/month. Lenders use PITI (plus HOA if applicable) to calculate your debt-to-income ratio for qualification. Your actual housing cost may also include PMI, HOA dues, maintenance, and utilities.",
        "Escrow accounts collect taxes and insurance monthly alongside P&I. The lender pays these bills on your behalf. Escrow amounts adjust annually when tax or insurance premiums change, which can raise your total payment even on a fixed-rate loan.",
      ],
      linkedToolIds: ["mortgage-calculator", "loan-to-value-calculator"],
    },
    {
      id: "compare-terms",
      heading: "Comparing 15-year and 30-year terms",
      paragraphs: [
        "Same $300,000 loan at 6.5%: 30-year payment ≈ $1,896/month, total interest $382,632. 15-year at 6.0% (15-year rates are typically lower): payment ≈ $2,532/month, total interest $155,787.",
        "The 15-year saves $226,845 in interest but costs $636 more per month. That trade-off suits borrowers with strong cash flow who prioritize debt-free homeownership and total cost minimization.",
        "The 30-year offers lower mandatory payments, freeing cash for investments, emergencies, or other goals. You can always pay extra voluntarily while retaining the flexibility to reduce payments during tight months. Run both scenarios in a mortgage calculator before deciding.",
      ],
      linkedToolIds: ["mortgage-calculator-pro", "loan-payment-calculator"],
    },
    {
      id: "extra-payments",
      heading: "The impact of extra principal payments",
      paragraphs: [
        "Extra payments apply directly to principal, reducing the balance immediately. Every future interest calculation uses the lower balance, creating a compounding savings effect over time.",
        "On the $300,000, 6.5%, 30-year loan: adding $200/month extra principal pays off the loan in about 23 years instead of 30 and saves approximately $82,000 in total interest. Adding $500/month pays off in about 18 years and saves roughly $155,000.",
        "Specify that extra payments go to principal only—some lenders require written instruction. Confirm no prepayment penalties exist (most residential loans have none). Even one extra payment per year (equivalent to 1/12 of the monthly payment added each month) meaningfully reduces total interest.",
      ],
      linkedToolIds: ["mortgage-calculator-pro"],
    },
    {
      id: "refinancing",
      heading: "Amortization and refinancing decisions",
      paragraphs: [
        "Refinancing resets the amortization clock. If you are 10 years into a 30-year loan and refinance into a new 30-year term, you extend total repayment time even if the rate drops. Consider refinancing into a shorter term or continuing extra payments to avoid paying interest for 40 total years.",
        "Break-even analysis compares closing costs to monthly savings. If refinancing costs $4,000 and saves $150/month, break-even is 27 months. Stay in the home past break-even to realize net savings.",
        "Cash-out refinancing increases your balance and restarts amortization on a larger principal. The monthly payment may rise even at a lower rate. Model the new amortization schedule before tapping equity.",
      ],
    },
    {
      id: "using-calculators",
      heading: "Using amortization calculators effectively",
      paragraphs: [
        "Enter loan amount, interest rate, and term to generate a full schedule. Compare side-by-side scenarios: different down payments, terms, rates, and extra payment amounts.",
        "Focus on total interest paid and payoff date, not just the monthly payment. A lower payment with a longer term or higher rate may cost tens of thousands more over time.",
        "Use amortization understanding when evaluating rental property financing too—DSCR and cash flow calculations depend on accurate debt service figures from your loan terms. The mortgage calculator pro provides schedule detail for informed borrowing decisions.",
      ],
      linkedToolIds: ["mortgage-calculator-pro", "loan-payment-calculator"],
    },
  ],
};

export const clientSidePdfGuide: GuideDefinition = {
  slug: "client-side-pdf-processing",
  title: "Client-Side PDF Processing",
  summary:
    "Browser-based PDF merge and split keeps files on your device—learn privacy benefits, browser limits, and practical workflows for common document tasks.",
  metaTitle: "Client-Side PDF Merge & Split - Privacy Benefits",
  metaDescription:
    "Learn why browser-based PDF merge and split keeps files private, and when local processing is preferable to cloud upload tools.",
  keywords: ["client side pdf", "pdf merge privacy", "pdf split browser"],
  intro:
    "Client-side PDF tools process files entirely in your browser. Nothing uploads to a server—ideal for contracts, medical records, tax documents, and confidential business files. This guide explains how local PDF processing works, its privacy advantages, browser limitations, and step-by-step workflows for merging and splitting documents.",
  primaryToolId: "pdf-merge",
  relatedToolIds: ["pdf-split", "text-to-pdf"],
  categorySlug: "document-tools",
  lastReviewed: "2026-05-23",
  faqs: [
    {
      question: "Are client-side PDF tools safe for confidential documents?",
      answer:
        "Client-side tools process files locally in your browser without uploading to a server. This reduces exposure compared to cloud services that receive your file on their infrastructure. For highly sensitive documents, local processing is the safer default.",
    },
    {
      question: "Why is my PDF merge slow in the browser?",
      answer:
        "Processing speed depends on file size, page count, device CPU, and available memory. Large PDFs (50+ MB or hundreds of pages) may take longer on mobile devices or older hardware. Close unused tabs to free memory.",
    },
    {
      question: "What is the maximum file size for browser PDF tools?",
      answer:
        "Limits vary by browser and device memory. Most client-side tools handle files up to 50–100 MB comfortably on desktop. Very large files may cause the tab to freeze or crash. Split oversized files first, then merge the needed sections.",
    },
    {
      question: "Can I merge PDFs offline?",
      answer:
        "If the tool is cached as a progressive web app or runs entirely from loaded JavaScript, it may work offline after the initial page load. Check whether the specific tool requires a network connection for its processing libraries.",
    },
  ],
  sections: [
    {
      id: "what-is-client-side",
      heading: "What client-side PDF processing means",
      paragraphs: [
        "Client-side processing runs JavaScript in your browser to read, manipulate, and output PDF files. The file bytes never leave your device—no upload, no server storage, no third-party access during processing.",
        "Cloud PDF services, by contrast, require uploading your document to their servers where processing occurs remotely. Even services with strong privacy policies introduce an additional trust layer and potential exposure point.",
        "Modern browsers have sufficient processing power and APIs (FileReader, ArrayBuffer, Web Workers) to handle merge, split, and basic PDF operations locally. The trade-off is speed and file size limits compared to server-side infrastructure.",
      ],
      linkedToolIds: ["pdf-merge", "pdf-split"],
    },
    {
      id: "privacy",
      heading: "Privacy benefits of local processing",
      paragraphs: [
        "Contracts, medical records, financial statements, legal filings, and HR documents contain sensitive personal or business information. Uploading these to unknown servers creates risk of data breach, unauthorized access, or retention beyond your intent.",
        "Client-side tools eliminate the upload step entirely. Your file stays in browser memory during processing and downloads directly to your device when complete. No account creation, no server-side logging of document contents.",
        "For compliance-sensitive workflows (HIPAA, attorney-client privilege, trade secrets), local processing provides a simpler data handling story. You control where the file goes after processing—it never transited a third-party server.",
      ],
    },
    {
      id: "browser-limits",
      heading: "Browser limits and performance constraints",
      paragraphs: [
        "Memory is the primary constraint. Each PDF page consumes RAM during processing. A 200-page document at high resolution may require hundreds of megabytes of browser memory. Devices with 4 GB RAM struggle with large jobs.",
        "Mobile browsers impose tighter memory limits than desktop Chrome, Firefox, or Edge. Complex merge operations on phones may fail silently or crash the tab. Use desktop browsers for files over 20 MB or 100 pages.",
        "Processing is single-threaded unless the tool uses Web Workers. Large operations may temporarily freeze the UI. Patience is required for big files—avoid clicking repeatedly, which can trigger duplicate operations.",
      ],
    },
    {
      id: "merge-workflow",
      heading: "PDF merge workflow step by step",
      paragraphs: [
        "Step 1: Gather the PDF files you want to combine and note the desired page order. Step 2: Open the PDF merge tool in your browser. Step 3: Select or drag-and-drop files into the upload area. Step 4: Arrange files in the correct sequence using the reorder controls.",
        "Step 5: Click merge/combine. The browser reads each file, concatenates pages in order, and generates a new PDF in memory. Step 6: Download the merged output. Step 7: Open the result and verify page order and completeness before deleting or sharing.",
        "Tip: If merging more than 10 files or files totaling over 50 MB, merge in batches (e.g., merge groups of 5, then merge the groups) to reduce memory pressure and isolate any problematic file.",
      ],
      linkedToolIds: ["pdf-merge"],
    },
    {
      id: "split-workflow",
      heading: "PDF split workflow step by step",
      paragraphs: [
        "Step 1: Identify which pages or page ranges you need from the source document. Step 2: Open the PDF split tool. Step 3: Upload the source PDF. Step 4: Specify split points—individual pages, ranges (e.g., 1–5, 6–10), or every N pages.",
        "Step 5: Execute the split. The browser extracts specified pages into one or more new PDF files. Step 6: Download the output files. Step 7: Verify each split file contains the expected pages.",
        "Common use cases: extract a signature page from a contract, separate chapters from a report, pull individual invoices from a batch scan, or reduce file size before merging selected pages into a new document.",
      ],
      linkedToolIds: ["pdf-split"],
    },
    {
      id: "cloud-vs-local",
      heading: "When to use cloud versus local processing",
      paragraphs: [
        "Use client-side tools when: documents are confidential, files are under 50 MB, you need a quick merge or split without creating an account, or compliance requires data to stay on-device.",
        "Consider cloud tools when: you need OCR on scanned documents, advanced editing (form filling, redaction, digital signatures), very large files (500+ MB), or batch processing hundreds of files programmatically via API.",
        "Hybrid approach: split a large confidential file locally, then OCR only the non-sensitive pages via cloud if needed. Minimize what leaves your device.",
      ],
    },
    {
      id: "performance-tips",
      heading: "Performance tips for smooth processing",
      paragraphs: [
        "Close unnecessary browser tabs to free RAM before processing large PDFs. Disable browser extensions that inject scripts into pages—they can interfere with file handling.",
        "Use the latest browser version for best JavaScript performance and memory management. Chrome and Edge generally handle large ArrayBuffer operations well on desktop.",
        "If processing fails, try splitting the file into smaller chunks first. A 100-page PDF that fails to merge may succeed when merged as two 50-page halves. Reduce image quality in source scans before merging to shrink file size.",
      ],
    },
    {
      id: "security-practices",
      heading: "Security best practices",
      paragraphs: [
        "Verify you are on the legitimate tool site (HTTPS, correct domain) before uploading sensitive files—even client-side tools can be spoofed by phishing sites that actually upload your data.",
        "Clear browser downloads and close the tab after processing confidential documents. Browser memory is released when the tab closes, but downloaded files remain on disk until you delete them.",
        "For text-only content that does not yet exist as PDF, use text-to-pdf to generate a document locally rather than copying through cloud clipboard services. Combine with merge and split for a fully local document workflow.",
      ],
      linkedToolIds: ["pdf-merge", "pdf-split", "text-to-pdf"],
    },
  ],
};

export const rentalPropertyAnalysisStepByStepGuide: GuideDefinition = {
  slug: "rental-property-analysis-step-by-step",
  title: "Rental Property Analysis Step by Step",
  summary:
    "Underwrite a rental property from listing to decision with a full step-by-step walkthrough including income, expenses, financing, and return metrics with real numbers.",
  metaTitle: "Rental Property Analysis Step by Step - Full Underwriting Guide",
  metaDescription:
    "Step-by-step rental property underwriting walkthrough with full numbers: income, expenses, NOI, cap rate, cash flow, cash-on-cash, and DSCR.",
  keywords: [
    "rental property analysis step by step",
    "how to analyze rental property",
    "rental property underwriting",
    "investment property analysis",
  ],
  intro:
    "Analyzing a rental property step by step turns an overwhelming pile of numbers into a repeatable process. This guide walks through a complete underwriting example—from verifying rent and expenses through financing assumptions to final return metrics—so you can evaluate any deal with confidence and know exactly when to walk away.",
  primaryToolId: "rental-deal-analyzer",
  relatedToolIds: ["cap-rate-calculator", "noi-calculator", "dscr-calculator", "cash-on-cash-calculator"],
  relatedGuideSlugs: ["rental-deal-analysis-basics", "understanding-cap-rate"],
  categorySlug: "real-estate-calculators",
  subcategoryId: "investment-metrics",
  lastReviewed: "2026-05-23",
  disclaimer: REAL_ESTATE_DISCLAIMER,
  faqs: [
    {
      question: "What are the steps to analyze a rental property?",
      answer:
        "Verify gross rent, estimate vacancy and other income, calculate operating expenses, derive NOI, compute cap rate, then add financing assumptions to determine cash flow, cash-on-cash return, and DSCR. Compare results against your minimum return thresholds.",
    },
    {
      question: "How long does rental property analysis take?",
      answer:
        "Initial screening takes 10–15 minutes per property once you have a process. Deep underwriting with verified expenses, market rent comps, and multiple financing scenarios may take one to three hours for a property you are seriously considering.",
    },
    {
      question: "What is the minimum DSCR to buy a rental property?",
      answer:
        "Many investors require DSCR of 1.25 or higher for safety margin, even if lenders accept 1.20. Below 1.0 means negative cash flow from operations. Your minimum depends on risk tolerance and whether you can subsidize shortfalls from other income.",
    },
    {
      question: "Should I trust the seller's financial statements?",
      answer:
        "Use seller data as a starting point, not gospel. Verify rent against market comps, confirm taxes from county records, get insurance quotes, and normalize management and maintenance to market rates. Request Schedule E from tax returns for trailing actuals.",
    },
    {
      question: "When should I make an offer based on analysis?",
      answer:
        "Make an offer when the property meets your minimum cap rate, cash-on-cash, and DSCR thresholds using conservative assumptions, and when you have verified the major expense and income line items. Include inspection and financing contingencies.",
    },
  ],
  sections: [
    {
      id: "overview",
      heading: "Overview of the underwriting process",
      paragraphs: [
        "Underwriting a rental property means verifying income, estimating expenses, calculating returns, and deciding whether the deal meets your investment criteria. It is not about predicting the future perfectly—it is about making informed decisions with documented assumptions.",
        "This guide follows a single-family rental example through every step with full numbers. Adapt the same process to duplexes, small multifamily, or commercial properties by adjusting expense line items and vacancy assumptions.",
        "Keep a spreadsheet or use the rental deal analyzer to document each property. Consistent methodology lets you compare deals objectively and revisit assumptions when negotiating price or loan terms.",
      ],
      linkedToolIds: ["rental-deal-analyzer"],
    },
    {
      id: "step-1-gather-data",
      heading: "Step 1: Gather property and market data",
      paragraphs: [
        "Collect the listing price, property address, unit count, square footage, year built, and current rent from the offering memorandum or MLS listing. Note how long the property has been listed and any price reductions.",
        "Research market rent using comparable listings within one mile, rentometer.com, or calls to local property managers. Check county tax records for assessed value and annual property taxes. Pull crime, school, and employment data for the neighborhood context.",
        "Identify the property class (A, B, C) and condition (turnkey, light cosmetic, heavy rehab). Condition affects both expense estimates and your cap rate requirements—a property needing $30,000 in repairs demands a higher yield than a turnkey asset.",
      ],
    },
    {
      id: "step-2-gross-income",
      heading: "Step 2: Estimate gross income",
      paragraphs: [
        "Example property: 3-bed/2-bath single-family home listed at $285,000. Seller claims rent of $1,850/month. Your comp analysis shows market rent of $1,800/month for similar homes. Use $1,800 for conservative underwriting.",
        "Annual gross rent = $1,800 × 12 = $21,600. Vacancy and credit loss at 8% = $1,728. Other income (none for this property) = $0. Effective gross income = $21,600 − $1,728 = $19,872.",
        "If the seller reports 100% occupancy for five years, still apply vacancy. Turnover happens—budget for one month vacant every two to three years at minimum. Optimistic vacancy assumptions inflate NOI and understate risk.",
      ],
    },
    {
      id: "step-3-expenses",
      heading: "Step 3: Calculate operating expenses",
      paragraphs: [
        "Property taxes (from county records): $3,200/year. Insurance (quoted): $1,400/year. Maintenance reserve (8% of gross rent): $1,728/year. Property management (10% of EGI): $1,987/year—even if self-managing initially.",
        "Landscaping/snow: $600/year. Pest control: $200/year. Total operating expenses = $3,200 + $1,400 + $1,728 + $1,987 + $600 + $200 = $9,115/year.",
        "Compare your estimate to the seller's Schedule E if available. If the seller shows $6,500 in expenses because they self-perform all maintenance and skip management, your normalized $9,115 is the correct forward-looking estimate for an arms-length buyer.",
      ],
      linkedToolIds: ["noi-calculator"],
    },
    {
      id: "step-4-noi-cap-rate",
      heading: "Step 4: Calculate NOI and cap rate",
      paragraphs: [
        "NOI = Effective Gross Income − Operating Expenses = $19,872 − $9,115 = $10,757.",
        "Cap rate = NOI ÷ Purchase Price = $10,757 ÷ $285,000 = 3.77%.",
        "In a market where similar SFR investments trade at 5.5–6.5% cap rates, 3.77% signals the property is overpriced at $285,000, rents are below market with upside, or expenses were overstated. To hit 6% cap rate at this NOI, value should be $10,757 ÷ 0.06 = $179,283. This framing helps you negotiate or walk away with clarity.",
      ],
      linkedToolIds: ["cap-rate-calculator", "noi-calculator"],
    },
    {
      id: "step-5-financing",
      heading: "Step 5: Add financing assumptions",
      paragraphs: [
        "Assume 25% down on $285,000 = $71,250. Closing costs and reserves = $5,500. Total cash invested = $76,750. Loan amount = $213,750. Interest rate 7.0%, 30-year fixed. Monthly payment = $1,423. Annual debt service = $17,076.",
        "If you negotiate the price to $220,000 (closer to a 6% cap rate on current NOI): down 25% = $55,000, closing $5,000, cash in $60,000. Loan $165,000 at 7.0% = $1,098/month ($13,176/year).",
        "Always model financing at current market rates, not best-case scenarios. Investment property rates typically run 0.75–1.5% above owner-occupied rates. Confirm with a lender before assuming a rate.",
      ],
    },
    {
      id: "step-6-returns",
      heading: "Step 6: Calculate cash flow and return metrics",
      paragraphs: [
        "At $285,000 asking price: Annual cash flow = NOI $10,757 − debt service $17,076 = −$6,319 (−$527/month). Cash-on-cash = −$6,319 ÷ $76,750 = −8.23%. DSCR = $10,757 ÷ $17,076 = 0.63. This deal fails every leverage metric at asking price.",
        "At negotiated $220,000: Annual cash flow = $10,757 − $13,176 = −$2,419 (−$202/month). Cash-on-cash = −$2,419 ÷ $60,000 = −4.03%. DSCR = $10,757 ÷ $13,176 = 0.82. Still negative cash flow, but improving.",
        "If rent increases to $2,000/month (market supports it after minor updates): gross $24,000, vacancy 8% ($1,920), EGI $22,080, expenses ~$9,500, NOI ~$12,580. At $220,000: cash flow = $12,580 − $13,176 = −$596. Nearly break-even. At $200,000 purchase: cash flow = $12,580 − $12,012 = $568/year. Cash-on-cash = $568 ÷ $55,000 = 1.03%. DSCR = 1.05. The deal works only with price reduction plus rent optimization.",
      ],
      linkedToolIds: ["rental-deal-analyzer", "cash-on-cash-calculator", "dscr-calculator"],
    },
    {
      id: "step-7-decision",
      heading: "Step 7: Make a go/no-go decision",
      paragraphs: [
        "Define your minimum thresholds before analyzing: e.g., cap rate ≥ 6%, cash-on-cash ≥ 8%, DSCR ≥ 1.25, positive monthly cash flow. Compare calculated metrics against these gates.",
        "For this example: at asking price, the deal fails cap rate and all leverage metrics—pass or offer significantly below $200,000. If the seller accepts $195,000 and you achieve $2,000/month rent, rerun the analysis. Cap rate = $12,580 ÷ $195,000 = 6.45%. With loan $146,250 at 7%, debt service $10,620/year, cash flow = $1,960, cash-on-cash = 3.5%, DSCR = 1.18. Closer, but still below an 8% cash-on-cash target.",
        "Document your analysis, share with partners, and use it as the basis for your offer letter. The rental deal analyzer consolidates these steps into one dashboard for quick scenario comparison. Pair this guide with the cap rate and deal analysis basics guides for reference on individual metrics.",
      ],
      linkedToolIds: ["rental-deal-analyzer"],
    },
  ],
};
