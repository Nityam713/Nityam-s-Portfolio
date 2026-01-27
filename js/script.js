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
        
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
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
        item.addEventListener('click', (e) => {
            // Check if it's the locked item (Japanese docs)
            if (item.classList.contains('resume-dropdown-item-locked')) {
                e.preventDefault();
                e.stopPropagation();
                resumeDropdown.classList.remove('active');
                // Open modal will be handled separately
            } else {
                resumeDropdown.classList.remove('active');
            }
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

// ===== JAPANESE DOCUMENTS MODAL =====
const japaneseDocsTrigger = document.getElementById('japanese-docs-trigger');
const japaneseDocsModal = document.getElementById('japanese-docs-modal');
const modalCloseBtn = document.getElementById('modal-close-btn');

// Open modal when clicking the locked item
if (japaneseDocsTrigger && japaneseDocsModal) {
    japaneseDocsTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        japaneseDocsModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });
}

// Close modal when clicking close button
if (modalCloseBtn && japaneseDocsModal) {
    modalCloseBtn.addEventListener('click', () => {
        japaneseDocsModal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    });
}

// Close modal when clicking outside (on overlay)
if (japaneseDocsModal) {
    japaneseDocsModal.addEventListener('click', (e) => {
        if (e.target === japaneseDocsModal) {
            japaneseDocsModal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        }
    });
}

// Close modal on escape key (for Japanese docs modal)
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (japaneseDocsModal && japaneseDocsModal.classList.contains('active')) {
            japaneseDocsModal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        }
        if (blogModal && blogModal.classList.contains('active')) {
            blogModal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        }
    }
});

// ===== BLOG COMING SOON MODAL =====
const blogLinkTrigger = document.getElementById('blog-link-trigger');
const blogModal = document.getElementById('blog-modal');
const blogModalCloseBtn = document.getElementById('blog-modal-close-btn');
const blogWebsiteLink = document.getElementById('blog-website-link');

// TODO: Update this with your actual website URL
const websiteUrl = 'https://your-website-url.com'; // Replace with your actual website URL

// Set the website link href
if (blogWebsiteLink) {
    blogWebsiteLink.href = websiteUrl;
}

// Open modal when clicking the blog link
if (blogLinkTrigger && blogModal) {
    blogLinkTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        blogModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });
}

// Close modal when clicking close button
if (blogModalCloseBtn && blogModal) {
    blogModalCloseBtn.addEventListener('click', () => {
        blogModal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    });
}

