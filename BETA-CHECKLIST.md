# Beta release checklist

- Deploy the preview branch on Cloudflare Pages; verify all scripts return JavaScript, not HTML fallback.
- Supabase: verify email confirmation and recovery redirect URLs for the deployed domain.
- Verify skilltwin_progress RLS prevents access to another user's rows; verify save_skilltwin_progress derives identity from auth.uid() and checks expected revision atomically.
- Test two separate accounts, guest import, lesson completion, rewards, logout/login, offline recovery and two-device conflicts.
- Test mobile Safari and Chrome; measure Twin Studio frame rate and responsiveness.
- Do not merge until these checks pass. No database policies or live accounts have been verified by this code review.
