export type Theme = 'light' | 'dark'

/** localStorage key holding an explicit choice. Absent means "follow the OS". */
export const THEME_STORAGE_KEY = 'theme'

/**
 * Runs blocking in <head>, before the browser paints anything.
 *
 * A static export has no server, so nothing can know the visitor's theme at
 * build time. Without this, dark-mode visitors get a flash of white on every
 * page load while React hydrates. Resolving `data-theme` here instead means
 * the first paint is already correct.
 *
 * Kept small and dependency-free on purpose — it blocks rendering.
 */
export const themeInitScript = `
(function(){try{
var t=localStorage.getItem('${THEME_STORAGE_KEY}');
if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}
document.documentElement.dataset.theme=t
}catch(e){document.documentElement.dataset.theme='light'}})()
`.replace(/\n/g, '')
