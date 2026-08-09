document.getElementById("ButtonLanguage").addEventListener("click", function () {
    const langOptions = document.getElementById("Language");
    const themeOptions = document.getElementById("LightDark");
    langOptions.classList.toggle("show");
    // themeOptions.classList.remove("show"); // Hide other if open
});

document.getElementById("ButtonLightDark").addEventListener("click", function () {
    const themeOptions = document.getElementById("LightDark");
    const langOptions = document.getElementById("Language");
    themeOptions.classList.toggle("show");
    // langOptions.classList.remove("show"); // Hide other if open
});

var coll = document.getElementsByClassName("ButtonCollapsible");
for (var i = 0; i < coll.length; i++)
{
    coll[i].addEventListener("click", function()
    {
        this.classList.toggle("active");
        var content = this.previousElementSibling;
        if (content.style.maxHeight)
        {
            content.style.maxHeight = null;
        }
        else
        {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
}


function setTheme(theme) {
    localStorage.setItem('theme', theme);
    document.body.className = theme;
}

window.onload = function () {
    const savedLang = localStorage.getItem('Lang') || 'en';
    const savedTheme = localStorage.getItem('theme') || 'light';
    switchLanguage(savedLang);
    document.getElementById('language-selector').value = savedLang;
    setTheme(savedTheme);
};

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


const texts = [
    { tag: 'h1', content: 'Hey, Im Ryan Warrener. Computer Scientist, Designer, Physicist & Mathematician.' },
    { tag: 'p', content: 'Welcome to my Website portfolio, Please customize your experience with the themes and languages below' },
    { tag: 'p', content: '<3' }
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let delayAfterComplete = 1500;
let typingSpeed = 10;
let deletingSpeed = 5;

function typeEffect() {
    const container = document.getElementById('Typewriter');
    const { tag, content } = texts[textIndex];

    // Ensure tag element exists
    if (!container.querySelector(tag)) {
        container.innerHTML = `<${tag}></${tag}>`;
    }

    const element = container.querySelector(tag);

    if (isDeleting) {
        element.textContent = content.substring(0, charIndex--);
        if (charIndex < 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(typeEffect, 300);
        } else {
            setTimeout(typeEffect, deletingSpeed);
        }
    } else {
        element.textContent = content.substring(0, charIndex++);
        if (charIndex > content.length) {
            isDeleting = true;
            setTimeout(typeEffect, delayAfterComplete);
        } else {
            setTimeout(typeEffect, typingSpeed);
        }
    }
}

window.onload = typeEffect;


