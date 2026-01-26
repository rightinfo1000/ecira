document.addEventListener("DOMContentLoaded", function() {
  const footerHTML = `
<!-- DESKTOP LEFT VERTICAL BUTTONS -->
<div class="side-enquiry-btns left-side">
  <button class="enq-btn" onclick="openPopup()">ENQUIRY</button>
  <a href="service.html" class="enq-btn quote-btn">GET QUOTE</a>
</div>

<!-- NEW 3-COLUMN PREMIUM FOOTER -->
<footer class="premium-footer-3col">
  <div class="footer-container-3col">
    <!-- Column 1: Company Info -->
    <div class="footer-col">
      <h3>Premium Interior Solutions</h3>
      <p>Premium interior solutions delivering modern design, functionality, and flawless execution.</p>
      <div class="features">
        <span>✔ 100% Customized Interiors</span>
        <span>✔ 10 Years Warranty</span>
        <span>✔ Transparent Pricing</span>
      </div>
    </div>
    
    <!-- Column 2: Quick Links -->
    <div class="footer-col">
      <h4>Quick Links</h4>
      <ul>
        <li><a href="service.html">Calculator</a></li>
        <li><a href="service.html">Our Services</a></li>
        <li><a href="3d-design.html">3D Design</a></li>
        <li><a href="gallery.html">Design Gallery</a></li>
        <li><a href="projects.html">Completed Projects</a></li>
        <li><a href="about.html">About Us</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </div>
    
    <!-- Column 3: Contact -->
    <div class="footer-col">
      <h4>Contact</h4>
      <p>📞 <a href="tel:+919987228829">99872 28829</a></p>
      <p>💬 <a href="https://wa.me/919987228829">WhatsApp</a></p>
      <p>✉️ <a href="mailto:my@ecira.in">my@ecira.in</a></p>
      <p>Nagar Road Wagholi<br>Pune 412207</p>
      <div class="social">
        <a href="https://www.facebook.com/profile.php?id=61584722850614">Facebook</a>
      </div>
    </div>
  </div>
  
  <!-- Bottom Copyright + Share -->
  <div class="footer-bottom">
    <div class="share-links">
      <span>Share:</span> FB | WA | IN | X | <span onclick="copyLink()" style="color:#00d4aa; cursor:pointer;">Copy</span>
    </div>
    <p>&copy; 2026 ECIRA. All Rights Reserved.</p>
  </div>
</footer>

<style>
.premium-footer-3col {
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  color: #fff;
  padding: 40px 0 20px;
  font-family: Arial, sans-serif;
}
.footer-container-3col {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  gap: 30px;
  justify-content: space-between;
}
.footer-col { flex: 1; }
.footer-col h3 { color: #00d4aa; margin-bottom: 15px; font-size: 22px; }
.footer-col h4 { color: #fff; margin-bottom: 15px; font-size: 18px; }
.footer-col p { margin-bottom: 10px; line-height: 1.6; }
.footer-col ul { list-style: none; padding: 0; }
.footer-col ul li { margin-bottom: 8px; }
.footer-col a { color: #ccc; text-decoration: none; transition: color 0.3s; }
.footer-col a:hover { color: #00d4aa; }
.features span { display: block; margin-bottom: 5px; font-size: 14px; }
.social { margin-top: 15px; }
.social a { color: #00d4aa; font-weight: bold; }
.footer-bottom {
  border-top: 1px solid #444;
  margin-top: 30px;
  padding-top: 20px;
  text-align: center;
}
.share-links span { cursor: pointer; color: #00d4aa; margin: 0 5px; font-weight: bold; }
.share-links span:hover { opacity: 0.8; }
@media (max-width: 768px) {
  .footer-container-3col { flex-direction: column; gap: 20px; }
  .footer-col h3 { font-size: 20px; }
  .footer-col h4 { font-size: 16px; }
}
</style>

<!-- WHATSAPP FIXED BUTTON -->
<a href="https://wa.me/919987228829" 
   style="position:fixed; bottom:50px; right:20px; z-index:9999; width:60px; height:60px; border-radius:20%; overflow:hidden; box-shadow:0 1px 10px rgba(37,211,102,0.5); background:#25D366;" target="_blank" rel="noopener">
  <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp Ecira Pune" style="width:100%; height:100%; object-fit:cover;">
</a>

<!-- MOBILE STICKY NAV -->
<div class="mobile-sticky-nav" id="mobileNav">
  <a href="index.html"><img src="image/ecira.png" style="width:20px;"><br><span>Home</span></a>
  <a href="service.html">🧮<br><span>Calculator</span></a>
  <a href="3d-design.html">🎨<br><span>3D Design</span></a>
  <a href="gallery.html">🖼️<br><span>Gallery</span></a>
</div>

<!-- ENQUIRY POPUP -->
<div id="enquiryPopup" class="popup-overlay" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.7); z-index:1000; justify-content:center; align-items:center;">
  <div class="popup-content" style="background:#fff; padding:30px; border-radius:10px; position:relative; width:90%; max-width:400px;">
    <span class="close-btn" onclick="closePopup()" style="position:absolute; right:15px; top:10px; cursor:pointer; font-size:24px;">&times;</span>
    <div id="formContainer">
      <h2 style="margin-bottom:20px;">Enquiry</h2>
      <form id="g-form" onsubmit="handleFormSubmit(event)">
        <input type="text" name="name" placeholder="Name *" style="width:100%; margin-bottom:10px; padding:10px; border:1px solid #ddd; border-radius:5px;" required>
        <input type="tel" name="phone" placeholder="Phone Number *" style="width:100%; margin-bottom:10px; padding:10px; border:1px solid #ddd; border-radius:5px;" required>
        <button type="submit" id="submitBtn" style="width:100%; padding:12px; background:#000; color:#fff; border:none; border-radius:5px; cursor:pointer; font-weight:bold;">SUBMIT</button>
      </form>
    </div>
    <div id="thankYouMsg" style="display:none; text-align:center; padding:20px;">
      <h3 style="color:#28a745;">Thank you!</h3>
      <p>We'll contact you within 24 hours.</p>
    </div>
  </div>
</div>
`;

  document.getElementById('footer-placeholder').innerHTML = footerHTML;

  // ===== 30 SEC AUTO POPUP - एक बार ही =====
  if(!localStorage.getItem('eciraPopupShown')) {
    setTimeout(() => {
      openPopup();
      localStorage.setItem('eciraPopupShown', 'true');
    }, 30000);
  }

  initWhatsAppDirect();
  initLogic();
});

