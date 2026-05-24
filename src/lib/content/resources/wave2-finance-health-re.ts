import type { ResourceDefinition } from "@/lib/content/types";

export const whatIsCompoundInterestResource: ResourceDefinition = {
  slug: "what-is-compound-interest",
  categorySlug: "finance-calculators",
  title: "What Is Compound Interest?",
  summary:
    "Compound interest earns returns on both your principal and previously accumulated interest, accelerating growth over time.",
  metaTitle: "What Is Compound Interest? Formula and Examples",
  metaDescription:
    "Learn how compound interest works, why compounding frequency matters, and how to project savings growth with a free compound interest calculator.",
  keywords: [
    "what is compound interest",
    "compound interest formula",
    "compound interest explained",
    "compounding frequency",
  ],
  quickAnswer:
    "Compound interest is interest calculated on the initial principal plus all interest that has already been added to the balance. Each compounding period, your balance grows by a percentage of the new total—not just the original deposit—so growth accelerates over long horizons.",
  intro:
    "Whether you are building an emergency fund, saving for retirement, or comparing investment accounts, understanding compound interest helps you interpret projected balances and set realistic timelines. Unlike simple interest, which applies only to the starting amount, compounding reinvests earned interest so future periods earn on a larger base. Banks, brokerages, and loan products all use compounding mechanics, but the frequency, rate, and time horizon determine how dramatically your money grows or how much a debt costs over years.",
  primaryToolId: "compound-interest-calculator",
  relatedToolIds: ["loan-payment-calculator", "percentage-calculator"],
  relatedResourceSlugs: ["simple-vs-compound-interest", "how-to-calculate-percentage-change"],
  lastReviewed: "2026-05-23",
  sections: [
    {
      id: "core-concept",
      heading: "How compound interest differs from earning on principal alone",
      paragraphs: [
        "With compound interest, each period ends by adding earned interest to the balance. The next period's interest calculation uses that updated balance, so you earn interest on interest. A $10,000 deposit at 5% compounded annually becomes $10,500 after year one, then $11,025 after year two because the second year's 5% applies to $10,500—not just the original $10,000.",
        "This snowball effect is modest in early years but powerful over decades. Retirement accounts, high-yield savings, and reinvested dividends all rely on compounding. The key inputs are principal, annual rate, compounding frequency, additional contributions, and time. Small changes in rate or years invested often matter more than small changes in starting balance once compounding has time to work.",
      ],
      linkedToolIds: ["compound-interest-calculator"],
    },
    {
      id: "formula",
      heading: "The compound interest formula and what each variable means",
      paragraphs: [
        "The standard future-value formula is FV = P × (1 + r/n)^(n×t), where P is principal, r is the annual nominal rate as a decimal, n is compounding periods per year, and t is time in years. If you also make regular contributions, each deposit compounds for the remaining periods until your end date, which is why contribution timing and frequency belong in any serious projection.",
        "Nominal annual rate and effective annual yield are not always identical. A 5% rate compounded monthly produces a slightly higher effective yield than 5% compounded once per year because interest is added twelve times instead of once. When comparing products, align compounding assumptions or convert to an effective annual rate before deciding which account or loan is truly cheaper or more rewarding.",
      ],
      linkedToolIds: ["compound-interest-calculator"],
    },
    {
      id: "frequency",
      heading: "Why compounding frequency changes outcomes",
      paragraphs: [
        "Daily, monthly, quarterly, and annual compounding all use the same nominal rate differently. More frequent compounding adds interest to the balance sooner, giving each subsequent period a slightly larger base. On savings, that helps you; on debt, it increases cost unless payments keep pace with accrual.",
        "For quick mental math, annual compounding is simplest. For bank savings and many loans, monthly compounding is common. Credit cards often use daily compounding on average daily balances, which makes carrying a balance expensive quickly. Always check whether quoted rates assume a specific compounding interval before comparing two offers side by side.",
      ],
    },
    {
      id: "time-horizon",
      heading: "Time is the multiplier most people underestimate",
      paragraphs: [
        "Compound growth is back-loaded: much of the final balance arrives in later years when the base is largest. Starting ten years earlier can matter more than doubling the monthly contribution in some scenarios because every early dollar compounds through more periods. That is why financial planners emphasize starting early even with modest amounts.",
        "The flip side applies to debt. Minimum payments on compounding balances can leave interest dominating for years before principal meaningfully declines. Seeing an amortization schedule alongside a compound growth chart clarifies why extra payments early in a loan save more interest than the same extra dollars paid near the end.",
      ],
      linkedToolIds: ["compound-interest-calculator", "loan-payment-calculator"],
    },
    {
      id: "practical-use",
      heading: "Using compound interest in real financial decisions",
      paragraphs: [
        "Use compound projections when comparing savings goals, evaluating employer match timelines, or stress-testing whether a target retirement balance is plausible at conservative return assumptions. Pair compound growth estimates with inflation awareness so you distinguish nominal account growth from purchasing power.",
        "For loans, compound accrual explains why APR disclosures matter and why teaser rates can mislead if you only look at the headline number. Run scenarios with different payment amounts, contribution schedules, and rate assumptions rather than trusting a single headline example from marketing copy.",
      ],
      linkedToolIds: ["compound-interest-calculator"],
    },
  ],
  examples: [
    {
      title: "Lump-sum savings over 20 years",
      description:
        "$5,000 at 6% compounded monthly with no additional deposits grows to roughly $16,500 in 20 years. Most of the gain comes from compounding on an increasingly large balance in the final decade.",
    },
    {
      title: "Monthly contributions accelerate compounding",
      description:
        "$200 per month at 5% compounded monthly for 30 years can exceed $160,000 even though total contributions are only $72,000—because each deposit compounds for a different length of time.",
    },
    {
      title: "Credit card balance compounding daily",
      description:
        "A $3,000 balance at 22% APR with no payments can grow by hundreds of dollars in interest within a year because daily accrual keeps adding to the balance that tomorrow's interest calculation uses.",
    },
  ],
  commonMistakes: [
    "Assuming quoted annual percentage is always compounded annually—check whether the product uses daily or monthly accrual.",
    "Ignoring regular contributions when projecting retirement balances, which dramatically understates realistic outcomes.",
    "Comparing a loan's interest rate to a savings account rate without aligning compounding frequency and fees.",
    "Expecting linear growth instead of exponential growth, leading to unrealistic timelines for doubling money.",
  ],
};

