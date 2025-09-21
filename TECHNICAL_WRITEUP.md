# 🧠 Cortex: AI Parameter Lab — Technical Writeup (PDF-Ready)

- **Version**: Submission v1.0
- **Team**: Cortex, UNSW CSE / Day of AI AU
- **Contact**: z5467655@ad.unsw.edu.au
- **Repo**: [GitHub URL]
- **Live Demo**: [URL]
- **Video (<= 3 min)**: [YouTube URL]

## 📋 Abstract

- **Cortex: AI Parameter Lab** is a browser-based, GenAI-powered learning game for Years 7–10 that teaches AI literacy by letting students shape images with safe, scaffolded prompts and parameters.
- Players advance from vocabulary precision to parameter mastery while the built-in “Why?” panel explains outcomes in plain English.
- The game is fun and classroom-ready: Safe Mode eliminates free text by default for safety, levels encode key AI concepts, and costs are controlled via fixed base images and selective API calls.

## 🎯 Learning Goals

- **Vocabulary Precision**: Show how different words trigger different model priors (Level 2).
- **Model Limits & Hallucination**: Spotlight impossible requests, then reflect (Level 3).
- **Parameter Control**: Creativity slider (temperature) and style weight to direct outputs (Levels 6–10).
- **Explainability & Critical Thinking**: The “Why?” system translates parameter effects into student-friendly guidance.
- **Cross-Disciplinary Hooks**: History of computing (Ada Lovelace), space history (Apollo 11), math (Fibonacci), and design (Bauhaus).

## 🔧 System Overview

- Pure client-side web app: HTML/CSS/Vanilla JS with modular files.
- GenAI integration via Google Gemini 2.5 Flash Image API for generation and image-edit.
- Classroom safe by default: Safe Mode prompt builder (no free text). Free text is reserved for teacher/demo runs and can be hidden in competition deployments.

## 🏗️ Architecture

- **Core modules**:
    - `js/app.js`: Game state, UI flow, Safe Mode builder, generation/validation, “Why?” invocation.
    - `js/levels.js`: Level definitions, Safe Mode vocab, requirements, hints; includes upgraded L9–L10.
    - `js/api.js`: Gemini integration (generateImageEdit, demo fallback), base image fetch + MIME handling.
    - `js/explanation.js`: Explanation engine: ProphetMode (keyword reasons) + ParameterAnalyst (parameter insights).
    - `js/audio.js`: SFX; `style.css`: Gumroad-like playful design; `assets/`: fixed images, icons.
- **Navigation & UX**:
    - History API for shareable URLs and back button support (`window.hash #level=n`).
    - Fixed base image for Level 1 to preserve context and reduce API usage.
- **File references**:
    - Image-edit API: `js/api.js:95`, `js/api.js:140-168`
    - SVG→PNG safety conversion: `js/app.js:818-838`, `js/app.js:861-868`
    - Level 1 edit flow: `js/app.js:810-840`
    - Safe Mode population/use: `js/app.js:420-560`, `js/levels.js` per-level `safeModeOptions`

## 🤖 GenAI Integration

- **Image Edit (Level 1)**: Use base image + instruction. If base is SVG, convert to PNG and set correct MIME to avoid API errors.
    - MIME-safe loader returns `{ base64, mimeType }`, and falls back to canvas PNG if needed.
- **Prompt Engineering**:
    - Safe Mode composes: `coreElements` + `actionsMethods` + `solutionsTools`.
    - Free Text (teacher/demo only) composes directly; style guidance applied via `getStyledPrompt`.
- **Parameters**:
    - Creativity slider → `temperature` in `[0, 2]` (`creativity / 50.0`) in `js/app.js` generation path.
    - Style weight slider modifies textual style scaffolding (from subtle to dominant).

## 🛡️ Safety & Compliance

- **No Free Text by Default**: Safe Mode is the default student flow. For competition/classroom builds, hide the free-input toggle and start in Safe Mode.
    - **Deployment note**: Ensure the UI ships with Safe Mode active and the free-input button hidden/removed. This avoids unrestricted text I/O.
- **Curated Vocabulary**: Age-appropriate, level-aligned Safe Mode sets for Levels 2–10, including deliberate “bad” options to teach prompt quality.
    - Example L2 “good”: “an oversized umbrella,” “a shade sail canopy.” “Bad”: “a portable flamethrower.”
    - See `js/levels.js:74-96` (L2) and analogous blocks for other levels.
- **Content Boundaries**:
    - Fixed base images and strongly constrained prompt templates reduce risk of unsafe outputs.
    - If using online APIs, add server-side proxy and keyword filtering (future work) for institutional deployments.

## 🤔 Explainability ("Why?" Panel)

- **Modes**:
    - **ProphetMode**: Simple causal explanations from recognized keywords.
    - **ParameterAnalyst**: Actionable coaching for sliders and style blending; shows synergy profiles (safe/balanced/high-contrast combos).
- **English Guidance with Targeted Tips**:
    - Example: “Treat this as a studio session with Bauhaus. Push creativity past 70% and try contrasting metaphors for time.”
    - Implementation: `js/explanation.js:286-305`
- **Critical Thinking Prompts**:
    - Bias, hallucination, and “AI doesn’t truly understand” are embedded as rotating educational callouts.

## 🎮 Levels & Curriculum Highlights

- **Level 2: “Shade the people” — Vocabulary Precision**
    - Good: “oversized umbrella,” “shade sail canopy,” “mature shade tree.”
    - Bad: “portable flamethrower,” “giant heat lamp.”
    - Safe Mode: `js/levels.js:74-96`
    - *[Screenshot: L2 Safe Mode dropdowns showing good vs bad options]*
