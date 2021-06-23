export function generateMenuStyles(
  position: 'right' | 'left',
  isOpen: boolean,
  width: number
) {
  let left = `0px`,
    iconsContainerStyle: React.CSSProperties = {},
    iconStyle: React.CSSProperties = {},
    containerStyle: React.CSSProperties = {};
  containerStyle.position = `relative`;
  containerStyle.transition = `width 250ms ease-in-out, left 250ms ease-in-out`;

  if (position === 'right') {
    if (isOpen) {
      left = `calc(100% - 10px)`;
      iconStyle.transform = 'rotate(0deg)';
      iconsContainerStyle.left = -30;
      containerStyle.width = `calc(100% - ${width}px)`;
      containerStyle.left = `0px`;
    } else {
      left = 'calc(100% + 5px)';
      iconStyle.transform = 'rotate(-180deg)';
      iconsContainerStyle.left = -40;
      containerStyle.width = `100%`;
      containerStyle.left = `0px`;
    }
  } else {
    if (isOpen) {
      left = `-${width}px`;
      iconStyle.transform = 'rotate(-180deg)';
      iconsContainerStyle.left = 'calc(100% - 5px)';
      containerStyle.width = `calc(100% - ${width}px)`;
      containerStyle.left = `${width}px`;
    } else {
      left = `-${width + 10}px`;
      iconStyle.transform = 'rotate(0deg)';
      iconsContainerStyle.left = '100%';
      containerStyle.width = `100%`;
      containerStyle.left = `0px`;
    }
  }

  return { left, containerStyle, iconsContainerStyle, iconStyle };
}
