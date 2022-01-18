// Feature 1: Dynamic navigation bar

// query after content (landing-container class)
const contents = document.querySelectorAll('.landing__container');
// create document fragment to store nav content
const navFragment = document.createDocumentFragment();

// iterate throughlist
// create div containing nav
// append nav content name to nav doc fragment
for (var i = 0; i < contents.length; i++) {
    const navContent = document.createElement('li');
    navContent.textContent = contents[i].getElementsByTagName('h2')[0].textContent;
    navFragment.appendChild(navContent);
}

// add css styles to nav
//append nav doc fragment to #navbar__list
document.getElementById('navbar__list').appendChild(navFragment);