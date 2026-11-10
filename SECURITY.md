# Security Policy

## Supported versions

Morrow is pre-1.0. Security fixes land on `main` and the latest tagged release. Older tags are not supported.

## Reporting a vulnerability

Do not open a public issue. Report privately through GitHub Security Advisories:

https://github.com/sahil0x01/t1-morrow/security/advisories/new

Include:

- The affected version or commit.
- A description of the issue and its impact.
- Reproduction steps or a proof of concept.
- Any suggested fix.

Do not include real credentials, tokens, or personal data. Use generated test values.

## What to expect

- We aim to acknowledge a report within 3 business days.
- We aim to provide an initial assessment within 10 business days.
- We will coordinate disclosure after a fix is available.
- We will credit you unless you ask to remain anonymous.

## Scope

In scope:

- Authentication and session handling.
- Workspace isolation and authorization bypasses.
- Approval bypasses or action substitution.
- Secret exposure in logs, prompts, traces, or API responses.
- Path traversal, symlink escapes, and sandbox escapes.
- SSRF and unsafe outbound requests.
- Command injection.
- Dependency or supply chain compromise.

Out of scope:

- Denial of service against your own instance.
- Missing hardening headers without a demonstrated impact.
- Issues in third-party services that are not caused by Morrow code.
- Social engineering.

Do not test against instances you do not own or have explicit permission to test.
