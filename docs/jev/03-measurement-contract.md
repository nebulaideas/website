# Measurement contract

This is the minimum data contract for learning whether the website attracts qualified organizations. Keep analytics provider-neutral until the baseline and event usefulness are proven.

## Event model

| Event | When it fires | Required properties |
|---|---|---|
| `page_view` | Initial page view | `language`, `path`, `source`, `utm_source`, `utm_medium`, `utm_campaign`, `referrer`, `device_type` |
| `language_toggle` | User changes language | `from_language`, `to_language`, `path` |
| `cta_click` | User clicks a business CTA | `language`, `path`, `cta_placement`, `cta_label`, `destination` |
| `calendly_booking_completed` | Booking is confirmed | `language`, `cta_placement`, `source`, `booking_week` |
| `conversation_qualified` | Manual/CRM qualification | `language`, `source`, `buyer_role`, `company_size`, `qualification_version` |
| `clarity_sprint_paid` | Sprint payment is confirmed | `language`, `source`, `offer_version`, `payment_week` |

Do not send names, email addresses, phone numbers, company names, conversation transcripts, or free-form notes to the analytics tool.

## CTA placements

Track each placement separately:

1. Hero: `Learn About the Clarity Sprint` or future control copy.
2. Navigation: schedule CTA.
3. Clarity Sprint section: booking CTA.
4. Footer: booking and email CTAs.

## Funnel definitions

```text
booking rate = completed bookings / qualified sessions
qualification rate = qualified conversations / completed bookings
paid rate = paid Clarity Sprints / qualified conversations
```

Track the numerator and denominator, not only the percentage. Low traffic will make percentages unstable.

## Attribution rules

- Preserve source and UTM values through the Calendly link.
- Record language separately from geography.
- Never label English as US or Spanish as Mexico without evidence.
- If Calendly completion cannot be measured first-party, import or reconcile it manually from Calendly exports.
- Add country, role, and company-size fields to the manual qualification record when available.

## Analytics tool decision

Default to a self-hosted or open-source tool with low operational overhead. Consider managed analytics only when it provides a decision we cannot make with the default tool.

Selection criteria:

- custom event support;
- UTM and referrer capture;
- self-hosting or low-cost operation;
- exportable data;
- no PII requirement for the initial funnel;
- easy maintenance on Cloudflare Pages/Vite;
- clear separation between booking, qualified conversation, and paid Sprint.

Do not choose a platform because it has the most features. Choose it only if it makes the funnel questions answerable.

## Review cadence

- **Weekly:** event health, broken attribution, and obvious tracking issues.
- **Every 30 days:** compare language, source, CTA placement, booking, and qualified-conversation counts.
- **After five qualified conversations:** review message and offer assumptions.
- **After paid Sprint evidence:** decide whether to scale, revise, or defer the offer.

## Decision rules

| Pattern | Likely interpretation | Next action |
|---|---|---|
| High bookings, low qualified conversations | Targeting or message attracts curiosity, not buyers | Interview unqualified bookings; revise problem framing |
| High qualified rate, low paid rate | Offer, proof, trust, scope, or pricing is weak | Test offer proof and scope before adding traffic |
| Low booking rate, high qualified rate | CTA or booking friction is the issue | Test CTA wording and booking path |
| Strong paid Sprint evidence | Offer has commercial signal | Improve proof and consider scaling carefully |
| English/Spanish difference without geography evidence | Language effect remains ambiguous | Add market/role data; do not split pages yet |

## Privacy checklist

- [ ] No names or email addresses in analytics events.
- [ ] No conversation transcripts in analytics payloads.
- [ ] Consent/privacy requirements checked before adding a provider.
- [ ] Manual CRM/qualification data access is limited.
- [ ] Retention policy documented before collecting new fields.
