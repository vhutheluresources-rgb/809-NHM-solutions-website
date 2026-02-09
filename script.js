window.addEventListener("scroll", () => {
    const nav = document.querySelector("nav");
    if (nav) {
        if (window.scrollY > 50) {
            nav.classList.add("scrolled");
        } else {
            nav.classList.remove("scrolled");
        }
    }

    // Update active nav link on scroll
    updateActiveNavLink();
});


// Set up navigation link clicks for smooth scrolling
document.querySelectorAll('.nav-link, .footer-link, .logo, .cta-button').forEach(link => {
    link.addEventListener('click', function (e) {
        // Only handle internal links
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                // Scroll to the target section
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });

                // Update URL hash without scrolling
                history.pushState(null, null, `#${targetId}`);

                // Update active navigation link
                updateActiveNavLink();
            }
        }
    });
});

// Handle initial hash in URL
if (window.location.hash) {
    const targetId = window.location.hash.substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
        setTimeout(() => {
            targetElement.scrollIntoView();
        }, 100);
    }
}


// Function to update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('.page-section');
    const navLinks = document.querySelectorAll('.nav-link');

    let currentSectionId = '';

    // Find which section is currently in view
    for (let section of sections) {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const scrollPosition = window.scrollY;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSectionId = section.id;
            break; // Stop after finding the first matching section
        }
    }

    // If no section is in view (e.g., at the top), set home as active
    if (!currentSectionId && window.scrollY < 100) {
        currentSectionId = 'home';
    }

    // Update active class on navigation links
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
            link.classList.add('active');
        }
    });
}


/*JavaScript for Interactive Star Rating*/
  document.addEventListener("DOMContentLoaded", function () {
    const stars = document.querySelectorAll(".star-rating span");
    let selectedRating = 0;

    stars.forEach((star, index) => {
      star.addEventListener("click", () => {
        selectedRating = index + 1;

        // Highlight stars up to the clicked one
        stars.forEach((s, i) => {
          s.style.color = i < selectedRating ? "#f4b400" : "#ccc";
        });
      });

      // Optional: highlight on hover
      star.addEventListener("mouseover", () => {
        stars.forEach((s, i) => {
          s.style.color = i <= index ? "#f4b400" : "#ccc";
        });
      });

      star.addEventListener("mouseout", () => {
        stars.forEach((s, i) => {
          s.style.color = i < selectedRating ? "#f4b400" : "#ccc";
        });
      });
    });

    // Handle form submission
    const form = document.querySelector(".reviewForm");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.querySelector("input").value;
      const reviewText = form.querySelector("textarea").value;

      if (selectedRating === 0) {
        alert("Please select a star rating before submitting.");
        return;
      }

      alert(
        `Thank you, ${name}! You gave us ${selectedRating} star(s).\nYour review: "${reviewText}"`
      );

      // Reset form
      form.reset();
      stars.forEach((s) => (s.style.color = "#ccc"));
      selectedRating = 0;
    });
  });








