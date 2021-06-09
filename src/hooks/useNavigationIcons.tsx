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

  const goToDocumentation = () => {
    settings.sound && sounds.swoosh.play()
    const win = window.open(
      REINFORZ_DOC_URL,
      '_blank'
    )!;
    win.focus();
  }

  const goToRepo = () => {
    settings.sound && sounds.swoosh.play()
    const win = window.open(
      REINFORZ_REPO_URL,
      '_blank'
    )!;
    win.focus();
  }

  const onKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const digit = parseInt(e.nativeEvent.code.replace('Digit', ''));
    if (digit) {
      if (digit < paths.length)
        navigate(paths[digit - 1]);
      else if (digit === paths.length + 1)
        goToDocumentation()
      else if (digit === paths.length + 2)
        goToRepo()
    }
  };

  const navigationIcons: [string, JSX.Element][] = [
    [
      'Go to documentation',
      <IoMdDocument
        size={20}
        fill={theme.color.opposite_light}
        onClick={goToDocumentation}
      />
    ],
    [
      'Go to repo',
      <FaGithub
        size={20}
        fill={theme.color.opposite_light}
        onClick={goToRepo}
      />
    ]
  ]

  return {
    onKeyPress,
    navigationIcons
  };
}
