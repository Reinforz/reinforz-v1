import { useContext } from "react";
import { FaSave } from "react-icons/fa";
import shortid from "shortid";
import { Icon, ListSelect, ModalPresetInput } from "../";
import { ModalContext } from "../../context/ModalContext";
import { useThemeSettings } from "../../hooks";
import { ISettings, ISettingsPreset } from "../../types";

interface Props<T, D> {
  setPresetState: React.Dispatch<React.SetStateAction<T>>
  itemPreset: T
  currentPreset: D
}

export default function Preset<T extends ISettingsPreset, D extends ISettings>(props: Props<T, D>) {
  const { setModalState } = useContext(ModalContext);
  const { theme } = useThemeSettings();
  const { setPresetState, currentPreset, itemPreset } = props;

  return <div className="Settings-header-presets">
    <ListSelect items={itemPreset.presets.map(preset => preset.id)} menuItemLabel={(id) => itemPreset.presets.find(preset => preset.id === id)!.name} onChange={(id) => {
      setPresetState({
        current: id,
        presets: itemPreset.presets
      } as any)
    }} item={itemPreset.current} />
    <Icon popoverText="Save current settings as preset">
      <FaSave fill={theme.color.opposite_light} size={20} onClick={() => {
        setModalState([true, <ModalPresetInput closeModal={() => setModalState([false, null])} label={'Save Settings'} onSave={(input) => {
          const currentActivePresetId = shortid();
          const newSettingsPresets: ISettingsPreset = {
            current: currentActivePresetId,
            presets: [...itemPreset.presets, {
              name: input,
              id: currentActivePresetId,
              data: currentPreset
            } as any]
          }
          localStorage.setItem('reinforz.play.settings', JSON.stringify(newSettingsPresets));
          setPresetState(newSettingsPresets as any)
        }} />])
      }} />
    </Icon>
  </div>
}