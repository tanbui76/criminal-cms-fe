import React from 'react';
import EnSvg from 'assets/i18n/en.svg';
import NeSvg from 'assets/i18n/ne.svg';
import ViPng from 'assets/i18n/vi.png';

export const appLocales = [
  { label: 'vi', flag: <img alt="vi" src={ViPng} /> },
  { label: 'en', flag: <img alt="en" src={EnSvg} /> },
  { label: 'ne', flag: <img alt="ne" src={NeSvg} /> },
];
