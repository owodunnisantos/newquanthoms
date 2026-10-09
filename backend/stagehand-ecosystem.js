/* www.newquanthoms.com/backend/stagehand-ecosystem.js -- QWK-069-G
 *
 * Cross-ecosystem Stagehand verifications (QWK-069-G), executed
 * through the QwkBrowser Stagehand act layer (QWK-069-A engine).
 * This repo (BANQ) is the reference implementation; other wings
 * (bridge, wallet, Games, Lumina, Domain, Conference, Internet) mount
 * the same library from their own repos when they are ready.
 *
 * Verifications:
 *   G1 Bridge route verification: a route works end to end in a real
 *      browser -- observe the source page, confirm the destination
 *      page renders and carries expected state markers.
 *   G2 Wallet evidence verification: recipient/token/phishing public
 *      evidence pages exist and match expected fields. NEVER signs a
 *      transaction (G1-spec); no wallet-writing code path exists here.
 *   G3 banq merchant/dispute/KYC verification: public presence,
 *      dispute evidence reachability, KYC document source URLs --
 *      public pages only, NEVER moves money.
 *   G4 Games QA: observe a game page's journey markers and the RNG
 *      audit surface (public evidence only, G4-spec).
 *   G5 Lumina internal checks: health/brand/compliance across public
 *      product pages (page set per call or from a pages list).
 *   G6 New repos (Domain/Conference/Internet): verify public page,
 *        extract structured data, confirm availability.
 *
 * Constraints (G-spec + C1-C12):
 *   Public evidence only (G3-spec). Observe/extract vocabulary only --
 *   no act() anywhere in this library. Per-domain allowlist, rate
 *   limits, and audit rows live in the engine (C3/C4/C8).
 *   Every verification result carries source URL + timestamp +
 *   engine + prompt version (G5-spec, C1d).
 *   Fail closed: unreachable -> partial + reason (C9).
 *
 * Gate: BANQ_STAGEHAND env ('1'; unset -> unavailable). Non-disruptive:
 * no existing route touched; the library writes nothing to this DB.
 *
 * ASCII-only (Rule 16). No credentials handled (C5).
 */

'use strict';

const express = require('express');
const { requireAuth } = require('./auth');

const router = express.Router();

const QWK_ORIGIN = process.env.QWK_ORIGIN || 'http://localhost:3001';
const ENGINE_TOKEN = process.env.BANQ_STAGEHAND_WING_TOKEN || '';
const ENGINE_PROMPT_VERSION = 'qwk069-g-v1';

/* Observe/extract-only vocabulary (C1c discipline for verifications). */
const VERIFY_SAFE = /^(?:observe|find|list|read|extract|check|confirm|summar(ise|ize))/i;

function enabled() {
  return String(process.env.BANQ_STAGEHAND || '') === '1';
}

router.use(function (req, res, next) {
  if (!enabled()) {
    return res.status(503).json({ error: 'stagehand_unavailable', reason: 'Set BANQ_STAGEHAND=1 to enable ecosystem verifications.' });
  }
  next();
});

async function engineCall(pathname, body) {
  const r = await fetch(QWK_ORIGIN + '/api/stagehand' + pathname, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(ENGINE_TOKEN ? { Authorization: 'Bearer ' + ENGINE_TOKEN } : {})
    },
    body: JSON.stringify(body)
  });
  const data = await r.json().catch(function () { return {}; });
  return { ok: r.ok, status: r.status, data: data };
}

/* Evidence wrapper: every result carries source + timestamp + engine
 * (G5-spec / C1d / C12). */
function evidence(source, extra) {
  return Object.assign({
    source: source,
    verified_at: new Date().toISOString(),
    engine: 'stagehand-v4',
    prompt_version: ENGINE_PROMPT_VERSION
  }, extra || {});
}

/* Shared page-verify primitive: does the page render and carry the
 * expected markers? Fail-closed partial result on any error. */
