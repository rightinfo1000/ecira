document.addEventListener("DOMContentLoaded", () => {

  const gallery = document.getElementById("gallery");
  const tabs = document.querySelectorAll(".tab");

  function loadGallery(category) {
    gallery.innerHTML = "";
    siteData.forEach(item => {
      if (item.category === category) {
        const div = document.createElement("div");
        div.className = "gallery-item";
        div.innerHTML = `
          <img data-src="image/${item.file_name}"
               alt="${item.title}"
               loading="lazy"
               onclick="openLightbox('image/${item.file_name}', '${item.title}', '${item.description}')">
          <div class="gallery-caption">${item.caption}</div>
        `;
        gallery.appendChild(div);
      }
    });
    lazyLoad();
  }

  function lazyLoad() {
    const imgs = document.querySelectorAll("img[data-src]");
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.src = e.target.dataset.src;
          e.target.removeAttribute("data-src");
          io.unobserve(e.target);
        }
      });
    });
    imgs.forEach(img => io.observe(img));
  }

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      loadGallery(tab.dataset.category);
    });
  });

  // GLOBAL variables swipe के लिए (scope fix)
  let currentList = [];
  let currentIndex = 0;
  let startX = 0;

  window.openLightbox = function (img, title, desc) {
    // Current category track करो
    currentList = siteData.filter(i => i.category === document.querySelector('.tab.active').dataset.category);
    currentIndex = currentList.findIndex(i => `image/${i.file_name}` === img);
    
    document.getElementById("lb-img").src = img;
    document.getElementById("lb-title").innerText = title;
    document.getElementById("lb-desc").innerText = desc;

    const text = encodeURIComponent(title + " - " + desc);
    const url = encodeURIComponent(location.href);

    document.getElementById("wa").href = `https://wa.me/?text=${text}%20${url}`;
    document.getElementById("fb").href = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    document.getElementById("tw").href = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;

    document.getElementById("lightbox").classList.add("active");
  };

  window.closeLightbox = function () {
    document.getElementById("lightbox").classList.remove("active");
  };

  // ZOOM - Mouse wheel + Double click
  const lbImg = document.getElementById("lb-img");
  lbImg.addEventListener("dblclick", () => {
    lbImg.classList.toggle("zoomed");
  });

  lbImg.addEventListener("wheel", e => {
    e.preventDefault();
    lbImg.classList.toggle("zoomed");
  });

  // SWIPE functions
  function updateLB() {
    if (currentList[currentIndex]) {
      const item = currentList[currentIndex];
      document.getElementById("lb-img").src = "image/" + item.file_name;
      document.getElementById("lb-title").innerText = item.title;
      document.getElementById("lb-desc").innerText = item.description;
    }
  }

  window.nextImage = () => {
    if (currentIndex < currentList.length - 1) {
      currentIndex++;
      updateLB();
    }
  };

  window.prevImage = () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateLB();
    }
  };

  const lb = document.getElementById("lightbox");
  lb.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
  });

  lb.addEventListener("touchend", e => {
    let diff = e.changedTouches[0].clientX - startX;
    if (diff > 50) window.prevImage();
    if (diff < -50) window.nextImage();
  });

  // Outside click close
  lb.addEventListener("click", e => {
    if (e.target.id === "lightbox") closeLightbox();
  });

  loadGallery("living-room");
  // सिर्फ SWIPE

});