import React from 'react';
import { IGlobalSettings } from '../types';

export function generateNavigationStyles(
  navigationInfo: Omit<IGlobalSettings['navigation'], 'direction'>
) {
  const styles: React.CSSProperties = {};
  let translateX = false,
    translateY = false;
  switch (navigationInfo.x) {
    case 'center': {
      styles.left = '50%';
      translateX = true;
      break;
    }
    case 'right': {
      styles.right = '0px';
      break;
    }
    case 'left': {
      styles.left = '0px';
      break;
    }
  }

  switch (navigationInfo.y) {
    case 'center': {
      styles.top = '50%';
      translateY = true;
      break;
    }
    case 'top': {
      styles.top = '0px';
      break;
    }
    case 'bottom': {
      styles.bottom = '0px';
      break;
    }
  }

  if (translateX && !translateY) {
    styles.transform = 'translateX(-50%)';
  } else if (!translateX && translateY) {
    styles.transform = 'translateY(-50%)';
  } else if (translateX && translateY) {
    styles.transform = 'translate(-50%, -50%)';
  }

  return styles;
}
