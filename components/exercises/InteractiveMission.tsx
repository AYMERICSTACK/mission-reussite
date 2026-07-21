"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { MissionLogo } from "@/components/brand/MissionLogo";
import { persistAttempt } from "@/lib/progress/remote-progress";
import type { ChildKey } from "@/lib/progress/types";
import { CharacterPortrait, type CharacterExpression, type CharacterId } from "@/components/illustrations/CharacterPortrait";
import { WorldScene, type WorldSceneId } from "@/components/illustrations/WorldScene";
import type { AdaptiveSkillProfile } from "@/lib/pedagogy/adaptive-learning";
import { ambienceFromWorld } from "@/lib/audio/ambience";
import { gentleVibration, playSound, setAmbience, stopAmbience } from "@/lib/audio/audio-engine";
import { Burst } from "@/components/effects/Burst";
import { ConfettiLite } from "@/components/effects/ConfettiLite";
import { FloatingXP } from "@/components/effects/FloatingXP";
import { Glow } from "@/components/effects/Glow";
import { Sparkles } from "@/components/effects/Sparkles";
import { getLevelUpResult } from "@/lib/game/levels";
import { TutorialOverlay } from "@/components/tutorial/TutorialOverlay";

type Tone = "ce2" | "sixth";
type Choice = { label: string; value: string };
type Step = { eyebrow: string; title: string; instruction: string; choices: Choice[]; answer: string; success: string; hint: string };
type InteractiveMissionProps = {
  child: ChildKey;
  missionId: string;
  skill: string;
  tone: Tone;
  firstName: string;
  grade: string;
  title: string;
  category: string;
  duration: string;
  xp: number;
  story: string;
  companion: string;
  companionRole: string;
  steps: Step[];
  backHref: string;
  adventureWorld?: string;
  adventureStage?: string;
  adventureReward?: string;
  adventureSceneId?: WorldSceneId;
  adventureStageScene?: string;
  adventureStageObjective?: string;
  companionCharacterId?: CharacterId;
  companionExpression?: CharacterExpression;
  novaIntroduction?: string;
  novaClosing?: string;
  novaHelpEnabled?: boolean;
  adaptiveSettings?: AdaptiveSkillProfile;
  totalXpBefore?: number;
};

function MissionIcon({ type }: { type: "book" | "math" | "brain" | "check" | "arrow" }) {
  const common = { viewBox: "0 0 24 24", width: 24, height: 24, fill: "none", stroke: "currentColor", "aria-hidden": true, focusable: false } as const;
  if (type === "book") return <svg {...common}><path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H11v17H7.5A3.5 3.5 0 0 0 4 22V5.5ZM20 5.5A3.5 3.5 0 0 0 16.5 2H13v17h3.5A3.5 3.5 0 0 1 20 22V5.5Z" /></svg>;
  if (type === "math") return <svg {...common}><path d="M4 7h6M7 4v6M14 5h6M15 15l5 5M20 15l-5 5" /></svg>;
  if (type === "brain") return <svg {...common}><path d="M9.5 4.5A3.5 3.5 0 0 0 6 8v.3A3.5 3.5 0 0 0 5 15v.5A3.5 3.5 0 0 0 8.5 19H11V5.5a3 3 0 0 0-1.5-1ZM14.5 4.5A3.5 3.5 0 0 1 18 8v.3A3.5 3.5 0 0 1 19 15v.5a3.5 3.5 0 0 1-3.5 3.5H13V5.5a3 3 0 0 1 1.5-1Z" /></svg>;
  if (type === "check") return <svg {...common}><path d="m5 12 4 4L19 6" /></svg>;
  return <svg {...common}><path d="m9 5 7 7-7 7" /></svg>;
}

