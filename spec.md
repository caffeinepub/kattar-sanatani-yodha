# Specification

## Summary
**Goal:** Grant admin access to a specific Principal ID by adding it to the authorized admin list in the backend.

**Planned changes:**
- Add Principal ID `txzwk-b2k4v-63dny-xpzzb-qz4ij-fivmw-kuzqk-o6ngk-kib7t-63zon-lae` to the hardcoded/initial admin set in `backend/main.mo`
- Ensure no existing admin principals are removed or modified

**User-visible outcome:** The user with Principal ID `txzwk-b2k4v-63dny-xpzzb-qz4ij-fivmw-kuzqk-o6ngk-kib7t-63zon-lae` can log in and access the full Admin dashboard, including submissions table, search, filter, and CSV export.
