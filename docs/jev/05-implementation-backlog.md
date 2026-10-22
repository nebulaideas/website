# Evidence-gated implementation backlog

The order matters: do not implement a market split before the measurement and JEV gates are met.

## P0 — Make the funnel observable

| Task | Status | Done when | Evidence |
|---|---|---|---|
| Choose an analytics provider | Open | Provider selection follows [03-measurement-contract.md](03-measurement-contract.md) | Data can be exported and reviewed |
| Add shared `trackEvent` adapter | Open | CTA and page components emit provider-neutral events | Events work in local development |
| Track page views and language toggles | Open | `page_view` and `language_toggle` have required properties | Test data appears without PII |
| Track CTA placement and destination | Open | Hero, navigation, Sprint, and footer events are distinguishable | Event log shows placement labels |
| Add UTM preservation to Calendly links | Open | Source, campaign, language, and placement survive the click | Test booking link contains expected parameters |
| Reconcile Calendly completions | Open | Booking metric can be counted, not only inferred from clicks | Calendly export or webhook/manual process is documented |

## P0 — Define commercial quality

| Task | Status | Done when | Evidence |
|---|---|---|---|
| Create qualification record | Open | Each conversation has the same fields | At least five records collected |
| Mark buyer role and organization size | Open | A+B segments can be compared | Role/size fields are complete enough to aggregate |
| Mark qualified outcome | Open | `conversation_qualified` is reproducible | Two reviewers agree on definition |
| Mark paid Sprint outcome | Open | `clarity_sprint_paid` can be reconciled to payment | Revenue metric is not inferred from bookings |

## P1 — Validate the message and offer

| Task | Status | Done when | Evidence |
|---|---|---|---|
| Run first five JEV conversations | Open | Interview records exist | [04-review-log.md](04-review-log.md) updated |
| Test current message comprehension | Open | Prospects explain what Nebula does without prompting | Repeated words and misconceptions recorded |
| Identify the strongest buying trigger | Open | One problem pattern is supported or rejected | Contradictory examples are retained |
| Define Clarity Sprint proof/scope | Open | Prospects can explain what they would receive | Offer objections are recorded |
| Review CTA intent by placement | Open | Hero, Sprint, navigation, and footer are comparable | Qualified intent is separated from clicks |

## P2 — Improve technical and market clarity

| Task | Status | Done when | Evidence |
|---|---|---|---|
| Verify LinkedIn entity URL | Open | Footer and JSON-LD use the correct canonical profile | External profile checked |
| Review canonical and locale SEO architecture | Open | Search indexing behavior is documented | Search Console data available or limitation recorded |
| Decide whether locale URLs are needed | Deferred | Data justifies separate indexable paths | Qualified market evidence exists |
| Add proof section | Deferred | Only verified proof is published | JEV identifies the proof buyers require |
| Revisit SEO FAQ structured data | Open | Search visibility and rendered content are verified | Technical SEO review complete |

## P3 — Market expansion

| Task | Status | Done when | Evidence |
|---|---|---|---|
| Evaluate US/Mexico split | Deferred | Distinct problem, source, and conversion pattern is observed | Sustained evidence, not language alone |
| Run power calculation before A/B test | Deferred | Required sample size fits the available traffic window | Traffic and conversion baseline exists |
| Scale paid Sprint acquisition | Deferred | Paid Sprint evidence supports investment | Repeatable qualified-to-paid path |
