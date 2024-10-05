const navDialog = document.getElementById('nav-dialog');
function handleMenu() {
    navDialog.classList.toggle('hidden');
}

const initialTranslateLTR = -48 * 4;
const initialTranslateRTL = 36 * 4;

function setupIntersectionObserver(element, isLTR, speed) {

    const intersectionCallback = (entries) => {
        const isIntersecting = entries[0].isIntersecting;

        if (isIntersecting) {
            document.addEventListener('scroll', scrollHandler);
        } else {
            document.removeEventListener('scroll', scrollHandler);
        }
    }
    const intersectionObserver = new IntersectionObserver(intersectionCallback);
    intersectionObserver.observe(element);


    function scrollHandler() {
        const boundingRect = element.getBoundingClientRect();  // Added boundingRect
        const translateX = (window.innerHeight - element.getBoundingClientRect().top) * speed;

        let totalTranslate = 0;
        if (isLTR) {
            totalTranslate = translateX + initialTranslateLTR;
        } else {
            totalTranslate = -translateX + initialTranslateRTL;
        }

        element.style.transform = `translateX(${totalTranslate}px)`;

    }

}



const line1 = document.getElementById('line-1');
const line2 = document.getElementById('line-2');
const line3 = document.getElementById('line-3');
const line4 = document.getElementById('line4');

setupIntersectionObserver(line1, true, 0.15);
setupIntersectionObserver(line2, false, 0.15);
setupIntersectionObserver(line3, true, 0.15);
setupIntersectionObserver(line4, true, 0.8);

const dtElements = document.querySelectorAll('dt');  // Fixed querySelectorAll
dtElements.forEach(element => {
    element.addEventListener('click', () => {
        const ddId = element.getAttribute('aria-controls');
        const ddElement = document.getElementById(ddId);  // Fixed incorrect ID usage
        const dtArrowIcon = element.querySelectorAll('i');  // Corrected variable name
        ddElement.classList.toggle('hidden');
        dtArrowIcon.forEach(icon => {  // Fixed class toggle for each icon
            icon.classList.toggle('-rotate-180');
        });
    })
});
