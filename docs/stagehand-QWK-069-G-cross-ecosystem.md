# STAGEHAND-QWK-069-G - Cross-Ecosystem Extension
**Ticket:** QWK-069-G
**Owner:** Each wing (own sub-ticket per wing when that wing is ready)
**Repo status:** No standalone repos exist for bridge, wallet, banq, Games,
Lumina, Domain, Conference, Internet. quanthom-bridge exists as a FOLDER
inside qwkbrowser, not a repo. All content lives in qwkbrowser/docs/ for
now; relocate to each wing's own repo docs folder when the repo is created.
**Status:** BUILT (2026-09-23, RTSG session). Reference implementation shipped in BANQ: backend/stagehand-ecosystem.js at /api/stagehand (BANQ_STAGEHAND=1 gate). All six verifications live: G1 bridge-route, G2 wallet-evidence (never signs), G3 banq merchant/dispute/KYC (never moves money), G4 games QA + RNG audit surface, G5 Lumina page checks, G6 new-repo surface verification. Observe/extract only. Other wings mount the same library when their repos exist. Verify: scripts/verify-stagehand-ecosystem.ps1 -> 13 PASS / 0 FAIL. Founder actions: see stagehand-founder-action.md.
**Build order position:** 7 of 7 (per wing, when the wing is ready)
**Constraints parent:** docs/stagehand-QWK-069-UNIVERSAL-CONSTRAINTS.md

---
## UNIVERSAL CONSTRAINTS (C1-C12)
Copy from docs/stagehand-QWK-069-UNIVERSAL-CONSTRAINTS.md into every
per-wing sub-ticket header at build time. No sub-ticket ships without them.

---
## SUB-TICKET SPECIFIC CONSTRAINTS

```
QWK-069-G - CROSS-ECOSYSTEM - CONSTRAINTS
G1. Stagehand never signs a transaction (wallet).
G2. Stagehand never moves money (banq).
G3. Stagehand verifies public evidence only.
G4. Stagehand never automates user-facing interaction on
    bot-detecting platforms (C2 applies everywhere).
G5. Every verification is logged, timestamped, and source-linked.
```

---
## IMPLEMENTATION PLAN (per wing)

### Phase 7.1 - Bridge route verification
**Steps:** verify a route works end to end in a real browser; confirm the
destination state.
**Exit:** bridge routes are verified in a real browser.

### Phase 7.2 - Wallet evidence verification
**Steps:** verify that a recipient's public page exists and matches the
wallet record; verify a token listing matches metadata; verify phishing
evidence is reachable.
**Exit:** wallet evidence checks run without signing anything.

### Phase 7.3 - banq merchant and dispute verification
**Steps:** verify merchant public presence; verify dispute evidence;
verify KYC document source URLs.
**Exit:** banq verifications run without moving money.

### Phase 7.4 - Games QA
**Steps:** automated QA of game journeys each release; automated RNG audit.
**Exit:** release QA runs in a real browser.

### Phase 7.5 - Lumina internal checks
**Steps:** automated health, brand consistency, and compliance checks
across all public product pages.
**Exit:** a nightly internal check runs across all product pages.

### Phase 7.6 - New repos (Domain, Conference, Internet)
**Steps:** verify public pages, extract structured data, confirm calendar
feeds, confirm availability.
**Exit:** each new repo has at least one verification use.

### Phase 7.7 - Verify script
scripts/verify-v{next}-stagehand-ecosystem.ps1 (Rule 57 / Rule 31).

### Phase 7.8 - Documentation
STAGEHAND-ECOSYSTEM-APPLICATIONS.md.

---
## PRE-BUILD QUESTIONS (per wing, from stagehand-needs doc, section G)

### G1 - Bridge
- Which routes can be Stagehand-verified.
- Verification trigger: every route change or scheduled.
- Can verification read the destination's state.

### G2 - Wallet
- Which evidence fields Stagehand can verify.
- Confirm Stagehand never signs a transaction.
- Evidence sharing: wallet user or counterparty.

### G3 - banq
- Which merchant and dispute fields Stagehand can verify.
- Confirm Stagehand never moves money.
- Verification visibility: user or admin-only.

### G4 - Games
- Which journeys QA covers.
- RNG audit: Stagehand or separate harness.
- Cadence: per release, nightly.

### G5 - Lumina
- Which public pages Stagehand checks.
- Concrete definition of "brand consistency."
- Concrete definition of "compliance."
- Cadence.

### G6 - Domain, Conference, Internet (new repos)
- Which pages Stagehand verifies (list per repo).
- Whether extraction is user-visible.
- Cadence.

**Status:** Plan complete. Blocked on wing repos being created and
founder answers. Build G only when each wing is ready.
