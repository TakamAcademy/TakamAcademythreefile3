/* ================= PAGE NAVIGATION ================= */

  const pages = document.querySelectorAll(".page");
  const navLinks = document.querySelectorAll("[data-page]");

  function showPage(pageId) {

    pages.forEach(page => {
      page.classList.remove("active");
    });

    const target = document.getElementById(pageId);

    if (target) {
      target.classList.add("active");
    }

    document.querySelectorAll(".nav-menu a").forEach(link => {
      link.classList.remove("active");

      if (link.dataset.page === pageId) {
        link.classList.add("active");
      }
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    document.getElementById("navMenu").classList.remove("open");

    setTimeout(initReveal, 200);
  }

  navLinks.forEach(link => {

    link.addEventListener("click", function(e) {

      e.preventDefault();

      const pageId = this.dataset.page;

      if (pageId) {
        showPage(pageId);
      }

    });

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

  /* মেনু খোলা থাকলেই কাজ করবে */
  if (!navMenu.classList.contains("open")) return;

  /* মেনুর ভেতরে বা Menu button-এ ক্লিক করলে কিছু করবে না */
  if (
    navMenu.contains(e.target) ||
    menuToggle.contains(e.target)
  ) {
    return;
  }

  /* মেনুর বাইরে ক্লিক করলে বন্ধ হবে */
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
    document.getElementById("lightbox").classList.remove("active");
  }

  document.getElementById("lightbox").addEventListener("click", function(e) {

    if (e.target === this) {
      closeLightbox();
    }

  });

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

    document.getElementById("testimonialImg").src = item.image;
    document.getElementById("testimonialText").textContent = item.text;
    document.getElementById("testimonialName").textContent = item.name;
    document.getElementById("testimonialRole").textContent = item.role;

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

    document.getElementById("resultBox").style.display = "block";

    document.getElementById("resultBox").scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

  }

  /* ================= ADMISSION ================= */

  document.getElementById("admissionForm").addEventListener("submit", function(e) {

    e.preventDefault();

    document.getElementById("admissionSuccess").style.display = "block";

    this.reset();

    setTimeout(() => {

      document.getElementById("admissionSuccess").scrollIntoView({
        behavior: "smooth",
        block: "center"
      });

    }, 100);

  });

  /* ================= CONTACT ================= */

  document.getElementById("contactForm").addEventListener("submit", function(e) {

    e.preventDefault();

    alert("আপনার মেসেজ সফলভাবে গ্রহণ করা হয়েছে। ধন্যবাদ!");

    this.reset();

  });

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
    "জ্ঞান, নৈতিকতা ",
    "শিক্ষার আলোয় ",
    "জ্ঞান হোক আলো",
    "আদর্শ শিক্ষায় গড়ে"
];

const typedText = document.getElementById("typedText");

let textIndex = 0;
let characterIndex = 0;

const typingSpeed = 100;
const deletingSpeed = 60;
const pauseAfterTyping = 1800;
const pauseAfterDeleting = 500;

function typeText() {

    if (characterIndex < texts[textIndex].length) {

        typedText.textContent += texts[textIndex].charAt(characterIndex);

        characterIndex++;

        setTimeout(typeText, typingSpeed);

    } else {

        setTimeout(deleteText, pauseAfterTyping);

    }
}

function deleteText() {

    if (characterIndex > 0) {

        typedText.textContent =
            texts[textIndex].substring(0, characterIndex - 1);

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

typeText();


/* ===== TaKam Academy: Safe Browser Back Navigation =====
   Keep browser Back inside the site's internal navigation.
*/
(function () {
  const HOME = "home";

  function currentPage() {
    return (location.hash || "#home").replace(/^#/, "") || HOME;
  }

  function setInternal(page, replace) {
    const p = String(page || HOME).replace(/^#/, "") || HOME;
    const url = new URL(location.href);
    url.hash = p;
    const state = { takaMInternal: true, page: p };
    if (replace) history.replaceState(state, "", url);
    else history.pushState(state, "", url);
  }

  if (!history.state || !history.state.takaMInternal) {
    setInternal(currentPage(), true);
  }

  document.addEventListener("click", function (e) {
    const a = e.target.closest && e.target.closest("a[href]");
    if (!a) return;
    const href = a.getAttribute("href");
    if (!href || href === "#" || href.startsWith("javascript:")) return;

    try {
      const u = new URL(href, location.href);
      if (u.origin === location.origin &&
          u.pathname === location.pathname &&
          u.hash) {
        const page = u.hash.replace(/^#/, "") || HOME;
        if (page !== currentPage()) {
          e.preventDefault();
          setInternal(page, false);
          window.dispatchEvent(new HashChangeEvent("hashchange"));
        }
      }
    } catch (_) {}
  }, true);
})();
/* =================================
   GET ELEMENTS
================================= */

const slider =
    document.getElementById("imageSlider");

const slideItems =
    document.querySelectorAll(".slide");

const prevBtn =
    document.getElementById("prevBtn");

const nextBtn =
    document.getElementById("nextBtn");

const dotsContainer =
    document.getElementById("dots");


/* =================================
   SETTINGS
================================= */

let currentIndex = 0;

const totalSlides =
    slideItems.length;

const AUTO_SLIDE_TIME = 4000;

let autoSlide;


/* =================================
   CREATE DOTS
================================= */

slideItems.forEach((slide,index)=>{

    const dot =
        document.createElement("button");

    dot.className = "dot";

    dot.setAttribute(
        "aria-label",
        "Slide " + (index + 1)
    );

    dot.addEventListener(
        "click",
        ()=>{

            goToSlide(index);

            restartAutoSlide();

        }
    );

    dotsContainer.appendChild(dot);

});


const dots =
    document.querySelectorAll(".dot");


/* =================================
   UPDATE DOT
================================= */

function updateDots(){

    dots.forEach((dot,index)=>{

        dot.classList.toggle(
            "active",
            index === currentIndex
        );

    });

}


/* =================================
   SHOW SLIDE
================================= */

function goToSlide(newIndex){

    if(newIndex === currentIndex){
        return;
    }


    const oldIndex =
        currentIndex;


    /*
       নতুন slide RIGHT থেকে আসবে
    */

    slideItems[newIndex]
        .classList.remove("previous");

    slideItems[newIndex]
        .classList.add("active");


    /*
       পুরোনো slide LEFT দিকে যাবে
    */

    slideItems[oldIndex]
        .classList.remove("active");

    slideItems[oldIndex]
        .classList.add("previous");


    currentIndex =
        newIndex;


    updateDots();


    /*
       Animation শেষ হলে
       পুরোনো slide reset হবে
    */

    setTimeout(()=>{

        slideItems.forEach(
            (slide,index)=>{

                if(index !== currentIndex){

                    slide.classList.remove(
                        "active",
                        "previous"
                    );

                }

            }
        );

    },700);

}


/* =================================
   NEXT
================================= */

function nextSlide(){

    const nextIndex =
        (currentIndex + 1) % totalSlides;

    goToSlide(nextIndex);

}


/* =================================
   PREVIOUS
================================= */

function previousSlide(){

    const previousIndex =
        (currentIndex - 1 + totalSlides)
        % totalSlides;

    goToSlide(previousIndex);

}


/* =================================
   BUTTON EVENTS
================================= */

nextBtn.addEventListener(
    "click",
    ()=>{

        nextSlide();

        restartAutoSlide();

    }
);


prevBtn.addEventListener(
    "click",
    ()=>{

        previousSlide();

        restartAutoSlide();

    }
);


/* =================================
   AUTO SLIDE
================================= */

function startAutoSlide(){

    stopAutoSlide();

    autoSlide =
        setInterval(
            nextSlide,
            AUTO_SLIDE_TIME
        );

}


function stopAutoSlide(){

    if(autoSlide){

        clearInterval(autoSlide);

        autoSlide = null;

    }

}


function restartAutoSlide(){

    stopAutoSlide();

    startAutoSlide();

}


/* =================================
   MOUSE HOVER PAUSE
================================= */

slider.addEventListener(
    "mouseenter",
    stopAutoSlide
);


slider.addEventListener(
    "mouseleave",
    startAutoSlide
);


/* =================================
   MOBILE SWIPE
================================= */

let touchStartX = 0;

let touchEndX = 0;


slider.addEventListener(
    "touchstart",
    function(event){

        touchStartX =
            event.changedTouches[0].screenX;

        stopAutoSlide();

    },
    {passive:true}
);


slider.addEventListener(
    "touchend",
    function(event){

        touchEndX =
            event.changedTouches[0].screenX;

        handleSwipe();

        startAutoSlide();

    },
    {passive:true}
);


/* =================================
   HANDLE SWIPE
================================= */

function handleSwipe(){

    const distance =
        touchEndX - touchStartX;


    /*
       Swipe LEFT:
       Next slide
    */

    if(distance < -50){

        nextSlide();

        return;

    }


    /*
       Swipe RIGHT:
       Previous slide
       কিন্তু animation RIGHT → LEFT
    */

    if(distance > 50){

        previousSlide();

    }

}


/* =================================
   INITIALIZE
================================= */

updateDots();

startAutoSlide();