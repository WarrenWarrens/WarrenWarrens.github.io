function toggle(element)
{
    const bottomDiv = element.nextElementSibling;
    bottomDiv.classList.toggle("Show");
}

const bar = document.querySelector(".DivIconBar");
const wraps = document.querySelectorAll(".DivWrap");

// scaling hover effect
bar.addEventListener("mousemove", (e) => {
    const rect = bar.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    let maxScale = 1;

    wraps.forEach((wrap) => {
        const icon = wrap.querySelector(".DivIcon");
        const wrapRect = wrap.getBoundingClientRect();
        const iconCenter = wrapRect.left - rect.left + wrapRect.width / 2;
        const distance = Math.abs(mouseX - iconCenter);
        const influence = 150;
        const max = 2.0, min = 1.0;

        let scale = max - (distance / influence) * (max - min);
        if (scale < min) scale = min;

        icon.style.transform = `scale(${scale})`;
        wrap.style.width = 40 * scale + "px";
        if (scale > maxScale) maxScale = scale;
    });

    bar.style.width = 600 + (maxScale - 1) * 120 + "px";
});

bar.addEventListener("mouseleave", () => {
    wraps.forEach((wrap) => {
        const icon = wrap.querySelector(".DivIcon");
        icon.style.transform = "scale(1)";
        wrap.style.width = "40px";
    });
    bar.style.width = "600px";
});

function setupPopup(iconSelector) {
    const icon = document.querySelector(iconSelector);
    const popup = icon.parentElement.querySelector(".DivPopup");

    icon.addEventListener("mouseenter", () => {
        popup.classList.add("visible");
    });

    icon.addEventListener("mouseleave", () => {
        setTimeout(() => {
            if (!popup.matches(":hover")) {
                popup.classList.remove("visible");
            }
        }, 100);
    });

    popup.addEventListener("mouseleave", () => {
        popup.classList.remove("visible");
    });
}

setupPopup(".theme-icon");
setupPopup(".lang-icon");


function positionPopup(icon, popup, offsetX=0) {
    const rect = icon.getBoundingClientRect();
    popup.style.left = rect.left + rect.width / 2 + offsetX + "px";
    popup.style.top = rect.top - popup.offsetHeight + "px";
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToContact()
{
    window.scrollTo({top: 100, behavior: 'smooth'});
}

const buttons = document.querySelectorAll(".DivButtons button");
const contents = document.querySelectorAll(".DivBar4");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const targetId = button.getAttribute("data-target");
        const targetContent = document.getElementById(targetId);
        const isActive = targetContent.classList.contains("active");

        // Reset all
        buttons.forEach(b => b.classList.remove("active"));
        contents.forEach(c => c.classList.remove("active"));

        if (!isActive) {
            // Activate this button + its content
            button.classList.add("active");
            targetContent.classList.add("active");
        }
        // If isActive, clicking again will close (do nothing extra)
    });
});