/* ===== WHATSAPP DIRECT APP ===== */
function initWhatsAppDirect() {
  const whatsappBtn = document.querySelector('a[href^="https://wa.me"]');
  if(whatsappBtn) {
    whatsappBtn.addEventListener('click', function(e) {
      if(/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        setTimeout(() => {
          window.open(this.href, '_blank');
        }, 2000);
      }
    });
  }
}

/* ===== FORM SUBMISSION ===== */
function handleFormSubmit(e) {
  e.preventDefault();
  const scriptURL = 'https://script.google.com/macros/s/AKfycbyYZc_2LzGUJ0FVhqjzCUkAlU1tBimo8_FXOXMFCJPI_mC9KCu0yPGJD1x_-FGP7lRVfA/exec';
  const form = document.getElementById('g-form');
  const btn = document.getElementById('submitBtn');
  
  btn.disabled = true;
  btn.innerText = "Sending...";
  const formData = new FormData(form);

  fetch(scriptURL, { method: 'POST', body: formData })
  .then(response => response.text())
  .then(data => {
    document.getElementById('formContainer').style.display = 'none';
    document.getElementById('thankYouMsg').style.display = 'block';
    form.reset();
  })
  .catch(error => {
    console.error('Error!', error);
    btn.disabled = false;
    btn.innerText = "SUBMIT";
    alert('Network error! WhatsApp: 9987228829');
  })
  .finally(() => {
    setTimeout(() => {
      closePopup();
    }, 2000);
  });
}

/* ===== POPUP FUNCTIONS ===== */
function openPopup(){
  document.getElementById('enquiryPopup').style.display = 'flex';
}

function closePopup(){
  document.getElementById('enquiryPopup').style.display = 'none';
  document.getElementById('formContainer').style.display = 'block';
  document.getElementById('thankYouMsg').style.display = 'none';
  const btn = document.getElementById('submitBtn');
  if(btn) {
    btn.disabled = false;
    btn.innerText = "SUBMIT";
  }
  localStorage.setItem('eciraPopupShown', 'true'); // Auto popup block
}

/* ===== MOBILE STICKY NAV ===== */
function initLogic(){
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('mobileNav');
    if(!nav) return;
    let cur = window.pageYOffset;
    nav.style.transform = (cur > lastScroll && cur > 50) ? "translateY(100%)" : "translateY(0)";
    lastScroll = cur;
  });
}

function copyLink() {
  navigator.clipboard.writeText(window.location.href);
  alert('Link copied!');
}