const navLinks = document.querySelectorAll('.site-nav a');
const themeToggle = document.querySelector('[data-theme-toggle]');
const themeToggleText = themeToggle?.querySelector('.theme-toggle-text');

const getPreferredTheme = () => {
  const storedTheme = window.localStorage.getItem('portfolio-theme');

  if (storedTheme === 'dark' || storedTheme === 'light') {
    return storedTheme;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const applyTheme = (theme) => {
  const isDark = theme === 'dark';

  document.documentElement.dataset.theme = theme;

  if (!themeToggle || !themeToggleText) {
    return;
  }

  themeToggle.setAttribute('aria-pressed', String(isDark));
  themeToggle.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} mode`);
  themeToggleText.textContent = isDark ? 'Light' : 'Dark';
};

applyTheme(getPreferredTheme());

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.forEach((item) => item.classList.remove('is-active'));
    link.classList.add('is-active');
  });
});

themeToggle?.addEventListener('click', () => {
  const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';

  window.localStorage.setItem('portfolio-theme', nextTheme);
  applyTheme(nextTheme);
});
