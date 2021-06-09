import { grey, red } from "@material-ui/core/colors";
import { OptionsObject, useSnackbar } from "notistack";
import { useContext } from "react";
import { FaSave } from "react-icons/fa";
import { MdDelete, MdUpdate } from "react-icons/md";
import shortid from "shortid";
import { Icon, ListSelect, ModalPresetInput } from "../";
import { ModalContext } from "../../context/ModalContext";
import { useThemeSettings } from "../../hooks";
import { IPlaySettings, IPlaySettingsPreset, IReportSettings, IReportSettingsPreset, ISettings, ISettingsPreset } from "../../types";
import "./style.scss";

interface Props<T, D> {
  setPresetState: React.Dispatch<React.SetStateAction<T>>
  itemPreset: T
  currentPreset: D
  popoverText: string
  modalLabel: string
  lsKey: string
}

const centerBottomErrorNotistack = {
  variant: 'error',
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'center',
  },
} as OptionsObject;

export default function Preset<T extends ISettingsPreset | IPlaySettingsPreset | IReportSettingsPreset, D extends ISettings | IPlaySettings | IReportSettings>(props: Props<T, D>) {
  const { setModalState } = useContext(ModalContext);
  const { theme } = useThemeSettings();
  const { lsKey, modalLabel, popoverText, setPresetState, currentPreset, itemPreset } = props;
  const { enqueueSnackbar } = useSnackbar();

  function checkPresetInput(input: string) {
    if (input === '') {
      enqueueSnackbar("Can't save a preset with no name", centerBottomErrorNotistack)
    } else if (itemPreset.presets.map(preset => preset.name).includes(input)) {
      enqueueSnackbar(`A preset with name: ${input} already exists`, centerBottomErrorNotistack)
    } else {
      return true;
    }

    return false
  }

  return <div className="Preset">
    <ListSelect items={itemPreset.presets.map(preset => preset.id)} menuItemLabel={(id) => (itemPreset.presets as any[]).find(preset => preset.id === id)!.name} onChange={(id) => {
      setPresetState({
        current: id,
        presets: itemPreset.presets
      } as any)
      localStorage.setItem(lsKey, JSON.stringify({
        current: id,
        presets: itemPreset.presets
      }))
    }} item={itemPreset.current} />

    <Icon popoverText={popoverText}>
      <FaSave fill={theme.color.opposite_light} size={20} onClick={() => {
        setModalState([true, <ModalPresetInput closeModal={() => setModalState([false, null])} label={modalLabel} onSave={(input) => {
          const isValid = checkPresetInput(input);
          if (isValid) {
            // ? Convert to a util module
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
            setPresetState(newSettingsPresets as any);
            setModalState([false, null])
          }
        }} />])
      }} />
    </Icon>
    <Icon popoverText={itemPreset.current !== 'default' ? "Update preset" : "Can't update default preset"}>
      <MdUpdate size={20} fill={itemPreset.current !== 'default' ? theme.color.opposite_light : grey[500]} onClick={() => {
        if (itemPreset.current !== 'default') {
          const currentPresetIndex = (itemPreset.presets as any[]).findIndex(preset => preset.id === itemPreset.current);
          itemPreset.presets[currentPresetIndex].data = currentPreset as any;
          setPresetState(JSON.parse(JSON.stringify(itemPreset)))
          localStorage.setItem(lsKey, JSON.stringify(itemPreset));
        }
      }} />
    </Icon>
    <Icon popoverText={itemPreset.current !== 'default' ? "Delete preset" : "Can't delete default preset"}>
      <MdDelete size={20} fill={itemPreset.current !== 'default' ? red[500] : grey[500]} onClick={() => {
        if (itemPreset.current !== 'default') {
          setPresetState({
            current: 'default',
            presets: (itemPreset.presets as any[]).filter(preset => preset.id !== itemPreset.current)
          } as any)
        }
      }} />
    </Icon>
  </div>
}