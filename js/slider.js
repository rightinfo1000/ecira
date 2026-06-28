document.addEventListener('DOMContentLoaded', () => {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    let autoPlay = setInterval(() => showSlide(currentSlide + 1), 5000);

    window.changeSlide = function (step) {
        clearInterval(autoPlay);
        showSlide(currentSlide + step);
        autoPlay = setInterval(() => showSlide(currentSlide + 1), 5000);
    };

    showSlide(0);
});
function openTab(evt, stepName) {
    document.querySelectorAll('.tab-content').forEach(c => {
        c.classList.remove('active');
    });
    document.querySelectorAll('.tab-btn').forEach(b => {
        b.classList.remove('active');
    });
    document.getElementById(stepName).classList.add('active');
    if (evt) evt.currentTarget.classList.add('active');
}
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.faq-question').forEach(button => {
        button.addEventListener('click', () => {
            const item = button.closest('.faq-item');
            const answer = item.querySelector('.faq-answer');
            const isOpen = item.classList.contains('active');

            document.querySelectorAll('.faq-item').forEach(other => {
                other.classList.remove('active');
                const otherAnswer = other.querySelector('.faq-answer');
                if (otherAnswer) otherAnswer.style.maxHeight = null;
                const icon = other.querySelector('.icon');
                if (icon) icon.textContent = '+';
            });

            if (!isOpen) {
                item.classList.add('active');
                if (answer) answer.style.maxHeight = answer.scrollHeight + 'px';
                const icon = item.querySelector('.icon');
                if (icon) icon.textContent = '−';
            }
        });
    });
});