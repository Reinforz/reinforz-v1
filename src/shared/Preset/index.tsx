import { useContext } from "react";
import { FaSave } from "react-icons/fa";
import shortid from "shortid";
import { Icon, ListSelect, ModalPresetInput } from "../";
import { ModalContext } from "../../context/ModalContext";
import { useThemeSettings } from "../../hooks";
import { ISettings, ISettingsPreset } from "../../types";
import "./style.scss";
interface Props<T, D> {
  setPresetState: React.Dispatch<React.SetStateAction<T>>
  itemPreset: T
  currentPreset: D
  popoverText: string
  modalLabel: string
  lsKey: string
}

export default function Preset<T extends ISettingsPreset, D extends ISettings>(props: Props<T, D>) {
  const { setModalState } = useContext(ModalContext);
  const { theme } = useThemeSettings();
  const { lsKey, modalLabel, popoverText, setPresetState, currentPreset, itemPreset } = props;

  return <div className="Preset">
    <ListSelect items={itemPreset.presets.map(preset => preset.id)} menuItemLabel={(id) => itemPreset.presets.find(preset => preset.id === id)!.name} onChange={(id) => {
      setPresetState({
        current: id,
        presets: itemPreset.presets
      } as any)
    }} item={itemPreset.current} />
    <Icon popoverText={popoverText}>
      <FaSave fill={theme.color.opposite_light} size={20} onClick={() => {
        setModalState([true, <ModalPresetInput closeModal={() => setModalState([false, null])} label={modalLabel} onSave={(input) => {
          const currentActivePresetId = shortid();
          const newSettingsPresets: ISettingsPreset = {
            current: currentActivePresetId,
            presets: [...itemPreset.presets, {
              name: input,
              id: currentActivePresetId,
              data: currentPreset
            } as any]
          }
          localStorage.setItem(lsKey, JSON.stringify(newSettingsPresets));
          setPresetState(newSettingsPresets as any)
        }} />])
      }} />
    </Icon>
  </div>
}