export function InteractiveMission(props: InteractiveMissionProps) {
  const [started, setStarted] = useState(false);
  const [cinematicStep, setCinematicStep] = useState(0);
  const [adventureChoice, setAdventureChoice] = useState<"help" | "explore" | null>(null);
  const [memoryCount, setMemoryCount] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [validated, setValidated] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hintLevel, setHintLevel] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [mistakes, setMistakes] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [novaHelp, setNovaHelp] = useState<string | null>(null);
  const [novaQuestion, setNovaQuestion] = useState<string | null>(null);
  const [novaHelpState, setNovaHelpState] = useState<"idle" | "loading" | "error">("idle");
  const startedAt = useRef<number | null>(null);
  const savedCompletion = useRef(false);
  const currentStep = props.steps[stepIndex];
  const progress = completed ? 100 : Math.round((stepIndex / props.steps.length) * 100);
  const isCorrect = selected === currentStep?.answer;
  const companionCharacter = props.companionCharacterId ?? "nova";
  const companionExpression = props.companionExpression ?? "happy";
  const adaptivePace = props.adaptiveSettings?.pace ?? "balanced";
  const adaptiveHintMode = props.adaptiveSettings?.hintMode ?? "progressive";
  const maxHintLevel = adaptiveHintMode === "minimal" ? 2 : 3;
  const levelResult = getLevelUpResult(props.totalXpBefore ?? 0, props.xp);

  useEffect(() => {
    return () => stopAmbience(350);
  }, []);

  useEffect(() => {
    if (started && !completed) setAmbience(ambienceFromWorld(props.adventureWorld));
    if (completed) stopAmbience(500);
  }, [started, completed, props.adventureWorld]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const key = `mission-reussite:memory:${props.child}:${props.adventureWorld ?? "world"}`;
      const stored = Number(window.localStorage.getItem(key) ?? "0");
      setMemoryCount(Number.isFinite(stored) ? stored : 0);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [props.child, props.adventureWorld]);

  const cinematicLines = useMemo(() => [
    memoryCount > 0
      ? memoryCount === 1
        ? `${props.companion} se souvient de ta première victoire !`
        : `${props.companion} se souvient déjà de tes ${memoryCount} victoires !`
      : `${props.companion} vient à ta rencontre pour la première fois.`,
    props.adventureStageScene ?? props.story,
    props.adventureStageObjective
      ? `Pour avancer, voici notre objectif : ${props.adventureStageObjective}`
      : `Une nouvelle énigme se dresse sur le chemin.`,
  ], [memoryCount, props.adventureStageObjective, props.adventureStageScene, props.companion, props.story]);

  const encouragement = useMemo(() => {
    if (!validated) {
      if (adaptivePace === "gentle") return "Ton parcours ralentit un peu : relis tranquillement, puis avance étape par étape.";
      if (adaptivePace === "challenge") return "Tu sembles prêt pour un défi : essaie d’abord sans indice et vérifie ton raisonnement.";
      return props.tone === "ce2" ? "Prends ton temps : les meilleurs explorateurs relisent toujours une deuxième fois." : "Lis précisément chaque mot avant de choisir ta réponse.";
    }
    return isCorrect ? currentStep.success : currentStep.hint;
  }, [adaptivePace, validated, isCorrect, currentStep, props.tone]);

  function progressiveHint() {
    if (!currentStep) return "";
    if (hintLevel <= 1) return `Commence par reformuler la consigne : ${currentStep.instruction}`;
    if (hintLevel === 2) return currentStep.hint;
    const correctChoice = currentStep.choices.find((choice) => choice.value === currentStep.answer);
    return correctChoice ? `Dernier coup de pouce : observe particulièrement « ${correctChoice.label} » et explique pourquoi ce choix respecte la consigne.` : currentStep.hint;
  }

  function requestHint() {
    setShowHint(true);
    setHintLevel((value) => {
      const next = Math.min(maxHintLevel, value + 1);
      if (next > value) setHintsUsed((count) => count + 1);
      return next;
    });
  }

  function validateAnswer() {
    if (!selected) return;
    setValidated(true);
    if (isCorrect) {
      playSound("correct");
      gentleVibration(14);
    } else {
      playSound("error");
      gentleVibration([10, 32, 10]);
      setMistakes((value) => value + 1);
      if (!showHint) requestHint();
    }
  }

  async function askNovaForHelp() {
    if (!selected || !props.novaHelpEnabled || novaHelpState === "loading") return;
    const cacheKey = `mission-reussite:nova-help:${props.missionId}:${stepIndex}:${selected}`;
    const cached = window.sessionStorage.getItem(cacheKey);
    if (cached) {
      try {
        const parsed = JSON.parse(cached) as { message: string; questionToThink: string };
        setNovaHelp(parsed.message);
        setNovaQuestion(parsed.questionToThink);
        return;
      } catch {
        window.sessionStorage.removeItem(cacheKey);
      }
    }

    setNovaHelpState("loading");
    try {
      const response = await fetch("/api/nova/help", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ child: props.child, missionId: props.missionId, stepIndex, selectedValue: selected }),
      });
      const data = await response.json() as { help?: { message: string; questionToThink: string }; error?: string };
      if (!response.ok || !data.help) throw new Error(data.error || "Nova ne peut pas répondre pour le moment.");
      window.sessionStorage.setItem(cacheKey, JSON.stringify(data.help));
      setNovaHelp(data.help.message);
      setNovaQuestion(data.help.questionToThink);
      setHintsUsed((value) => value + 1);
      setNovaHelpState("idle");
    } catch {
      setNovaHelpState("error");
    }
  }

  function nextStep() {
    if (!isCorrect) {
      setValidated(false);
      setSelected(null);
      return;
    }
    if (stepIndex === props.steps.length - 1) {
      setCompleted(true);
      playSound("chest");
      window.setTimeout(() => playSound("xp"), 260);
      gentleVibration([18, 45, 24]);
      if (!savedCompletion.current) {
        savedCompletion.current = true;
        const durationSeconds = Math.max(1, Math.round((Date.now() - (startedAt.current ?? Date.now())) / 1000));
        const attempt = {
          id: crypto.randomUUID(),
          child: props.child,
          missionId: props.missionId,
          missionTitle: props.title,
          category: props.category,
          skill: props.skill,
          grade: props.grade,
          xp: props.xp,
          correctAnswers: props.steps.length,
          totalQuestions: props.steps.length + mistakes,
          mistakes,
          hintsUsed,
          durationSeconds,
          completedAt: new Date().toISOString(),
        };
        const memoryKey = `mission-reussite:memory:${props.child}:${props.adventureWorld ?? "world"}`;
        const nextMemory = memoryCount + 1;
        window.localStorage.setItem(memoryKey, String(nextMemory));
        setMemoryCount(nextMemory);
        setSaveState("saving");
        void persistAttempt(attempt)
          .then(() => setSaveState("saved"))
          .catch((error) => {
            console.error(error);
            setSaveState("error");
          });
      }
      return;
    }
    setStepIndex((value) => value + 1);
    setSelected(null);
    setValidated(false);
    setShowHint(false);
    setHintLevel(0);
    setNovaHelp(null);
    setNovaQuestion(null);
    setNovaHelpState("idle");
  }

  return (
    <main className={`exercise-shell exercise-shell--${props.tone}`}>
      <TutorialOverlay childSlug={props.child} page="mission" />
      <header className="exercise-topbar">
        <Link href={props.backHref} className="exercise-logo" aria-label="Retour au parcours"><MissionLogo compact /></Link>
        <div className="exercise-progress-wrap">
          <div className="exercise-progress-label"><span>Progression de la mission</span><strong>{progress}%</strong></div>
          <div className="exercise-progress"><span style={{ width: `${progress}%` }} /></div>
        </div>
        <div className="exercise-xp">+{props.xp} XP</div>
      </header>

      {!started ? (
        <section className="living-adventure">
          <Glow className="living-adventure__audio-glow" />
          <Sparkles count={10} />
          <Link href={props.backHref} className="exercise-back living-adventure__back">← Retour à mon parcours</Link>
          <div className="living-adventure__scene">
            {props.adventureSceneId ? <WorldScene scene={props.adventureSceneId} className="living-adventure__world" priority /> : null}
            <div className="living-adventure__veil" />
            <CharacterPortrait
              className="living-adventure__character"
              character={companionCharacter}
              expression={cinematicStep === 1 ? "curious" : companionExpression}
              size="large"
              label={`${props.companion}, ${props.companionRole}`}
            />
            <div className="living-adventure__location">
              <span>{props.adventureWorld ?? "Mission Réussite"}</span>
              <strong>{props.adventureStage ?? props.category}</strong>
            </div>
          </div>

          <div className="living-adventure__dialogue" aria-live="polite">
            <div className="living-adventure__speaker">
              <CharacterPortrait character={companionCharacter} expression={companionExpression} size="small" />
              <div><span>{props.companionRole}</span><strong>{props.companion}</strong></div>
            </div>
            <p>« {cinematicLines[cinematicStep]} »</p>

            {cinematicStep < cinematicLines.length - 1 ? (
              <button type="button" onClick={() => { playSound("character"); setCinematicStep((value) => value + 1); }}>Continuer <MissionIcon type="arrow" /></button>
            ) : !adventureChoice ? (
              <div className="living-adventure__choices">
                <button type="button" onClick={() => setAdventureChoice("help")}><span>🤝</span><strong>Aider {props.companion}</strong><small>Suivre l’indice principal</small></button>
                <button type="button" onClick={() => setAdventureChoice("explore")}><span>🧭</span><strong>Explorer les alentours</strong><small>Observer avant d’agir</small></button>
              </div>
            ) : (
              <div className="living-adventure__mission">
                <span className="exercise-kicker">{adventureChoice === "help" ? "Tu choisis d’aider" : "Tu choisis d’explorer"}</span>
                <h1>{props.title}</h1>
                <p>{adventureChoice === "help" ? props.story : `En observant les environs, tu découvres un nouvel indice : ${props.story}`}</p>
                <button type="button" onClick={() => { playSound("transition"); startedAt.current = Date.now(); savedCompletion.current = false; setStarted(true); }}>Commencer la quête <MissionIcon type="arrow" /></button>
              </div>
            )}
          </div>
        </section>
      ) : completed ? (
        <section className="exercise-complete">
          <ConfettiLite active />
          <Burst active className="exercise-complete__burst" />
          <FloatingXP xp={props.xp} active />
          <div className="living-reward" aria-hidden="true">
            <CharacterPortrait character={companionCharacter} expression="proud" size="medium" />
            <span className="living-reward__chest">🎁</span>
            <Glow className="living-reward__glow" />
            <Sparkles count={14} className="living-reward__sparkles" />
            <span className="living-reward__spark living-reward__spark--one">✦</span>
            <span className="living-reward__spark living-reward__spark--two">✦</span>
          </div>
          <span className="exercise-kicker">Mission accomplie · souvenir enregistré</span>
          <h1>Bravo {props.firstName} !</h1>
          <p>{props.novaClosing ?? "Tu as terminé toutes les étapes en prenant le temps de comprendre. C’est exactement la bonne méthode."}</p>
          <div className="complete-reward"><strong>+{props.xp} XP</strong><span>{saveState === "saving" ? "enregistrement de ta progression…" : saveState === "error" ? "sauvegardés sur cet appareil — synchronisation à réessayer" : "ajoutés à ta progression"}</span></div>
          <div className={`level-up-card ${levelResult.leveledUp ? "is-level-up" : ""}`}>
            <span className="level-up-card__symbol" aria-hidden="true">{levelResult.after.symbol}</span>
            <div>
              <small>{levelResult.leveledUp ? "NIVEAU SUPÉRIEUR !" : levelResult.after.title}</small>
              <strong>Niveau {levelResult.after.level}</strong>
              <p>{levelResult.leveledUp ? levelResult.after.reward : `${levelResult.after.xpInLevel}/${levelResult.after.xpNeeded} XP vers le prochain niveau`}</p>
              <div className="level-up-card__bar"><span style={{ width: `${levelResult.after.percent}%` }} /></div>
            </div>
          </div>
          {props.adventureReward ? <div className="complete-story-reward"><span aria-hidden="true">✨</span><p><small>Fragment de quête ajouté au sac</small>Continue les aventures de ce lieu pour révéler <strong>{props.adventureReward}</strong>.</p></div> : null}
          <p className="living-memory">{props.companion} se souviendra de cette victoire lors de ta prochaine visite.</p>
          {props.adventureReward ? <div className="living-treasure"><span>Trésor du lieu</span><strong>{props.adventureReward}</strong></div> : null}
          <div className="complete-actions">
            <Link href={props.backHref}>Retour au tableau de bord</Link>
            <button type="button" onClick={() => { setCompleted(false); setStarted(false); setStepIndex(0); setSelected(null); setValidated(false); setShowHint(false); setHintLevel(0); setMistakes(0); setHintsUsed(0); setNovaHelp(null); setNovaQuestion(null); setNovaHelpState("idle"); setSaveState("idle"); setCinematicStep(0); setAdventureChoice(null); startedAt.current = null; savedCompletion.current = false; }}>Rejouer la mission</button>
          </div>
        </section>
      ) : (
        <section className="exercise-stage">
          <div className="exercise-stage-main">
            <div className="exercise-story-card"><span>Le texte de la mission</span><p>{props.story}</p></div>
            <article className="exercise-question-card">
              <div className="exercise-step-meta"><span>Étape {stepIndex + 1} sur {props.steps.length}</span><em>{currentStep.eyebrow}</em></div>
              <h1>{currentStep.title}</h1>
              <p>{currentStep.instruction}</p>
              <div className="exercise-choices">
                {currentStep.choices.map((choice, index) => {
                  const state = validated && choice.value === selected ? (isCorrect ? "is-correct" : "is-wrong") : selected === choice.value ? "is-selected" : "";
                  return <button key={choice.value} type="button" className={state} onClick={() => { if (!validated || !isCorrect) { setSelected(choice.value); setValidated(false); } }}><span>{String.fromCharCode(65 + index)}</span>{choice.label}{validated && choice.value === selected && <MissionIcon type={isCorrect ? "check" : "arrow"} />}</button>;
                })}
              </div>
              <div className="exercise-actions">
                {!validated ? <button type="button" disabled={!selected} onClick={validateAnswer}>Valider ma réponse</button> : <button type="button" onClick={nextStep}>{isCorrect ? (stepIndex === props.steps.length - 1 ? "Terminer la mission" : "Étape suivante") : "Réessayer"}<MissionIcon type="arrow" /></button>}
                {!validated && <button className="exercise-hint-button" type="button" onClick={requestHint} disabled={hintLevel >= maxHintLevel}>{hintLevel ? `Indice ${hintLevel}/${maxHintLevel}` : "Un indice"}</button>}
              </div>
            </article>
          </div>
          <aside className={`exercise-coach ${validated ? (isCorrect ? "is-success" : "is-help") : ""}`}>
            <div className="companion-avatar">{props.companion.slice(0, 1)}</div>
            <span>{props.companion} te conseille</span>
            <p>{showHint && !validated ? progressiveHint() : encouragement}</p>
            <div className={`adaptive-coach adaptive-coach--${adaptivePace}`}><strong>{adaptivePace === "gentle" ? "Mode guidé" : adaptivePace === "challenge" ? "Mode défi" : "Rythme équilibré"}</strong><span>{props.adaptiveSettings?.reason ?? "Le parcours observe ta façon d’apprendre."}</span></div>
            {validated && !isCorrect && props.novaHelpEnabled ? (
              <div className="nova-coach-help">
                {novaHelp ? (
                  <>
                    <strong>Nova te l’explique autrement</strong>
                    <p>{novaHelp}</p>
                    <em>{novaQuestion}</em>
                  </>
                ) : (
                  <button type="button" onClick={askNovaForHelp} disabled={novaHelpState === "loading"}>
                    {novaHelpState === "loading" ? "Nova réfléchit…" : novaHelpState === "error" ? "Réessayer avec Nova" : "Nova peut me guider"}
                  </button>
                )}
                <small>Nova intervient seulement quand tu lui demandes.</small>
              </div>
            ) : null}
            <div className="exercise-method">{props.steps.map((step, index) => <div key={step.title} className={index < stepIndex ? "is-done" : index === stepIndex ? "is-current" : ""}><span>{index < stepIndex ? "✓" : index + 1}</span><p>{step.eyebrow}</p></div>)}</div>
          </aside>
        </section>
      )}
    </main>
  );
}
