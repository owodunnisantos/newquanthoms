# scripts/verify-stagehand-ecosystem.ps1
# QWK-069-G verification (Rule 31 / Rule 57 pattern).
# Checks:
#   1. stagehand-ecosystem.js loads; exports router + VERIFY_SAFE.
#   2. Gate: BANQ_STAGEHAND default off -> 503.
#   3. server.js mounts /api/stagehand.
#   4. All six verification surfaces present (G1-G6).
#   5. G1/G2/G3 hard guarantees: no signing, no money, no act().
#   6. Evidence discipline: source + timestamp + engine (G5/C1d).
#   7. Observe/extract vocabulary only.

$root = $PSScriptRoot | Split-Path
$pass = 0; $fail = 0
function Check($name, $cond) {
  if ($cond) { Write-Host "PASS: $name"; $script:pass++ }
  else { Write-Host "FAIL: $name"; $script:fail++ }
}

# 1. Module loads
$nodeOut = node -e "const m = require('$($root.Replace('\','/'))/backend/stagehand-ecosystem.js'); console.log((typeof m === 'function' || m.use) && m.VERIFY_SAFE ? 'ok' : 'bad')" 2>&1
Check "ecosystem module loads (router + VERIFY_SAFE)" ("$nodeOut" -match 'ok')

$lib = Get-Content "$root\backend\stagehand-ecosystem.js" -Raw
$server = Get-Content "$root\server.js" -Raw

# 2. Gate
Check "BANQ_STAGEHAND env gate (default off -> 503)" ($lib -match 'BANQ_STAGEHAND' -and $lib -match 'stagehand_unavailable')

# 3. Mount
Check "server mounts /api/stagehand" ($server -match "app\.use\('/api/stagehand', require\('\./backend/stagehand-ecosystem'\)")

# 4. Six surfaces
Check "G1 bridge route verification" ($lib -match '/verify-bridge-route')
Check "G2 wallet evidence verification" ($lib -match '/verify-wallet-evidence')
Check "G3 banq verification" ($lib -match '/verify-banq')
Check "G4 games QA" ($lib -match '/verify-games-qa')
Check "G5 lumina pages" ($lib -match '/verify-lumina-pages')
Check "G6 new-repo surface verification" ($lib -match '/verify-surface')

# 5. Hard guarantees (code lines only)
$code = ($lib -split "`n" | Where-Object { $_ -notmatch '^\s*(/\*|\*|//)' }) -join "`n"
Check "no signing code path (G2)" ($code -notmatch '\bsign\(|signTransaction|\bseed\b|private.?key')
Check "no money-movement code path (G3)" ($code -notmatch 'transfer|/send|payment|charge|ledger\.write')
Check "observe/extract only -- no act() calls to the engine (C1c)" ($code -notmatch "engineCall\('/act")

# 6. Evidence discipline
Check "evidence carries source + timestamp + engine (G5/C1d)" ($lib -match 'verified_at' -and $lib -match 'prompt_version: ENGINE_PROMPT_VERSION')

Write-Host ""
Write-Host "RESULT: $pass PASS / $fail FAIL"
if ($fail -gt 0) { exit 1 } else { exit 0 }
