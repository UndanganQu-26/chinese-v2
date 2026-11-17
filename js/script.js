document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('js');

  /* ========== LOADER — PEMBUKAAN ========== */
  const loader = document.getElementById('loader');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let loaderHidden = false;

  function hideLoader() {
    if (loaderHidden) return;
    loaderHidden = true;
    if (loader) loader.classList.add('hidden');
    document.body.classList.add('loader-done');
    window.clearTimeout(loaderTimer);
  }

  const loaderTimer = window.setTimeout(hideLoader, reduceMotion ? 150 : 3450);

  if (loader) {
    loader.addEventListener('click', hideLoader);
    loader.addEventListener('touchend', hideLoader, { passive: true });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') hideLoader();
    });
  }

  /* ========== PERSONALIZE GUEST NAME ========== */
  (function personalizeGuest() {
    const heroName = document.querySelector('.hero-name');
    if (!heroName) return;
    const q = new URLSearchParams(window.location.search);
    let guest = q.get('name');
    if (guest) {
      guest = guest.replace(/\+/g, ' ');
      heroName.textContent = decodeURIComponent(guest);
      heroName.style.display = 'block';
    }
  })();

  /* ========== LENTERA TERTANGGUNG ========== */
  (function createLanterns() {
    const wrap = document.getElementById('cnLanterns');
    if (!wrap) return;
    const presets = [
      { left: '5%',  top: '10%', w: 52, sway: '8.5s',  delay: '0s'    },
      { left: '16%', top: '2%',  w: 40, sway: '10s',   delay: '-3s'   },
      { left: '30%', top: '16%', w: 34, sway: '9.5s',  delay: '-5s'   },
      { left: '60%', top: '4%',  w: 44, sway: '11s',   delay: '-2s'   },
      { left: '74%', top: '14%', w: 58, sway: '8s',    delay: '-6s'   },
      { left: '89%', top: '6%',  w: 46, sway: '10.5s', delay: '-1.5s' },
      { left: '94%', top: '34%', w: 32, sway: '9s',    delay: '-4s'   },
      { left: '8%',  top: '46%', w: 30, sway: '12s',   delay: '-7s'   }
    ];
    presets.forEach(p => {
      const lt = document.createElement('div');
      lt.className = 'cn-lantern';
      lt.style.left = p.left;
      lt.style.top = p.top;
      lt.style.setProperty('--w', p.w + 'px');
      lt.style.setProperty('--sway', p.sway);
      lt.style.setProperty('--delay', p.delay);
      lt.innerHTML =
        '<span class="lt-string"></span>' +
        '<span class="lt-top"></span>' +
        '<span class="lt-body"><span class="lt-glyph">囍</span></span>' +
        '<span class="lt-bottom"></span>' +
        '<span class="lt-tassel"></span>';
      wrap.appendChild(lt);
    });
  })();

  /* ========== PARTIKEL EMAS BERKILAU ========== */
  (function createSparkles() {
    const container = document.getElementById('cnSparkles');
    if (!container) return;
    const sizes = [5, 6, 7, 8, 10, 12];
    setInterval(() => {
      const spark = document.createElement('span');
      spark.className = 'spark';
      const size = sizes[Math.floor(Math.random() * sizes.length)];
      spark.style.setProperty('--s', size + 'px');
      spark.style.left = (Math.random() * 96 + 2) + '%';
      spark.style.setProperty('--dur', (7 + Math.random() * 6) + 's');
      container.appendChild(spark);
      setTimeout(() => spark.remove(), 14000);
    }, 420);
  })();

  /* ========== KELOPAK SAKURA BERJATUH ========== */
  (function createPetals() {
    const wrap = document.getElementById('cnPetals');
    if (!wrap || reduceMotion) return;
    const MAX_PETALS = 16;

    function spawnPetal() {
      if (wrap.childElementCount >= MAX_PETALS || document.hidden) return;
      const petal = document.createElement('span');
      petal.className = 'petal';
      const size = 8 + Math.random() * 7;
      petal.style.setProperty('--s', size.toFixed(1) + 'px');
      petal.style.left = (Math.random() * 100).toFixed(2) + 'vw';
      petal.style.setProperty('--dx', (Math.random() * 34 - 17).toFixed(1) + 'vw');
      petal.style.setProperty('--sway', (Math.random() * 60 + 45).toFixed(0) + 'px');
      petal.style.setProperty('--dur', (10 + Math.random() * 6).toFixed(1) + 's');
      petal.style.setProperty('--rot', (Math.random() * 360).toFixed(0) + 'deg');
      petal.style.setProperty('--o', (0.5 + Math.random() * 0.3).toFixed(2));
      wrap.appendChild(petal);
      window.setTimeout(() => petal.remove(), 16500);
    }

    window.setInterval(spawnPetal, 760);
    for (let i = 0; i < 9; i++) {
      window.setTimeout(spawnPetal, i * 280);
    }
  })();

  /* ========== NAVBAR ========== */
  const navbar = document.querySelector('.navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 150;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }

  /* ========== PARALLAX LIVE — SCROLL + MOUSE ========== */
  const bgLayers = document.querySelectorAll('.cn-layer');
  const heroContent = document.querySelector('.hero-content');
  const navbarEl = document.querySelector('.navbar');

  let sy = window.scrollY;
  let mx = 0, my = 0;   // target mouse (-0.5 .. 0.5)
  let cx = 0, cy = 0;   // current (lerp)

  window.addEventListener('scroll', () => {
    sy = window.scrollY;
    navbarEl.classList.toggle('scrolled', sy > 80);
    updateActiveLink();
  }, { passive: true });

  window.addEventListener('mousemove', (e) => {
    mx = (e.clientX / window.innerWidth) - 0.5;
    my = (e.clientY / window.innerHeight) - 0.5;
  }, { passive: true });

  (function parallaxLoop() {
    cx += (mx - cx) * 0.055;
    cy += (my - cy) * 0.055;
    bgLayers.forEach(layer => {
      const depth = parseFloat(layer.dataset.depth) || 0.2;
      const tx = (-cx * 34 * depth).toFixed(2);
      const ty = ((-sy * depth) + (-cy * 22 * depth)).toFixed(2);
      layer.style.transform = 'translate3d(' + tx + 'px, ' + ty + 'px, 0)';
    });
    if (heroContent && sy < window.innerHeight) {
      heroContent.style.transform = 'translateY(' + (sy * 0.28) + 'px)';
      heroContent.style.opacity = 1 - (sy / window.innerHeight) * 0.55;
    }
    requestAnimationFrame(parallaxLoop);
  })();

  /* ========== REVEAL ON SCROLL ========== */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    revealObserver.observe(el);
  });

  /* ========== COUNTDOWN ========== */
  function updateCountdown() {
    const weddingDate = new Date('January 1, 2027 08:00:00').getTime();
    const now = new Date().getTime();
    const diff = weddingDate - now;

    if (diff > 0) {
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      document.getElementById('days').textContent = String(days).padStart(2, '0');
      document.getElementById('hours').textContent = String(hours).padStart(2, '0');
      document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
      document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    } else {
      document.querySelector('.countdown-grid').innerHTML =
        '<p style="color:var(--gold);font-family:var(--font-cn);font-size:24px;">囍 Acara Sedang Berlangsung 囍</p>';
    }
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* ========== GALLERY MODAL ========== */
  const modal = document.getElementById('galleryModal');
  const modalImg = modal.querySelector('.modal-img');
  const modalClose = modal.querySelector('.modal-close');
  const modalPrev = modal.querySelector('.modal-prev');
  const modalNext = modal.querySelector('.modal-next');
  const galleryItems = document.querySelectorAll('.gallery-item');
  let currentIndex = 0;

  const gradients = [
    'linear-gradient(135deg, #A61E2B, #E6C36A)',
    'linear-gradient(135deg, #7E0F18, #D9A441)',
    'linear-gradient(135deg, #B01E28, #F4DFA0)',
    'linear-gradient(135deg, #8C1420, #C89B3C)',
    'linear-gradient(135deg, #D9A441, #7E0F18)',
    'linear-gradient(135deg, #E6C36A, #A61E2B)'
  ];

  function openModal(index) {
    currentIndex = index;
    modalImg.style.background = gradients[currentIndex];
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    modalImg.style.background = gradients[currentIndex];
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    modalImg.style.background = gradients[currentIndex];
  }

  galleryItems.forEach((item, i) => {
    item.addEventListener('click', () => openModal(i));
  });

  modalClose.addEventListener('click', closeModal);
  modalPrev.addEventListener('click', prevImage);
  modalNext.addEventListener('click', nextImage);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'ArrowRight') nextImage();
  });

  /* ========== RSVP FORM (WhatsApp) ========== */
  const rsvpForm = document.getElementById('rsvpForm');
  const rsvpSuccess = document.getElementById('rsvpSuccess');

  const WHATSAPP_NUMBER = '6281200000000';

  rsvpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      attendance: document.querySelector('input[name="attendance"]:checked').value,
      guests: document.getElementById('guests').value,
      message: document.getElementById('message').value
    };

    const attendanceText = formData.attendance === 'hadir' ? 'Hadir' : 'Tidak Hadir';
    const text =
      `Halo! 囍\n` +
      `RSVP Undangan Pernikahan\n` +
      `Nama: ${formData.name}\n` +
      `Kehadiran: ${attendanceText}\n` +
      `Jumlah Tamu: ${formData.guests}\n` +
      `No HP: ${formData.phone}\n` +
      `Doa/Ucapan: ${formData.message || '-'}`;

    window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(text), '_blank');

    rsvpForm.style.display = 'none';
    rsvpSuccess.classList.add('active');
    rsvpForm.reset();

    setTimeout(() => {
      rsvpForm.style.display = 'grid';
      rsvpSuccess.classList.remove('active');
    }, 4000);
  });

  /* ========== MUSIC TOGGLE ========== */
  const musicBtn = document.getElementById('musicToggle');
  const audio = new Audio('assets/music.mp3');
  audio.loop = true;
  audio.volume = 0.3;
  let isMusicPlaying = false;

  function toggleMusic() {
    if (isMusicPlaying) {
      audio.pause();
      musicBtn.classList.add('paused');
    } else {
      audio.currentTime = 0;
      audio.play().catch(() => {});
      musicBtn.classList.remove('paused');
    }
    isMusicPlaying = !isMusicPlaying;
  }

  musicBtn.addEventListener('click', toggleMusic);

  /* ========== DRESS CODE COPY ========== */
  document.querySelectorAll('.dress-color').forEach(el => {
    el.addEventListener('click', () => {
      const color = el.getAttribute('title');
      navigator.clipboard.writeText(color).catch(() => {});
    });
  });

  /* ========== RED PACKET (AMPLOP) ========== */
  const envelopeOverlay = document.getElementById('envelopeOverlay');
  const envelopeFront = document.getElementById('envelopeFront');
  const envelopeClose = document.getElementById('envelopeClose');
  const invitationCard = document.getElementById('invitationCard');
  const heroBtn = document.querySelector('.hero-btn');
  let isEnvelopeOpen = false;
  let autoCloseTimer = null;

  if (heroBtn) {
    heroBtn.addEventListener('click', (e) => {
      e.preventDefault();
      envelopeOverlay.classList.add('active');
      isEnvelopeOpen = true;
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        if (envelopeFront) envelopeFront.classList.add('open');
        autoCloseTimer = setTimeout(proceedToInvitation, 3000);
      }, 500);
    });
  }

  function proceedToInvitation() {
    closeEnvelope();
    setTimeout(() => {
      const target = document.querySelector('#rsvp');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 600);
  }

  function closeEnvelope() {
    if (autoCloseTimer) clearTimeout(autoCloseTimer);
    if (envelopeFront) envelopeFront.classList.remove('open');
    setTimeout(() => {
      envelopeOverlay.classList.remove('active');
      document.body.style.overflow = '';
      isEnvelopeOpen = false;
    }, 400);
  }

  if (envelopeClose) {
    envelopeClose.addEventListener('click', closeEnvelope);
  }

  if (invitationCard) {
    invitationCard.addEventListener('click', proceedToInvitation);
    invitationCard.style.cursor = 'pointer';
  }

  if (envelopeOverlay) {
    envelopeOverlay.addEventListener('click', (e) => {
      if (e.target === envelopeOverlay) closeEnvelope();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isEnvelopeOpen) closeEnvelope();
  });

});

/* ========== NAV CLOSE (mobile) ========== */
const navClose = document.getElementById('navClose');
if (navClose) {
  navClose.addEventListener('click', () => {
    document.getElementById('navToggle').classList.remove('active');
    document.getElementById('navMenu').classList.remove('active');
  });
}

/* ========== COPY REKENING ========== */
const copyRek = document.getElementById('copyRek');
if (copyRek) {
  copyRek.addEventListener('click', () => {
    const rek = (document.querySelector('.rek') && document.querySelector('.rek').textContent.trim()) || '1234567890';
    navigator.clipboard.writeText(rek).then(() => {
      copyRek.textContent = 'Tersalin!';
      setTimeout(() => { copyRek.textContent = 'Salin No. Rekening'; }, 2000);
    }).catch(() => {});
  });
}
