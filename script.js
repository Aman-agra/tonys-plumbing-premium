/**
 * Original Fluid Glass Logic - Deep Fixes & Apple-Tier Polish
 */

document.addEventListener('DOMContentLoaded', () => {
  try { initLoader(); } catch(e) {}
  try { initReveal(); } catch(e) {}
  try { initMenu(); } catch(e) {}
  try { initCursor(); } catch(e) {}
  try { initPageTransitions(); } catch(e) {}
  try { initForms(); } catch(e) {}
  try { initEmergencyButton(); } catch(e) {}
});



function initLoader() {
  const loader = document.querySelector('.loader-overlay');
  if (!loader) {
    document.body.classList.add('is-loaded');
    return;
  }
  setTimeout(() => {
    loader.classList.add('is-hidden');
    document.body.classList.remove('is-loading'); 
    setTimeout(() => {
      document.body.classList.add('is-loaded'); // Triggers cinematic blast-door sweep
      setTimeout(() => loader.remove(), 800);
    }, 400); 
  }, 1000); 
}

function initReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      } else {
        entry.target.classList.remove('is-visible');
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px 50px 0px" });
  
  reveals.forEach(el => observer.observe(el));
}

function initMenu() {
  const burger = document.querySelector('.burger');
  const body = document.body;
  if (burger) {
    burger.addEventListener('click', () => {
      body.classList.toggle('is-menu');
    });
  }
}

function initCursor() {
  const cursor = document.querySelector('.cursor');
  if (!cursor) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;
  let cursorScale = 1; // Core fix: animate scale, not width/height to keep perfectly centered

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.opacity = '1';
  });

  function render() {
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) scale(${cursorScale})`;
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

  const targetElements = document.querySelectorAll('a, button, input, textarea, .hover-card');
  targetElements.forEach(el => {
    el.addEventListener('mouseenter', () => { 
      cursorScale = 4.5;
      cursor.style.background = 'rgba(212, 206, 198, 0.2)';
      cursor.style.border = '0.5px solid var(--color-taupe)';
    });
    el.addEventListener('mouseleave', () => { 
      cursorScale = 1;
      cursor.style.background = 'var(--color-taupe)';
      cursor.style.border = 'none';
    });
  });

  // CORE FIX: Hide cursor gracefully when interacting with real-time iframes (maps) so it doesn't freeze!
  const frames = document.querySelectorAll('.iframe-wrapper');
  frames.forEach(frame => {
    frame.addEventListener('mouseenter', () => { cursor.style.opacity = '0'; });
    frame.addEventListener('mouseleave', () => { cursor.style.opacity = '1'; });
  });
}

function initParallax() {
  const parallaxElements = document.querySelectorAll('.parallax-media');
  window.addEventListener('scroll', () => {
    if (window.innerWidth < 600) return;
    const scrollY = window.scrollY;
    parallaxElements.forEach(el => {
      const yPos = -(scrollY * 0.15);
      el.style.transform = `translate3d(0, ${yPos}px, 0)`;
    });
  });
}

function initPageTransitions() {
  const wrappers = document.querySelectorAll('.page-transition');
  wrappers.forEach(w => w.classList.add('is-visible'));
}

function initForms() {
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      if (!btn) return;
      const originalText = btn.innerText;
      
      // Simulate API CRM Hook logic with cinematic feedback
      btn.innerHTML = 'Routing to ServiceTitan API...';
      btn.style.opacity = '0.7';
      btn.style.pointerEvents = 'none';
      
      setTimeout(() => {
         btn.innerHTML = 'REQUEST DISPATCHED SECURELY';
         btn.style.background = '#2e7d32'; // Premium Success Green
         btn.style.color = '#fff';
         btn.style.borderColor = '#2e7d32';
         btn.style.opacity = '1';
         form.reset();
         
         setTimeout(() => {
             btn.innerHTML = originalText;
             btn.style.background = '';
             btn.style.color = '';
             btn.style.borderColor = '';
             btn.style.pointerEvents = 'all';
         }, 5000);
      }, 1800);
    });
  });
}

function initEmergencyButton() {
  // Global 24/7 Sticky Emergency Dealer bypassing menus directly
  const btn = document.createElement('a');
  btn.href = 'tel:3109058484';
  btn.className = 'emergency-btn';
  btn.innerHTML = `<span class="pulse-ring"></span><span class="btn-text">24/7 EMERGENCY</span>`;
  document.body.appendChild(btn);
  
  // Custom cursor hook for the native dynamic button
  const cursor = document.querySelector('.cursor');
  if(cursor) {
    btn.addEventListener('mouseenter', () => { 
      cursor.style.transform += ' scale(4.5)';
      cursor.style.background = 'rgba(212, 206, 198, 0.2)';
      cursor.style.border = '0.5px solid var(--color-taupe)';
    });
    btn.addEventListener('mouseleave', () => { 
      cursor.style.background = 'var(--color-taupe)';
      cursor.style.border = 'none';
    });
  }
}