- **Level 3: “Three-legged cat” — Hallucination Awareness**
    - Good: “custom prosthetic,” “mobility harness,” “rehabilitation team.”
    - Bad: “rocket boosters,” “chaotic dog chase scene.”
    - Safe Mode: `js/levels.js:115-135`
    - *[Screenshot: L3 output and “Why?” explaining limits]*
- **Level 6–8: Parameter Control & Style Weight**
    - Creativity thresholds and style blending; vintage café styling via props/lighting/materials.
    - Safe Mode: `js/levels.js:299-336`
    - *[Screenshot: Sliders at 30% vs 70% and visual difference]*
- **Level 9: Ada Lovelace x Cyberpunk London — Historical Remix**
    - Good: “Ada Lovelace,” “Analytical Engine,” “neon light trails,” “steampunk gears.”
    - Off-theme: “medieval dragon,” “muddy construction cranes.”
    - Safe Mode: `js/levels.js:357-384`
    - *[Screenshot: L9 final + “Why?” coaching]*
- **Level 10: Apollo 11 x Bauhaus Data Mural — Data + Math + Design**
    - Good: “glowing Fibonacci spirals,” “binary code grid,” “Bauhaus geometric shapes.”
    - Off-theme: “rainy city traffic jam,” “random graffiti tags.”
    - Safe Mode: `js/levels.js:394-422`
    - *[Screenshot: L10 composition emphasizing geometric motifs]*

## UX & Accessibility

- Instant feedback loops with hints and Safe Mode chips to reduce typing.
- History API for shareable states and sane back button behavior.
- Visual focus: high-contrast badges, large tap targets, minimal reading load.
- **Accessibility recommendations**:
    - Keyboard navigation for chips and sliders.
    - Alt text for generated images and base images.
    - Color contrast audit for yellow/teal combinations (WCAG AA).

## ⚙️ Key Technical Details

- **SVG-to-PNG Conversion for Edits**:
    - **Problem**: Image-edit API rejects mislabeled SVG bytes.
    - **Fix**: Detect SVG, render to canvas, export PNG, pass `image/png` to API.
    - **Code**: `js/app.js:818-838`, `js/app.js:861-868`, `js/api.js:152-168`
- **Instruction Augmentation (Level 1 Rescue Intent)**:
    - If user’s edit plausibly helps the cat reach ground, the instruction encourages repositioning the cat on ground and making success visible.
    - **Code**: `js/app.js:822-832`
- **Cost Control**:
    - Fixed base images where possible; generate on click only.
    - 1024×1024 outputs; no auto-regeneration loops.

## Deployment & Configuration

- **Local**:
    - Open `index.html` or use a lightweight server (to avoid CORS).
    - Add API key in `js/api.js` if using live generation.
- **Demo Mode**:
    - Without API key, the app uses educational SVG fallbacks with full explanation flow intact.
- **Competition/Classroom Profile**:
    - Ensure Safe Mode is the only visible input pathway (hide Free Text button/toggle).
    - Preload fixed base assets; test L2–L10 Safe Mode vocab for clarity.

## Testing & Validation

- **Functional**:
    - L1 edit path, SVG→PNG, MIME correctness.
    - Parameter gates for levels with thresholds (creativity/style) checked in `checkWinCondition`: `js/app.js:1030-1100`
- **UX**:
    - History navigation works across levels; no broken states.
    - “Why?” panel displays level-specific English insights (`js/explanation.js:291-302`).
- **Teacher Acceptance**:
    - One-session pilot: students can pass Levels 1–5 with Safe Mode only.
    - Comparisons of good vs bad prompt blocks produce learnable differences.

## Limitations

- Browser-only inference means latency depends on the external API.
- No server-side content moderation included in this repo—recommended for district deployments.
- “Agentic” auto-demo possible via scripting, but live manual demo yields tighter narrative control and avoids variance in generative outputs.

## Future Work

- **Classroom lock**: code-level flag to fully remove free text UI in builds (competition profile).
- **Server proxy with moderation** (blocked-term lists, category filters).
- **Telemetry for teachers** (time-on-task, slider usage heatmaps).
- **Additional levels**: data bias, adversarial prompts, human-in-the-loop review.

---

## Appendix A — Code Map

- **Frontend**:
    - `index.html`: Shell and containers.
    - `style.css`: UI components and accessibility tweaks.
    - `js/app.js`: State, UI handlers, generation, results, success flow, history API.
    - `js/levels.js`: Level configs, Safe Mode sets, thresholds, hints.
    - `js/explanation.js`: ProphetMode + ParameterAnalyst (explainability).
    - `js/api.js`: Live API integration and demo SVG generator.
    - `assets/`: Base images (e.g., `assets/images/level1_base.svg`) and docs.

---

## Appendix B — Build & Run

- **Dev**:
    - Run with VS Code Live Server or any static server.
    - In `js/api.js`, set `API_KEY` and `API_URL` if using live API.
- **Competition Demo**:
    - Start in Safe Mode; hide free-input UI.
    - Record with OBS; use macOS zoom (Control + scroll) to focus on sliders and “Why?” panel.

---

## Appendix C — Figures (Insert Later)

- *[Figure 1: Home screen + Level Select]*
- *[Figure 2: Level 2 Safe Mode with “good vs bad” shade prompts]*
- *[Figure 3: Level 3 output + “Why?” hallucination note]*
- *[Figure 4: Sliders at 30% vs 70% (side-by-side)]*
- *[Figure 5: Level 9 Ada Lovelace cyber mural result]*
- *[Figure 6: Level 10 Apollo Bauhaus data mural result]*
- *[Figure 7: “Why?” panel with actionable tips]*

---

## Appendix D — Submission Links (Fill In)

- **Public video**: [YouTube URL]
- **GitHub repository**: [URL]
- **Live demo**: [URL]
- **PDF (this document)**: [Drive/Link]
