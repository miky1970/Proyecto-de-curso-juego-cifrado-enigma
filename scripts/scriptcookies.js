document.addEventListener('DOMContentLoaded', function () {
    const banner = document.getElementById('cookie-banner');
    const essentialCookie = document.getElementById('essential');
    const functionalCookie = document.getElementById('functional');
    const advertisingCookie = document.getElementById('advertising');
    const thirdPartyCookie = document.getElementById('third-party');
    const acceptAllButton = document.getElementById('accept-all');
    const savePreferencesButton = document.getElementById('save-preferences');

    // Idioma y Modo del OS
    const language = navigator.language || 'es'; // Idioma predeterminado del navegador
    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const mode = prefersDarkMode ? 'dark' : 'light'; // Detecta si el usuario prefiere modo oscuro/claro

    // Mostrar el banner si las cookies no han sido aceptadas
    if (!getCookie('cookieConsent')) {
        banner.classList.add('banner-visible');
    } else {
        loadGoogleAnalytics();  // Cargar cookies de terceros si ya se han aceptado
    }

    // Aceptar todas las cookies
    acceptAllButton.addEventListener('click', function () {
        setCookie('cookieConsent', 'all', 365);
        setCookie('essentialConsent', 'true', 365); // Acepta las esenciales
        setCookie('functionalConsent', 'true', 365); // Acepta las funcionales
        setCookie('language', language, 365); // Se guarda si se aceptan las funcionales
        setCookie('mode', mode, 365); // Se guarda si se aceptan las funcionales
        setCookie('lastSession', new Date().toISOString(), 365); // Se guarda si se aceptan las funcionales
        banner.classList.remove('banner-visible');
        loadGoogleAnalytics();
    });

    // Guardar las preferencias de cookies
    savePreferencesButton.addEventListener('click', function () {
        const preferences = {
            functional: functionalCookie.checked,
            advertising: advertisingCookie.checked,
            thirdParty: thirdPartyCookie.checked
        };
        setCookie('cookieConsent', JSON.stringify(preferences), 365);

        // Verifica si el usuario ha aceptado las cookies esenciales
        if (essentialCookie.checked) {
            setCookie('essentialConsent', 'true', 365); // Acepta las esenciales
        } else {
            setCookie('essentialConsent', 'false', 365); // No aceptó las esenciales
        }

        // Guardar las cookies de lenguaje, modo y última sesión solo si se aceptan las cookies funcionales
        if (functionalCookie.checked) {
            setCookie('functionalConsent', 'true', 365); // Acepta las funcionales
            setCookie('language', language, 365); // Solo se guarda si se aceptan las funcionales
            setCookie('mode', mode, 365); // Solo se guarda si se aceptan las funcionales
            setCookie('lastSession', new Date().toISOString(), 365); // Solo se guarda si se aceptan las funcionales
        } else {
            setCookie('functionalConsent', 'false', 365); // No aceptó las funcionales
        }

        banner.classList.remove('banner-visible');
        if (preferences.thirdParty) {
            loadGoogleAnalytics();
        }
    });

    // Función para obtener una cookie
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }

    // Función para establecer una cookie
    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = `expires=${date.toUTCString()}`;
        document.cookie = `${name}=${value}; ${expires}; path=/; Secure; SameSite=Lax`;
    }

    // Cargar Google Analytics solo si se aceptan cookies de terceros
    function loadGoogleAnalytics() {
        if (getCookieConsent('thirdParty')) {
            // Código de Google Analytics
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

            ga('create', 'UA-XXXXX-Y', 'auto');
            ga('send', 'pageview');
        }
    }

    // Función para obtener preferencias de cookies
    function getCookieConsent(type) {
        const consent = getCookie('cookieConsent');
        if (consent) {
            const parsedConsent = JSON.parse(consent);
            return parsedConsent[type];
        }
        return false;
    }
});
