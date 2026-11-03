# Time-to-Find

Time to Find is a React/Vite detective investigation game. The application now opens with a case library where players choose one of 20 independent case files and select Easy, Standard, or Hard difficulty before entering the investigation desk.

## Run locally

```bash
npm install
npm run dev
```

The original Power Apps `.msapp` file and its image assets were not present in the supplied workspace, so this repository does not claim to have extracted or preserved those unavailable source assets. The case content is currently data-driven in `src/main.jsx` and the visual evidence cards are intentionally generated interface treatments rather than representations of files that were not supplied.

## Current scope

- 20 selectable case files, including Marianne Reed as the introductory case
- Difficulty selection changes investigation time and penalty profile
- 12 evidence records per case across CCTV, phone, people, location, forensic, document, and vehicle categories
- Every generated evidence record exposes image, audio, and video modes in the evidence viewer
- Timeline, suspect profiles, accusation outcomes, reset flow, and responsive noir visual system

The image, audio waveform, and CCTV playback treatments are procedurally generated in the browser so the prototype remains self-contained. They are not claims of extracted original Power Apps assets. The original `.msapp` source is still required to verify the original narrative, murderer, and case-specific visual assets before production content is finalized.