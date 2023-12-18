export function getMainContentId() {
  const location = window.location.href
  if (location.includes('pages')) {
    return '#content';
  } else {
    return '#main';
  }
}
