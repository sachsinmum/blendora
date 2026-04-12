# 🧠 AI Development Instruction Guidelines

## 📌 Purpose
This document defines strict guidelines for using AI tools in an existing production-grade application to ensure stability, consistency, and safe enhancements.

---

# 🚫 Core Principles (MUST FOLLOW)

1. Do NOT change existing working functionality.
2. Do NOT refactor or restructure code unless explicitly asked.
3. Do NOT modify project architecture or folder structure.
4. Make only minimal, incremental changes.
5. Maintain backward compatibility at all times.
6. Do NOT introduce breaking changes.
7. Do NOT add new dependencies unless absolutely necessary.

---

# ✅ General Development Rules

- Follow existing coding style and conventions.
- Reuse existing services, utilities, and components.
- Keep changes localized to the problem area.
- Avoid modifying unrelated files.
- Ensure readability and maintainability.
- Add logging and error handling where appropriate.

---

# 🔍 Before Making Changes

- Analyze the existing code thoroughly.
- Identify the exact root cause.
- Do NOT assume missing context.
- Ask for clarification if anything is unclear.
- Validate dependencies and configurations.

---

# 🛠️ While Making Changes

- Apply the smallest possible fix.
- Do NOT rename variables, functions, or classes unnecessarily.
- Do NOT change API contracts.
- Do NOT alter database schema unless required.
- Follow existing folder structure strictly.

---

# 📦 After Making Changes

- Show only modified code snippets.
- Clearly highlight what was changed.
- Provide reasoning for each change.
- Ensure no side effects are introduced.
- Confirm backward compatibility.

---

# 🐞 Bug Fixing Guidelines

## Instructions

- Fix only the reported issue.
- Do NOT modify unrelated logic.
- Do NOT refactor existing implementation.
- Keep changes minimal and precise.

## Constraints

- No changes to API structure
- No changes to database schema
- No renaming of existing methods or variables

---

# 🚀 Enhancement Guidelines

## Instructions

- Add features incrementally.
- Extend existing modules instead of creating new structures.
- Reuse existing components and services.

## Constraints

- Do NOT break existing functionality
- Do NOT modify existing flows
- Ensure backward compatibility

---

# 📱 React Native UI Guidelines

## Instructions

- Modify UI only (if required)
- Keep business logic unchanged
- Maintain navigation structure

## Constraints

- Do NOT change API calls
- Do NOT alter state management logic
- Do NOT restructure screens

---

# ☕ Backend (Spring Boot / API) Guidelines

## Instructions

- Enhance APIs safely
- Maintain request/response contracts
- Add validations where needed

## Constraints

- Do NOT break existing endpoints
- Do NOT change response formats
- Do NOT modify DB schema unnecessarily

---

# 🔐 Safety Rules

- Avoid large-scale changes
- Avoid unnecessary optimizations
- Avoid introducing new patterns without approval
- Avoid assumptions

---

# 🧪 Testing Expectations

- Ensure existing functionality works as-is
- Validate impacted areas only
- Avoid full system changes unless required

