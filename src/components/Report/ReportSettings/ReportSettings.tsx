import { useContext } from "react";
import { ReportContext } from "../../../context/ReportContext";
import { RootContext } from "../../../context/RootContext";
import { StackList } from "../../../shared";
import { transformTextBySeparator } from "../../../utils";

export function ReportSettings() {
  const { playSettings } = useContext(RootContext);
  const { reportFilter } = useContext(ReportContext);
  return <div className="Report-Settings">
    {!reportFilter.excluded_columns.includes('play_options') ? <StackList header={"Play Options"} items={Object.entries(playSettings.options).map(([key, value]) => [transformTextBySeparator(key), <span style={{ color: value === true ? '#36e336' : '#ff3223' }}>{value === true ? 'On' : 'Off'}</span>])} /> : null}
    {!reportFilter.excluded_columns.includes('play_filters') ? <StackList header={"Play Filters"} items={Object.entries(playSettings.filters).map(([key, value]) => [transformTextBySeparator(key), Array.isArray(value) ? value.join(",") : value.toString()])} /> : null}
  </div>
}