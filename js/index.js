
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

        button.classList.toggle('active');

        portfolioItems.forEach((item) => {
            item.style.display = 'none';
        });

        const activeTags = [];

        tagFilterButtons.forEach((btn) => {
          if (btn.classList.contains('active')) {
              activeTags.push(btn.getAttribute('data-tag'));
          }
        });

        portfolioItems.forEach((item) => {
            const tags = item.getAttribute('data-tags').split(',');
            if (activeTags.length === 0 || activeTags.every(tag => tags.includes(tag))) {
              item.style.display = 'block';
            }
        });
    });
});

// Show All button
const showAllButton = document.querySelector('.show-all-button');

showAllButton.addEventListener('click', () => {
  tagFilterButtons.forEach((button) => {
    button.classList.remove('active');
  });

  portfolioItems.forEach( (item) => {
    item.style.display = 'block';
  });
});



// Typewriting effect

var TxtType = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
  this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
  this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 100 - Math.random() * 50;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
  delta = this.period;
  this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
  this.isDeleting = false;
  this.loopNum++;
  delta = 500;
  }

  setTimeout(function() {
  that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('typewrite');
  for (var i=0; i<elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-type');
      var period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtType(elements[i], JSON.parse(toRotate), period);
      }
  }
  var css = document.createElement("style");
  css.type = "text/css";
  document.body.appendChild(css);
};

// Reading time
const post = document.getElementById("post");
const readingTimeSummary = document.querySelector(".reading-time summary");
const readingTimeDetails = document.querySelector(".reading-time details span");
const avgWordsPerMin = 250;

setReadingTime();

function setReadingTime() {
  let count = getWordCount();
  let time = Math.ceil(count / avgWordsPerMin);

  readingTimeSummary.innerText = time + " min read";
  readingTimeDetails.innerText =
    count + " words read at " + avgWordsPerMin + " words per minute.";
}

function getWordCount() {
  return post.innerText.match(/\w+/g).length;
}