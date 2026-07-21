export function Glow({ className = "" }: { className?: string }) {
  return <span className={`fx-glow ${className}`} aria-hidden="true" />;
}
