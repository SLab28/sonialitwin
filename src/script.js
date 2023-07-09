// This is where you add interactivity to your elements
// Get a reference to your navigation bar element
var navbar = document.getElementById("navbar");
// Declare a variable to store the last scroll position
var lastScroll = 0;
// Add a scroll event listener to the window element
window.addEventListener("scroll", function() {
  // Get the current scroll position
  var currentScroll = window.scrollY; // Use window.scrollY instead of window.pageYOffset
  // Check if the current scroll position is greater than the last scroll position and the navigation bar is not hidden
  if (currentScroll > lastScroll && !navbar.classList.contains("hidden")) {
    // Add the hidden class to the navigation bar element
    navbar.classList.add("hidden");
  }
  // Check if the current scroll position is less than the last scroll position and the navigation bar is hidden
  if (currentScroll < lastScroll && navbar.classList.contains("hidden")) {
    // Remove the hidden class from the navigation bar element
    navbar.classList.remove("hidden");
  }
  // Update the last scroll position with the current scroll position
  lastScroll = currentScroll;
});

/* Smooth scrolling functionality */ // Get all the links with a hash in the href attribute 
const links = document.querySelectorAll("a[href*='#']"); // Loop through the links 
for (let link of links) { // Add a click event listener to each link 
  link.addEventListener("click", function(event) { // Prevent the default behavior of the link 
    event.preventDefault(); // Get the target element of the link 
    const target = document.querySelector(this.hash); // Scroll to the target element with a smooth behavior 
target.scrollIntoView({ behavior: "smooth" }); }); }

/* Parallax effect functionality */
// Get the simulation element
const simulation = document.querySelector(".simulation");

// Add a scroll event listener to the window
window.addEventListener("scroll", function() {
   // Get the scroll position of the window
   const scrollPosition = window.pageYOffset;

   // Calculate the offset of the simulation element based on the scroll position
   const offset = scrollPosition * 0.5;

   // Set the transform property of the simulation element to translate it vertically by the offset
   simulation.style.transform = `translateY(${offset}px)`;
});

