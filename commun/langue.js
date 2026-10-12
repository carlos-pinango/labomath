/* ============================================
   LABOMATH – Langue (français / anglais), partagée par toutes les pages

   Utilisation dans une page :
   - Écrire le texte en français, et ajouter la version anglaise dans data-en :
       <h1 data-en="Ratios and proportions">Les rapports et les proportions</h1>
     (ne pas mettre un élément avec data-en à l'intérieur d'un autre)
   - Titre de l'onglet : <html data-title-en="…"> (le <title> est en français)
   - Bouton de langue : <button class="lang-btn" id="langBtn">EN</button>
   - Une page avec son propre code peut réagir au changement :
       Langue.onChange(lang => { … });   et lire la langue avec Langue.lang
   ============================================ */

(function () {
  const KEY = 'labomath-lang';
  const listeners = [];
  let lang = 'fr';
  try { if (localStorage.getItem(KEY) === 'en') lang = 'en'; } catch (e) {}

  function apply() {
    const root = document.documentElement;
    root.lang = lang;

    document.querySelectorAll('[data-en]').forEach(el => {
      if (el.dataset.fr === undefined) el.dataset.fr = el.innerHTML;
      el.innerHTML = lang === 'en' ? el.dataset.en : el.dataset.fr;
    });

    if (root.dataset.titleEn) {
      if (root.dataset.titleFr === undefined) root.dataset.titleFr = document.title;
      document.title = lang === 'en' ? root.dataset.titleEn : root.dataset.titleFr;
    }

    const btn = document.getElementById('langBtn');
    if (btn) {
      btn.textContent = lang === 'fr' ? 'EN' : 'FR';
      btn.setAttribute('aria-label', lang === 'fr' ? 'Switch to English' : 'Passer au français');
    }

    listeners.forEach(fn => fn(lang));
  }

  window.Langue = {
    get lang() { return lang; },
    set(newLang) {
      lang = newLang === 'en' ? 'en' : 'fr';
      try { localStorage.setItem(KEY, lang); } catch (e) {}
      apply();
    },
    onChange(fn) { listeners.push(fn); },
  };

  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('langBtn');
    if (btn) btn.addEventListener('click', () => Langue.set(lang === 'fr' ? 'en' : 'fr'));
    apply();
  });
})();
