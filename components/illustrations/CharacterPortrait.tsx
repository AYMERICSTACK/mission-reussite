import type { CSSProperties } from "react";
import styles from "./CharacterPortrait.module.css";

export type CharacterId =
  | "nova"
  | "oscar"
  | "luna"
  | "leo"
  | "milo"
  | "sia"
  | "nox"
  | "tiko"
  | "maya"
  | "nila"
  | "siro";

export type CharacterExpression = "happy" | "curious" | "proud" | "focused" | "surprised";

type CharacterPortraitProps = {
  character: CharacterId;
  expression?: CharacterExpression;
  size?: "small" | "medium" | "large";
  animated?: boolean;
  className?: string;
  label?: string;
};

const palettes: Record<CharacterId, { primary: string; secondary: string; light: string; dark: string; skin?: string }> = {
  nova: { primary: "#7259f5", secondary: "#f4b8ff", light: "#efeaff", dark: "#31276d", skin: "#f4c7a5" },
  oscar: { primary: "#9b633b", secondary: "#e7ad58", light: "#f7dc9c", dark: "#492f24" },
  luna: { primary: "#ef704f", secondary: "#ffd18b", light: "#fff1d8", dark: "#603226" },
  leo: { primary: "#d48743", secondary: "#f4c777", light: "#fff0c7", dark: "#57351e" },
  milo: { primary: "#4779d8", secondary: "#9dc4ff", light: "#eef5ff", dark: "#213a76", skin: "#edbd91" },
  sia: { primary: "#2d9c8d", secondary: "#87ddd1", light: "#e6fbf6", dark: "#1d5b58", skin: "#8d5a3d" },
  nox: { primary: "#555f79", secondary: "#ffb55f", light: "#eaf0f8", dark: "#20283e" },
  tiko: { primary: "#6c7780", secondary: "#a6bd88", light: "#eaf1da", dark: "#2d3739" },
  maya: { primary: "#9e6745", secondary: "#f0c76c", light: "#fff2cf", dark: "#3c2d28" },
  nila: { primary: "#2b9ed0", secondary: "#7de2e8", light: "#e2fbff", dark: "#174e72" },
  siro: { primary: "#a66d35", secondary: "#efbd62", light: "#fff0c7", dark: "#4e321f" },
};

function Eyes({ expression, dark }: { expression: CharacterExpression; dark: string }) {
  if (expression === "happy" || expression === "proud") {
    return (
      <g fill="none" stroke={dark} strokeLinecap="round" strokeWidth="5">
        <path d="M78 98c7-8 15-8 22 0" />
        <path d="M140 98c7-8 15-8 22 0" />
      </g>
    );
  }

  return (
    <g fill={dark}>
      <ellipse cx="90" cy="96" rx={expression === "surprised" ? 7 : 6} ry={expression === "surprised" ? 9 : 7} />
      <ellipse cx="152" cy="96" rx={expression === "surprised" ? 7 : 6} ry={expression === "surprised" ? 9 : 7} />
      <circle cx="88" cy="93" r="2" fill="#fff" />
      <circle cx="150" cy="93" r="2" fill="#fff" />
    </g>
  );
}

function Mouth({ expression, dark }: { expression: CharacterExpression; dark: string }) {
  if (expression === "surprised") return <ellipse cx="121" cy="126" rx="8" ry="11" fill={dark} />;
  if (expression === "focused") return <path d="M108 128c9-4 17-4 26 0" fill="none" stroke={dark} strokeLinecap="round" strokeWidth="4" />;
  return <path d="M106 122c8 13 23 16 34 1" fill="none" stroke={dark} strokeLinecap="round" strokeWidth="5" />;
}

