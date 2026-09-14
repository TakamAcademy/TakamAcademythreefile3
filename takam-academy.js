
/* ================= PAGE NAVIGATION WITH BACK BUTTON SUPPORT ================= */

const pages = document.querySelectorAll(".page");
const navLinks = document.querySelectorAll("[data-page]");

// পেজ দেখানোর জন্য মূল ফাংশন
function showPage(pageId, updateHistory = true) {
  const target = document.getElementById(pageId);
  if (!target) return;

  // সব পেজ থেকে active ক্লাস রিমুভ করা
  pages.forEach(page => {
    page.classList.remove("active");
  });

  // টার্গেট পেজে active ক্লাস যোগ করা
  target.classList.add("active");

  // নেভিগেশন মেনুর এক্টিভ লিংক পরিবর্তন
  document.querySelectorAll(".nav-menu a").forEach(link => {
    link.classList.remove("active");

    if (link.dataset.page === pageId) {
      link.classList.add("active");
    }
  });

  // পেজের উপারে স্ক্রোল করা
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  // মোবাইল মেনু খোলা থাকলে বন্ধ করা
  const navMenu = document.getElementById("navMenu");
  if (navMenu) {
    navMenu.classList.remove("open");
  }

  // হিস্ট্রিতে নতুন পেজ যোগ করা (যদি ব্যাক বাটন থেকে না আসা হয়ে থাকে)
  if (updateHistory) {
    history.pushState({ pageId: pageId }, "", `#${pageId}`);
  }

  setTimeout(initReveal, 200);
}

// নেভিগেশন লিংক ক্লিকের ইভেন্ট
navLinks.forEach(link => {
  link.addEventListener("click", function(e) {
    e.preventDefault();
    const pageId = this.dataset.page;
    if (pageId) {
      showPage(pageId, true);
    }
  });
});

// ব্রাউজারের ব্যাক/ফরওয়ার্ড বাটন হ্যান্ডেল করা
window.addEventListener("popstate", function(e) {
  if (e.state && e.state.pageId) {
    showPage(e.state.pageId, false);
  } else {
    const currentHash = location.hash.replace("#", "") || "home";
    showPage(currentHash, false);
  }
});

// প্রথমবার পেজ লোড বা রিফ্রেশ হলে হিস্ট্রি সেট করা
window.addEventListener("DOMContentLoaded", () => {
  const initialPage = location.hash.replace("#", "") || "home";
  history.replaceState({ pageId: initialPage }, "", `#${initialPage}`);
  showPage(initialPage, false);
});

/* ================= MOBILE MENU ================= */

function toggleMenu() {
  document.getElementById("navMenu").classList.toggle("open");
}

/* ================= CLOSE MOBILE MENU ON OUTSIDE CLICK ================= */

document.addEventListener("click", function (e) {
  const navMenu = document.getElementById("navMenu");
  const menuToggle = document.querySelector(".menu-toggle");

  if (!navMenu || !menuToggle) return;

  if (!navMenu.classList.contains("open")) return;

  if (
    navMenu.contains(e.target) ||
    menuToggle.contains(e.target)
  ) {
    return;
  }

  navMenu.classList.remove("open");
});

/* ================= COUNTER ================= */

let countersStarted = false;

function startCounters() {
  if (countersStarted) return;

  const counters = document.querySelectorAll(".counter");
  if (!counters.length) return;

  countersStarted = true;

  counters.forEach(counter => {
    const target = Number(counter.dataset.target);
    let current = 0;

    const increment = Math.max(1, Math.ceil(target / 60));

    function update() {
      current += increment;

      if (current >= target) {
        current = target;
      }

      counter.textContent = current;

      if (current < target) {
        requestAnimationFrame(update);
      }
    }

    update();
  });
}

/* ================= SCROLL REVEAL ================= */

function initReveal() {
  const elements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    {
      threshold: .1
    }
  );

  elements.forEach(element => {
    observer.observe(element);
  });
}

window.addEventListener("load", () => {
  initReveal();
  startCounters();
});

/* ================= GALLERY FILTER ================= */

const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    const filter = button.dataset.filter;

    document.querySelectorAll(".gallery-item").forEach(item => {
      if (filter === "all" || item.dataset.category === filter) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
});

/* ================= LIGHTBOX ================= */

