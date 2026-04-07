---
name: static-checks
description: Run TypeScript type checking, ESLint, and efficiency review on the Next.js app. Report all issues and fail if any are found.
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

## Efficiency review

After the automated checks, use the Glob tool to find all `.ts` and `.tsx` files under `app/` (excluding `node_modules` and `.next`), then read each one and review for the following efficiency issues. Flag any you find as failures.

### React and rendering
- **Unnecessary re-renders**: state or props changing on every frame inside React components
- **Missing dependency arrays**: `useEffect` without a dependency array that runs on every render
- **Objects or arrays created inside render**: literals like `[]`, `{}`, or inline functions defined inside a component body that are not memoized and cause unnecessary re-renders downstream
- **Memory leaks**: event listeners, timers, or animation frames not cleaned up in `useEffect` return functions

### DOM and canvas
- **DOM queries inside loops**: `document.getElementById` or similar inside a loop or animation frame
- **Canvas draw call waste**: multiple full-screen `fillRect` calls that could be batched or avoided

### General algorithm efficiency
- **Redundant computation**: the same value computed more than once where a variable or constant could cache it
- **O(n^2) patterns**: nested loops iterating over the same collection when a `Map` or `Set` lookup would reduce it to O(n)
- **String concatenation in loops**: building strings with `+=` inside a loop instead of collecting into an array and joining once
- **Unnecessary spreading or cloning**: `[...arr]` or `{...obj}` used where a direct reference would suffice and mutation is not a concern
- **Repeated property access**: deeply nested property chains (e.g., `a.b.c.d`) accessed multiple times in the same scope without a local alias

### Code structure
- **Magic numbers**: numeric literals used directly in code instead of named constants
- **Unbounded loops or recursion**: loops or recursive calls with no clear exit condition
- **Dead branches**: conditions that are always true or always false given the surrounding logic

Report each issue with the file path, approximate line number, and a one-line description of the problem.

## Reporting

After running all checks:
- Report the result of each check (passed or failed) with a brief summary.
- If any check failed, show the exact error output so the user can fix it.
- Only report overall success if ALL checks passed with zero errors, zero warnings, and no efficiency issues.
- Do NOT attempt to auto-fix any issues. Report them and stop.

## Pass/Fail output

End your response with one of:
- `STATIC CHECKS PASSED` - all checks passed
- `STATIC CHECKS FAILED` - one or more checks failed
