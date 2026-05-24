import type { ResourceDefinition } from "@/lib/content/types";

export const hectaresVsAcresResource: ResourceDefinition = {
  slug: "hectares-vs-acres",
  categorySlug: "unit-converters",
  title: "Hectares vs Acres Explained",
  summary:
    "Hectares and acres both measure land area; one hectare equals about 2.471 acres in the imperial conversion.",
  metaTitle: "Hectares vs Acres - Conversion Factor & Uses",
  metaDescription:
    "Compare hectares and acres for land measurement, learn the exact conversion factor, and convert area with a free hectares-to-acres tool.",
  keywords: ["hectares vs acres", "hectare to acre", "land area units", "hectare conversion"],
  quickAnswer:
    "One hectare (10,000 square meters) equals approximately 2.47105 acres. Hectares are standard in metric countries and global agriculture reporting; acres dominate US real estate, farming, and rural listings. Multiply hectares by 2.471 to get acres, or divide acres by 2.471 for hectares.",
  intro:
    "Land listings, farm reports, and forestry plans switch between hectares and acres depending on country and industry habit. A European vineyard quoted in hectares looks unfamiliar to US buyers until converted; conversely, US ranch acreage confuses metric-first investors comparing yields per hectare. Both units measure two-dimensional area—not length—so do not confuse hectare with kilometer or acre with mile. Understanding the fixed conversion factor prevents pricing errors when comparing parcels across borders and helps translate yield statistics like bushels per hectare into per-acre mental models for local decision making.",
  primaryToolId: "hectares-to-acres",
  relatedToolIds: ["acres-to-hectares", "acres-to-square-feet", "square-meters-to-square-feet"],
  relatedResourceSlugs: ["square-meters-vs-square-feet", "feet-vs-meters-reference"],
  lastReviewed: "2026-05-23",
  sections: [
    {
      id: "definitions",
      heading: "What each unit measures",
      paragraphs: [
        "A hectare is exactly 10,000 square meters in the metric system—conceptually a square 100 m on each side, though real parcels are rarely perfect squares. It belongs to the SI-derived family used in scientific and international land reporting.",
        "An acre is an imperial/US customary unit historically tied to agricultural field sizing, now defined precisely as 4,840 square yards or 43,560 square feet. US property deeds, county tax maps, and MLS land listings commonly quote acres or square feet rather than hectares.",
      ],
      linkedToolIds: ["hectares-to-acres"],
    },
    {
      id: "conversion",
      heading: "Exact conversion between hectares and acres",
      paragraphs: [
        "1 hectare = 2.4710538147 acres (often rounded 2.471 for field use). Reverse: 1 acre ≈ 0.404686 hectares. Multiplying 50 hectares by 2.471 yields about 123.55 acres—a mid-size commercial orchard scale in US terms.",
        "For mental math, remember 2.5 acres ≈ 1 hectare as a quick approximation; error is about 1.2%, acceptable for conversation but not for legal surveys without precise factors.",
      ],
      linkedToolIds: ["hectares-to-acres", "acres-to-hectares"],
    },
    {
      id: "when-used",
      heading: "When each unit appears in practice",
      paragraphs: [
        "International development reports, EU agricultural subsidies, and forestry in many countries use hectares. US rural real estate, conservation easements, and hunting land marketing use acres. Canadian listings may show both metric and imperial depending on province and audience.",
        "Crop yield comparisons require consistent area units—bushels per acre vs tonnes per hectare—before ranking productivity across regions. Convert area first, then compare yield metrics on equal footing.",
      ],
    },
    {
      id: "related-units",
      heading: "Relating hectares and acres to square meters and square feet",
      paragraphs: [
        "One hectare equals 10,000 m². One acre equals 43,560 ft². Building-focused buyers sometimes convert land to square feet for comparison with commercial lease metrics priced per square foot, while raw land stays in acres or hectares.",
        "Square meters to square feet (×10.764) bridges building floor plans; hectares to acres bridges field-scale parcels. Pick the unit matching your document source to minimize double-conversion rounding error.",
      ],
      linkedToolIds: ["square-meters-to-square-feet", "acres-to-square-feet"],
    },
    {
      id: "practical-tips",
      heading: "Practical conversion tips for buyers and analysts",
      paragraphs: [
        "Always confirm whether listing area is gross land, net cultivable, or includes easements—unit conversion does not fix definition mismatches. Survey plans in one unit can be converted for investor memos without redrawing boundaries.",
        "Spreadsheets should store conversion constants in labeled cells rather than retyping 2.471 manually across formulas. Round at the final display step, not mid-calculation chain, when precision matters for reporting.",
      ],
      linkedToolIds: ["hectares-to-acres"],
    },
  ],
  examples: [
    {
      title: "100 hectare farm",
      description: "100 × 2.471 ≈ 247.1 acres—useful when comparing to US comp sales quoted per acre.",
    },
    {
      title: "5 acre homestead",
      description: "5 ÷ 2.471 ≈ 2.02 hectares—helps metric-first buyers visualize European listing equivalents.",
    },
  ],
  commonMistakes: [
    "Confusing hectares with square kilometers (1 km² = 100 hectares).",
    "Using 2.5 as exact instead of approximate in legal or accounting documents.",
    "Comparing price per hectare to price per acre without converting units first.",
    "Applying length conversion factors to area measurements.",
  ],
};