export const simpleVsCompoundInterestResource: ResourceDefinition = {
  slug: "simple-vs-compound-interest",
  categorySlug: "finance-calculators",
  title: "Simple vs Compound Interest Explained",
  summary:
    "Simple interest applies only to principal; compound interest reinvests earned interest so balances grow faster over time.",
  metaTitle: "Simple vs Compound Interest - Key Differences",
  metaDescription:
    "Compare simple and compound interest with formulas, side-by-side examples, and guidance on when each method applies to savings and loans.",
  keywords: [
    "simple vs compound interest",
    "simple interest",
    "compound interest difference",
    "interest calculation methods",
  ],
  quickAnswer:
    "Simple interest is calculated only on the original principal: I = P × r × t. Compound interest is calculated on principal plus accumulated interest, so each period's earnings increase the base for the next period. Savings accounts and most long-term investments compound; some short-term loans and bonds use simple interest.",
  intro:
    "Interest calculations look similar on paper—a rate, a balance, and time—but simple and compound methods produce very different outcomes over years. Confusing the two leads to bad savings projections, mispriced private loans, and surprise credit card costs. Simple interest is linear: equal interest each period on the same principal base. Compound interest is exponential: the interest base grows, so later periods generate larger dollar amounts even at the same nominal rate. Knowing which method applies helps you interpret bank disclosures, compare investment marketing, and sanity-check personal loan terms from friends or family.",
  primaryToolId: "compound-interest-calculator",
  relatedToolIds: ["loan-payment-calculator", "percentage-calculator"],
  relatedResourceSlugs: ["what-is-compound-interest", "apr-vs-interest-rate"],
  lastReviewed: "2026-05-23",
  sections: [
    {
      id: "simple-interest",
      heading: "How simple interest works",
      paragraphs: [
        "Simple interest uses the formula I = P × r × t, where interest I equals principal P times annual rate r times time t in years. A $1,000 loan at 8% simple interest for three years generates $80 per year—$240 total—because interest always applies to the original $1,000 only.",
        "Some personal loans, car notes from certain lenders, and short-term promissory notes use simple interest when structured with fixed periodic interest on original principal. Bonds may quote simple interest for coupon calculations on face value. Simple math is predictable: total interest is proportional to time and rate with no acceleration.",
      ],
    },
    {
      id: "compound-interest",
      heading: "How compound interest builds on itself",
      paragraphs: [
        "Compound interest adds each period's interest to the balance before calculating the next period. The same $1,000 at 8% compounded annually becomes $1,080, then $1,166.40, then $1,259.71 over three years—about $19.71 more than simple interest on this small example. Scale principal, rate, or years and the gap widens dramatically.",
        "Savings accounts, money market accounts, reinvested fund distributions, and most retirement account growth models assume compounding. Debt products including credit cards and many mortgages accrue interest on outstanding balances that include prior unpaid interest, which is compounding working against you.",
      ],
      linkedToolIds: ["compound-interest-calculator"],
    },
    {
      id: "side-by-side",
      heading: "Side-by-side comparison over time",
      paragraphs: [
        "At low rates and short durations, simple and compound totals look close. Over 20–30 years at moderate return assumptions, compound growth can double or triple simple-interest projections on the same starting deposit. That is why retirement calculators always compound; using simple interest would mislead savers about achievable balances.",
        "On debt, simple-interest loans with fixed payments often amortize principal steadily, while compounding revolving balances can trap minimum payers because interest keeps expanding the base faster than payments shrink it. Always identify whether unpaid interest capitalizes into principal each period.",
      ],
      linkedToolIds: ["compound-interest-calculator", "loan-payment-calculator"],
    },
    {
      id: "when-each-applies",
      heading: "When lenders and accounts use each method",
      paragraphs: [
        "Federal student loans historically used simple daily interest formulas in some programs, while credit cards compound daily on average balances. Auto loans may use simple interest on declining principal as you pay down balance—functionally fair if payments are on time because interest is charged on what you still owe.",
        "Certificates of deposit compound on a disclosed schedule. Treasury bills are often quoted on a discount basis rather than familiar compound savings math. Read the product note: the method matters as much as the headline rate when comparing two otherwise similar offers.",
      ],
    },
    {
      id: "choosing-assumptions",
      heading: "Choosing the right model for your calculation",
      paragraphs: [
        "For long-horizon savings goals, default to compound projections with realistic contribution schedules. For a one-year IOU between individuals, simple interest may match what was verbally agreed unless compounding was specified in writing.",
        "When evaluating APR on loans, regulatory disclosures often bake compounding into APR for consumer products, which is why comparing APR across loans is safer than comparing nominal rates alone. Pair this concept with amortization understanding when analyzing mortgages and installment debt.",
      ],
      linkedToolIds: ["compound-interest-calculator", "loan-payment-calculator"],
    },
  ],
  examples: [
    {
      title: "$10,000 for 10 years at 7%",
      description:
        "Simple interest totals $7,000 in interest ($700 per year). Annual compounding yields about $9,672 ending balance versus $17,000 simple principal-plus-interest stacking—compound ending balance near $19,672 shows how reinvestment changes outcomes.",
    },
    {
      title: "Simple-interest car loan on declining balance",
      description:
        "Borrow $20,000 at 6% simple interest amortized over five years: interest each month applies to remaining principal, so total interest is less than compounding on full original balance for the entire term.",
    },
  ],
  commonMistakes: [
    "Using simple interest formulas for multi-year investment projections.",
    "Assuming all auto loans compound the same way—verify simple vs compound accrual in the note.",
    "Forgetting that unpaid credit card interest compounds into the balance immediately.",
    "Comparing a simple-interest private loan quote to a bank APR without converting methods.",
  ],
};

export const howLoanAmortizationWorksResource: ResourceDefinition = {
  slug: "how-loan-amortization-works",
  categorySlug: "finance-calculators",
  title: "How Loan Amortization Works",
  summary:
    "Amortization splits each loan payment between interest and principal so the loan is fully repaid by the end of the term.",
  metaTitle: "How Loan Amortization Works - Schedule Explained",
  metaDescription:
    "Understand amortization schedules, why early payments are interest-heavy, and how extra principal payments save total interest on mortgages and loans.",
  keywords: [
    "loan amortization",
    "amortization schedule",
    "mortgage amortization",
    "principal vs interest payment",
  ],
  quickAnswer:
    "Amortization is the process of paying off a loan through scheduled payments that cover interest due plus a portion of principal. Early payments are mostly interest because interest is calculated on the remaining balance, which is highest at the start. Each payment reduces principal, so later payments apply more to principal and less to interest.",
  intro:
    "Mortgages, auto loans, and many personal loans use amortization schedules that guarantee a zero balance at the end of the term if every payment is made on time. Understanding amortization helps homeowners decide whether extra principal payments make sense, explains why refinancing resets interest-heavy early years, and clarifies how loan term length affects total interest paid. An amortization table lists each period's payment, interest portion, principal portion, and remaining balance—turning abstract rate quotes into a month-by-month roadmap of equity buildup and interest cost.",
  primaryToolId: "mortgage-calculator-pro",
  relatedToolIds: ["loan-payment-calculator", "compound-interest-calculator"],
  relatedResourceSlugs: ["apr-vs-interest-rate", "what-is-compound-interest"],
  lastReviewed: "2026-05-23",
  sections: [
    {
      id: "payment-formula",
      heading: "How the fixed payment amount is calculated",
      paragraphs: [
        "For a fully amortizing fixed-rate loan, the payment solves so the present value of all payments equals the loan amount. The standard formula uses principal, periodic rate, and number of payments. A 30-year mortgage at 6% on $300,000 produces a fixed monthly payment near $1,799 excluding taxes and insurance.",
        "That payment number stays constant, but its internal split changes every month. Month one applies a large interest charge on $300,000 and a smaller principal reduction. Month 360 applies a tiny interest charge on a near-zero balance and almost entirely principal. The schedule is deterministic once rate, term, and principal are fixed.",
      ],
      linkedToolIds: ["mortgage-calculator-pro", "loan-payment-calculator"],
    },
    {
      id: "interest-heavy-start",
      heading: "Why the beginning of a loan feels slow for equity",
      paragraphs: [
        "Interest each period equals remaining balance times periodic rate. When balance is high, interest dominates the payment even though the payment itself never changed. New homeowners often feel frustrated that early statements show modest principal paydown—that is normal amortization math, not a lender trick.",
        "This pattern also explains why refinancing into a new 30-year term resets the interest-heavy front end even if the rate drops. You may lower monthly cash flow but reextend principal reduction timing unless you choose a shorter term or pay extra principal deliberately.",
      ],
      linkedToolIds: ["mortgage-calculator-pro"],
    },
    {
      id: "extra-payments",
      heading: "How extra principal payments change the schedule",
      paragraphs: [
        "Additional principal reduces the balance immediately, which lowers every future interest calculation. A single extra payment in year two saves more total interest than the same extra payment in year twenty because it affects more downstream periods. Many borrowers make one extra payment per year or round up monthly payments to shave years off a mortgage.",
        "Some loans include prepayment penalties—rare on many primary mortgages but possible on commercial or subprime notes. Always confirm before accelerating paydown. Even modest extra principal can remove tens of thousands in mortgage interest over decades without requiring a full refinance.",
      ],
      linkedToolIds: ["mortgage-calculator-pro", "loan-payment-calculator"],
    },
    {
      id: "term-tradeoffs",
      heading: "15-year vs 30-year amortization tradeoffs",
      paragraphs: [
        "Shorter terms mean higher monthly payments but far less total interest because principal declines faster and rate is often lower. A 15-year loan builds equity quickly and suits borrowers with stable cash flow who prioritize debt-free housing sooner.",
        "Longer terms improve monthly affordability at the cost of higher lifetime interest and slower equity accumulation early on. Investors sometimes prefer longer amortization on rental properties to preserve cash flow while evaluating property-level returns separately from personal housing goals.",
      ],
      linkedToolIds: ["mortgage-calculator-pro"],
    },
    {
      id: "reading-schedule",
      heading: "Reading an amortization schedule line by line",
      paragraphs: [
        "Each row shows payment number, payment amount, interest portion, principal portion, and remaining balance. Summing the interest column reveals total borrowing cost alongside rate. Comparing schedules at different rates or terms makes abstract APR differences concrete in dollar terms.",
        "Adjustable-rate loans may recalculate payments when rates reset, producing schedules that are not fixed for the full term. Interest-only periods temporarily suppress principal paydown, after which amortization may accelerate to retire balance by maturity—watch for payment shock when interest-only windows end.",
      ],
      linkedToolIds: ["mortgage-calculator-pro", "loan-payment-calculator"],
    },
  ],
  examples: [
    {
      title: "First-year mortgage payment split",
      description:
        "On a $250,000 loan at 6.5% over 30 years, early monthly payments near $1,580 may allocate over $1,350 to interest and only about $230 to principal—demonstrating why equity builds slowly at first.",
    },
    {
      title: "One extra payment per year",
      description:
        "Adding one full monthly payment annually on a 30-year mortgage can shorten payoff by several years and cut total interest materially because each prepayment permanently reduces the compounding base.",
    },
    {
      title: "15-year vs 30-year total interest",
      description:
        "The same $300,000 borrowed at 6% costs far more total interest over 30 years than 15 years even though the 15-year payment is higher—shorter amortization retires principal faster.",
    },
  ],
  commonMistakes: [
    "Confusing monthly payment with mostly principal reduction in early years.",
    "Refinancing to a lower rate but resetting to a new 30-year term without comparing total interest.",
    "Making extra payments without specifying principal application when lenders allow split posting.",
    "Ignoring taxes and insurance when comparing housing payment affordability to rent.",
  ],
};

