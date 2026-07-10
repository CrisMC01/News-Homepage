(function(){
    'use strict';

    /*Referencias al DOM*/
    const menuToggle  = document.querySelector('.menu-toggle');
    const menuOverlay = document.getElementById('mobile-menu');
    const menuPanel   = document.querySelector('.menu-panel');
    const menuClose   = document.querySelector('.menu-close');
    const menuBackdrop = document.querySelector('.menu-backdrop');

    const FOCUSABLE = [
        'a[href]',
        'button:not([disabled])',
        'input:not([disabled])',
        '[tabindex]:not([tabindex="-1"])',
    ].join(', ');

    function getFocusableElements() {
        return [...menuPanel.querySelectorAll(FOCUSABLE)];
    }


    /* -- Abrir menú -------------------------------------------- */

    function openMenu() {
        menuOverlay.setAttribute('aria-hidden', 'false');
        menuToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';

        /*Mover foco al primer elemento del panel*/
        const focusable = getFocusableElements();
        if (focusable.length) focusable[0].focus();
    }


    /* -- Cerrar menú ------------------------------------------- */


    function closeMenu() {
        if (menuToggle) menuToggle.focus();
        menuOverlay.setAttribute('aria-hidden', 'true');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';  
    }


/* -- Trap de foco dentro del panel ------------------------- */
  function trapFocus(event) {
    if (menuOverlay.getAttribute('aria-hidden') === 'true') return;

    const focusable = getFocusableElements();
    if (!focusable.length) return;

    const first = focusable[0];
    const last  = focusable[focusable.length - 1];

    if (event.key === 'Tab') {
      if (event.shiftKey) {
        /* Shift+Tab desde el primer elemento → salta al último */
        if (document.activeElement === first) {
          event.preventDefault();
          last.focus();
        }
      } else {
        /* Tab desde el último elemento → salta al primero */
        if (document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }
  }

    /* -- Event listeners --------------------------------------- */
  menuToggle.addEventListener('click', openMenu);
  menuClose.addEventListener('click', closeMenu);

  /* Cerrar al hacer clic en el backdrop */
  menuBackdrop.addEventListener('click', closeMenu);

  /* Cerrar con Escape */
  document.addEventListener('keydown', function (event) {
    if (
      event.key === 'Escape' &&
      menuOverlay.getAttribute('aria-hidden') === 'false'
    ) {
      closeMenu();
    }
  });

  /* Trap de foco */
  menuPanel.addEventListener('keydown', trapFocus);
})(); 
