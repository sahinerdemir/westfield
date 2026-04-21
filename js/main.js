document.addEventListener('DOMContentLoaded', () => {
  // Preloader
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => preloader.classList.add('hidden'), 1600);
  });
  setTimeout(() => preloader.classList.add('hidden'), 3000);

  // Custom cursor
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  let mouseX = 0, mouseY = 0, posX = 0, posY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  function animateCursor() {
    posX += (mouseX - posX) * 0.12;
    posY += (mouseY - posY) * 0.12;
    follower.style.left = posX + 'px';
    follower.style.top = posY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  const cursorEl = document.getElementById('cursor');
  const followerEl = document.getElementById('cursor-follower');

  document.querySelectorAll('a, button, .service-card, .pillar, .industry-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      follower.style.width = '56px';
      follower.style.height = '56px';
    });
    el.addEventListener('mouseleave', () => {
      follower.style.width = '36px';
      follower.style.height = '36px';
    });
  });

  // Navbar scroll effect
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });

  // Mobile menu
  const toggle = document.getElementById('nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  });

  mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // Button hover glow effect
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      btn.style.setProperty('--x', ((e.clientX - rect.left) / rect.width * 100) + '%');
      btn.style.setProperty('--y', ((e.clientY - rect.top) / rect.height * 100) + '%');
    });
  });

  // Testimonials Swiper
  const testimonialsSwiper = new Swiper('.testimonials-swiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    grabCursor: true,
    navigation: {
      prevEl: '#test-prev',
      nextEl: '#test-next',
    },
    breakpoints: {
      640: { slidesPerView: 1.5, spaceBetween: 20 },
      900: { slidesPerView: 2.5, spaceBetween: 24 },
      1200: { slidesPerView: 3, spaceBetween: 28 },
    },
  });

  // GSAP Animations
  gsap.registerPlugin(ScrollTrigger);

  // Scroll-triggered fade-up animations
  document.querySelectorAll('[data-animate]').forEach(el => {
    const delay = parseFloat(el.dataset.delay) || 0;
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        setTimeout(() => el.classList.add('visible'), delay * 1000);
      }
    });
  });

  // Counter animation
  document.querySelectorAll('.stat-number[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to({ val: 0 }, {
          val: target,
          duration: 2,
          ease: 'power2.out',
          onUpdate: function() {
            el.textContent = Math.round(this.targets()[0].val);
          }
        });
      }
    });
  });

  // Parallax effect
  document.querySelectorAll('[data-parallax]').forEach(el => {
    const speed = parseFloat(el.dataset.parallax);
    gsap.to(el, {
      yPercent: speed * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: el.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  });

  // Hero parallax on scroll
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    gsap.to(heroContent, {
      yPercent: 30,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  }

  // Service cards stagger
  gsap.utils.toArray('.service-card').forEach((card, i) => {
    gsap.from(card, {
      x: 60,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        once: true
      },
      delay: i * 0.1
    });
  });

  // Horizontal reveal for section titles
  gsap.utils.toArray('.section-title').forEach(title => {
    gsap.from(title, {
      clipPath: 'inset(0 100% 0 0)',
      duration: 1,
      ease: 'power3.inOut',
      scrollTrigger: {
        trigger: title,
        start: 'top 80%',
        once: true
      }
    });
  });

  // Contact form
  const form = document.getElementById('contact-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const firstName = data.get('firstName');
    const lastName = data.get('lastName');
    const email = data.get('email');
    const company = data.get('company');
    const inquiryType = data.get('inquiryType');
    const message = data.get('message');

    const subject = encodeURIComponent(`New Inquiry from ${firstName} ${lastName}`);
    const body = encodeURIComponent(
      `Name: ${firstName} ${lastName}\nEmail: ${email}\nCompany: ${company || 'N/A'}\nType: ${inquiryType}\n\nMessage:\n${message}`
    );

    window.location.href = `mailto:Hello@WestfieldConsultingPartners.com?subject=${subject}&body=${body}`;

    form.innerHTML = `
      <div class="form-success">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="12" cy="12" r="10"/>
          <path d="M8 12l3 3 5-5"/>
        </svg>
        <h3>Thank you!</h3>
        <p>Your email client should open shortly. If it doesn't, please email us directly at Hello@WestfieldConsultingPartners.com</p>
      </div>
    `;
    form.classList.add('success');
  });
});
