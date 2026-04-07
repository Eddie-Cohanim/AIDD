---
name: secure
description: Scan the project for security vulnerabilities, exposed secrets, and unsafe coding patterns. Report all issues and fail if any are found.
---

Run a full security audit of the current project. First, locate the project root by finding the nearest `package.json` (starting from the current working directory). Execute each check in sequence.

## Checks to run

### 1. Dependency vulnerability audit

Run `npm audit` to check for known vulnerabilities in installed packages:

```
npm audit --audit-level=moderate
```

- A non-zero exit code is a failure.
- Report the full output, including package names, severity, and any available fix commands.
- If `node_modules` does not exist, skip this step and note it in the report.

### 2. Exposed secrets scan

Use the Grep tool to scan all non-ignored source files for patterns that suggest hardcoded secrets or credentials. Search the entire project directory, excluding `node_modules`, `.next`, `dist`, `build`, `out`, and `.git`.

Flag any match as a failure. Patterns to search for:

- API keys: strings matching `sk-`, `pk-`, `Bearer `, or common key prefixes like `AKIA` (AWS)
- Hardcoded passwords: variable names containing `password`, `passwd`, or `secret` assigned a non-empty string literal
- Hardcoded tokens: variable names containing `token` or `api_key` assigned a string literal
- Private keys: lines containing `-----BEGIN` (PEM headers)
- `.env` file content committed directly in source (i.e., `KEY=value` patterns inside `.ts`, `.tsx`, `.js`, `.json` files that are not themselves `.env` files)

For each match, report the file path, line number, and the matching line (with any secret value redacted).

### 3. Sensitive file staging check

Run the following to detect files that should never be committed but may be staged or tracked:

```
git ls-files | grep -Ei "\.(env|pem|key|p12|pfx|cer|crt)$|secrets|credentials|id_rsa|id_dsa"
```

Flag any result as a failure. Report the file path and explain why it should not be tracked.

### 4. Source code security patterns

Use the Glob tool to find all `.ts` and `.tsx` files in the project (excluding `node_modules`, `.next`, `dist`, `build`, `out`), then read each one and review for the following insecure patterns. Flag any you find as failures.

- **`eval()` usage**: executing arbitrary strings as code
- **`dangerouslySetInnerHTML`**: unescaped HTML injection risk in React
- **`innerHTML` assignments**: direct DOM injection without sanitization
- **Unvalidated external input used in queries or commands**: user-controlled values passed directly to database queries, shell commands, or file paths without validation
- **HTTP instead of HTTPS**: hardcoded `http://` URLs pointing to external services (not localhost or local dev URLs)
- **Disabled TLS verification**: `rejectUnauthorized: false` or equivalent
- **Regex with no length guard on user input**: unbounded regex applied to untrusted input (ReDoS risk)
- **Overly permissive CORS**: `Access-Control-Allow-Origin: *` set unconditionally in API routes

Report each issue with the file path, approximate line number, and a one-line description of the risk.

## Reporting

After running all checks:
- Report the result of each check (passed or failed) with a brief summary.
- If any check failed, show the relevant output so the user can act on it.
- Redact any secret values in output before displaying them.
- Only report overall success if ALL checks passed with zero issues.
- Do NOT attempt to auto-fix any issues. Report them and stop.

## Pass/Fail output

End your response with one of:
- `SECURITY CHECKS PASSED` - all checks passed
- `SECURITY CHECKS FAILED` - one or more checks failed