export const squareMetersVsSquareFeetResource: ResourceDefinition = {
  slug: "square-meters-vs-square-feet",
  categorySlug: "unit-converters",
  title: "Square Meters vs Square Feet",
  summary:
    "Square meters and square feet measure area; one square meter equals about 10.764 square feet.",
  metaTitle: "Square Meters vs Square Feet - Area Conversion",
  metaDescription:
    "Learn the square meters to square feet conversion factor, typical uses in real estate and construction, and free converter links.",
  keywords: ["square meters vs square feet", "m2 to sq ft", "area conversion", "metric imperial area"],
  quickAnswer:
    "One square meter (m²) equals 10.7639 square feet (ft²). Square meters are standard globally for floor area and building codes; square feet dominate US real estate listings and commercial lease rates. Multiply m² by 10.764 for ft²; divide ft² by 10.764 for m².",
  intro:
    "Floor area drives rent, HVAC sizing, flooring orders, and property comparison. A 120 m² apartment in Madrid becomes meaningful to US renters near 1,290 ft² after conversion. Construction drawings may mix units when multinational teams collaborate—structural grid in meters, vendor carpet quotes in square yards or feet. Square units scale as the square of linear conversion: because 1 meter ≈ 3.281 feet, one square meter is roughly 3.281² ≈ 10.764 square feet, not 3.281. That squared relationship trips people who apply length factors directly to area.",
  primaryToolId: "square-meters-to-square-feet",
  relatedToolIds: ["square-feet-to-square-meters", "acres-to-square-feet", "hectares-to-acres"],
  relatedResourceSlugs: ["hectares-vs-acres", "feet-vs-meters-reference"],
  lastReviewed: "2026-05-23",
  sections: [
    {
      id: "factor",
      heading: "The conversion factor and why it is squared",
      paragraphs: [
        "Area in square units equals length × width. Converting both dimensions from meters to feet multiplies area by 3.28084² ≈ 10.7639. Therefore 20 m² × 10.764 ≈ 215.3 ft².",
        "Precision constants matter in engineering specs; real estate marketing often rounds to whole square feet. Document rounding rules when sharing cross-border investment summaries.",
      ],
      linkedToolIds: ["square-meters-to-square-feet", "square-feet-to-square-meters"],
    },
    {
      id: "real-estate",
      heading: "Real estate and leasing contexts",
      paragraphs: [
        "US residential MLS listings quote living area in square feet; many international listings use square meters exclusively. Office leases may price $/ft² annually in the US and €/m² monthly in Europe—convert area before comparing occupancy cost.",
        "Gross vs net rentable area definitions (BOMA standards, balcony inclusion) affect comparisons more than small conversion rounding. Clarify measurement standard first, then convert units.",
      ],
      linkedToolIds: ["square-meters-to-square-feet"],
    },
    {
      id: "construction",
      heading: "Construction, flooring, and paint estimates",
      paragraphs: [
        "Tile and flooring packages often sell by square foot in US retail and by square meter elsewhere. Convert room area to match SKU labeling before ordering waste factor on top.",
        "Paint coverage rates quote per square foot or square meter on cans—match can label units to measured wall area after converting surface calculations consistently.",
      ],
      linkedToolIds: ["square-meters-to-square-feet"],
    },
    {
      id: "large-parcels",
      heading: "From rooms to land: relating to acres and hectares",
      paragraphs: [
        "Large land tracts rarely use square meters or square feet in marketing—they jump to acres or hectares. Still, survey GIS exports may list m²; converting to acres (÷4046.86) connects to rural comp databases.",
        "Building footprint m² on a hectare parcel helps zoning coverage ratio analysis; convert footprint to ft² only when local code text references imperial units exclusively.",
      ],
      linkedToolIds: ["hectares-to-acres", "acres-to-square-feet"],
    },
    {
      id: "workflow",
      heading: "Reliable conversion workflow",
      paragraphs: [
        "Measure or source area in the document's native unit when possible. Convert once at comparison or ordering stage. Avoid converting length dimensions separately with rounding before multiplying—multiply in original unit then convert area once.",
        "Use paired converters to sanity-check reverse conversion returns original value within acceptable tolerance for your use case.",
      ],
      linkedToolIds: ["square-meters-to-square-feet", "square-feet-to-square-meters"],
    },
  ],
  examples: [
    {
      title: "85 m² condo",
      description: "85 × 10.764 ≈ 915 ft²—typical two-bedroom metric size expressed for US listing audience.",
    },
    {
      title: "2,000 ft² retail space",
      description: "2,000 ÷ 10.764 ≈ 186 m²—compare to European high street comps priced per m².",
    },
    {
      title: "Flooring order",
      description: "Room 4.5 m × 3.2 m = 14.4 m² ≈ 155 ft²; add 10% waste in same unit as box coverage.",
    },
  ],
  commonMistakes: [
    "Multiplying by 3.281 instead of 10.764 when converting area.",
    "Mixing net and gross area definitions across listings after conversion.",
    "Rounding each dimension before multiplying, amplifying error on large spaces.",
    "Forgetting that conversion factor applies to area, not linear wall length only.",
  ],
};

