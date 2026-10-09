# STAGEHAND-FOUNDER-ACTION - www.newquanthoms.com / BANQ (QWK-069-G)
**What the founder must do from his own side. No agent action can
substitute for these.**

---
## TO GO LIVE (all required)

| # | Action | How |
|---|--------|-----|
| 1 | Complete qwkbrowser go-live first | See qwkbrowser/docs/stagehand-founder-action.md (npm install, flag, admin-approve the domains each verification targets) |
| 2 | Enable BANQ verifications | Add `BANQ_STAGEHAND=1` to .env, restart the BANQ server |
| 3 | Engine wing token | Set `BANQ_STAGEHAND_WING_TOKEN` in .env to a QwkBrowser account token the verifications run under (dedicated scan account recommended) |

## AFTER GO-LIVE (spot checks, 10 minutes)

- `GET /api/stagehand/status` (signed in) -> enabled + wing list.
- G2 wallet check on a public evidence page with correct expected
  fields -> `ok: true, signed_anything: false`.
- G2 with a mismatched field -> `mismatches[]` populated (the check
  FOUND the mismatch -- this is the point of the tool).
- G3 banq merchant check on a domain NOT in the allowlist -> engine
  refuses; result carries the refusal reason (fail closed, partial).
- G5 with a small pages list -> per-page verdicts with timestamps.

## FOUNDER-ONLY DECISIONS STILL OPEN (G-list)

- G1: bridge verification trigger -- on every route change, or
  scheduled (e.g. nightly)? The endpoint is on-demand today.
- G2: evidence sharing -- wallet user or counterparty decides which
  evidence URLs are checkable.
- G4: Games QA trigger -- each release (manual call) or scheduled.
- G5: the Lumina public pages list -- which product pages are in the
  nightly check (list lives with the caller today; say where to
  anchor it permanently).
- G5: nightly cadence -- a timer is NOT scheduled anywhere; the
  endpoint works on demand. Say when to add the timer and where it
  should run from.
- G6: Domain/Conference/Internet have no standalone repos yet. This
  repo's library is the reference implementation; when those repos
  exist, mount the same file there (it is self-contained).

## WHAT BANQ'S IMPLEMENTATION PROVES

Every verification is public-evidence observe/extract only:
- No signing code path exists in the library (G2-spec, verified).
- No money-movement code path exists (G3-spec, verified).
- No act() call to the engine anywhere (C1c).
- Every result carries source URL + timestamp + engine (G5-spec).
- Gate: BANQ_STAGEHAND=1, default off -> 503, fail closed.
