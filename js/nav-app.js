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
const navBar = document.getElementById('navbar__list');
navBar.appendChild(navFragment);


// Feature 2: Scrolling to section on click
navBar.addEventListener('click', navOnClick);

// Change styles and scroll to section
function navOnClick(event) {
    const sectionName = ((event.target.textContent).toLowerCase()).replace(' ', '');
    const newActive = changeActiveElements(event, sectionName);
    newActive.scrollIntoView({block: "start", behavior: "smooth"});
}

function changeActiveElements(event, sectionName) {
    const currentActives = document.querySelectorAll('.your-active-class');
    const newActiveSection = document.querySelector('#' + sectionName);

    for (var i=0; i<currentActives.length; i++) {
        currentActives[i].classList.toggle('your-active-class');
    }
        
    newActiveSection.classList.toggle('your-active-class');
    event.target.classList.toggle('your-active-class');

    return newActiveSection;
}