export const feetVsMetersReferenceResource: ResourceDefinition = {
  slug: "feet-vs-meters-reference",
  categorySlug: "unit-converters",
  title: "Feet vs Meters Reference",
  summary:
    "Feet and meters measure length; one meter equals 3.28084 feet, forming the basis for metric-imperial construction and travel conversions.",
  metaTitle: "Feet vs Meters - Length Conversion Reference",
  metaDescription:
    "Quick reference for feet and meters conversion, common benchmarks, and links to meters-to-feet tools for projects and travel.",
  keywords: ["feet vs meters", "meters to feet", "length conversion", "metric imperial length"],
  quickAnswer:
    "One meter = 3.28084 feet. One foot = 0.3048 meters exactly by definition. Meters are SI standard worldwide; feet and inches persist in US construction, aviation altitude (feet), and sports. For area, square meters relate to square feet via ~10.764 factor, not 3.281.",
  intro:
    "Length conversion between feet and meters appears in architecture imports, running track comparisons, elevation references, and DIY projects using mixed hardware. Unlike area or volume, length converts with a single linear factor—about 3.28 feet per meter—making mental estimates easier if you remember anchor distances like 1 m ≈ 3 ft, 2 m ≈ 6.5 ft, 5 m ≈ 16 ft. Errors cascade when linear conversions are applied to squared or cubed measurements, so label whether you are converting a single dimension, an area, or a volume before picking factors.",
  primaryToolId: "meters-to-feet",
  relatedToolIds: ["feet-to-meters", "miles-to-km", "square-meters-to-square-feet"],
  relatedResourceSlugs: ["square-meters-vs-square-feet", "miles-vs-kilometers"],
  lastReviewed: "2026-05-23",
  sections: [
    {
      id: "exact-factor",
      heading: "Exact and approximate conversion factors",
      paragraphs: [
        "International foot definition: 1 ft = 0.3048 m exactly. Therefore 1 m = 1/0.3048 ft ≈ 3.280839895 ft. Use full precision in engineering; 3.281 suffices for sketch-level layout.",
        "Chains of conversions (m → ft → inches) accumulate rounding error—convert directly to target unit when possible rather than stepping through intermediate imperial subdivisions unless formatting requires inches display.",
      ],
      linkedToolIds: ["meters-to-feet", "feet-to-meters"],
    },
    {
      id: "benchmarks",
      heading: "Memorable benchmark distances",
      paragraphs: [
        "100 m sprint track straightaway ≈ 328 ft. Basketball hoop rim height 10 ft ≈ 3.05 m. Ceiling height 8 ft ≈ 2.44 m—common US residential spec compared to 2.5 m metric ceilings.",
        "Marathon 42.195 km uses kilometers, but US road race signage may mix mile markers with metric course certification—know both for pacing mental math.",
      ],
      linkedToolIds: ["meters-to-feet", "miles-to-km"],
    },
    {
      id: "construction",
      heading: "Construction and manufacturing crossover",
      paragraphs: [
        "US plans in feet-inches-sixteenths import to metric fabrication shops requiring mm precision from meter-based CNC. Convert critical dimensions with tolerance bands, not rounded marketing equivalents.",
        "Material lengths sold in feet ( lumber 8 ft, 10 ft, 12 ft ) differ from metric module lengths (2.4 m, 3.0 m). Pick stock module matching local market to minimize cut waste rather than pure converted nominal.",
      ],
      linkedToolIds: ["meters-to-feet"],
    },
    {
      id: "area-volume-link",
      heading: "Link to area and volume conversions",
      paragraphs: [
        "Square area: multiply linear factor squared (~10.764 ft² per m²). Volume: cube linear factor (~35.315 ft³ per m³). A 2 m cube is 8 m³ ≈ 282.5 ft³, not 2×3.281 ft cube miscomputed.",
        "When room dimensions convert from meters to feet individually, multiplying converted L×W should match converting m² area directly—discrepancies signal rounding misuse.",
      ],
      linkedToolIds: ["square-meters-to-square-feet", "cubic-yards-to-cubic-feet"],
    },
    {
      id: "daily-use",
      heading: "Travel, sports, and everyday estimation",
      paragraphs: [
        "Height and short distances: divide feet by 3 for rough meters. Longer routes: pair meters-to-feet with kilometers-to-miles for road trips abroad.",
        "Swimming pools and athletic fields often list both units at international venues—verify which is authoritative for records or equipment specs.",
      ],
      linkedToolIds: ["meters-to-feet", "miles-to-km"],
    },
  ],
  examples: [
    {
      title: "Room width 4.2 m",
      description: "4.2 × 3.281 ≈ 13.78 ft—verify furniture clearance against US rug sizes in feet.",
    },
    {
      title: "10 ft ladder reach",
      description: "10 ÷ 3.281 ≈ 3.05 m—compare to EU safety labeling in meters.",
    },
  ],
  commonMistakes: [
    "Using 3.0 instead of 3.281 for precision-critical cuts.",
    "Applying linear factor to area (m² to ft²) without squaring.",
    "Converting feet to meters then displaying inches without clear labeling.",
    "Mixing US survey feet with international foot definitions in geodesy without context.",
  ],
};