function Human({ character, expression }: { character: "nova" | "milo" | "sia"; expression: CharacterExpression }) {
  const p = palettes[character];
  const hair = character === "nova" ? "#49369f" : character === "milo" ? "#54382d" : "#251d2b";
  const faceCenter = 121;

  return (
    <>
      <path d="M48 215c7-43 34-67 73-67s67 24 74 67" fill={p.primary} />
      <path d="M92 151h58v42c-16 12-42 12-58 0Z" fill={p.skin} />
      <ellipse cx={faceCenter} cy="102" rx="58" ry="64" fill={p.skin} />
      <ellipse cx="63" cy="108" rx="10" ry="17" fill={p.skin} />
      <ellipse cx="179" cy="108" rx="10" ry="17" fill={p.skin} />

      <path
        d={character === "nova"
          ? "M63 96c-2-45 23-72 61-72 39 0 62 26 60 67-18-4-31-14-41-30-18 21-44 33-80 35Z"
          : character === "milo"
            ? "M64 92c3-42 27-67 61-67 36 0 59 24 59 63-18-13-37-19-58-18-21 1-41 8-62 22Z"
            : "M62 95c0-43 24-70 62-70 40 0 63 29 60 71-15-23-33-33-55-33-25 0-45 11-67 32Z"}
        fill={hair}
      />

      {character === "sia" ? <><circle cx="67" cy="106" r="16" fill={hair} /><circle cx="175" cy="106" r="16" fill={hair} /></> : null}

      <g transform="translate(0 2)">
        <Eyes expression={expression} dark={p.dark} />
        <Mouth expression={expression} dark={p.dark} />
        <path d="M116 106c-2 8-2 13 1 17 4 2 8 2 12 0" fill="none" stroke={p.dark} strokeLinecap="round" strokeWidth="2.5" opacity=".34" />
      </g>

      {character === "milo" ? (
        <g fill="none" stroke="#173e8f" strokeWidth="5">
          <rect x="78" y="82" width="40" height="31" rx="7" />
          <rect x="124" y="82" width="40" height="31" rx="7" />
          <path d="M118 94h6M78 91l-12-4M164 91l12-4" strokeLinecap="round" />
        </g>
      ) : null}

      {character === "nova" ? (
        <g>
          <path d="M121 161l8 17 18 3-13 12 3 18-16-8-16 8 3-18-13-12 18-3Z" fill="#ffe07a" />
          <circle cx="174" cy="54" r="8" fill="#ffdc70" />
        </g>
      ) : null}
      {character === "sia" ? <path d="M83 160c18 16 58 16 77 0" fill="none" stroke={p.secondary} strokeWidth="9" /> : null}
    </>
  );
}
function Animal({ character, expression }: { character: Exclude<CharacterId, "nova" | "milo" | "sia">; expression: CharacterExpression }) {
  const p = palettes[character];
  const bird = character === "oscar" || character === "maya";
  const aquatic = character === "nila";
  const lizard = character === "siro";
  const robot = character === "nox";

  if (robot) {
    return (
      <>
        <path d="M60 194c7-32 29-47 61-47s55 15 62 47" fill={p.primary} />
        <rect x="63" y="47" width="118" height="112" rx="40" fill={p.light} stroke={p.dark} strokeWidth="7" />
        <path d="M121 47V28m-10 0h20" stroke={p.dark} strokeLinecap="round" strokeWidth="6" />
        <circle cx="121" cy="24" r="8" fill={p.secondary} />
        <Eyes expression={expression} dark={p.dark} />
        <Mouth expression={expression} dark={p.dark} />
        <circle cx="70" cy="100" r="10" fill={p.secondary} /><circle cx="174" cy="100" r="10" fill={p.secondary} />
        <path d="M104 164h34l-5 19h-24Z" fill={p.secondary} />
      </>
    );
  }

  if (aquatic) {
    return (
      <>
        <path d="M55 119c12-50 50-72 93-56 24 9 39 28 43 51-16-7-27-6-40 2 13 8 22 21 25 38-23 5-42 1-57-12-15 14-37 20-64 13 7-12 9-24 6-36Z" fill={p.primary} />
        <path d="M52 103c-17-12-28-27-32-46 23 3 40 13 52 31" fill={p.secondary} />
        <ellipse cx="129" cy="103" rx="60" ry="50" fill={p.light} />
        <Eyes expression={expression} dark={p.dark} />
        <Mouth expression={expression} dark={p.dark} />
        <path d="M160 52c17 7 29 18 36 34" fill="none" stroke="#fff" strokeLinecap="round" strokeWidth="6" opacity=".65" />
      </>
    );
  }

  if (lizard) {
    return (
      <>
        <path d="M53 196c5-39 30-59 68-59 41 0 65 22 68 59" fill={p.primary} />
        <ellipse cx="121" cy="102" rx="64" ry="57" fill={p.primary} />
        <path d="M67 72 46 48l38 11m91 13 21-24-38 11" fill={p.secondary} />
        <ellipse cx="121" cy="117" rx="45" ry="31" fill={p.light} opacity=".75" />
        <Eyes expression={expression} dark={p.dark} />
        <Mouth expression={expression} dark={p.dark} />
        <circle cx="68" cy="111" r="4" fill={p.secondary} /><circle cx="176" cy="111" r="4" fill={p.secondary} />
      </>
    );
  }

  const earPath = character === "luna" ? "M74 64 52 24l42 25m73 15 22-40-42 25" : "M74 66 56 34l36 17m76 15 18-32-36 17";
  return (
    <>
      <path d="M57 198c8-39 31-58 64-58 35 0 58 20 65 58" fill={p.primary} />
      {bird ? (
        <>
          <ellipse cx="121" cy="101" rx="65" ry="65" fill={p.primary} />
          <path d="M62 65 39 38l46 8m95 19 23-27-46 8" fill={p.secondary} />
          <ellipse cx="89" cy="100" rx="25" ry="30" fill={p.light} /><ellipse cx="153" cy="100" rx="25" ry="30" fill={p.light} />
          <Eyes expression={expression} dark={p.dark} />
          <path d="m111 114 10 14 11-14-11-7Z" fill={p.secondary} />
          <Mouth expression={expression} dark={p.dark} />
          <path d="M74 155c17 15 30 17 47 3 17 14 30 12 47-3" fill="none" stroke={p.secondary} strokeWidth="9" />
        </>
      ) : (
        <>
          <path d={earPath} fill={p.primary} />
          <ellipse cx="121" cy="103" rx="63" ry="59" fill={p.primary} />
          <ellipse cx="121" cy="124" rx="41" ry="31" fill={p.light} />
          {character === "tiko" ? <path d="M61 91c16-12 34-17 60-17 28 0 47 6 62 20-14 6-26 10-36 11-7-10-15-15-26-15-12 0-21 5-28 15-11-2-21-6-32-14Z" fill={p.dark} opacity=".75" /> : null}
          <Eyes expression={expression} dark={p.dark} />
          <path d="m113 113 8 6 9-6-9-5Z" fill={p.dark} />
          <Mouth expression={expression} dark={p.dark} />
          {character === "luna" ? <path d="M87 139c19 12 47 12 68 0" fill="none" stroke="#fff" strokeWidth="7" opacity=".65" /> : null}
        </>
      )}
    </>
  );
}

export function CharacterPortrait({ character, expression = "happy", size = "medium", animated = true, className, label }: CharacterPortraitProps) {
  const p = palettes[character];
  const human = character === "nova" || character === "milo" || character === "sia";
  return (
    <span
      className={[styles.portrait, styles[size], animated ? styles.animated : "", className].filter(Boolean).join(" ")}
      style={{ "--portrait-primary": p.primary, "--portrait-secondary": p.secondary, "--portrait-light": p.light } as CSSProperties}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <svg viewBox="0 0 242 220" focusable="false">
        <ellipse cx="121" cy="201" rx="78" ry="12" fill="#241b45" opacity=".12" />
        {human ? <Human character={character} expression={expression} /> : <Animal character={character as Exclude<CharacterId, "nova" | "milo" | "sia">} expression={expression} />}
      </svg>
      <span className={styles.sparkle} aria-hidden="true">✦</span>
    </span>
  );
}