document.querySelectorAll(".gallery-item").forEach(item => {
  item.addEventListener("click", () => {
    const img = item.querySelector("img");
    document.getElementById("lightboxImg").src = img.src;
    document.getElementById("lightbox").classList.add("active");
  });
});

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  if (lightbox) {
    lightbox.classList.remove("active");
  }
}

const lightboxEl = document.getElementById("lightbox");
if (lightboxEl) {
  lightboxEl.addEventListener("click", function(e) {
    if (e.target === this) {
      closeLightbox();
    }
  });
}

/* ================= TESTIMONIAL ================= */

const testimonials = [
  {
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjEbPaGaIUoGZJwm_iwyLSzS5sfFGpiWZy3G3ZW9trUXXGIo9YodRPT1sAk4bEasqu59XPiekHH-ceO8nTW5c2G0kqAWKOvp31ZDxUfRPonkQN9JB1kW14O-ODMNJzRbMqLj6hUBLT_VQGtraUswArQehwsCcw7eR1Hr8ZYhr7YeYn6X6G3Z2HRsKgiqjsD/s1208/gri.jpg",
    text: "তাকাম একাডেমির পরিবেশ খুবই সুন্দর। শিক্ষকরা শিক্ষার্থীদের পড়াশোনার পাশাপাশি নৈতিকতা ও শৃঙ্খলার বিষয়েও গুরুত্ব দেন।",
    name: "মোছাঃ ফারজানা",
    role: "অভিভাবক"
  },
  {
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj6g4MJd5eSQSmqxFkaovXUtAVDe6YoCiSWnjrsG1xm3XqYUEDGh6PHMVirDLxM9qr3L7pnFvjXIflKqIj0NwO6uOUbw9a7FtW-5YQxJDHUMQHV6aMJkBaxoFvzgjrGGszp0FKBKd53ztsbrwWgk9sVXxPY2ajkCr0BYe741r5_5Jab5fN9pPIlAOOIsa6I/s6000/DSC_0065.JPG",
    text: "এখানে পড়াশোনার পরিবেশ অনেক ভালো। শিক্ষকরা খুব আন্তরিক এবং কঠিন বিষয়গুলোও সহজভাবে বুঝিয়ে দেন।",
    name: "আব্দুর রহমান",
    role: "শিক্ষার্থী"
  },
  {
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjEbPaGaIUoGZJwm_iwyLSzS5sfFGpiWZy3G3ZW9trUXXGIo9YodRPT1sAk4bEasqu59XPiekHH-ceO8nTW5c2G0kqAWKOvp31ZDxUfRPonkQN9JB1kW14O-ODMNJzRbMqLj6hUBLT_VQGtraUswArQehwsCcw7eR1Hr8ZYhr7YeYn6X6G3Z2HRsKgiqjsD/s1208/gri.jpg",
    text: "আমার সন্তানের পড়াশোনা ও আচরণে ইতিবাচক পরিবর্তন এসেছে। একাডেমির শিক্ষক ও ব্যবস্থাপনার প্রতি আমরা কৃতজ্ঞ।",
    name: "মোছাঃ নুসরাত",
    role: "অভিভাবক"
  }
];

let testimonialIndex = 0;

function renderTestimonial() {
  const item = testimonials[testimonialIndex];
  if (!item) return;

  const imgEl = document.getElementById("testimonialImg");
  const textEl = document.getElementById("testimonialText");
  const nameEl = document.getElementById("testimonialName");
  const roleEl = document.getElementById("testimonialRole");

  if (imgEl) imgEl.src = item.image;
  if (textEl) textEl.textContent = item.text;
  if (nameEl) nameEl.textContent = item.name;
  if (roleEl) roleEl.textContent = item.role;
}

function nextTestimonial() {
  testimonialIndex++;
  if (testimonialIndex >= testimonials.length) {
    testimonialIndex = 0;
  }
  renderTestimonial();
}

function prevTestimonial() {
  testimonialIndex--;
  if (testimonialIndex < 0) {
    testimonialIndex = testimonials.length - 1;
  }
  renderTestimonial();
}

setInterval(nextTestimonial, 6000);

/* ================= RESULT ================= */

function searchResult() {
  const studentId = document.getElementById("studentId").value.trim();
  const roll = document.getElementById("rollNumber").value.trim();

  if (!studentId || !roll) {
    alert("অনুগ্রহ করে Student ID এবং Roll Number লিখুন।");
    return;
  }

  const resultBox = document.getElementById("resultBox");
  if (resultBox) {
    resultBox.style.display = "block";
    resultBox.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }
}

