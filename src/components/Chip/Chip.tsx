import React, { ReactNode, CSSProperties } from 'react';

import './Chip.scss';

import SvgIcon from '../SvgIcon';

interface IChip {
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
  text: ReactNode;
  title?: string;
  isActive: boolean;
  isDisabled?: boolean;
}

export default (props: IChip) => {
  const { onClick, className, style, text, title, isActive, isDisabled } = props;

  return (
    <span
      onClick={!isDisabled ? onClick : undefined}
      className={`chip ${isActive && 'chip_active'} ${isDisabled && 'chip_disabled'} ${className}`}
      style={style}
      title={title}
    >
      {isActive && <SvgIcon style={{ marginRight: 8 }} icon="ok" type="secondary" size="16" />}
      {text}
    </span>
  );
};
