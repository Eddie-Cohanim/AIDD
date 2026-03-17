# AIDD Workshop - Claude Instructions

## Project Overview

This is a Next.js portfolio website for job hunting. It will showcase skills, experience, and knowledge to prospective employers. The site will be hosted on Vercel.

## Tech Stack

- Framework: Next.js (TypeScript)
- Hosting: Vercel
- Next.js root: `app/`

## Environment Setup

- Copy `.env` to `.env.local` and fill in your values
- Required: `ANTHROPIC_API_KEY`

## Custom Skills

Custom slash commands live in `.claude/commands/`. Each `.md` file becomes a `/skill-name` command.

## Coding Standards

- Write all code following Object-Oriented Programming (OOP) principles: encapsulation, abstraction, inheritance, and polymorphism.
- Use TypeScript classes and interfaces to model domain entities.
- Keep components and modules single-responsibility.
- Use only ASCII-compatible characters in all code, config files, and documentation. Do not use special Unicode characters, smart quotes, or non-ASCII symbols.

## Claude Behavior Rules

- Never add "Co-Authored-By" lines or any self-reference to git commit messages or PR descriptions.
- Never use emojis in any output, commit messages, code comments, or documentation.
- Use professional, precise language in all commit messages, descriptions, and comments.
- Use only Microsoft/Unix-friendly ASCII characters in all generated text and file content.
