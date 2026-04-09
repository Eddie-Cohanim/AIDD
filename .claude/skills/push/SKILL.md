---
name: push
description: Stage all changes, commit with a professional message, and push to the current branch on origin
---

Before committing, run the `/static-checks` skill. If it returns `STATIC CHECKS FAILED`, stop immediately and do not proceed with staging, committing, or pushing. Inform the user of the failures so they can be fixed first.

Only if `/static-checks` returns `STATIC CHECKS PASSED`, proceed with the following:

Determine the current branch with `git branch --show-current`. Stage all modified and untracked files (excluding those in .gitignore), then commit with a professional, descriptive commit message based on the changes, and push to origin using the current branch name.

Rules:
- Do not include "Co-Authored-By" or any self-reference in the commit message.
- Do not use emojis in the commit message.
- Use professional, precise language.
- Use only ASCII characters.
- Show the final git status after pushing.
