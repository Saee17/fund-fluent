# Fund Fluent design system

**Idea:** the course is a metro map. Each section is a coloured line and each lesson is a station. Colour always means "which line you're on". Rewards are gold, and right and wrong answers use green and red. Everything else stays quiet so the lines stand out.

References: Duolingo (chunky 3D buttons, feedback panel, combo, keypad), Brilliant (calm adult layout, weekly streak row, one idea per screen), Transit (route cards, "N stops to …", a moving marker on a progress strip).

## Tokens (`src/styles/tokens.css`)

### Colour

| Token | Light | Use |
| --- | --- | --- |
| `--ground` | #F2F3F8 | Page background |
| `--surface` | #FFFFFF | Cards, options, sheets |
| `--sunk` / `--rule` | #E6E8F1 / #D5D8E6 | Tracks, borders, 3D edges of neutral buttons |
| `--ink` / `--ink-2` / `--ink-3` | #1D1B3F / #555878 / #65688A | Text, secondary text, muted text (all ≥ 4.5:1 on ground) |
| `--act` | #4B3FE4 | Default action buttons, focus ring, selected state |
| `--gold` | #FFC531 | Rewards: XP, daily ring, mascot, celebration |
| `--good` / `--bad` | #14864A / #C7332D | Right/wrong feedback (white text ≥ 4.6:1) |
| `--flame` | #E8590C | Streak, combo |

**Lines.** Each has six roles. Components only ever use the role names (`--line`, `--line-fill` …) through `data-line="basics|tax|plan|stocks|pct"`.

| Line | `line` (track) | `fill` (text surface) | `on` | `shadow` | `text` (on ground) |
| --- | --- | --- | --- | --- | --- |
| Fund basics | #13B37A | #0A8556 | white | #06603E | #0A7A4F |
| Tax | #FF5B57 | #D0312D | white | #9C2220 | #C02E2A |
| Portfolio | #2E6BFF | #2556E6 | white | #183DAA | #1F4FD6 |
| Stocks | #FF9A1F | #FF9A1F | #2B1A00 | #C56F05 | #A55A00 |
| Percent | #A24BF2 | #8A3FE0 | white | #6427AD | #7A35D0 |

Every `on`/`fill` pair is at least 4.6:1. Stocks uses dark text, because white on orange fails contrast. Dark mode keeps the fills and brightens `line` and `text`.

### Type
- **Display:** Bricolage Grotesque (variable), weight 800, tight tracking. Used for headings, questions, big numbers and badges.
- **Body:** Nunito (variable), weight 520–900. Rounded and friendly, used for everything else.
- **Scale:** 13 / 15 / 17 / 22 / 28 / 36 px. Lesson body is 17px with 1.65 line height and lines capped near 62 characters.
- Sentence case everywhere. No all-caps labels.

### Space, radius, depth, motion
- **Space:** 4-based (`--s1` 4px … `--s10` 40px).
- **Radius:** pill, 16 (buttons), 20 (cards), 24 (sheets).
- **Depth:** `--depth: 4px`, a solid bottom edge that collapses on press. Nothing uses soft shadows.
- **Motion:** spring `cubic-bezier(.34,1.56,.64,1)` for things that respond to you (press, pop, token glide, progress), and out-easing for sheets. 120 / 280 / 520 ms. Everything switches off under `prefers-reduced-motion`.

## Components

| Component | Variants / states | Notes |
| --- | --- | --- |
| **Button** `.btn` | default (act), `line`, `good`, `bad`, `quiet`, `sm`, `wide`, disabled | 3D edge via `--bd`. Labels say exactly what happens ("Start", "Check", "Send review"). |
| **Station node** `.node` | locked (small ring stop), open, current (hops + halo), done (check) | Locked stations are disabled buttons with an explanatory aria-label. |
| **Route badge** `.badge` | per line | One letter per section: F, T, P, S. |
| **Next stop card** `.nextstop` | per line | Transit-style: lesson name, "N stops to {next section}", strip with coin marker, CTA. |
| **Station popover** `.pop` | start / continue / redo | Opens under the station, like Duolingo's lesson bubble. |
| **Progress strip** `.l-strip` | idea stops on / off | The coin marker glides along; stops mark each idea. |
| **Idea card** `.teach` | with viz, with "On a fund app" note | Example rows sit in a `.ticket`. |
| **Option tile** `.opt` | default, selected, right, wrong, disabled | Keys 1–4 select; Enter checks. |
| **Number entry** `.numbox` + `.keypad` | default, right, wrong | Keypad appears on touch screens. The hint (lightbulb) shows worked steps. |
| **Order / match** `.chipbtn`, `.mitem` | used, ok, miss | Match checks itself when complete. |
| **Feedback panel** `.l-foot.good/.bad` | right, wrong, comes back later | The mascot's mood changes; worked steps show on wrong number answers. |
| **Sheet** `.sheet` | settings, review | Esc / scrim closes; focus returns to the opener. |
| **Star rating** `.stars` | 0–5 | Radio group semantics. |
| **Toast** `.toast` | — | `role="status"`. |
| **Mascot** "Paisa" | happy, wow, oops, calm | A one-rupee coin, decorative (`aria-hidden`). |

## Do / don't

| Do | Don't |
| --- | --- |
| Use a line's colour only for that section's content | Use line colours as decoration elsewhere |
| Put text on `--line-fill` with `--on-line` | Put white text on the bright `--line` |
| Keep one celebration per lesson (end screen) | Add ambient motion to idle screens |
| Teach before asking | Ask about anything not yet taught |
