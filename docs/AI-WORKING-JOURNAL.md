# AI Working Journal — starter record

This is a starter log for the repository construction. Before submitting an assessment, the candidate should update it to reflect the prompts, suggestions, choices, and independent verification they personally performed. Do not claim that an unrun command passed.

| Task/decision | AI-assisted suggestion or draft | Review/decision | Verification status |
| --- | --- | --- | --- |
| Repository layout | Match the visible `docs/`, `tests/support/`, Playwright specs and root config pattern. | Accepted as a clear layout for a login test demo. | File structure created; inspect it locally. |
| Include a `src/` folder | Create a small, self-contained local demo because the screenshots did not include the target application's source. | Accepted with an explicit limitation: this is not Chubb's original Angular/Spring/Kafka app. | Source and tests included; run commands locally. |
| Credential privacy | Send login credentials in a POST body and verify they are absent from the browser URL. | Accepted; URL-query credentials are treated as a potential defect from the screenshot, not as verified Chubb behaviour. | Regression test included; needs a local run. |
| Invalid login status | Use HTTP 401 for invalid credentials and HTTP 400 for missing credentials in the demo contract. | Accepted only for this demo app. A real system's documented API contract takes precedence. | Test implementation included. |
| Assessment coverage | Distinguish login E2E demo coverage from Chubb's mandatory Angular component and backend unit/integration tests. | Accepted. Do not describe this ZIP as a complete Chubb submission. | Explained in README and test strategy. |
| Execution claims | Avoid reporting tests as passing without running them against the final files. | Accepted. | No pass claim is made in the docs. |

## Candidate: complete after local validation

Record commands and actual results here, for example:

- `npm run typecheck` — result: [fill after run]
- `npm run lint` — result: [fill after run]
- `npm test` — result: [fill after run]
- Suggestions you rejected/changed and why: [fill in your own words]
