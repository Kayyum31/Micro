// Scroll to Top Button
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

// Show the Scroll to Top button when the user scrolls down
window.onscroll = function () {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
};

// Scroll to the top of the page when the button is clicked
scrollToTopBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Change Navbar Background on Scroll
const navbar = document.querySelector('.custom-navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


//image wala

document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('.image-carousel img');
  let currentIndex = 0;

  setInterval(() => {
    images[currentIndex].style.display = 'none'; // Hide current image
    currentIndex = (currentIndex + 1) % images.length; // Move to next image
    images[currentIndex].style.display = 'block'; // Show next image
  }, 2000); // Change image every 2 seconds
});


//Learn More Button Script hai.
function scrollToAbout() {
  console.log("Scroll function triggered");
  const aboutSection = document.getElementById('about'); // Updated ID
  console.log("About Section:", aboutSection);

  if (aboutSection) {
    aboutSection.scrollIntoView({ behavior: 'smooth' });
  } else {
    console.error("About Us section not found!");
  }
}

//Products wala
const productTrack = document.querySelector('.product-track');
const products = document.querySelectorAll('.product');
const productWidth = products[0].offsetWidth + 20; // Product width + margin

// Duplicate the products to create a seamless infinite scrolling effect
productTrack.innerHTML += productTrack.innerHTML;

// Define variables
let currentPosition = 0;
let scrollAnimation;

// Smooth continuous scrolling function
function smoothScroll() {
  currentPosition -= 1; // Adjust this value for speed (lower = slower)
  productTrack.style.transform = `translateX(${currentPosition}px)`;

  // Reset position seamlessly when the first set is fully out of view
  if (Math.abs(currentPosition) >= productTrack.scrollWidth / 2) {
    currentPosition = 0; // Reset position
  }

  scrollAnimation = requestAnimationFrame(smoothScroll);
}

// Start scrolling
function startScroll() {
  scrollAnimation = requestAnimationFrame(smoothScroll);
}

// Stop scrolling
function stopScroll() {
  cancelAnimationFrame(scrollAnimation);
}

// Hover events to stop and start scrolling
productTrack.addEventListener('mouseenter', stopScroll); // Stop on hover
productTrack.addEventListener('mouseleave', startScroll); // Restart on mouse leave

// Start scrolling initially
startScroll();

document.getElementById('productsDropdown').addEventListener('click', function (e) {
  e.preventDefault();
  document.getElementById('featured-products').scrollIntoView({
    behavior: 'smooth'
  });
});


//our office wala hai
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert("Phone number copied to clipboard!");
  }).catch(err => {
    console.error("Error copying text: ", err);
  });
}

//contact data
document.getElementById("contactForm").addEventListener("submit", async function (e) {
  e.preventDefault(); // Prevent form from refreshing the page

  // Collect form data
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  // Validation
  const nameRegex = /^[A-Za-z\s]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!nameRegex.test(name)) {
    alert("❌ Please enter a valid full name (only letters and spaces).");
    return;
  }

  if (!emailRegex.test(email)) {
    alert("❌ Please enter a valid email address.");
    return;
  }

  try {
    // Send data to the server
    const response = await fetch("http://localhost:3000/submit-contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });

    if (response.ok) {
      // Success: Show pop-up and reset the form
      alert("🎉 Thank you so much! 😊 Your message has been sent.");
      document.getElementById("contactForm").reset();
    } else {
      // Handle server error
      const errorData = await response.json();
      alert(`❌ Failed to send your message. ${errorData.error || "Please try again."}`);
      console.error("Server Response:", errorData.details || response.statusText);
    }
  } catch (error) {
    // Handle unexpected errors
    console.error("Error submitting the form:", error);
    alert("❌ An unexpected error occurred. Please try again later.");
  }
});
