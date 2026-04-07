---
name: cleanup
description: Scan the project for leftover debug statements, commented-out code, and unresolved TODO/FIXME comments. Report all issues and fail if any are found.
---

Scan the current project for code quality and hygiene issues that should be resolved before shipping. First, locate the project root by finding the nearest `package.json` (starting from the current working directory).

Use the Glob tool to find all `.ts`, `.tsx`, `.js`, and `.jsx` files in the project (excluding `node_modules`, `.next`, `dist`, `build`, and `out`), then read each one and check for the following issues.

## Checks

### 1. Debug statements

Flag any of the following as failures:

- `console.log(`, `console.warn(`, `console.error(`, `console.debug(`, `console.info(` — unless the file is explicitly a logging utility (e.g., its name contains `logger` or `log`)
- `debugger;` statements
- `alert(` calls

### 2. Commented-out code

Flag blocks or lines of commented-out code as failures. Distinguish between:

- **Explanatory comments**: prose sentences describing what code does — these are acceptable, do not flag them
- **Commented-out code**: syntactically valid code that has been disabled by commenting — flag these

### 3. Unresolved annotations

Flag any of the following markers as failures:

- `TODO`
- `FIXME`
- `HACK`
- `XXX`
- `TEMP`

Report the file path, line number, and the full annotation text so the user can decide how to resolve each one.

### 4. Unused imports (manual review)

Review each file's import statements against what is actually referenced in the file body. Flag any import that is never referenced in the file as a failure. This supplements ESLint's static analysis with a human-readable description of the unused symbol and where it was imported from.

## Reporting

After reviewing all files:
- Report the result of each check category (passed or failed) with a count of issues found.
- List each issue with file path, line number, and a one-line description.
- Only report overall success if ALL checks passed with zero issues.
- Do NOT attempt to auto-fix any issues. Report them and stop.

## Pass/Fail output

End your response with one of:
- `CLEANUP CHECKS PASSED` - all checks passed
- `CLEANUP CHECKS FAILED` - one or more checks failed