export const aprVsInterestRateResource: ResourceDefinition = {
  slug: "apr-vs-interest-rate",
  categorySlug: "finance-calculators",
  title: "APR vs Interest Rate Explained",
  summary:
    "The interest rate is the cost of borrowing on the balance; APR includes rate plus certain fees expressed as an annualized percentage.",
  metaTitle: "APR vs Interest Rate - What's the Difference?",
  metaDescription:
    "Learn when to compare APR instead of nominal interest rate on loans and credit products, with examples for mortgages and personal loans.",
  keywords: ["apr vs interest rate", "what is apr", "annual percentage rate", "nominal interest rate"],
  quickAnswer:
    "The interest rate (note rate) is the percentage applied to your loan balance to calculate interest charges. APR (Annual Percentage Rate) is a broader disclosure that includes the interest rate plus certain upfront finance charges spread over the loan term. APR helps compare loan offers; the note rate drives your monthly interest accrual.",
  intro:
    "Loan marketing highlights attractive rates, but regulatory APR disclosures exist because headline rates alone hide fees that raise true borrowing cost. Understanding the difference between note rate and APR prevents comparing apples to oranges when shopping mortgages, auto loans, and personal credit lines. APR is not perfect—it excludes some costs like appraisal or title in certain mortgage contexts depending on regulation—but it standardizes finance charges lenders must include. For savers, APY plays a parallel role to APR on the deposit side by reflecting compounding in yield comparisons.",
  primaryToolId: "loan-payment-calculator",
  relatedToolIds: ["mortgage-calculator-pro", "compound-interest-calculator"],
  relatedResourceSlugs: ["how-loan-amortization-works", "simple-vs-compound-interest"],
  lastReviewed: "2026-05-23",
  sections: [
    {
      id: "note-rate",
      heading: "What the interest rate actually controls",
      paragraphs: [
        "The contract interest rate determines how much interest accrues each period on your outstanding balance. Fixed-rate loans keep that accrual formula stable; adjustable loans change the rate index plus margin after initial fixed windows. Monthly interest charge equals balance times periodic rate derived from the note rate.",
        "Borrowers often focus on note rate because it directly affects payment size alongside term and principal. A quarter-point rate reduction on a large mortgage saves meaningful monthly cash flow and total interest even when APR moves less dramatically because fees are amortized into APR differently than rate changes.",
      ],
      linkedToolIds: ["loan-payment-calculator", "mortgage-calculator-pro"],
    },
    {
      id: "apr-definition",
      heading: "What APR adds to the picture",
      paragraphs: [
        "APR expresses total selected finance charges as if they were spread evenly across the loan life, producing a single annualized percentage for comparison shopping. Origination fees, discount points expressed as lender charges, and certain mandatory credit insurance costs may be included depending on product and jurisdiction.",
        "Because APR spreads upfront fees over the full term, a loan you pay off early can effectively cost more than APR suggested—fees were front-loaded but spread mathematically across years you will not use. Conversely, longer holding periods make APR more representative of realized cost.",
      ],
      linkedToolIds: ["loan-payment-calculator"],
    },
    {
      id: "mortgage-context",
      heading: "APR on mortgages vs other consumer loans",
      paragraphs: [
        "Mortgage APR includes interest and lender fees but may exclude third-party costs like title insurance or recording fees depending on disclosure rules. Still, comparing APR across two lender Loan Estimates on the same day with similar lock terms is standard practice for ranking offers.",
        "Auto and personal loans with flat origination fees show APR notably above note rate when fees are large relative to loan size and term. Zero-percent auto promotions may bundle cost into price instead of rate, which APR attempts to surface when fees exist.",
      ],
      linkedToolIds: ["mortgage-calculator-pro", "loan-payment-calculator"],
    },
    {
      id: "apy-contrast",
      heading: "APR for borrowing vs APY for saving",
      paragraphs: [
        "APY (Annual Percentage Yield) on deposit accounts reflects compounding frequency, helping savers compare savings and CD products. APR on borrowing reflects mandated cost disclosures including selected fees. Mixing APY with note rate without context leads to confusion when deciding whether to pay debt or keep cash in savings.",
        "A useful rule: compare APY to APY for investments and APR to APR for loans. Compare note rates when isolating how fast a balance accrues interest before fees, especially for large mortgages where fee impact on APR may be smaller than rate impact on payment.",
      ],
    },
    {
      id: "shopping-practice",
      heading: "Practical loan shopping with both numbers",
      paragraphs: [
        "Request written quotes showing note rate, APR, monthly payment, and itemized lender fees. If two loans have identical note rates but different APR, the higher APR likely carries higher finance charges. If note rates differ but APR ranks opposite, check fee structures and term assumptions.",
        "Run payment calculations at the note rate to confirm affordability, then use APR to compare total mandated finance cost among similar products you might actually close. Recompute if you plan early payoff because realized cost may diverge from APR optimized for full-term holding.",
      ],
      linkedToolIds: ["loan-payment-calculator", "mortgage-calculator-pro"],
    },
  ],
  examples: [
    {
      title: "Personal loan with origination fee",
      description:
        "$10,000 borrowed at 10% note rate for 5 years with a $300 origination fee shows APR above 10% because fees increase effective cost even though accrual uses 10% on balance.",
    },
    {
      title: "Mortgage with discount points",
      description:
        "Paying points lowers note rate but raises upfront cash; APR helps show whether rate reduction justifies points versus a higher-rate loan with lower closing costs.",
    },
  ],
  commonMistakes: [
    "Comparing a mortgage note rate to a credit card APR without understanding daily accrual differences.",
    "Assuming APR includes all closing costs on every mortgage quote.",
    "Ignoring planned early payoff when APR spreads fees across full 30-year term.",
    "Treating promotional 0% APR periods as permanent without noting deferred interest traps.",
  ],
};

