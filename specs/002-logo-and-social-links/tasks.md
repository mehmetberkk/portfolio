---
description: "Task list for Favicon Logo and LinkedIn Integration"
---

# Tasks: Favicon Logo & LinkedIn Integration

**Input**: Design documents from `specs/002-logo-and-social-links/`  
**Prerequisites**: `plan.md`, `spec.md`, `research.md`

## Format: `- [ ] [TaskID] [P?] [Story?] Description with file path`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Implementation (Priority: P1)

**Goal**: Add LinkedIn to Contact section and configure custom logo as browser tab icon.

- [X] T001 [US2] Update `src/components/Contact.tsx` to import `Linkedin` from `lucide-react` and add LinkedIn profile (`https://www.linkedin.com/in/mehmet-berk-bozkurt`) to the `socials` array.
- [X] T002 [US1] Link custom logo file in `public/` (copied `public/logo.png.jpg` to `public/logo.jpg` and `public/favicon.jpg`) and update `index.html` favicon tags accordingly.

---

## Phase 2: Quality & Verification

**Purpose**: Static analysis and build verification.

- [X] T003 Run `npm run lint` and `npm run build` to confirm zero TypeScript errors and proper bundling.
