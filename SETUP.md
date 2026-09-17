# Tashia Coleman for Harris County MUD 89 — Setup Notes

This site was simplified specifically for a small, local Municipal Utility
District (MUD) board race — not a large city-wide campaign. It runs as plain
static HTML/CSS/JS (no database, no backend server) so it deploys directly on
Netlify's free tier.

## Why it's simpler than a typical campaign template

A MUD board race is low-profile, hyper-local, and decided by a small number
of votes. Sections that make sense for a city council or mayoral race — a
large staff/team page, a press/news feed, a public endorsements carousel, a
photo gallery of rallies — usually aren't necessary or realistic for a MUD
race, so they were removed. What's left is focused on the two things that
matter most for this kind of election: **who Tashia is** and **making sure
people actually know when and how to vote**.

## Current sections

1. **Announcement bar** — a slim, always-visible strip at the very top with
   Early Voting and Election Day dates, linking down to Key Dates
2. **Hero** — name, race, election date, and a Facebook link
3. **About Tashia** — bio (educator transitioning to public service)
4. **Her Priorities** — 4 MUD-relevant issues (water/drainage, fiscal
   responsibility, transparency, community-focused leadership)
5. **Her Story** — a short 3-point timeline from classroom to candidacy
6. **Key Election Dates** — a bold, distinctly-colored (blue-to-magenta
   gradient) section for voter registration, early voting (Oct 19–30, 2026),
   and Election Day (Tuesday, Nov 3, 2026), each linking to harrisvotes.com
7. **In The Community** — a carousel showing a flyer, campaign photos, and a
   video reel (currently styled placeholders — see note below)
8. **Get Involved** — 4 clickable cards (Spread the Word / Volunteer / Host
   an Event / Just Say Hello). Clicking one reveals a tailored sign-up form
   with a matching heading and pre-selected option
9. **Footer**

Removed entirely: Team, News/Press, Endorsements/Testimonials, and the
separate Contact section (merged into "Get Involved").

All placeholder copy is marked with `[Placeholder]`, `[Year]`, `[Name]`, etc.
— search the file for `[` to find everything that still needs real content.

## The interactive "Get Involved" cards

Clicking (or tabbing to + pressing Enter/Space on) a card:

- Highlights that card
- Updates the form's heading (e.g. "Sign Up To Volunteer")
- Pre-selects the matching option in the form's dropdown
- Reveals the form (it's hidden until a choice is made) and scrolls to it
- Updates a status line above the form ("You selected: Volunteer — choose
  differently") with a link back to the card picker

There's also a plain "jump straight to the form" link for anyone who'd
rather skip the cards, and a "Just Say Hello" card for people who aren't
ready to commit to anything but want to reach out. If JavaScript fails to
load for any reason, the form stays visible by default rather than getting
stuck hidden.

## About the "In The Community" carousel

Since no real campaign media was provided yet, this section uses a
lightweight custom carousel (no extra library — just CSS/JS already in the
site) with 5 styled placeholder slides: 1 flyer, 3 photos, and 1 video reel.
It auto-advances every 6 seconds and pauses on hover, with arrow and dot
navigation. To swap in real content, edit the `.carousel-slide` blocks in
`index.html`:

- **Flyer / Photos** — replace the `.carousel-media` div's icon with a real
  `<img>` tag.
- **Reel** — replace the placeholder with an embedded video (e.g. a
  YouTube/Vimeo `<iframe>`, or an uploaded `<video>` tag), or link out to an
  Instagram/Facebook Reel.

## About the voter registration deadline

The "Voter Registration" card intentionally does not state a specific date —
Texas's registration deadline is generally 30 days before an election, which
would put it around early October 2026, but this should be confirmed on
harrisvotes.com or with the Texas Secretary of State before publishing, since
exact deadlines can shift by a day depending on the calendar.

## Forms: how the email/mailing list piece works

One form, under "Get Involved," does double duty as both a volunteer signup
and general contact form (name, email, phone, zip, how they'd like to help,
and an optional message) — using Netlify Forms, included free with any
Netlify site and requiring no database or backend code:

- Netlify automatically detects the `<form data-netlify="true">` in your
  static HTML at deploy time.
- Every submission lands in your Netlify dashboard under
  Site → Forms → volunteer-signup.
- Export all submissions to a CSV at any time — this works well as a simple
  mailing list.
- Turn on email notifications (Site settings → Forms → Form notifications)
  to get an email every time someone signs up.
- The form redirects to thank-you.html after submitting.
- A hidden honeypot field (bot-field) provides basic spam protection with
  no extra setup needed.

## Still to do

- Fill in Tashia's real bio details (years teaching, school/district name,
  community involvement, why she decided to run).
- Confirm the exact voter registration deadline and update that card.
- Replace img/hero.png and img/about.jpg with real photos of Tashia.
- Add a real img/favicon.ico.
- Update the footer address, phone, email, and "Paid for by ___" disclaimer
  to match your local campaign finance disclosure requirements — this
  wording is often legally required for MUD races too, so double-check with
  the Texas Ethics Commission or your treasurer.
- Add real social links in the footer if applicable.

## Deploying

Drag-and-drop the whole folder into Netlify's dashboard ("Deploys" →
"Drag and drop"), or connect it to a Git repo — no build command is required
(the included netlify.toml sets publish = ".").
