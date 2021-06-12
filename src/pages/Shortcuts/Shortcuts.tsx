import { useEffect, useRef } from "react";
import { AiFillHome } from "react-icons/ai";
import { HiDocumentReport } from "react-icons/hi";
import { IoMdCreate, IoMdSettings } from "react-icons/io";
import { IconGroup, StackList } from "../../components";
import { useNavigationIcons, useThemeSettings } from "../../hooks";
import { generateNavigationStyles } from "../../utils";
import "./Shortcuts.scss";

export default function Shortcuts() {
  const { settings } = useThemeSettings();
  const { navigationIcons, onKeyPress } = useNavigationIcons([{
    path: "/settings",
    component: IoMdSettings
  }, {
    path: "/",
    component: AiFillHome,
  }, {
    path: "/report",
    component: HiDocumentReport
  }, {
    path: "/create",
    component: IoMdCreate
  }]);

  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    ref.current && ref.current.focus();
  }, [])

  const generatedNavigationStyles = generateNavigationStyles(settings.navigation);

  return <div ref={ref} className="Shortcuts" tabIndex={0} onKeyPress={onKeyPress}>
    <IconGroup style={generatedNavigationStyles} direction={settings.navigation.direction} className="Shortcuts-icons" icons={navigationIcons} />
    <StackList header={"Shortcuts"} items={[['Navigation Icon #', '#'], ['Selecting Option #', '#'], ['Previous preset', 'Alt+A'], ['Next preset', 'Alt+S'], ['Next question', 'Alt+A']]} />
  </div>
}