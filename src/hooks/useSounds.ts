import { useContext } from "react";
import { SettingsContext } from "../context/SettingsContext";
import sounds, { soundNames } from "../sounds";

export default function useSounds() {
  const { settings } = useContext(SettingsContext);
  
  const soundRecord: Record<typeof soundNames[number], () => void> = {} as any;

  soundNames.forEach(soundName => {
    soundRecord[soundName] = () => {
      // If the user has sounds enabled only then play it
      settings.sound && sounds[soundName].play();
    }
  })

  return soundRecord;
}