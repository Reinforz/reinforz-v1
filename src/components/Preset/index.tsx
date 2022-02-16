import { grey, red } from "@mui/material/colors";
import { OptionsObject, useSnackbar } from "notistack";
import { useContext } from "react";
import { FaSave } from "react-icons/fa";
import { MdDelete, MdUpdate } from "react-icons/md";
import shortid from "shortid";
import { Hovertips, ListSelect, ModalPresetInput } from "..";
import { ModalContext } from "../../context/ModalContext";
import { SettingsContext } from "../../context/SettingsContext";
import { useThemeSettings } from "../../hooks";
import sounds from "../../sounds";
import { IPreset } from "../../types";
import "./style.scss";

export interface PresetProps {
  setPresetState: React.Dispatch<React.SetStateAction<IPreset<any>>>
  itemPresets: IPreset<any>
  currentPreset: any
  modalLabel?: string
  popoverText?: string
  lsKey?: string
}

const centerBottomErrorNotistack = {
  variant: 'error',
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'center',
  },
} as OptionsObject;

export default function Preset(props: PresetProps) {
  const { setModalState } = useContext(ModalContext);
  const { theme } = useThemeSettings();
  const { settings } = useContext(SettingsContext)
  const { lsKey, modalLabel = 'Save preset', popoverText = 'Save preset', setPresetState, currentPreset, itemPresets } = props;
  const { enqueueSnackbar } = useSnackbar();

  function checkPresetInput(input: string) {
    if (input === '') {
      enqueueSnackbar("Can't save a preset with no name", centerBottomErrorNotistack)
    } else if (itemPresets.presets.map(preset => preset.name).includes(input)) {
      enqueueSnackbar(`A preset with name: ${input} already exists`, centerBottomErrorNotistack)
    } else {
      return true;
    }
    return false
  }

  return <div className="Preset">
    <ListSelect items={itemPresets.presets.map(preset => preset.id)} menuItemLabel={(id) => itemPresets.presets.find(preset => preset.id === id)!.name} onChange={(id) => {
      setPresetState({
        current: id,
        presets: itemPresets.presets
      })
      lsKey && localStorage.setItem(lsKey, JSON.stringify({
        current: id,
        presets: itemPresets.presets
      }))
    }} item={itemPresets.current} />

    <Hovertips popoverText={popoverText}>
      <FaSave fill={theme.color.opposite_light} size={20} onClick={() => {
        settings.sound && sounds.click.play()
        setModalState([true, <ModalPresetInput closeModal={() => setModalState([false, null])} label={modalLabel} onSave={(input) => {
          const isValid = checkPresetInput(input);
          if (isValid) {
            settings.sound && sounds.click.play();
            const currentActivePresetId = shortid();
            const newSettingsPresets: IPreset<any> = {
              current: currentActivePresetId,
              presets: [...itemPresets.presets, {
                name: input,
                id: currentActivePresetId,
                data: currentPreset
              }]
            }
            lsKey && localStorage.setItem(lsKey, JSON.stringify(newSettingsPresets));
            setPresetState(newSettingsPresets);
            setModalState([false, null])
          }
        }} />])
      }} />
    </Hovertips>
    <Hovertips popoverText={itemPresets.current !== 'default' ? "Update preset" : "Can't update default preset"}>
      <MdUpdate size={20} fill={itemPresets.current !== 'default' ? theme.color.opposite_light : grey[500]} onClick={() => {
        if (itemPresets.current !== 'default') {
          settings.sound && sounds.click.play();
          const currentPresetIndex = itemPresets.presets.findIndex(preset => preset.id === itemPresets.current);
          itemPresets.presets[currentPresetIndex].data = currentPreset;
          setPresetState(JSON.parse(JSON.stringify(itemPresets)))
          lsKey && localStorage.setItem(lsKey, JSON.stringify(itemPresets));
          enqueueSnackbar(`Preset "${itemPresets.presets[currentPresetIndex].name}" updated`, {
            variant: 'success',
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'center',
            }
          })
        }
      }} />
    </Hovertips>
    <Hovertips popoverText={itemPresets.current !== 'default' ? "Delete preset" : "Can't delete default preset"}>
      <MdDelete size={20} fill={itemPresets.current !== 'default' ? red[500] : grey[500]} onClick={() => {
        if (itemPresets.current !== 'default') {
          settings.sound && sounds.remove.play();
          setPresetState({
            current: 'default',
            presets: itemPresets.presets.filter(preset => preset.id !== itemPresets.current)
          })
        }
      }} />
    </Hovertips>
  </div>
}