export const howToCalculatePercentageChangeResource: ResourceDefinition = {
  slug: "how-to-calculate-percentage-change",
  categorySlug: "finance-calculators",
  title: "How to Calculate Percentage Change",
  summary:
    "Percentage change measures relative increase or decrease from an original value to a new value.",
  metaTitle: "How to Calculate Percentage Change - Formula & Examples",
  metaDescription:
    "Learn the percentage change formula, difference between increase and decrease, and common pitfalls when analyzing prices, returns, and metrics.",
  keywords: [
    "percentage change formula",
    "how to calculate percent change",
    "percent increase decrease",
    "relative change calculation",
  ],
  quickAnswer:
    "Percentage change = ((New Value − Old Value) ÷ Old Value) × 100. A positive result is a percent increase; negative is a decrease. Always divide by the original (old) value, not the new one, unless you intentionally want percentage difference relative to a different baseline.",
  intro:
    "Percentage change appears everywhere in personal finance and business analysis: stock and portfolio returns, sale prices, inflation comparisons, revenue growth, and fitness progress photos translated into scale numbers. Using the correct baseline prevents misleading headlines—a drop from $100 to $80 is a 20% decrease, but recovering from $80 back to $100 is a 25% increase because the denominator changed. Mastering the formula and its edge cases keeps dashboards, spreadsheets, and mental math honest when communicating movement between two points in time.",
  primaryToolId: "percentage-calculator",
  relatedToolIds: ["compound-interest-calculator", "break-even-calculator"],
  relatedResourceSlugs: ["what-is-compound-interest", "simple-vs-compound-interest"],
  lastReviewed: "2026-05-23",
  sections: [
    {
      id: "basic-formula",
      heading: "The standard percentage change formula",
      paragraphs: [
        "Subtract the old value from the new value to get absolute change. Divide that difference by the old value to express change relative to where you started. Multiply by 100 to convert the decimal to a percentage readable in reports and charts.",
        "Example: price rises from $40 to $50. Difference is $10. $10 ÷ $40 = 0.25 → 25% increase. The same $10 move from $50 down to $40 is $10 ÷ $50 = 20% decrease. Direction and baseline both matter for interpretation.",
      ],
      linkedToolIds: ["percentage-calculator"],
    },
    {
      id: "increase-vs-decrease",
      heading: "Percent increase and decrease are not symmetric",
      paragraphs: [
        "A 50% loss requires a 100% gain to break even because the post-loss baseline is smaller. Investors and analysts who forget this symmetry mis-set recovery expectations after drawdowns. Always re-anchor to the current baseline when projecting required bounce-back.",
        "Reporting conventions often color decreases red and increases green, but cross-category comparisons need consistent time windows. Month-over-month and year-over-year percentage changes answer different questions and should be labeled explicitly in dashboards.",
      ],
      linkedToolIds: ["percentage-calculator"],
    },
    {
      id: "multiple-periods",
      heading: "Single-period change vs compounded multi-period growth",
      paragraphs: [
        "Percentage change between two endpoints is one calculation. Average annual growth over many years uses geometric (CAGR) logic, not arithmetic averaging of yearly percentage changes. Quoting simple percentage change across five years without CAGR can overstate or understate typical yearly experience.",
        "When analyzing investment statements, distinguish total return percentage change from annualized return. Compound interest calculators help bridge from lump-sum growth assumptions to annualized rates when contributions vary over time.",
      ],
      linkedToolIds: ["percentage-calculator", "compound-interest-calculator"],
    },
    {
      id: "edge-cases",
      heading: "Zeros, negatives, and small bases",
      paragraphs: [
        "Percentage change from zero is undefined mathematically because division by zero is invalid. From a small near-zero baseline, large percentage swings may be technically correct but misleading—absolute change often tells a clearer story for early-stage metrics.",
        "When values cross from negative to positive, percentage change is rarely meaningful for communication; use absolute dollar improvement instead. Financial analysts sometimes use basis points (hundredths of a percent) when discussing rate moves on already-small percentages like bond yields.",
      ],
      linkedToolIds: ["percentage-calculator"],
    },
    {
      id: "applications",
      heading: "Everyday applications in finance and budgeting",
      paragraphs: [
        "Track grocery, rent, or utility bill changes month to month with the standard formula to see which categories drive budget drift. Compare sale discounts by treating shelf price as old value and checkout price as new value—verify whether tax or unit size changed before attributing full move to discount.",
        "Business users calculate revenue or expense line percentage changes in variance analysis. Pair percentage change with absolute dollar variance so stakeholders see both relative momentum and materiality to the bottom line.",
      ],
      linkedToolIds: ["percentage-calculator"],
    },
  ],
  examples: [
    {
      title: "Stock price move",
      description:
        "Shares rise from $28 to $35: (($35 − $28) ÷ $28) × 100 ≈ 25% increase. If they fall back to $28 from $35, change is −20%, not −25%.",
    },
    {
      title: "Salary raise evaluation",
      description:
        "Income increases from $55,000 to $60,500: $5,500 ÷ $55,000 ≈ 10% raise—useful for comparing to inflation or market benchmarks in the same year.",
    },
    {
      title: "Budget category spike",
      description:
        "Dining spend goes from $320 to $416 monthly: 30% increase signals a lifestyle or pricing shift worth investigating in absolute dollars ($96) as well as percent.",
    },
  ],
  commonMistakes: [
    "Dividing by the new value instead of the original when calculating change.",
    "Assuming a 20% drop and 20% rise return to the same number.",
    "Averaging multiple percentage changes arithmetically across years instead of using CAGR.",
    "Quoting huge percentage gains from a negligible starting baseline without context.",
  ],
};

export const whatIsDscrResource: ResourceDefinition = {
  slug: "what-is-dscr",
  categorySlug: "real-estate-calculators",
  title: "What Is DSCR in Real Estate?",
  summary:
    "Debt service coverage ratio (DSCR) compares property net operating income to annual mortgage debt service.",
  metaTitle: "What Is DSCR? Debt Service Coverage Ratio Explained",
  metaDescription:
    "Learn how to calculate DSCR for rental properties, typical lender minimums, and how NOI and debt service fit together in investment analysis.",
  keywords: ["what is dscr", "debt service coverage ratio", "dscr real estate", "dscr formula"],
  quickAnswer:
    "DSCR = Net Operating Income (NOI) ÷ Annual Debt Service. A DSCR of 1.25 means NOI covers required loan payments with a 25% cushion. Lenders use DSCR to assess whether rental income can support the mortgage; investors use it alongside cap rate and cash-on-cash return.",
  intro:
    "DSCR is a core metric for income-producing real estate financing. While cap rate measures unlevered yield relative to price, DSCR focuses on whether cash flow after operating expenses can reliably pay the lender. Commercial lenders and many residential DSCR loan programs publish minimum thresholds—often near 1.20 to 1.25 for stabilized assets—though requirements vary by property type, market, and borrower strength. Understanding DSCR helps you pre-screen deals before ordering appraisals, negotiate loan terms with realistic NOI assumptions, and explain why a property with strong cap rate might still struggle to qualify if financing is aggressive.",
  primaryToolId: "dscr-calculator",
  relatedToolIds: ["noi-calculator", "cap-rate-calculator", "cash-on-cash-calculator"],
  relatedResourceSlugs: ["cash-on-cash-return-explained", "what-is-grm"],
  lastReviewed: "2026-05-23",
  sections: [
    {
      id: "formula",
      heading: "The DSCR formula and components",
      paragraphs: [
        "Net operating income is gross rental income minus vacancy and operating expenses—taxes, insurance, maintenance, management, utilities if owner-paid, and reserves. It excludes mortgage payments, depreciation, and income taxes. Annual debt service is total required loan payments over twelve months: principal plus interest on all property loans.",
        "DSCR divides NOI by debt service. At 1.0, NOI exactly equals debt service with no cushion. Below 1.0, the property does not cover debt from operations alone—a red flag for most lenders unless compensating strengths exist. Above 1.25, many programs consider coverage adequate for standard underwriting.",
      ],
      linkedToolIds: ["dscr-calculator", "noi-calculator"],
    },
    {
      id: "lender-view",
      heading: "How lenders interpret DSCR",
      paragraphs: [
        "Lenders want confidence that rent can pay the mortgage through moderate vacancy or expense spikes. DSCR loans on residential rentals sometimes use market rent from appraisal rather than actual lease history for vacant or newly acquired properties. Stress tests may apply higher interest rates or lower income assumptions than your pro forma.",
        "Commercial underwriting often requires minimum DSCR covenants throughout the loan term. Falling below covenant triggers scrutiny or default remedies. Investors should model DSCR at conservative rent and higher rate scenarios, not only at today's optimistic inputs.",
      ],
      linkedToolIds: ["dscr-calculator"],
    },
    {
      id: "vs-cap-rate",
      heading: "DSCR vs cap rate and cash-on-cash",
      paragraphs: [
        "Cap rate ignores financing: NOI divided by purchase price or value. DSCR brings debt into the picture. Two properties with identical NOI and price can have different DSCR if one buyer puts more leverage on the asset. Cash-on-cash return measures investor cash flow after debt relative to cash invested—another levered lens complementary to DSCR.",
        "Strong cap rate with weak DSCR usually means financing is too heavy for the income stream. Weak cap rate with strong DSCR might indicate large down payment or favorable loan terms rather than exceptional property economics. Use multiple metrics together.",
      ],
      linkedToolIds: ["dscr-calculator", "cap-rate-calculator", "cash-on-cash-calculator"],
    },
    {
      id: "improving-dscr",
      heading: "Ways to improve DSCR on a deal",
      paragraphs: [
        "Increase NOI by raising rents where market supports, reducing vacancy, or trimming controllable expenses without deferring maintenance dangerously. Refinance to lower rate or longer amortization reduces annual debt service, improving DSCR—though total interest paid may rise.",
        "Larger down payment reduces loan amount and debt service directly. Negotiating purchase price lowers debt needed for the same NOI, boosting both cap rate and DSCR simultaneously. Value-add investors project future DSCR after renovations and lease-up timelines lenders may or may not accept.",
      ],
      linkedToolIds: ["dscr-calculator", "noi-calculator"],
    },
    {
      id: "limitations",
      heading: "Limitations and pro forma honesty",
      paragraphs: [
        "DSCR relies on accurate NOI inputs. Overstated rent, understated vacancy, or omitted management fees inflates DSCR artificially. Seasonal rentals and short-term listings introduce income volatility that static annual DSCR may not capture without monthly cash flow modeling.",
        "Interest-only periods temporarily improve cash flow but do not reduce principal; eventual amortization can stress future DSCR if income does not grow. Always read loan transition terms when comparing DSCR at acquisition versus year five.",
      ],
      linkedToolIds: ["dscr-calculator"],
    },
  ],
  examples: [
    {
      title: "Fourplex stabilization",
      description:
        "NOI $48,000, annual debt service $36,000 → DSCR = 1.33. Lender requiring 1.25 minimum clears with modest cushion for vacancy spikes.",
    },
    {
      title: "Aggressive leverage failure",
      description:
        "Same property with higher loan payment pushing debt service to $50,000 yields DSCR 0.96—operations alone cannot cover debt; borrower must subsidize from other income.",
    },
    {
      title: "Refinance impact",
      description:
        "Lowering annual debt service from $40,000 to $34,000 on $52,000 NOI raises DSCR from 1.30 to 1.53 without changing rents.",
    },
  ],
  commonMistakes: [
    "Using gross rent instead of NOI in the numerator.",
    "Including only interest while omitting principal portion of debt service.",
    "Applying pro forma rents without vacancy and expense reserves lenders will reject.",
    "Comparing DSCR across properties with different expense reimbursement structures in commercial leases.",
  ],
};

