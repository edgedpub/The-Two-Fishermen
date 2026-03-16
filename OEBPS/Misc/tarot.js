// Function for chapter 1 animation; it runs when scrolling occurs in the tarot cards container
function chapter1ScrollFunction() {
  console.log("Running chapter 1 scroll function");
  let textContents = document.querySelectorAll(".text-content");
  let container = document.querySelector(".tarot-cards");
  let containerRect = container.getBoundingClientRect();
  let containerCenter = containerRect.top + containerRect.height / 2;

  textContents.forEach(function (content, index) {
    let card = container.children[index];
    let rect = card.getBoundingClientRect();
    let cardCenter = rect.top + rect.height / 2;

    let tolerance = rect.height * 0.25;
    if (Math.abs(cardCenter - containerCenter) < tolerance) {
      content.classList.add("active");
    } else {
      content.classList.remove("active");
    }
  });
}

// Function for chapter 2 animation (click-based)
function chapter2ClickFunction() {
  console.log("Running chapter 2 click function");
  let textContents = document.querySelectorAll(".text-content");
  let cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    const img = card.querySelector("img");
    const textClass = img.className;
    const correspondingText = document.getElementById(textClass);

    // Store original src before changing to backside
    const originalSrc = img.src;
    img.src = "../Images/tarot_backside.jpeg";

    card.addEventListener("click", () => {
      img.src = flipCard[textClass];
      textContents.forEach((content) => content.classList.remove("active"));
      correspondingText.classList.add("active");

      const newCard = card.cloneNode(true);
      const newImg = newCard.querySelector("img");
      newImg.src = "../Images/tarot_backside.jpeg";
      card.parentNode.insertBefore(newCard, card.nextSibling);
    });
  });
}

// Check which chapter we're in
const isChapter2 = document.querySelector('[data-chapter="2"]') !== null;
console.log("Is Chapter 2:", isChapter2);

// Get the tarot cards container
const tarotContainer = document.querySelector(".tarot-cards");

if (isChapter2) {
  // Run chapter 2 click-based animation
  chapter2ClickFunction();
} else {
  // Run chapter 1 scroll-based animation
  tarotContainer.addEventListener("scroll", chapter1ScrollFunction);
  chapter1ScrollFunction();
}
