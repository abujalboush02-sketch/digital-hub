/* OmniNode marketing site — shared behaviour.
   Edit SITE below if domains or contact change. */
window.SITE = {
  appUrl: "https://omniapp.mohammad-abujalboush.com",
  // Flutter routes (hash strategy). Change to "/register" if the app uses path URLs.
  registerPath: "/#/register",
  loginPath: "/#/login",
  apiBase: "https://omniapi.mohammad-abujalboush.com",
  email: "moe.abujalboush@gmail.com"
};

(function () {
  "use strict";
  document.documentElement.classList.add("js");
  var AR = (window.I18N_AR || {});
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  /* ---------- language ---------- */
  function detect() {
    var q = new URLSearchParams(location.search).get("lang");
    if (q === "ar" || q === "en") return q;
    var saved = store.get("omni.lang");
    if (saved === "ar" || saved === "en") return saved;
    var langs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || "en"];
    for (var i = 0; i < langs.length; i++) {
      var l = (langs[i] || "").toLowerCase();
      if (l.indexOf("ar") === 0) return "ar";
      if (l.indexOf("en") === 0) return "en";
    }
    return "en";
  }

  var originals = new WeakMap();
  var origTitle = document.title;
  var metaDesc = document.querySelector('meta[name="description"]');
  var origDesc = metaDesc ? metaDesc.getAttribute("content") : "";

  function apply(lang) {
    var html = document.documentElement;
    html.lang = lang;
    html.dir = lang === "ar" ? "rtl" : "ltr";

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      if (!originals.has(el)) originals.set(el, el.innerHTML);
      var key = el.getAttribute("data-i18n");
      el.innerHTML = (lang === "ar" && AR[key] != null) ? AR[key] : originals.get(el);
    });
    // attributes: data-i18n-attr="aria-label:key;placeholder:key2"
    document.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      el.getAttribute("data-i18n-attr").split(";").forEach(function (pair) {
        var p = pair.split(":"); if (p.length !== 2) return;
        var attr = p[0].trim(), key = p[1].trim(), saveKey = "data-en-" + attr;
        if (!el.hasAttribute(saveKey)) el.setAttribute(saveKey, el.getAttribute(attr) || "");
        el.setAttribute(attr, (lang === "ar" && AR[key] != null) ? AR[key] : el.getAttribute(saveKey));
      });
    });
    document.title = (lang === "ar" && AR.__title) ? AR.__title : origTitle;
    if (metaDesc) metaDesc.setAttribute("content", (lang === "ar" && AR.__desc) ? AR.__desc : origDesc);

    document.querySelectorAll(".lang-btn").forEach(function (b) {
      b.textContent = lang === "ar" ? "English" : "العربية";
      b.setAttribute("aria-label", lang === "ar" ? "Switch to English" : "التبديل إلى العربية");
      b.setAttribute("lang", lang === "ar" ? "en" : "ar");
    });
    links();
    html.classList.remove("i18n-wait");
    document.dispatchEvent(new CustomEvent("langchange", { detail: { lang: lang } }));
  }

  function links() {
    var lang = document.documentElement.lang;
    var suffix = lang === "ar" ? "?lang=ar" : "";
    document.querySelectorAll("[data-app]").forEach(function (a) {
      var path = a.getAttribute("data-app") === "login" ? SITE.loginPath : SITE.registerPath;
      a.href = SITE.appUrl + path;
      a.rel = "noopener";
    });
    document.querySelectorAll("[data-mail]").forEach(function (a) {
      a.href = "mailto:" + SITE.email + (a.getAttribute("data-mail") ? "?subject=" + encodeURIComponent(a.getAttribute("data-mail")) : "");
      if (a.hasAttribute("data-mail-show")) a.textContent = SITE.email;
    });
    document.querySelectorAll("[data-api]").forEach(function (el) { el.textContent = SITE.apiBase; });
    // keep language when moving between site pages
    document.querySelectorAll("a[data-page]").forEach(function (a) {
      var base = a.getAttribute("data-page");
      var hash = base.indexOf("#") >= 0 ? base.slice(base.indexOf("#")) : "";
      var file = base.replace(hash, "");
      a.href = file + suffix + hash;
    });
  }

  window.OmniLang = {
    current: function () { return document.documentElement.lang; },
    set: function (l) { store.set("omni.lang", l); apply(l); }
  };

  document.addEventListener("DOMContentLoaded", function () {
    // code blocks: replace API base placeholder
    document.querySelectorAll("pre code").forEach(function (c) {
      if (c.textContent.indexOf("{{API}}") >= 0) c.textContent = c.textContent.split("{{API}}").join(SITE.apiBase);
    });

    apply(detect());

    document.querySelectorAll(".lang-btn").forEach(function (b) {
      b.addEventListener("click", function () {
        OmniLang.set(OmniLang.current() === "ar" ? "en" : "ar");
      });
    });

    /* nav: scrolled state + mobile menu */
    var nav = document.querySelector(".nav");
    if (nav) {
      var onScroll = function () { nav.classList.toggle("scrolled", window.scrollY > 8); };
      onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    }
    var menuBtn = document.querySelector(".menu-btn"), menu = document.querySelector(".mobile-menu");
    if (menuBtn && menu) {
      menuBtn.addEventListener("click", function () {
        var open = menu.classList.toggle("open");
        menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      });
      menu.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", function () { menu.classList.remove("open"); }); });
    }

    /* docs/legal sidebar toggle */
    var sideBtn = document.querySelector(".side-toggle"), side = document.querySelector(".side");
    if (sideBtn && side) {
      sideBtn.addEventListener("click", function () { side.classList.toggle("open"); });
      side.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", function () { side.classList.remove("open"); }); });
    }

    /* copy buttons */
    document.querySelectorAll(".copy").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var pre = btn.closest(".code").querySelector("pre");
        var done = function () {
          var t = btn.textContent; btn.classList.add("done");
          btn.textContent = OmniLang.current() === "ar" ? "تم النسخ" : "Copied";
          setTimeout(function () { btn.classList.remove("done"); btn.textContent = t; }, 1600);
        };
        if (navigator.clipboard) navigator.clipboard.writeText(pre.innerText).then(done, function () {});
      });
    });

    /* scroll-spy for side nav */
    var spyLinks = Array.prototype.slice.call(document.querySelectorAll(".side a[href^='#']"));
    if (spyLinks.length && "IntersectionObserver" in window) {
      var map = {};
      spyLinks.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting && map[e.target.id]) {
            spyLinks.forEach(function (a) { a.classList.remove("on"); });
            map[e.target.id].classList.add("on");
          }
        });
      }, { rootMargin: "-20% 0px -70% 0px" });
      Object.keys(map).forEach(function (id) { var s = document.getElementById(id); if (s) io.observe(s); });
    }

    /* reveal on scroll */
    var rv = document.querySelectorAll(".rv");
    if ("IntersectionObserver" in window) {
      var ro = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); ro.unobserve(e.target); } });
      }, { rootMargin: "0px 0px -8% 0px" });
      rv.forEach(function (el) { ro.observe(el); });
    } else rv.forEach(function (el) { el.classList.add("in"); });

    var y = document.getElementById("year"); if (y) y.textContent = new Date().getFullYear();
  });
})();
