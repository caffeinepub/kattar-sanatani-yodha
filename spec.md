# KATTAR SANATANI YODHA

## Current State
The app has a membership registration form and a login page. Registration saves member data with a plain-text password in `hashedPassword` field. Login calls `loginMember(emailOrPhone, password)` which compares `email == emailOrPhone OR contactNumber == emailOrPhone` and then checks `m.hashedPassword == password`.

The `loginMember` backend returns `?Nat` (optional Nat). In Candid/JS bindings, this is returned as `[] | [bigint]` (array-wrapped optional). The frontend `useMemberAuth` hook compares result to `null` which fails because an empty optional comes as `[]` (empty array), not `null`.

## Requested Changes (Diff)

### Add
- Proper handling of Candid optional `?Nat` in `loginMember` response on the frontend (unwrap `[]` vs `[bigint]` pattern)

### Modify
- `useMemberAuth.tsx`: Fix `loginMutation` result handling — Candid optional `?Nat` comes as `[] | [bigint]`, not `null | bigint`. Must check `result.length > 0` and use `result[0]` to get the member ID.
- `useMemberAuth.tsx`: Fix `memberLogin` return value to correctly detect success from the unwrapped optional.
- `useMemberQueries.ts`: Fix `useRegisterMember` — `registerMember` returns `bigint` directly (not optional), so no unwrapping needed there.

### Remove
- Nothing to remove

## Implementation Plan
1. In `useMemberAuth.tsx`, update `loginMutation.mutationFn` to correctly unwrap Candid optional `?Nat` result: check `Array.isArray(result) ? result[0] ?? null : result ?? null`
2. Update `onSuccess` handler to use the unwrapped memberId
3. Update `memberLogin` callback to correctly return `true` when login succeeds
4. Verify Membership.tsx passes the correct `hashedPassword` field (already correct — plain text)
5. Validate and build
