"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { persistAttempt } from "@/lib/progress/remote-progress";
import type { ChildKey } from "@/lib/progress/types";
import type { BossBattleConfig } from "@/lib/game/boss-battles";
import { playSound, gentleVibration } from "@/lib/audio/audio-engine";
import { ConfettiLite } from "@/components/effects/ConfettiLite";
import { Burst } from "@/components/effects/Burst";
import { FloatingXP } from "@/components/effects/FloatingXP";
import { Sparkles } from "@/components/effects/Sparkles";
import { getLevelUpResult } from "@/lib/game/levels";

type Choice = { label: string; value: string };
type Step = { eyebrow: string; title: string; instruction: string; choices: Choice[]; answer: string; success: string; hint: string };
type RewardState = "idle" | "claiming" | "claimed" | "already" | "error";
type Props = {
  child: ChildKey; missionId: string; skill: string; firstName: string; grade: string; title: string; category: string; xp: number; story: string; steps: Step[]; backHref: string;
  totalXpBefore?: number;
  bossBattle: BossBattleConfig & { phase: number; totalPhases: number; isFinalPhase: boolean };
};

export function BossInteractiveMission(props: Props) {
  const earnedXp = props.xp + (props.bossBattle.isFinalPhase ? props.bossBattle.reward.xpReward : 0);
  const levelResult = getLevelUpResult(props.totalXpBefore ?? 0, earnedXp);
  const [intro, setIntro] = useState(0);
  const [started, setStarted] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [validated, setValidated] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  const [bossHp, setBossHp] = useState(100);
  const [heroHp, setHeroHp] = useState(100);
  const [combo, setCombo] = useState(0);
  const [energy, setEnergy] = useState(0);
  const [attackCount, setAttackCount] = useState(0);
  const [impact, setImpact] = useState<"" | "hero" | "boss" | "critical" | "power">("");
  const [powerMessage, setPowerMessage] = useState("");
  const [defeated, setDefeated] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [endingIndex, setEndingIndex] = useState(0);
  const [chestOpened, setChestOpened] = useState(false);
  const [rewardState, setRewardState] = useState<RewardState>("idle");
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const startedAt = useRef(Date.now());
  const saved = useRef(false);
  const rewardClaimed = useRef(false);

  const step = props.steps[stepIndex];
  const correct = selected === step?.answer;
  const damageBase = Math.ceil(100 / Math.max(1, props.steps.length));
  const progress = completed ? 100 : Math.round(stepIndex / props.steps.length * 100);
  const status = useMemo(() => impact === "critical" ? "COUP CRITIQUE !" : impact === "boss" ? "ATTAQUE RÉUSSIE !" : impact === "hero" ? `${props.bossBattle.attackName} !` : impact === "power" ? props.bossBattle.powerName : "", [impact, props.bossBattle.attackName, props.bossBattle.powerName]);

  function flash(next: typeof impact) {
    setImpact(next);
    window.setTimeout(() => setImpact(""), 650);
  }

  function bossDamageFor(nextCombo: number, critical: boolean) {
    let damage = damageBase + (nextCombo - 1) * 3 + (critical ? 16 : 0);
    if (props.bossBattle.power === "roots" && attackCount < 2 && !critical) {
      damage = Math.max(5, Math.round(damage * 0.65));
      setPowerMessage("L’armure de racines absorbe une partie de l’attaque.");
    }
    if (props.bossBattle.power === "machines" && nextCombo < 2 && !critical) {
      damage = Math.max(4, Math.round(damage * 0.5));
      setPowerMessage("Le blindage adaptatif résiste. Construis un combo x2.");
    }
    return damage;
  }

  function heroDamageFor(nextMistakes: number) {
    if (props.bossBattle.power === "storm" && nextMistakes % 2 === 0) {
      setPowerMessage("Foudre en chaîne ! La deuxième erreur renforce la riposte.");
      return 28;
    }
    if (props.bossBattle.power === "roots") return 21;
    if (props.bossBattle.power === "eclipse") return 22;
    return 18;
  }

  function applyBossPowerAfterAttack(nextAttackCount: number) {
    if (props.bossBattle.power === "eclipse" && nextAttackCount % 3 === 0) {
      setEnergy((value) => Math.max(0, value - 35));
      setPowerMessage("L’Éclipse absorbe 35 % de ton énergie spéciale.");
      flash("power");
      playSound("error");
    }
  }

  function validate() {
    if (!selected || defeated) return;
    setValidated(true);
    setPowerMessage("");
    if (correct) {
      const nextCombo = combo + 1;
      const critical = energy >= 75 || nextCombo >= 3;
      const nextAttackCount = attackCount + 1;
      const damage = bossDamageFor(nextCombo, critical);
      setBossHp((value) => Math.max(0, value - damage));
      setCombo(critical ? 0 : nextCombo);
      setEnergy(critical ? 10 : (value) => Math.min(100, value + 28));
      setAttackCount(nextAttackCount);
      flash(critical ? "critical" : "boss");
      playSound(critical ? "chest" : "correct");
      gentleVibration(critical ? [18, 30, 24] : 14);
      window.setTimeout(() => applyBossPowerAfterAttack(nextAttackCount), 420);
    } else {
      const nextMistakes = mistakes + 1;
      setMistakes(nextMistakes);
      setCombo(0);
      setEnergy((value) => Math.max(0, value - 20));
      const damage = heroDamageFor(nextMistakes);
      setHeroHp((value) => {
        const next = Math.max(0, value - damage);
        if (next === 0) window.setTimeout(() => setDefeated(true), 350);
        return next;
      });
      flash("hero");
      playSound("error");
      gentleVibration([10, 32, 10]);
    }
  }

  function claimBossReward() {
    if (!props.bossBattle.isFinalPhase || rewardClaimed.current) return;
    rewardClaimed.current = true;
    setRewardState("claiming");
    void fetch("/api/boss-rewards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ childSlug: props.child, chapterSlug: props.bossBattle.chapterSlug }),
    }).then(async (response) => {
      if (!response.ok) throw new Error("reward");
      const data = await response.json() as { alreadyClaimed?: boolean };
      setRewardState(data.alreadyClaimed ? "already" : "claimed");
    }).catch(() => {
      rewardClaimed.current = false;
      setRewardState("error");
    });
  }

  function next() {
    if (!correct) {
      setValidated(false);
      setSelected(null);
      return;
    }
    if (stepIndex < props.steps.length - 1) {
      setStepIndex((value) => value + 1);
      setSelected(null);
      setValidated(false);
      return;
    }
    setBossHp(0);
    setCompleted(true);
    playSound("chest");
    gentleVibration([18, 45, 24]);
    if (saved.current) return;
    saved.current = true;
    setSaveState("saving");
    const attempt = {
      id: crypto.randomUUID(), child: props.child, missionId: props.missionId, missionTitle: props.title, category: props.category, skill: props.skill, grade: props.grade, xp: props.xp,
      correctAnswers: props.steps.length, totalQuestions: props.steps.length + mistakes, mistakes, hintsUsed: 0,
      durationSeconds: Math.max(1, Math.round((Date.now() - startedAt.current) / 1000)), completedAt: new Date().toISOString(),
    };
    void persistAttempt(attempt).then(() => {
      setSaveState("saved");
      claimBossReward();
    }).catch(() => setSaveState("error"));
  }

  function restart() {
    setStarted(true); setStepIndex(0); setSelected(null); setValidated(false); setMistakes(0); setBossHp(100); setHeroHp(100); setCombo(0); setEnergy(0); setAttackCount(0); setImpact(""); setPowerMessage(""); setDefeated(false); setCompleted(false); setEndingIndex(0); setChestOpened(false); setRewardState("idle"); setSaveState("idle");
    startedAt.current = Date.now(); saved.current = false; rewardClaimed.current = false;
  }

  if (!started) return <main className="boss-screen boss-screen--intro"><Sparkles count={16}/><Link href={props.backHref}>← Quitter l’arène</Link><div className="boss-emblem">{props.bossBattle.symbol}</div><small>{props.bossBattle.title}</small><h1>{props.bossBattle.name}</h1><em>Phase {props.bossBattle.phase}/{props.bossBattle.totalPhases}</em><section><b>⚔️ COMBAT DE BOSS</b><p>{props.bossBattle.intro[intro]}</p>{intro < props.bossBattle.intro.length - 1 ? <button onClick={() => { playSound("character"); setIntro((value) => value + 1); }}>Continuer →</button> : <><div className="boss-power-card"><strong>✨ {props.bossBattle.powerName}</strong><span>{props.bossBattle.powerDescription}</span></div><button onClick={() => { startedAt.current = Date.now(); setStarted(true); playSound("transition"); }}>Entrer dans l’arène →</button></>}</section></main>;

  if (defeated) return <main className="boss-screen boss-screen--result"><div className="boss-emblem is-defeated">{props.bossBattle.symbol}</div><small>Le héros doit reprendre des forces</small><h1>Le combat continue</h1><p>{props.bossBattle.defeat}</p><div><button onClick={restart}>Recommencer la phase</button><Link href={props.backHref}>Retour au chapitre</Link></div></main>;

  if (completed && props.bossBattle.isFinalPhase && endingIndex < props.bossBattle.ending.length) return <main className="boss-screen boss-screen--cinematic"><Sparkles count={22}/><div className="boss-cinematic-symbol">{endingIndex === props.bossBattle.ending.length - 1 ? "✨" : props.bossBattle.symbol}</div><small>CINÉMATIQUE DE VICTOIRE</small><h1>{endingIndex === 0 ? `${props.bossBattle.name} est vaincu` : "La lumière revient"}</h1><section><p>{props.bossBattle.ending[endingIndex]}</p><button onClick={() => { playSound("character"); setEndingIndex((value) => value + 1); }}>{endingIndex === props.bossBattle.ending.length - 1 ? "Découvrir la récompense →" : "Continuer →"}</button></section></main>;

  if (completed && props.bossBattle.isFinalPhase && !chestOpened) return <main className="boss-screen boss-screen--legendary"><ConfettiLite active/><Burst active/><Sparkles count={28}/><small>BOSS VAINCU</small><h1>{props.bossBattle.reward.chestName}</h1><button className="legendary-chest" onClick={() => { setChestOpened(true); playSound("chest"); gentleVibration([20, 40, 30, 55, 40]); }}>🎁<span>Ouvrir le coffre légendaire</span></button><p>Une récompense exclusive t’attend.</p></main>;

  if (completed && props.bossBattle.isFinalPhase) return <main className="boss-screen boss-screen--reward"><ConfettiLite active/><Burst active/><FloatingXP xp={props.xp + props.bossBattle.reward.xpReward} active/><Sparkles count={24}/><div className="boss-emblem">🏆</div><small>RÉCOMPENSES ÉPIQUES</small><h1>Victoire, {props.firstName} !</h1><p>{props.bossBattle.victory}</p><div className="boss-reward-grid"><article><span>{props.bossBattle.reward.trophySymbol}</span><small>TROPHÉE DE BOSS</small><strong>{props.bossBattle.reward.trophyName}</strong></article><article><span>✨</span><small>OBJET EXCLUSIF</small><strong>{props.bossBattle.reward.itemId === "companion-clockwork" ? "Mini-Mécanox" : props.bossBattle.reward.itemId === "head-storm-crown" ? "Couronne de Tempête" : props.bossBattle.reward.itemId === "outfit-light-champion" ? "Armure du Champion de Lumière" : "Armure du Chêne"}</strong></article><article><span>🪙</span><small>PIÈCES</small><strong>+{props.bossBattle.reward.coinReward}</strong></article><article><span>⭐</span><small>XP BONUS</small><strong>+{props.bossBattle.reward.xpReward}</strong></article></div><div className={`boss-level-result ${levelResult.leveledUp ? "is-level-up" : ""}`}><span>{levelResult.after.symbol}</span><div><small>{levelResult.leveledUp ? "NIVEAU SUPÉRIEUR !" : levelResult.after.title}</small><strong>Niveau {levelResult.after.level}</strong><p>{levelResult.leveledUp ? levelResult.after.reward : `${levelResult.after.xpInLevel}/${levelResult.after.xpNeeded} XP vers le prochain niveau`}</p></div></div><strong className="boss-save-state">{rewardState === "claiming" ? "Ouverture du coffre…" : rewardState === "error" ? "Récompense à synchroniser" : rewardState === "already" ? "Récompense déjà obtenue" : "Récompenses ajoutées à ton inventaire"}</strong><div><Link href={props.backHref}>Retour au chapitre</Link>{rewardState === "error" && <button onClick={claimBossReward}>Réessayer la sauvegarde</button>}</div></main>;

  if (completed) return <main className="boss-screen boss-screen--result"><ConfettiLite active/><Burst active/><FloatingXP xp={props.xp} active/><div className="boss-emblem">⚔️</div><small>PHASE REMPORTÉE</small><h1>Bien joué, {props.firstName} !</h1><p>Tu as remporté cette phase. Le boss recule, mais le combat n’est pas encore terminé.</p><strong>+{props.xp} XP · {saveState === "saving" ? "sauvegarde…" : saveState === "error" ? "synchronisation à réessayer" : "progression enregistrée"}</strong><div className={`boss-level-result ${levelResult.leveledUp ? "is-level-up" : ""}`}><span>{levelResult.after.symbol}</span><div><small>{levelResult.leveledUp ? "NIVEAU SUPÉRIEUR !" : levelResult.after.title}</small><strong>Niveau {levelResult.after.level}</strong><p>{levelResult.leveledUp ? levelResult.after.reward : `${levelResult.after.xpInLevel}/${levelResult.after.xpNeeded} XP vers le prochain niveau`}</p></div></div><div><Link href={props.backHref}>Continuer le chapitre</Link><button onClick={restart}>Rejouer la phase</button></div></main>;

  return <main className={`boss-battle boss-impact--${impact}`}>
    <header><Link href={props.backHref}>← Chapitre</Link><span>Phase {props.bossBattle.phase}/{props.bossBattle.totalPhases}</span><strong>{progress}%</strong></header>
    <section className="boss-hud2"><div><span>TON HÉROS</span><strong>{props.firstName}</strong><i><b style={{ width: `${heroHp}%` }}/></i><small>{heroHp}/100 PV</small></div><em>VS<br/><small>Combo x{combo}</small></em><div><span>{props.bossBattle.title}</span><strong>{props.bossBattle.symbol} {props.bossBattle.name}</strong><i><b style={{ width: `${bossHp}%` }}/></i><small>{bossHp}/100 PV</small></div><aside><span>ÉNERGIE SPÉCIALE</span><i><b style={{ width: `${energy}%` }}/></i><strong>{energy >= 75 ? "Critique prêt !" : `${energy}%`}</strong></aside>{status && <mark>{status}</mark>}</section>
    {powerMessage && <div className="boss-power-alert">✨ {powerMessage}</div>}
    <div className="boss-content"><article><span>Attaque {stepIndex + 1}/{props.steps.length} · {step.eyebrow}</span><h1>{step.title}</h1><p>{step.instruction}</p><div className="boss-choices">{step.choices.map((choice, index) => <button key={choice.value} className={validated && choice.value === selected ? (correct ? "correct" : "wrong") : selected === choice.value ? "selected" : ""} onClick={() => { if (!validated || !correct) { setSelected(choice.value); setValidated(false); } }}><b>{String.fromCharCode(65 + index)}</b>{choice.label}</button>)}</div><footer>{!validated ? <button disabled={!selected} onClick={validate}>Lancer l’attaque</button> : <button onClick={next}>{correct ? (stepIndex === props.steps.length - 1 ? "Porter le coup final" : "Attaque suivante") : "Réessayer"} →</button>}</footer></article><aside><div className="boss-emblem boss-emblem--small">{props.bossBattle.symbol}</div><b>{validated ? (correct ? step.success : step.hint) : "Une bonne réponse inflige des dégâts. Une erreur permet au boss de riposter."}</b><p>{props.bossBattle.powerDescription}</p></aside></div>
  </main>;
}
