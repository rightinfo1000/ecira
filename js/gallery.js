/* ECIRA Interiors — gallery page: tab filter + lightbox + swipe */
document.addEventListener("DOMContentLoaded", () => {

  const gallery = document.getElementById("gallery");
  const tabs = document.querySelectorAll(".tab");
  if (!gallery) return;

  let currentList = [];
  let currentIndex = 0;
  let startX = 0;

  function loadGallery(category) {
    gallery.innerHTML = "";
    currentList = siteData.filter(item => item.category === category);
    currentList.forEach((item, idx) => {
      const div = document.createElement("div");
      div.className = "gallery-item";
      div.innerHTML = `
        <img src="image/${item.file_name}" alt="${item.alt_text}" loading="lazy">
        <div class="gallery-caption">${item.caption}</div>
      `;
      div.addEventListener("click", () => openLightbox(idx));
      gallery.appendChild(div);
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      loadGallery(tab.dataset.category);
    });
  });

  function updateLightbox() {
    const item = currentList[currentIndex];
    if (!item) return;
    const img = `image/${item.file_name}`;
    document.getElementById("lb-img").src = img;
    document.getElementById("lb-title").innerText = item.title;
    document.getElementById("lb-desc").innerText = item.description;

    const text = encodeURIComponent(item.title + " - " + item.description);
    const url = encodeURIComponent(location.href);
    document.getElementById("wa").href = `https://wa.me/?text=${text}%20${url}`;
    document.getElementById("fb").href = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    document.getElementById("tw").href = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
  }

  window.openLightbox = function (idx) {
    currentIndex = idx;
    updateLightbox();
    document.getElementById("lightbox").classList.add("active");
  };

  window.closeLightbox = function () {
    document.getElementById("lightbox").classList.remove("active");
    const lbImg = document.getElementById("lb-img");
    lbImg.classList.remove("zoomed");
  };

  const lbImg = document.getElementById("lb-img");
  lbImg.addEventListener("dblclick", () => lbImg.classList.toggle("zoomed"));
  lbImg.addEventListener("wheel", e => {
    e.preventDefault();
    lbImg.classList.toggle("zoomed");
  });

  window.nextImage = () => {
    if (currentIndex < currentList.length - 1) {
      currentIndex++;
      updateLightbox();
    }
  };
  window.prevImage = () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateLightbox();
    }
  };

  const lb = document.getElementById("lightbox");
  lb.addEventListener("touchstart", e => { startX = e.touches[0].clientX; });
  lb.addEventListener("touchend", e => {
    const diff = e.changedTouches[0].clientX - startX;
    if (diff > 50) window.prevImage();
    if (diff < -50) window.nextImage();
  });
  lb.addEventListener("click", e => {
    if (e.target.id === "lightbox") window.closeLightbox();
  });

  /* The first tab's content (living-room) is already server-rendered in the
     HTML for SEO, so just wire up click handlers on those existing items
     instead of re-rendering them. */
  const firstTab = document.querySelector(".tab.active") || tabs[0];
  const initialCategory = firstTab ? firstTab.dataset.category : null;
  if (initialCategory) {
    currentList = siteData.filter(item => item.category === initialCategory);
    const existingItems = gallery.querySelectorAll(".gallery-item");
    existingItems.forEach((div, idx) => {
      div.addEventListener("click", () => openLightbox(idx));
    });
  }
});
