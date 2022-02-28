import { useTheme } from "@emotion/react";
import { Popover, PopoverOrigin, Typography } from "@mui/material";
import React, { Fragment, useContext, useEffect } from "react";
import { SettingsContext } from "../context/SettingsContext";
export interface HovertipsProps {
    className?: string;
    popoverText: string;
    children: JSX.Element;
    style?: React.CSSProperties;
    onClick?: () => void;
    popoverAnchorOrigin?: PopoverOrigin;
    popoverTransformOrigin?: PopoverOrigin;
}
export default function Hovertips(props: HovertipsProps) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { settings } = useContext(SettingsContext);
    const theme = useTheme();
    const open = Boolean(anchorEl);
    const { className, popoverText, children, popoverAnchorOrigin = {
        vertical: "bottom",
        horizontal: "center"
    }, popoverTransformOrigin = {
        vertical: "top",
        horizontal: "center"
    } } = props;
    useEffect(() => {
        return () => {
            setAnchorEl(null);
        };
    }, []);
    const generatedProps: React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> = {};
    if (props.onClick)
        generatedProps.onClick = props.onClick;
    return <Fragment>
    <span {...generatedProps} className={`${className ?? ""} flex icon`} style={{ cursor: "pointer", height: "fit-content", ...props.style ?? {} }} onMouseEnter={(e: any) => setAnchorEl(e.currentTarget)} onMouseLeave={() => setAnchorEl(null)}>{children}</span>
    {settings.hovertips && <Popover sx={{
                pointerEvents: "none",
                "& \t.MuiPopover-paper": {
                    backgroundColor: theme.palette.color.dark,
                    padding: theme.spacing(1)
                }
            }} open={open} anchorEl={anchorEl} anchorOrigin={popoverAnchorOrigin} transformOrigin={popoverTransformOrigin} onClose={() => setAnchorEl(null)} disableRestoreFocus><Typography>{popoverText}</Typography></Popover>}
  </Fragment>;
}
