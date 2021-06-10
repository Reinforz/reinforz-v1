import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { IoMdDocument } from 'react-icons/io';
import { IconType } from 'react-icons/lib';
import { useHistory } from 'react-router-dom';
import { REINFORZ_DOC_URL, REINFORZ_REPO_URL } from '../constants';
import sounds from '../sounds';
import useThemeSettings from './useThemeSettings';

export default function useNavigationIcons(iconInfos: { path: string, component: IconType, size?: number, fill?: string, page?: string, onClick?: (e: React.MouseEventHandler<SVGElement>) => void }[]) {
  const { theme, settings } = useThemeSettings();
  const history = useHistory();

  const navigate = (path: string, forShortcuts: boolean) => {
    settings.sound && sounds.swoosh.play();
    if (forShortcuts) {
      settings.shortcuts && history.push(path);
    } else {
      history.push(path);
    }
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
      if (digit <= iconInfos.length) {
        const iconInfo = iconInfos[digit - 1];
        iconInfo.onClick ? iconInfo.onClick(e as any) : navigate(iconInfo.path, true);
      }
      else if (digit === iconInfos.length + 1)
        goToDocumentation()
      else if (digit === iconInfos.length + 2)
        goToRepo()
    }
  };

  const generatedIcons: [string, JSX.Element][] = iconInfos.map(iconInfo => {
    let popoverTextPage = iconInfo.path.replace("/", "");
    popoverTextPage = popoverTextPage.charAt(0).toUpperCase() + popoverTextPage.substr(1);
    return [`Go to ${iconInfo.page ?? popoverTextPage} page`, React.createElement(iconInfo.component, {
      fill: iconInfo.fill ?? theme.color.opposite_light, size: iconInfo.size ?? 20, onClick: (e) => {
        if (iconInfo.onClick) {
          iconInfo.onClick(e as any)
        } else {
          navigate(iconInfo.path, false)
        }
      }
    })]
  })

  const navigationIcons: [string, JSX.Element][] = [
    ...generatedIcons,
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
