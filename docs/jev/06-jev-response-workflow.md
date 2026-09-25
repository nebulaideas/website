# JEV response workflow

This project uses **Jev**, the TypeSafe judgment model, the same way MenteViva does: Jev provides evidence for a bounded question; the human keeps the decision.

Reference implementation: `/Users/igmarin/Developer/Personal/Projects/MenteViva/docs/jev-integration.md`.

## Contract

One request per JEV cycle:

```json
{
  "state": {},
  "model": "jev-latest",
  "questions": {}
}
```

The `state` must be compact, English, anonymized, and contain only the facts needed to answer the question. Do not send names, email addresses, company names, free-form transcripts, or unverified assumptions.

Question primitives:

| Type | Returns | Use |
|---|---|---|
| `choice` | one winner, probabilities, confidence | Exactly-one selection |
| `noul` | `P(yes)` for one item | Independent multi-select judgments |
| `score` | ordered score, legend, probabilities, confidence | Priorities, severity, or effort |

Important response rules:

- `choice` and `score` include `confidence`.
- `noul` returns only `noul`; it has no confidence field.
- `score` is rounded and clamped to the ordered legend in code.
- Gate high-impact actions on confidence; low confidence means keep the previous state or fallback.
- Parse each answer independently. A partial response can still be useful.
- Every failure path must leave the existing decision or deterministic fallback unchanged.

## Archive rule

For every request, save both files directly under `docs/jev/` using the cycle ID:

```text
docs/jev/<cycle-id>.request.json
docs/jev/<cycle-id>.response.json
```

Then add a short interpretation entry to [04-review-log.md](04-review-log.md). Never overwrite an older pair.

## Examples

The example payloads in this folder are real JEV request/response material copied or condensed from the MenteViva integration. They demonstrate the contract only; they are **not Nebula Ideas findings**. See [07-jev-examples.md](07-jev-examples.md) for provenance and the exact source path.

## Nebula cycle

For Nebula, the first JEV request should test the frozen business questions from [01-decision-record.md](01-decision-record.md), for example:

```json
{
  "state": {
    "market": "Mexico-first bilingual website",
    "traffic": "fewer than 100 sessions per month",
    "funnel": "site visit -> CTA -> Calendly booking -> qualified conversation -> paid Clarity Sprint",
    "current_message": "AI is an amplifier. Understand before you amplify.",
    "offer_hypothesis": "fixed-scope paid Clarity Sprint",
    "evidence_gap": "no historical funnel data"
  },
  "model": "jev-latest",
  "questions": {
    "primary_message_frame": {
      "type": "choice",
      "instructions": "Which message frame should Nebula Ideas test first for the Mexico target?",
      "criteria": {
        "improve_before_adopting_ai": "Lead with improving IT/product capability; treat AI as one possible intervention",
        "ai_is_an_amplifier": "Keep the current AI-amplifier philosophy as the primary frame",
        "clarity_sprint_first": "Lead with the fixed-scope Clarity Sprint offer rather than the broader problem"
      }
    },
    "split_markets_now": {
      "type": "noul",
      "instructions": "Is there enough evidence to split the Mexico and US messages now?",
      "criteria": {
        "true": "Evidence shows distinct markets, problems, sources, and conversion patterns",
        "false": "Current traffic and attribution are insufficient; keep one shared core message"
      }
    },
    "instrument_before_copy": {
      "type": "noul",
      "instructions": "Should Nebula instrument the funnel before changing the strategic message?",
      "criteria": {
        "true": "No reliable baseline exists; measurement must precede message comparison",
        "false": "The current message is clearly unusable and should change before measurement"
      }
    }
  }
}
```

Archive the actual Nebula response when the first live call is made.

## Saved example payloads

The following pairs are copied from the real MenteViva TypeSafe/Jev archive. They are **examples only; not Nebula Ideas results**.

### 001 — choice + noul

Source: `/Users/igmarin/Developer/Personal/Projects/MenteViva/docs/jev-json/001-audience.*`

