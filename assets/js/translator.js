/**
 * Hoffman Legal - Translator
 * Lightweight English/Spanish toggle using Google Translate Element
 */

// Initialize Google Translate (called by Google's loader)
function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'en,es',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false
    }, 'google_translate_element');
}

(function () {
    'use strict';

    // Read saved language preference
    const savedLang = localStorage.getItem('hl_lang') || 'en';

    // Set the Google Translate cookie programmatically
    function setLanguage(lang) {
        const expires = new Date();
        expires.setTime(expires.getTime() + 365 * 24 * 60 * 60 * 1000);
        const cookieValue = lang === 'es' ? '/en/es' : '/en/en';
        document.cookie = 'googtrans=' + cookieValue + ';expires=' + expires.toUTCString() + ';path=/';
        document.cookie = 'googtrans=' + cookieValue + ';expires=' + expires.toUTCString() + ';path=/;domain=' + location.hostname;
        localStorage.setItem('hl_lang', lang);

        // Update button states
        document.querySelectorAll('.translator-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        // Reload to apply translation
        window.location.reload();
    }

    // Wait for DOM
    document.addEventListener('DOMContentLoaded', function () {
        // Mark active button on page load based on saved preference
        document.querySelectorAll('.translator-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === savedLang);
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                const lang = this.dataset.lang;
                if (lang !== savedLang) {
                    setLanguage(lang);
                }
            });
        });

        // Inject Google Translate script
        const script = document.createElement('script');
        script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.async = true;
        document.body.appendChild(script);
    });
})();