export const milesVsKilometersResource: ResourceDefinition = {
  slug: "miles-vs-kilometers",
  categorySlug: "unit-converters",
  title: "Miles vs Kilometers Explained",
  summary:
    "Miles and kilometers measure distance; one mile equals about 1.609 kilometers.",
  metaTitle: "Miles vs Kilometers - Conversion & Speed Context",
  metaDescription:
    "Compare miles and kilometers for travel and fitness, learn conversion factors, and convert with a free miles-to-km tool.",
  keywords: ["miles vs kilometers", "miles to km", "distance conversion", "mph kph"],
  quickAnswer:
    "1 mile = 1.609344 kilometers. 1 kilometer ≈ 0.621371 miles. Miles are standard on US road signs and odometers; kilometers dominate globally. Multiply miles by 1.609 for km; multiply km by 0.621 for miles. Speed: 60 mph ≈ 97 km/h.",
  intro:
    "Distance units shape navigation, fuel planning, and athletic training logs. US drivers reading European rental car dashboards face kilometers and km/h; international visitors to the US reverse the confusion. Conversion factors are linear like feet and meters, but speed perception ties to cultural familiarity—100 km/h feels different psychologically from 62 mph even when equivalent. Fitness apps often default to miles or kilometers based on locale; manual entry during travel requires quick conversion to compare weekly volume honestly.",
  primaryToolId: "miles-to-km",
  relatedToolIds: ["km-to-miles", "meters-to-feet"],
  relatedResourceSlugs: ["feet-vs-meters-reference", "pounds-vs-kilograms"],
  lastReviewed: "2026-05-23",
  sections: [
    {
      id: "factors",
      heading: "Conversion factors and mental math",
      paragraphs: [
        "Exact: 1 mi = 1.609344 km by definition. Quick estimate: 5 miles ≈ 8 km (marathon half split mental math). 10 km ≈ 6.2 miles—common race distance comparison.",
        "For odometer trip logs, multiply US miles by 1.609 before entering km-native fuel economy spreadsheets comparing L/100 km efficiency on same route data.",
      ],
      linkedToolIds: ["miles-to-km", "km-to-miles"],
    },
    {
      id: "speed",
      heading: "Speed: mph vs km/h",
      paragraphs: [
        "Speed conversion uses same distance factor: mph × 1.609 ≈ km/h. Highway 65 mph ≈ 105 km/h. Urban 30 mph ≈ 48 km/h—useful when interpreting foreign speed limits.",
        "Running pace in min/mile vs min/km is not a simple multiply—pace conversions invert speed relationships. Six min/mile ≈ 3:44 min/km; use dedicated pace tools for workouts.",
      ],
      linkedToolIds: ["miles-to-km"],
    },
    {
      id: "travel",
      heading: "Travel planning and fuel",
      paragraphs: [
        "Trip distances on Google Maps follow locale defaults—toggle units in settings before multi-country itineraries. Fuel cost estimates need consistent distance units with consumption (mpg vs L/100km).",
        "Aviation and maritime contexts may use nautical miles separately from statute miles—do not assume mile label without statute vs nautical clarification in professional domains.",
      ],
      linkedToolIds: ["miles-to-km"],
    },
    {
      id: "fitness",
      heading: "Running, cycling, and wearable tracking",
      paragraphs: [
        "Weekly mileage targets for runners convert cleanly with 1.609 factor. Elevation gain may still use feet or meters independently—distance conversion does not normalize vertical units.",
        "Cycling computers sold globally often allow unit flip in firmware—set once to match training plan language to avoid double conversion errors in uploaded FIT files.",
      ],
      linkedToolIds: ["miles-to-km", "meters-to-feet"],
    },
    {
      id: "related-system",
      heading: "Consistency across metric and imperial workflows",
      paragraphs: [
        "Pair distance conversion with weight (kg/lbs) and volume (L/gal) when planning international shipping or luggage limits—airlines mix kg baggage with mile route maps.",
        "Scientific literature uses km; US public infrastructure uses mile markers—cross-reference both when correlating research plots with field GPS tracks.",
      ],
      linkedToolIds: ["miles-to-km", "kg-to-lbs"],
    },
  ],
  examples: [
    {
      title: "Marathon distance",
      description: "26.2 miles × 1.609 ≈ 42.2 km—matches official marathon km certification.",
    },
    {
      title: "100 km century ride",
      description: "100 × 0.621 ≈ 62.1 miles—US cyclists comparing to metric century events.",
    },
  ],
  commonMistakes: [
    "Using 1.6 as exact in precision navigation logs.",
    "Converting pace by multiplying min/mile by 1.609 without inverting logic.",
    "Confusing nautical miles with statute miles on aviation charts.",
    "Forgetting to switch map app units when crossing borders.",
  ],
};