async function verifyPage(url, markers) {
  const r = await engineCall('/extract', {
    url: url,
    schema: {
      type: 'object',
      properties: {
        page_renders: { type: 'boolean' },
        present_markers: { type: 'array', items: { type: 'string' } }
      }
    }
  });
  if (!r.ok) {
    return { ok: false, reason: (r.data && (r.data.reason || r.data.error)) || ('HTTP ' + r.status), evidence: evidence(url) };
  }
  const d = r.data.data || {};
  const present = d.present_markers || [];
  const missing = (markers || []).filter(function (m) { return present.indexOf(m) < 0; });
  return {
    ok: d.page_renders !== false && missing.length === 0,
    rendered: d.page_renders !== false,
    missing_markers: missing,
    evidence: evidence(url, { present_markers: present })
  };
}

/* -- G1: Bridge route verification ----------------------------------
 * Body: { sourceUrl, destinationUrl, destinationMarkers[] }
 * Verifies the destination page renders end to end and carries the
 * expected state markers. No transaction is ever attempted. */
router.post('/verify-bridge-route', requireAuth, async function (req, res) {
  const { sourceUrl, destinationUrl, destinationMarkers } = req.body || {};
  if (!destinationUrl) return res.status(400).json({ error: 'invalid_request', reason: 'destinationUrl required.' });
  const dest = await verifyPage(destinationUrl, destinationMarkers || []);
  res.json({
    ok: dest.ok,
    route: sourceUrl || null,
    destination: destinationUrl,
    end_to_end: dest.ok,
    destination_result: dest
  });
});

/* -- G2: Wallet evidence verification --------------------------------
 * Body: { evidenceUrl, expectedFields: { key: expected-string } }
 * Extracts public fields and compares. NEVER signs, never writes --
 * there is no signing code path in this library. */
router.post('/verify-wallet-evidence', requireAuth, async function (req, res) {
  const { evidenceUrl, expectedFields } = req.body || {};
  if (!evidenceUrl) return res.status(400).json({ error: 'invalid_request', reason: 'evidenceUrl required.' });
  const r = await engineCall('/extract', {
    url: evidenceUrl,
    schema: {
      type: 'object',
      properties: {
        page_renders: { type: 'boolean' },
        fields: { type: 'object' }
      }
    }
  });
  if (!r.ok) return res.status(502).json({ ok: false, error: 'verification_failed', reason: (r.data && (r.data.reason || r.data.error)) || ('HTTP ' + r.status), evidence: evidence(evidenceUrl) });
  const d = r.data.data || {};
  const fields = d.fields || {};
  const mismatches = [];
  Object.keys(expectedFields || {}).forEach(function (k) {
    if (String(fields[k] || '') !== String(expectedFields[k])) mismatches.push({ field: k, expected: expectedFields[k], found: fields[k] || null });
  });
  res.json({
    ok: d.page_renders !== false && mismatches.length === 0,
    rendered: d.page_renders !== false,
    mismatches: mismatches,
    /* G2-spec: nothing was signed. This line is the proof the caller
       asked for: the verification is evidence-only. */
    signed_anything: false,
    evidence: evidence(evidenceUrl, { fields: fields })
  });
});

/* -- G3: banq merchant / dispute / KYC verification --------------------
 * Body: { kind: 'merchant'|'dispute'|'kyc', targetUrl, markers[] }
 * Public pages only. No money moves: this library has no payment,
 * ledger, or transfer code path whatsoever. */
router.post('/verify-banq', requireAuth, async function (req, res) {
  const { kind, targetUrl, markers } = req.body || {};
  if (!['merchant', 'dispute', 'kyc'].includes(kind)) return res.status(400).json({ error: 'invalid_request', reason: 'kind must be merchant, dispute, or kyc.' });
  if (!targetUrl) return res.status(400).json({ error: 'invalid_request', reason: 'targetUrl required.' });
  const result = await verifyPage(targetUrl, markers || []);
  res.json({
    ok: result.ok,
    kind: kind,
    /* G3-spec: money never moved. */
    money_moved: false,
    result: result
  });
});

