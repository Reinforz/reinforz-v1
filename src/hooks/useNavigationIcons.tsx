import { FaGithub } from 'react-icons/fa';
import { IoMdDocument } from 'react-icons/io';
import { useHistory } from 'react-router-dom';
import { REINFORZ_DOC_URL, REINFORZ_REPO_URL } from '../constants';
import sounds from '../sounds';
import useThemeSettings from './useThemeSettings';

export default function useNavigationIcons(paths: string[]) {
  const { theme, settings } = useThemeSettings();
  const history = useHistory();

  const navigate = (path: string) => {
    settings.sound && sounds.swoosh.play();
    settings.shortcuts && history.push(path);
  };

  const onKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const digit = parseInt(e.nativeEvent.code.replace('Digit', ''));
    if (digit) {
      navigate(paths[digit - 1]);
    }
  };

  const navigationIcons: [string, JSX.Element][] = [
    [
      'Go to documentation',
      <IoMdDocument
        size={20}
        fill={theme.color.opposite_light}
        onClick={() => {
          settings.sound && sounds.swoosh.play()
          const win = window.open(
            REINFORZ_DOC_URL,
            '_blank'
          )!;
          win.focus();
        }}
      />
    ],
    [
      'Go to repo',
      <FaGithub
        size={20}
        fill={theme.color.opposite_light}
        onClick={() => {
          settings.sound && sounds.swoosh.play()
          const win = window.open(
            REINFORZ_REPO_URL,
            '_blank'
          )!;
          win.focus();
        }}
      />
    ]
  ]

  return {
    onKeyPress,
    navigationIcons
  };
}
