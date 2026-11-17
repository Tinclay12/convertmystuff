import type { ToolDefinition } from "./types";
import { buildLiveTool, faq } from "./registry-live-helpers";

export type UnitPairMeta = {
  id: string;
  slug: string;
  title: string;
  subcategory: string;
  shortDescription: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  formula: string;
  explanation: string;
  exampleTitle: string;
  exampleInput: string;
  exampleOutput: string;
  exampleExplanation: string;
  reverseId: string;
  relatedTools: string[];
  sourceNote: string;
  priority?: number;
  lastReviewed?: string;
  howToUse?: string[];
  faqs?: ToolDefinition["faqs"];
  extraExamples?: ToolDefinition["examples"];
};

export const buildUnitConverterTool = (meta: UnitPairMeta): ToolDefinition =>
  buildLiveTool({
    id: meta.id,
    slug: meta.slug,
    title: meta.title,
    category: "unit-converters",
    subcategory: meta.subcategory,
    shortDescription: meta.shortDescription,
    metaTitle: meta.metaTitle,
    metaDescription: meta.metaDescription,
    keywords: meta.keywords,
    relatedTools: [meta.reverseId, ...meta.relatedTools],
    componentKey: "GenericUnitConverterTool",
    schemaType: "Calculator",
    formula: meta.formula,
    explanation: meta.explanation,
    priority: meta.priority,
    lastReviewed: meta.lastReviewed,
    howToUse: meta.howToUse ?? [
      `Enter the value in ${meta.title.split(" to ")[0]?.toLowerCase() ?? "source units"}.`,
      "View the converted result instantly.",
      "Use the reverse converter link for the opposite conversion.",
    ],
    examples: [
      {
        title: meta.exampleTitle,
        input: meta.exampleInput,
        output: meta.exampleOutput,
        explanation: meta.exampleExplanation,
        prefillValue: meta.exampleInput,
      },
      ...(meta.extraExamples ?? []),
    ],
    faqs: meta.faqs ?? [
      faq("Can I convert back to the original unit?", `Yes. Use the reverse ${meta.title.includes("Converter") ? meta.title.replace(meta.slug.split("-to-")[0] ?? "", meta.reverseId.split("-to-")[0] ?? "") : "converter"}.`),
      faq("Does this support decimal values?", "Yes. Decimal inputs are supported."),
      faq("Is this conversion exact?", "This tool uses standard published conversion factors."),
    ],
    commonUseCases: [
      "Convert measurements for projects and listings",
      "Switch between metric and US customary units",
      "Quick reference for everyday unit math",
    ],
    sourceNotes: [meta.sourceNote],
  });

