# Specification

## Summary
**Goal:** Add member registration, login, member dashboard with ID card request, and extend the admin panel for the Kattar Sanatani Yodha application.

**Planned changes:**
- Add a visually distinct 'सदस्य बनें' button in the navigation header that links to /membership
- Create a /membership page with a full registration form including 11 Hindi-labeled text inputs, cascading country/state/district dropdowns, gender dropdown, photo upload (max 10 MB), and Aadhaar card upload (max 15 MB); on submit, store all data in the backend
- Create a /login page with नंबर/ईमेल and पासवर्ड fields; validate against stored credentials and redirect to /dashboard on success
- Create a protected /dashboard page showing the logged-in member's profile and an ID card request section with the verbatim Hindi payment instruction text (including WhatsApp number 7008981360) and a request button that submits member data to the backend
- Extend the admin panel (/admin) with three new sections: Membership Registrations, Member Login Activity, and ID Card Requests — each searchable and sortable
- Add /membership, /login, and /dashboard routes to the React Router configuration under the existing layout
- Extend the Motoko backend actor with: submitMembership, memberLogin (with auth token), requestIdCard, and admin query functions for all members and ID card requests; store file data as base64

**User-visible outcome:** Visitors can register as members, log in, and request an ID card from their dashboard. Admins can view all registrations, login records, and ID card requests in the admin panel.
