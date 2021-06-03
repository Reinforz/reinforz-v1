import { useContext } from "react";
import { PlayContext } from "../../../context/PlayContext";
import { StackList } from "../../../shared";

export function ReportSettings() {
  const { playSettings } = useContext(PlayContext);
  return <div className="Report-Settings">
    <StackList header={"Play Options"} items={[
      ['Flatten Mix', playSettings.options.flatten_mix.toString()], ['Disable Timer', playSettings.options.disable_timer.toString()]]} />
  </div>
}