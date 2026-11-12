---
name: llm-security
description: Use for prompt injection, untrusted web, email, file, tool, and MCP content, model output handling, tool policy, approvals, sandbox egress, and LLM security tests.
---

# LLM security

The model is not trusted to respect boundaries. Policy is enforced outside the model.

## Trust model

- The model can propose actions. The policy engine decides.
- Web pages, emails, files, tool output, and MCP responses are untrusted data.
- Model output is untrusted until it passes schema and policy validation.
- The sandbox is semi-trusted. It can be compromised by the code it runs.
- Provider keys and connector credentials never enter the prompt or the sandbox.

## Prompt injection defenses

1. Separate instructions from data. Label untrusted content clearly.
2. Never let the model choose a workspace ID, user ID, credential, file path, or URL without server-side validation.
3. Validate every tool call against a Zod schema and a policy rule.
4. Require approval for sending, publishing, deleting, purchasing, changing production, or sharing data externally.
5. Bind approval to the exact canonical action and argument hash.
6. Use an egress allowlist and block private IPs, metadata endpoints, and unexpected redirects.
7. Do not expose secrets to the model, even if the user asks.
8. Treat a tool result as data, not as a new instruction.
9. Log the action and the policy decision, not the raw prompt by default.
10. Test with prompt injection fixtures before shipping.

## Tool policy

Every tool declares:

- Input schema.
- Risk level: read, write, destructive, financial, external.
- Required scopes.
- Whether approval is required.
- Timeout and output cap.
- Idempotency behavior.
- Audit fields.

The policy engine checks workspace, role, plan, approval, and egress. The model cannot override it.

## Sandbox and egress

- No host mounts, no Docker socket, no database network, no credentials.
- Egress through a proxy with an allowlist and SSRF checks.
- Read-only by default. Writes require an approval-bound capability.
- Block private, loopback, link-local, and metadata addresses.
- Cap command time, output size, CPU, memory, and disk.

## Logging and traces

- Do not record prompts or tool output by default.
- If enabled for debugging, redact secrets and personal data first.
- Record the tool name, argument hash, policy decision, approval ID, and result status.
- Never put a raw token in a span attribute.

## Tests

- Direct prompt injection in a user message.
- Indirect injection in a web page, email, file, or tool result.
- A tool call with a forged workspace ID.
- A tool call with a private IP or metadata URL.
- An approval replayed with different arguments.
- A model attempt to read a secret.
- A model attempt to send data to a non-allowlisted host.
- A malicious MCP server response.

## References

- OWASP LLM Top 10
- OWASP Agentic Security Initiative
- NIST AI RMF
