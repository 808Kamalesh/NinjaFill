const starsContainer = document.querySelector('.stars');

function createStar() {
  const star = document.createElement('div');
  star.classList.add('star');

  star.style.left = `${Math.random() * 100}vw`;
  star.style.top = `${Math.random() * 100}vh`;
  star.style.width = `${Math.random() * 2 + 1}px`;
  star.style.height = star.style.width;

  const speed = Math.random() * 10 + 10; 
  star.style.animation = `starAnimation ${speed}s linear infinite`;

  return star;
}

function addStars(count) {
  for (let i = 0; i < count; i++) {
    const star = createStar();
    starsContainer.appendChild(star);
  }
}

addStars(100);