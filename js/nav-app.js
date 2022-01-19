// Global variables
const contents = document.querySelectorAll('.landing__container');
var sectionPositions = [];
var sectionThresholds = [];

// calculate Y-threshold for active sections
var sumHeight = 0;
for (var i = 0; i < contents.length; i++) {
    sectionPositions.push(contents[i].getBoundingClientRect());
        sectionThresholds.push(sumHeight + sectionPositions[i].height);
    sumHeight += sectionPositions[i].height;
    console.log(sectionThresholds);
}

// Feature 1: Build dynamic navigation bar

// query after content (landing-container class)

// create document fragment to store nav content
const navFragment = document.createDocumentFragment();

// create list element from contents
for (var i = 0; i < contents.length; i++) {
    const navContent = document.createElement('li');
    navContent.textContent = contents[i].getElementsByTagName('h2')[0].textContent;
    navContent.setAttribute('id', `nav${i+1}`);
    if (i == 0) {
        navContent.setAttribute('class', 'your-active-class');
    }
    navFragment.appendChild(navContent);
}


const navBar = document.getElementById('navbar__list');
navBar.appendChild(navFragment);


// Feature 2: Scrolling to section on click
navBar.addEventListener('click', navOnClick);

// Change styles and scroll to section
function navOnClick(event) {
    event.preventDefault();
    const sectionNr = (event.target.textContent).split(' ')[1];
    const newActive = changeActiveElements(sectionNr);
    newActive.scrollIntoView({ block: "start", behavior: "smooth" });

    console.log(activeSection);
}

function changeActiveElements(sectionNr) {
    const currentActives = document.querySelectorAll('.your-active-class');
    const newActiveSection = document.querySelector(`#section${sectionNr}`);
    const newActiveNav = document.querySelector(`#nav${sectionNr}`);

    for (var i = 0; i < currentActives.length; i++) {
        currentActives[i].classList.toggle('your-active-class');
    }

    newActiveSection.classList.toggle('your-active-class');
    newActiveNav.classList.toggle('your-active-class');
    activeSection = newActiveSection;
    return newActiveSection;
}

// Feature 3: Detect active section
document.addEventListener('scroll', detectActiveRegion)

function detectActiveRegion() {
    for (var i = 0; i < sectionThresholds.length; i++) {
        if (window.scrollY < (sectionThresholds[i])) {
            console.log(contents[i]);
            changeActiveElements(i+1);
            break;
        }
    }
}

