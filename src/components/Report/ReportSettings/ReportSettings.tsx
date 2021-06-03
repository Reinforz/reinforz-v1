import { useContext } from "react";
import { RootContext } from "../../../context/RootContext";
import { StackList } from "../../../shared";
import { transformTextBySeparator } from "../../../utils";

export function ReportSettings() {
  const { playSettings } = useContext(RootContext);
  return <div className="Report-Settings">
    <StackList header={"Play Options"} items={Object.entries(playSettings.options).map(([key, value]) => [transformTextBySeparator(key), value.toString()])} />
    <StackList header={"Play Filters"} items={Object.entries(playSettings.filters).map(([key, value]) => [transformTextBySeparator(key), Array.isArray(value) ? value.join(",") : value.toString()])} />
  </div>
}