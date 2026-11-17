export const batchSampleCsv = 'custom_id,product,sku\nitem-001,Desk lamp,00001234\nitem-002,"Notebook, blue",00005678\nitem-003,Travel mug,00009012\nitem-004,Canvas bag,00003456';
export const batchSampleRequests = ["Desk lamp", "Notebook, blue", "Travel mug", "Canvas bag"].map((name, i) => JSON.stringify({ custom_id: `item-00${i + 1}`, method: "POST", url: "/v1/responses", body: { model: "YOUR_MODEL", input: `Classify this product in a few words: ${name}` } })).join("\n");
export const batchSampleResults = [
  { custom_id: "item-003", response: { status_code: 200, body: { status: "completed", output: [{ type: "message", content: [{ type: "output_text", text: "Drinkware" }] }] } }, error: null },
  { custom_id: "item-001", response: { status_code: 200, body: { choices: [{ message: { content: "Lighting" }, finish_reason: "stop" }] } }, error: null },
  { custom_id: "item-002", response: null, error: { code: "batch_expired", message: "The completion window expired." } },
].map(r => JSON.stringify(r)).join("\n");
