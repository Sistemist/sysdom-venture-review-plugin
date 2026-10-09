import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { test } from "node:test";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { runPublicCommand } from "../scripts/public-review.mjs";
const root = fileURLToPath(new URL("../", import.meta.url));
test("package has only reviewed public files and matching native/catalog identities", async () => {
  const files = (await readdir(root, { recursive: true, withFileTypes: true }))
    .filter(f => !f.isDirectory() && !f.parentPath.split(path.sep).includes(".git"))
    .map(f => { assert(f.isFile(), "No external symlinks"); return path.relative(root, path.join(f.parentPath, f.name)).split(path.sep).join("/"); }).sort();
  assert.deepEqual(files, [".agents/plugins/marketplace.json", ".claude-plugin/marketplace.json", ".claude-plugin/plugin.json", ".codex-plugin/plugin.json", ".gitignore", ".mcp.json", "README.md", "THIRD_PARTY_NOTICES.md", "assets/sysdom-wing.png", "scripts/public-review.mjs", "skills/venture-review/SKILL.md", "tests/package.test.mjs"]);
  const codex = JSON.parse(await readFile(path.join(root, ".codex-plugin/plugin.json"))), claude = JSON.parse(await readFile(path.join(root, ".claude-plugin/plugin.json")));
  assert.equal(codex.name, "sysdom-venture-review"); assert.equal(claude.name, codex.name);
  assert.equal(claude.version, "0.1.3"); // The Claude package is unchanged during OpenAI submission work.
  assert.equal(codex.version, "0.1.4"); assert.equal(codex.mcpServers, "./.mcp.json");
  assert.deepEqual(JSON.parse(await readFile(path.join(root, ".mcp.json"))), {
    mcpServers: { sysdom_venture_review: { type: "http", url: "https://mcp.sysdom.ai/venture-review/mcp" } },
  });
  assert.equal(codex.author.name, "Systems Intelligence LLC"); assert.equal(claude.author.name, codex.author.name);
  for (const file of [".agents/plugins/marketplace.json", ".claude-plugin/marketplace.json"]) {
    const catalog = JSON.parse(await readFile(path.join(root, file))); assert.equal(catalog.name, "sysdom-venture-review"); assert.equal(catalog.plugins.length, 1); assert.equal(catalog.plugins[0].name, codex.name);
  }
  const skill = await readFile(path.join(root, "skills/venture-review/SKILL.md"), "utf8");
  assert.match(skill, /^---\nname: venture-review\n/); assert(skill.includes("../../scripts/public-review.mjs"));
});
test("OpenAI submission metadata meets listing limits and carries exactly five positive and three negative cases", async () => {
  const manifest = JSON.parse(await readFile(path.join(root, ".codex-plugin/plugin.json")));
  const listing = manifest.interface, review = manifest.extensions["com.openai"].review;
  for (const [field, limit] of [["displayName", 30], ["shortDescription", 30], ["developerName", 80], ["longDescription", 4000]]) {
    assert(listing[field].trim().length > 0 && listing[field].length <= limit, field);
  }
  for (const field of ["websiteURL", "supportURL", "privacyPolicyURL", "termsOfServiceURL"]) {
    const url = new URL(listing[field]); assert.equal(url.protocol, "https:"); assert.equal(url.hostname, "sysdom.ai");
    assert(!url.username && !url.password && listing[field].length <= 1024);
  }
  assert(listing.defaultPrompt.length <= 3); assert.equal(new Set(listing.defaultPrompt).size, listing.defaultPrompt.length);
  for (const prompt of listing.defaultPrompt) assert(prompt.length <= 128 && !/[\r\n@]/.test(prompt));
  assert.equal(review.test_cases.positive.length, 5); assert.equal(review.test_cases.negative.length, 3);
  for (const item of [...review.test_cases.positive, ...review.test_cases.negative]) {
    for (const field of ["description", "prompt", "tools_triggered", "expected_behavior"]) assert(item[field]?.trim(), field);
    assert(item.description.length <= 4000);
  }
  assert(!("test_credentials" in review) && !("reviewer_instructions" in review));
  assert.equal(listing.logo, "./assets/sysdom-wing.png"); assert.equal(listing.composerIcon, listing.logo);
  const png = await readFile(path.join(root, listing.logo));
  assert.equal(png.subarray(0, 8).toString("hex"), "89504e470d0a1a0a");
  const width = png.readUInt32BE(16), height = png.readUInt32BE(20);
  assert(width === height && width >= 48 && width <= 4096 && png.length <= 5 * 1024 * 1024);
});
test("bundled helper pins the public service without credentials or real network IO", async () => {
  let calls = 0;
  const capability = { state: "disabled", mode: "disabled", consentVersion: "offline-check", methodVersion: "offline-check", model: "openai/gpt-6.1-sol", reasoningEffort: "high", recipients: [], retention: "Offline package check only.", maxNoteChars: 8000, sessionMinutes: 15 };
  const result = await runPublicCommand(["capability"], "", async (url, options) => {
    calls++; assert.equal(url, "https://app.sysdom.ai/api/public/venture-review/capability"); assert.equal(options.redirect, "error"); assert.equal(options.credentials, "omit"); assert.equal(options.headers.Authorization, undefined); return Response.json(capability);
  });
  assert.equal(calls, 1); assert.deepEqual(result.capability, capability);
  await assert.rejects(runPublicCommand(["capability", "--origin", "https://example.com"], "", async () => { throw new Error("Unexpected network request"); }));
  const rejected = spawnSync(process.execPath, [path.join(root, "scripts/public-review.mjs"), "preview", "--origin", "https://example.com"], { input: "private input must not be echoed", encoding: "utf8", env: { PATH: path.dirname(process.execPath) }, timeout: 5000 });
  assert.equal(rejected.status, 1); assert.equal(rejected.stdout, ""); assert(!rejected.stderr.includes("private input must not be echoed"));
});
