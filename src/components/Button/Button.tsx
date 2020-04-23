import React, { ReactNode, CSSProperties } from 'react';

import './Button.scss';

interface IButton {
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
  text: ReactNode;
  title?: string;
  type?: 'primary' | 'secondary' | 'success' | 'danger' | 'textOnly';
  size?: 'sm' | 'md';
  isLoading?: boolean;
  isDisabled?: boolean;
}

export default (props: IButton) => {
  const type = props.type || 'textOnly';
  const size = props.size || 'sm';
  const { onClick, className, style, text, title, isLoading, isDisabled } = props;

  return (
    <span
      onClick={!isDisabled ? onClick : undefined}
      className={`btn btn_${type} btn_size_${size} ${isDisabled && 'btn_disabled'} ${className} `}
      style={style}
      title={title}
    >
      {!isLoading && text}
    </span>
  );
};
