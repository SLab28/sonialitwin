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


