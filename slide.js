// पेज लोड होते ही 
document.addEventListener('DOMContentLoaded', () => {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');

    // अगर पेज पर स्लाइडर नहीं है तो कोड को यहीं रोक दें
    if (slides.length === 0) return;

    function showSlide(index) {
        // सभी स्लाइड्स से 'active' क्लास हटाएँ
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // अगले इंडेक्स पर जाएँ
        currentSlide = (index + slides.length) % slides.length;
        
        // सिर्फ वर्तमान स्लाइड को 'active' करें
        slides[currentSlide].classList.add('active');
    }

    // बटन के लिए फंक्शन (विंडो ऑब्जेक्ट में डालना ताकि HTML से कॉल हो सके)
    window.manualChange = function(step) {
        clearInterval(autoPlay); // बटन दबाने पर ऑटो-प्ले रोकें
        showSlide(currentSlide + step);
        // 5 सेकंड बाद फिर से ऑटो-प्ले शुरू करें
        autoPlay = setInterval(() => showSlide(currentSlide + 1), 5000);
    };

    // ऑटो-प्ले: हर 5 सेकंड में स्लाइड बदलेगी
    let autoPlay = setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);

    // पेज लोड होते ही पहली स्लाइड दिखाएँ
    showSlide(0);
});

function openTab(evt, stepName) {
    var i, tabcontent, tablinks;

    // सभी कंटेंट छुपाएं
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].classList.remove("active");
    }

    // सभी बटन्स से 'active' क्लास हटाएं
    tablinks = document.getElementsByClassName("tab-btn");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // वर्तमान टैब दिखाएं और बटन को एक्टिव करें
    document.getElementById(stepName).style.display = "block";
    document.getElementById(stepName).classList.add("active");
    if(evt) evt.currentTarget.className += " active";
}

// FAQ Accordion Logic
document.addEventListener('DOMContentLoaded', () => {
    const faqButtons = document.querySelectorAll('.faq-question');
    
    faqButtons.forEach(button => {
        button.addEventListener('click', () => {
            const faqItem = button.parentElement;
            const isOpen = button.classList.contains('active');
            const answer = button.nextElementSibling;

            // पहले से खुले हुए दूसरे FAQ बंद करने के लिए
            document.querySelectorAll('.faq-question').forEach(btn => {
                btn.classList.remove('active');
                btn.nextElementSibling.style.maxHeight = null;
                btn.querySelector('.icon').textContent = '+';
            });

            // अगर पहले से खुला नहीं था, तो अब खोलें
            if (!isOpen) {
                button.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + "px";
                button.querySelector('.icon').textContent = '-';
            }
        });
    }); // <-- यहां और ऊपर के इवेंट लिसनर के लिए क्लोजिंग ब्रैकेट मिसिंग थे
}); // <-- यहां DOMContentLoaded के लिए क्लोजिंग ब्रैकेट मिसिंग 
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('gallery-grid');
    
    // अगर पेज पर ग्रिड नहीं है (जैसे होम पेज पर), तो कोड रुक जाएगा
    if (!grid) return;

    // siteData से गैलरी लोड करना
    siteData.forEach(item => {
        // 3D वाली फाइलों को छोड़ने के लिए (अगर आप चाहें तो)
        // if (item.file_name.startsWith('3d')) return;

        const div = document.createElement('div');
        div.className = `portfolio-item ${item.category}`;
        
        div.innerHTML = `
            <img src="image/${item.file_name}" loading="lazy" alt="${item.alt_text}">
            <div class="item-caption">${item.caption}</div>
        `;
        
        // क्लिक करने पर लाइटबॉक्स खुलेगा
        div.onclick = () => openLightbox(item);
        grid.appendChild(div);
    });
});

function openLightbox(item) {
    const lbImg = document.getElementById('lightbox-img');
    const lbTitle = document.getElementById('lb-title');
    const lbDesc = document.getElementById('lb-desc');
    const lb = document.getElementById('lightbox');

    if(lbImg && lbTitle && lbDesc) {
        lbImg.src = `image/${item.file_name}`;
        lbTitle.innerText = item.title;
        lbDesc.innerText = item.description;
        lb.style.display = 'flex';
    }
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

function filterGallery(category, event) {
    // बटन की एक्टिव क्लास बदलना
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    if(event) event.target.classList.add('active');

    // आइटम्स फ़िल्टर करना
    document.querySelectorAll('.portfolio-item').forEach(item => {
        if (category === 'all' || item.classList.contains(category)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}
