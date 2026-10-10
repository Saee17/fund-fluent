# Accessibility audit: Fund Fluent

**Standard:** WCAG 2.1 AA. **Date:** 10 Oct 2026. **Method:** axe-core scan of 14 screen states (light and dark), keyboard walk-through, contrast maths, code review.

## Result
After the fixes below, the axe scan shows **0 violations** on every screen in both themes. A real-device check with VoiceOver and TalkBack is still recommended before launch.

## Fixed

| # | Issue | WCAG | Severity | Fix |
|---|---|---|---|---|
| 1 | Text at 92% opacity on line-coloured cards fell to 4.18:1 | 1.4.3 | Critical | Full-opacity text; all line fills now ≥ 4.6:1 |
| 2 | White text on bright line colours (e.g. on orange 2.1:1) | 1.4.3 | Critical | Separate `fill` and `on` tokens per line; Stocks uses dark text |
| 3 | Active tab label in dark mode 4.17:1 | 1.4.3 | Major | New `--act-text` token (6.3:1) |
| 4 | Dark-mode "wrong" button 4.24:1 | 1.4.3 | Major | Darker good/bad fills in dark mode |
| 5 | Lesson overlay had no dialog semantics; background stayed tabbable | 1.3.1, 2.4.3 | Major | `role="dialog"`, `aria-modal`, background made `inert`, focus returns to the opener |
| 6 | Sheets (settings, review) didn't trap focus | 2.4.3 | Major | Background `inert` while open; Esc closes; focus restored |
| 7 | Scrollable lesson body not keyboard-reachable | 2.1.1 | Major | `tabindex="0"` with a label |
| 8 | Heading levels skipped (h1 → h3) | 1.3.1 | Minor | Tile headings are now h2 |
| 9 | Icon buttons 40×40 and small buttons 40px tall | 2.5.5 | Minor | 44px minimum |
| 10 | Number and comment inputs had 1.4:1 borders | 1.4.11 | Minor | `--rule-strong` borders (≥ 3:1) |
| 11 | Star rating used radio roles without arrow-key support | 4.1.2 | Minor | Buttons with `aria-pressed` in a labelled group |

## Already in place
- Every icon-only button has an `aria-label`; decorative icons and the mascot are `aria-hidden`.
- Right/wrong is shown in words ("Correct!", "Not quite", "Answer: …"), not just colour, and announced via `role="status"`.
- Progress strips are labelled `progressbar`s with values.
- Keys 1–4 pick options, Enter checks/continues, Esc opens "Leave lesson?".
- All motion stops under `prefers-reduced-motion`; no timers or time limits.
- Locked lessons say why in their accessible name.

## Still to test by hand
- VoiceOver (iOS) and TalkBack (Android) on the match and order question types.
- 200% browser zoom on a small laptop.
