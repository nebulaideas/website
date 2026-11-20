<!-- /founder:product-brief · 2026-11-18 · input: Review my own company website, validate it, and list best practices and what is missing. -->

# Nebula Ideas website: product brief and review

Assumption: the "idea" is the Nebula Ideas site as built (`app/`), which sells one fixed offer, the Nebula Clarity Sprint (1 to 2 weeks, per the FAQ), plus four follow-on services.

## Next actions (in order)

1. Make the copy visible without JavaScript. `app/index.html:42` is an empty `<div id="root">`, so link previews and AI crawlers see no page copy.
2. Remove the FAQ JSON-LD or show the FAQ on the page. `app/src/lib/meta.ts:102` emits four answers that appear nowhere on the page, which breaks Google's rule that markup must match visible content.
3. Fix the LinkedIn URL. `app/src/components/Footer.tsx:57` uses `nebulaideas`; `meta.ts:84` and `app/public/llms.txt:77` use `nebula-ideas`.
4. Add analytics to the booking links. Nothing in the repo tracks visits or clicks, so the one conversion goal is unmeasured.
5. Add a privacy notice and link it in the footer. Visitors book through cal.com with personal data, and there is no privacy page. Mexico's privacy law (LFPDPPP) expects a notice. Confirm the exact wording with counsel.

## 1. Problem

- The site says organizations do not know "where AI can create value" and need to "understand before automation" (`app/src/lib/translations.ts`, hero).
- Who feels it most, and how they cope today: not stated. Add one line per buyer.

## 2. Target audience

The site says "organizations" in both languages. That is too broad to target a page, a post, or a referral.

Draft to fill in: "[Title, e.g. COO or CTO] at a [headcount range] [industry] company in [Mexico or the US] that has budget for AI or automation and no shared view of where to start."

## 3. Value proposition

As written: "We help organizations identify the value AI can create, uncover what should improve before automation, and build a clear path forward." It fails the "so what?" test: no buyer, no measurable outcome, no alternative.

Draft: "Nebula Ideas helps [audience] find the AI and automation work worth funding, in 1 to 2 weeks, through a fixed-scope Clarity Sprint, unlike AI vendors who start by selling a tool." The founder must confirm the "unlike" clause before it goes live.

## 4. Core features (what the site has today)

1. Hero with the positioning and one CTA.
2. Clarity Sprint: four evaluation areas, six deliverables, booking CTA.
3. Four follow-on services.
4. Bilingual toggle (EN/ES) with localized SEO metadata.
5. Footer with contact and booking links.

Missing for a buyer to trust the offer: price or price range, scope limits, client proof, and team names.

## 5. Success metrics (suggested, targets set after 30 days of baseline)

1. Booking-link clicks per 100 visits (leading). Needs analytics first.
2. Bookings per week via cal.com (lead).
3. Discovery calls that end in a Sprint commitment, as a share of calls held.
4. Share of visits and bookings on the Spanish version.
5. Days from first visit to booked call, median.

## 6. Risks and assumptions

1. Assumption: buyers will pay for a 1 to 2 week fixed Sprint before a larger engagement. Test: hold 5 discovery calls with the target role within 2 weeks and ask each for a Sprint commitment. Cost: founder time only.
2. Assumption: visitors from LinkedIn will click through to book. Test: add analytics, then spend up to $200 on promoted LinkedIn posts to the booking link for 2 weeks. Cost cap: $200. Cost per click: not found.
3. Assumption: Spanish-speaking buyers need a page they can share and search. Test: send the Spanish link to 10 Mexican contacts, each with its own UTM tag, and count bookings. Cost: $0.

## 7. Go-to-market snapshot

- Channel 1: LinkedIn, from the company page and the founders' profiles. CAC: Estimate, not measured. The page URL conflict in next action 3 must be fixed first.
- Channel 2: warm outreach to the target role in the founders' networks. CAC: Estimate, time cost only.
- Channel 3: Spanish-language search. CAC: Not found. Depends on fixing the SEO gaps below.
- Growth tactic: offer a free 30-minute "where should AI start" call on the existing booking link, and track how many turn into a Sprint.

## Review: what is validated

