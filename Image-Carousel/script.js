// 5 Random images 

const images = [
    'https://picsum.photos/800/600?random=1',
    'https://picsum.photos/800/600?random=2',
    'https://picsum.photos/800/600?random=3',
    'https://picsum.photos/800/600?random=4',
    'https://picsum.photos/800/600?random=5'
];

let currentIndex = 0;

//Selecting elements
const carouselImages = document.querySelector('.images');
const previousButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

//Logic to update image 
function updateImage() {
    carouselImages.style.transform = `translateX(-${currentIndex * 100}%)`;
}
//Logic to move to previous image
function prevImage() {
    currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
    updateImage();
    console.log('prev');

}
//Logic to move to next image
function nextImage() {
    currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
    updateImage();
    console.log('next');

}
//Adding eventlistener to buttons
previousButton.addEventListener('click', prevImage);
nextButton.addEventListener('click', nextImage)
//changing the image src links from the array
carouselImages.innerHTML = images.map(image => `<img class="image" src="${image}" alt="IMAGE HERE">`).join('');
updateImage();