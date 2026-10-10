# Fund Fluent

A playful, teach-first course on Indian mutual funds, tax and the stock market. It's laid out like a metro map: each section is a coloured line and each lesson is a station. Every lesson shows a short idea card first, then asks 1–3 quick questions on just that idea.

- **Fund basics**: 20 lessons
- **Tax**: 7 lessons
- **Build your portfolio**: 6 lessons
- **Stock market**: 16 lessons
- **Percent practice**: 7 mini lessons plus an endless drill
- **Cards**: 129 flashcards that unlock as you finish lessons

The original single-page prototype is kept in [`reference/`](reference/) and on the `v0-prototype` branch.

## Run it locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # checks every lesson, then builds to dist/
```

`npm run check` validates the lesson content: every answer is in range, ids are unique, and every number question has worked steps. The build fails if any lesson is broken.

## Where things live

| Path | What it is |
| --- | --- |
| `src/content/` | All lessons, questions and flashcards. Edit text here. |
| `src/views/` | Screens: map (`home.js`), lesson engine (`lesson.js`), Practice/Cards/Percent (`tabs.js`) |
| `src/styles/tokens.css` | Colours, type, spacing, motion. See [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md). |
| `src/analytics.js` | Anonymous PostHog events |
| `netlify.toml` | Build settings and security headers |

## Put it online with Netlify (one time)

1. Log in at **app.netlify.com** (sign up with GitHub).
2. Choose **Add new site → Import an existing project → GitHub**, then pick **Saee17/fund-fluent**.
3. The settings are read from `netlify.toml`, so just click **Deploy**.
4. Go to **Site configuration → Forms** and click **Enable form detection**, then redeploy once. This is what collects reviews.
5. Optional: under **Site configuration → Domain management**, change the site name, for example `fundfluent.netlify.app`.

After this, every push to `main` goes live automatically.

## Analytics (PostHog)

1. Create a free account at **posthog.com** with a personal email, and pick the EU or US region.
2. Copy the **Project API key** from Project settings.
3. In Netlify, go to **Site configuration → Environment variables** and add:
   - `VITE_POSTHOG_KEY` = your project key
   - `VITE_POSTHOG_HOST` = `https://eu.i.posthog.com` (or `https://us.i.posthog.com`)
4. Redeploy. If the key is missing, analytics simply stay off.
5. In PostHog's **Project settings**, turn on **Discard client IP data**.

### Events sent

| Event | Properties |
| --- | --- |
| `app_opened` | returning, lessons_done |
| `lesson_started` | mode, level, section, resumed |
| `idea_viewed` | level, idea |
| `question_answered` | q (question id), type, correct, retry, hinted, level |
| `lesson_completed` | mode, level, section, xp, accuracy, seconds, perfect, redo |
| `lesson_left` | mode, level, progress (%) |
| `review_submitted` | rating, has_comment |
| `card_marked` | known, card |
| `tab_opened` | tab |

### Dashboard to build in PostHog

- **Funnel:** `lesson_started` → `lesson_completed`, broken down by `level`, to see where people quit.
- **Trend:** `question_answered` where `correct = false`, broken down by `q`, to find the hardest questions.
- **Trend:** `lesson_left` broken down by `level`.
- **Trend:** average of `rating` on `review_submitted`.
- **Retention:** `app_opened` returning week over week.

Review comments themselves are under **Netlify → Forms → review**.

## Security

- No accounts and no personal data. Progress lives in the visitor's own browser.
- Strict Content-Security-Policy: scripts only load from this site and PostHog. There are no inline scripts or styles, and the site can't be embedded in other sites.
- HSTS, `nosniff`, `Referrer-Policy` and `Permissions-Policy` headers (see `netlify.toml`).
- All lesson text is rendered with `textContent`, never `innerHTML`. Icons are fixed SVG constants.
- Analytics: no cookies, no autocapture, no session recordings. It respects Do Not Track and has an in-app opt-out.
- Reviews go to Netlify Forms with a honeypot field and Netlify's spam filter. Comments are capped at 500 characters.
- Fonts are self-hosted, so there are no calls to Google Fonts.

## Keeping the content current

The rules are written from general knowledge as of 2026, including SEBI's February 2026 fund categories and FY 2026-27 tax rates. Check the tax, SEBI and market rules every couple of months and update `src/content/` if anything changes.

Fund Fluent is for learning. It is not investment, tax or legal advice.
