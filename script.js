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

    // 11. Custom Chatbot Popup Logic
    const openChatbotBtn = document.getElementById('openChatbot');
    const closeChatbotBtn = document.getElementById('closeChatbot');
    const chatbotWindow = document.getElementById('chatbotWindow');
    const chatBody = document.getElementById('chatBody');
    const chatInput = document.getElementById('chatInput');
    const sendMessageBtn = document.getElementById('sendMessage');

    // Toggle Chat Window
    if(openChatbotBtn && chatbotWindow && closeChatbotBtn) {
        openChatbotBtn.addEventListener('click', (e) => {
            e.preventDefault();
            chatbotWindow.classList.add('active');
            chatInput.focus();
        });

        closeChatbotBtn.addEventListener('click', () => {
            chatbotWindow.classList.remove('active');
        });
    }

    // Bot Responses Logic
    let botTyping = false;

    const generateBotResponse = (userText) => {
        const lowerText = userText.toLowerCase();
        let response = "I'm MAK's virtual assistant. I can help answer questions about our services, pricing, projects, and contact info. How can I help you today?";
        
        if(lowerText.includes('hi') || lowerText.includes('hello') || lowerText.includes('hey')) {
            response = "Hello! 👋 Ready to elevate your brand today?";
        } else if ((lowerText.includes('what') && lowerText.includes('do')) || lowerText.includes('who are you')) {
            response = "MAK Creatives is a digital agency that helps businesses grow online through professional design, branding, websites, and marketing strategies. We focus on creating visuals and systems that attract customers and build strong brand identity.";
        } else if (lowerText.includes('service') || lowerText.includes('offer')) {
            response = "We offer complete digital solutions including:<br>✔ Website Design & Development<br>✔ Branding & Logo Design<br>✔ Social Media Marketing<br>✔ SEO (Search Engine Optimization)<br>✔ Graphic Design & Video Editing<br>✔ 2D/3D Modeling<br>✔ Google Business Profile optimization";
        } else if (lowerText.includes('international') || lowerText.includes('worldwide') || lowerText.includes('remote') || lowerText.includes('countries')) {
            response = "Yes, MAK Creatives works with clients worldwide including Qatar, UAE, Pakistan, Oman, and Europe. We handle remote projects smoothly with clear communication and timely delivery.";
        } else if (lowerText.includes('contact') || lowerText.includes('email') || lowerText.includes('phone') || lowerText.includes('number')) {
             response = "You can contact us via:<br>📞 +974 5131 8205<br>📩 letstalk@makcreatives.com<br><br>📍 Doha, Qatar";
        } else if (lowerText.includes('price') || lowerText.includes('cost') || lowerText.includes('much') || lowerText.includes('quote')) {
            response = "Our pricing depends on the project type and requirements. We offer flexible packages for startups, small businesses, and enterprises. You can contact us for a free quote based on your needs.";
        } else if (lowerText.includes('website') || lowerText.includes('web design')) {
            response = "Yes, we specialize in modern, responsive, and user-friendly websites. Our websites are designed to attract visitors, improve user experience, and generate leads for your business.";
        } else if (lowerText.includes('improve') || lowerText.includes('presence') || lowerText.includes('online')) {
            response = "Yes, we help businesses grow online through branding, social media management, SEO, and Google Business Profile optimization to increase visibility and customer trust.";
        } else if (lowerText.includes('how long') || lowerText.includes('duration') || lowerText.includes('time') || lowerText.includes('take')) {
            response = "Project duration depends on complexity. Simple designs may take a few days, while full websites or branding projects can take 1–3 weeks. We always ensure quality and timely delivery.";
        } else if (lowerText.includes('why choose') || lowerText.includes('why mak') || lowerText.includes('hire you')) {
            response = "Because we don’t just design — we create strategy-driven visuals that help your business grow, attract customers, and build trust. Our focus is on results, not just design.";
        }

        return response;
    };

    const addMessage = (text, sender) => {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-message ${sender}-message`;
        msgDiv.innerHTML = text; // allow HTML anchors
        chatBody.appendChild(msgDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    };

    const showTypingIndicator = () => {
        const indicator = document.createElement('div');
        indicator.className = 'typing-indicator';
        indicator.id = 'typingIndicator';
        indicator.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
        chatBody.appendChild(indicator);
        chatBody.scrollTop = chatBody.scrollHeight;
    };

    const handleSendMessage = () => {
        const text = chatInput.value.trim();
        if(!text || botTyping) return;

        // User Message
        addMessage(text, 'user');
        chatInput.value = '';
        botTyping = true;

        // Simulate Bot Typing Delay
        setTimeout(() => {
            showTypingIndicator();
            
            // Simulate Variable Response Delay
            setTimeout(() => {
                const indicator = document.getElementById('typingIndicator');
                if(indicator) indicator.remove();
                
                const response = generateBotResponse(text);
                addMessage(response, 'bot');
                botTyping = false;
            }, 1000 + (Math.random() * 800));

        }, 400);
    };

    if(sendMessageBtn && chatInput) {
        sendMessageBtn.addEventListener('click', handleSendMessage);
        chatInput.addEventListener('keypress', (e) => {
            if(e.key === 'Enter') handleSendMessage();
        });
    }

});