export const expandedUnitPairTools: ToolDefinition[] = [
  buildUnitConverterTool({
    id: "square-meters-to-square-feet",
    slug: "square-meters-to-square-feet",
    title: "Square Meters to Square Feet Converter",
    subcategory: "area",
    shortDescription: "Convert m² to ft² instantly. Measure a room, convert a whole list, or type into either unit to work both ways.",
    metaTitle: "Square Meters to Square Feet Converter (m² to ft²)",
    metaDescription:
…11754 tokens truncated…st hasInput =
    mode === "room" ? !!(length.trim() && width.trim()) : !!raw.trim();
  const f = (value: number) => formatNumber(value, precision);
  const display = (unit: AreaUnit) =>
    source === unit ? raw : result.ok ? String(result[unit]) : "";
  const batch = convertAreaList(batchText, from);
  const csv = areaCsv(batchText, from);
  const summary = result.ok
    ? `${f(result.sqm)} m² = ${f(result.sqft)} ft²`
    : "";
  const params: Record<string, string> =
    mode === "room"
      ? { mode: "room", length, width, precision: String(precision) }
      : {
          value: result.ok ? String(result[from]) : "",
          precision: String(precision),
        };
  const shareUrl = buildToolShareUrl(tool.path, params);
  const reverseTool = getToolById(
    from === "sqm"
      ? "square-feet-to-square-meters"
      : "square-meters-to-square-feet",
  )!;
  const reverseHref = `${reverseTool.path}${result.ok ? `?value=${encodeURIComponent(result[to])}` : ""}`;
  const presets =
    from === "sqm" ? [20, 50, 60, 100, 150] : [100, 500, 1000, 1500, 2000];
  const clear = () => {
    setRaw("");
    setLength("");
    setWidth("");
    setBatchText("");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-muted-strong">
        <span className="flex items-center gap-1.5">
          <Lightning size={16} className="text-accent" aria-hidden="true" />{" "}
          Instant, in either direction
        </span>
        <span className="flex items-center gap-1.5">
          <LockSimple size={16} aria-hidden="true" /> Your numbers stay in your
          browser
        </span>
      </div>
      <div
        className="grid gap-2 sm:grid-cols-3"
        role="group"
        aria-label="Area calculator mode"
      >
        {modes.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={mode === item.id}
            onClick={() => setMode(item.id)}
            className={`rounded-xl border p-3 text-left focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/20 ${mode === item.id ? "border-accent bg-accent-soft" : "border-border hover:border-accent/50"}`}
          >
            <span
              className={`block text-sm font-semibold ${mode === item.id ? "text-accent" : ""}`}
            >
              {item.label}
            </span>
            <span className="mt-1 block text-xs text-muted-strong">
              {item.hint}
            </span>
          </button>
        ))}
      </div>
      {mode === "batch" ? (
        <section className="space-y-4" aria-label="Batch area conversion">
          <label htmlFor="area-list" className="block text-sm font-semibold">
            Areas in {areaUnits[from].name.toLowerCase()} — one per line
          </label>
          <textarea
            id="area-list"
            rows={6}
            maxLength={12000}
            value={batchText}
            onChange={(event) => setBatchText(event.target.value)}
            placeholder={from === "sqm" ? "60\n80\n100" : "500\n1,000\n1,500"}
            className="w-full rounded-xl border border-border bg-panel-muted p-4 font-mono text-base focus:outline-none focus:ring-4 focus:ring-accent/20"
            aria-describedby="area-list-help"
          />
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p id="area-list-help" className="text-xs text-muted-strong">
              Up to 200 areas. Commas may separate thousands.
            </p>
            <Button
              type="button"
              variant="subtle"
              size="sm"
              onClick={() =>
                setBatchText(
                  from === "sqm" ? "60\n80\n100" : "500\n1,000\n1,500",
                )
              }
            >
              Try a sample list
            </Button>
          </div>
          {batch.error && (
            <p role="alert" className="text-sm text-destructive">
              {batch.error}
            </p>
          )}
          {!!batch.rows.length && (
            <div className="max-h-96 overflow-auto rounded-xl border border-border">
              <table className="w-full text-left text-sm">
                <caption className="px-4 py-3 text-left font-semibold">
                  {batch.rows.length} areas ·{" "}
                  {batch.rows.filter((row) => !row.result.ok).length} errors
                </caption>
                <thead className="bg-panel-muted">
                  <tr>
                    <th scope="col" className="p-3">
                      Line
                    </th>
                    <th scope="col" className="p-3">
                      {areaUnits[from].symbol}
                    </th>
                    <th scope="col" className="p-3">
                      {areaUnits[to].symbol}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {batch.rows.map((row) => (
                    <tr key={row.line} className="border-t border-border">
                      <th scope="row" className="p-3 font-normal text-muted">
                        {row.line}
                      </th>
                      <td className="p-3 tabular-nums">{row.raw}</td>
                      <td
                        className={`p-3 tabular-nums ${row.result.ok ? "" : "text-destructive"}`}
                      >
                        {row.result.ok ? f(row.result[to]) : row.result.error}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {csv && (
            <ToolOutputActions
              toolId={toolId}
              componentKey="AreaConverterTool"
              copyValue={csv}
              copyLabel="Copy table"
              download={{
                content: csv,
                filename: `${toolId}.csv`,
                mimeType: "text/csv;charset=utf-8",
              }}
              shareDisabled
            />
          )}
          {!!batch.rows.length && !csv && !batch.error && (
            <p className="text-sm text-muted-strong">
              Correct the highlighted values to copy or download the complete
              list.
            </p>
          )}
        </section>
      ) : (
        <>
          {mode === "area" ? (
            <div>
              <div className="grid items-end gap-4 sm:grid-cols-[1fr_auto_1fr]">
                <Input
                  id="area-from"
                  label={`${areaUnits[from].name} (${areaUnits[from].symbol})`}
                  type="text"
                  inputMode="decimal"
                  autoComplete="off"
                  value={display(from)}
                  onChange={(event) => {
                    setSource(from);
                    setRaw(event.target.value);
                  }}
                  placeholder={from === "sqm" ? "100" : "1000"}
                  className="h-16 text-2xl tabular-nums"
                />
                <Link
                  href={reverseHref}
                  aria-label={`Switch to ${areaUnits[to].name.toLowerCase()} to ${areaUnits[from].name.toLowerCase()}`}
                  className="mx-auto flex size-11 items-center justify-center rounded-full border border-border text-accent hover:bg-accent-soft focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/20 sm:mb-2"
                >
                  <ArrowsLeftRight size={20} aria-hidden="true" />
                </Link>
                <Input
                  id="area-to"
                  label={`${areaUnits[to].name} (${areaUnits[to].symbol})`}
                  type="text"
                  inputMode="decimal"
                  autoComplete="off"
                  value={display(to)}
                  onChange={(event) => {
                    setSource(to);
                    setRaw(event.target.value);
                  }}
                  placeholder="Or enter a value here"
                  className="h-16 text-2xl tabular-nums"
                />
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="mr-1 text-xs text-muted-strong">
                  Try {areaUnits[from].symbol}:
                </span>
                {presets.map((value) => (
                  <Button
                    key={value}
                    variant="secondary"
                    size="sm"
                    type="button"
                    onClick={() => {
                      setSource(from);
                      setRaw(String(value));
                    }}
                  >
                    {formatNumber(value)}
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-[1fr_1fr]">
              <div className="space-y-4">
                <Input
                  id="room-length"
                  label={`Length (${areaUnits[from].length})`}
                  type="text"
                  inputMode="decimal"
                  value={length}
                  onChange={(event) => setLength(event.target.value)}
                  placeholder={from === "sqm" ? "5" : "20"}
                />
                <Input
                  id="room-width"
                  label={`Width (${areaUnits[from].length})`}
                  type="text"
                  inputMode="decimal"
                  value={width}
                  onChange={(event) => setWidth(event.target.value)}
                  placeholder={from === "sqm" ? "4" : "15"}
                />
                <Button
                  variant="subtle"
                  size="sm"
                  type="button"
                  onClick={() => {
                    setLength(from === "sqm" ? "5" : "20");
                    setWidth(from === "sqm" ? "4" : "15");
                  }}
                >
                  Try a room
                </Button>
              </div>
              <div
                className="flex min-h-44 items-center justify-center rounded-xl bg-panel-muted p-6"
                aria-label="Rectangular room illustration"
              >
                <div className="flex min-h-28 w-full max-w-56 flex-col items-center justify-center border-2 border-dashed border-accent/60 bg-accent-soft p-4 text-center">
                  <span className="text-xs text-muted-strong">
                    {length || "Length"} × {width || "Width"}{" "}
                    {areaUnits[from].length}
                  </span>
                  <span className="mt-2 text-xl font-semibold tabular-nums">
                    {result.ok
                      ? `${f(result[from])} ${areaUnits[from].symbol}`
                      : "Your room"}
                  </span>
                  <span className="mt-2 text-xs text-muted">
                    Rectangle · illustration only
                  </span>
                </div>
              </div>
            </div>
          )}
          <section
            className="rounded-2xl border border-accent/20 bg-accent-soft p-5 sm:p-6"
            aria-label="Area result"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-accent">
                {areaUnits[to].name}
              </h2>
              <label className="flex items-center gap-2 text-xs text-muted-strong">
                Decimal places
                <select
                  aria-label="Decimal places"
                  value={precision}
                  onChange={(event) => setPrecision(Number(event.target.value))}
                  className="rounded-lg border border-border bg-card p-1.5 text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value={2}>2</option>
                  <option value={4}>4</option>
                  <option value={6}>6</option>
                </select>
              </label>
            </div>
            <div aria-live="polite" aria-atomic="true">
              {result.ok ? (
                <>
                  <p className="mt-3 break-words text-4xl font-semibold tracking-tight tabular-nums sm:text-5xl">
                    {f(result[to])}
                    <span className="ml-2 text-2xl text-accent">
                      {areaUnits[to].symbol}
                    </span>
                  </p>
                  <p className="mt-3 text-sm text-muted-strong">{summary}</p>
                  {result[to] !== 0 && f(result[to]) === "0" && (
                    <p className="mt-2 text-xs text-muted-strong">
                      This area rounds to zero at this precision. The unrounded
                      value is {result[to]} {areaUnits[to].symbol}.
                    </p>
                  )}
                </>
              ) : (
                <p
                  className={`mt-4 ${hasInput ? "text-destructive" : "text-muted-strong"}`}
                >
                  {hasInput
                    ? result.error
                    : mode === "room"
                      ? "Enter a length and width to see your room in both units."
                      : "Enter an area in either field to see your result."}
                </p>
              )}
            </div>
            <div className="mt-5">
              <ToolOutputActions
                toolId={toolId}
                componentKey="AreaConverterTool"
                copyValue={
                  result.ok
                    ? mode === "room"
                      ? `${length} × ${width} ${areaUnits[from].length}\n${summary}`
                      : summary
                    : ""
                }
                copyLabel="Copy result"
                shareUrl={shareUrl}
                shareDisabled={!result.ok}
              />
            </div>
          </section>
          {result.ok && (
            <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-3">
              {[
                { label: "Square yards", value: result.sqft / 9 },
                { label: "Acres", value: result.sqft / 43560 },
                { label: "Hectares", value: result.sqm / 10000 },
              ].map((unit) => (
                <div
                  key={unit.label}
                  className="rounded-xl border border-border px-4 py-3"
                >
                  <p className="text-xs text-muted-strong">{unit.label}</p>
                  <p className="mt-1 break-words text-base font-semibold tabular-nums">
                    {formatNumber(unit.value, 6)}
                  </p>
                </div>
              ))}
            </div>
          )}
          <p className="flex items-start gap-2 text-xs leading-relaxed text-muted-strong">
            <Check
              size={16}
              className="shrink-0 text-success"
              aria-hidden="true"
            />
            Uses the international foot: 1 ft² = 0.09290304 m² exactly.
            Calculations keep full precision; the display is rounded.
          </p>
        </>
      )}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
        <Link
          href={reverseHref}
          className="text-sm font-medium text-accent hover:underline"
        >
          Reverse: {areaUnits[to].symbol} → {areaUnits[from].symbol}
        </Link>
        <Button type="button" variant="ghost" size="sm" onClick={clear}>
          Clear numbers
        </Button>
      </div>
      <section aria-labelledby="area-reference-heading">
        <h2 id="area-reference-heading" className="text-base font-semibold">
          Common {areaUnits[from].symbol} to {areaUnits[to].symbol} conversions
        </h2>
        <p className="mt-1 text-sm text-muted-strong">
          Choose any area to load it into the calculator.
        </p>
        <div className="mt-3 overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-panel-muted">
              <tr>
                <th className="px-4 py-3" scope="col">
                  {areaUnits[from].name}
                </th>
                <th className="px-4 py-3" scope="col">
                  {areaUnits[to].name}
                </th>
              </tr>
            </thead>
            <tbody>
              {(from === "sqm"
                ? [1, 10, 20, 50, 60, 80, 100, 150, 200, 1000]
                : [1, 100, 215, 500, 750, 1000, 1500, 2000, 5000, 10000]
              ).map((value) => {
                const conversion = convertArea(String(value), from);
                return (
                  <tr key={value} className="border-t border-border">
                    <td className="px-4 py-2">
                      <button
                        type="button"
                        className="min-h-9 rounded px-1 font-medium text-accent underline decoration-accent/30 underline-offset-4 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/20"
                        onClick={() => {
                          setMode("area");
                          setSource(from);
                          setRaw(String(value));
                        }}
                      >
                        {formatNumber(value)} {areaUnits[from].symbol}
                      </button>
                    </td>
                    <td className="px-4 py-2 tabular-nums">
                      {conversion.ok ? f(conversion[to]) : "—"}{" "}
                      {areaUnits[to].symbol}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
