import { FormGroup, InputLabel, MenuItem, Select as MuiSelect } from "@mui/material";
import { green, grey, red } from "@mui/material/colors";
import { AiFillPlusCircle } from "react-icons/ai";
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useThemeSettings } from "../../hooks";
import sounds from "../../sounds";
import { IReportSort } from "../../types";
import { transformTextBySeparator } from "../../utils";
import Hovertips from "../Hovertips";

export interface SortProps {
  header: string
  items: string[]
  sorts: IReportSort
  setSorts: React.Dispatch<React.SetStateAction<IReportSort>>
  menuItemLabel?: (item: string) => string
  max?: number
}

function SortSelect(props: { items: string[], menuItemLabel: SortProps["menuItemLabel"], sort: [string, "ASC" | "DESC"], index: number, sorts: SortProps["sorts"], setSorts: SortProps["setSorts"] }) {
  const { settings } = useThemeSettings();
  const { items, sort, menuItemLabel, index, sorts, setSorts } = props;
  const item = sort[index];
  return <MuiSelect disableUnderline className="Sort-content-item-category bg-light flex-1 mr-5" value={item}
    onChange={(e) => {
      settings.sound && sounds.click.play()
      sort[index] = e.target.value as any;
      setSorts(JSON.parse(JSON.stringify(sorts)))
    }}>
    {items.map(item =>
      <MenuItem key={item} value={item}>{menuItemLabel ? menuItemLabel(item) : transformTextBySeparator(item)}</MenuItem>
    )}
  </MuiSelect>
}

export default function Sort(props: SortProps) {
  const { theme, settings } = useThemeSettings();
  const { max = 3, items, header, sorts, setSorts, menuItemLabel } = props;
  const canAddSort = sorts.length !== max;

  return <FormGroup className="Sort">
    <InputLabel className="Sort-header">{header}</InputLabel>
    {sorts.length !== 0 && <div className="Sort-content bg-dark flex p-5 fd-c">
      {sorts.map((sort, index) => {
        const [item, order] = sort,
          canMoveDownwards = index !== sorts.length - 1 && sorts.length !== 1,
          canMoveUpwards = index !== 0 && sorts.length !== 1;
        const props = {
          menuItemLabel,
          setSorts,
          sort,
          sorts
        };
        return <div key={`${item}.${order}.${index}`} className={`Sort-content-item bg-base flex p-5 ${index !== sorts.length - 1 ? "pb-0" : ''}`}>
          <SortSelect index={0} items={items} {...props} />
          <SortSelect index={1} items={["ASC", "DESC"]} {...props} />
          <div className="Sort-content-item-icons bg-light p-5 flex jc-c ai-c">
            <div className="Sort-content-item-icons-down mr-5">
              <Hovertips popoverText={"Move downwards"}>
                <FaArrowAltCircleDown fill={canMoveDownwards ? theme.color.opposite_light : grey[500]} size={15} onClick={() => {
                  if (canMoveDownwards) {
                    const nextSort = sorts[index + 1];
                    sorts[index + 1] = sort;
                    sorts[index] = nextSort;
                    setSorts(JSON.parse(JSON.stringify(sorts)))
                  }
                }} />
              </Hovertips>
            </div>
            <div className="Sort-content-item-icons-up mr-5">
              <Hovertips popoverText={"Move upwards"}>
                <FaArrowAltCircleUp fill={canMoveUpwards ? theme.color.opposite_light : grey[500]} size={15} onClick={() => {
                  if (canMoveUpwards) {
                    const prevSort = sorts[index - 1];
                    sorts[index - 1] = sort;
                    sorts[index] = prevSort;
                    setSorts(JSON.parse(JSON.stringify(sorts)))
                  }
                }} />
              </Hovertips>
            </div>
            <div className="Sort-content-item-icons-delete">
              <Hovertips popoverText={`Delete ${item} by ${order} sort`}>
                <MdDelete size={20} fill={red[500]} onClick={() => {
                  settings.sound && sounds.remove.play()
                  sorts[index] = null as any;
                  setSorts(sorts.filter(sort => sort))
                }} />
              </Hovertips>
            </div>
          </div>
        </div>
      })}
    </div>}
    <div className="Sort-add flex jc-c ai-c">
      <Hovertips popoverText={`${canAddSort ? "Add Sort" : "Max sort limit reached"}`}>
        <AiFillPlusCircle size={25} fill={canAddSort ? green[500] : grey[500]} onClick={() => {
          if (canAddSort) {
            settings.sound && sounds.click.play()
            setSorts([...sorts, [items[0], 'ASC']])
          }
        }} />
      </Hovertips>
    </div>
  </FormGroup>
}