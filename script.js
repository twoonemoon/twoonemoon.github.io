(() => {
  const root = document.documentElement;
  const language = document.getElementById('language');
  const theme = document.getElementById('theme');
  function remember(key, value) {
    try { localStorage.setItem(key, value); } catch { /* Browser storage may be disabled. */ }
  }
  function setLanguage(value) {
    root.lang = value === 'en' ? 'en' : 'ru';
    const english = root.lang === 'en';
    language.textContent = english ? 'RU' : 'EN';
    language.setAttribute('aria-label', english ? 'Переключить на русский' : 'Switch to English');
    theme.setAttribute('aria-label', english ? 'Switch colour theme' : 'Сменить тему');
    document.title = english ? 'Semyon Gridin — Java & Embedded | twoonemoon' : 'Семён Гридин — Java & Embedded | twoonemoon';
    remember('portfolio-language', root.lang);
  }
  try {
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme === 'light' || savedTheme === 'dark') root.dataset.theme = savedTheme;
    setLanguage(localStorage.getItem('portfolio-language'));
  } catch { setLanguage('ru'); }
  language.hidden = false;
  theme.hidden = false;
  language.addEventListener('click', () => setLanguage(root.lang === 'ru' ? 'en' : 'ru'));
  theme.addEventListener('click', () => {
    const current = root.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    root.dataset.theme = current === 'dark' ? 'light' : 'dark';
    remember('portfolio-theme', root.dataset.theme);
  });
})();
