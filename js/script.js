/**
 * John Rey Luis Aguillon - Portfolio
 * Modern JavaScript with smooth animations and enhanced user experience
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS (Animate On Scroll)
  AOS.init({
    duration: 800,
    easing: 'ease-out',
    once: false
  });
  
  // Custom cursor
  const cursor = document.querySelector('.cursor');
  const cursorFollower = document.querySelector('.cursor-follower');
  
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
      cursorFollower.style.left = e.clientX + 'px';
      cursorFollower.style.top = e.clientY + 'px';
    }, 100);
  });
  
  // Hover effect on links and buttons
  const hoverElements = document.querySelectorAll('a, button, .btn, .tech-item, .skill-item');
  
  hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
      cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
      cursorFollower.style.backgroundColor = 'rgba(76, 201, 240, 0.1)';
    });
    
    element.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorFollower.style.backgroundColor = 'transparent';
    });
  });
  
  // Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
      
      // Toggle aria-expanded attribute for accessibility
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
      menuToggle.setAttribute('aria-expanded', !expanded);
    });
  }
  
  // Close mobile menu when clicking a link
  const navItems = document.querySelectorAll('.nav-link');
  
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
  
  // Theme switcher
  const themeToggle = document.getElementById('checkbox');
  
  if (themeToggle) {
    // Check if user has already set a preference
    const currentTheme = localStorage.getItem('theme');
    
    if (currentTheme) {
      document.body.classList.add(currentTheme);
      
      if (currentTheme === 'light-theme') {
        themeToggle.checked = true;
      }
    }
    
    themeToggle.addEventListener('change', () => {
      if (themeToggle.checked) {
        document.body.classList.add('light-theme');
        localStorage.setItem('theme', 'light-theme');
      } else {
        document.body.classList.remove('light-theme');
        localStorage.setItem('theme', 'dark-theme');
      }
    });
  }
  
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') return;
      
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Active navigation based on scroll position
  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  function activateNavByScroll() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.offsetHeight;
      
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }
  
  window.addEventListener('scroll', activateNavByScroll);
  
  // Header scroll effect
  const header = document.querySelector('.header');
  
  function toggleHeaderClass() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  
  window.addEventListener('scroll', toggleHeaderClass);
  
  // Back to top button
  const backToTopButton = document.querySelector('.back-to-top');
  
  function toggleBackToTopButton() {
    if (window.scrollY > 300) {
      backToTopButton.classList.add('active');
    } else {
      backToTopButton.classList.remove('active');
    }
  }
  
  window.addEventListener('scroll', toggleBackToTopButton);
  
  if (backToTopButton) {
    backToTopButton.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Animate skill progress bars
  const skillSections = document.querySelectorAll('#skills');
  
  const animateSkills = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const skillBars = entry.target.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
          const width = bar.style.width;
          bar.style.width = '0';
          setTimeout(() => {
            bar.style.width = width;
          }, 100);
        });
      }
    });
  };
  
  const skillObserver = new IntersectionObserver(animateSkills, {
    threshold: 0.1
  });
  
  skillSections.forEach(section => {
    skillObserver.observe(section);
  });
  
  // Contact form handling
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      // Simple validation
      if (!name || !email || !message) {
        showFormNotification('Please fill in all fields', 'error');
        return;
      }
      
      // Simulate form submission
      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
      
      // Simulate API call
      setTimeout(() => {
        // Reset form
        contactForm.reset();
        
        // Show success message
        showFormNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        
        // Reset button
        submitButton.disabled = false;
        submitButton.textContent = originalText;
      }, 1500);
    });
  }
  
  // Function to show form notifications
  function showFormNotification(message, type) {
    // Create notification element if it doesn't exist
    let notification = document.querySelector('.form-notification');
    
    if (!notification) {
      notification = document.createElement('div');
      notification.className = 'form-notification';
      document.querySelector('.contact-form').appendChild(notification);
    }
    
    // Set message and type
    notification.textContent = message;
    notification.classList.add(type);
    notification.classList.add('show');
    
    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.classList.remove('show');
      
      // Remove type classes
      notification.classList.remove('success');
      notification.classList.remove('error');
    }, 3000);
  }
  
  // Blog posts loading
  const postsContainer = document.getElementById('posts-container');
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  let currentPage = 1;
  
  if (postsContainer && loadMoreBtn) {
    // Sample blog posts data
    const blogPosts = [
      {
        title: 'Getting Started with AI Development',
        excerpt: 'Learn the fundamentals of AI development with Python and how to implement machine learning models in real-world applications.',
        date: 'May 15, 2025',
        image: 'https://source.unsplash.com/800x600/?artificial-intelligence',
        author: 'John Rey Luis Aguillon'
      },
      {
        title: 'Building Chatbots with LangChain and GPT',
        excerpt: 'A comprehensive guide to building conversational AI using LangChain framework and OpenAI\'s GPT models.',
        date: 'April 23, 2025',
        image: 'https://source.unsplash.com/800x600/?chatbot',
        author: 'John Rey Luis Aguillon'
      },
      {
        title: 'Vector Databases: The Backbone of Modern AI Applications',
        excerpt: 'Explore how vector databases are transforming semantic search capabilities in AI applications.',
        date: 'March 10, 2025',
        image: 'https://source.unsplash.com/800x600/?database',
        author: 'John Rey Luis Aguillon'
      },
      {
        title: 'Optimizing Node.js Performance for AI Applications',
        excerpt: 'Best practices for building high-performance backend systems for AI-powered applications using Node.js.',
        date: 'February 5, 2025',
        image: 'https://source.unsplash.com/800x600/?code',
        author: 'John Rey Luis Aguillon'
      },
      {
        title: 'Deploying AI Models in Production',
        excerpt: 'Learn how to effectively deploy AI models in production environments while ensuring scalability and reliability.',
        date: 'January 20, 2025',
        image: 'https://source.unsplash.com/800x600/?server',
        author: 'John Rey Luis Aguillon'
      },
      {
        title: 'Ethical Considerations in AI Development',
        excerpt: 'Exploring the ethical implications of AI and how developers can build systems that are fair, transparent, and beneficial.',
        date: 'December 12, 2024',
        image: 'https://source.unsplash.com/800x600/?ethics',
        author: 'John Rey Luis Aguillon'
      }
    ];
    
    // Function to create blog post cards
    function createPostCard(post) {
      const postEl = document.createElement('div');
      postEl.className = 'post-card';
      postEl.setAttribute('data-aos', 'fade-up');
      
      postEl.innerHTML = `
        <div class="post-image">
          <img src="${post.image}" alt="${post.title}">
        </div>
        <div class="post-content">
          <div class="post-meta">
            <span class="post-date">${post.date}</span>
          </div>
          <h3 class="post-title">${post.title}</h3>
          <p class="post-excerpt">${post.excerpt}</p>
          <a href="#" class="post-link">Read More <i class="fas fa-arrow-right"></i></a>
        </div>
      `;
      
      return postEl;
    }
    
    // Function to load posts
    function loadPosts(page = 1, limit = 3) {
      const start = (page - 1) * limit;
      const end = start + limit;
      const paginatedPosts = blogPosts.slice(start, end);
      
      paginatedPosts.forEach(post => {
        const postCard = createPostCard(post);
        postsContainer.appendChild(postCard);
      });
      
      // Hide load more button if all posts are loaded
      if (end >= blogPosts.length) {
        loadMoreBtn.style.display = 'none';
      }
    }
    
    // Load initial posts
    loadPosts();
    
    // Add event listener to load more button
    loadMoreBtn.addEventListener('click', () => {
      currentPage++;
      loadPosts(currentPage);
      
      // Refresh AOS
      setTimeout(() => {
        AOS.refresh();
      }, 500);
    });
  }
  
  // Add CSS styles for blog posts
  const style = document.createElement('style');
  style.textContent = `
    .post-card {
      background-color: var(--bg-card);
      border-radius: 15px;
      overflow: hidden;
      box-shadow: var(--shadow-md);
      transition: var(--transition);
    }
    
    .post-card:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-lg);
    }
    
    .post-image {
      height: 200px;
      overflow: hidden;
    }
    
    .post-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: var(--transition);
    }
    
    .post-card:hover .post-image img {
      transform: scale(1.05);
    }
    
    .post-content {
      padding: 1.5rem;
    }
    
    .post-meta {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;
      color: rgba(248, 249, 250, 0.7);
      font-size: 0.85rem;
    }
    
    .post-title {
      font-size: 1.2rem;
      margin-bottom: 0.75rem;
      color: var(--primary-light);
    }
    
    .post-excerpt {
      color: rgba(248, 249, 250, 0.8);
      margin-bottom: 1rem;
      font-size: 0.95rem;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .post-link {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 600;
      font-size: 0.9rem;
    }
    
    .post-link i {
      transition: var(--transition);
    }
    
    .post-link:hover i {
      transform: translateX(5px);
    }
    
    .form-notification {
      padding: 0.75rem 1rem;
      border-radius: 8px;
      margin-bottom: 1rem;
      font-weight: 500;
      opacity: 0;
      transform: translateY(-10px);
      transition: var(--transition);
    }
    
    .form-notification.show {
      opacity: 1;
      transform: translateY(0);
    }
    
    .form-notification.success {
      background-color: rgba(46, 213, 115, 0.15);
      color: #2ed573;
    }
    
    .form-notification.error {
      background-color: rgba(255, 71, 87, 0.15);
      color: #ff4757;
    }
    
    .menu-toggle.active span:nth-child(1) {
      transform: translateY(9px) rotate(45deg);
    }
    
    .menu-toggle.active span:nth-child(2) {
      opacity: 0;
    }
    
    .menu-toggle.active span:nth-child(3) {
      transform: translateY(-9px) rotate(-45deg);
    }
  `;
  
  document.head.appendChild(style);
});

// Hide custom cursor on touch devices
function isTouchDevice() {
  return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);
}

if (isTouchDevice()) {
  const cursor = document.querySelector('.cursor');
  const cursorFollower = document.querySelector('.cursor-follower');
  
  if (cursor && cursorFollower) {
    cursor.style.display = 'none';
    cursorFollower.style.display = 'none';
  }
}