// Close modal when clicking outside (on overlay)
if (blogModal) {
    blogModal.addEventListener('click', (e) => {
        if (e.target === blogModal) {
            blogModal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
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

// ===== ASTRONAUT NAVIGATION ANIMATION =====
(function() {
    'use strict';
    
    // Wait for DOM to be fully ready
    const initAstronaut = () => {
        const astronaut = document.getElementById('astronaut');
        const navContainer = document.querySelector('.nav-container');
        
        if (!astronaut || !navContainer) {
            return;
        }
        
        // Check if reduced motion is preferred
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        // Check if device supports hover (desktop)
        const checkIsDesktop = () => {
            return window.matchMedia('(min-width: 769px) and (hover: hover)').matches;
        };
        
        let isDesktop = checkIsDesktop();
        let userInteracting = false;
        let interactionTimeout = null;
        let idleTimeout = null;
        let lastPosition = { x: 0, y: 0 };
        let animationFrameId = null;
        let pendingPosition = null;
        let hoverThrottleTimeout = null;
        let currentHoverTarget = null;
        
        // Helper: Clear all timeouts
        const clearAllTimeouts = () => {
            if (hoverThrottleTimeout) {
                clearTimeout(hoverThrottleTimeout);
                hoverThrottleTimeout = null;
            }
            if (interactionTimeout) {
                clearTimeout(interactionTimeout);
            }
            if (idleTimeout) {
                clearTimeout(idleTimeout);
            }
        };
        
        // Helper: Cancel pending animations
        const cancelPendingAnimations = () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }
        };
        
        // Get initial center position of nav menu
        const getNavMenuCenter = () => {
            const navMenu = document.querySelector('.nav-menu');
            if (!navMenu) return { x: 0, y: 0 };
            
            const menuRect = navMenu.getBoundingClientRect();
            const containerRect = navContainer.getBoundingClientRect();
            
            return {
                x: menuRect.left + menuRect.width / 2 - containerRect.left,
                y: menuRect.top + menuRect.height / 2 - containerRect.top
            };
        };
        
        // Calculate target position for astronaut
        const calculateTargetPosition = (element) => {
            const elementRect = element.getBoundingClientRect();
            const containerRect = navContainer.getBoundingClientRect();
            const center = getNavMenuCenter();
            
            // Position astronaut close to nav item for clear visual association
            const offset = 8; // Small offset to keep astronaut mostly visible
            const targetX = (elementRect.left - offset) - containerRect.left - center.x;
            const targetY = (elementRect.top + elementRect.height / 2) - containerRect.top - center.y;
            
            return { x: targetX, y: targetY };
        };
        
        // Smooth movement using requestAnimationFrame
        const updateAstronautPosition = () => {
            if (pendingPosition) {
                const { targetX, targetY, isUserInteraction, isClick } = pendingPosition;
                pendingPosition = null;
                
                // Check if position actually changed significantly (larger threshold to reduce jitter)
                const positionChanged = Math.abs(targetX - lastPosition.x) > 2 || Math.abs(targetY - lastPosition.y) > 2;
                
                if (positionChanged) {
                    // Remove idle class smoothly
                    astronaut.classList.remove('idle');
                    
                    // Update position using CSS variables (smooth transition)
                    astronaut.style.setProperty('--target-x', `${targetX}px`);
                    astronaut.style.setProperty('--target-y', `${targetY}px`);
                    lastPosition = { x: targetX, y: targetY };
                }
                
                // Handle click animation (only on actual clicks, not rapid hovers)
                if (isClick) {
                    astronaut.classList.add('clicked');
                    setTimeout(() => {
                        astronaut.classList.remove('clicked');
                    }, 600);
                }
                
                // Mark as user interaction
                if (isUserInteraction) {
                    userInteracting = true;
                    clearAllTimeouts();
                    astronaut.classList.remove('idle');
                    
                    // Reset flag after 3 seconds of no interaction, then add idle state
                    interactionTimeout = setTimeout(() => {
                        userInteracting = false;
                        idleTimeout = setTimeout(() => {
                            if (!userInteracting) {
                                astronaut.classList.add('idle');
                            }
                        }, 1000);
                    }, 3000);
                }
            }
            animationFrameId = null;
        };
        
        // Move astronaut to target position (throttled with requestAnimationFrame)
        const moveAstronaut = (targetX, targetY, isUserInteraction = false, isClick = false) => {
            if (!isDesktop || prefersReducedMotion) return;
            
            // Store pending position (overwrites previous if rapid hovers)
            pendingPosition = { targetX, targetY, isUserInteraction, isClick };
            
            // Schedule update on next animation frame (throttles rapid updates)
            if (!animationFrameId) {
                animationFrameId = requestAnimationFrame(updateAstronautPosition);
            }
        };
        
        // Throttled hover handler to prevent jitter
        const handleHover = (navItem) => {
            if (hoverThrottleTimeout) {
                clearTimeout(hoverThrottleTimeout);
            }
            
            if (animationFrameId && currentHoverTarget !== navItem) {
                cancelPendingAnimations();
            }
            
            currentHoverTarget = navItem;
            
            // Throttle hover updates (30ms = ~33fps)
            hoverThrottleTimeout = setTimeout(() => {
                const position = calculateTargetPosition(navItem);
                moveAstronaut(position.x, position.y, true);
                hoverThrottleTimeout = null;
            }, 30);
        };
        
        // Unified click handler
        const handleClick = (element) => {
            clearAllTimeouts();
            cancelPendingAnimations();
            const position = calculateTargetPosition(element);
            moveAstronaut(position.x, position.y, true, true);
        };
        
        // Initialize astronaut position to center of nav menu
        const initializeAstronaut = () => {
            if (!isDesktop) return;
            
            const navMenu = document.querySelector('.nav-menu');
            if (!navMenu) return;
            
            const menuRect = navMenu.getBoundingClientRect();
            const containerRect = navContainer.getBoundingClientRect();
            
            // Calculate center of nav menu relative to nav container
            const centerX = menuRect.left + menuRect.width / 2 - containerRect.left;
            const centerY = menuRect.top + menuRect.height / 2 - containerRect.top;
            
            // Set initial position using left/top (astronaut will be centered on this point)
            astronaut.style.left = `${centerX}px`;
            astronaut.style.top = `${centerY}px`;
        };
        
        // Setup hover and click event listeners
        const setupHoverListeners = () => {
            if (!isDesktop || prefersReducedMotion) return;
            
            // Get all navigation items (li elements)
            const navItems = document.querySelectorAll('.nav-item');
            
            // Handle each nav item - hover and click (with throttling)
            navItems.forEach(navItem => {
                const link = navItem.querySelector('a');
                if (!link) return;
                
                // Move astronaut on hover (using global throttle)
                navItem.addEventListener('mouseenter', () => {
                    handleHover(navItem);
                });
                
                // Move astronaut on click and keep it there
                link.addEventListener('click', () => {
                    handleClick(navItem);
                });
            });
            
            // Handle resume dropdown separately
            const resumeDropdown = document.querySelector('.resume-dropdown');
            if (resumeDropdown) {
                const resumeBtn = resumeDropdown.querySelector('.resume-download-btn');
                
                resumeDropdown.addEventListener('mouseenter', () => {
                    handleHover(resumeDropdown);
                });
                
                // Handle resume dropdown clicks
                if (resumeBtn) {
                    resumeBtn.addEventListener('click', () => {
                        handleClick(resumeDropdown);
                    });
                }
                
                // Handle resume dropdown menu items click
                resumeDropdown.querySelectorAll('.resume-dropdown-item').forEach(item => {
                    item.addEventListener('click', () => {
                        handleClick(resumeDropdown);
                    });
                });
            }
            
            // Don't reset on nav container mouseleave - keep astronaut on last hovered/clicked item
        };
        
        // Update astronaut position based on active section (on scroll)
        const updateAstronautOnScroll = () => {
            if (!isDesktop || prefersReducedMotion || userInteracting) return;
            
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-link');
            
            let currentSection = '';
            const navHeight = document.querySelector('.navbar')?.offsetHeight || 0;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - navHeight - 100;
                const sectionHeight = section.clientHeight;
                
                if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                    currentSection = section.getAttribute('id');
                }
            });
            
            // Find corresponding nav item and move astronaut there (only if user not interacting)
            if (currentSection && !userInteracting) {
                navLinks.forEach((link) => {
                    if (link.getAttribute('href') === `#${currentSection}`) {
                        const navItem = link.closest('.nav-item');
                        if (navItem) {
                            const position = calculateTargetPosition(navItem);
                            moveAstronaut(position.x, position.y, false);
                        }
                    }
                });
            }
        };
        
        // Initialize everything
        const init = () => {
            isDesktop = checkIsDesktop();
            if (isDesktop && !prefersReducedMotion) {
                initializeAstronaut();
                setupHoverListeners();
                
                // Update astronaut position on scroll (with debounce)
                let scrollTimeout;
                window.addEventListener('scroll', () => {
                    clearTimeout(scrollTimeout);
                    scrollTimeout = setTimeout(() => {
                        updateAstronautOnScroll();
                    }, 150);
                });
                
                // Initial position update based on current section
                setTimeout(() => {
                    updateAstronautOnScroll();
                }, 300);
            }
        };
        
        // Run initialization
        init();
        
        // Handle window resize to recalculate positions
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                isDesktop = checkIsDesktop();
                if (isDesktop && !prefersReducedMotion) {
                    initializeAstronaut();
                    // Recalculate position after resize
                    setTimeout(() => {
                        updateAstronautOnScroll();
                    }, 100);
                }
            }, 250);
        });
    };
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAstronaut);
    } else {
        // DOM already loaded, run immediately
        initAstronaut();
    }
})();

