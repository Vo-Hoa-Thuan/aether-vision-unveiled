/**
 * This script is injected as an inline script in <head> BEFORE anything renders.
 * It prevents the flash-of-wrong-theme by applying the correct class synchronously.
 */
export const themeScript = `
(function() {
  try {
    var stored = localStorage.getItem('aether-theme');
    if (stored === 'light' || stored === 'dark') {
      document.documentElement.classList.add(stored);
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.add('dark');
    }
  } catch(e) {
    document.documentElement.classList.add('dark');
  }
})();
`;
