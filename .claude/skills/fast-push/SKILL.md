---
name: fast-push
description: Stage all changes, commit with a professional message, and push to origin — skips static checks
disableModelInvocation: true
---

Before staging, run a TypeScript type check from the `app/` directory:

```
cd app && npx tsc --noEmit
```

- If the type check fails (non-zero exit), stop immediately and report the errors to the user. Do not stage, commit, or push.
- If the type check passes, proceed with the following.

Stage all modified and untracked files (excluding those in .gitignore), then commit with a professional, descriptive commit message based on the changes, and push to the remote origin on the current branch.

Rules:
- Do not include "Co-Authored-By" or any self-reference in the commit message.
- Do not use emojis in the commit message.
- Use professional, precise language.
- Use only ASCII characters.
- Show the final git status after pushing.
