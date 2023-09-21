
// Navigation button
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav__link')


navToggle.addEventListener('click', ()=> {
    document.body.classList.toggle('nav-open');
});


navLinks.forEach(link => {
    link.addEventListener('click', () => {
        document.body.classList.remove('nav-open');
    })
})


// Include about_me.txt file in the About Me section
const aboutMeContainer = document.getElementById('about-me-content');

fetch('about_me.txt')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.text();
  })
  .then((aboutMeText) => {
    aboutMeText = aboutMeText.replace(/\n/g, '<br>');
    aboutMeContainer.innerHTML = aboutMeText;
  })
  .catch((error) => {
    console.error('Error fetching About Me content:', error);
  });


// Tag filtering for portfolio items
const tagFilterButtons = document.querySelectorAll('.tag-filter');
const portfolioItems = document.querySelectorAll('.portfolio__item');

tagFilterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const selectedTag = button.getAttribute('data-tag');

        // Toggle the active class on the clicked button
        button.classList.toggle('active');

        // Hide all portfolio items
        portfolioItems.forEach((item) => {
            item.style.display = 'none';
        });

        // Create an array to store active tags
        const activeTags = [];

        // Collect all active tags
        tagFilterButtons.forEach((btn) => {
          if (btn.classList.contains('active')) {
              activeTags.push(btn.getAttribute('data-tag'));
          }
        });

        // Show portfolio items with the selected tag
        portfolioItems.forEach((item) => {
            const tags = item.getAttribute('data-tags').split(',');
            if (activeTags.length === 0 || activeTags.every(tag => tags.includes(tag))) {
              item.style.display = 'block';
            }
        });
    });
});

// Show All
const showAllButton = document.querySelector('.show-all-button');

showAllButton.addEventListener('click', () => {
  // Remove the 'active' class from all filter buttons
  tagFilterButtons.forEach((button) => {
    button.classList.remove('active');
  });

  // Show all portfolio items
  portfolioItems.forEach( (item) => {
    item.style.display = 'block';
  });
});