export const poundsVsKilogramsResource: ResourceDefinition = {
  slug: "pounds-vs-kilograms",
  categorySlug: "unit-converters",
  title: "Pounds vs Kilograms Explained",
  summary:
    "Pounds and kilograms measure mass; one kilogram equals about 2.205 pounds.",
  metaTitle: "Pounds vs Kilograms - Weight Conversion Guide",
  metaDescription:
    "Learn lb to kg conversion for fitness, shipping, and cooking with examples and a free kg-to-lbs converter.",
  keywords: ["pounds vs kilograms", "lbs to kg", "weight conversion", "kg to pounds"],
  quickAnswer:
    "1 kilogram = 2.20462 pounds (avoirdupois). 1 pound ≈ 0.453592 kg. Kilograms are SI standard globally; pounds dominate US body weight, gym plates labeled lb, and some grocery pricing. Divide pounds by 2.205 for kg; multiply kg by 2.205 for lb.",
  intro:
    "Mass unit confusion affects gym progression logs, airline baggage, medical dosing context abroad, and recipe scaling. Kilograms are base SI mass unit; US customary pounds split into ounces for smaller increments. Stone (UK) occasionally appears in body weight colloquially—14 lb per stone—adding a third layer for international readers. Shipping carriers may bill dimensional weight in kg while US bathroom scales read lb. Consistent unit choice across weekly tracking matters more than daily conversion perfection for fitness trends.",
  primaryToolId: "kg-to-lbs",
  relatedToolIds: ["lbs-to-kg", "ounces-to-grams"],
  relatedResourceSlugs: ["ounces-vs-grams", "miles-vs-kilometers"],
  lastReviewed: "2026-05-23",
  sections: [
    {
      id: "conversion",
      heading: "Exact conversion and quick estimates",
      paragraphs: [
        "1 kg = 2.2046226218 lb. Mental shortcut: divide lb by 2.2 for kg—close for human scale weights. 180 lb ÷ 2.2 ≈ 81.8 kg.",
        "Gym barbells: 20 kg ≈ 44.1 lb plate; 45 lb plate ≈ 20.4 kg—common mismatch when gyms mix metric and imperial plate sets.",
      ],
      linkedToolIds: ["kg-to-lbs", "lbs-to-kg"],
    },
    {
      id: "fitness",
      heading: "Fitness and body composition tracking",
      paragraphs: [
        "Log weight in one consistent unit weekly; convert for comparison to foreign programs only at reporting time. Daily fluctuations in lb or kg reflect water, not unit error.",
        "Strength standards quoted kg online convert to lb for US lifters comparing to local meet records—always verify whether totals include collar clips or bar weight in stated number.",
      ],
      linkedToolIds: ["kg-to-lbs"],
    },
    {
      id: "shipping",
      heading: "Shipping, luggage, and commerce",
      paragraphs: [
        "Airlines publish baggage limits in kg internationally and sometimes lb on US carriers—convert before packing to avoid fees. Product weights on Amazon US list lb/oz; EU listings use kg/g.",
        "Freight bills of lading may use metric tons (tonnes) separate from US short tons—do not confuse with lb/kg conversion alone on heavy cargo.",
      ],
      linkedToolIds: ["kg-to-lbs"],
    },
    {
      id: "cooking-link",
      heading: "Link to ounces and grams in cooking",
      paragraphs: [
        "Small ingredient masses often use ounces and grams rather than lb/kg. One lb = 16 oz ≈ 453.6 g. Recipe import converts oz→g for scale baking while body weight stays lb↔kg.",
        "Butcher and produce US pricing per lb vs per kg affects cost comparison—convert unit price after normalizing weight unit.",
      ],
      linkedToolIds: ["ounces-to-grams", "kg-to-lbs"],
    },
    {
      id: "precision",
      heading: "Precision, rounding, and medical context",
      paragraphs: [
        "Clinical dosing uses kg body weight in many protocols regardless of patient country—convert lb to kg before applying mg/kg formulas unless local policy specifies otherwise.",
        "Digital scales toggle units—confirm display mode before logging. Rounding to one decimal kg or whole lb suffices for most non-clinical tracking.",
      ],
      linkedToolIds: ["kg-to-lbs", "lbs-to-kg"],
    },
  ],
  examples: [
    {
      title: "154 lb athlete",
      description: "154 ÷ 2.205 ≈ 69.9 kg—weight class check for international judo categories in kg.",
    },
    {
      title: "100 kg squat milestone",
      description: "100 × 2.205 ≈ 220.5 lb—compare to US powerlifting plate math (225 lb bar setup).",
    },
  ],
  commonMistakes: [
    "Using 2.0 instead of 2.205 for precise shipping limits.",
    "Confusing mass lb with force pounds-force in physics problems.",
    "Mixing troy pounds (precious metals) with avoirdupois pounds.",
    "Logging daily weight in alternating units, obscuring trend apps.",
  ],
};

export const ouncesVsGramsResource: ResourceDefinition = {
  slug: "ounces-vs-grams",
  categorySlug: "unit-converters",
  title: "Ounces vs Grams Explained",
  summary:
    "Ounces and grams measure small masses; one avoirdupois ounce equals 28.3495 grams.",
  metaTitle: "Ounces vs Grams - Cooking & Weight Conversion",
  metaDescription:
    "Convert ounces to grams for recipes, postage, and supplements with conversion factors and free converter links.",
  keywords: ["ounces vs grams", "oz to grams", "gram conversion", "cooking weight units"],
  quickAnswer:
    "1 US customary ounce (avoirdupois) = 28.3495 grams. 1 gram ≈ 0.03527 oz. Sixteen ounces make one pound. Fluid ounces measure volume, not mass—do not swap fl oz for weight oz without density. Multiply oz by 28.35 for grams.",
  intro:
    "Recipe globalization made grams-on-a-scale the precision standard for baking while US home cooks still meet cups and ounces in legacy cookbooks. Weight ounces (oz) differ from fluid ounces (fl oz)—only weight ounces convert to grams directly without knowing ingredient density. Nutrition labels in the US list serving size in grams alongside oz for compliance. Small package shipping, coffee dosing, and supplement capsules frequently bounce between 28 g and 1 oz nominal sizes that are close but not identical for strict tracking.",
  primaryToolId: "ounces-to-grams",
  relatedToolIds: ["grams-to-ounces", "kg-to-lbs", "cups-to-grams"],
  relatedResourceSlugs: ["pounds-vs-kilograms", "gallons-vs-liters"],
  lastReviewed: "2026-05-23",
  sections: [
    {
      id: "avoirdupois",
      heading: "Avoirdupois ounce vs troy ounce",
      paragraphs: [
        "Kitchen and postal ounces use avoirdupois: 28.3495 g per oz. Troy ounce for precious metals is heavier: ~31.103 g. Jewelry contexts require troy; flour does not.",
        "Always confirm ounce type in financial or specialty domains before converting to grams for inventory valuation.",
      ],
      linkedToolIds: ["ounces-to-grams"],
    },
    {
      id: "cooking",
      heading: "Cooking and baking precision",
      paragraphs: [
        "Professional baking formulas in grams scale linearly; volume cups do not. Converting 8 oz butter (by weight) to 227 g matches stick labeling better than water cup volume.",
        "Coffee specialty recipes quote 18 g dose vs 0.63 oz—same shot, different unit habit. Use scale tare in one unit consistently.",
      ],
      linkedToolIds: ["ounces-to-grams", "grams-to-ounces"],
    },
    {
      id: "fluid-ounce-warning",
      heading: "Weight ounce vs fluid ounce",
      paragraphs: [
        "US fluid ounce (volume) ≈ 29.57 mL for water-like density only. Eight fl oz water ≈ 236 g, but 8 fl oz honey weighs more grams—volume-to-mass needs density.",
        "Recipe saying 6 oz chocolate chips usually means weight; 6 fl oz milk means volume. Context and ingredient type disambiguate.",
      ],
      linkedToolIds: ["ounces-to-grams", "liters-to-gallons"],
    },
    {
      id: "pounds-link",
      heading: "Relating to pounds and kilograms",
      paragraphs: [
        "16 oz = 1 lb ≈ 453.592 g. 1 kg ≈ 35.274 oz. Bulk meat or produce priced per lb converts to per-kg by dividing lb price by 0.4536 kg equivalent.",
        "Nutrition panels show 28 g serving ≈ 1 oz reference for snack comparison across US and EU packaging.",
      ],
      linkedToolIds: ["kg-to-lbs", "ounces-to-grams"],
    },
    {
      id: "practice",
      heading: "Practical conversion habits",
      paragraphs: [
        "Memorize anchors: 1 oz ≈ 28 g, 4 oz ≈ 113 g, 8 oz ≈ 227 g. For spices under 10 g, gram precision beats 0.3 oz rounding on cheap scales.",
        "Import recipes by converting entire ingredient list to grams once, save scaled template, cook from grams thereafter to reduce repeated conversion error.",
      ],
      linkedToolIds: ["ounces-to-grams", "grams-to-ounces"],
    },
  ],
  examples: [
    {
      title: "Chocolate bar 3.5 oz",
      description: "3.5 × 28.35 ≈ 99.2 g—EU label may round 100 g; check net weight statement.",
    },
    {
      title: "Espresso dose 18 g",
      description: "18 ÷ 28.35 ≈ 0.63 oz—communicate with US roasters using oz nomenclature.",
    },
  ],
  commonMistakes: [
    "Treating fluid ounces as weight ounces in baking.",
    "Using troy ounce factor for food.",
    "Rounding 28.35 to 30 g repeatedly across many ingredients, skewing totals.",
    "Converting volume cups to grams without ingredient-specific density.",
  ],
};

