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