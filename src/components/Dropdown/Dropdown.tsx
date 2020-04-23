import React, { ReactNode, CSSProperties, useState } from 'react';

import { Chip } from '..';

import './Dropdown.scss';

interface IDropdown {
  onClick: (item: string) => void;
  className?: string;
  style?: CSSProperties;
  text: ReactNode;
  options: string[];
}

export default (props: IDropdown) => {
  const [isOpened, setOpened] = useState(false);
  const { onClick, className, style, text, options } = props;
  const [currentItem, setCurrentItem] = useState('');

  function handleSelect(item: string) {
    setOpened(false);
    setCurrentItem(item);
    onClick(item);
  }

  return (
    // <div onClick={() => setOpened(!isOpened)} className={`dropdownContainer ${className}`} style={style}>
    //   <span className="dropdownContainer-title">{text}</span>
    //   {isOpened && (
    //     <div className="dropdownList">
    //       {options.map(x => (
    //         <span key={`dropdownList${x}`} onClick={() => handleSelect(x)} className="dropdownList-title">
    //           {x}
    //         </span>
    //       ))}
    //     </div>
    //   )}
    // </div>
    <div className={`dropdownContainer ${className}`}>
      {options.map((x, key) => (
        <div key={`dropdownList${key}`} onClick={() => handleSelect(x)}>
          <Chip style={{ marginRight: '15px' }} text={x} isActive={currentItem === x || (currentItem === '' && key === 0)} />
        </div>
      ))}
    </div>
  );
};
