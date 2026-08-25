const translations = {
  en: {
    welcome: "Welcome to my portfolio",
    intro: "I'm a developer who enjoys making cool stuff."
  },
  fr: {
    welcome: "Bienvenue sur mon portfolio",
    intro: "Je suis un développeur qui aime créer des choses sympas."
  },
  ru: {
    welcome: "Добро пожаловать в мое портфолио",
    intro: "Я разработчик, который любит делать крутые вещи."
  }
};

function switchLanguage(Lang) {
  localStorage.setItem('Lang', Lang);
  document.querySelectorAll('[data-key]').forEach(el => {
    const key = el.getAttribute('data-key');
    el.textContent = translations[Lang][key];
  });
}

