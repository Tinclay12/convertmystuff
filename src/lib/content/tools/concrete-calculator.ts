import type { ToolContentEnrichment } from "@/lib/content/types";

export const concreteCalculatorContent: ToolContentEnrichment = {
  contentTier: "B",
  resourceSlugs: ["construction-calculators/how-to-estimate-concrete-cubic-yards"],
  contentBlocks: [
    {
      id: "concrete-formula",
      title: "Slab volume formula",
      variant: "info",
      paragraphs: [
        "Rectangular pours: length × width × depth (feet) ÷ 27 = cubic yards. Depth is entered in inches and converted to feet.",
        "Order 5–10% extra concrete for waste, uneven subgrade, and pump line loss.",
      ],
    },
    {
      id: "bags-vs-readymix",
      title: "Bags or ready-mix: where the line sits",
      variant: "info",
      paragraphs: [
        "One cubic yard is 27 cubic feet, and an 80 lb bag of concrete mix yields about 0.6 cubic feet. That is roughly 45 bags per cubic yard — about 3,600 lb of material to haul, open, and mix, usually inside one working session before the first batches set.",
        "Under about half a cubic yard, bags win: post holes, a small pad, equipment bases, repairs. Between half a yard and a full yard it depends on how many hands you have. Past one cubic yard, ready-mix is almost always the right call, and past two it is not close.",
        "Mixing by bag also makes consistency your problem. Water content varies batch to batch, and the result is uneven strength and colour across a slab that will be visible for its whole life. Ready-mix arrives at a specified strength, which matters for anything structural.",
      ],
      linkedToolIds: ["cement-calculator"],
    },
    {
      id: "ordering",
      title: "What the supplier needs, and what it costs",
      variant: "tip",
      paragraphs: [
        "Suppliers sell in quarter-yard increments and nearly all set a minimum delivery, commonly one cubic yard. Below roughly three to four yards expect a short-load fee, which can rival the concrete cost itself — so if your estimate lands at 3.6 yards, pricing four is often barely more than the short load and leaves you margin.",
        "Order by volume, strength, and slump. Strength is quoted in psi (3,000 for most residential flatwork, 4,000 where vehicles or freeze-thaw are involved); slump describes workability. Have the truck's access route worked out before it arrives — a mixer that cannot reach the pour means a wheelbarrow relay against a setting clock.",
        "Round up, never down. Being half a yard short mid-pour creates a cold joint — a permanent structural and visual seam — while ordering slightly over costs a few dollars and some spare for a splash pad.",
      ],
    },
    {
      id: "thickness",
      title: "Choosing a thickness before you calculate",
      variant: "info",
      paragraphs: [
        "Thickness drives the volume, so settle it first. Four inches covers patios, walkways, and shed floors. Driveways for cars want four to five inches; add an inch or two where trucks or an RV will park. Footings and structural work are set by local code and soil, not by a rule of thumb.",
        "Under-thickness is the most expensive mistake available here, because the repair is demolition. The material difference between a four-inch and a five-inch driveway is about 25% more concrete — trivial next to breaking out and repouring a cracked slab.",
        "Depth is measured to finished subgrade, not to the top of the forms. A subgrade that dips an inch across the pour quietly adds volume, which is much of what the waste allowance is actually covering.",
      ],
    },
    {
      id: "irregular-shapes",
      title: "Measuring shapes that are not rectangles",
      variant: "tip",
      paragraphs: [
        "Split the pour into rectangles, run each through the calculator, and add the results. An L-shaped patio is two rectangles; a driveway with an apron is a rectangle plus a trapezoid you can treat as a rectangle at its average width.",
        "For circles — pads for tanks, columns, fire pits — use π × radius² × depth, working in feet before dividing by 27. For post holes, calculate one hole and multiply by the count, then add the waste factor once at the end rather than per hole.",
      ],
      linkedToolIds: ["gravel-calculator", "mulch-calculator"],
    },
    {
      id: "concrete-workflow",
      title: "Next steps in your pour plan",
      variant: "tip",
      paragraphs: [
        "Convert cubic yards to bag counts with the cement calculator, or estimate gravel and mulch for adjacent site work.",
      ],
      linkedToolIds: ["cement-calculator", "gravel-calculator", "mulch-calculator"],
    },
  ],
  additionalFaqs: [
    {
      question: "How many 80 lb bags are in a cubic yard?",
      answer:
        "About 45, since an 80 lb bag yields roughly 0.6 cubic feet and a cubic yard is 27. A 60 lb bag yields about 0.45 cubic feet, so you would need around 60 of those.",
    },
    {
      question: "At what point should I order ready-mix instead of bags?",
      answer:
        "Around one cubic yard. That is roughly 45 bags and 3,600 lb to mix in a single session, and hand-mixed batches vary in strength and colour. Below half a yard bags are simpler; above two yards ready-mix is clearly cheaper and better.",
    },
    {
      question: "How much extra concrete should I order?",
      answer:
        "5–10% over the calculated volume. Uneven subgrade, spillage, and material left in the chute all consume more than the geometry suggests, and running short mid-pour creates a permanent cold joint.",
    },
    {
      question: "How thick should a concrete driveway be?",
      answer:
        "Four to five inches for cars, six where trucks or an RV park regularly. Patios and walkways are fine at four. Footings are governed by local code and soil conditions rather than a general figure.",
    },
  ],
};
