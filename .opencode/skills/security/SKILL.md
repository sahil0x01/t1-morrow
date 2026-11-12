---
name: security
description: Use for threat modeling, security review, auth, tenancy, secrets, CSRF, SSRF, path traversal, approval binding, sandbox isolation, dependency and supply-chain checks, and any feature that touches external input, credentials, or side effects.
---

# Security

Security is a first-class requirement. It is not a later hardening pass.

## Non-negotiables

1. Every external input is untrusted: HTTP, web pages, email, files, tool output, model output, and MCP responses.
2. Every query and mutation is workspace-scoped. Never trust a workspace ID, user ID, file path, or URL from the client or the model.
3. Validate at every boundary with Zod. Generate model tool schemas from the same definitions.
4. Secrets never enter prompts, logs, traces, error messages, fixtures, or the sandbox.
5. Use AES-256-GCM envelope encryption for provider keys, OAuth tokens, and connector credentials. Bind ciphertext to workspace and record IDs with AAD.
6. Use `HttpOnly`, `Secure`, `SameSite=Lax` session cookies, CSRF or origin checks, session rotation, and Argon2id if we ever store passwords.
7. Approval grants bind to the exact canonical action and argument hash. A changed action requires a new approval.
8. Block SSRF: validate DNS and IPs, revalidate every redirect, and deny private, loopback, link-local, and metadata addresses.
9. Confine file paths and resolve symlinks before access.
10. Shell commands run only in the sandbox, with timeouts, output caps, and resource limits.
11. Sandboxes get no host mounts, no Docker socket, no database network, and no credentials.
12. Rate limit login, token exchange, and expensive endpoints.
13. Pin dependencies and images. Keep the lockfile committed. Run dependency and secret scans in CI.
14. Error responses never include stack traces, connection strings, tokens, or provider payloads.

## Review checklist

- [ ] Auth: session verified, expiry checked, revocation possible.
- [ ] Tenancy: every query has a workspace predicate, and cross-workspace access returns 404 or 403.
- [ ] Input: Zod validation, size limits, content type checks.
- [ ] Output: encoded for the context, no raw HTML from untrusted sources.
- [ ] Secrets: not in code, logs, traces, prompts, or the sandbox.
- [ ] Crypto: AES-256-GCM with a random nonce and AAD; no custom crypto.
- [ ] CSRF: state-changing requests require a token or a strict origin check.
- [ ] SSRF: URL allowlist, DNS and IP checks, redirect revalidation.
- [ ] Files: path confinement, symlink resolution, upload type and size limits.
- [ ] Shell: sandbox only, timeout, output cap, resource limits.
- [ ] Approvals: exact action hash, replay rejected, expiry enforced.
- [ ] Rate limits: auth, webhooks, expensive reads, and writes.
- [ ] Dependencies: pinned, audited, no known high or critical issues.
- [ ] Logs: redacted, no bodies by default, request IDs present.
- [ ] Tests: cross-workspace, CSRF, SSRF, path traversal, approval replay, secret redaction.

## Supply chain

- Pin exact versions. No `latest` and no `^` ranges.
- Commit the lockfile.
- Run `pnpm audit --prod` and an OSV scan in CI.
- Scan container images with Trivy.
- Generate an SBOM with Syft for releases.
- Sign images and checksums with Cosign at release time.
- Run gitleaks or an equivalent secret scan on every push.
- Read the changelog before a major upgrade.
- Remove unused dependencies.

## When to stop

Stop and ask before:

- Adding a new runtime dependency or service.
- Weakening a security control for convenience.
- Disabling a test or a scan.
- Exposing a new port or service publicly.
- Storing a new category of sensitive data.
- Changing the approval model.

## References

- OWASP ASVS
- OWASP Top 10
- OWASP LLM Top 10
- CWE Top 25
- NIST SSDF
