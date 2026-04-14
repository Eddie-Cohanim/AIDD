---
name: merge
description: Merge the current branch into main and push
disableModelInvocation: true
---

Merge the current branch into main and push to origin.

Steps:
- Capture the current branch name with `git branch --show-current`.
- Run `git checkout main`.
- Run `git merge <current-branch>`.
- If the merge succeeds, run `git push origin main`.
- Switch back to the original branch with `git checkout <current-branch>`.
- Report what changed (files updated, already up to date, or any conflicts).
- If there are merge conflicts, list the conflicting files and ask the user how to resolve them. Do not push if there are conflicts.
- Show the final git status.
