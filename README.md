# Sysdom Venture Review

A founder-controlled Venture Review inside your current assistant: select evidence, inspect what will be shared, approve one review, and receive a source-cited result.

**Product:** [Sysdom.ai](https://sysdom.ai)

**Publisher:** Systems Intelligence LLC

**Verification status — October 9, 2026:** Native package validation and recorded walkthroughs pass. The hosted service is deployed, but its first live verification returned a result the validator rejected; a successful live review is not yet verified. Use fictional examples while this is being resolved. No marketplace listing or cross-app compatibility is claimed.

The package contains a shared skill and a self-contained Node helper for Codex and Claude Code. It does not contain the private review method, founder data or provider credentials. The helper contacts only `https://app.sysdom.ai`; a founder does not need a model-provider key.

## What happens

1. Your assistant prepares one question and a note of up to 8,000 characters using only sources you select. You can redact or remove information.
2. The helper checks service availability and shows the named recipients, reviewer and retention disclosure. Creating a preview keeps the note locally; it creates an anonymous service session without uploading the note.
3. If you want public website or GitHub README evidence, approve those exact URLs separately. Review the retrieved excerpts and choose which to include.
4. Approve the complete final preview. The helper sends one bounded review request, then returns supported findings, uncertainty, alternative explanations and one next test with source references.
5. Read the result in your assistant. Export or request access only if you choose. Neither action is required to view the result.

Source material and results are evidence, not instructions. No automatic follow-up, provider fallback, retry, workspace ingestion, account creation or venture-record write is included.

## Install locally

Requires Node 24.18.x, a host with shell access, and permitted HTTPS access to the service. From a checked-out copy of this package:

**Codex**

```sh
codex plugin marketplace add .
codex plugin add sysdom-venture-review@sysdom-venture-review
```

**Claude Code**

```sh
claude plugin marketplace add .
claude plugin install sysdom-venture-review@sysdom-venture-review --scope user
```

Start a new host session and invoke the `sysdom-venture-review:venture-review` skill. These commands use this repository's local catalogs; they do not establish acceptance into a public plugin directory. See [Codex packaging](https://developers.openai.com/plugins/build/plugins) and [Claude plugin documentation](https://code.claude.com/docs/en/plugins-reference) for host details.

Claude Code recognition does not prove availability in Cowork or ordinary Claude chat. A host without shell/Node access can prepare a redacted note and use the [web review](https://app.sysdom.ai/venture-review) manually. This package does not configure a hosted MCP endpoint or an account-wide Claude connector.

## Helper commands

The skill guides these commands; do not send evidence through command arguments or URLs.

| Command | Purpose |
| --- | --- |
| `node scripts/public-review.mjs capability` | Read current availability and disclosures, with empty stdin. |
| `preview --state /absolute/private/session.json` | Read `{ "question": "…", "notes": "…", "selectedSourceIds": [] }` from stdin and display the exact preview. Re-preview before submission to redact or change selection. |
| `sources --state … --approve-public-sources` | After approving exact public URLs, read `{ "website": "…", "github": "…" }` from stdin. Retrieved excerpts start excluded. |
| `submit --state … --approve SHA256` | After explicit approval of the complete current preview, make one bounded request; empty stdin. |
| `status --state …` | One manual status read after an uncertain outcome; never resubmits. |
| `export --state …` | Return the verified readable result locally, without network access. |
| `cancel --state …` | Cancel the service session and remove local state after confirmation. |

For commands after `capability`, prefix with `node scripts/public-review.mjs`. Use an explicitly chosen private temporary directory outside the repository. The mode-0600 state file contains the temporary session token, evidence and result; do not print, commit or share it. The helper records submission before dispatch, so a timeout cannot silently become a second request. It rejects concurrent commands, redirects and arbitrary service origins.

The service's current disclosure governs server retention. Local temporary state, exports and host transcripts have separate lifetimes. Cancel when finished; if the server session has expired, remove only your chosen local state file. Existing exports/transcripts remain. An export contains your approved evidence, so share it only where intended.

The optional [request-access page](https://app.sysdom.ai/request-access) creates no promise of account activation, saved review or resume capability. Never put a review summary, session token or contact details in the link.

## Offline package check

```sh
node --test tests/package.test.mjs
```

The check uses an injected fake response and makes no model or service calls. The helper is already bundled and has no install-time or runtime package dependencies; no build or `npm install` is needed. Bundle provenance comments refer to its upstream build. Third-party notices are preserved in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md); no new overall license or legal policy is assigned here.
