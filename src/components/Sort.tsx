import { Box, FormGroup, InputLabel, MenuItem, Select as MuiSelect } from "@mui/material";
import { green, grey, red } from "@mui/material/colors";
import { AiFillPlusCircle } from "react-icons/ai";
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useThemeSettings } from "../hooks";
import useSounds from "../hooks/useSounds";
import { IReportSort } from "../types";
import { transformTextBySeparator } from "../utils";
import Hovertips from "./Hovertips";
export interface SortProps {
    header: string;
    items: string[];
    sorts: IReportSort;
    setSorts: React.Dispatch<React.SetStateAction<IReportSort>>;
    menuItemLabel?: (item: string) => string;
    max?: number;
}
function SortSelect(props: {
    items: string[];
    menuItemLabel: SortProps["menuItemLabel"];
    sort: [
        string,
        "ASC" | "DESC"
    ];
    index: number;
    sorts: SortProps["sorts"];
    setSorts: SortProps["setSorts"];
}) {
    const { click } = useSounds();
    const { items, sort, menuItemLabel, index, sorts, setSorts } = props;
    const item = sort[index];
    return <MuiSelect className="Sort-content-item-category bg-light flex-1 " value={item} onChange={(e) => {
            click();
            sort[index] = e.target.value as any;
            setSorts(JSON.parse(JSON.stringify(sorts)));
        }}>
    {items.map(item => <MenuItem key={item} value={item}>{menuItemLabel ? menuItemLabel(item) : transformTextBySeparator(item)}</MenuItem>)}
  </MuiSelect>;
}
export default function Sort(props: SortProps) {
    const { theme } = useThemeSettings();
    const { max = 3, items, header, sorts, setSorts, menuItemLabel } = props;
    const canAddSort = sorts.length !== max;
    const { remove, click } = useSounds();
    return <FormGroup className="Sort">
    <InputLabel className="Sort-header">{header}</InputLabel>
    {sorts.length !== 0 && <Box className="Sort-content bg-dark flex p-1 flex-col">
      {sorts.map((sort, index) => {
                const [item, order] = sort, canMoveDownwards = index !== sorts.length - 1 && sorts.length !== 1, canMoveUpwards = index !== 0 && sorts.length !== 1;
                const props = {
                    menuItemLabel,
                    setSorts,
                    sort,
                    sorts
                };
                return <Box key={`${item}.${order}.${index}`} className={`Sort-content-item bg-base flex p-1 ${index !== sorts.length - 1 ? "pb-0" : ""}`}>
          <SortSelect index={0} items={items} {...props}/>
          <SortSelect index={1} items={["ASC", "DESC"]} {...props}/>
          <Box className="Sort-content-item-icons bg-light p-1 flex justify-center items-center">
            <Box className="Sort-content-item-icons-down ">
              <Hovertips popoverText={"Move downwards"}>
                <FaArrowAltCircleDown fill={canMoveDownwards ? theme.palette.color.opposite_light : grey[500]} size={15} onClick={() => {
                        if (canMoveDownwards) {
                            const nextSort = sorts[index + 1];
                            sorts[index + 1] = sort;
                            sorts[index] = nextSort;
                            setSorts(JSON.parse(JSON.stringify(sorts)));
                        }
                    }}/>
              </Hovertips>
            </Box>
            <Box className="Sort-content-item-icons-up ">
              <Hovertips popoverText={"Move upwards"}>
                <FaArrowAltCircleUp fill={canMoveUpwards ? theme.palette.color.opposite_light : grey[500]} size={15} onClick={() => {
                        if (canMoveUpwards) {
                            const prevSort = sorts[index - 1];
                            sorts[index - 1] = sort;
                            sorts[index] = prevSort;
                            setSorts(JSON.parse(JSON.stringify(sorts)));
                        }
                    }}/>
              </Hovertips>
            </Box>
            <Box className="Sort-content-item-icons-delete">
              <Hovertips popoverText={`Delete ${item} by ${order} sort`}>
                <MdDelete size={20} fill={red[500]} onClick={() => {
                        remove();
                        sorts[index] = null as any;
                        setSorts(sorts.filter(sort => sort));
                    }}/>
              </Hovertips>
            </Box>
          </Box>
        </Box>;
            })}
    </Box>}
    <Box className="Sort-add flex justify-center items-center">
      <Hovertips popoverText={`${canAddSort ? "Add Sort" : "Max sort limit reached"}`}>
        <AiFillPlusCircle size={25} fill={canAddSort ? green[500] : grey[500]} onClick={() => {
            if (canAddSort) {
                click();
                setSorts([...sorts, [items[0], "ASC"]]);
            }
        }}/>
      </Hovertips>
    </Box>
  </FormGroup>;
}
