import React from 'react';
import ReactSVG from 'react-svg';

import './SvgIcon.scss';

import ok from '../../assets/svg/ok.svg';
import back from '../../assets/svg/back.svg';
import down from '../../assets/svg/down.svg';
import location from '../../assets/svg/location.svg';
import instagram from '../../assets/svg/instagram.svg';
import trash from '../../assets/svg/trash.svg';
import user from '../../assets/svg/user.svg';
import vk from '../../assets/svg/vk.svg';
import left from '../../assets/svg/left.svg';
import right from '../../assets/svg/right.svg';
import signOut from '../../assets/svg/signOut.svg';
import home from '../../assets/svg/home.svg';
import camera from '../../assets/svg/camera.svg';
import calendar from '../../assets/svg/calendar.svg';

interface ISvg {
  className?: string;
  style?: React.CSSProperties;
  icon:
    | 'ok'
    | 'back'
    | 'docs'
    | 'down'
    | 'location'
    | 'trash'
    | 'user'
    | 'instagram'
    | 'vk'
    | 'left'
    | 'right'
    | 'home'
    | 'camera'
    | 'calendar'
    | 'signOut';
  type?: 'primary' | 'secondary' | 'success' | 'danger' | 'black';
  size?: '16' | '18';
}

export default (props: ISvg) => {
  let src = '';
  const { className, style, icon, type, size } = props;
  const iconSize = size || '16';

  switch (icon) {
    case 'ok':
      src = ok;
      break;
    case 'back':
      src = back;
      break;
    case 'down':
      src = down;
      break;
    case 'location':
      src = location;
      break;
    case 'trash':
      src = trash;
      break;
    case 'user':
      src = user;
      break;
    case 'instagram':
      src = instagram;
      break;
    case 'vk':
      src = vk;
      break;
    case 'left':
      src = left;
      break;
    case 'right':
      src = right;
      break;
    case 'signOut':
      src = signOut;
      break;
    case 'home':
      src = home;
      break;
    case 'camera':
      src = camera;
      break;
    case 'calendar':
      src = calendar;
      break;
    default:
      src = ok;
  }

  return <ReactSVG className={`icon icon_${type} icon_size_${iconSize} ${className}`} style={style} src={src} />;
};
