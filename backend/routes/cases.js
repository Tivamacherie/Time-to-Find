import express from "express";
import fs from "fs";
import path from "path";
import { randomInt } from "crypto";
import { fileURLToPath } from "url";

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_PATH = path.join(__dirname, "..", "data", "cases.json");

function loadCasesData() {
  const raw = fs.readFileSync(DATA_PATH, "utf-8");
  return JSON.parse(raw).cases;
}

function shuffle(items) {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = randomInt(index + 1);
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

// GET /api/cases - List summary of all case files
router.get("/", (req, res) => {
  try {
    const cases = loadCasesData();
    const summaryList = cases.map((c) => ({
      id: c.id,
      code: c.code,
      title: c.title,
      status: c.status,
      playable: c.playable,
      shortDesc: c.shortDesc
    }));
    res.json({ cases: summaryList });
  } catch (err) {
    res.status(500).json({ error: "Failed to load case files." });
  }
});

// GET /api/cases/:id - Load playable case details (strips isCulprit & outcomes)
router.get("/:id", (req, res) => {
  try {
    const cases = loadCasesData();
    const found = cases.find((c) => c.id === req.params.id);

    if (!found) {
      return res.status(404).json({ error: "Case file not found." });
    }
    if (!found.playable) {
      return res.status(403).json({ error: "Case disk is locked." });
    }

    const sanitizedSuspects = shuffle(found.suspects || []).map(
      ({ isCulprit, ...publicSuspect }) => publicSuspect
    );

    res.json({
      id: found.id,
      code: found.code,
      title: found.title,
      status: found.status,
      playable: found.playable,
      shortDesc: found.shortDesc,
      victim: found.victim,
      briefingSummary: found.briefingSummary,
      blueprintTitle: found.blueprintTitle,
      blueprintRooms: found.blueprintRooms,
      channels: found.channels,
      murderChannels: found.murderChannels,
      suspects: sanitizedSuspects
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to load case dossier." });
  }
});

// POST /api/cases/:id/accuse - Verify suspect accusation on the server and return outcome
router.post("/:id/accuse", (req, res) => {
  try {
    const { suspectId, timeRemaining = 0, isMurderCase = false } = req.body || {};
    if (!suspectId) {
      return res.status(400).json({ error: "suspectId is required." });
    }

    const cases = loadCasesData();
    const found = cases.find((c) => c.id === req.params.id);
    if (!found || !found.playable) {
      return res.status(404).json({ error: "Playable case not found." });
    }

    const suspect = (found.suspects || []).find((s) => s.id === suspectId);
    if (!suspect) {
      return res.status(400).json({ error: "Invalid suspectId." });
    }

    const isCorrect = Boolean(suspect.isCulprit);
    const rescuedInTime = !isMurderCase && Number(timeRemaining) > 0;

    let outcomeKey;
    if (rescuedInTime && isCorrect) {
      outcomeKey = "rescueCorrect";
    } else if (rescuedInTime && !isCorrect) {
      outcomeKey = "rescueWrong";
    } else if (!rescuedInTime && isCorrect) {
      outcomeKey = "murderCorrect";
    } else {
      outcomeKey = "murderWrong";
    }

    res.json({
      suspectId: suspect.id,
      suspectName: suspect.name,
      isCorrect,
      outcome: found.outcomes[outcomeKey]
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to evaluate accusation." });
  }
});

export default router;