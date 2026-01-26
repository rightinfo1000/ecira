// चेक करें कि क्या हेडर पहले से इंजेक्ट किया गया है
if (!window.headerLoaded) {
    const headerHTML = `
    <header class="site-header">
        <div class="header-container">
            <div class="logo">
                <a href="index.html"><img src="image/ecira.png" alt="Ecira"></a>
            </div>
            <div class="header-text">
                Ecira Interiors<br>
                <span>Innovative Designs for Inspired Living.</span>
            </div>
            <div class="menu-icon" id="menuIcon">
                <span></span><span></span><span></span>
            </div>
            <nav class="site-nav" id="siteNav">
                <a href="index.html">Home</a>
                <a href="gallery.html">Gallery</a>
                <a href="service.html">Our Service</a>
                <a href="3d-design.html">3D Design</a>
                <a href="projects.html">Projects</a>
                <a href="about.html">About Us</a>
                <a href="contact.html">Contact</a>
            </nav>
        </div>
    </header>`;

    // हेडर को बॉडी के शुरू में डालें
    document.body.insertAdjacentHTML('afterbegin', headerHTML);

    // मोबाइल मेनू लॉजिक
    const siteNav = document.getElementById('siteNav');
    const menuIcon = document.getElementById('menuIcon');

    document.addEventListener('click', function(e) {
        if (menuIcon && menuIcon.contains(e.target)) {
            siteNav.classList.toggle('active');
        } else if (siteNav && !siteNav.contains(e.target)) {
            siteNav.classList.remove('active');
        }
    });

    // फ्लैग सेट करें ताकि दोबारा लोड न हो
    window.headerLoaded = true;
}
