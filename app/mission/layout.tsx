import "./mission.css";
import { AudioExperience } from "@/components/audio/AudioExperience";

export default function MissionLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>
    <AudioExperience />
    {children}
  </>;
}
