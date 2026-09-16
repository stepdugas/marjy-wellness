/* ==========================================================================
   Marjy Berkman — shared header + footer + nav behavior
   Single source of truth: edit the header/footer HTML in this file only.
   ========================================================================== */

const headerHTML = `
<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header">
    <nav class="nav" aria-label="Primary">
        <a class="brand" href="index.html">
            <span class="brand-name">Marjy Berkman</span>
            <span class="brand-tagline">Organization Inside and Out</span>
        </a>
        <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="nav-links" aria-label="Menu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4">
                <path d="M3 7h18M3 12h18M3 17h18"/>
            </svg>
        </button>
        <ul id="nav-links" class="nav-links">
            <li><a href="index.html" data-nav="home">Home</a></li>
            <li><a href="about.html" data-nav="about">About</a></li>
            <li class="has-dropdown">
                <div class="nav-parent">
                    <a href="work-with-me.html" data-nav="services">Work With Me</a>
                    <button class="dropdown-toggle" type="button" aria-expanded="false" aria-controls="services-menu" aria-label="Expand Work With Me menu">
                        <svg viewBox="0 0 12 8" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true">
                            <path d="M1 1l5 5 5-5"/>
                        </svg>
                    </button>
                </div>
                <ul id="services-menu" class="dropdown-menu">
                    <li><a href="organizing.html" data-nav="organizing">Professional Organizing</a></li>
                    <li><a href="craniosacral-polarity.html" data-nav="craniosacral">Craniosacral &amp; Polarity Therapy</a></li>
                    <li><a href="holistic-guidance.html" data-nav="holistic">Holistic Guidance</a></li>
                </ul>
            </li>
            <li><a href="contact.html" data-nav="contact">Contact</a></li>
        </ul>
    </nav>
</header>
`;

const footerHTML = `
<footer class="site-footer">
    <div class="container">
        <div class="footer-meta">
            <span>&copy; ${new Date().getFullYear()} Marjy Berkman</span>
        </div>
    </div>
</footer>
`;

function mountLayout() {
    const headerMount = document.getElementById("site-header-mount");
    const footerMount = document.getElementById("site-footer-mount");
    if (headerMount) headerMount.outerHTML = headerHTML;
    if (footerMount) footerMount.outerHTML = footerHTML;
}

function markCurrentPage() {
    const page = document.body.dataset.page;
    if (!page) return;
    const link = document.querySelector(`[data-nav="${page}"]`);
    if (link) link.setAttribute("aria-current", "page");

    // Also mark the parent "Work With Me" if we're on a services sub-page
    const servicePages = ["organizing", "craniosacral", "holistic", "services"];
    if (servicePages.includes(page)) {
        const parent = document.querySelector('[data-nav="services"]');
        if (parent) parent.setAttribute("aria-current", "page");
    }
}

function wireMobileNav() {
    const toggle = document.querySelector(".nav-toggle");
    const links = document.getElementById("nav-links");
    if (!toggle || !links) return;

    toggle.addEventListener("click", () => {
        const open = links.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(open));
    });

    // Close mobile menu when a leaf link is tapped (but not the dropdown chevron)
    links.querySelectorAll("a").forEach((a) => {
        a.addEventListener("click", () => {
            links.classList.remove("is-open");
            toggle.setAttribute("aria-expanded", "false");
        });
    });
}

function wireDropdown() {
    const dropdown = document.querySelector(".has-dropdown");
    if (!dropdown) return;

    const toggle = dropdown.querySelector(".dropdown-toggle");
    const menu = dropdown.querySelector(".dropdown-menu");
    if (!toggle || !menu) return;

    const setOpen = (open) => {
        dropdown.classList.toggle("is-open", open);
        toggle.setAttribute("aria-expanded", String(open));
    };

    // Chevron click toggles the submenu on both desktop and mobile
    toggle.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        setOpen(!dropdown.classList.contains("is-open"));
    });

    // Escape closes the submenu and returns focus
    dropdown.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && dropdown.classList.contains("is-open")) {
            setOpen(false);
            toggle.focus();
        }
    });

    // Click outside closes the submenu (desktop)
    document.addEventListener("click", (e) => {
        if (!dropdown.contains(e.target)) setOpen(false);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    mountLayout();
    markCurrentPage();
    wireMobileNav();
    wireDropdown();
});
