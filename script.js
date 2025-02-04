document.addEventListener("DOMContentLoaded", function () {
  let highestZ = 1;
  const loader = document.getElementById("loader");
  const heart = document.querySelector(".heart2");
  const content = document.getElementById("content");
  const papers = document.querySelectorAll(".paper");
  
  // Music Setup
  const music = new Audio("music.mp3");
  music.loop = true; 

  if (!loader || !heart || !content) {
      console.error("Error: One or more elements are missing!");
      return;
  }

  console.log("Starting animation...");

  // Heart animation disappears after 3 seconds
  setTimeout(() => {
      heart.classList.add("fade-out");
      console.log("Heart fading out...");
  }, 3000);

  // Show content after 4 seconds
  setTimeout(() => {
      loader.style.display = "none";
      content.style.visibility = "visible";
      content.style.opacity = "1";
      console.log("Loader removed, content appearing...");
  }, 4000);

  // Play music when clicking any paper
  papers.forEach(paper => {
      paper.addEventListener("click", function () {
          music.play().then(() => {
              console.log("Music started playing.");
          }).catch(error => {
              console.error("Music playback failed:", error);
          });
      });
  });

  // Dragging functionality without sticking to pointer
  papers.forEach(paper => {
      paper.addEventListener("mousedown", function (event) {
          event.preventDefault();

          let shiftX = event.clientX - paper.getBoundingClientRect().left;
          let shiftY = event.clientY - paper.getBoundingClientRect().top;

          paper.style.position = "absolute";
          paper.style.zIndex = ++highestZ;

          function moveAt(pageX, pageY) {
              paper.style.left = `${pageX - shiftX}px`;
              paper.style.top = `${pageY - shiftY}px`;
          }

          function onMouseMove(event) {
              moveAt(event.pageX, event.pageY);
          }

          document.addEventListener("mousemove", onMouseMove);

          document.addEventListener("mouseup", function onMouseUp() {
              document.removeEventListener("mousemove", onMouseMove);
              document.removeEventListener("mouseup", onMouseUp);
              paper.style.cursor = "grab";
          }, { once: true });
      });

      paper.ondragstart = function () {
          return false;
      };
  });
});