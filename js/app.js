window.scroll(0, 0);

// Global variables
const contents = document.querySelectorAll('.landing__container');
let sectionPositions = [];
let sectionThresholds = [];
let clicked = false;

// calculate Y-threshold for active sections
let sumHeight = 0;
for (let i = 0; i < contents.length; i++) {
    sectionPositions.push(contents[i].getBoundingClientRect());
    sectionThresholds.push(sumHeight + sectionPositions[i].height);
    sumHeight += sectionPositions[i].height;
}

// Feature 1: Build dynamic navigation bar

// query after content (landing-container class)

// create document fragment to store nav content
const navFragment = document.createDocumentFragment();

// create list element from contents
for (let i = 0; i < contents.length; i++) {
    const navContent = document.createElement('li');
    navContent.innerHTML = contents[i].getElementsByTagName('h2')[0].textContent;
    navContent.setAttribute('id', `nav${i + 1}`);
    if (i == 0) {
        navContent.setAttribute('class', 'your-active-class');
    }
    navFragment.append(navContent);
}
const navBar = document.getElementById('navbar__list');
navBar.appendChild(navFragment);
// END Feature 1

// Feature 2: Scrolling to section on click
navBar.addEventListener('click', navOnClick);

// Change styles and scroll to section
function navOnClick(event) {
    clicked = true;
    event.preventDefault();
    if (event.target.tagName == 'LI') {
        const sectionNr = (event.target.textContent).split(' ')[1];
        const newActive = changeActiveElements(sectionNr);
        newActive.scrollIntoView({ block: "start", behavior: "smooth" });
        // newActive.scroll({ block: "start", behavior: "smooth" });

    }
    setTimeout(func => { clicked = false }, 1000);
}

function changeActiveElements(sectionNr) {
    const currentActives = document.querySelectorAll('.your-active-class');
    const newActiveSection = document.querySelector(`#section${sectionNr}`);
    const newActiveNav = document.querySelector(`#nav${sectionNr}`);

    for (let i = 0; i < currentActives.length; i++) {
        currentActives[i].classList.toggle('your-active-class');
    }

    newActiveSection.classList.toggle('your-active-class');
    newActiveNav.classList.toggle('your-active-class');
    activeSection = newActiveSection;
    return newActiveSection;
}
// END Feature 2

// Feature 3: Detect active section
document.addEventListener('scroll', onScroll);

function onScroll() {
    detectActiveRegion();
    checkScrollY();
}

function detectActiveRegion() {
    if (!clicked) {
        for (let i = 0; i < sectionThresholds.length; i++) {
            if (window.scrollY < (sectionThresholds[i])) {
                changeActiveElements(i + 1);
                break;
            }
        }
    }
}

// if the page bottom is reached, toggle to the top option
function checkScrollY() {
    if (window.scrollY > window.scrollMaxY - 50) {
        document.getElementById('link-to-top').classList.add('visible');
    }
    else {
        document.getElementById('link-to-top').classList.remove('visible');
    }
}
// END Feature 3

// scroll to top button
document.querySelector('#link-to-top').addEventListener('click', scrollToTop);

function scrollToTop() {
    clicked = true;
    window.scrollTo({top: 0, block: "start", behavior: "smooth" });
    clicked = false;
}