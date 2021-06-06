import { FormGroup, InputLabel, MenuItem, Select as MuiSelect } from "@material-ui/core";
import { AiFillPlusCircle } from "react-icons/ai";
import { useThemeSettings } from "../../hooks";
import Icon from "../Icon";
import "./Sort.scss";

interface Props {
  header: string
  items: string[]
  sorts: [string, 'ASC' | 'DESC'][]
  setSorts: React.Dispatch<React.SetStateAction<[string, 'ASC' | 'DESC'][]>>
  menuItemLabel: (item: string) => string
  maxSort?: number
}

export default function Sort(props: Props) {
  const { theme } = useThemeSettings();
  const { maxSort, items, header, sorts, setSorts, menuItemLabel } = props;

  return <FormGroup className="Sort">
    <InputLabel className="Sort-header">{header}</InputLabel>
    <div style={{ background: theme.color.dark, display: 'flex', flexDirection: 'column', padding: 2.5, margin: 2.5 }} className="Sort-content">
      {sorts.map((sort) => {
        const [item, order] = sort;
        return <div className="Sort-content-item" style={{ display: 'flex', background: theme.color.light, padding: 2.5, margin: 2.5 }}>
          <MuiSelect style={{ flex: 1 }} value={item}
            onChange={(e) => {
              sort[0] = e.target.value as any;
              setSorts(JSON.parse(JSON.stringify(sorts)))
            }}>
            {items.map(item =>
              <MenuItem key={item} value={item}>{menuItemLabel(item)}</MenuItem>
            )}
          </MuiSelect>

          <MuiSelect style={{ flex: 1 }} value={order}
            onChange={(e) => {
              sort[1] = e.target.value as any;
              setSorts(JSON.parse(JSON.stringify(sorts)))
            }}>
            {["ASC", "DESC"].map(item =>
              <MenuItem key={item} value={item}>{menuItemLabel(item)}</MenuItem>
            )}
          </MuiSelect>
        </div>
      })}
    </div>
    {sorts.length !== maxSort && <div className="Sort-add">
      <Icon popoverText="Add Sort">
        <AiFillPlusCircle size={25} fill="#36e336" onClick={() => setSorts([...sorts, [items[0], 'ASC']])} />
      </Icon>
    </div>}
  </FormGroup>
}