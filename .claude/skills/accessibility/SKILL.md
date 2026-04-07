---
name: accessibility
description: Review React components and HTML markup for accessibility (a11y) violations. Report all issues and fail if any are found.
---

Audit the current project for accessibility issues. First, locate the project root by finding the nearest `package.json` (starting from the current working directory).

Use the Glob tool to find all `.tsx` and `.jsx` files in the project (excluding `node_modules`, `.next`, `dist`, `build`, and `out`), then read each one and review for the following issues. Flag any you find as failures.

## Checks

### Images and media

- **Missing `alt` on `<img>`**: every `<img>` element must have an `alt` attribute; decorative images should use `alt=""`
- **Missing `alt` on Next.js `<Image>`**: the Next.js `Image` component must also have an `alt` prop
- **`<video>` without captions**: `<video>` elements should include a `<track kind="captions">` child or equivalent

### Interactive elements

- **`<a>` with no accessible label**: anchor tags whose only content is an icon, image, or empty string, with no `aria-label` or `aria-labelledby`
- **`<button>` with no accessible label**: button elements with no text content, no `aria-label`, and no `aria-labelledby`
- **Non-interactive element used as a button**: `<div>` or `<span>` with an `onClick` handler but no `role="button"` and no `tabIndex`
- **Missing `href` on `<a>`**: anchor tags used as buttons (no `href`) without `role="button"` and keyboard event handlers

### Forms

- **Input without a label**: `<input>`, `<select>`, or `<textarea>` elements not associated with a `<label>` (via `for`/`htmlFor`, `aria-label`, or `aria-labelledby`)
- **Missing `type` on `<input>`**: inputs without an explicit `type` attribute default to `text`, which may be incorrect and reduces assistive technology clarity
- **Form submit button not identifiable**: `<form>` elements with no submit button or `aria-label` on the form

### Semantic structure

- **Multiple `<h1>` elements**: more than one `<h1>` per page component
- **Skipped heading levels**: e.g., jumping from `<h1>` directly to `<h3>` with no `<h2>` in between
- **Missing landmark regions**: page-level components (files named `page.tsx` or `layout.tsx`) with no `<main>`, `<nav>`, `<header>`, or `<footer>` elements
- **`<table>` without headers**: `<table>` elements with no `<th>` or `scope` attributes

### ARIA usage

- **Invalid `role` values**: `role` attributes set to non-standard or misspelled values
- **`aria-hidden="true"` on focusable elements**: elements that are keyboard-focusable but hidden from assistive technology
- **`aria-label` on a non-interactive element**: `aria-label` applied to elements like `<div>` or `<span>` that have no role, which has no effect

### Color and visual

- **`autoFocus`**: automatically focusing elements on load can disorient screen reader users; flag any use of `autoFocus`
- **Inline `style` setting `color` or `background-color`**: hardcoded color values in inline styles bypass theme contrast settings; flag these for manual contrast review

## Reporting

After reviewing all files:
- Report the result of each check category (passed or failed) with a count of issues found.
- List each issue with file path, approximate line number, and a one-line description of the violation and how to fix it.
- Only report overall success if ALL checks passed with zero issues.
- Do NOT attempt to auto-fix any issues. Report them and stop.

## Pass/Fail output

End your response with one of:
- `ACCESSIBILITY CHECKS PASSED` - all checks passed
- `ACCESSIBILITY CHECKS FAILED` - one or more checks failed