- `npm run lint`: passes.
- `npm run test:coverage`: 66 tests pass in 13 files. Coverage: 93.2% statements, 87.95% branches, 93.54% functions, 94.73% lines (threshold 85%).
- `npm run build`: passes. Main JS 264 kB (83 kB gzip). Hero chunk 508 kB (129 kB gzip).
- Reduced-motion handling exists in the hero and scroll reveal.
- Language switch updates `<html lang>`, meta tags, and the booking URL.
- Footer text (`#747d8f` on `#08111f`) computes to about 4.6:1 by my calculation, which passes AA for normal text.

## Review: best practices and gaps

Search and sharing
- Single URL for both languages. Spanish lives only in `localStorage`, so a shared link always opens in English for a new visitor. Use `/es/` with `hreflang` pairs.
- `public/_redirects` returns 200 for every path, so `/contact` (named in `llms.txt:75`) shows the homepage as a soft 404. Add real routes or a 404 page.
- `og:image` is the logo (`index.html`). Make a 1200x630 share card and add `og:image:width` and `og:image:height`.
- No favicon or Apple touch icon in `index.html` or `public/`.
- Sitemap has one URL with no `lastmod`. Fine for one page, but it will need updates when `/es/` exists.

Security and hosting
- No `public/_headers`. Add a Content-Security-Policy, `Strict-Transport-Security`, `X-Content-Type-Options`, and `frame-ancestors`. Cloudflare Pages reads this file.
- Google Fonts loads from a third party on every visit. Self-host if privacy is a priority.

Accessibility
- The mobile menu hides with `opacity-0 pointer-events-none` (`Navigation.tsx:129`). Its links stay in the tab order while closed. Use `inert` or `visibility: hidden` when closed.
- Body copy uses `text-justify`, which produces uneven word spacing on narrow screens.

Trust and content
- No names, bios, client logos, or testimonials. Founder photos exist (`app/public/assets/founder-carlos.jpg`, `founder-ismael.jpg`) but nothing uses them. Placeholder: `[Short bio for each founder: role, years in AI or engineering, one relevant result]`. Placeholder: `[Client quote about what the Sprint changed]`. Do not publish made-up quotes.
- No price or price range. Say "from [price]" or "priced after the discovery call," whichever is true.
- Spanish deliverables are in a different order from English: `translations.ts:48-49` (EN) vs `:131-132` (ES).

Performance
- The hero loads a 508 kB Three.js chunk before the first screen, and the Suspense fallback is an empty div. Ship a static poster image for first paint and load Three.js after idle.

Code and dead weight
- `app/src/components/ui/` has 40+ shadcn components, and none are imported by the app. Ten dependencies exist only for them: recharts, react-hook-form, embla-carousel-react, cmdk, react-day-picker, input-otp, sonner, vaul, next-themes, react-resizable-panels.
- Unused assets: `blog-ai-code.jpg`, `blog-ai-team.jpg`, `blog-mvp.jpg`, `founder-*.jpg`, `noise.jpg`.
- `react-router` wraps the app in `BrowserRouter` (`main.tsx:9`) with no routes.
- `package.json` name is `my-app`. `app/README.md` is the Vite template. `info.md` is scaffold output with a `/mnt/agents/output` path.
- `kimi-plugin-inspect-react` is in `vite.config.ts`. Confirm it belongs in the repo.

Docs that have drifted
- `tech-spec.md` says Calendly (code uses cal.com), Vite ^6 (actual 7.x), Tailwind ^4 (actual 3.4), and lenis (not installed). It lists components and hooks that do not exist, such as `BlogSection` and `useLenis`.
- `README.md` has six `file:///Users/igmarin/...` links, which break for anyone else. Its structure lists `EngineeringDNASection.tsx`, which does not exist.

## What I did not check

- Live site, Search Console, or real load times on a phone.
- Screen reader behavior. The findings above come from reading the code.
- Legal wording. This is a flag for counsel, not legal advice.

Next: fix next action 1, then run `/founder:validate-idea` on the offer before you spend on traffic.

Saved to: `founder/product-brief.md`. Use next: `founder:pricing-strategy` (the missing price) and `founder:landing-page` (the copy fixes).
