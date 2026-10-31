# Questions view — Samuel

## Current scope

This contribution adds the HTML/CSS Questions view and the question data. It does not add JavaScript gameplay. All interface copy, names and comments are in English. Existing Home, Scoreboard, Profile and Notification files are unchanged.

Open `pages/questions.html` with VS Code Live Server. The page also works as a local HTML file at this stage because its fonts, icons and photos are local. Once `fetch` is added, use a local web server.

## Files

| File | Responsibility |
| --- | --- |
| `pages/questions.html` | Semantic static preview of the first Capitals question, native answer buttons and navigation |
| `css/questions.css` | Questions-only styling, Flexbox answer column and responsive Grid layout |
| `data/questions.json` | 15 questions: 5 Capitals, 5 Sports and 5 Artists |
| `assets/questions/` | Five licensed capital-city photos |
| `assets/fonts/` | Local Poppins font files and their licence |
| `pages/question-credits.html` | Photo authors, source links and licences |

The mockup uses four answers, but the supplied question list uses three. This page follows the question list. The five primary capital questions are used; the optional Prague, Lisbon and Paris alternatives are not part of the active dataset.

## Design decisions

- Poppins; a blue gradient; rounded white answer buttons with a minimum height of 54 px and 12 px spacing.
- The gradient starts at `#126FAB` instead of the lighter mockup colour so white text can meet WCAG AA. The lower colour is `#3B5ADC`; answer text is `#364BC1` on white.
- The page is designed for iPhone, using the 390 × 844 Figma frame as its reference. It uses three width breakpoints: 375 px, 480 px and 768 px. Larger windows show the same narrow mobile card, not a wide desktop redesign. Long content and short screens scroll instead of being clipped behind the footer.
- Native buttons support Tab, Enter and Space. Visible focus is included now. Selected-answer blue, answer checking and feedback are deliberately deferred.
- Image descriptions describe the visual clue without stating the answer. Photo credits are visible and linked; the full credits page explicitly warns that it reveals locations.
- The footer reuses existing team icon assets but has isolated layout styles, so it does not change the other pages.

## Data model

The JSON root contains `schemaVersion`, `categories` and `questions`. Each category has an `id`, display `name` and `difficulty`. Each question has:

- `id`: stable unique question ID.
- `category`: one of `capitals`, `sports`, `artists`, matching the Home page's `data-topic` values.
- `question`: English prompt.
- `image`: `null` for text questions, otherwise `src`, `alt`, `author`, `authorUrl`, `sourceUrl`, `license` and `licenseUrl`.
- `answers`: three objects containing stable `id` and display `text`.
- `correctAnswerId`: an ID from that question's answers, not an array position.

Image paths are relative to `pages/questions.html`. Fetch the data from `../data/questions.json`. The correct answer is first in the supplied data; shuffle a copy of the answers in JavaScript and continue comparing IDs. This is a client-side learning quiz, not a secure examination system.

## JavaScript handoff — not implemented yet

1. Agree the start-page route with the teammate responsible for Home, for example `questions.html?category=sports`. The current static preview does **not** read this parameter.
2. Use separate ES modules for loading/validating data, quiz state/timing, DOM rendering and localStorage. No frameworks are needed.
3. Load the requested category with `fetch` and `async`/`await`. Handle failed requests and empty or invalid data.
4. Render text with `textContent`. Update `#question-category`, `#question-title`, `#answer-list`, `#question-progress`, `#question-number`, `#quiz-score` and the image/credit elements. Hide `#question-picture` for a question whose image is `null` and use the text-only layout.
5. Listen to the answer buttons. Add the requested selected-answer blue with a non-colour cue and correct accessibility state; prevent repeated scoring. Provide feedback that does not rely on colour alone.
6. Update the progress circle, move focus to `#question-title` when the question changes, and make feedback available to screen readers.
7. Agree the round time limit with the team. `02:00` is only a suggested static display today, not a running countdown or a decided specification. Implement one deadline for the whole quiz and handle expiry once.
8. Save the agreed result object to localStorage and route to the team's result view. Agree the storage key and shape before connecting Scoreboard.
9. Confirm before leaving an active quiz; the static Home/quit links currently navigate immediately.
10. Remove the preview notice only after gameplay is implemented and keyboard-tested.

The app is not yet playable end to end. A click on an answer currently has no scoring or progression effect; it is a real HTML button ready for the later listener.

## Before review and submission

- Samuel should read and understand the HTML, CSS and JSON and make any required adjustments before submitting.
- The team should verify all question wording and answers. The football question means a full team at the start of a match, before substitutions, dismissals or injuries change who is on the field.
- Export the original Figma design and grayscale planning wireframes into the repository. Those original exports are not included here; do not label a later drawing as prior planning.
- Agree the timer and storage contract, and connect Home to Questions after the JavaScript stage.
- Check all team pages, not only Questions, with the HTML validator, keyboard, console and a screen reader.
- Review a pull request from `Samuel` to `main`. A teammate must review it before merging. Do not push these changes directly to `main`.

## AI assistance

Codex assisted with the Questions HTML/CSS, structuring the user-supplied questions as JSON, finding licensed photos and checking the implementation. Samuel supplied the design and quiz content. Automated checks and their actual outcomes should be recorded in the pull request; Samuel and a teammate still need to review the code and test the finished gameplay. No claim is made that this contribution was written without AI assistance.

## Checks performed — 28 October 2026

- W3C Nu HTML Checker: zero errors or warnings for `questions.html` and `question-credits.html`.
- Browser viewport widths: 320, 375, 390, 430, 480, 768 and 1280 px. No horizontal overflow; the footer follows the answer list. This is viewport testing, not testing on physical iPhone hardware.
- At 390 × 844, the answers measure 334 × 54 px. On larger windows the card remains 390 px wide.
- All visible images loaded, and all five downloaded city photos were visually inspected.
- Tab moves between answer buttons with a visible 3 px focus outline. Enter does not submit or navigate accidentally. Full keyboard gameplay is still pending JavaScript.
- No browser console errors were observed in the Questions preview.
- JSON checks: 15 unique question IDs, 5 questions per category, 3 unique answer IDs per question, a matching correct answer and existing image paths.
- Calculated text contrast: white against the gradient endpoints is 5.40:1 and 5.70:1; answer text against white is 7.16:1; navigation text against white is 6.81:1.
- `git diff --check` passed. These checks do not certify unrelated team pages or the unfinished application.
