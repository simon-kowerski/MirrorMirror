function createStars() {
    const starContainer = document.querySelector(".stars");

    for (let i = 0; i < 10; i++) {
        let star = document.createElement("img");
        star.classList.add("star");
        star.src = "star.png";

        let size = Math.random() * 15 + 5;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        let rotation = Math.random() * 360;
        star.style.transform = `rotate(${rotation}deg)`
        
        star.style.position = "absolute";
        star.style.left = `${Math.random() * 100}%`;
        star.style.animationDuration = `${Math.random() * 5 + 5}s`;
        starContainer.appendChild(star);
    }
}
createStars();