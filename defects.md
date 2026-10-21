# Defect and Quality Notes

## Candidate issue from the supplied screenshot — not yet verified in Chubb

- **Area:** Authentication and privacy
- **Screenshot observation:** an example login URL includes `email=admin` and `password=admin` query parameters.
- **Potential impact:** URL query parameters may be retained in browser history, copied into tickets/screenshots, and captured by infrastructure logs or referrer data.
- **Expected behaviour:** authentication credentials should be sent in a request body over HTTPS, not URL query parameters.
- **Verification required:** reproduce on the actual target app, inspect the browser address bar/network request, capture redacted evidence, and record the real API response. The screenshot alone does not prove the current Chubb assessment app has this bug.

## Demo application behaviour

The included `src/` app deliberately avoids putting credentials in the URL. The Playwright regression test checks that behaviour. This implementation is only a local example and is not intended for production authentication.

## Screenshot-reported lint problems — scope limitation

The screenshots report 12 lint findings (3 errors and 9 warnings) in files such as `claim-detail-modal.tsx`, `realtime-claim-updates.ts`, and `bff-client.ts`. Those files are not part of this demo repository, so the original findings cannot be reproduced here. If they belong to a separate repository, fix and verify them in that repository rather than assuming this demo fixes them.
