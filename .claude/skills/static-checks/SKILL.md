---
name: static-checks
description: Run TypeScript type checking, ESLint, and formatting validation on the Next.js app. Report all issues and fail if any are found.
---

Run all static checks on the Next.js app located in the `app/` directory. Execute each check in sequence using the Bash tool.

## Checks to run

Run these commands from the `app/` directory (cd into it first):

1. **TypeScript type checking** - checks for type errors without emitting output:
   ```
   npx tsc --noEmit
   ```

2. **ESLint** - checks for linting errors:
   ```
   npx eslint . --max-warnings=0
   ```

## Reporting

After running all checks:
- Report the result of each check (passed or failed) with a brief summary.
- If any check failed, show the exact error output so the user can fix it.
- Only report overall success if ALL checks passed with zero errors and zero warnings.
- Do NOT attempt to auto-fix any issues. Report them and stop.

## Pass/Fail output

End your response with one of:
- `STATIC CHECKS PASSED` - all checks passed
- `STATIC CHECKS FAILED` - one or more checks failed
