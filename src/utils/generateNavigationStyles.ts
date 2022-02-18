import React from 'react';
import { IGlobalSettings } from '../types';

/**
 * Generate css styles for navigation icons based on navigation direction
 * @param navigationInfo X and Y direction of the navigation icons
 * @returns CSS styles that contains appropriate positions calculated from navigation info
 */
export function generateNavigationStyles(
  navigationInfo: Omit<IGlobalSettings['navigation'], 'direction'>
) {
  const styles: React.CSSProperties = {};
  // Flags to indicate whether we need to negate translation in x or y by 50%
  let translateX = false,
    translateY = false;

  // Updating styles for x direction
  switch (navigationInfo.x) {
    case 'center': {
      styles.left = '50%';
      // We need to translate in x direction by -50% 
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

  // Updating styles for y direction
  switch (navigationInfo.y) {
    case 'center': {
      styles.top = '50%';
      // We need to translate in y direction by -50% 
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

  // Checking whether we need to negate x or y translation be 50%
  if (translateX && !translateY) {
    // Only negate X
    styles.transform = 'translateX(-50%)';
  } else if (!translateX && translateY) {
    // Only negate Y
    styles.transform = 'translateY(-50%)';
  } else if (translateX && translateY) {
    // Negate both X and Y
    styles.transform = 'translate(-50%, -50%)';
  }

  return styles;
}
