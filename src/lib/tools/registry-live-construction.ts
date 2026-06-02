import type { ToolDefinition } from "./types";
import { buildLiveTool, faq } from "./registry-live-helpers";
import { constructionMaterialConverterTools } from "./registry-live-construction-material";

const baseConstructionTools: ToolDefinition[] = [
  buildLiveTool({
    id: "lumber-calculator",
    slug: "lumber-calculator",
    title: "Lumber Calculator",
    category: "construction-calculators",
    subcategory: "materials",
    shortDescription: "Estimate board feet for lumber based on dimensions and quantity.",
    metaTitle: "Lumber Calculator - Estimate Board Feet Online",
    metaDescription:
      "Calculate lumber board feet from length, width, thickness, and quantity. Free construction estimate for framing and woodworking projects.",
    keywords: ["lumber calculator", "board feet calculator", "wood calculator"],
    relatedTools: ["drywall-calculator", "flooring-calculator", "roofing-calculator"],
    componentKey: "LumberCalculatorTool",
    schemaType: "Calculator",
    explanation:
      "Estimate total board feet for lumber pieces using standard dimensional inputs. Useful for framing, decking, and rough material takeoffs.",
    howToUse: [
      "Enter lumber length in feet, width and thickness in inches, and the number of pieces.",
      "Review the estimated board feet output.",
      "Adjust quantity or dimensions to compare material options.",
    ],
    examples: [
      {
        title: "2x6 framing studs",
        input: "Length: 8 ft, Width: 6 in, Thickness: 2 in, Quantity: 10",
        output: "Estimated board feet: 80.00",
        explanation: "Board feet = (8 × 6 × 2 × 10) ÷ 12 = 80 board feet.",
      },
    ],
    faqs: [
      faq("What is a board foot?", "One board foot equals 144 cubic inches of lumber, commonly written as 1 ft × 1 ft × 1 in."),
      faq("Does this account for waste?", "No. Add 5–15% extra material on site for cuts, defects, and offcuts."),
      faq("Can I use this for rough-cut lumber?", "Yes, as long as you enter actual nominal or net dimensions consistently."),
    ],
    commonUseCases: [
      "Estimate framing lumber for walls and decks",
      "Compare lumber packages from suppliers",
      "Prepare rough takeoffs for small renovation projects",
    ],
    assumptions: [
      "Board feet uses the standard formula: (length ft × width in × thickness in × quantity) ÷ 12.",
      "Results are estimates only and do not include waste, delivery, or local pricing.",
      "Enter consistent units: length in feet, width and thickness in inches.",
    ],
  }),
  buildLiveTool({
    id: "drywall-calculator",
    slug: "drywall-calculator",
    title: "Drywall Calculator",
    category: "construction-calculators",
    subcategory: "materials",
    shortDescription: "Estimate how many 4x8 drywall sheets you need for a wall area.",
    metaTitle: "Drywall Calculator - Estimate Sheet Count Online",
    metaDescription:
      "Calculate drywall sheets needed for your project. Enter total wall area and get a 4x8 sheet count estimate with ordering guidance.",
    keywords: ["drywall calculator", "sheetrock calculator", "drywall sheet estimate"],
    relatedTools: ["lumber-calculator", "flooring-calculator", "tile-calculator"],
    componentKey: "GenericConstructionCalculatorTool",
    schemaType: "Calculator",
    explanation:
      "Convert total wall or ceiling area into a sheet count based on standard 4×8 ft panels. Helpful for renovation budgeting and material orders.",
    howToUse: [
      "Measure and enter the total wall or ceiling area in square feet.",
      "Review the number of 4×8 sheets required.",
      "Add extra sheets manually for waste, doors, and windows.",
    ],
    examples: [
      {
        title: "400 sq ft room walls",
        input: "Wall area: 400 sq ft",
        output: "Drywall sheets needed (4x8): 13",
        explanation: "400 ÷ 32 sq ft per sheet = 12.5, rounded up to 13 sheets.",
      },
    ],
    faqs: [
      faq("What sheet size is assumed?", "This calculator assumes standard 4×8 ft sheets (32 sq ft each)."),
      faq("Are doors and windows subtracted?", "Enter net wall area after subtracting openings for best accuracy."),
      faq("How much extra should I order?", "Many contractors add 10–15% for cuts, breakage, and future repairs."),
    ],
    commonUseCases: [
      "Estimate drywall for room remodels",
      "Prepare material lists for basement finishing",
      "Compare sheet counts across layout options",
    ],
    assumptions: [
      "Each 4×8 sheet covers 32 square feet.",
      "Sheet count is rounded up to the nearest whole panel.",
      "Results are material estimates only, not labor or finish costs.",
    ],
  }),
  buildLiveTool({
    id: "concrete-calculator",
    slug: "concrete-calculator",
    title: "Concrete Calculator",
    category: "construction-calculators",
    subcategory: "concrete-cement",
    shortDescription: "Calculate concrete volume in cubic yards for slabs, footings, and pads.",
    metaTitle: "Concrete Calculator - Cubic Yards for Slabs & Footings",
    metaDescription:
      "Calculate concrete needed in cubic yards from length, width, and depth. Free slab and footing volume estimator for DIY and contractor planning.",
    keywords: ["concrete calculator", "cubic yards concrete", "slab calculator"],
    relatedTools: ["cement-calculator", "gravel-calculator", "mulch-calculator"],
    componentKey: "ConcreteCalculatorTool",
    schemaType: "Calculator",
    explanation:
      "Estimate concrete volume for rectangular pours such as slabs, pads, and footings. Output is shown in cubic yards for ready-mix ordering.",
    howToUse: [
      "Enter pour length and width in feet and depth in inches.",
      "Review the cubic yard estimate.",
      "Use the cement calculator to convert yards into bag counts if needed.",
    ],
    examples: [
      {
        title: "10x20 slab at 4 inches",
        input: "Length: 20 ft, Width: 10 ft, Depth: 4 in",
        output: "Concrete needed: 2.47 cubic yards",
        explanation: "Volume = 20 × 10 × (4/12) ft = 66.67 cu ft ÷ 27 = 2.47 cu yd.",
      },
    ],
    faqs: [
      faq("Should I add extra concrete?", "Yes. Order 5–10% more to account for spillage, uneven subgrade, and pump line waste."),
      faq("Does this work for irregular shapes?", "This version supports rectangular pours. Break irregular areas into rectangles."),
      faq("What depth should I use for a patio?", "Many residential patios use 4 inches; driveways often need 4–6 inches depending on load."),
    ],
    commonUseCases: [
      "Estimate ready-mix orders for patios and sidewalks",
      "Plan footing volumes for small structures",
      "Compare slab thickness options before pouring",
    ],
    assumptions: [
      "Pour shape is a rectangular prism.",
      "Depth is entered in inches and converted to feet before volume calculation.",
      "1 cubic yard = 27 cubic feet.",
    ],
  }),
  buildLiveTool({
    id: "cement-calculator",
    slug: "cement-calculator",
    title: "Cement Calculator",
    category: "construction-calculators",
    subcategory: "concrete-cement",
    shortDescription: "Convert cubic yards of concrete into an estimated count of 80 lb cement bags.",
    metaTitle: "Cement Calculator - Bags Needed for Concrete Mix",
    metaDescription:
      "Estimate how many 80 lb cement bags you need from cubic yards of concrete. Helpful for bag-mix projects and small pours.",
    keywords: ["cement calculator", "concrete bag calculator", "80 lb bag estimate"],
    relatedTools: ["concrete-calculator", "gravel-calculator", "mulch-calculator"],
    componentKey: "GenericConstructionCalculatorTool",
    schemaType: "Calculator",
    explanation:
      "Translate a concrete volume in cubic yards into an approximate number of 80 lb premix bags. Useful for small pads, post holes, and repair work.",
    howToUse: [
      "Enter the concrete volume in cubic yards from your slab or footing estimate.",
      "Review the estimated 80 lb bag count.",
      "Adjust for waste and mix design before purchasing.",
    ],
    examples: [
      {
        title: "3 cubic yard pour",
        input: "Concrete cubic yards: 3",
        output: "Estimated 80 lb cement bags: 135",
        explanation: "Uses a simplified ratio of about 45 bags per cubic yard for planning estimates.",
      },
    ],
    faqs: [
      faq("Is this for ready-mix or bag mix?", "This tool is intended for bag-mix planning, not ready-mix truck orders."),
      faq("Do mix designs vary?", "Yes. Actual bag counts depend on mix ratio, aggregate, and manufacturer yield."),
      faq("Should I round up?", "Always round up and add extra bags for spillage and partial batches."),
    ],
    commonUseCases: [
      "Plan bag-mix purchases for small slabs",
      "Estimate materials for fence post footings",
      "Cross-check contractor bag counts for DIY projects",
    ],
    assumptions: [
      "Uses an approximate planning ratio of 45 eighty-pound bags per cubic yard.",
      "Actual yield varies by product, slump, and aggregate size.",
      "Estimate only — verify against bag label coverage before ordering.",
    ],
  }),
  buildLiveTool({
    id: "roofing-calculator",
    slug: "roofing-calculator",
    title: "Roofing Calculator",
    category: "construction-calculators",
    subcategory: "roofing",
    shortDescription: "Estimate roof surface area from footprint dimensions and pitch.",
    metaTitle: "Roofing Calculator - Estimate Roof Area by Pitch",
    metaDescription:
      "Calculate roof area from length, width, and pitch rise. Free roofing area estimator for shingle, underlayment, and material planning.",
    keywords: ["roofing calculator", "roof area calculator", "roof pitch calculator"],
    relatedTools: ["shingles-calculator", "lumber-calculator", "drywall-calculator"],
    componentKey: "RoofingCalculatorTool",
    schemaType: "Calculator",
    explanation:
      "Estimate total roof surface area by applying a pitch factor to the building footprint. Helpful before ordering shingles and underlayment.",
    howToUse: [
      "Enter roof length and width in feet.",
      "Enter pitch as rise in inches per 12 inches of run.",
      "Review the calculated roof area in square feet.",
    ],
    examples: [
      {
        title: "40x30 roof at 4/12 pitch",
        input: "Length: 40 ft, Width: 30 ft, Pitch: 4",
        output: "Roof area: 1249.00 sq ft",
        explanation: "Footprint 1,200 sq ft multiplied by pitch factor √(1 + (4/12)²).",
      },
    ],
    faqs: [
      faq("How do I measure pitch?", "Pitch is rise over a 12-inch run. A 4/12 pitch rises 4 inches for every 12 inches horizontally."),
      faq("Does this include overhangs?", "Include eave and rake overhangs in your length and width for better material estimates."),
      faq("Can I use this for complex roofs?", "Simple gable-style footprints work best. Break complex roofs into sections."),
    ],
    commonUseCases: [
      "Estimate roofing area before shingle orders",
      "Compare material needs across pitch options",
      "Plan underlayment and ice barrier quantities",
    ],
    assumptions: [
      "Roof footprint is rectangular.",
      "Pitch factor uses √(1 + (rise/12)²) applied to footprint area.",
      "Does not subtract dormers, valleys, or penetrations automatically.",
    ],
  }),
  buildLiveTool({
    id: "shingles-calculator",
    slug: "shingles-calculator",
    title: "Shingles Calculator",
    category: "construction-calculators",
    subcategory: "roofing",
    shortDescription: "Estimate shingle bundles needed from total roof area.",
    metaTitle: "Shingles Calculator - Estimate Bundle Count Online",
    metaDescription:
      "Calculate shingle bundles needed from roof area. Free roofing material estimator based on standard three-tab bundle coverage.",
    keywords: ["shingles calculator", "roof shingle estimate", "bundle calculator"],
    relatedTools: ["roofing-calculator", "lumber-calculator", "gravel-calculator"],
    componentKey: "ShinglesCalculatorTool",
    schemaType: "Calculator",
    explanation:
      "Convert roof area into an estimated bundle count using typical three-tab coverage. Pair with the roofing calculator for pitch-adjusted area.",
    howToUse: [
      "Enter total roof area in square feet.",
      "Review the estimated bundle count.",
      "Add extra bundles for waste, starter strips, and ridge caps.",
    ],
    examples: [
      {
        title: "1500 sq ft roof",
        input: "Roof area: 1500 sq ft",
        output: "Shingle bundles needed: 46",
        explanation: "1,500 ÷ 33 sq ft per bundle = 45.45, rounded up to 46 bundles.",
      },
    ],
    faqs: [
      faq("How many square feet per bundle?", "This calculator assumes about 33 sq ft coverage per standard three-tab bundle."),
      faq("Do architectural shingles differ?", "Yes. Architectural shingles often cover fewer square feet per bundle — check manufacturer specs."),
      faq("How much waste should I add?", "Many roofers add 10–15% for cuts, hips, valleys, and future repairs."),
    ],
    commonUseCases: [
      "Estimate shingle bundles for re-roof projects",
      "Compare material counts after roof area calculations",
      "Prepare supplier quotes for DIY roofing",
    ],
    assumptions: [
      "Uses approximately 33 square feet of coverage per bundle.",
      "Bundle count is rounded up to the nearest whole bundle.",
      "Manufacturer coverage, exposure, and product line can change results.",
    ],
  }),
  buildLiveTool({
    id: "flooring-calculator",
    slug: "flooring-calculator",
    title: "Flooring Calculator",
    category: "construction-calculators",
    subcategory: "flooring-walls",
    shortDescription: "Calculate flooring area with a configurable waste allowance.",
    metaTitle: "Flooring Calculator - Area with Waste Allowance",
    metaDescription:
      "Calculate flooring square footage with waste allowance for hardwood, laminate, vinyl, and carpet projects. Free room flooring estimator.",
    keywords: ["flooring calculator", "floor area calculator", "flooring waste calculator"],
    relatedTools: ["tile-calculator", "drywall-calculator", "lumber-calculator"],
    componentKey: "GenericConstructionCalculatorTool",
    schemaType: "Calculator",
    explanation:
      "Estimate total flooring material needed by combining room area with a waste percentage for cuts, pattern shifts, and defects.",
    howToUse: [
      "Enter room length and width in feet.",
      "Set a waste allowance percentage based on layout and material.",
      "Review total square footage including waste.",
    ],
    examples: [
      {
        title: "14x12 room with 10% waste",
        input: "Length: 14 ft, Width: 12 ft, Waste: 10%",
        output: "Flooring area with waste: 184.80 sq ft",
        explanation: "168 sq ft room area plus 10% waste equals 184.8 sq ft.",
      },
    ],
    faqs: [
      faq("How much waste should I use?", "Straight layouts often use 5–10%; diagonal or herringbone patterns may need 10–15%."),
      faq("Are closets included?", "Add closet square footage to room dimensions or calculate separately."),
      faq("Does this convert to boxes?", "This tool outputs square footage. Check box coverage on product labels."),
    ],
    commonUseCases: [
      "Estimate laminate or vinyl plank purchases",
      "Plan hardwood flooring orders with waste",
      "Compare waste settings across room layouts",
    ],
    assumptions: [
      "Room shape is rectangular.",
      "Waste percentage is applied to net room area.",
      "Does not account for pattern repeat or directional layout automatically.",
    ],
  }),
  buildLiveTool({
    id: "tile-calculator",
    slug: "tile-calculator",
    title: "Tile Calculator",
    category: "construction-calculators",
    subcategory: "flooring-walls",
    shortDescription: "Estimate tile count from room size, tile dimensions, and waste allowance.",
    metaTitle: "Tile Calculator - Estimate Tiles Needed Online",
    metaDescription:
      "Calculate how many tiles you need from room dimensions, tile size, and waste percentage. Free bathroom and kitchen tile estimator.",
    keywords: ["tile calculator", "tile estimate", "how many tiles needed"],
    relatedTools: ["flooring-calculator", "drywall-calculator", "gravel-calculator"],
    componentKey: "GenericConstructionCalculatorTool",
    schemaType: "Calculator",
    explanation:
      "Estimate the number of square or rectangular tiles required for a floor or wall area, including a configurable waste allowance.",
    howToUse: [
      "Enter room length and width in feet.",
      "Enter tile size in inches and your waste percentage.",
      "Review the rounded tile count for ordering.",
    ],
    examples: [
      {
        title: "10x8 room with 12-inch tiles",
        input: "Length: 10 ft, Width: 8 ft, Tile: 12 in, Waste: 10%",
        output: "Tiles needed: 88",
        explanation: "80 sq ft area plus 10% waste divided by 1 sq ft per 12-inch tile.",
      },
    ],
    faqs: [
      faq("Can I use this for wall tile?", "Yes. Enter the net tiled wall area as length × width in feet."),
      faq("What about grout lines?", "Grout gaps slightly reduce tile count; waste percentage usually covers this."),
      faq("Do I need extra for cuts?", "Yes. Use 10% waste for simple layouts and up to 15% for diagonals or niches."),
    ],
    commonUseCases: [
      "Estimate floor tile for bathrooms and kitchens",
      "Plan backsplash tile orders",
      "Compare tile sizes before purchasing",
    ],
    assumptions: [
      "Tiles are square with size entered in inches.",
      "Tile count is rounded up to the nearest whole tile.",
      "Does not model grout width or partial box rounding by retailer.",
    ],
  }),
  buildLiveTool({
    id: "mulch-calculator",
    slug: "mulch-calculator",
    title: "Mulch Calculator",
    category: "construction-calculators",
    subcategory: "landscaping",
    shortDescription: "Estimate mulch volume in cubic yards for garden beds and landscaping.",
    metaTitle: "Mulch Calculator - Cubic Yards for Garden Beds",
    metaDescription:
      "Calculate mulch needed in cubic yards from bed length, width, and depth. Free landscaping material estimator for garden projects.",
    keywords: ["mulch calculator", "mulch cubic yards", "landscape mulch estimate"],
    relatedTools: ["gravel-calculator", "concrete-calculator", "cement-calculator"],
    componentKey: "GenericConstructionCalculatorTool",
    schemaType: "Calculator",
    explanation:
      "Estimate how much mulch you need for garden beds and landscape areas. Output is shown in cubic yards for bulk delivery or bag planning.",
    howToUse: [
      "Measure bed length and width in feet.",
      "Enter desired mulch depth in inches.",
      "Review cubic yard volume before ordering.",
    ],
    examples: [
      {
        title: "20x4 bed at 3 inches deep",
        input: "Length: 20 ft, Width: 4 ft, Depth: 3 in",
        output: "Mulch needed: 0.74 cubic yards",
        explanation: "Volume = 20 × 4 × (3/12) ft = 20 cu ft ÷ 27 = 0.74 cu yd.",
      },
    ],
    faqs: [
      faq("How deep should mulch be?", "Many beds use 2–4 inches. Avoid piling mulch against tree trunks."),
      faq("Should I add extra?", "Add 5–10% for settling and uneven bed edges."),
      faq("Can I use this for soil or compost?", "Yes, for volume planning, though compaction and density differ by material."),
    ],
    commonUseCases: [
      "Plan bulk mulch delivery for garden beds",
      "Estimate bag counts from cubic yard totals",
      "Compare depth options for seasonal refresh",
    ],
    assumptions: [
      "Bed shape is rectangular.",
      "Depth is entered in inches and converted to feet.",
      "Does not account for compaction after installation.",
    ],
  }),
  buildLiveTool({
    id: "gravel-calculator",
    slug: "gravel-calculator",
    title: "Gravel Calculator",
    category: "construction-calculators",
    subcategory: "landscaping",
    shortDescription: "Estimate gravel volume in cubic yards and approximate weight in tons.",
    metaTitle: "Gravel Calculator - Cubic Yards & Tons Estimate",
    metaDescription:
      "Calculate gravel volume in cubic yards and approximate tons from area dimensions and depth. Free driveway and pathway material estimator.",
    keywords: ["gravel calculator", "gravel tons calculator", "driveway gravel estimate"],
    relatedTools: ["mulch-calculator", "concrete-calculator", "cement-calculator"],
    componentKey: "GenericConstructionCalculatorTool",
    schemaType: "Calculator",
    explanation:
      "Estimate gravel volume for driveways, pathways, and base layers. Shows cubic yards and an approximate tonnage for delivery planning.",
    howToUse: [
      "Enter area length and width in feet.",
      "Enter gravel depth in inches.",
      "Review cubic yards and approximate tons before ordering.",
    ],
    examples: [
      {
        title: "30x10 driveway section at 4 inches",
        input: "Length: 30 ft, Width: 10 ft, Depth: 4 in",
        output: "Gravel estimate: 3.70 cubic yards (~5.18 tons)",
        explanation: "100 sq ft × 4/12 ft = 33.33 cu ft ÷ 27 = 3.70 cu yd; tons use ~1.4 factor.",
      },
    ],
    faqs: [
      faq("How accurate is the ton estimate?", "Tonnage varies by stone type and moisture. Use it for planning, then confirm with your supplier."),
      faq("What depth is typical for driveways?", "Many base layers use 4–6 inches depending on soil and traffic."),
      faq("Should I compact in lifts?", "Yes. Large depths should be installed and compacted in layers for stability."),
    ],
    commonUseCases: [
      "Estimate gravel for driveway base layers",
      "Plan pathway and patio sub-base material",
      "Compare delivery quantities in yards versus tons",
    ],
    assumptions: [
      "Area is rectangular with depth entered in inches.",
      "Tonnage uses an approximate factor of 1.4 tons per cubic yard.",
      "Actual density varies by aggregate type, size, and moisture content.",
    ],
  }),
];

export const constructionLiveTools: ToolDefinition[] = [
  ...baseConstructionTools,
  ...constructionMaterialConverterTools,
];
