# JEV response workflow

This document defines the Nebula Ideas JEV request and response process. JEV provides evidence for a bounded business question; the human keeps the decision.

## Contract

One request per JEV cycle:

```json
{
  "state": {},
  "model": "jev-latest",
  "questions": {}
}
```

The `state` must be compact, English, anonymized, and contain only facts needed to answer the question. Do not send names, email addresses, company names, conversation transcripts, or unverified assumptions.

Question primitives:

| Type | Returns | Use |
|---|---|---|
| `choice` | one winner, probabilities, confidence | Exactly-one selection |
| `noul` | `P(yes)` for one item | Independent multi-select judgments |
| `score` | ordered score, legend, probabilities, confidence | Priorities, severity, or effort |

Response rules:

- `choice` and `score` include `confidence`.
- `noul` returns only `noul`; it has no confidence field.
- Round and clamp `score` to its ordered legend in code.
- Gate high-impact actions on confidence; below threshold, keep the prior decision.
- Parse each answer independently; a partial response can still contribute valid answers.
- Every failure path leaves the existing decision or deterministic fallback unchanged.

## Archive rule

Save every request and response as a pair under `docs/jev/`:

```text
docs/jev/<cycle-id>.request.json
docs/jev/<cycle-id>.response.json
```

Then record the interpretation in [04-review-log.md](04-review-log.md). Never overwrite an older pair.

## Example request

This is a **synthetic Nebula Ideas example**, not a live response:

```json
{
  "state": {
    "market": "Mexico-first bilingual website",
    "traffic": "baseline not established",
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

## Example response

This is a **synthetic Nebula Ideas example**, not a live response:

```json
{
  "model": "jev-example",
  "answers": {
    "primary_message_frame": {
      "type": "choice",
      "choice": "improve_before_adopting_ai",
      "confidence": 0.78,
      "probabilities": {
        "improve_before_adopting_ai": 0.78,
        "ai_is_an_amplifier": 0.15,
        "clarity_sprint_first": 0.07
      }
    },
    "split_markets_now": {
      "type": "noul",
      "noul": 0.18
    },
    "instrument_before_copy": {
      "type": "noul",
      "noul": 0.91
    }
  },
  "usage": {
    "input_tokens": 0,
    "output_tokens": 0
  }
}
```

The example demonstrates the response shape only. A real Nebula response must be archived as a dated request/response pair and interpreted in [04-review-log.md](04-review-log.md).
