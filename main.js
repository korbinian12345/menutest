//get menu index
const menu = document.getElementById("menu");

Array.from(document.getElementsByClassName("menu-item")).forEach((item, index) => {
    item.onmouseover = () => {
        menu.dataset.activeIndex = index;
    }
});

//x scrolling
const imageContainer = document.querySelector('.imagescontainer');

imageContainer.addEventListener('wheel', (event) => {
    const isScrollable = imageContainer.scrollWidth > imageContainer.clientWidth;
    if (!isScrollable) return;

    const currentScrollLeft = imageContainer.scrollLeft;
    const maxScrollLeft = imageContainer.scrollWidth - imageContainer.clientWidth;
    const scrollDirection = Math.sign(event.deltaY);

    const isAtStart = currentScrollLeft === 0;
    const isAtEnd = currentScrollLeft >= maxScrollLeft;

    const scrollingBeyondStart = isAtStart && scrollDirection < 0;
    const scrollingBeyondEnd = isAtEnd && scrollDirection > 0;

    if (scrollingBeyondStart || scrollingBeyondEnd) {
        return;
    }
            
    event.preventDefault();
    imageContainer.scrollLeft += event.deltaY;
});

/*scroll button*/
(function () {
    const container = document.getElementById('image-scroll');
    const leftBtn = document.querySelector('.scroll-btn.left');
    const rightBtn = document.querySelector('.scroll-btn.right');
    if (!container || !leftBtn || !rightBtn) return;

    const getGap = () => {
        const g = getComputedStyle(container).gap;
        return g ? parseInt(g, 10) : 20;
    };

    function scrollByAmount(direction) {
        const firstImg = container.querySelector('img');
        if (!firstImg) return;
        const amount = firstImg.offsetWidth + getGap();
        container.scrollBy({ left: direction * amount, behavior: 'smooth' });
    }

    leftBtn.addEventListener('click', () => scrollByAmount(-1));
    rightBtn.addEventListener('click', () => scrollByAmount(1));

    // keyboard support when buttons are focused
    [leftBtn, rightBtn].forEach(btn => {
        btn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                btn.click();
            }
        });
    });
})();
