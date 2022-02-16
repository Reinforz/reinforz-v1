import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { IoMdDocument } from 'react-icons/io';
import { IconType } from 'react-icons/lib';
import { useNavigate } from 'react-router-dom';
import { REINFORZ_DOCS_URL, REINFORZ_REPO_URL } from '../constants';
import sounds from '../sounds';
import useThemeSettings from './useThemeSettings';

export default function useNavigationIcons(iconInfos: { path: string, component: IconType, size?: number, fill?: string, page?: string, onClick?: (e: React.MouseEventHandler<SVGElement>) => void, popoverText?: string }[]) {
  const { theme, settings } = useThemeSettings();
  const navigate = useNavigate();

  const goto = (path: string, forShortcuts: boolean) => {
    settings.sound && sounds.swoosh.play();
    if (forShortcuts) {
      settings.shortcuts && navigate(path);
    } else {
      navigate(path);
    }
  };

  const goToDocumentation = () => {
    settings.sound && sounds.swoosh.play()
    const win = window.open(
      REINFORZ_DOCS_URL,
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
        iconInfo.onClick ? iconInfo.onClick(e as any) : goto(iconInfo.path, true);
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
    return [iconInfo.popoverText ?? `Go to ${iconInfo.page ?? popoverTextPage} page`, React.createElement(iconInfo.component, {
      fill: iconInfo.fill ?? theme.palette.color.opposite_light, size: iconInfo.size ?? 20, onClick: (e) => {
        if (iconInfo.onClick) {
          iconInfo.onClick(e as any)
        } else {
          goto(iconInfo.path, false)
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
        fill={theme.palette.color.opposite_light}
        onClick={goToDocumentation}
      />
    ],
    [
      'Go to repo',
      <FaGithub
        size={20}
        fill={theme.palette.color.opposite_light}
        onClick={goToRepo}
      />
    ]
  ]

  return {
    onKeyPress,
    navigationIcons
  };
}
