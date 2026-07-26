/* =========================================================
   Charneca Verde — comportamento do site
   ========================================================= */
(function () {
  "use strict";

  var CFG   = window.CV_CONFIG || {};
  var DICT  = window.CV_I18N || {};
  var PT    = window.CV_I18N_PT || {};
  var LANGS = ["pt", "en", "fr"];

  /* -------------------------------------------------------
     1. Guardar o português original antes de traduzir
     ------------------------------------------------------- */
  var originals = { text: new Map(), attr: new Map() };

  function cacheOriginals() {
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      originals.text.set(el, el.innerHTML);
    });
    [["data-i18n-content", "content"], ["data-i18n-placeholder", "placeholder"]].forEach(function (pair) {
      document.querySelectorAll("[" + pair[0] + "]").forEach(function (el) {
        originals.attr.set(el, el.getAttribute(pair[1]) || "");
      });
    });
  }

  /* -------------------------------------------------------
     2. Traduzir
     ------------------------------------------------------- */
  function t(key, lang) {
    if (lang === "pt") return PT[key] || "";
    var d = DICT[lang];
    return (d && d[key]) || PT[key] || "";
  }

  function applyLang(lang) {
    if (LANGS.indexOf(lang) === -1) lang = "pt";
    var dict = DICT[lang];

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      var val = lang === "pt" ? originals.text.get(el) : (dict && dict[key]);
      if (typeof val === "string" && val.length) el.innerHTML = val;
    });

    [["data-i18n-content", "content"], ["data-i18n-placeholder", "placeholder"]].forEach(function (pair) {
      document.querySelectorAll("[" + pair[0] + "]").forEach(function (el) {
        var key = el.getAttribute(pair[0]);
        var val = lang === "pt" ? originals.attr.get(el) : (dict && dict[key]);
        if (typeof val === "string" && val.length) el.setAttribute(pair[1], val);
      });
    });

    document.documentElement.lang = lang === "pt" ? "pt-PT" : lang;

    var ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogLocale) ogLocale.setAttribute("content", { pt: "pt_PT", en: "en_GB", fr: "fr_FR" }[lang]);

    document.querySelectorAll(".lang-switch button").forEach(function (b) {
      var on = b.getAttribute("data-lang") === lang;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });

    applyConfig(lang);

    try { localStorage.setItem("cv-lang", lang); } catch (e) { /* modo privado */ }
    document.documentElement.setAttribute("data-lang", lang);
  }

  function detectLang() {
    var fromUrl = new URLSearchParams(location.search).get("lang");
    if (fromUrl && LANGS.indexOf(fromUrl) !== -1) return fromUrl;

    var saved = null;
    try { saved = localStorage.getItem("cv-lang"); } catch (e) { /* ignorar */ }
    if (saved && LANGS.indexOf(saved) !== -1) return saved;

    var nav = (navigator.language || "pt").slice(0, 2).toLowerCase();
    return LANGS.indexOf(nav) !== -1 ? nav : "pt";
  }

  /* -------------------------------------------------------
     3. Contactos vindos do config.js
     ------------------------------------------------------- */
  function applyConfig(lang) {
    var tel   = (CFG.telefone || "").replace(/\s+/g, "");
    var msgs  = CFG.whatsappMensagem || {};
    var waMsg = msgs[lang] || msgs.pt || "";
    var waUrl = CFG.whatsapp ? "https://wa.me/" + CFG.whatsapp + (waMsg ? "?text=" + encodeURIComponent(waMsg) : "") : "";

    var hrefs = {
      tel:  tel ? "tel:" + tel : "",
      mail: CFG.email ? "mailto:" + CFG.email : "",
      wa:   waUrl
    };
    var texts = {
      tel:  CFG.telefoneVisivel || CFG.telefone || "",
      mail: CFG.email || "",
      wa:   t("contact.waText", lang)
    };

    document.querySelectorAll("[data-contact]").forEach(function (el) {
      var href = hrefs[el.getAttribute("data-contact")];
      if (href) {
        el.setAttribute("href", href);
        if (el.getAttribute("data-contact") === "wa") el.setAttribute("target", "_blank"), el.setAttribute("rel", "noopener");
      }
    });

    document.querySelectorAll("[data-contact-text]").forEach(function (el) {
      var val = texts[el.getAttribute("data-contact-text")];
      if (val) el.textContent = val;
    });
  }

  /* -------------------------------------------------------
     4. Navegação
     ------------------------------------------------------- */
  function initNav() {
    var toggle = document.getElementById("navToggle");
    var nav    = document.getElementById("mainNav");
    var header = document.getElementById("siteHeader");
    if (!toggle || !nav) return;

    function close() {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }

    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) close();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });

    if (header) {
      var onScroll = function () {
        header.classList.toggle("is-stuck", window.scrollY > 8);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }
  }

  /* -------------------------------------------------------
     5. Revelação suave ao scroll
     ------------------------------------------------------- */
  function initReveal() {
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var targets = document.querySelectorAll(".card, .step, .areas-block, .plan, .trust-item, .shot, .rev, .section-head");

    if (reduce || !("IntersectionObserver" in window)) return;

    targets.forEach(function (el) { el.classList.add("reveal"); });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

    targets.forEach(function (el) { io.observe(el); });
  }

  /* -------------------------------------------------------
     6. Formulário de orçamento
     ------------------------------------------------------- */
  /* Junta os campos preenchidos num texto legível, na língua do visitante. */
  function composeMessage(form, lang) {
    var campos = [
      ["nome",       "form.name"],
      ["telefone",   "form.phone"],
      ["email",      "form.email"],
      ["localidade", "form.place"],
      ["area",       "form.area"],
      ["servico",    "form.service"],
      ["mensagem",   "form.msg"]
    ];

    var linhas = [t("form.subject", lang), ""];
    campos.forEach(function (par) {
      var el = form.elements[par[0]];
      var valor = el && el.value ? el.value.trim() : "";
      if (valor) linhas.push(t(par[1], lang) + ": " + valor);
    });
    return linhas.join("\n");
  }

  function initForm() {
    var form   = document.getElementById("quoteForm");
    var status = document.getElementById("formStatus");
    if (!form) return;

    var modo = CFG.formularioModo || "whatsapp";

    /* Sem JavaScript o browser faria um POST para o action; em modo
       WhatsApp ou email isso não faz sentido, por isso desligamo-lo. */
    if (modo !== "servidor") form.removeAttribute("action");

    function feedback(estado, chave, lang) {
      status.className = "form-status" + (estado ? " " + estado : "");
      status.textContent = t(chave, lang);
    }

    form.addEventListener("submit", function (e) {
      if (!form.checkValidity()) return; // deixa o browser mostrar os erros
      e.preventDefault();

      var lang = document.documentElement.getAttribute("data-lang") || "pt";
      var texto = composeMessage(form, lang);

      /* ---------- WhatsApp ---------- */
      if (modo === "whatsapp") {
        if (!CFG.whatsapp || /^3?51?0+$/.test(CFG.whatsapp)) {
          feedback("err", "form.err", lang);
          console.warn("[Charneca Verde] Falta o número de WhatsApp em js/config.js.");
          return;
        }
        window.open("https://wa.me/" + CFG.whatsapp + "?text=" + encodeURIComponent(texto), "_blank", "noopener");
        feedback("ok", "form.waOpen", lang);
        return;
      }

      /* ---------- Email ---------- */
      if (modo === "email") {
        if (!CFG.email) {
          feedback("err", "form.err", lang);
          console.warn("[Charneca Verde] Falta o email em js/config.js.");
          return;
        }
        window.location.href = "mailto:" + CFG.email +
          "?subject=" + encodeURIComponent(t("form.subject", lang)) +
          "&body="    + encodeURIComponent(texto);
        feedback("ok", "form.mailOpen", lang);
        return;
      }

      /* ---------- Servidor (Formspree ou equivalente) ---------- */
      var url = CFG.formularioUrl || form.getAttribute("action") || "";
      if (!url || url.indexOf("SEU_ID_AQUI") !== -1) {
        feedback("err", "form.err", lang);
        console.warn("[Charneca Verde] Falta o endereço do formulário em formularioUrl (js/config.js).");
        return;
      }

      var btn = form.querySelector('button[type="submit"]');
      var original = btn ? btn.textContent : "";
      if (btn) { btn.disabled = true; btn.textContent = t("form.sending", lang); }
      feedback("", "", lang);
      status.textContent = "";

      fetch(url, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      })
        .then(function (res) {
          if (!res.ok) throw new Error("HTTP " + res.status);
          form.reset();
          feedback("ok", "form.ok", lang);
        })
        .catch(function () {
          feedback("err", "form.err", lang);
        })
        .finally(function () {
          if (btn) { btn.disabled = false; btn.textContent = original; }
        });
    });
  }

  /* -------------------------------------------------------
     7. Arranque
     ------------------------------------------------------- */
  function init() {
    cacheOriginals();
    applyLang(detectLang());
    initNav();
    initReveal();
    initForm();

    document.querySelectorAll(".lang-switch button").forEach(function (b) {
      b.addEventListener("click", function () { applyLang(b.getAttribute("data-lang")); });
    });

    var year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
