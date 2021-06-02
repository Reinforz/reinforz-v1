export function generateMenuStyles(
  position: 'right' | 'left',
  isOpen: boolean,
  width: number
) {
  let left = `0px`,
    iconsContainerStyle: React.CSSProperties = {},
    iconStyle: React.CSSProperties = {},
    contentStyle: React.CSSProperties = {
      height: '100%'
    };
  contentStyle.position = `absolute`;
  contentStyle.transition = `width 250ms ease-in-out, left 250ms ease-in-out`;

  if (position === 'right') {
    if (isOpen) {
      left = `calc(100% - 5px)`;
      iconStyle.transform = 'rotate(0deg)';
      iconsContainerStyle.left = '-35px';
      contentStyle.width = `calc(100% - ${width}px)`;
      contentStyle.left = `0px`;
    } else {
      left = '100%';
      iconStyle.transform = 'rotate(-180deg)';
      iconsContainerStyle.left = '-35px';
      contentStyle.width = `100%`;
      contentStyle.left = `0px`;
    }
  } else {
    if (isOpen) {
      left = `-${width}px`;
      iconStyle.transform = 'rotate(-180deg)';
      iconsContainerStyle.left = '100%';
      contentStyle.width = `calc(100% - ${width}px)`;
      contentStyle.left = `${width}px`;
    } else {
      left = `-${width}px`;
      iconStyle.transform = 'rotate(0deg)';
      iconsContainerStyle.left = '100%';
      contentStyle.width = `100%`;
      contentStyle.left = `0px`;
    }
  }

  return { left, contentStyle, iconsContainerStyle, iconStyle };
}