/* ================= ADMISSION ================= */

const admissionForm = document.getElementById("admissionForm");
if (admissionForm) {
  admissionForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const successMsg = document.getElementById("admissionSuccess");
    if (successMsg) successMsg.style.display = "block";
    this.reset();

    setTimeout(() => {
      if (successMsg) {
        successMsg.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      }
    }, 100);
  });
}

/* ================= CONTACT ================= */

const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function(e) {
    e.preventDefault();
    alert("আপনার মেসেজ সফলভাবে গ্রহণ করা হয়েছে। ধন্যবাদ!");
    this.reset();
  });
}

/* ================= NEWSLETTER ================= */

function subscribeNewsletter(event) {
  event.preventDefault();
  alert("Newsletter subscription সফল হয়েছে। ধন্যবাদ!");
  event.target.reset();
}

/* ================= ESC KEY ================= */

document.addEventListener("keydown", function(e) {
  if (e.key === "Escape") {
    closeLightbox();
  }
});

/* ================= TYPING ANIMATION ================= */

const texts = [
  "কুরআন-সুন্নাহর শিক্ষা",
  "ইলম ও আমল",
  "আদর্শ চরিত্র গঠন",
  "দ্বীনি শিক্ষা নিকেতন"
];

const typedText = document.getElementById("typedText");

let textIndex = 0;
let characterIndex = 0;

const typingSpeed = 100;
const deletingSpeed = 60;
const pauseAfterTyping = 1800;
const pauseAfterDeleting = 500;

function typeText() {
  if (!typedText) return;

  if (characterIndex < texts[textIndex].length) {
    typedText.textContent += texts[textIndex].charAt(characterIndex);
    characterIndex++;
    setTimeout(typeText, typingSpeed);
  } else {
    setTimeout(deleteText, pauseAfterTyping);
  }
}

function deleteText() {
  if (!typedText) return;

  if (characterIndex > 0) {
    typedText.textContent = texts[textIndex].substring(0, characterIndex - 1);
    characterIndex--;
    setTimeout(deleteText, deletingSpeed);
  } else {
    textIndex++;
    if (textIndex >= texts.length) {
      textIndex = 0;
    }
    setTimeout(typeText, pauseAfterDeleting);
  }
}

if (typedText) {
  typeText();
}

/* ================= IMAGE SLIDER ================= */

const slider = document.getElementById("imageSlider");
const slideItems = document.querySelectorAll(".slide");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const dotsContainer = document.getElementById("dots");

let currentIndex = 0;
const totalSlides = slideItems.length;
const AUTO_SLIDE_TIME = 4000;
let autoSlide;

if (slider && totalSlides > 0) {
  // ডট তৈরি
  slideItems.forEach((slide, index) => {
    const dot = document.createElement("button");
    dot.className = "dot";
    dot.setAttribute("aria-label", "Slide " + (index + 1));
    dot.addEventListener("click", () => {
      goToSlide(index);
      restartAutoSlide();
    });
    if (dotsContainer) dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll(".dot");

  function updateDots() {
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  }

  function goToSlide(newIndex) {
    if (newIndex === currentIndex) return;

    const oldIndex = currentIndex;

    slideItems[newIndex].classList.remove("previous");
    slideItems[newIndex].classList.add("active");

    slideItems[oldIndex].classList.remove("active");
    slideItems[oldIndex].classList.add("previous");

    currentIndex = newIndex;
    updateDots();

    setTimeout(() => {
      slideItems.forEach((slide, index) => {
        if (index !== currentIndex) {
          slide.classList.remove("active", "previous");
        }
      });
    }, 700);
  }

  function nextSlide() {
    const nextIndex = (currentIndex + 1) % totalSlides;
    goToSlide(nextIndex);
  }

  function previousSlide() {
    const previousIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    goToSlide(previousIndex);
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      nextSlide();
      restartAutoSlide();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      previousSlide();
      restartAutoSlide();
    });
  }

  function startAutoSlide() {
    stopAutoSlide();
    autoSlide = setInterval(nextSlide, AUTO_SLIDE_TIME);
  }

  function stopAutoSlide() {
    if (autoSlide) {
      clearInterval(autoSlide);
      autoSlide = null;
    }
  }

  function restartAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
  }

  slider.addEventListener("mouseenter", stopAutoSlide);
  slider.addEventListener("mouseleave", startAutoSlide);

  let touchStartX = 0;
  let touchEndX = 0;

  slider.addEventListener("touchstart", function(event) {
    touchStartX = event.changedTouches[0].screenX;
    stopAutoSlide();
  }, { passive: true });

  slider.addEventListener("touchend", function(event) {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
    startAutoSlide();
  }, { passive: true });

  function handleSwipe() {
    const distance = touchEndX - touchStartX;
    if (distance < -50) {
      nextSlide();
    } else if (distance > 50) {
      previousSlide();
    }
  }

  updateDots();
  startAutoSlide();
}

