import { Box } from "@mui/material";
import { grey, red } from "@mui/material/colors";
import { useSnackbar } from "notistack";
import { useContext } from "react";
import { FaSave } from "react-icons/fa";
import { MdDelete, MdUpdate } from "react-icons/md";
import shortid from "shortid";
import { Hovertips, ListSelect, ModalPresetInput } from "./";
import { NotistackOptions } from "../constants";
import { ModalContext } from "../context/ModalContext";
import { useThemeSettings } from "../hooks";
import useSounds from "../hooks/useSounds";
import { IPresetConfig } from "../types";
import "./Preset.scss";
export interface PresetProps {
    setPresetState: React.Dispatch<React.SetStateAction<IPresetConfig<any>>>;
    itemPresets: IPresetConfig<any>;
    currentPreset: any;
    modalLabel?: string;
    popoverText?: string;
    lsKey?: string;
}
export default function Preset(props: PresetProps) {
    const { setModalState } = useContext(ModalContext);
    const { theme } = useThemeSettings();
    const { remove, click } = useSounds();
    const { lsKey, modalLabel = "Save preset", popoverText = "Save preset", setPresetState, currentPreset, itemPresets } = props;
    const { enqueueSnackbar } = useSnackbar();
    function checkPresetInput(input: string) {
        if (input === "") {
            enqueueSnackbar("Can't save a preset with no name", NotistackOptions);
        }
        else if (itemPresets.presets.map(preset => preset.name).includes(input)) {
            enqueueSnackbar(`A preset with name: ${input} already exists`, NotistackOptions);
        }
        else {
            return true;
        }
        return false;
    }
    return <Box className="Preset cursor-pointer flex items-center align-center gap-1 p-1">
    <ListSelect items={itemPresets.presets.map(preset => preset.id)} menuItemLabel={(id) => itemPresets.presets.find(preset => preset.id === id)!.name} onChange={(id) => {
            setPresetState({
                current: id,
                presets: itemPresets.presets
            });
            lsKey && localStorage.setItem(lsKey, JSON.stringify({
                current: id,
                presets: itemPresets.presets
            }));
        }} item={itemPresets.current}/>

    <Hovertips popoverText={popoverText}>
      <FaSave fill={theme.palette.color.opposite_light} size={20} onClick={() => {
            click();
            setModalState([true, <ModalPresetInput closeModal={() => setModalState([false, null])} label={modalLabel} onSave={(input) => {
                        const isValid = checkPresetInput(input);
                        if (isValid) {
                            click();
                            const currentActivePresetId = shortid();
                            const newSettingsPresets: IPresetConfig<any> = {
                                current: currentActivePresetId,
                                presets: [...itemPresets.presets, {
                                        name: input,
                                        id: currentActivePresetId,
                                        data: currentPreset
                                    }]
                            };
                            lsKey && localStorage.setItem(lsKey, JSON.stringify(newSettingsPresets));
                            setPresetState(newSettingsPresets);
                            setModalState([false, null]);
                        }
                    }}/>]);
        }}/>
    </Hovertips>
    <Hovertips popoverText={itemPresets.current !== "default" ? "Update preset" : "Can't update default preset"}>
      <MdUpdate size={20} fill={itemPresets.current !== "default" ? theme.palette.color.opposite_light : grey[500]} onClick={() => {
            if (itemPresets.current !== "default") {
                click();
                const currentPresetIndex = itemPresets.presets.findIndex(preset => preset.id === itemPresets.current);
                itemPresets.presets[currentPresetIndex].data = currentPreset;
                setPresetState(JSON.parse(JSON.stringify(itemPresets)));
                lsKey && localStorage.setItem(lsKey, JSON.stringify(itemPresets));
                enqueueSnackbar(`Preset "${itemPresets.presets[currentPresetIndex].name}" updated`, {
                    variant: "success",
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "center"
                    }
                });
            }
        }}/>
    </Hovertips>
    <Hovertips popoverText={itemPresets.current !== "default" ? "Delete preset" : "Can't delete default preset"}>
      <MdDelete size={20} fill={itemPresets.current !== "default" ? red[500] : grey[500]} onClick={() => {
            if (itemPresets.current !== "default") {
                remove();
                setPresetState({
                    current: "default",
                    presets: itemPresets.presets.filter(preset => preset.id !== itemPresets.current)
                });
            }
        }}/>
    </Hovertips>
  </Box>;
}
