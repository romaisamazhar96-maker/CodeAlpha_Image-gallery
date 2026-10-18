const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');
const searchInput = document.getElementById('search-input');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
const closeBtn = document.getElementById('closeBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;
let visibleItems = Array.from(galleryItems);

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');

    const selectedCategory = button.getAttribute('data-filter');

    galleryItems.forEach((item) => {
      const itemCategory = item.getAttribute('data-category');

      if (selectedCategory === 'all' || itemCategory === selectedCategory) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
    updateVisibleItems();
  });
});
searchInput.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase().trim();
  galleryItems.forEach((item) => {
    const title = item.getAttribute('data-title').toLowerCase();
    const category = item.getAttribute('data-category').toLowerCase();

    if (title.includes(query) || category.includes(query)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });

  updateVisibleItems();
});

function updateVisibleItems() {
  visibleItems = Array.from(galleryItems).filter((item) => item.style.display !== 'none');
}

galleryItems.forEach((item) => {
  item.addEventListener('click', () => {
    currentIndex = visibleItems.indexOf(item);
    if (currentIndex !== -1) {
      openLightbox();
    }
  });
});

function openLightbox() {
  const currentItem = visibleItems[currentIndex];
  const imgUrl = currentItem.querySelector('img').src;
  const title = currentItem.getAttribute('data-title');
  const author = currentItem.getAttribute('data-author');

  lightboxImg.src = imgUrl;
  lightboxCaption.textContent = `${title} — by ${author}`;
  lightbox.classList.add('active');
}

function closeLightbox() {
  lightbox.classList.remove('active');
}
function showNextImage() {
  currentIndex = (currentIndex + 1) % visibleItems.length;
  openLightbox();
}
function showPrevImage() {
  currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
  openLightbox();
}
closeBtn.addEventListener('click', closeLightbox);
nextBtn.addEventListener('click', showNextImage);
prevBtn.addEventListener('click', showPrevImage);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') showNextImage();
  if (e.key === 'ArrowLeft') showPrevImage();
});


const loadMoreBtn = document.querySelector('.load-more-btn');

const photosPerClick = 4;
let currentPhotos = 0;
galleryItems.forEach((item, index) => {
    if (index >= 12) {
        item.style.display = 'none';
    }
});

currentPhotos = Math.min(12, galleryItems.length);

loadMoreBtn.addEventListener('click', function () {
    let addedPhotos = 0;

    for (
        let i = currentPhotos;
        i < galleryItems.length && addedPhotos < photosPerClick;
        i++
    ) {
        galleryItems[i].style.display = 'block';
        addedPhotos++;
    }

    currentPhotos += addedPhotos;
    updateVisibleItems();

    if (currentPhotos >= galleryItems.length) {
        loadMoreBtn.textContent = 'No More Photos';
        loadMoreBtn.disabled = true;
    }
});