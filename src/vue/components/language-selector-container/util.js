// lang can have the value: all,none nn, se
export function getLanguageOptions(lang) {
  if (lang === 'none') {
    return null; // lang selector will not show at this point, as there is no options to select from.
  }else if (lang === 'all') {
    return [
      { key:'nb', value: 'Bokmål' },
      { key: 'nn', value: 'Nynorsk' },
      { key: 'se', value: 'Sápmi' }
    ];
  } else if (lang === 'nn') {
    return [
      { key:'nb', value: 'Bokmål' },
      { key:'nn', value: 'Nynorsk' }
    ];
  } else if (lang === 'se') {
    return [
      { key: 'nb', value: 'Bokmål' },
      { key: 'se', value: 'Sápmi' }
    ]
  }
  
}
