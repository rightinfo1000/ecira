/* ECIRA Interiors — contact page form submission */
document.addEventListener('DOMContentLoaded', () => {
  const scriptURL = "https://script.google.com/macros/s/AKfycbyYZc_2LzGUJ0FVhqjzCUkAlU1tBimo8_FXOXMFCJPI_mC9KCu0yPGJD1x_-FGP7lRVfA/exec";
  const form = document.getElementById("contactForm");
  const statusDiv = document.getElementById("status");
  if (!form) return;

  form.addEventListener("submit", e => {
    e.preventDefault();
    statusDiv.textContent = "Sending...";
    statusDiv.className = "contact-status";

    fetch(scriptURL, { method: "POST", mode: "no-cors", body: new FormData(form) })
      .then(() => {
        statusDiv.textContent = "Thank you! Your message has been sent successfully.";
        statusDiv.classList.add("success");
        form.reset();
      })
      .catch(() => {
        statusDiv.textContent = "Something went wrong. Please try again.";
        statusDiv.classList.add("error");
      });
  });
});