/* =====================================================
   MODERN IMAGE SLIDER JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");
    const nextButton = document.querySelector(".next");
    const prevButton = document.querySelector(".prev");
    const progress = document.querySelector(".slider-progress span");

    let currentSlide = 0;
    let autoSlide;

    /* Slide duration (5 seconds) */
    const slideDuration = 5000;

    /* SHOW SLIDE */
    function showSlide(index) {
        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }

        /* Remove active class */
        slides.forEach(function (slide) {
            slide.classList.remove("active");
        });

        dots.forEach(function (dot) {
            dot.classList.remove("active");
        });

        /* Add active class */
        slides[currentSlide].classList.add("active");
        dots[currentSlide].classList.add("active");

        /* Progress bar reset */
        progress.style.transition = "none";
        progress.style.width = "0%";

        setTimeout(function () {
            progress.style.transition = "width " + slideDuration + "ms linear";
            progress.style.width = "100%";
        }, 50);
    }

    /* NEXT SLIDE */
    function nextSlide() {
        showSlide(currentSlide + 1);
        restartAutoSlide();
    }

    /* PREVIOUS SLIDE */
    function previousSlide() {
        showSlide(currentSlide - 1);
        restartAutoSlide();
    }

    /* BUTTON EVENTS */
    nextButton.addEventListener("click", nextSlide);
    prevButton.addEventListener("click", previousSlide);

    /* DOT EVENTS */
    dots.forEach(function (dot, index) {
        dot.addEventListener("click", function () {
            showSlide(index);
            restartAutoSlide();
        });
    });

    /* AUTO SLIDE */
    function startAutoSlide() {
        autoSlide = setInterval(function () {
            showSlide(currentSlide + 1);
        }, slideDuration);
    }

    function restartAutoSlide() {
        clearInterval(autoSlide);
        startAutoSlide();
    }

    /* TOUCH SWIPE (MOBILE) */
    let touchStartX = 0;
    let touchEndX = 0;

    const slider = document.querySelector(".slider-wrapper");

    slider.addEventListener(
        "touchstart",
        function (event) {
            touchStartX = event.changedTouches[0].screenX;
        },
        { passive: true }
    );

    slider.addEventListener(
        "touchend",
        function (event) {
            touchEndX = event.changedTouches[0].screenX;
            handleSwipe();
        },
        { passive: true }
    );

    function handleSwipe() {
        const distance = touchEndX - touchStartX;

        if (Math.abs(distance) < 50) {
            return;
        }

        if (distance < 0) {
            nextSlide();
        } else {
            previousSlide();
        }
    }

    /* INITIALIZE SLIDER */
    showSlide(0);
    startAutoSlide();
});
/* =====================================================
   MODERN IMAGE SLIDER JAVASCRIPT Closd
===================================================== */


function openPdfModal(pdfUrl) {
  const modal = document.getElementById("pdfModal");
  const iframe = document.getElementById("pdfFrame");
  
  // বাটনে ক্লিক করলে সেই বইয়ের লিঙ্ক ইফ্রেম-এ যাবে
  iframe.src = pdfUrl || PDF_FILE_URL;
  modal.style.display = "block";
  document.body.style.overflow = "hidden";
}

function closePdfModal() {
  const modal = document.getElementById("pdfModal");
  const iframe = document.getElementById("pdfFrame");
  
  iframe.src = "";
  modal.style.display = "none";
  document.body.style.overflow = "";
}

// Toggle WhatsApp Popup
function toggleWhatsApp() {
  const popup = document.getElementById("waPopup");
  popup.classList.toggle("active");
}




