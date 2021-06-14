import { grey } from '@material-ui/core/colors';
import { useEffect, useRef } from 'react';
import { AiFillHome } from 'react-icons/ai';
import { HiDocumentReport } from 'react-icons/hi';
import { IoMdCreate, IoMdSettings } from 'react-icons/io';
import { IconGroup, StackList } from '../../components';
import { useNavigationIcons, useThemeSettings } from '../../hooks';
import { generateNavigationStyles } from '../../utils';
import './Shortcuts.scss';

function StackListItem(props: { contents: [string, string] }) {
  return <div style={{ display: 'flex', flexDirection: 'column' }}>
    <div>{props.contents[0]}</div>
    <div style={{ color: grey[300], marginTop: 5, fontSize: 14 }}>
      ({props.contents[1]})
    </div>
  </div>
}

export default function Shortcuts() {
  const { settings } = useThemeSettings();
  const { navigationIcons, onKeyPress } = useNavigationIcons([
    {
      path: '/settings',
      component: IoMdSettings
    },
    {
      path: '/',
      component: AiFillHome
    },
    {
      path: '/report',
      component: HiDocumentReport
    },
    {
      path: '/create',
      component: IoMdCreate
    }
  ]);

  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    ref.current && ref.current.focus();
  }, []);

  const generatedNavigationStyles = generateNavigationStyles(
    settings.navigation
  );

  return (
    <div ref={ref} className="Shortcuts" tabIndex={0} onKeyPress={onKeyPress}>
      <IconGroup
        style={generatedNavigationStyles}
        direction={settings.navigation.direction}
        className="Shortcuts-icons"
        icons={navigationIcons}
      />
      <StackList
        header={'Shortcuts'}
        items={[
          ['Navigation Icon #', '#'],
          ['Selecting Option #', '#'],
          ['Previous preset', 'Alt+A'],
          ['Next preset', 'Alt+S'],
          ['Next question', 'Alt+A'],
          [
            <StackListItem contents={['Select upto clicked option', 'keeping rest of the options in their state']} />,
            'Shift + LMB'
          ],
          [
            <StackListItem contents={['Select upto clicked option', 'deselecting rest of the options']} />,
            'Shift + Ctrl + LMB'
          ],
          [
            <StackListItem contents={['Select from clicked option to end', 'keeping rest of the options in their state']} />,
            'Shift + Alt + LMB'
          ],
          [
            <StackListItem contents={['Select from clicked option to end', 'deselecting rest of the options']} />,
            'Shift + Ctrl + Alt + LMB'
          ],
          [
            <StackListItem contents={['Reversing checked state', 'based on the checked state of the clicked option']} />,
            'Alt + LMB'
          ]
        ]}
      />
    </div>
  );
}
