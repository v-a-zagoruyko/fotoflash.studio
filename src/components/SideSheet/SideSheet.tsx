import React, { ReactNode, CSSProperties } from 'react';
import { CSSTransition } from 'react-transition-group';

import './SideSheet.scss';

interface ISideSheet {
  handleHide: () => void;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  isVisible: boolean;
}

export default (props: ISideSheet) => {
  const { handleHide, className, style, children, isVisible } = props;

  if (isVisible) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }

  return (
    <>
      <CSSTransition classNames="fade" timeout={500} mountOnEnter unmountOnExit in={isVisible}>
        <div className="overlay" onClick={handleHide} />
      </CSSTransition>
      <CSSTransition classNames="slideFromLeft" timeout={500} mountOnEnter unmountOnExit in={isVisible}>
        <aside className={`sideSheet ${className}`} style={style}>
          {children}
        </aside>
      </CSSTransition>
    </>
  );
};