export const cashOnCashReturnResource: ResourceDefinition = {
  slug: "cash-on-cash-return-explained",
  categorySlug: "real-estate-calculators",
  title: "Cash-on-Cash Return Explained",
  summary:
    "Cash-on-cash return measures annual pre-tax cash flow relative to total cash invested in a property.",
  metaTitle: "Cash-on-Cash Return Explained for Rental Investors",
  metaDescription:
    "Learn the cash-on-cash return formula, how it differs from cap rate, and worked examples for evaluating leveraged rental deals.",
  keywords: [
    "cash on cash return",
    "cash-on-cash formula",
    "rental property return",
    "real estate cash flow return",
  ],
  quickAnswer:
    "Cash-on-cash return = Annual Pre-Tax Cash Flow ÷ Total Cash Invested × 100. Cash invested typically includes down payment, closing costs, and initial repairs. It shows how hard your out-of-pocket dollars work after financing, unlike cap rate which ignores leverage.",
  intro:
    "Real estate investors often quote cash-on-cash return because it speaks directly to the money they actually wire at closing. A property with a modest cap rate can still deliver attractive cash-on-cash returns when financing is favorable and down payment is small—but leverage cuts both ways when vacancy rises or rates reset. Cash-on-cash complements cap rate, DSCR, and GRM rather than replacing them. Use it to compare deals with similar financing assumptions, set minimum hurdles for new acquisitions, and communicate performance to partners who care about distribution yield on contributed capital.",
  primaryToolId: "cash-on-cash-calculator",
  relatedToolIds: ["dscr-calculator", "cap-rate-calculator", "rental-deal-analyzer"],
  relatedResourceSlugs: ["what-is-dscr", "what-is-grm"],
  lastReviewed: "2026-05-23",
  sections: [
    {
      id: "formula",
      heading: "Calculating cash-on-cash step by step",
      paragraphs: [
        "Start with annual rental income minus all operating expenses and annual debt service to get pre-tax cash flow. Divide by total cash invested at acquisition—down payment, buyer closing costs, immediate capex, and sometimes reserves if treated as deployed capital.",
        "Example: $12,000 annual cash flow after debt service on $100,000 cash invested equals 12% cash-on-cash return. The same property unlevered might show a 6% cap rate while cash-on-cash doubles because financing amplifies equity returns when spread is positive.",
      ],
      linkedToolIds: ["cash-on-cash-calculator"],
    },
    {
      id: "vs-cap-rate",
      heading: "Cash-on-cash vs cap rate",
      paragraphs: [
        "Cap rate uses NOI without subtracting debt service, divided by property value or price. It answers unlevered yield on the asset. Cash-on-cash uses cash flow after debt relative to equity invested. High leverage increases cash-on-cash when NOI exceeds debt service but increases risk if income wobbles.",
        "Comparing cap rates across markets normalizes property economics. Comparing cash-on-cash across deals requires similar loan terms—otherwise you may be ranking financing luck more than asset quality.",
      ],
      linkedToolIds: ["cash-on-cash-calculator", "cap-rate-calculator"],
    },
    {
      id: "drivers",
      heading: "What drives cash-on-cash higher or lower",
      paragraphs: [
        "Lower purchase price, higher rents, controlled expenses, and favorable interest rates improve cash flow numerator. Smaller down payments shrink denominator but raise debt service—net effect depends on spread between cap rate and borrowing cost.",
        "Major capital improvements spent at closing increase cash invested unless financed separately. Tax benefits like depreciation improve after-tax economics but are excluded from standard pre-tax cash-on-cash unless you explicitly model after-tax variants.",
      ],
      linkedToolIds: ["cash-on-cash-calculator", "rental-deal-analyzer"],
    },
    {
      id: "benchmarks",
      heading: "Interpreting benchmarks and targets",
      paragraphs: [
        "Target cash-on-cash varies by market, property class, and investor preference. Some buyers accept 6–8% in appreciation-heavy coastal markets; others demand 10%+ in cash-flow-focused Midwest markets. Always compare to alternative uses of the same capital including index funds and debt paydown.",
        "Year-one cash-on-cash may differ from stabilized year-three results after lease-up, rent increases, or expense normalization. Value-add projects should quote both current and stabilized cash-on-cash with realistic timelines and renovation overruns baked in.",
      ],
      linkedToolIds: ["cash-on-cash-calculator"],
    },
    {
      id: "risks",
      heading: "Risks of over-focusing on cash-on-cash",
      paragraphs: [
        "Interest-only loans can inflate early cash-on-cash by deferring principal paydown without building equity through amortization. Ignoring reserves for roof, HVAC, or turnover depresses true economic return even when pro forma cash-on-cash looks strong.",
        "Pair cash-on-cash with DSCR for lender viability and cap rate for asset-level pricing discipline. Exit cap rate changes affect sale proceeds more than annual cash-on-cash snapshot suggests—total return includes appreciation, amortization, and tax effects over hold period.",
      ],
      linkedToolIds: ["cash-on-cash-calculator", "dscr-calculator"],
    },
  ],
  examples: [
    {
      title: "Single-family rental with 25% down",
      description:
        "$1,800 monthly rent, $1,050 expenses and debt service monthly → $9,000 annual cash flow. $75,000 cash invested → 12% cash-on-cash.",
    },
    {
      title: "Leverage sensitivity",
      description:
        "Same property with larger down payment lowers debt service but raises cash invested—cash-on-cash may fall even though risk decreases.",
    },
  ],
  commonMistakes: [
    "Excluding closing costs and initial repairs from cash invested.",
    "Using gross rent minus mortgage only, skipping taxes, insurance, and vacancy.",
    "Comparing cash-on-cash across deals with different loan terms without adjustment.",
    "Treating year-one promotional tenant rent as permanent in the numerator.",
  ],
};

