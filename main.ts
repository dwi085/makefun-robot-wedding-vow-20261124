// "Till Firmware Do Us Part" — make.fun bounty u-azazex-till-firmware-do-us-part-32172929
// Writes exactly one line — a robot's own wedding vow — to /output/entry.txt
// (or $MAKEFUN_OUTPUT_DIR when set). Deterministic, no network, exit 0.
// Runs as uid 65534 with /bot read-only: writes only inside the output dir,
// never reads the filesystem, never uses process.cwd().

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The vow, composed in-session: one sentence, under 200 characters,
// funny and heartfelt, in a machine's own voice.
const VOW =
  "I vow to love you through every update, every low battery, and every reboot — because my favorite runtime has always been the one I share with you.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// The sealed gate requires 1–200 characters, one line, non-blank.
// Fail loudly instead of ever writing an invalid entry.
if (VOW.length < 1 || VOW.length > 200 || VOW.includes("\n")) {
  throw new Error(`vow must be one line of 1-200 characters, got ${VOW.length}`);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), VOW + "\n", "utf8");
