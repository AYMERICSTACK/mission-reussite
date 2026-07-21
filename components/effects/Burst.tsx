"use client";

export function Burst({ active, className = "" }: { active: boolean; className?: string }) {
  if (!active) return null;
  return <span className={`fx-burst ${className}`} aria-hidden="true">{Array.from({ length: 10 }, (_, index) => <i key={index} style={{ "--fx-i": index } as React.CSSProperties} />)}</span>;
}
