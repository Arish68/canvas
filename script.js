// Canvas settings
const canvas = document.getElementById("hero-lightpass");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


// Preloading images to drastically improve performance
const currentFrame = index => (`images/${index.toString().padStart(4, '0')}.png`);
const frameCount = 20; // There 148 images for that animation-sequence to load
const images = [];

const preloadImages = () => {
    for (let i = 1; i < frameCount; i++) {
        images[i] = new Image(); // This is functionally equivalent to document.createElement('img').
        images[i].src = currentFrame(i);
    }
};

preloadImages();


// Draw the first image
const img = new Image();
img.src = currentFrame(1);
img.onload = function(){
    let ratio = img.width / img.height;
    let newWidth = canvas.width;
    let newHeight = newWidth / ratio;
    if (newHeight < canvas.height) {
        newHeight = canvas.height;
        newWidth = newHeight * ratio;
    }
    const xOffset = newWidth > canvas.width ? (canvas.width - newWidth) / 2 : 0;
    const yOffset =
        newHeight > canvas.height ? (canvas.height - newHeight) / 2 : 0;
    context.drawImage(img, xOffset, yOffset, newWidth, newHeight);

}


// Scroll interactions
const html = document.getElementsByTagName('html');

window.addEventListener('scroll', () => {

        const scrollTop = html[0].scrollTop;
        // console.log('scrollTop: ', scrollTop);
        // console.log('html.scrollHeight: ', html[0].scrollHeight);
        // console.log('window.innerHeight: ', window.innerHeight);
        const maxScrollTop = html[0].scrollHeight - window.innerHeight;
        const scrollFraction = scrollTop / maxScrollTop;
        const frameIndex = Math.min(
            frameCount - 1,
            Math.floor(scrollFraction * frameCount)
        );

        console.log('FrameIndex', frameIndex);
        var img = images[frameIndex + 1];
        if((frameIndex + 1) < 8)
        {
            let ratio = img.width / img.height;
            let newWidth = canvas.width;
            let newHeight = newWidth / ratio;
            if (newHeight < canvas.height) {
                newHeight = canvas.height;
                newWidth = newHeight * ratio;
            }
            const xOffset = newWidth > canvas.width ? (canvas.width - newWidth) / 2 : 0;
            const yOffset =
                newHeight > canvas.height ? (canvas.height - newHeight) / 2 : 0;
            requestAnimationFrame(() => context.drawImage(img, xOffset, yOffset, newWidth, newHeight));
        }




});