export const whatIsGrmResource: ResourceDefinition = {
  slug: "what-is-grm",
  categorySlug: "real-estate-calculators",
  title: "What Is GRM in Real Estate?",
  summary:
    "Gross rent multiplier (GRM) divides property price by gross annual rental income for quick screening comparisons.",
  metaTitle: "What Is GRM? Gross Rent Multiplier Explained",
  metaDescription:
    "Learn the gross rent multiplier formula, how GRM compares to cap rate, and when investors use GRM for fast rental property screening.",
  keywords: ["what is grm", "gross rent multiplier", "grm formula", "grm real estate"],
  quickAnswer:
    "GRM = Property Price ÷ Gross Annual Rent. A GRM of 10 means the price equals ten times one year of gross rent before expenses. Lower GRM suggests cheaper relative to rent roll; higher GRM suggests premium pricing. GRM ignores expenses, vacancy, and financing.",
  intro:
    "GRM is one of the fastest back-of-envelope metrics in residential rental screening. When browsing listings, dividing asking price by annual gross rent tells you in seconds whether a property sits near local norms. It is deliberately crude—no vacancy, no taxes, no capex—but that simplicity makes it useful for filtering dozens of deals before deeper NOI and cap rate work. Experienced investors know GRM varies by neighborhood, property condition, and rent control environment. Treat GRM as a first-pass sort, not a final investment decision, and always graduate promising candidates to cap rate, cash-on-cash, and DSCR analysis.",
  primaryToolId: "grm-calculator",
  relatedToolIds: ["cap-rate-calculator", "noi-calculator", "rental-deal-analyzer"],
  relatedResourceSlugs: ["what-is-dscr", "cash-on-cash-return-explained"],
  lastReviewed: "2026-05-23",
  sections: [
    {
      id: "formula",
      heading: "How to calculate gross rent multiplier",
      paragraphs: [
        "Sum gross scheduled annual rent from all units—use market rent for vacant units when screening listings. Divide purchase price or estimated value by that gross rent. If monthly rent is $2,000, gross annual rent is $24,000. A $240,000 price yields GRM 10.",
        "GRM is often expressed as a raw multiplier rather than percentage. Local agents may say properties in a submarket trade between GRM 8 and 11, giving you a band for quick comparison without full expense schedules.",
      ],
      linkedToolIds: ["grm-calculator"],
    },
    {
      id: "vs-cap-rate",
      heading: "GRM vs cap rate and NOI-based metrics",
      paragraphs: [
        "Cap rate uses net operating income after expenses in the numerator. GRM uses gross rent only. Two properties with identical GRM can have wildly different cap rates if expense ratios differ—older buildings with high maintenance may look fine on GRM but fail on cap rate.",
        "Rough rule: Cap Rate ≈ 1 ÷ GRM when expenses are near zero—rare in practice. More useful is tracking GRM and cap rate together as you refine assumptions. GRM finds candidates; cap rate validates economics.",
      ],
      linkedToolIds: ["grm-calculator", "cap-rate-calculator"],
    },
    {
      id: "market-norms",
      heading: "Interpreting GRM by market context",
      paragraphs: [
        "High-demand, low-yield markets often show higher GRM because investors accept lower rent multiples betting on appreciation or scarcity. Cash-flow markets may cluster at lower GRM with higher relative rent. Compare within the same submarket and property type—single-family vs small multifamily vs condo.",
        "Rent-controlled units distort GRM because gross rent may sit below market, inflating multiplier relative to economic income. Adjust to market rent when regulations allow future increases or when analyzing resale to investor buyers.",
      ],
      linkedToolIds: ["grm-calculator"],
    },
    {
      id: "screening-workflow",
      heading: "Using GRM in a screening workflow",
      paragraphs: [
        "Set a maximum GRM threshold based on local comps and move on quickly from listings above it. For survivors, build quick expense ratios—50% rule, $ management percent, or detailed line items—to estimate NOI and graduate to cap rate and cash-on-cash.",
        "GRM also helps sanity-check broker OM asking prices in small residential deals where formal cap tables are absent. Cross-check against recent sold comps' implied GRM when possible.",
      ],
      linkedToolIds: ["grm-calculator", "rental-deal-analyzer"],
    },
    {
      id: "limitations",
      heading: "Limitations investors should respect",
      paragraphs: [
        "GRM ignores vacancy, operating expenses, capital expenditures, and financing entirely. A low GRM property with catastrophic deferred maintenance may underperform a higher GRM property with new systems and stable tenants.",
        "Short-term rental gross income spikes can temporarily depress GRM without guaranteeing long-term stabilized performance. Always stress-test regulatory changes affecting STR income before relying on trailing gross rent.",
      ],
      linkedToolIds: ["grm-calculator"],
    },
  ],
  examples: [
    {
      title: "Duplex listing comparison",
      description:
        "Property A: $350,000, $36,000 gross rent → GRM 9.72. Property B: $380,000, $42,000 gross rent → GRM 9.05. B offers more rent per dollar of price on gross basis.",
    },
    {
      title: "From GRM toward cap rate",
      description:
        "GRM 12 with 40% expense ratio implies rough cap rate near 5% (1/12 adjusted)—use detailed NOI before offer, not GRM alone.",
    },
  ],
  commonMistakes: [
    "Using one month's rent instead of annual gross rent in the denominator.",
    "Comparing GRM across cities with different expense and tax structures without deeper analysis.",
    "Treating lower GRM as always better—quality, location, and tenant profile matter.",
    "Ignoring below-market rents that inflate GRM artificially on rent-controlled assets.",
  ],
};

export const whatAreMacronutrientsResource: ResourceDefinition = {
  slug: "what-are-macronutrients",
  categorySlug: "health-fitness-calculators",
  title: "What Are Macronutrients?",
  summary:
    "Macronutrients—protein, carbohydrates, and fat—are the calorie-providing nutrients your body needs in large amounts daily.",
  metaTitle: "What Are Macronutrients? Protein, Carbs & Fat Guide",
  metaDescription:
    "Learn the three macronutrients, their calorie values, typical intake ranges, and how to balance macros for your goals using a free macro calculator.",
  keywords: ["what are macronutrients", "macros explained", "protein carbs fat", "macronutrient ratios"],
  quickAnswer:
    "Macronutrients are nutrients required in gram-sized amounts that supply energy: protein (4 calories per gram), carbohydrates (4 calories per gram), and fat (9 calories per gram). Alcohol also provides 7 calories per gram but is not considered essential. Balancing macros helps align diet with goals like weight loss, muscle gain, or endurance performance.",
  intro:
    "Nutrition labels and fitness apps constantly reference macros, but the term can feel abstract until you connect grams on a plate to energy and body composition outcomes. Macronutrients structure every meal plan: protein supports tissue repair and satiety, carbohydrates fuel high-intensity work and brain glucose needs, and fats carry fat-soluble vitamins while providing dense energy. Tracking macros is optional—many people eat healthfully without scales—but understanding the categories helps you interpret calculator output, compare diet approaches, and adjust portions when progress stalls without guessing randomly at calories alone.",
  primaryToolId: "macro-calculator",
  relatedToolIds: ["calorie-calculator", "bmi-calculator"],
  relatedResourceSlugs: ["protein-intake-guidelines", "how-tdee-is-calculated"],
  lastReviewed: "2026-05-23",
  sections: [
    {
      id: "three-macros",
      heading: "The three primary macronutrients",
      paragraphs: [
        "Protein breaks down into amino acids used for muscle repair, enzymes, hormones, and immune function. Dietary guidelines often recommend moderate-to-higher protein during fat loss or strength training to preserve lean mass. Common sources include meat, fish, eggs, dairy, legumes, and soy.",
        "Carbohydrates include sugars, starches, and fiber. Digestible carbs provide glucose for immediate and stored glycogen energy. Fiber supports digestive health and does not contribute fully to calorie absorption the way starches do. Sources span grains, fruit, vegetables, and legumes.",
        "Fat provides essential fatty acids and helps absorb vitamins A, D, E, and K. Unsaturated fats from olive oil, nuts, and fish dominate heart-healthy patterns; saturated fat moderation is commonly advised. Fat is calorie-dense, so small volume changes move daily totals quickly.",
      ],
      linkedToolIds: ["macro-calculator"],
    },
    {
      id: "calorie-values",
      heading: "Calorie values and energy balance context",
      paragraphs: [
        "Atwater factors assign roughly 4 kcal per gram protein, 4 kcal per gram carbohydrate, and 9 kcal per gram fat. Food labels round these values, so summed macros may differ slightly from label calorie totals due to fiber, sugar alcohols, and rounding rules.",
        "Macro targets only work inside total calorie context. Eating high protein but blowing calorie budget still yields weight gain. Macro calculators start from estimated maintenance or goal calories—TDEE or adjusted deficit/surplus—then split percentages or grams across protein, carbs, and fat.",
      ],
      linkedToolIds: ["macro-calculator", "calorie-calculator"],
    },
    {
      id: "ratio-approaches",
      heading: "Common macro ratio approaches",
      paragraphs: [
        "Balanced diets might land near 30% protein, 40% carbs, 30% fat for general health—exact splits vary by preference. Lower-carb approaches shift percentage toward protein and fat. Endurance athletes often emphasize higher carbohydrate availability for glycogen.",
        "Grams per pound of body weight matter for protein and sometimes fat minimums, while carbs fill remaining calories flexibly. Setting protein first—often 0.7–1.0 g per lb target weight during cuts—then fat minimum near 0.25–0.35 g per lb, assigns carbs to the remainder.",
      ],
      linkedToolIds: ["macro-calculator"],
    },
    {
      id: "tracking-practice",
      heading: "Tracking macros in daily practice",
      paragraphs: [
        "Food scales and database apps improve accuracy more than eyeballing portions. Weigh key protein sources and calorie-dense fats; vegetables and low-calorie fillers can be less precisely measured if time is limited.",
        "Consistency beats perfection: same estimation method week to week reveals trends. Adjust macros when weight trend stalls for several weeks, not after one high-sodium day of water retention. Pair macro targets with adequate micronutrients, hydration, and sleep.",
      ],
      linkedToolIds: ["macro-calculator"],
    },
    {
      id: "special-populations",
      heading: "Adjustments for goals and populations",
      paragraphs: [
        "Muscle gain phases often pair slight calorie surplus with higher protein and training stimulus. Fat loss phases prioritize protein and total calorie deficit while keeping fat and carbs as tolerable for adherence. Medical conditions like diabetes or kidney disease require professional guidance beyond generic macro splits.",
        "Plant-based eaters combine legumes, grains, and soy to cover amino acid profiles. Older adults may benefit from higher protein within overall calorie needs to combat sarcopenia. Pregnancy and lactation change requirements substantially—use specialized guidance, not generic fitness calculators alone.",
      ],
      linkedToolIds: ["macro-calculator", "calorie-calculator"],
    },
  ],
  examples: [
    {
      title: "2,000 calorie balanced split",
      description:
        "30% protein → 150 g (600 kcal). 40% carbs → 200 g (800 kcal). 30% fat → 67 g (600 kcal). Verify grams × calorie factors sum near 2,000.",
    },
    {
      title: "Protein-first planning",
      description:
        "180 lb athlete targets 0.8 g/lb protein → 144 g (576 kcal). Fat at 0.3 g/lb → 54 g (486 kcal). Remaining ~938 kcal from carbs ≈ 235 g.",
    },
  ],
  commonMistakes: [
    "Setting macro percentages without anchoring to a calculated calorie target first.",
    "Ignoring fiber and assuming all carbohydrates affect energy equally.",
    "Cutting fat below minimum thresholds, harming hormones and satiety.",
    "Expecting macro changes alone to overcome chronic sleep debt or untrained stimulus needs.",
  ],
};

