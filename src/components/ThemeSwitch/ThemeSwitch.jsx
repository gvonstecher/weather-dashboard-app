import React, { useContext } from 'react';
import { Context } from '../../Context';

import './ThemeSwitch.scss';


const ThemeSwitch = () => {
  const { theme, toggleTheme } = useContext(Context);

  return (
    <label className="theme-switch">
      <input className='theme-switch__input' type="checkbox" checked={theme === 'theme--dark'} onChange={toggleTheme} />
      <span className="theme-switch__slider"></span>
    </label>
  );
};

export default ThemeSwitch;