export const gallonsVsLitersResource: ResourceDefinition = {
  slug: "gallons-vs-liters",
  categorySlug: "unit-converters",
  title: "Gallons vs Liters Explained",
  summary:
    "Gallons and liters measure volume; one US gallon equals about 3.785 liters.",
  metaTitle: "Gallons vs Liters - Volume Conversion Guide",
  metaDescription:
    "Compare US gallons and liters for fuel, beverages, and chemistry with conversion factors and free liters-to-gallons tools.",
  keywords: ["gallons vs liters", "liters to gallons", "volume conversion", "us gallon liter"],
  quickAnswer:
    "1 US liquid gallon = 3.785411784 liters. 1 liter ≈ 0.264172 US gallons. UK imperial gallon is larger: 4.546 L. Always specify US vs imperial gallon. Fuel economy: US mpg vs L/100km requires volume and distance conversions together.",
  intro:
    "Volume units trip travelers at fuel pumps, brewers scaling recipes, and pool owners dosing chemicals. Liters are metric standard worldwide; US liquid gallons dominate American retail milk jugs, gas pumps, and paint cans. The UK imperial gallon differs—roughly 20% larger than US gallon—so international fuel economy discussions must label gallon type explicitly. Liter-to-gallon conversion alone does not translate mpg to L/100km; that requires inverting consumption rate logic across distance units too.",
  primaryToolId: "liters-to-gallons",
  relatedToolIds: ["gallons-to-liters", "ounces-to-grams"],
  relatedResourceSlugs: ["ounces-vs-grams", "cubic-yards-explained"],
  lastReviewed: "2026-05-23",
  sections: [
    {
      id: "us-vs-imperial",
      heading: "US gallon vs imperial gallon",
      paragraphs: [
        "US gallon defined as 231 cubic inches = 3.785 L. Imperial (UK) gallon = 4.546 L. Mislabeling invalidates fuel cost comparisons between US and UK publications.",
        "When in doubt, convert through liters as neutral intermediate: store benchmarks in liters, display local gallon type at output only.",
      ],
      linkedToolIds: ["liters-to-gallons", "gallons-to-liters"],
    },
    {
      id: "fuel",
      heading: "Fuel volume and economy",
      paragraphs: [
        "Gasoline dispensed in liters globally except US gallon pumps. Rental car fuel policy 'return full tank' requires knowing tank capacity in correct unit—60 L ≈ 15.9 US gal.",
        "Fuel economy: 30 mpg (US) converts to about 7.84 L/100km via combined conversion formulas—not by dividing mpg by 3.785 alone.",
      ],
      linkedToolIds: ["liters-to-gallons", "miles-to-km"],
    },
    {
      id: "household",
      heading: "Household products and cooking",
      paragraphs: [
        "US milk gallons (128 fl oz) vs metric 2 L and 1 L cartons in other markets—compare price per liter after conversion. Paint gallons vs liter tins affect coverage estimates on cans.",
        "Homebrew and winemaking gravities use liters internally even when US recipes quote gallons—convert batch volume before scaling malt bills.",
      ],
      linkedToolIds: ["liters-to-gallons"],
    },
    {
      id: "cubic-relation",
      heading: "Relating to cubic yards and cubic feet",
      paragraphs: [
        "Large aggregate volumes use cubic yards or cubic meters, not gallons—except liquid tank capacity crossovers. 1 cubic foot = 7.48 US gallons; connects pool volume math in ft³ to chemical dosing charts in gallons.",
        "Do not apply gallon-liter factor to yardage of gravel—area×depth yields cubic units first, then convert if needed.",
      ],
      linkedToolIds: ["cubic-yards-to-cubic-feet", "liters-to-gallons"],
    },
    {
      id: "workflow",
      heading: "Safe conversion workflow",
      paragraphs: [
        "Label gallon type in spreadsheet headers: gal_US, gal_UK, L. Convert inputs to liters for calculation column, export localized display column last.",
        "Verify container label nominal size—'one gallon' cleaners may be US fl oz net contents with metric secondary line in mL.",
      ],
      linkedToolIds: ["liters-to-gallons", "gallons-to-liters"],
    },
  ],
  examples: [
    {
      title: "15 US gal fuel tank",
      description: "15 × 3.785 ≈ 56.8 L—fill cost at €/L stations on European road trip.",
    },
    {
      title: "2 L soda vs half gallon",
      description: "2 L ≈ 0.53 US gal; US half gallon = 1.89 L—not identical retail sizes.",
    },
  ],
  commonMistakes: [
    "Using imperial gallon factor for US gas price comparisons.",
    "Converting mpg to L/100km with only volume factor, ignoring miles to km.",
    "Confusing dry gallon (rare) with liquid gallon.",
    "Applying gallon-liter conversion to cubic yard soil volume orders.",
  ],
};