export const howTdeeIsCalculatedResource: ResourceDefinition = {
  slug: "how-tdee-is-calculated",
  categorySlug: "health-fitness-calculators",
  title: "How TDEE Is Calculated",
  summary:
    "Total daily energy expenditure (TDEE) estimates calories burned per day from basal metabolism, activity, and food digestion.",
  metaTitle: "How TDEE Is Calculated - BMR, Activity & Formula",
  metaDescription:
    "Learn how TDEE combines BMR, activity multipliers, and NEAT to estimate maintenance calories for weight loss or muscle gain planning.",
  keywords: ["how tdee is calculated", "tdee formula", "total daily energy expenditure", "maintenance calories"],
  quickAnswer:
    "TDEE ≈ BMR × activity multiplier, where BMR is basal metabolic rate estimated from age, sex, height, and weight using equations like Mifflin-St Jeor. TDEE includes exercise, daily movement (NEAT), and the thermic effect of food. It represents estimated maintenance calories before intentional surplus or deficit.",
  intro:
    "Calorie calculators output TDEE as the headline number for weight management, but the estimate is only as good as the inputs and activity assumptions behind it. TDEE combines resting energy needs with everything you burn moving through life—structured workouts, walking, fidgeting, and digesting meals. Treat published TDEE as a starting hypothesis, then adjust based on scale trend, performance, and hunger over two to four weeks. Understanding how BMR and activity layers stack helps you interpret why two people of the same weight can need different calories and why desk workers should not copy athlete meal plans verbatim.",
  primaryToolId: "calorie-calculator",
  relatedToolIds: ["macro-calculator", "bmi-calculator"],
  relatedResourceSlugs: ["bmr-vs-tdee", "what-are-macronutrients"],
  lastReviewed: "2026-05-23",
  sections: [
    {
      id: "bmr-layer",
      heading: "Starting with basal metabolic rate (BMR)",
      paragraphs: [
        "BMR approximates calories burned at complete rest for vital functions—breathing, circulation, cell repair. Common equations use weight, height, age, and sex. Mifflin-St Jeor is widely used in apps: for men, BMR = 10×weight(kg) + 6.25×height(cm) − 5×age + 5; for women, the constant is −161 instead of +5.",
        "BMR is the largest slice of TDEE for sedentary individuals—often 60–75% of total. Lean mass raises BMR; aging and weight loss can lower it modestly. Body fat percentage improves some estimates but is optional for first-pass calculations.",
      ],
      linkedToolIds: ["calorie-calculator"],
    },
    {
      id: "activity-multipliers",
      heading: "Activity multipliers and their limitations",
      paragraphs: [
        "After BMR, calculators multiply by factors labeled sedentary, lightly active, moderately active, very active, or athlete. Sedentary might be 1.2× BMR; heavy training days push toward 1.725 or higher. These buckets compress complex lifestyles into one number.",
        "Many people over-select activity level because they gym three days weekly yet sit ten hours daily—true TDEE lands closer to lightly active than very active. Honest activity selection prevents starting fat loss with calories too high to create deficit.",
      ],
      linkedToolIds: ["calorie-calculator"],
    },
    {
      id: "neat-tef",
      heading: "NEAT and thermic effect of food",
      paragraphs: [
        "Non-exercise activity thermogenesis (NEAT)—steps, standing, fidgeting—varies dramatically between people and explains why identical gym programs produce different weight outcomes. Desk job workers with low step counts burn far less NEAT than retail or trade workers.",
        "Thermic effect of food (TEF) is energy spent digesting protein, carbs, and fat—often roughly 10% of intake, higher for protein-heavy meals. TDEE formulas sometimes embed TEF inside multipliers rather than listing separately; either way it is a smaller lever than BMR and NEAT combined.",
      ],
      linkedToolIds: ["calorie-calculator"],
    },
    {
      id: "using-tdee",
      heading: "Using TDEE for deficits, surpluses, and maintenance",
      paragraphs: [
        "Weight loss typically subtracts 300–500 kcal from estimated TDEE for moderate loss, or 15–25% for more aggressive cuts with monitoring. Muscle gain adds 200–400 kcal surplus with progressive resistance training. Maintenance eating matches TDEE when scale is stable.",
        "Recalculate after every 10–15 lb weight change because BMR component shifts with mass. Plateaus may reflect metabolic adaptation, logging inaccuracy, or activity drift—not always need for dramatic cuts.",
      ],
      linkedToolIds: ["calorie-calculator", "macro-calculator"],
    },
    {
      id: "validation",
      heading: "Validating TDEE against real-world feedback",
      paragraphs: [
        "Track weight trend over 14–21 days at consistent intake. If weight rises unexpectedly, TDEE estimate may be high or logging understated. If weight falls too fast with strength loss, deficit may be excessive regardless of formula output.",
        "Wearables estimate expenditure but error margins are wide. Combine scale trend, performance, hunger, and sleep quality to fine-tune calories. TDEE calculation is hypothesis generation, not oracle prophecy.",
      ],
      linkedToolIds: ["calorie-calculator"],
    },
  ],
  examples: [
    {
      title: "Mifflin-St Jeor to TDEE",
      description:
        "35-year-old woman, 65 kg, 165 cm → BMR ≈ 1,388 kcal. Sedentary ×1.2 → TDEE ≈ 1,666 kcal maintenance before goal adjustment.",
    },
    {
      title: "Fat loss adjustment",
      description:
        "TDEE 2,400 kcal with 400 kcal deficit targets 2,000 kcal daily intake for roughly 0.8 lb weekly loss depending on adherence and water fluctuation.",
    },
    {
      title: "Activity level misclassification",
      description:
        "Same BMR with sedentary vs moderately active multiplier differs by 300+ kcal—choosing wrong bucket swamps small macro tweaks.",
    },
  ],
  commonMistakes: [
    "Selecting activity level based on gym days while ignoring desk job NEAT.",
    "Treating calculator TDEE as exact without scale-trend validation.",
    "Not updating calories after significant weight change.",
    "Adding back exercise calories on top of an already active multiplier, double-counting expenditure.",
  ],
};

