# Specification

## Summary
**Goal:** Wrap the root `App.tsx` component tree with `MemberAuthProvider` so that member authentication context is available throughout the entire application.

**Planned changes:**
- Import `MemberAuthProvider` from `frontend/src/hooks/useMemberAuth.tsx` in `App.tsx`
- Wrap the top-level JSX (RouterProvider or equivalent) returned by `App.tsx` with `<MemberAuthProvider>`

**User-visible outcome:** Member authentication context is accessible to all pages and components (Login, MemberDashboard, Navigation, etc.) without "used outside provider" errors, and all existing login/logout flows continue to work correctly.
