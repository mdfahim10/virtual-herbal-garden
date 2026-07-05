// ===========================================
// Animated Statistics Counter
// ===========================================

const counters = document.querySelectorAll(".counter");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const counter = entry.target;

        const target = Number(counter.dataset.target);

        const showPlus = counter.dataset.plus === "true";

        let current = 0;

        const increment = Math.max(1, Math.ceil(target / 150));

        const updateCounter = () => {

            current += increment;

            if (current >= target) {

                counter.textContent = showPlus
                    ? `${target}+`
                    : target;

                return;

            }

            counter.textContent = current;

            requestAnimationFrame(updateCounter);

        };

        updateCounter();

        observer.unobserve(counter);

    });

}, {
    threshold: 0.5
});

counters.forEach(counter => observer.observe(counter));