export const proteinIntakeGuidelinesResource: ResourceDefinition = {
  slug: "protein-intake-guidelines",
  categorySlug: "health-fitness-calculators",
  title: "Protein Intake Guidelines",
  summary:
    "Protein intake guidelines vary by body weight, activity level, and goals—from baseline health to muscle gain and fat loss.",
  metaTitle: "Protein Intake Guidelines - How Much Protein Per Day",
  metaDescription:
    "Learn evidence-based protein recommendations for sedentary adults, athletes, fat loss, and muscle building with practical gram targets.",
  keywords: [
    "protein intake guidelines",
    "how much protein per day",
    "protein for muscle gain",
    "protein for weight loss",
  ],
  quickAnswer:
    "General health often cites 0.36 g protein per pound body weight (0.8 g/kg) as a minimum for sedentary adults. Active people and those in fat loss frequently target 0.7–1.0 g per pound of goal or lean body weight. Spread intake across meals with 20–40 g per sitting for muscle protein synthesis support.",
  intro:
    "Protein guidance online ranges from minimalist RDA quotes to bodybuilder extremes, leaving most people unsure what applies to them. Context matters: a sedentary office worker preventing deficiency needs less than a lifter in a calorie deficit preserving lean mass. Protein supports satiety, thermic effect of food, and recovery from training—not only bodybuilders benefit. Use guidelines as starting ranges, then adjust based on hunger, recovery, and body composition trends. Pair gram targets with total calories and resistance training when muscle outcomes are the goal.",
  primaryToolId: "macro-calculator",
  relatedToolIds: ["calorie-calculator", "bmi-calculator"],
  relatedResourceSlugs: ["what-are-macronutrients", "bmr-vs-tdee"],
  lastReviewed: "2026-05-23",
  sections: [
    {
      id: "baseline-rda",
      heading: "Baseline RDA vs optimal intake",
      paragraphs: [
        "The recommended dietary allowance near 0.8 g/kg body weight prevents deficiency in most healthy sedentary adults. It is not optimized for muscle retention during weight loss, aging, or athletic training. Many nutrition researchers suggest higher intakes for active populations without harm in healthy kidneys.",
        "Think of RDA as floor, not ceiling. Fitness-oriented programs often double or triple RDA in gram terms while staying within reasonable calorie budgets by adjusting carbs and fats.",
      ],
      linkedToolIds: ["macro-calculator"],
    },
    {
      id: "by-goal",
      heading: "Protein by goal: maintenance, fat loss, muscle gain",
      paragraphs: [
        "Fat loss: higher protein (often 0.7–1.0 g/lb target weight) helps preserve lean mass in deficit and increases satiety. Muscle gain: similar or slightly higher ranges paired with surplus calories and progressive overload. Endurance athletes need adequate protein for repair though carb timing dominates race fueling.",
        "Older adults may target upper ends of general recommendations to combat age-related muscle loss even without gym focus. Distribution across breakfast, lunch, and dinner beats one massive evening portion for synthesis signaling in many studies.",
      ],
      linkedToolIds: ["macro-calculator", "calorie-calculator"],
    },
    {
      id: "per-meal",
      heading: "Per-meal amounts and timing",
      paragraphs: [
        "Roughly 20–40 g high-quality protein per meal activates muscle protein synthesis for many adults; larger individuals or athletes may use 40–50 g. Total daily grams matter more than precise anabolic window mythology, but spreading intake avoids single-meal bottlenecks.",
        "Post-workout protein within a few hours supports recovery when daily total is met. Pre-sleep casein or dairy can help overnight synthesis in some training contexts without magic properties beyond contributing to daily totals.",
      ],
      linkedToolIds: ["macro-calculator"],
    },
    {
      id: "sources",
      heading: "Whole food sources and supplements",
      paragraphs: [
        "Chicken, fish, eggs, dairy, lean beef, tofu, tempeh, legumes, and protein powder can all count toward targets. Animal proteins typically deliver complete amino acid profiles; plant combinations cover needs across the day.",
        "Supplements convenience-fill gaps but are not required. Prioritize whole foods for micronutrients, then add powder if hitting grams is impractical during travel or high targets.",
      ],
      linkedToolIds: ["macro-calculator"],
    },
    {
      id: "safety-context",
      heading: "Safety and medical context",
      paragraphs: [
        "Healthy individuals generally tolerate high protein intakes studied in resistance training populations. Chronic kidney disease and certain metabolic conditions require medical supervision—generic gym calculators are not medical advice.",
        "Hydration and overall diet quality still matter. Very high protein at expense of vegetables, fiber, and essential fats creates imbalances even when grams look impressive on a tracker.",
      ],
      linkedToolIds: ["macro-calculator"],
    },
  ],
  examples: [
    {
      title: "180 lb lifter in moderate deficit",
      description:
        "Target 0.8 g/lb → 144 g protein daily ≈ 576 kcal. Split four meals at 36 g each from chicken, Greek yogurt, and lentils.",
    },
    {
      title: "Sedentary 140 lb adult baseline",
      description:
        "RDA-style 0.36 g/lb → ~50 g protein minimum; active lifestyle might justify 80–100 g for satiety and maintenance.",
    },
  ],
  commonMistakes: [
    "Using current overweight body weight instead of lean or goal weight for fat loss targets.",
    "Relying on one massive protein meal while neglecting lunch and breakfast distribution.",
    "Ignoring total calories while overemphasizing protein alone for fat loss.",
    "Applying athlete-level protein to sedentary contexts without calorie justification.",
  ],
};

export const bmrVsTdeeResource: ResourceDefinition = {
  slug: "bmr-vs-tdee",
  categorySlug: "health-fitness-calculators",
  title: "BMR vs TDEE Explained",
  summary:
    "BMR is calories burned at rest; TDEE is total daily burn including activity, movement, and digestion.",
  metaTitle: "BMR vs TDEE - What's the Difference?",
  metaDescription:
    "Compare basal metabolic rate and total daily energy expenditure, learn when to use each, and avoid common calorie planning mistakes.",
  keywords: ["bmr vs tdee", "basal metabolic rate", "tdee explained", "maintenance calories difference"],
  quickAnswer:
    "BMR (basal metabolic rate) estimates calories your body needs at complete rest for vital functions. TDEE (total daily energy expenditure) equals BMR plus calories from daily activity, exercise, NEAT, and digesting food. Use TDEE—not BMR alone—for weight loss, gain, or maintenance meal planning.",
  intro:
    "Calorie calculators display both BMR and TDEE, and confusing them causes classic diet mistakes—eating at BMR while living a moderately active life creates an accidental aggressive deficit, or eating at TDEE while claiming sedentary when you walk miles daily stalls fat loss. BMR is a component buried inside TDEE, not a competing alternative. Understanding the relationship clarifies why cutting 500 calories from maintenance differs from eating your resting number, and why metabolic adaptation during long diets lowers the effective BMR slice of TDEE even when activity stays constant.",
  primaryToolId: "calorie-calculator",
  relatedToolIds: ["macro-calculator", "bmi-calculator"],
  relatedResourceSlugs: ["how-tdee-is-calculated", "protein-intake-guidelines"],
  lastReviewed: "2026-05-23",
  sections: [
    {
      id: "definitions",
      heading: "Clear definitions side by side",
      paragraphs: [
        "BMR measures energy for organs and basic physiology if you stayed in bed all day. Clinical resting metabolic rate (RMR) is similar but measured under slightly less strict conditions; apps often treat them interchangeably for estimation.",
        "TDEE is the full daily burn including BMR, structured exercise, walking and fidgeting (NEAT), and thermic effect of food. Maintenance eating targets TDEE; BMR alone would underfeed anyone who gets out of bed.",
      ],
      linkedToolIds: ["calorie-calculator"],
    },
    {
      id: "relationship",
      heading: "How BMR fits inside TDEE mathematically",
      paragraphs: [
        "TDEE = BMR × activity factor in simplified calculators. If BMR is 1,500 kcal and activity factor 1.55, TDEE ≈ 2,325 kcal. The 825 kcal gap represents movement and digestion, not optional extras you can ignore when meal planning.",
        "Lean muscle mass raises BMR modestly; large muscle gain over years can increase maintenance needs. Fat mass also contributes but less per pound than muscle. Age-related BMR decline is gradual and smaller than lifestyle activity changes for many adults.",
      ],
      linkedToolIds: ["calorie-calculator"],
    },
    {
      id: "planning-errors",
      heading: "Common planning errors mixing BMR and TDEE",
      paragraphs: [
        "Eating at BMR while working and training creates excessive deficit, risking muscle loss, fatigue, and binge-rebound cycles. Conversely, using TDEE with inflated activity level while truly sedentary yields surplus disguised as maintenance.",
        "Some legacy diets quote BMR minus 500 for weight loss without activity context—dangerous for active people and still too aggressive for some sedentary small individuals. Always anchor deficits to validated maintenance (TDEE), not resting estimates alone.",
      ],
      linkedToolIds: ["calorie-calculator", "macro-calculator"],
    },
    {
      id: "measurement",
      heading: "Estimated vs measured values",
      paragraphs: [
        "Equations estimate BMR from anthropometrics; indirect calorimetry measures gas exchange for tighter RMR in clinical settings. TDEE is rarely measured directly outside research—doubly labeled water studies are gold standard but impractical daily.",
        "Wearables estimate TDEE from heart rate and movement with wide error bands. Scale trend at known intake remains the practical feedback loop for adjusting calculated TDEE up or down.",
      ],
      linkedToolIds: ["calorie-calculator"],
    },
    {
      id: "diet-adaptation",
      heading: "Adaptation during prolonged dieting",
      paragraphs: [
        "Long deficits may reduce NEAT subconsciously—less fidgeting, fewer spontaneous steps—lowering TDEE even if BMR drops modestly. Periodic diet breaks or reverse dieting phases help some athletes restore expenditure signals and adherence.",
        "After substantial weight loss, recalculate BMR and TDEE with new weight; maintenance calories are lower at lighter mass even if composition improved. This is expected physics, not personal metabolic failure.",
      ],
      linkedToolIds: ["calorie-calculator"],
    },
  ],
  examples: [
    {
      title: "BMR 1,600, TDEE 2,400",
      description:
        "Planning meals at 1,600 kcal while true maintenance is 2,400 creates 800 kcal daily deficit—likely too aggressive for sustained adherence and training performance.",
    },
    {
      title: "Recalculation after 20 lb loss",
      description:
        "BMR may fall ~80–120 kcal from mass change alone; TDEE drop includes lower NEAT if fatigue reduces steps—adjust intake using new calculator inputs.",
    },
  ],
  commonMistakes: [
    "Using BMR as daily calorie target for normal active lifestyles.",
    "Subtracting deficit from BMR instead of from TDEE.",
    "Assuming wearable TDEE is precise without scale-trend validation.",
    "Forgetting to update inputs after weight or activity level changes.",
  ],
};
