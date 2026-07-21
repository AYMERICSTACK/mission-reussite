"use client";
import { useCallback, useEffect, useState } from "react";
import styles from "./ParentCooperationPanel.module.css";

type Goal={id:string;title:string;targetCount:number;progress:number;completed:boolean;rewardLabel:string|null};
type Props={childSlug:string;firstName:string};
export function ParentCooperationPanel({childSlug,firstName}:Props){
 const [mode,setMode]=useState<"goal"|"encouragement">("encouragement"); const [goals,setGoals]=useState<Goal[]>([]); const [status,setStatus]=useState(""); const [busy,setBusy]=useState(false);
 const load=useCallback(async()=>{const r=await fetch(`/api/cooperation?child=${encodeURIComponent(childSlug)}`,{cache:"no-store"});if(r.ok){const d=await r.json();setGoals(d.goals??[])}},[childSlug]);
 useEffect(()=>{const timer=window.setTimeout(()=>void load(),0);return()=>window.clearTimeout(timer)},[load]);
 async function submit(form:FormData){setBusy(true);setStatus("");const payload=mode==="goal"?{childSlug,type:"goal",title:form.get("title"),message:form.get("message"),targetCount:Number(form.get("targetCount")),rewardLabel:form.get("rewardLabel")}:{childSlug,type:"encouragement",message:form.get("message")};const r=await fetch("/api/cooperation",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(payload)});const d=await r.json();setBusy(false);if(!r.ok){setStatus(d.error??"Une erreur est survenue.");return}setStatus(mode==="goal"?`Défi envoyé à ${firstName} !`:`Ton encouragement attend ${firstName} dans son aventure.`);await load()}
 const active=goals.find(g=>!g.completed);
 return <section className={styles.panel}>
  <div className={styles.heading}><div><span>Coopération</span><h3>Un petit lien entre vous deux</h3></div><div className={styles.tabs}><button className={mode==="encouragement"?styles.active:""} onClick={()=>setMode("encouragement")} type="button">💌 Encourager</button><button className={mode==="goal"?styles.active:""} onClick={()=>setMode("goal")} type="button">🤝 Défi commun</button></div></div>
  {active&&<div className={styles.history}><article><strong>{active.title}</strong><small>{active.progress}/{active.targetCount} mission(s){active.rewardLabel?` · Récompense : ${active.rewardLabel}`:""}</small><div className={styles.progress}><span style={{width:`${Math.round(active.progress/active.targetCount*100)}%`}}/></div></article></div>}
  <form className={styles.form} action={submit}>
   {mode==="goal"&&<><input name="title" maxLength={80} required placeholder="Ex. Trois missions ensemble cette semaine"/><div className={styles.row}><select name="targetCount" defaultValue="3"><option value="1">1 mission</option><option value="3">3 missions</option><option value="5">5 missions</option><option value="7">7 missions</option></select><input name="rewardLabel" maxLength={60} placeholder="Petite récompense symbolique"/></div></>}
   <textarea name="message" maxLength={180} required={mode==="encouragement"} placeholder={mode==="goal"?`Un mot pour expliquer le défi à ${firstName}…`:`Écris un petit mot à ${firstName}…`}/>
   <button className={styles.submit} disabled={busy}>{busy?"Envoi…":mode==="goal"?"Lancer le défi":"Envoyer mon encouragement"}</button>
  </form>
  {status&&<p className={`${styles.feedback} ${status.includes("erreur")||status.includes("invalide")?styles.error:""}`}>{status}</p>}
 </section>
}
