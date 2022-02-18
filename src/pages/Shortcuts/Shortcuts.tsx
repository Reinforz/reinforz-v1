import { Box, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useEffect, useRef } from 'react';
import { AiFillHome } from 'react-icons/ai';
import { HiDocumentReport } from 'react-icons/hi';
import { IoMdCreate, IoMdSettings } from 'react-icons/io';
import { IconGroup, StackList } from '../../components';
import { useNavigationIcons, useThemeSettings } from '../../hooks';
import { generateNavigationStyles } from '../../utils';
import './Shortcuts.scss';

function StackListItem(props: { contents: [string, string] }) {
  return <Box className="flex fd-c">
    <Typography>{props.contents[0]}</Typography>
    <Typography className="mt-5 fs-14" style={{ color: grey[300] }}>
      ({props.contents[1]})
    </Typography>
  </Box>
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
    <Box ref={ref} className="Shortcuts page" tabIndex={0} onKeyPress={onKeyPress}>
      <IconGroup
        style={generatedNavigationStyles}
        direction={settings.navigation.direction}
        className="Shortcuts-icons"
        icons={navigationIcons}
      />
      <StackList
        classNames={{
          container: 'center',
          header: 'fs-18 p-10 tt-u'
        }}
        header={'Shortcuts'}
        items={[
          ['Navigation Hovertips #', '#'],
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
    </Box>
  );
}
