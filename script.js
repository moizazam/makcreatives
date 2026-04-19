document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Stats Counter Logic
    const stats = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5
    };

    const countUp = (el) => {
        const target = +el.getAttribute('data-target');
        const count = +el.innerText;
        const speed = target / 50;

        if (count < target) {
            el.innerText = Math.ceil(count + speed);
            setTimeout(() => countUp(el), 30);
        } else {
            el.innerText = target;
        }
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                countUp(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    stats.forEach(stat => statsObserver.observe(stat));

    // 2. Reveal on Scroll
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // 3. Agency Side Deck Logic
    const toggle = document.querySelector('.menu-toggle');
    const sideDeck = document.getElementById('sideDeck');
    const deckOverlay = document.getElementById('deckOverlay');
    const closeDeck = document.getElementById('closeDeck');
 
    const openPanel = () => {
        sideDeck.classList.add('active');
        deckOverlay.classList.add('active');
        document.body.classList.add('deck-open');
    };
 
    const closePanel = () => {
        sideDeck.classList.remove('active');
        deckOverlay.classList.remove('active');
        document.body.classList.remove('deck-open');
    };
 
    if (toggle) toggle.addEventListener('click', openPanel);
    if (closeDeck) closeDeck.addEventListener('click', closePanel);
    if (deckOverlay) deckOverlay.addEventListener('click', closePanel);
 
    // Close on link click
    document.querySelectorAll('.side-deck a').forEach(link => {
        link.addEventListener('click', closePanel);
    });
    // 4. Portfolio Filter Logic
    const tabBtns = document.querySelectorAll('.tab-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 400);
                }
            });
        });
    });
    // 5. Testimonials Slider
    const testiCards = document.querySelectorAll('.testi-card');
    const nextBtn = document.querySelector('.slider-next');
    const prevBtn = document.querySelector('.slider-prev');
    let currentIndex = 0;

    const showTestimonial = (index) => {
        testiCards.forEach(card => card.classList.remove('active'));
        testiCards[index].classList.add('active');
    };

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % testiCards.length;
            showTestimonial(currentIndex);
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + testiCards.length) % testiCards.length;
            showTestimonial(currentIndex);
        });

        // Auto play
        setInterval(() => {
            currentIndex = (currentIndex + 1) % testiCards.length;
            showTestimonial(currentIndex);
        }, 8000);
    }

    // 6. Contact Form Logic
    const contactForm = document.getElementById('contact-form');
    const successOverlay = document.getElementById('form-success');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('.btn-send');
            btn.querySelector('span').innerText = 'Sending...';

            setTimeout(() => {
                successOverlay.classList.add('active');
            }, 1000);
        });
    }
 
    // 7. Footer Interactivity: Back to Top & Newsletter
    const backToTopBtn = document.getElementById('backToTop');
    const footerNewsletter = document.querySelector('.btn-footer-send');
 
    window.addEventListener('scroll', () => {
        if (window.scrollY > 1000) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
 
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
 
    if (footerNewsletter) {
        footerNewsletter.addEventListener('click', () => {
            const input = document.querySelector('.footer-newsletter input');
            if(input.value) {
                footerNewsletter.innerHTML = '✓';
                footerNewsletter.style.background = '#25d366';
                input.value = '';
                setTimeout(() => {
                    footerNewsletter.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>';
                    footerNewsletter.style.background = 'var(--primary)';
                }, 3000);
            }
        });
    }

    // 8. Advanced Motion: Magnetic Buttons
    const magneticBtns = document.querySelectorAll('.magnetic');
    
    if (window.matchMedia("(hover: hover)").matches) {
        magneticBtns.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const position = btn.getBoundingClientRect();
                const x = e.pageX - position.left - position.width / 2;
                const y = e.pageY - position.top - position.height / 2;
                
                btn.style.transform = `translate(${x * 0.3}px, ${y * 0.5}px)`;
            });
            
            btn.addEventListener('mouseout', () => {
                btn.style.transform = 'translate(0px, 0px)';
            });
        });
    }

    // 9. Scroll Progress Tracking
    const progressBar = document.getElementById('scrollProgress');
    
    const updateScrollProgress = () => {
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scroll = window.scrollY;
        const percentage = (scroll / height) * 100;
        if (progressBar) progressBar.style.width = `${percentage}%`;
    };

    window.addEventListener('scroll', updateScrollProgress);

    // 10. Background Parallax
    const auroraShapes = document.querySelectorAll('.aurora-blur');
    
    window.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        auroraShapes.forEach((shape, index) => {
            const speed = (index + 1) * 20;
            const moveX = (x - 0.5) * speed;
            const moveY = (y - 0.5) * speed;
            shape.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });

});
