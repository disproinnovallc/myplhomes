document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function () {
      navLinks.classList.toggle('active');
    });
  }

  // Search form handling on index page
  const searchForm = document.querySelector('.search-form');
  if (searchForm) {
    searchForm.addEventListener('submit', function (e) {
      e.preventDefault();
      // Read selected values
      const formData = new FormData(searchForm);
      const params = new URLSearchParams();
      // Only include parameters that have a value
      for (const [key, value] of formData.entries()) {
        if (value && value !== '') {
          params.set(key, value);
        }
      }
      // Redirect to casas.html with query parameters
      const queryString = params.toString();
      const target = 'casas.html' + (queryString ? '?' + queryString : '');
      window.location.href = target;
    });
  }

  // Filtering on casas page based on query params
  const modelGrid = document.querySelector('.model-grid');
  if (modelGrid) {
    const urlParams = new URLSearchParams(window.location.search);
    // Read filter criteria
    const typeParam = urlParams.get('type');
    const areaParam = urlParams.get('area');
    const bedroomsParam = urlParams.get('bedrooms');
    const bathroomsParam = urlParams.get('bathrooms');
    if (typeParam || areaParam || bedroomsParam || bathroomsParam) {
      const cards = modelGrid.querySelectorAll('.model-card');
      cards.forEach(card => {
        let visible = true;
        if (typeParam && card.dataset.type !== typeParam) {
          visible = false;
        }
        if (areaParam && card.dataset.area !== areaParam) {
          visible = false;
        }
        if (bedroomsParam) {
          const cardBedrooms = card.dataset.bedrooms;
          if (bedroomsParam === '4+' ) {
            // Show cards with 4 or more bedrooms
            if (parseInt(cardBedrooms) < 4) visible = false;
          } else if (cardBedrooms !== bedroomsParam) {
            visible = false;
          }
        }
        if (bathroomsParam) {
          const cardBathrooms = card.dataset.bathrooms;
          if (bathroomsParam === '3+') {
            if (parseInt(cardBathrooms) < 3) visible = false;
          } else if (cardBathrooms !== bathroomsParam) {
            visible = false;
          }
        }
        card.style.display = visible ? '' : 'none';
      });
    }
  }
});