export const cubicYardsExplainedResource: ResourceDefinition = {
  slug: "cubic-yards-explained",
  categorySlug: "unit-converters",
  title: "Cubic Yards Explained",
  summary:
    "A cubic yard is a volume unit equal to 27 cubic feet, commonly used for concrete, gravel, and mulch orders in the US.",
  metaTitle: "Cubic Yards Explained - Volume for Construction",
  metaDescription:
    "Learn what a cubic yard is, how to convert to cubic feet and tons of material, with examples for concrete and aggregate ordering.",
  keywords: ["cubic yards explained", "cubic yard to cubic feet", "volume construction", "yardage calculation"],
  quickAnswer:
    "1 cubic yard (yd³) = 27 cubic feet (ft³). Volume = length × width × depth in feet, divided by 27. Suppliers quote concrete, topsoil, gravel, and mulch by cubic yard in the US. Material weight in tons requires density per material—volume conversion alone is not weight.",
  intro:
    "Construction and landscaping orders sound opaque until cubic yard volume clicks. Ready-mix concrete trucks measure in cubic yards; dump trucks for gravel do too, while weight limits on bridges use tons. Homeowners calculate patio slab volume in feet then divide by 27 to speak supplier language. Mistaking cubic yards for square yards—area not volume—or forgetting to convert inches of depth to feet before multiplying causes under-ordering that halts pours or over-ordering that wastes delivery minimum fees.",
  primaryToolId: "cubic-yards-to-cubic-feet",
  relatedToolIds: ["cubic-feet-to-cubic-yards", "concrete-calculator", "gravel-cubic-yards-to-tons"],
  relatedResourceSlugs: ["gallons-vs-liters", "feet-vs-meters-reference"],
  lastReviewed: "2026-05-23",
  sections: [
    {
      id: "definition",
      heading: "What a cubic yard represents",
      paragraphs: [
        "A cubic yard is the volume of a cube three feet long on each side: 3 ft × 3 ft × 3 ft = 27 ft³. It is imperial/US customary volume for bulk materials, not to be confused with square yards (area) or linear yards of fabric.",
        "Metric counterpart is cubic meter (m³): 1 m³ ≈ 1.308 yd³. International projects may spec m³ while US suppliers bill yd³—convert at contract stage.",
      ],
      linkedToolIds: ["cubic-yards-to-cubic-feet"],
    },
    {
      id: "calculation",
      heading: "Calculating cubic yards from dimensions",
      paragraphs: [
        "Measure length, width, depth in feet. Multiply for ft³. Divide by 27 for yd³. Example: 12 ft × 20 ft × 0.33 ft (4 in) = 79.2 ft³ ÷ 27 ≈ 2.93 yd³ concrete.",
        "Irregular shapes divide into rectangles or use average width/depth with conservative waste factor 5–10% for uneven subgrade and spillage.",
      ],
      linkedToolIds: ["cubic-yards-to-cubic-feet", "concrete-calculator"],
    },
    {
      id: "materials",
      heading: "Concrete, gravel, mulch, and topsoil",
      paragraphs: [
        "Concrete ready-mix ordered by yd³ with minimum load charges. Gravel and crushed stone convert yd³ to tons using material bulk density—granite differs from limestone. Mulch yd³ is lighter tons per yard than gravel.",
        "Topsoil compacts after rain—some suppliers sell ‘fluffed’ vs compacted yardage; clarify moisture and compaction assumptions on quote.",
      ],
      linkedToolIds: ["gravel-cubic-yards-to-tons", "mulch-calculator"],
    },
    {
      id: "tons-link",
      heading: "Volume to weight: cubic yards to tons",
      paragraphs: [
        "Tons = cubic yards × density (tons per cubic yard). Aggregate might approximate 1.4–1.6 tons/yd³ depending on material and moisture; mulch far less.",
        "Weight limits on residential driveways and truck axles constrain tonnage even when volume fits visually—check both yd³ order and estimated tons with supplier.",
      ],
      linkedToolIds: ["gravel-cubic-yards-to-tons"],
    },
    {
      id: "errors",
      heading: "Avoiding costly measurement errors",
      paragraphs: [
        "Convert depth inches to feet before multiply—4 inches = 0.333 ft, not 4 ft. Double-check units on calculator inputs when switching between meters and feet mid-project.",
        "Order slightly above calculated yardage with documented waste policy rather than risking cold joint on concrete pour from short load.",
      ],
      linkedToolIds: ["cubic-yards-to-cubic-feet", "concrete-calculator"],
    },
  ],
  examples: [
    {
      title: "Driveway gravel 8 ft × 40 ft × 0.25 ft",
      description: "80 ft³ ÷ 27 ≈ 2.96 yd³; at 1.5 tons/yd³ ≈ 4.4 tons for delivery planning.",
    },
    {
      title: "Mulch beds 600 ft² at 3 in depth",
      description: "600 × 0.25 = 150 ft³ ÷ 27 ≈ 5.6 yd³ mulch volume before compaction settle allowance.",
    },
  ],
  commonMistakes: [
    "Using square footage as cubic yards without depth.",
    "Leaving depth in inches unconverted to feet.",
    "Assuming one ton conversion factor for all materials.",
    "Confusing cubic yards with linear yards of truck bed length.",
  ],
};

