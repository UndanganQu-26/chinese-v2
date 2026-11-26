document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('js');

  /* ========== LOADER — PEMBUKAAN ========== */
  const loader = document.getElementById('loader');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let loaderHidden = false;

  document.body.classList.add('body-locked');

  function blockLoaderScroll(e) {
    if (!loaderHidden) e.preventDefault();
  }
  window.addEventListener('wheel', blockLoaderScroll, { passive: false });
  window.addEventListener('touchmove', blockLoaderScroll, { passive: false });
  window.addEventListener('scroll', () => {
    if (!loaderHidden && window.scrollY !== 0) window.scrollTo(0, 0);
  });

  function hideLoader() {
    if (loaderHidden) return;
    loaderHidden = true;
    if (loader) loader.classList.add('hidden');
    document.body.classList.add('loader-done');
    document.body.classList.remove('body-locked');
    document.documentElement.classList.remove('loader-lock');
    window.clearTimeout(loaderTimer);
  }

  const loaderTimer = window.setTimeout(hideLoader, reduceMotion ? 150 : 15400);

  if (loader) {
    loader.addEventListener('click', hideLoader);
    loader.addEventListener('touchend', hideLoader, { passive: true });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') hideLoader();
    });
  }

  /* ========== LOADER PARALLAX POINTER (halus; hanya pointer presisi) ========== */
  (function () {
    if (!loader || reduceMotion) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const parLayers = loader.querySelectorAll('.ld7-pl');
    if (!parLayers.length) return;
    let parRaf = 0, parX = 0, parY = 0;
    loader.addEventListener('pointermove', (e) => {
      parX = e.clientX / window.innerWidth - 0.5;
      parY = e.clientY / window.innerHeight - 0.5;
      if (!parRaf) {
        parRaf = window.requestAnimationFrame(() => {
          parRaf = 0;
          parLayers.forEach((el) => {
            const d = parseFloat(el.getAttribute('data-depth') || '10');
            el.style.transform = 'translate3d(' + (-parX * d).toFixed(1) + 'px, '
              + (-parY * d * 0.55).toFixed(1) + 'px, 0)';
          });
        });
      }
    });
  })();

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
      const size = 7 + Math.random() * 6;
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

  /* ========== PARALLAX LIVE — SCROLL + MOUSE ========== */
  const bgLayers = document.querySelectorAll('.cn-layer');
  let sy = window.scrollY;
  let scy = window.scrollY;   // nilai scroll yang sudah dihaluskan
  let mx = 0, my = 0;   // target mouse (-0.5 .. 0.5)
  let cx = 0, cy = 0;   // current (lerp)

  window.addEventListener('scroll', () => {
    sy = window.scrollY;
  }, { passive: true });

  window.addEventListener('mousemove', (e) => {
    mx = (e.clientX / window.innerWidth) - 0.5;
    my = (e.clientY / window.innerHeight) - 0.5;
  }, { passive: true });

  (function parallaxLoop() {
    cx += (mx - cx) * 0.055;
    cy += (my - cy) * 0.055;
    scy += (sy - scy) * 0.4;   // halus tapi tetap responsif (tidak patah / tidak telat)
    bgLayers.forEach(layer => {
      const depth = parseFloat(layer.dataset.depth) || 0.2;
      const tx = (-cx * 34 * depth).toFixed(2);
      const ty = ((-scy * depth) + (-cy * 22 * depth)).toFixed(2);
      layer.style.transform = 'translate3d(' + tx + 'px, ' + ty + 'px, 0)';
    });
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
  const galleryItems = Array.from(document.querySelectorAll('.gallery-panel'));
  let currentIndex = 0;

  // Sumber gambar/caption diambil langsung dari panel agar modal selalu sinkron.
  const galleryData = galleryItems.map(item => {
    const media = item.querySelector('.gallery-panel__media');
    return {
      background: media ? (media.style.background || getComputedStyle(media).background) : '',
      caption: item.dataset.caption || ''
    };
  });

  function showSlide(index) {
    if (!galleryItems.length) return;
    currentIndex = (index + galleryItems.length) % galleryItems.length;
    const data = galleryData[currentIndex];
    modalImg.style.background = data.background;
    const content = modal.querySelector('.modal-content');
    if (content) content.dataset.caption = data.caption;
  }

  function openModal(index) {
    showSlide(index);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function prevImage() {
    showSlide(currentIndex - 1);
  }

  function nextImage() {
    showSlide(currentIndex + 1);
  }

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

  /* ========== GALLERY — HORIZONTAL PHOTO ACCORDION ========== */
  (function galleryAccordion() {
    const accordion = document.getElementById('galleryAccordion');
    if (!accordion) return;
    const track = accordion.querySelector('.gallery-track');
    const panels = Array.from(accordion.querySelectorAll('.gallery-panel'));
    if (!track || !panels.length) return;

    const hoverQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const mobileQuery = window.matchMedia('(max-width: 768px), (hover: none) and (pointer: coarse)');
    const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    let activeIndex = panels.findIndex(panel => panel.classList.contains('is-active'));
    if (activeIndex < 0) activeIndex = 0;
    let hoverTimer = 0;
    let pendingHover = -1;
    let keyboardMode = false;
    let lastPointerType = 'mouse';

    function revealActive(instant) {
      const styles = getComputedStyle(accordion);
      const rail = parseFloat(styles.getPropertyValue('--panel-w')) ||
                   parseFloat(styles.getPropertyValue('--rail-w')) || 62;
      const gap = parseFloat(styles.getPropertyValue('--acc-gap')) || 6;
      const left = Math.max(0, activeIndex * (rail + gap) - 16);
      if (instant || reducedQuery.matches) track.scrollLeft = left;
      else track.scrollTo({ left, behavior: 'smooth' });
    }

    function setActive(index, options = {}) {
      index = (index + panels.length) % panels.length;
      activeIndex = index;
      panels.forEach((panel, i) => {
        const active = i === index;
        panel.classList.toggle('is-active', active);
        panel.setAttribute('aria-pressed', String(active));
        panel.tabIndex = active ? 0 : -1;
      });
      if (options.focus) panels[index].focus({ preventScroll: true });
      if (options.reveal) revealActive(options.instant);
    }

    function scheduleHover(index) {
      if (index === activeIndex) return;
      if (pendingHover === index && hoverTimer) return;
      clearTimeout(hoverTimer);
      pendingHover = index;
      hoverTimer = window.setTimeout(() => {
        hoverTimer = 0;
        if (pendingHover === index && index !== activeIndex) setActive(index);
      }, 70);
    }

    function cancelHover(index) {
      if (pendingHover !== index) return;
      clearTimeout(hoverTimer);
      hoverTimer = 0;
      pendingHover = -1;
    }

    panels.forEach((panel, index) => {
      panel.addEventListener('pointermove', (event) => {
        if (!hoverQuery.matches || event.pointerType === 'touch') return;
        scheduleHover(index);
      });
      panel.addEventListener('pointerleave', () => cancelHover(index));

      panel.addEventListener('focus', () => {
        if (keyboardMode) setActive(index);
      });

      panel.addEventListener('keydown', (event) => {
        if (modal.classList.contains('active')) return;
        const key = event.key;
        if (key !== 'ArrowRight' && key !== 'ArrowLeft' && key !== 'Home' && key !== 'End') return;
        event.preventDefault();
        keyboardMode = true;
        let next = index;
        if (key === 'ArrowRight') next = (index + 1) % panels.length;
        else if (key === 'ArrowLeft') next = (index - 1 + panels.length) % panels.length;
        else if (key === 'Home') next = 0;
        else next = panels.length - 1;
        setActive(next, { focus: true, reveal: true });
      });

      panel.addEventListener('click', (event) => {
        const wasActive = index === activeIndex;
        const touchTap = lastPointerType === 'touch' || lastPointerType === 'pen';
        setActive(index, { reveal: true });
        if (touchTap && event.detail > 0 && !wasActive) return;
        openModal(index);
      });
    });

    accordion.addEventListener('pointerdown', (event) => {
      lastPointerType = event.pointerType || 'mouse';
      keyboardMode = false;
    }, true);

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Tab') keyboardMode = true;
    });

    setActive(activeIndex, { reveal: true, instant: true });

    let resizeTimer = 0;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => revealActive(true), 160);
    });

    const onLayoutChange = () => revealActive(true);
    if (mobileQuery.addEventListener) mobileQuery.addEventListener('change', onLayoutChange);
    else if (mobileQuery.addListener) mobileQuery.addListener(onLayoutChange);

    const galleryPrev = document.getElementById('galleryPrev');
    const galleryNext = document.getElementById('galleryNext');
    if (galleryPrev && galleryNext) {
      galleryNext.addEventListener('click', () => setActive((activeIndex + 1) % panels.length, { focus: true, reveal: true }));
      galleryPrev.addEventListener('click', () => setActive((activeIndex - 1 + panels.length) % panels.length, { focus: true, reveal: true }));
    }
  })();

  /* ========== LOVE STORY — CINEMATIC HORIZONTAL JOURNEY ========== */
  (function journeyPanorama() {
    const journey = document.getElementById('journey');
    if (!journey) return;
    const viewport = document.getElementById('journeyViewport');
    const track = document.getElementById('journeyTrack');
    const stops = Array.from(journey.querySelectorAll('.journey-stop'));
    const prevBtn = document.getElementById('journeyPrev');
    const nextBtn = document.getElementById('journeyNext');
    const bar = document.getElementById('journeyProgressBar');
    const ornament = journey.querySelector('.journey-ornament');
    if (!viewport || !track || !stops.length) return;

    const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const scrollMode = () => (reducedQuery.matches ? 'instant' : 'smooth');

    viewport.querySelectorAll('img').forEach(img => { img.draggable = false; });

    function maxScroll() {
      return Math.max(0, viewport.scrollWidth - viewport.clientWidth);
    }

    function stepSize() {
      return stops[0].getBoundingClientRect().width || viewport.clientWidth * 0.8;
    }

    function scrollStep(dir) {
      viewport.scrollBy({ left: dir * stepSize(), behavior: scrollMode() });
    }

    let raf = 0;
    function update() {
      raf = 0;
      const max = maxScroll();
      const left = viewport.scrollLeft;
      if (bar) bar.style.width = (max > 0 ? (left / max) * 100 : 0) + '%';
      if (prevBtn) prevBtn.setAttribute('aria-disabled', String(left <= 2));
      if (nextBtn) nextBtn.setAttribute('aria-disabled', String(left >= max - 2));

      if (reducedQuery.matches) return;
      const vp = viewport.getBoundingClientRect();
      const center = vp.left + vp.width / 2;
      stops.forEach(stop => {
        const r = stop.getBoundingClientRect();
        const rel = Math.max(-1.5, Math.min(1.5, (r.left + r.width / 2 - center) / vp.width));
        const photo = stop.querySelector('.journey-photo');
        const info = stop.querySelector('.journey-info');
        if (photo) photo.style.transform = 'translateX(' + (rel * -16).toFixed(1) + 'px)';
        if (info) info.style.transform = 'translateX(' + (rel * 8).toFixed(1) + 'px)';
      });
      if (ornament) ornament.style.transform = 'translateX(' + (-left * 0.12).toFixed(1) + 'px)';
    }

    function requestUpdate() {
      if (!raf) raf = requestAnimationFrame(update);
    }

    viewport.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      }, { root: viewport, threshold: 0.25 });
      stops.forEach(stop => io.observe(stop));
    } else {
      stops.forEach(stop => stop.classList.add('is-visible'));
    }

    if (prevBtn) prevBtn.addEventListener('click', () => scrollStep(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => scrollStep(1));

    viewport.addEventListener('keydown', event => {
      const key = event.key;
      if (key === 'ArrowRight') { event.preventDefault(); scrollStep(1); }
      else if (key === 'ArrowLeft') { event.preventDefault(); scrollStep(-1); }
      else if (key === 'Home') { event.preventDefault(); viewport.scrollTo({ left: 0, behavior: scrollMode() }); }
      else if (key === 'End') { event.preventDefault(); viewport.scrollTo({ left: maxScroll(), behavior: scrollMode() }); }
    });

    viewport.addEventListener('wheel', event => {
      const delta = Math.abs(event.deltaY) >= Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
      const max = maxScroll();
      const atStart = viewport.scrollLeft <= 0;
      const atEnd = viewport.scrollLeft >= max - 1;
      if ((delta < 0 && atStart) || (delta > 0 && atEnd)) return;
      event.preventDefault();
      viewport.scrollBy({ left: delta, behavior: 'instant' });
    }, { passive: false });

    let dragging = false;
    let startX = 0;
    let startLeft = 0;
    viewport.addEventListener('pointerdown', event => {
      if (event.pointerType === 'touch') return;
      dragging = true;
      startX = event.clientX;
      startLeft = viewport.scrollLeft;
      viewport.classList.add('is-dragging');
      if (viewport.setPointerCapture) viewport.setPointerCapture(event.pointerId);
    });
    viewport.addEventListener('pointermove', event => {
      if (!dragging) return;
      viewport.scrollLeft = startLeft - (event.clientX - startX);
    });
    function endDrag() {
      if (!dragging) return;
      dragging = false;
      viewport.classList.remove('is-dragging');
    }
    viewport.addEventListener('pointerup', endDrag);
    viewport.addEventListener('pointercancel', endDrag);
    viewport.addEventListener('pointerleave', endDrag);

    update();
  })();


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

  /* ========== MUSIC — mulai sejak loader, fade in / fade out ========== */
  const musicBtn = document.getElementById('musicToggle');
  const MUSIC_VOL = 0.3;
  const audio = document.getElementById('bgMusic');
  audio.loop = true;
  if (audio.paused) {
    audio.volume = 0;
    audio.muted = true;
  }
  let isMusicPlaying = false;
  let fadeTimer = 0;

  function fadeVolume(to, duration, done) {
    window.clearInterval(fadeTimer);
    const from = audio.volume;
    const t0 = Date.now();
    fadeTimer = window.setInterval(() => {
      const p = Math.min(1, (Date.now() - t0) / duration);
      audio.volume = Math.max(0, Math.min(1, from + (to - from) * p));
      if (p >= 1) {
        window.clearInterval(fadeTimer);
        if (done) done();
      }
    }, 40);
  }

  function audible() {
    if (!audio.muted) return;
    audio.muted = false;
    fadeVolume(MUSIC_VOL, 2500);
    musicBtn.classList.remove('paused');
  }

  function startMusic() {
    if (isMusicPlaying && !audio.paused) return;
    const alreadyPlaying = !audio.paused;
    isMusicPlaying = true;
    if (!alreadyPlaying) {
      audio.volume = 0;
      audio.muted = true;
    }
    let played = null;
    if (alreadyPlaying) {
      played = Promise.resolve();
    } else {
      try { played = audio.play(); } catch (e) { played = null; }
    }
    if (played && typeof played.then === 'function') {
      played.then(() => { if (isMusicPlaying) audible(); })
            .catch(() => {
              isMusicPlaying = false;
              musicBtn.classList.add('paused');
            });
    } else if (!audio.paused) {
      audible();
    }
  }

  function stopMusic() {
    if (!isMusicPlaying) return;
    isMusicPlaying = false;
    musicBtn.classList.add('paused');
    fadeVolume(0, 800, () => {
      if (!isMusicPlaying) audio.pause();
    });
  }

  function toggleMusic() {
    if (isMusicPlaying) stopMusic();
    else startMusic();
  }

  musicBtn.addEventListener('click', toggleMusic);
  audio.addEventListener('play', audible);

  // langsung coba saat halaman siap; browser yang melarang autoplay akan
  // tetap mencoba lagi pada interaksi pertama sampai benar-benar berbunyi
  startMusic();
  ['canplay', 'loadeddata', 'pageshow'].forEach(ev => {
    window.addEventListener(ev, () => {
      if (!isMusicPlaying || audio.paused) startMusic();
    });
  });
  const GESTURES = ['pointerdown', 'touchstart', 'keydown'];
  const onGesture = (e) => {
    if (e && e.target && e.target.closest && e.target.closest('#musicToggle')) return;
    if (!isMusicPlaying || audio.paused) startMusic();
    if (isMusicPlaying && !audio.paused) {
      GESTURES.forEach(ev => window.removeEventListener(ev, onGesture));
    }
  };
  GESTURES.forEach(ev => window.addEventListener(ev, onGesture, { passive: true }));
  window.addEventListener('pagehide', () => { if (isMusicPlaying) stopMusic(); });

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
  function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.top = '-1000px';
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    document.body.removeChild(ta);
    return ok;
  }
  copyRek.addEventListener('click', async () => {
    const el = document.querySelector('.rek');
    const rek = (el && el.textContent.trim()) || '1234567890';
    let ok = false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(rek);
        ok = true;
      } else {
        ok = fallbackCopy(rek);
      }
    } catch (e) {
      ok = fallbackCopy(rek);
    }
    copyRek.textContent = ok ? 'Tersalin!' : 'Gagal menyalin';
    setTimeout(() => { copyRek.textContent = 'Salin No. Rekening'; }, 2000);
  });
}
