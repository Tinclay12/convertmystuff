# Batch-to-spreadsheet experiment - November 17, 2026

## Decision

Ship one bounded browser-local workflow inside ConvertMyStuff. Keep the existing catalog. Defer another domain, paid acquisition and broad platform work until usage and user research justify them.

Hypothesis: people who run OpenAI batches will complete a repeatable task more easily when they can join results to their original spreadsheet, preserve text identifiers in Excel and prepare a conservative retry file without scripting.

## Competitive check

Published capabilities reviewed on November 17, 2026:

| Alternative | Observed capability | Implication |
| --- | --- | --- |
| [JSONLKit](https://jsonlkit.com/) | Browser-local JSONL conversion, inspection, validation and Excel tools | Generic JSONL conversion is established; privacy alone is not differentiation. |
| [batchline](https://github.com/Ayubjon/batchline) | CLI/library for batch construction and reconciliation | Reconciliation is established; a guided interface must earn its place through usability. |
| [Salyro](https://salyro.com/tools/batch-results-merger) | Search result describes a browser-local batch results merger | Direct browser competition exists. Full page retrieval timed out; feature parity has not been established. |

Do not describe this as an uncontested niche or an easy keyword opportunity. Search volume, keyword difficulty, backlinks and actual user preference remain unmeasured. Search result discovery is not a hands-on competitor benchmark.

## First release

- Responses and Chat Completions OpenAI Batch text outputs; combine result and error files.
- Optional original CSV, exact ID-column mapping, original row order and source columns.
- Optional original request JSONL enables missing detection and request-body retry exports.
- Success, failed, missing, review and duplicate statuses; unmatched result IDs shown separately.
- XLSX text cells preserve long IDs and leading zeros. CSV formula-like cells are escaped.
- Review CSV separates problems from successful answers. Retries require original bodies and include only missing or recognized temporary failures. Confirm a completed batch before retrying.
- Downloadable synthetic samples with explicit expected outcomes. These are a starter resource, not a completed cross-tool compatibility lab.
- Twenty MB per input; no API calls, credentials, file uploads or persistence.

## Measurement

Use the existing GA4 integration when configured. `tool_id=openai-batch-to-spreadsheet` is included in `flagship_calculate` and `flagship_export`. Modes distinguish `sample:*` and `own-files:*`; exports distinguish results, review and retry formats. No filenames, IDs, answers or source data are sent in these events.

Sample interactions do not count as proof of demand. Manually edited samples can resemble own-file activity, so analytics are directional. Confirm genuine tasks in user sessions.

## Validation gate before another substantial build

1. Recruit five people who already use batch APIs for spreadsheet work; do not substitute generic tool users. Recruitment messages have not been sent.
2. Observe each person completing a real export without coaching. Log time, errors, abandoned steps and their current alternative. Do not collect their confidential files.
3. Proposed proceed threshold: four of five complete independently, three prefer it to their current process, and two return with another real batch within 30 days. These are decision criteria, not observed results.
4. Review actual Search Console query impressions and export completion. Explicitly measure demand before buying ads or claiming a ranking advantage.
5. If users prefer competing tools or do not return, stop expansion and retain only what earns useful traffic. If evidence supports expansion, prioritize the most frequent observed blocker (for example, structured JSON answer columns or a second provider).

The broader compatibility lab and publisher widgets remain deferred. Next lab work should compare reproducible complete workflows, with dated results and downloadable fixtures, rather than publish untested comparisons.

## Technical verification

Automated coverage includes reordered IDs, missing/expired requests, duplicate IDs, quoted multiline CSV, BOM/CRLF, invalid JSONL, refusals, incomplete answers, permanent errors, retry-body preservation, formula-safe CSV, XLSX string cells and stale-export invalidation. CI must pass before production rollout. Local browser access, dependency auditing and font fetching can be blocked by the execution environment; do not label those checks as passed without a successful result.

Reference: [OpenAI Batch guide](https://developers.openai.com/api/docs/guides/batch).
