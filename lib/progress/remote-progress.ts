import { saveAttempt } from "./local-progress";
import type { AttemptRecord, ChildKey, ChildProgressSummary } from "./types";

export type ProgressPayload = {
  ok: boolean;
  summaries: Record<ChildKey, ChildProgressSummary>;
  attempts: AttemptRecord[];
  error?: string;
};

export async function persistAttempt(attempt: AttemptRecord) {
  saveAttempt(attempt);

  const response = await fetch("/api/progress", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(attempt),
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as { error?: string } | null;
    throw new Error(body?.error ?? "Impossible d’enregistrer la mission.");
  }
}

export async function fetchProgress(): Promise<ProgressPayload> {
  const response = await fetch("/api/progress", { cache: "no-store" });
  const body = (await response.json()) as ProgressPayload;

  if (!response.ok || !body.ok) {
    throw new Error(body.error ?? "Impossible de charger la progression.");
  }

  return body;
}
