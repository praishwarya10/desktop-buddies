
/* ==========================================
   DESKTOP BUDDIES — COMPLETE SCRIPT.JS
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ==========================================
     1. MOBILE NAVIGATION
     ========================================== */

  const menu = document.querySelector(".menu");
  const navLinks = document.querySelector(".nav-links");

  if (menu && navLinks) {
    menu.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      menu.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menu.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ==========================================
     2. SCROLL REVEAL ANIMATIONS
     ========================================== */

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const revealElements = document.querySelectorAll(".reveal");

  if (reducedMotion || !("IntersectionObserver" in window)) {
    revealElements.forEach(element => {
      element.classList.add("visible");
    });
  } else {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealElements.forEach(element => observer.observe(element));
  }

  /* ==========================================
     3. ANIMATED TAGLINE
     ========================================== */

  const tagline = document.querySelector("[data-word-reveal]");

  if (tagline) {
    const words = tagline.textContent.trim().split(/\s+/);

    tagline.replaceChildren();

    const spans = words.map(word => {
      const span = document.createElement("span");
      span.className = "word";
      span.textContent = word;

      tagline.appendChild(span);
      tagline.appendChild(document.createTextNode(" "));

      return span;
    });

    if (reducedMotion || !("IntersectionObserver" in window)) {
      spans.forEach(span => span.classList.add("lit"));
    } else {
      const taglineObserver = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting) {
            spans.forEach((span, index) => {
              setTimeout(() => {
                span.classList.add("lit");
              }, index * 85);
            });

            taglineObserver.disconnect();
          }
        },
        { threshold: 0.35 }
      );

      taglineObserver.observe(tagline);
    }
  }

  /* ==========================================
     4. EXPLORE PAGE CATEGORY FILTERS
     ========================================== */

  const filterButtons = [
    ...document.querySelectorAll("[data-filter]")
  ];

  const buddyCards = [
    ...document.querySelectorAll("[data-category]")
  ];

  const emptyCategory =
    document.querySelector("#empty-category") ||
    document.querySelector("#hydra-empty");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const category = button.dataset.filter;

      filterButtons.forEach(filter => {
        const isActive = filter === button;

        filter.classList.toggle("active", isActive);
        filter.setAttribute("aria-pressed", String(isActive));
      });

      let visibleCount = 0;

      buddyCards.forEach(card => {
        const matches =
          category === "all" ||
          card.dataset.category === category;

        card.hidden = !matches;

        if (matches) visibleCount++;
      });

      if (emptyCategory) {
        emptyCategory.hidden = visibleCount > 0;
      }
    });
  });

  /* ==========================================
     5. DOWNLOAD FILE INFORMATION
     ========================================== */

  const downloads = {
    spiderman: {
      name: "Spider-Man Desktop Buddy",
      file: "downloads/SpiderMan-Desktop-Buddy-Setup-1.0.0.exe"
    },

    itachi: {
      name: "Itachi Study Buddy",
      file: "downloads/Itachi-Study-Buddy-Setup-1.0.0.exe"
    }
  };

  /* ==========================================
     6. DOWNLOAD POPUP STYLING
     ========================================== */

  const modalStyles = document.createElement("style");

  modalStyles.textContent = `
    .download-overlay {
      position: fixed;
      inset: 0;
      z-index: 99999;

      display: flex;
      align-items: center;
      justify-content: center;

      padding: 20px;

      background: rgba(20, 8, 20, 0.72);
      backdrop-filter: blur(6px);
    }

    .download-overlay[hidden] {
      display: none !important;
    }

    .download-modal {
      width: min(100%, 490px);
      max-height: 90vh;
      overflow-y: auto;

      padding: 34px;

      border: 1px solid rgba(58, 15, 52, 0.15);
      border-radius: 22px;

      background: #DDE3E8;
      color: #3A0F34;

      box-shadow: 0 30px 90px rgba(0, 0, 0, 0.3);

      font-family: "Manrope", sans-serif;
    }

    .download-modal-icon {
      width: 56px;
      height: 56px;

      display: flex;
      align-items: center;
      justify-content: center;

      margin-bottom: 24px;

      border-radius: 15px;

      background: #3A0F34;
      color: #EAAA00;

      font-size: 27px;
      font-weight: 700;
    }

    .download-modal h2 {
      margin: 0 0 12px;

      color: #3A0F34;

      font-family: "Space Grotesk", sans-serif;
      font-size: 29px;
      font-weight: 700;

      line-height: 1.2;
      letter-spacing: -0.04em;
    }

    .download-modal-description {
      margin: 0 0 24px;

      color: #6D5D70;

      font-size: 14px;
      line-height: 1.7;
    }

    .download-security {
      padding: 18px;
      margin-bottom: 22px;

      border: 1px solid rgba(58, 15, 52, 0.12);
      border-left: 4px solid #EAAA00;
      border-radius: 11px;

      background: #EDF0F3;
    }

    .download-security strong {
      display: block;
      margin-bottom: 9px;

      color: #3A0F34;

      font-size: 14px;
      font-weight: 800;
    }

    .download-security p {
      margin: 0;

      color: #6D5D70;

      font-size: 13px;
      line-height: 1.75;
    }

    .download-status {
      margin: 0 0 20px;

      color: #9B2739;

      font-size: 13px;
      line-height: 1.6;
    }

    .download-status[hidden] {
      display: none !important;
    }

    .download-actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
    }

    .download-actions button {
      padding: 13px 21px;

      border: 1px solid #3A0F34;
      border-radius: 10px;

      font-family: "Manrope", sans-serif;
      font-size: 13px;
      font-weight: 800;

      cursor: pointer;

      transition:
        background 0.25s ease,
        transform 0.25s ease;
    }

    .download-cancel {
      background: transparent;
      color: #3A0F34;
    }

    .download-cancel:hover {
      background: rgba(58, 15, 52, 0.08);
    }

    .download-confirm {
      background: #3A0F34;
      color: #FFFFFF;
    }

    .download-confirm:hover {
      background: #55204C;
      transform: translateY(-2px);
    }

    .download-confirm:disabled {
      opacity: 0.55;
      cursor: wait;
      transform: none;
    }

    @media (max-width: 480px) {
      .download-modal {
        padding: 25px;
      }

      .download-modal h2 {
        font-size: 25px;
      }

      .download-actions {
        flex-direction: column-reverse;
      }

      .download-actions button {
        width: 100%;
      }
    }
  `;

  document.head.appendChild(modalStyles);

  /* ==========================================
     7. CREATE DOWNLOAD POPUP
     ========================================== */

  const overlay = document.createElement("div");

  overlay.className = "download-overlay";
  overlay.hidden = true;

  overlay.innerHTML = `
    <div
      class="download-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="download-modal-title"
      aria-describedby="download-modal-description"
    >

      <div class="download-modal-icon" aria-hidden="true">
        ↓
      </div>

      <h2 id="download-modal-title">
        Download Desktop Buddy?
      </h2>

      <p
        class="download-modal-description"
        id="download-modal-description"
      >
        Free Windows application · Version 1.0.0
      </p>

      <div class="download-security">
        <strong>⚠ Security Notice</strong>

        <p>
          This application is currently unsigned.
          Your browser or Windows SmartScreen may display
          a security warning during download or installation.
        </p>
      </div>

      <p
        class="download-status"
        role="status"
        aria-live="polite"
        hidden
      ></p>

      <div class="download-actions">

        <button
          class="download-cancel"
          type="button"
        >
          Cancel
        </button>

        <button
          class="download-confirm"
          type="button"
        >
          Download for Windows ↓
        </button>

      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  /* ==========================================
     8. POPUP ELEMENTS AND STATE
     ========================================== */

  const modalTitle = overlay.querySelector(
    "#download-modal-title"
  );

  const cancelButton = overlay.querySelector(
    ".download-cancel"
  );

  const confirmButton = overlay.querySelector(
    ".download-confirm"
  );

  const statusMessage = overlay.querySelector(
    ".download-status"
  );

  let selectedDownload = null;
  let previousFocus = null;
  let previousBodyOverflow = "";
  let checking = false;

  /* ==========================================
     9. OPEN AND CLOSE POPUP
     ========================================== */

  function openDownloadModal(download) {
    selectedDownload = download;
    previousFocus = document.activeElement;
    previousBodyOverflow = document.body.style.overflow;

    modalTitle.textContent =
      `Download ${download.name}?`;

    statusMessage.hidden = true;
    statusMessage.textContent = "";

    confirmButton.disabled = false;
    confirmButton.textContent = "Download for Windows ↓";

    overlay.hidden = false;
    document.body.style.overflow = "hidden";

    confirmButton.focus();
  }

  function closeDownloadModal() {
    if (checking) return;

    overlay.hidden = true;
    document.body.style.overflow = previousBodyOverflow;
    selectedDownload = null;

    if (
      previousFocus &&
      typeof previousFocus.focus === "function"
    ) {
      previousFocus.focus();
    }
  }

  /* ==========================================
     10. CONNECT WEBSITE DOWNLOAD BUTTONS
     ========================================== */

  document.querySelectorAll(
    ".download-link, a[href$='.exe'], a[data-download]"
  ).forEach(link => {

    const file =
      link.dataset.download ||
      link.getAttribute("href");

    if (!file) return;

    const normalizedFile = file.replace(/^\.\/?/, "");

    const download = Object.values(downloads).find(item => {
      return normalizedFile === item.file;
    });

    if (!download) return;

    link.addEventListener("click", event => {
      event.preventDefault();
      openDownloadModal(download);
    });
  });

  /* ==========================================
     11. CANCEL DOWNLOAD
     ========================================== */

  cancelButton.addEventListener("click", () => {
    closeDownloadModal();
  });

  /* ==========================================
     12. CONFIRM AND START DOWNLOAD
     ========================================== */

  confirmButton.addEventListener("click", async () => {

    if (!selectedDownload || checking) return;

    const file = selectedDownload.file;
    const filename = file.split("/").pop();

    const allowedFiles = Object.values(downloads).map(
      item => item.file.split("/").pop()
    );

    if (!allowedFiles.includes(filename)) {
      statusMessage.textContent =
        "Unknown installer selected.";

      statusMessage.hidden = false;
      return;
    }

    if (window.location.protocol === "file:") {
      statusMessage.textContent =
        "Please run the website using a local server " +
        "(py -m http.server 8000) to test downloads.";

      statusMessage.hidden = false;
      return;
    }

    checking = true;
    confirmButton.disabled = true;
    confirmButton.textContent = "Starting download...";
    statusMessage.hidden = true;

    try {

      const isLocal = [
        "localhost",
        "127.0.0.1",
        "[::1]"
      ].includes(window.location.hostname);

      if (isLocal) {

        // Download from the local downloads folder.
        const response = await fetch(file, {
          method: "HEAD",
          cache: "no-store"
        });

        const contentType =
          response.headers.get("content-type") || "";

        if (
          !response.ok ||
          contentType.includes("text/html")
        ) {
          throw new Error("Local installer not found");
        }

        const downloadLink = document.createElement("a");

        downloadLink.href = file;
        downloadLink.download = filename;

        document.body.appendChild(downloadLink);
        downloadLink.click();
        downloadLink.remove();

      } else {

        // Download from the published GitHub Release.
        const releaseBase =
          "https://github.com/praishwarya10/desktop-buddies/releases/download/v1.0.0/";

        const downloadUrl =
          releaseBase + encodeURIComponent(filename);

        window.location.assign(downloadUrl);
      }

      checking = false;
      closeDownloadModal();

    } catch (error) {

      statusMessage.textContent =
        "The installer could not be found. " +
        "For local testing, check the downloads folder. " +
        "For the live website, make sure the GitHub Release is published.";

      statusMessage.hidden = false;

    } finally {

      checking = false;
      confirmButton.disabled = false;
      confirmButton.textContent = "Download for Windows ↓";

    }
  });

  /* ==========================================
     13. CLOSE POPUP ON OUTSIDE CLICK
     ========================================== */

  overlay.addEventListener("click", event => {
    if (event.target === overlay) {
      closeDownloadModal();
    }
  });

  /* ==========================================
     14. KEYBOARD ACCESSIBILITY
     ========================================== */

  document.addEventListener("keydown", event => {

    if (overlay.hidden) return;

    if (event.key === "Escape") {
      event.preventDefault();
      closeDownloadModal();
      return;
    }

    if (event.key !== "Tab") return;

    const focusable = [
      cancelButton,
      confirmButton
    ].filter(button => !button.disabled);

    if (!focusable.length) {
      event.preventDefault();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (
      event.shiftKey &&
      document.activeElement === first
    ) {
      event.preventDefault();
      last.focus();
    } else if (
      !event.shiftKey &&
      document.activeElement === last
    ) {
      event.preventDefault();
      first.focus();
    }
  });

});