// ===== INTERACTIVE LOGO ENHANCEMENTS =====
(function() {
    'use strict';
    
    const initLogoInteractions = () => {
        const logo = document.getElementById('site-logo');
        const logoSvg = logo?.querySelector('.logo-svg');
        const logoPlanet = logo?.querySelector('.logo-planet');
        const logoLetters = logo?.querySelectorAll('.logo-letter');
        
        if (!logo || !logoSvg) return;
        
        // Mouse move tracking for tilt effect
        logo.addEventListener('mousemove', (e) => {
            const rect = logo.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const deltaX = (e.clientX - centerX) / (rect.width / 2);
            const deltaY = (e.clientY - centerY) / (rect.height / 2);
            
            const rotateX = deltaY * 10;
            const rotateY = deltaX * -10;
            
            logoSvg.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.1)`;
        });
        
        // Reset on mouse leave
        logo.addEventListener('mouseleave', () => {
            logoSvg.style.transform = '';
            logo.classList.remove('interactive');
        });
        
        // Add interactive class on hover
        logo.addEventListener('mouseenter', () => {
            logo.classList.add('interactive');
        });
        
        // Click ripple effect
        logo.addEventListener('click', (e) => {
            const rect = logo.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Create ripple element
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: rgba(100, 255, 218, 0.6);
                left: ${x}px;
                top: ${y}px;
                transform: translate(-50%, -50%);
                pointer-events: none;
                animation: ripple-expand 0.6s ease-out;
                z-index: 1000;
            `;
            
            // Add ripple animation if not exists
            if (!document.getElementById('ripple-style')) {
                const style = document.createElement('style');
                style.id = 'ripple-style';
                style.textContent = `
                    @keyframes ripple-expand {
                        0% {
                            transform: translate(-50%, -50%) scale(0);
                            opacity: 1;
                        }
                        100% {
                            transform: translate(-50%, -50%) scale(10);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(style);
            }
            
            logo.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Letter animation on click
            logoLetters.forEach((letter, index) => {
                setTimeout(() => {
                    letter.style.transform = 'scale(1.3)';
                    setTimeout(() => {
                        letter.style.transform = '';
                    }, 200);
                }, index * 50);
            });
        });
        
        // Periodic subtle animations when idle
        let idleAnimationInterval;
        const startIdleAnimations = () => {
            idleAnimationInterval = setInterval(() => {
                if (!logo.matches(':hover')) {
                    logoLetters.forEach((letter, index) => {
                        setTimeout(() => {
                            letter.style.transform = 'translateY(-2px)';
                            setTimeout(() => {
                                letter.style.transform = '';
                            }, 300);
                        }, index * 100);
                    });
                }
            }, 5000);
        };
        
        startIdleAnimations();
        
        // Cleanup on page unload
        window.addEventListener('beforeunload', () => {
            if (idleAnimationInterval) {
                clearInterval(idleAnimationInterval);
            }
        });
    };
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLogoInteractions);
    } else {
        initLogoInteractions();
    }
})();

