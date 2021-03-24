const userInfo = document.querySelector('.nav-bar .user .user-info');
const userImage = document.querySelector('.nav-bar .user img');
const userName = document.querySelector('.nav-bar .user .name');
const userIcon = document.querySelector('.nav-bar .user .arrow');
const userMenu = document.querySelector('.nav-bar .user .user-menu');
const asideBar = document.querySelector('.main-area .aside-bar');
const bars = document.querySelector('.bars');
const cross = document.querySelector('.cross');
const tags = document.querySelector('.main-area .aside-bar .tags');
const initialBoard = document.querySelector('.section-area .initial-board');
const loadBoard = document.querySelector('.section-area .load-board');
const boardTitle = document.querySelector('.section-area .board .title');
const bookmarks = document.querySelector('.section-area .board .bookmarks');

// To load embedded content after a page has loaded
window.twttr = (function (d, s, id) {
  var js,
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

// External data
const ext = [
  {
    tweets: [
      {
        _id: '605749b420b73e00158fc2b4',
        embed:
          '<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Mum; Kids, what are you doing?<br><br>Normal child; Just playing tag.<br><br>History addict child (me); I am playing the 80 years war by running through the streets and shouting &quot;The Spanish are coming&quot; at random people, that probably explains the police car coming towards us.<br><br>True story.</p>&mdash; Fake History Hunter (@fakehistoryhunt) <a href="https://twitter.com/fakehistoryhunt/status/1373591461900455938?ref_src=twsrc%5Etfw">March 21, 2021</a></blockquote>\n<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>\n',
        tag: '#history',
        id: '718377211447930880',
        __v: 0,
      },
      {
        _id: '60574a0220b73e00158fc2b8',
        embed:
          '<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Dad&#39;s first time on screen😃. Seeing him so proud is a career highpoint. Super lucky to have parents who stood by through all my stupidity regardless of what people told them, that&#39;s how I survived. Until Zerodha, I was always told to go get a real job 😬<a href="https://t.co/wJ3ZugsnTQ">https://t.co/wJ3ZugsnTQ</a></p>&mdash; Nithin Kamath (@Nithin0dha) <a href="https://twitter.com/Nithin0dha/status/1373617081707503616?ref_src=twsrc%5Etfw">March 21, 2021</a></blockquote>\n<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>\n',
        tag: null,
        id: '718377211447930880',
        __v: 0,
      },
      {
        _id: '60574a4120b73e00158fc2ba',
        embed:
          '<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Salary expectation is at an all time high. Young talent with good work ethics are getting amazing offers. Its better to hire expensive, great talent and be tough in their evaluation, than, hire average and end up never letting them go because you can&#39;t find talent at that salary</p>&mdash; Amrish Rau (@amrishrau) <a href="https://twitter.com/amrishrau/status/1373488938388574210?ref_src=twsrc%5Etfw">March 21, 2021</a></blockquote>\n<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>\n',
        tag: null,
        id: '718377211447930880',
        __v: 0,
      },
      {
        _id: '60586a7fb8e3170015d2e2b3',
        embed:
          '<blockquote class="twitter-tweet"><p lang="en" dir="ltr">The 2nd edition of our Future of Work Dialogue is here!<br><br>When: March 31, Wednesday, 9 am - 12 pm.<br><br>We are discussing building marketing and sales products for a brave new world with our panel of experts.<br><br>Founders, apply here - <a href="https://t.co/PlgJei3h8G">https://t.co/PlgJei3h8G</a>. <a href="https://t.co/KzbFBnHwqg">pic.twitter.com/KzbFBnHwqg</a></p>&mdash; Accel in India (@Accel_India) <a href="https://twitter.com/Accel_India/status/1373927226421387264?ref_src=twsrc%5Etfw">March 22, 2021</a></blockquote>\n<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>\n',
        tag: null,
        id: '718377211447930880',
        __v: 0,
      },
      {
        _id: '60586a3cb8e3170015d2e2b2',
        embed:
          '<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Half wondering if spending $$$ on MBA acts as an implicit signal to recruiters that &quot;I&#39;m willing to invest $$ on myself because I am confident of getting an RoI on it&quot;, kicking in a self-fulfilling prophecy.</p>&mdash; Raj Kunkolienkar 🦁 (@kunksed) <a href="https://twitter.com/kunksed/status/1373906572212981767?ref_src=twsrc%5Etfw">March 22, 2021</a></blockquote>\n<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>\n',
        tag: null,
        id: '718377211447930880',
        __v: 0,
      },
      {
        _id: '60586a7fb8e3170015d2e2b3',
        embed:
          '<blockquote class="twitter-tweet"><p lang="en" dir="ltr">The 2nd edition of our Future of Work Dialogue is here!<br><br>When: March 31, Wednesday, 9 am - 12 pm.<br><br>We are discussing building marketing and sales products for a brave new world with our panel of experts.<br><br>Founders, apply here - <a href="https://t.co/PlgJei3h8G">https://t.co/PlgJei3h8G</a>. <a href="https://t.co/KzbFBnHwqg">pic.twitter.com/KzbFBnHwqg</a></p>&mdash; Accel in India (@Accel_India) <a href="https://twitter.com/Accel_India/status/1373927226421387264?ref_src=twsrc%5Etfw">March 22, 2021</a></blockquote>\n<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>\n',
        tag: '#vc',
        id: '718377211447930880',
        __v: 0,
      },
      {
        _id: '60586b61b8e3170015d2e2b5',
        embed:
          '<blockquote class="twitter-tweet"><p lang="en" dir="ltr">ladies if he has a sports car that’s not your man that’s a boy who doesn’t know what compound interest is</p>&mdash; Julie Young (@juliey4) <a href="https://twitter.com/juliey4/status/1373818333552775170?ref_src=twsrc%5Etfw">March 22, 2021</a></blockquote>\n<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>\n',
        tag: '#finance',
        id: '718377211447930880',
        __v: 0,
      },
      {
        _id: '60586b83b8e3170015d2e2b7',
        embed:
          '<blockquote class="twitter-tweet"><p lang="en" dir="ltr">DANTH&#39;S LAW states that &quot;if you have to insist that you’ve won an internet argument, you’ve probably lost badly.&quot;</p>&mdash; Quite Interesting (@qikipedia) <a href="https://twitter.com/qikipedia/status/1373937498561208324?ref_src=twsrc%5Etfw">March 22, 2021</a></blockquote>\n<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>\n',
        tag: '#facts',
        id: '718377211447930880',
        __v: 0,
      },
    ],
    tags: [
      {
        _id: '605749b520b73e00158fc2b6',
        tag: '#history',
        id: '718377211447930880',
        __v: 0,
      },
      {
        _id: '60574a0320b73e00158fc2b9',
        tag: null,
        id: '718377211447930880',
        __v: 0,
      },
      {
        _id: '60586a7fb8e3170015d2e2b4',
        tag: '#vc',
        id: '718377211447930880',
        __v: 0,
      },
      {
        _id: '60586b61b8e3170015d2e2b6',
        tag: '#finance',
        id: '718377211447930880',
        __v: 0,
      },
      {
        _id: '60586b84b8e3170015d2e2b8',
        tag: '#facts',
        id: '718377211447930880',
        __v: 0,
      },
    ],
    _id: '6057499a20b73e00158fc2b3',
    email: 'anshpushti2001@gmail.com',
    profile:
      'https://pbs.twimg.com/profile_images/1357290954181386241/chdcVBev_normal.jpg',
    name: 'Ansh Agarwal 👨🏽‍🚀',
    id: '718377211447930880',
    __v: 12,
  },
];

// Populate tags in the UI
function populateTags() {
  ext[0]['tags'].forEach((value) => {
    const li = document.createElement('li');
    li.classList.add('tag');
    li.textContent = value['tag'] === null ? '#default' : value['tag'];
    tags.append(li);
  });
}

// Populate bookmarks in the UI
function populateBookmarks(tagName) {
  // Show loader
  loadBoard.classList.add('visible');
  bookmarks.innerHTML = '';
  ext[0]['tweets'].forEach((value) => {
    if (
      value['tag'] === tagName ||
      (value['tag'] === null && tagName === '#default')
    ) {
      const div = document.createElement('div');
      div.classList.add('bookmark');
      div.innerHTML = value['embed'];
      bookmarks.append(div);
      // Loading embedded content after a page has loaded
      // twttr.widgets.load(div);
    }
  });
  // Loading embedded content after a page has loaded
  twttr.widgets.load(bookmarks).then(
    (value) => {
      console.log('hi');
      // Hide loader
      loadBoard.classList.remove('visible');
    },
    (reason) => console.log(reason)
  );
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
    if (initialBoard.classList.contains('visible')) {
      initialBoard.classList.remove('visible');
    }
    clearPreviousSelection();
    ev.target.classList.add('selected');
    boardTitle.textContent = ev.target.textContent;
    populateBookmarks(ev.target.textContent);
  }
}

// Slide asideBar
function toggleAsideBar() {
  asideBar.classList.toggle('slide');
}

// On load
populateTags();

// Event Listeners
userInfo.addEventListener('click', toggleUserMenuHandler);
tags.addEventListener('click', selectTagHandler);
bars.addEventListener('click', toggleAsideBar);
cross.addEventListener('click', toggleAsideBar);
