// ===== SCROLL TO TOP ON PAGE LOAD/REFRESH =====
// Disable browser's scroll restoration
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// Immediately scroll to top on page load (before any scripts run)
window.scrollTo(0, 0);

// Also scroll to top after page is fully loaded
window.addEventListener('load', function () {
    window.scrollTo(0, 0);
});

// Ensure scroll to top before page unload (for refresh)
window.addEventListener('beforeunload', function () {
    window.scrollTo(0, 0);
});

// ===== SMOOTH SCROLLING FOR NAVIGATION LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow when scrolled
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    }
    
    lastScroll = currentScroll;
});

// ===== MOBILE MENU TOGGLE =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('Hamburger clicked!'); // Debug log
        
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        console.log('Menu active:', navMenu.classList.contains('active')); // Debug log
        
        // Toggle hamburger animation
        const bars = hamburger.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            if (hamburger.classList.contains('active')) {
                if (index === 0) bar.style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                if (index === 1) bar.style.opacity = '0';
                if (index === 2) bar.style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            }
        });
    });
    
    // Close menu when clicking on a link or resume button
    const closeMenu = () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        const bars = hamburger.querySelectorAll('.bar');
        bars.forEach(bar => {
            bar.style.transform = 'none';
            bar.style.opacity = '1';
        });
    };
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    // Also close menu when clicking resume dropdown items
    const resumeDropdownItems = document.querySelectorAll('.resume-dropdown-item');
    resumeDropdownItems.forEach(item => {
        item.addEventListener('click', closeMenu);
    });
}

// ===== RESUME DROPDOWN MENU =====
const resumeDropdown = document.querySelector('.resume-dropdown');
if (resumeDropdown) {
    const dropdownBtn = resumeDropdown.querySelector('.resume-download-btn');
    const dropdownMenu = resumeDropdown.querySelector('.resume-dropdown-menu');
    const dropdownItems = dropdownMenu.querySelectorAll('.resume-dropdown-item');
    
    // Toggle dropdown on button click (prevent default download)
    dropdownBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        resumeDropdown.classList.toggle('active');
    });
    
    // Close dropdown when clicking on a menu item
    dropdownItems.forEach(item => {
        item.addEventListener('click', () => {
            resumeDropdown.classList.remove('active');
        });
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!resumeDropdown.contains(e.target)) {
            resumeDropdown.classList.remove('active');
        }
    });
    
    // Close dropdown on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && resumeDropdown.classList.contains('active')) {
            resumeDropdown.classList.remove('active');
        }
    });
}

// Mobile menu styles are now in CSS file

// ===== SCROLL REVEAL ANIMATION =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Stop observing after animation
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections and key elements
document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll(`
        .section,
        .project-card,
        .skill-category,
        .timeline-item,
        .education-item,
        .competency-item
    `);
    
    revealElements.forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    const navHeight = navbar.offsetHeight;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add active link style
const activeLinkStyle = document.createElement('style');
activeLinkStyle.textContent = `
    .nav-link.active {
        color: var(--accent);
    }
`;
document.head.appendChild(activeLinkStyle);

// ===== TYPING EFFECT FOR HERO TITLE (Optional Enhancement) =====
// Uncomment to enable typing effect
/*
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.borderRight = '2px solid var(--accent)';
    
    let index = 0;
    const typeWriter = () => {
        if (index < text.length) {
            heroTitle.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 100);
        } else {
            setTimeout(() => {
                heroTitle.style.borderRight = 'none';
            }, 500);
        }
    };
    
    setTimeout(typeWriter, 500);
}
*/

// ===== SCROLL TO TOP BUTTON (Optional Enhancement) =====
// Uncomment to add a scroll-to-top button
/*
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: var(--accent);
    color: var(--dark-navy);
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.visibility = 'visible';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.visibility = 'hidden';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopBtn.addEventListener('mouseenter', () => {
    scrollTopBtn.style.transform = 'scale(1.1)';
});

scrollTopBtn.addEventListener('mouseleave', () => {
    scrollTopBtn.style.transform = 'scale(1)';
});
*/

// ===== PROJECT PAGINATION =====
class ProjectPagination {
    constructor() {
        this.projectsPerPage = 3;
        this.currentPage = 1;
        this.projects = Array.from(document.querySelectorAll('.project-card'));
        this.totalPages = Math.ceil(this.projects.length / this.projectsPerPage);
        
        this.prevBtn = document.getElementById('prev-btn');
        this.nextBtn = document.getElementById('next-btn');
        this.dotsContainer = document.getElementById('pagination-dots');
        
        this.init();
    }
    
    init() {
        if (this.projects.length <= this.projectsPerPage) {
            // Hide pagination if all projects fit on one page
            document.querySelector('.pagination-controls').style.display = 'none';
            return;
        }
        
        this.createDots();
        this.showPage(1, false); // Don't scroll on initial load
        this.attachEventListeners();
    }
    
    createDots() {
        this.dotsContainer.innerHTML = '';
        for (let i = 1; i <= this.totalPages; i++) {
            const dot = document.createElement('div');
            dot.className = 'pagination-dot';
            dot.dataset.page = i;
            dot.addEventListener('click', () => this.goToPage(i));
            this.dotsContainer.appendChild(dot);
        }
    }
    
    showPage(pageNum, shouldScroll = true) {
        this.currentPage = pageNum;
        
        // Hide all projects
        this.projects.forEach(project => project.classList.add('hidden'));
        
        // Show projects for current page
        const startIndex = (pageNum - 1) * this.projectsPerPage;
        const endIndex = startIndex + this.projectsPerPage;
        
        for (let i = startIndex; i < endIndex && i < this.projects.length; i++) {
            this.projects[i].classList.remove('hidden');
        }
        
        // Update pagination UI
        this.updatePaginationUI();
        
        // Smooth scroll to projects section only if requested
        if (shouldScroll) {
            const projectsSection = document.getElementById('projects');
            if (projectsSection) {
                const navHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                const targetPosition = projectsSection.offsetTop - navHeight - 20;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    }
    
    updatePaginationUI() {
        // Update buttons
        this.prevBtn.disabled = this.currentPage === 1;
        this.nextBtn.disabled = this.currentPage === this.totalPages;
        
        // Update dots
        const dots = this.dotsContainer.querySelectorAll('.pagination-dot');
        dots.forEach((dot, index) => {
            if (index + 1 === this.currentPage) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    goToPage(pageNum) {
        if (pageNum >= 1 && pageNum <= this.totalPages) {
            this.showPage(pageNum);
        }
    }
    
    nextPage() {
        if (this.currentPage < this.totalPages) {
            this.showPage(this.currentPage + 1);
        }
    }
    
    prevPage() {
        if (this.currentPage > 1) {
            this.showPage(this.currentPage - 1);
        }
    }
    
    attachEventListeners() {
        this.nextBtn.addEventListener('click', () => this.nextPage());
        this.prevBtn.addEventListener('click', () => this.prevPage());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevPage();
            if (e.key === 'ArrowRight') this.nextPage();
        });
    }
}

// Initialize pagination when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.projects-grid')) {
        new ProjectPagination();
    }
});

