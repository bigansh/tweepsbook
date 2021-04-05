const userInfo = document.querySelector('.nav-bar .user .user-info');
const userImage = document.querySelector('.nav-bar .user img');
const userName = document.querySelector('.nav-bar .user .name');
const userIcon = document.querySelector('.nav-bar .user .arrow');
const userMenu = document.querySelector('.nav-bar .user .user-menu');
const asideBar = document.querySelector('.main-area .aside-bar');
const bars = document.querySelector('.bars');
const cross = document.querySelector('.cross');
const tags = document.querySelector('.main-area .aside-bar .tags');
const emptyBoard = document.querySelector('.section-area .empty-board');
const loadBoard = document.querySelector('.section-area .load-board');
const boardTitle = document.querySelector('.section-area .board .title');
const bookmarks = document.querySelector('.section-area .board .bookmarks');
const backdrop = document.querySelector('.backdrop');
const tagsList = [];

// To load embedded content after a page has loaded
window.twttr = (function (d, s, id) {
  let js,
    fjs = d.getElementsByTagName(s)[0],
    t = window.twttr || {};
  if (d.getElementById(id)) return t;
  js = d.createElement(s);
  js.id = id;
  js.src = 'https://platform.twitter.com/widgets.js';
  fjs.parentNode.insertBefore(js, fjs);

  t._e = [];
  t.ready = function (f) {
    t._e.push(f);
  };

  return t;
})(document, 'script', 'twitter-wjs');

// ext = user;

// Read tags from fetched user data
function readTags() {
  user[0]['tags'].forEach((value) => {
    const tagValue = value['tag'] === null ? 'notag' : value['tag'].slice(1);
    tagsList.push(tagValue);
  });
  if (tagsList.length === 0) {
    return false;
  } else {
    // Sort tags in alphabetical order
    tagsList.sort();
    // Place notag tag at last if it contains in the tagsList
    if (tagsList.includes('notag')) {
      tagsList.splice(tagsList.indexOf('notag'), 1);
      tagsList.push('notag');
    }
    return true;
  }
}

// Populate tags in the UI
function populateTags() {
  tagsList.forEach((value) => {
    const li = document.createElement('li');
    if (value === 'notag') {
      li.classList.add('special');
    }
    li.classList.add('tag');
    li.textContent = `#${value}`;
    tags.append(li);
  });
}

// Load embedded tweets and add masonry layout initially on load
function loadEmbeddedTweetsOnLoad() {
  twttr.ready(function (twttr) {
    twttr.events.bind('loaded', function (event) {
      if (screen.width > 600) {
        const masonry = new Masonry(bookmarks, { gutter: 12 });
      }
      // Hide loader
      loadBoard.classList.remove('visible');
    });
  });
}

// Load embedded tweets and masonry layout when user selects a tag
function loadEmbeddedTweetsOnSelect() {
  twttr.widgets.load(bookmarks).then(
    (value) => {
      console.log('hi');
      if (screen.width > 600) {
        const masonry = new Masonry(bookmarks, { gutter: 12 });
      }
      // Hide loader
      loadBoard.classList.remove('visible');
    },
    (reason) => console.log(reason)
  );
}

// Populate bookmarks in the UI
function populateBookmarks(tagName) {
  // Show loader
  loadBoard.classList.add('visible');
  bookmarks.innerHTML = '';
  user[0]['tweets'].forEach((value) => {
    if (
      value['tag'] === tagName ||
      (value['tag'] === null && tagName === '#notag')
    ) {
      const div = document.createElement('div');
      div.classList.add('grid-item');
      div.innerHTML =
        '<blockquote class="twitter-tweet"><a href="https://twitter.com/u/status/' +
        value['status'] +
        '</a></blockquote><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>';
      bookmarks.append(div);
    }
  });
  // Loading embedded content
  loadEmbeddedTweetsOnSelect();
}

// Populate all bookmarks in the UI initially
function populateAllBookmarks() {
  // Show loader
  loadBoard.classList.add('visible');
  bookmarks.innerHTML = '';
  user[0]['tweets'].forEach((value) => {
    const div = document.createElement('div');
    div.className = 'grid-item';
    div.innerHTML =
      '<blockquote class="twitter-tweet"><a href="https://twitter.com/u/status/' +
      value['status'] +
      '</a></blockquote><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>';
    bookmarks.append(div);
  });
  // Loading embedded content
  loadEmbeddedTweetsOnLoad();
}

// Toggle user-menu when user clicks user-info
function toggleUserMenuHandler(ev) {
  if (
    ev.target === userImage ||
    ev.target === userName ||
    ev.target === userIcon
  ) {
    userMenu.classList.toggle('visible');
  }
}

// Clear previous tag selection
function clearPreviousSelection() {
  Array.from(tags.children).forEach((value) => {
    if (value.classList.contains('selected')) {
      value.classList.remove('selected');
    }
  });
}

// Select the tag when user clicks a tag
function selectTagHandler(ev) {
  if (ev.target.classList.contains('tag')) {
    clearPreviousSelection();
    ev.target.classList.add('selected');
    boardTitle.textContent = ev.target.textContent;
    populateBookmarks(ev.target.textContent);
    // Slide asideBar in mobile devices
    if (screen.width <= 600) {
      toggleAsideBar();
    }
  }
}

// Slide asideBar
function toggleAsideBar() {
  backdrop.classList.toggle('visible');
  asideBar.classList.toggle('slide');
}

// Call required functions when loaded
function run() {
  if (readTags()) {
    populateTags();
    populateAllBookmarks();
  } else {
    emptyBoard.classList.add('visible');
  }
}

// On load
run();

// Event Listeners
userInfo.addEventListener('click', toggleUserMenuHandler);
tags.addEventListener('click', selectTagHandler);
bars.addEventListener('click', toggleAsideBar);
cross.addEventListener('click', toggleAsideBar);
