const toggleSwitch = document.querySelector('input[type="checkbox"]');
const nav = document.getElementById('nav');
const toggleIcon = document.getElementById('toggle-icon');
const images = [...document.getElementsByTagName('img')];
const textBox = document.getElementById('text-box');

function updateImage(image, to) {
    image.src = updateImageUrl(image.src, to);
}

function updateImageUrl(imgUrl, to) {
    if (to !== 'dark' && to !== 'light' ) {
        console.log('bad imgUrl mapping.')
        return imgUrl
    }
    let arrayUrl = imgUrl.split('_');
    arrayUrl[arrayUrl.length - 1] = `${to}.svg`; // see /img filenames for reference
    return arrayUrl.join('_');
}

// Dark Mode
function darkMode() {
    nav.style.backgroundColor = 'rgb(0 0 0 / 50%)';
    textBox.style.backgroundColor = 'rgb(255 255 255 / 50%)';
    toggleIcon.children[0].textContent = 'Dark Mode';
    toggleIcon.children[1].classList.replace('fa-sun', 'fa-moon');
    images.forEach(image => updateImage(image, 'dark'));
}

// Light Mode
function lightMode() {
    nav.style.backgroundColor = 'rgb(255 255 255 / 50%)';
    textBox.style.backgroundColor = 'rgb(0 0 0 / 50%)';
    toggleIcon.children[0].textContent = 'Light Mode';
    toggleIcon.children[1].classList.replace('fa-moon', 'fa-sun');
    images.forEach(image => updateImage(image, 'light'));
}

// Switch Theme Dynamically
function switchTheme(event) {
    if (event.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        darkMode();
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        lightMode();
    }
}

// Event Listener on toggle
toggleSwitch.addEventListener('change', switchTheme);

// Check Local Storage for Cached Theme
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
        darkMode();
    } else {
        toggleSwitch.checked = false;
        lightMode();
    }
}