export const celsiusVsFahrenheitResource: ResourceDefinition = {
  slug: "celsius-vs-fahrenheit-reference",
  categorySlug: "unit-converters",
  title: "Celsius vs Fahrenheit Reference",
  summary:
    "Celsius and Fahrenheit are temperature scales; water freezes at 0°C (32°F) and boils at 100°C (212°F) at sea level.",
  metaTitle: "Celsius vs Fahrenheit - Conversion Reference",
  metaDescription:
    "Learn C to F conversion formulas, memorable benchmarks for weather and cooking, and free celsius-to-fahrenheit converter links.",
  keywords: ["celsius vs fahrenheit", "c to f conversion", "temperature scales", "fahrenheit celsius reference"],
  quickAnswer:
    "Convert Celsius to Fahrenheit: F = (C × 9/5) + 32. Fahrenheit to Celsius: C = (F − 32) × 5/9. US uses °F for weather and ovens; most countries use °C. Room temp ~20°C (68°F); body ~37°C (98.6°F).",
  intro:
    "Temperature scale differences affect travel weather interpretation, oven settings for international recipes, HVAC thermostat programming, and scientific communication. Celsius anchors to water phase points at standard pressure; Fahrenheit uses finer degree steps in human-comfort range historically. Linear conversion formulas apply at all values—unlike relative dates, there is no offset-only shortcut without multiply 9/5. Medical, culinary, and industrial contexts each carry benchmark numbers worth memorizing so 180°C does not get mistaken for moderate warm when it is actually aggressive baking heat near 356°F.",
  primaryToolId: "celsius-to-fahrenheit",
  relatedToolIds: ["fahrenheit-to-celsius"],
  relatedResourceSlugs: ["gallons-vs-liters", "feet-vs-meters-reference"],
  lastReviewed: "2026-05-23",
  sections: [
    {
      id: "formulas",
      heading: "Conversion formulas step by step",
      paragraphs: [
        "C to F: multiply by 1.8 (9/5), add 32. Example: 25°C → 25×1.8+32 = 77°F. F to C: subtract 32, multiply by 5/9. Example: 350°F oven → (350−32)×5/9 ≈ 177°C.",
        "Kelvin is absolute scale for science: K = C + 273.15. Do not apply F↔C formula to Kelvin without intermediate Celsius step.",
      ],
      linkedToolIds: ["celsius-to-fahrenheit", "fahrenheit-to-celsius"],
    },
    {
      id: "benchmarks",
      heading: "Memorable benchmark temperatures",
      paragraphs: [
        "Water freeze: 0°C = 32°F. Boil: 100°C = 212°F. Room comfort: 20–22°C ≈ 68–72°F. Fever threshold roughly 38°C ≈ 100.4°F.",
        "Baking: 180°C ≈ 356°F common EU fan oven vs US 350°F recipes—close enough for many cakes with slight time adjustment, not identical for all pastries.",
      ],
      linkedToolIds: ["celsius-to-fahrenheit"],
    },
    {
      id: "weather",
      heading: "Weather and travel context",
      paragraphs: [
        "US forecasts in °F: 90°F heatwave ≈ 32°C; 0°F severe cold ≈ −18°C. Canadian reports may toggle °C with US border proximity.",
        "Wind chill and heat index combine temperature with humidity/wind in locale-specific units—convert base temp first before comparing indices across countries.",
      ],
      linkedToolIds: ["celsius-to-fahrenheit", "fahrenheit-to-celsius"],
    },
    {
      id: "cooking",
      heading: "Cooking, candy, and meat safety",
      paragraphs: [
        "Meat internal safety temps: 74°C ≈ 165°F poultry; 63°C ≈ 145°F fish—use thermometer unit matching reference chart. Candy stages historically in °F in US books.",
        "Fan vs conventional oven labels in EU recipes affect effective heat—conversion of dial number alone may not capture convection offset.",
      ],
      linkedToolIds: ["celsius-to-fahrenheit"],
    },
    {
      id: "mistakes",
      heading: "Common conversion pitfalls",
      paragraphs: [
        "Doubling °C to approximate °F fails except near −40 crossover where scales equal. Offset plus scale both required.",
        "Industrial equipment dials in °F while data loggers export °C—mislabel breaks HACCP records in food plants.",
      ],
      linkedToolIds: ["celsius-to-fahrenheit", "fahrenheit-to-celsius"],
    },
  ],
  examples: [
    {
      title: "Summer day 32°C",
      description: "32×1.8+32 = 89.6°F—hot day in °F terms for US audience.",
    },
    {
      title: "Oven 425°F",
      description: "(425−32)×5/9 ≈ 218°C—broil setting on US range converted for EU appliance.",
    },
    {
      title: "−40 crossover",
      description: "−40°C = −40°F—only point where numeric value matches on both scales.",
    },
  ],
  commonMistakes: [
    "Forgetting to add 32 after multiplying Celsius by 1.8.",
    "Using multiply-only shortcut without offset.",
    "Assuming 350°F equals 350°C on oven dial—catastrophic error.",
    "Mixing Kelvin and Celsius offsets in scientific calculations.",
  ],
};
