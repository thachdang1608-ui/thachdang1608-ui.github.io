const navLinks = document.querySelectorAll('.site-nav a');

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.forEach((item) => item.classList.remove('is-active'));
    link.classList.add('is-active');
  });
});

const passwordProtectionEnabled = false;
const protectedCase = document.body.dataset.protectedCase !== undefined;

if (protectedCase) {
  const password = 'thach2026';
  const publicAccessUntil = new Date('2026-09-13T23:59:59');
  const caseTitle = document.body.dataset.caseTitle || 'Case study';
  const accessDuration = 30 * 60 * 1000;
  let accessTimer;

  if (!passwordProtectionEnabled || Date.now() <= publicAccessUntil.getTime()) {
    document.body.classList.add('case-unlocked');
  } else {
    sessionStorage.removeItem('portfolio-protected-case-access');

    const showPasswordGate = () => {
      clearTimeout(accessTimer);
      document.body.classList.remove('case-unlocked');

      if (document.querySelector('.case-password-gate')) {
        return;
      }

      const gate = document.createElement('main');
      gate.className = 'case-password-gate';
      gate.innerHTML = `
      <section class="case-password-card card" aria-labelledby="case-password-title">
        <a class="brand case-password-brand" href="index.html#top">
          <span class="brand-mark">TD</span>
          <span class="brand-text">Thach Dang Van</span>
        </a>
        <p class="eyebrow">Protected case study</p>
        <h1 id="case-password-title">Enter password to view ${caseTitle}</h1>
        <p class="case-password-copy">This case study includes detailed product work. Please enter the shared password to continue.</p>
        <form class="case-password-form">
          <label for="case-password-input">Password</label>
          <input id="case-password-input" name="password" type="password" autocomplete="current-password" required />
          <p class="case-password-error" role="alert" hidden>Incorrect password. Please try again.</p>
          <div class="case-password-actions">
            <button class="button button-primary" type="submit">Unlock case study</button>
            <a class="button button-secondary" href="index.html#work">Back to work</a>
          </div>
        </form>
      </section>
    `;

      document.body.prepend(gate);

      const form = gate.querySelector('.case-password-form');
      const input = gate.querySelector('#case-password-input');
      const error = gate.querySelector('.case-password-error');

      input.focus();

      form.addEventListener('submit', (event) => {
        event.preventDefault();

        if (input.value === password) {
          document.body.classList.add('case-unlocked');
          gate.remove();
          accessTimer = setTimeout(showPasswordGate, accessDuration);
          return;
        }

        error.hidden = false;
        input.select();
        input.focus();
      });
    };

    showPasswordGate();
  }
}