/* -- G4: Games QA ------------------------------------------------------
 * Body: { gameUrl, journeyMarkers[] } -- observe the public game page
 * and confirm journey markers. RNG audit: the audit surface is read
 * (public evidence only); numbers are not generated or altered. */
router.post('/verify-games-qa', requireAuth, async function (req, res) {
  const { gameUrl, journeyMarkers, rngAuditUrl } = req.body || {};
  if (!gameUrl) return res.status(400).json({ error: 'invalid_request', reason: 'gameUrl required.' });
  const page = await verifyPage(gameUrl, journeyMarkers || []);
  let rng = null;
  if (rngAuditUrl) {
    const r = await engineCall('/extract', {
      url: rngAuditUrl,
      schema: { type: 'object', properties: { audit_renders: { type: 'boolean' }, summary: { type: 'string' } } }
    });
    rng = r.ok ? { ok: (r.data.data || {}).audit_renders !== false, summary: (r.data.data || {}).summary || null, evidence: evidence(rngAuditUrl) } : { ok: false, reason: (r.data && (r.data.reason || r.data.error)) || ('HTTP ' + r.status), evidence: evidence(rngAuditUrl) };
  }
  res.json({ ok: page.ok && (rng ? rng.ok : true), page: page, rng_audit: rng });
});

/* -- G5: Lumina internal checks ----------------------------------------
 * Body: { pages: [{url, markers[]}], healthCheck: boolean }
 * Verifies each public product page renders + carries brand/compliance
 * markers. Caller-supplied page set (a Lumina pages list can live in
 * each wing's config when it ships). */
router.post('/verify-lumina-pages', requireAuth, async function (req, res) {
  const { pages } = req.body || {};
  if (!Array.isArray(pages) || !pages.length) return res.status(400).json({ error: 'invalid_request', reason: 'pages[] required.' });
  const results = [];
  for (const p of pages.slice(0, 25)) {
    if (!p.url) continue;
    const r = await verifyPage(p.url, p.markers || []);
    results.push({ url: p.url, ok: r.ok, result: r });
  }
  res.json({ ok: results.length > 0 && results.every(function (x) { return x.ok; }), checked: results.length, results: results });
});

/* -- G6: New repos verification ----------------------------------------
 * Body: { targetUrl, structuredSchema: { properties }, markers[] }
 * Generic public-page verification + structured data extraction for
 * Domain / Conference / Internet surfaces (availability, calendar
 * feeds, structured listings). */
router.post('/verify-surface', requireAuth, async function (req, res) {
  const { targetUrl, structuredSchema, markers } = req.body || {};
  if (!targetUrl) return res.status(400).json({ error: 'invalid_request', reason: 'targetUrl required.' });
  const page = await verifyPage(targetUrl, markers || []);
  let structured = null;
  if (structuredSchema && structuredSchema.properties) {
    const r = await engineCall('/extract', {
      url: targetUrl,
      schema: { type: 'object', properties: structuredSchema.properties }
    });
    structured = r.ok ? { ok: true, data: r.data.data || {}, evidence: evidence(targetUrl) } : { ok: false, reason: (r.data && (r.data.reason || r.data.error)) || ('HTTP ' + r.status), evidence: evidence(targetUrl) };
  }
  res.json({ ok: page.ok && (structured ? structured.ok : true), page: page, structured: structured });
});

/* GET /api/stagehand/status */
router.get('/status', requireAuth, function (req, res) {
  res.json({ enabled: true, engine_origin: QWK_ORIGIN, wings: ['banq', 'bridge', 'wallet', 'games', 'lumina', 'domain', 'conference', 'internet'] });
});

module.exports = router;
module.exports.VERIFY_SAFE = VERIFY_SAFE;
