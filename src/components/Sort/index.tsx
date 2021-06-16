import { FormGroup, InputLabel, MenuItem, Select as MuiSelect } from "@material-ui/core";
import { green, red } from "@material-ui/core/colors";
import { AiFillPlusCircle } from "react-icons/ai";
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useThemeSettings } from "../../hooks";
import sounds from "../../sounds";
import { IReportSort } from "../../types";
import { transformTextBySeparator } from "../../utils";
import Hovertips from "../Hovertips";
import "./style.scss";

export interface SortProps {
  header: string
  items: string[]
  sorts: IReportSort
  setSorts: React.Dispatch<React.SetStateAction<IReportSort>>
  menuItemLabel?: (item: string) => string
  max?: number
}

export default function Sort(props: SortProps) {
  const { theme, settings } = useThemeSettings();
  const { max = 3, items, header, sorts, setSorts, menuItemLabel } = props;

  return <FormGroup className="Sort">
    <InputLabel className="Sort-header">{header}</InputLabel>
    {sorts.length !== 0 && <div style={{ display: 'flex', flexDirection: 'column', padding: 2.5, margin: 2.5 }} className="Sort-content bg-dark">
      {sorts.map((sort, index) => {
        const [item, order] = sort;
        return <div key={`${item}.${order}.${index}`} className="Sort-content-item bg-base" style={{ display: 'flex', padding: 5, margin: 2.5 }}>
          <MuiSelect className="Sort-content-item-category bg-light" style={{ flex: 1, marginRight: 5 }} value={item}
            onChange={(e) => {
              settings.sound && sounds.click.play()
              sort[0] = e.target.value as any;
              setSorts(JSON.parse(JSON.stringify(sorts)))
            }}>
            {items.map(item =>
              <MenuItem key={item} value={item}>{menuItemLabel ? menuItemLabel(item) : transformTextBySeparator(item)}</MenuItem>
            )}
          </MuiSelect>
          <MuiSelect className="Sort-content-item-order bg-light" style={{ flex: 1 }} value={order}
            onChange={(e) => {
              settings.sound && sounds.click.play()
              sort[1] = e.target.value as any;
              setSorts(JSON.parse(JSON.stringify(sorts)))
            }}>
            {["ASC", "DESC"].map(item =>
              <MenuItem key={item} value={item}>{menuItemLabel ? menuItemLabel(item) : transformTextBySeparator(item)}</MenuItem>
            )}
          </MuiSelect>
          {index !== sorts.length - 1 && sorts.length !== 1 && <div className="Sort-content-item-down">
            <Hovertips popoverText={"Move downwards"}>
              <FaArrowAltCircleDown fill={theme.color.opposite_light} size={15} onClick={() => {
                const nextSort = sorts[index + 1];
                sorts[index + 1] = sort;
                sorts[index] = nextSort;
                setSorts(JSON.parse(JSON.stringify(sorts)))
              }} />
            </Hovertips>
          </div>}
          {index !== 0 && sorts.length !== 1 && <div className="Sort-content-item-up">
            <Hovertips popoverText={"Move upwards"}>
              <FaArrowAltCircleUp fill={theme.color.opposite_light} size={15} onClick={() => {
                const prevSort = sorts[index - 1];
                sorts[index - 1] = sort;
                sorts[index] = prevSort;
                setSorts(JSON.parse(JSON.stringify(sorts)))
              }} />
            </Hovertips>
          </div>}
          <div className="Sort-content-item-delete">
            <Hovertips popoverText={`Delete ${item} by ${order} sort`}>
              <MdDelete size={20} fill={red[500]} onClick={() => {
                settings.sound && sounds.remove.play()
                sorts[index] = null as any;
                setSorts(sorts.filter(sort => sort))
              }} />
            </Hovertips>
          </div>
        </div>
      })}
    </div>}
    {sorts.length !== max && <div className="Sort-add">
      <Hovertips popoverText="Add Sort">
        <AiFillPlusCircle size={25} fill={green[500]} onClick={() => {
          settings.sound && sounds.click.play()
          setSorts([...sorts, [items[0], 'ASC']])
        }} />
      </Hovertips>
    </div>}
  </FormGroup>
}