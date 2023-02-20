type BrowserType = 'Chrome' | 'Safari' | 'Firefox' | 'MSIE' | 'Trident' | 'Edge' | undefined;

export const useBrowser = (): BrowserType => {
  const userAgent = navigator.userAgent;
  if (userAgent.indexOf('Chrome') != -1) {
    return 'Chrome';
  } else if (userAgent.indexOf('Safari') != -1) {
    return 'Safari';
  } else if (userAgent.indexOf('Firefox') != -1) {
    return 'Firefox';
  } else if (userAgent.indexOf('MSIE') != -1) {
    return 'MSIE';
  } else if (userAgent.indexOf('Trident') != -1) {
    return 'Trident';
  } else if (userAgent.indexOf('Edge') != -1) {
    return 'Edge';
  }

  return undefined;
};
