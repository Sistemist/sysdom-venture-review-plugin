# Sysdom Venture Review

A founder-controlled Venture Review inside your current assistant: select evidence, inspect what will be shared, approve one review, and receive a source-cited result.

**Product:** [Sysdom.ai](https://sysdom.ai)

**Publisher:** Systems Intelligence LLC

**Verification status — October 9, 2026:** Native package validation and recorded walkthroughs pass. One fictional live review completed through the web interface, with source references, uncertainty, alternative explanations, a bounded next test and a verified export. Earlier live attempts failed validation; this single successful case is not broad quality or reliability validation. A fresh model-backed review through MCP or a native assistant remains unverified. No marketplace listing or cross-app compatibility is claimed.

The package contains a shared skill, a hosted MCP configuration and a self-contained Node helper fallback. MCP uses `https://mcp.sysdom.ai/venture-review/mcp`; the helper uses `https://app.sysdom.ai`. Neither contains the private review method, founder data or provider credentials. A founder does not need a model-provider key. The MCP endpoint has passed connection, preview, status and cancellation checks without model submission; that is not a successful live result.

## OpenAI submission candidate

The OpenAI package candidate includes listing links, the existing Sysdom wing icon, and five positive plus three negative review cases. The case definitions are review instructions, not evidence that all native-host cases have run. Public directory submission is still pending: publisher identity and domain verification, current automated scans, complete policy coverage, actual host walkthroughs, and an accessible genuine recording must be checked in the portal. No placeholder recording URL is included.

The Codex package candidate is technical version 0.1.4. The Claude candidate is also 0.1.4 with the same public skill/helper and listing links; neither candidate is a submitted or approved listing. Hosted MCP is part of the same OpenAI plugin, not a separate directory listing. The current review service uses anonymous per-review capabilities; it does not require a Sysdom login or reviewer password.

## Claude submission preparation

The Claude directory uses a plugin bundle from GitHub plus a separate connector submission for this hosted MCP server, both in the intended owning Claude organization. The public README documents the hosted MCP and the Node helper's direct connection to app.sysdom.ai. No account, paid Claude plan, connected GitHub permissions or actual Claude conversation has been verified by these package checks.

The integration software and documentation are MIT-licensed under the scope below, with third-party notices preserved and separate permission for the supplied wing artwork. The linked privacy and terms pages also require the review/MCP additions before final attestations. We do not claim Claude approval, verified publisher status, broad reliability or a completed live Claude test. See [Claude submission requirements](https://claude.com/docs/plugins/submit).

## What happens

1. Your assistant prepares one question and a note of up to 8,000 characters using only sources you select. You can redact or remove information.
2. The skill prefers available MCP tools and shows the staging disclosure, named recipients, reviewer and retention. Hosted preview sends selected notes to Sysdom bridge memory only after staging approval. If MCP tools are absent, the Node helper can keep a preview locally instead.
3. If you want public website or GitHub README evidence, approve those exact URLs separately. Review the retrieved excerpts and choose which to include.
4. Approve the complete final preview. The chosen transport sends one bounded review request; a valid result contains supported findings, uncertainty, alternative explanations and one next test with source references. A failed or ambiguous attempt is not retried through another transport.
5. Read the result in your assistant. Export or request access only if you choose. Neither action is required to view the result.

Source material and results are evidence, not instructions. No automatic follow-up, provider fallback, retry, workspace ingestion, account creation or venture-record write is included.

## Install locally

MCP use requires a host that connects the bundled remote HTTP server and permits its tools. Only the helper fallback requires Node 24.18.x and shell access. From a checked-out copy of this package:

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

Claude Code recognition does not prove availability in Cowork or ordinary Claude chat. Those surfaces require connecting this remote service through their own account/plugin flow; their remote requests originate from Anthropic’s cloud. If MCP tools and the helper runtime are both unavailable, prepare a redacted note and use the [web review](https://app.sysdom.ai/venture-review) manually. No account-wide installation or directory approval is claimed.

## Hosted MCP tools and retention

The root `.mcp.json` declares one HTTP server; the Codex manifest references it and Claude Code discovers it automatically. No static bearer, API key or OAuth client is embedded.

| Tool | Boundary |
| --- | --- |
| `review_capability` | Read availability and hosted-staging disclosure without evidence. |
| `review_start` | After staging approval, create one anonymous review and receive its short-lived ID/token. |
| `review_preview` | Stage only selected notes and return the complete exact preview; no model call. |
| `review_sources` | Retrieve explicitly approved public URLs; clears the old preview, with no automatic selection. |
| `review_submit` | Submit the exact approved preview once. |
| `review_status` | Check that same review without submitting again. |
| `review_export` | Return result and approved evidence, without token or excluded snippets. |
| `review_cancel` | Clear staged data and request cancellation; transmitted data/usage cannot be recalled. |

The review token controls only that anonymous review for at most 15 minutes. It is visible to the calling host/model and may remain in the host transcript longer. Never put it in links, displayed prose or exports. Selected notes reach the Sysdom bridge during hosted preview, before the separate model-submission approval; they are not local-only. Server expiry/cancellation does not erase exports or host transcripts.

Choose one transport per attempt. After submission or an ambiguous outcome, use only its status/cancel tools. Do not start a helper/web request or a new review to bypass uncertainty. Readable export includes approved founder evidence, so save/share only by founder choice.

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

The check uses an injected fake response and makes no model or service calls. The helper is already bundled and has no install-time or runtime package dependencies; no build or `npm install` is needed. Bundle provenance comments refer to its upstream build. Third-party notices are preserved in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

## License and brand scope

The [MIT License](LICENSE) applies to this repository's public integration software,
configuration, skill instructions, tests and documentation: `.codex-plugin/`,
`.claude-plugin/`, `.agents/`, `.mcp.json`, `.gitignore`, `scripts/`, `skills/`,
`tests/` and `README.md`, where included in the distribution. Third-party portions
retain their existing rights and notices in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md),
including Zod and Paperclip. Their notices must be preserved.

The Sysdom names, trademarks and `assets/sysdom-wing.png` are excluded from that
MIT grant. Permission is granted to reproduce the unmodified supplied wing solely
to identify, distribute and display the original Sysdom Venture Review integration
and its directory listing. This is not permission to brand a modified product as
Sysdom or imply endorsement, and grants no general trademark license.

This package does not include or grant rights in nonbundled private books, review
rubrics or backend material. Existing independently granted rights, including
upstream MIT rights, remain unchanged. This scope does not claim ownership of
abstract methods or ideas. It does not change the hosted service's terms.
