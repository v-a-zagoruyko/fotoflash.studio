import React, { HTMLProps, CSSProperties, ChangeEvent } from 'react';

import './Input.scss';

interface IInput extends HTMLProps<HTMLInputElement> {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  style?: CSSProperties;
  type: 'number' | 'text' | 'password';
  value?: string | number;
  defaultValue?: string | number;
  label?: string;
  min?: number;
  max?: number;
  isDisabled?: boolean;
}

export default (props: IInput) => {
  const { onChange, className, style, type, value, defaultValue, label, min, max, isDisabled } = props;

  return (
    <div className={`inputWrapper ${className}`}>
      {type === 'number' && (
        <input
          onChange={!isDisabled ? onChange : undefined}
          className={`input ${isDisabled && 'input_disabled'} `}
          style={style}
          type="tel"
          value={value}
          defaultValue={defaultValue}
          min={min}
          max={max}
          disabled={isDisabled}
        />
      )}
      {type === 'text' && (
        <input
          onChange={!isDisabled ? onChange : undefined}
          className={`input ${isDisabled && 'input_disabled'} `}
          style={style}
          type="text"
          value={value}
          defaultValue={defaultValue}
          disabled={isDisabled}
        />
      )}
      {type === 'password' && (
        <input
          onChange={!isDisabled ? onChange : undefined}
          className={`input ${isDisabled && 'input_disabled'} `}
          style={style}
          type="password"
          value={value}
          disabled={isDisabled}
        />
      )}
      <label className={`input-label ${value && 'input-label_force'}`}>{label}</label>
    </div>
  );
};