```json
{
  "model": "jev-latest",
  "state": {
    "product": "MenteViva, an iOS brain-training app: 4 simple warm-toned games (memory pairs, Stroop, category fluency, adaptive math), offline-first, EN/ES bilingual, no accounts, no clinical scores. Zero third-party deps, solo developer.",
    "purchase_channel": "Adult child buys the app for their aging parent; family views progress via CloudKit share.",
    "evidence": {
      "healthy_older_adults": "Small near-transfer gains on trained tasks; far transfer to daily life weak/unproven. Overall computerized-cognitive-training effect small (g≈0.22, meta-analysis of 51 studies).",
      "mci": "Small-to-moderate improvements across domains; best-supported target population for CCT in the literature.",
      "dementia": "No reliable benefit; literature says do not target.",
      "consensus": "2014 Stanford/Max Planck consensus (70 scientists): no compelling evidence brain games improve everyday cognition or prevent decline; ads exploiting seniors' anxieties called out.",
      "regulatory": "FDA general-wellness safe harbor only if claims stay lifestyle-level. FTC fined Lumosity $2M for unsubstantiated claims. App Store 1.4.1 scrutinizes apps usable for diagnosing or treating. Claiming dementia/MCI benefit = medical device territory.",
      "design_cost": "Diagnosed-impairment audiences raise the design bar (simplification, caregiver supervision) at the same time as the regulatory bar."
    },
    "constraints": "Solo developer, zero-dep native iOS, offline-first, accessibility floor (WCAG 2.2 AA), must stay clear of App Store medical scrutiny."
  },
  "questions": {
    "primary_audience": {
      "type": "choice",
      "instructions": "Which population should v1 primarily target?",
      "criteria": {
        "healthy_preventive_60plus": "Healthy older adults 60+ who want to stay sharp; preventive framing, lifestyle-level marketing claims only",
        "diagnosed_mci": "Adults with diagnosed mild cognitive impairment; strongest CCT evidence but higher design and regulatory bar",
        "early_dementia": "Adults in early dementia; strongest need but no reliable training benefit in the literature",
        "general_public": "General adult public of all ages, competing head-on with Lumosity/Elevate/Peak"
      }
    },
    "dementia_claims_risky": {
      "type": "noul",
      "instructions": "Is targeting dementia-claimed benefit both evidence-unsupported and regulatorily risky for this app?",
      "criteria": {
        "true": "Evidence shows no reliable benefit for dementia and such claims trigger FDA/FTC/App Store medical scrutiny",
        "false": "Dementia-targeted claims are evidence-supported or carry no meaningful regulatory risk"
      }
    }
  }
}
```

```json
{
  "model": "jev-1.13.0",
  "answers": {
    "primary_audience": {
      "type": "choice",
      "choice": "healthy_preventive_60plus",
      "confidence": 0.94,
      "probabilities": {
        "diagnosed_mci": 0.05,
        "early_dementia": 0.0,
        "general_public": 0.0,
        "healthy_preventive_60plus": 0.95
      }
    },
    "dementia_claims_risky": {
      "type": "noul",
      "noul": 0.98
    }
  },
  "usage": {
    "input_tokens": 890,
    "output_tokens": 95
  }
}
```

### 002 — multiple score answers

Source: `/Users/igmarin/Developer/Personal/Projects/MenteViva/docs/jev-json/002-game-domains.response.json`

```json
{
  "model": "jev-1.13.0",
  "answers": {
    "processing_speed": {
      "type": "score",
      "score": 1.93,
      "confidence": 0.89,
      "legend": {
        "0": "Not worth v1: skip it for launch",
        "1": "Nice variety: include only if trivially cheap to build",
        "2": "Core pillar: strongest-evidence domain; v1 should find a way to cover it"
      },
      "probabilities": {
        "0": 0.02,
        "1": 0.03,
        "2": 0.95
      }
    },
    "numeracy": {
      "type": "score",
      "score": 0.62,
      "confidence": 0.41,
      "legend": {
        "0": "Not worth v1: skip it for launch",
        "1": "Nice variety: include only if trivially cheap to build",
        "2": "Core pillar: v1 should find a way to cover it"
      },
      "probabilities": {
        "0": 0.39,
        "1": 0.6,
        "2": 0.01
      }
    }
  },
  "usage": {
    "input_tokens": 1176,
    "output_tokens": 100
  }
}
```

### 003 — low-confidence choice

Source: `/Users/igmarin/Developer/Personal/Projects/MenteViva/docs/jev-json/003-monetization.response.json`

```json
{
  "model": "jev-1.13.0",
  "answers": {
    "launch_model": {
      "type": "choice",
      "choice": "one_time_1299_family_sharing",
      "confidence": 0.62,
      "probabilities": {
        "subscription_499_month": 0.0,
        "free_forever": 0.0,
        "one_time_1299_family_sharing": 0.72,
        "freemium_annual_2499": 0.28
      }
    }
  },
  "usage": {
    "input_tokens": 846,
    "output_tokens": 81
  }
}
```

### 004 — independent noul judgments

Source: `/Users/igmarin/Developer/Personal/Projects/MenteViva/docs/jev-json/004-jev-role.response.json`

```json
{
  "model": "jev-1.13.0",
  "answers": {
    "offline_first_daily_right": {
      "type": "noul",
      "noul": 0.9
    },
    "per_session_worth_it": {
      "type": "noul",
      "noul": 0.17
    }
  },
  "usage": {
    "input_tokens": 751,
    "output_tokens": 43
  }
}
```

These payloads document the API shape only. When Nebula receives its first live response, add a new pair to this folder and interpret it in [04-review-log.md](04-review-log.md).
