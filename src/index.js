const apiUrl = "http://localhost:3000";

const homeSection = document.getElementById("home-page");

const otherSections = document.querySelectorAll(".hidden-section");

const navLinks = document.querySelectorAll("nav ul li a");

// Function to show the selected nav section and hide the others
function showSection(sectionId) {
  homeSection.style.display = "none"; // Hides the home section
  otherSections.forEach((section) => {
    if (section.id === sectionId) {
      section.style.display = "block";
    } else {
      section.style.display = "none";
    }
  });
}

// Displaying the home section by default
homeSection.style.display = "block";

//  click event listeners to the navigation links
navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault(); // Prevents reloading - the default link behavior

    // Get the target section ID from the link's href
    const targetSectionId = event.target.getAttribute("href").slice(1);

    if (targetSectionId === "home-page") {
      // If the target section is the home page, show the home section
      homeSection.style.display = "block";
      otherSections.forEach((section) => (section.style.display = "none"));
    } else {
      // Otherwise, show the target section and hide the other sections
      showSection(targetSectionId);
    }

    // Scroll to the top of the page
    window.scrollTo(0, 0);
  });
});

//  event listener for the form submission
const form = document.querySelector("#check-in form");
form.addEventListener("submit", handleCheckIn);

// function handleCheckIn to process the check-in form submission:

function handleCheckIn(event) {
  event.preventDefault();

  // Get the form input values
  const studentId = document.getElementById("studentId").value;
  // const password = document.getElementById("password").value;

  if (isAuthenticated) {
    // Hides the check-in form section
    document.getElementById("check-in").style.display = "none";

    // Displays the student dashboard section
    document.getElementById("student-dashboard").style.display = "block";

    // Fetching and displaying the attendance records
    displayAttendanceRecords();
  } else {
    // Displaying an error message or handle authentication failure
    alert("Invalid student ID or password");
  }
}

// Function to handle the check-in form submission
function handleCheckIn(event) {
  event.preventDefault();

  // Get the form input value
  const studentId = document.getElementById("studentId").value;
}
