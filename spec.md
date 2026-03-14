# KATTAR SANATANI YODHA

## Current State

A dynamic Hindi website with membership registration, login, admin panel, and member dashboard. Members register via email/password form. Admin uses Internet Identity with a hardcoded principal. The site is dynamic (content editable via admin panel).

## Requested Changes (Diff)

### Add
- Backend: `getMemberSelf(memberId: Nat): async ?MemberPublic` - allows a logged-in member to fetch their own data by ID (no auth required since member IDs are private to the session)
- Backend: `MemberPublic` type excluding password hash
- Frontend: Cache logged-in member data in `useMemberAuth` context so dashboard can display it without failing API calls
- Store member data during login in context

### Modify
- Backend `submitIdCardRequest`: Remove the anonymous check so members without Internet Identity can submit requests (just record memberId, no ownership verification needed)
- Frontend `useMemberAuth`: After successful login, fetch and store member data in context
- Frontend `MemberDashboard`: Use member data from context instead of `getCallerMember()` hook
- Frontend `useMemberQueries`: Add `getMemberSelf` query hook

### Remove
- N/A

## Implementation Plan

1. Update `main.mo`: add `MemberPublic` type, add `getMemberSelf(id: Nat)` public query, relax anonymous check in `submitIdCardRequest`
2. Regenerate `backend.d.ts` to include new types/functions
3. Update `useMemberAuth.tsx`: after login, call `getMemberSelf` and store member in context, expose `loggedInMember` field
4. Update `MemberDashboard.tsx`: use `loggedInMember` from context instead of `useGetCallerMember()`
5. Update `useMemberQueries.ts`: add `useMemberSelf` query hook
