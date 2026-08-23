/* ==========================================================================
   Marjy Wellness — shared header + footer + nav behavior
   Single source of truth: edit the header/footer HTML in this file only.
   ========================================================================== */

const headerHTML = `
<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header">
    <nav class="nav" aria-label="Primary">
        <a class="brand" href="index.html">Marjy Wellness</a>
        <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="nav-links" aria-label="Menu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4">
                <path d="M3 7h18M3 12h18M3 17h18"/>
            </svg>
        </button>
        <ul id="nav-links" class="nav-links">
            <li><a href="index.html" data-nav="home">Home</a></li>
            <li><a href="about.html" data-nav="about">About</a></li>
            <li><a href="work-with-me.html" data-nav="services">Work With Me</a></li>
            <li><a href="contact.html" data-nav="contact">Contact</a></li>
        </ul>
    </nav>
</header>
`;

const footerHTML = `
<footer class="site-footer">
    <div class="container">
        <div class="footer-inner">
            <div>
                <div class="footer-brand">Marjy Wellness</div>
                <p>Different approaches. One intention: helping you reconnect with yourself and find your way.</p>
            </div>
            <div>
                <h4>Explore</h4>
                <ul>
                    <li><a href="about.html">About Marjy</a></li>
                    <li><a href="work-with-me.html">Ways to work together</a></li>
                    <li><a href="contact.html">Begin a conversation</a></li>
                </ul>
            </div>
            <div>
                <h4>Contact</h4>
                <p><a href="contact.html">Send a message</a></p>
            </div>
        </div>
        <div class="footer-meta">
            <span>&copy; ${new Date().getFullYear()} Marjy Wellness</span>
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
}

function wireMobileNav() {
    const toggle = document.querySelector(".nav-toggle");
    const links = document.getElementById("nav-links");
    if (!toggle || !links) return;

    toggle.addEventListener("click", () => {
        const open = links.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(open));
    });

    links.querySelectorAll("a").forEach((a) => {
        a.addEventListener("click", () => {
            links.classList.remove("is-open");
            toggle.setAttribute("aria-expanded", "false");
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    mountLayout();
    markCurrentPage();
    wireMobileNav();
});
