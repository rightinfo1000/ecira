/* ECIRA Interiors — shared site behaviour
   Header/footer markup now lives directly in each HTML page (for SEO),
   this file only wires up interactivity. */

document.addEventListener('DOMContentLoaded', function () {
  /* ---------- Mobile nav toggle ---------- */
  const siteNav = document.getElementById('siteNav');
  const menuIcon = document.getElementById('menuIcon');

  if (menuIcon && siteNav) {
    menuIcon.addEventListener('click', function (e) {
      const isOpen = siteNav.classList.toggle('active');
      menuIcon.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    document.addEventListener('click', function (e) {
      if (!menuIcon.contains(e.target) && !siteNav.contains(e.target)) {
        siteNav.classList.remove('active');
        menuIcon.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- Mobile sticky nav hide-on-scroll ---------- */
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('mobileNav');
    if (!nav) return;
    const cur = window.pageYOffset;
    nav.style.transform = (cur > lastScroll && cur > 50) ? 'translateY(100%)' : 'translateY(0)';
    lastScroll = cur;
  });

  /* ---------- WhatsApp direct-app open on mobile ---------- */
  const whatsappBtns = document.querySelectorAll('a[href^="https://wa.me"]');
  whatsappBtns.forEach(btn => {
    btn.addEventListener('click', function (e) {
      if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        setTimeout(() => window.open(this.href, '_blank'), 1500);
      }
    });
  });

  /* ---------- Auto enquiry popup (once per session) ---------- */
  if (!sessionStorage.getItem('eciraPopupShown')) {
    setTimeout(() => {
      openPopup();
      sessionStorage.setItem('eciraPopupShown', 'true');
    }, 30000);
  }
});

/* ===== Enquiry popup ===== */
function openPopup() {
  const popup = document.getElementById('enquiryPopup');
  if (popup) popup.classList.add('active');
}

function closePopup() {
  const popup = document.getElementById('enquiryPopup');
  if (!popup) return;
  popup.classList.remove('active');
  const formContainer = document.getElementById('formContainer');
  const thankYou = document.getElementById('thankYouMsg');
  if (formContainer) formContainer.style.display = 'block';
  if (thankYou) thankYou.style.display = 'none';
  const btn = document.getElementById('submitBtn');
  if (btn) { btn.disabled = false; btn.innerText = 'SUBMIT'; }
  sessionStorage.setItem('eciraPopupShown', 'true');
}

function handleFormSubmit(e) {
  e.preventDefault();
  const scriptURL = 'https://script.google.com/macros/s/AKfycbyYZc_2LzGUJ0FVhqjzCUkAlU1tBimo8_FXOXMFCJPI_mC9KCu0yPGJD1x_-FGP7lRVfA/exec';
  const form = document.getElementById('g-form');
  const btn = document.getElementById('submitBtn');

  btn.disabled = true;
  btn.innerText = 'Sending...';
  const formData = new FormData(form);

  fetch(scriptURL, { method: 'POST', mode: 'no-cors', body: formData })
    .then(() => {
      document.getElementById('formContainer').style.display = 'none';
      document.getElementById('thankYouMsg').style.display = 'block';
      form.reset();
    })
    .catch(() => {
      btn.disabled = false;
      btn.innerText = 'SUBMIT';
      alert('Network error! WhatsApp: 9987228829');
    })
    .finally(() => {
      setTimeout(closePopup, 2000);
    });
}

function copyLink() {
  navigator.clipboard.writeText(window.location.href);
  alert('Link copied!');
}
