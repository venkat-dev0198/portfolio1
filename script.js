/**
 * Nunavath Gowtham | AI & ML Engineer - Interactive Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. DYNAMIC MOUSE SPOTLIGHT TRACKER
  // ==========================================
  const root = document.documentElement;
  window.addEventListener('mousemove', (e) => {
    root.style.setProperty('--mouse-x', `${e.clientX}px`);
    root.style.setProperty('--mouse-y', `${e.clientY}px`);
  });

  // ==========================================
  // 2. THEME SWITCHER (DARK / LIGHT)
  // ==========================================
  const themeToggleBtn = document.getElementById('theme-toggle');
  const moonIcon = document.getElementById('moon-icon');
  const sunIcon = document.getElementById('sun-icon');

  // Check saved preference or default to dark
  const currentTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcons(currentTheme);

  themeToggleBtn.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcons(newTheme);
    showToast(`Switched to ${newTheme} theme`);
  });

  function updateThemeIcons(theme) {
    if (theme === 'light') {
      moonIcon.classList.add('hidden');
      sunIcon.classList.remove('hidden');
    } else {
      moonIcon.classList.remove('hidden');
      sunIcon.classList.add('hidden');
    }
  }

  // ==========================================
  // 3. NAVIGATION & SCROLL-SPY
  // ==========================================
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  const sections = document.querySelectorAll('section[id]');
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  // Mobile menu toggle
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });
  }

  // Close mobile menu when a link is clicked
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
    });
  });

  // Scroll-Spy to highlight current section
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 180;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
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

  // ==========================================
  // 4. INTERACTIVE AI CHAT ASSISTANT (NUNAVATH GOWTHAM)
  // ==========================================
  const chatMessages = document.getElementById('chat-messages');
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const chipButtons = document.querySelectorAll('.chip-btn');

  // Knowledge base for Nunavath Gowtham
  const aiResponses = {
    projects: `Here are Gowtham's flagship projects:<br>
    • <strong>EduGesture 3D</strong>: Real-time hand gesture recognition using MediaPipe & Computer Vision for intuitive 3D model control (rotation, zoom, movement, reset).<br>
    • <strong>AI-Based CCTV System</strong>: Crowd density estimation, anomaly detection & crime prevention monitoring with YOLOv8.<br>
    • <strong>Study Buddy AI</strong>: AI virtual tutor with doubt resolution, personalized study roadmaps, and automated quiz generation (developed during Yuva Intern).<br>
    • <strong>InterviewAI</strong>: Real-time mock interview prep with AI scoring & voice interaction.`,
    
    education: `Gowtham is pursuing <strong>B.Tech in CSE (AI & ML) [2024–2028]</strong> at <strong>Malla Reddy College of Engineering (MRCE)</strong>, Hyderabad. He completed Intermediate (MPC) from TTWRJC COE KSD-SITE and SSC from KV Remedial High School, Khammam.`,
    
    skills: `Gowtham's technical toolkit includes:<br>
    • <strong>AI & Vision</strong>: Python, MediaPipe, OpenCV, Deep Learning, LLMs & AI Tools<br>
    • <strong>Frontend & Web</strong>: React.js, JavaScript (ES6+), HTML5, CSS3, REST APIs<br>
    • <strong>Databases & Tools</strong>: MySQL, Git, GitHub, MS Office Suite, Cybersecurity Foundations`,
    
    experience: `• <strong>Junior Mobile App Developer (Yuva Intern, 06/2026–07/2026)</strong>: Engineered Study Buddy AI for student learning.<br>
    • <strong>Certifications (9 Verified)</strong>: YuvaIntern Experience, SOAR-AI Skill India (NSQF 6), ISRO AI/ML, Microsoft Generative AI, TATA Cybersecurity Analyst Simulation, IBM SkillsBuild AI, and Infosys Web Technologies (HTML5, JS, CSS3).<br>
    • <strong>Student Coordinator (TPC)</strong> at MRCE.`,
    
    resume: `You can view or download Gowtham's full official resume (PDF) right from the top navigation, the Hero section, or <a href="assets/docs/Gowtham_Resume.pdf" target="_blank" style="color: var(--color-cyan, #38bdf8); text-decoration: underline;">click here to open Gowtham's Resume PDF ↗</a>!`,

    certificates: `Gowtham holds <strong>9 verified industry credentials</strong>:<br>
    1. <strong>YuvaIntern</strong> — Junior Mobile App Developer Internship<br>
    2. <strong>Skill India / NASSCOM</strong> — SOAR - AI for Educators (NSQF Level 6)<br>
    3. <strong>ISRO (IIRS)</strong> — AI & Machine Learning Specialization<br>
    4. <strong>Microsoft & LinkedIn</strong> — Career Essentials in Generative AI<br>
    5. <strong>TATA & Forage</strong> — Cybersecurity Analyst Simulation<br>
    6. <strong>IBM SkillsBuild</strong> — Getting Started with AI<br>
    7. <strong>Infosys Springboard</strong> — JavaScript ES6+<br>
    8. <strong>Infosys Springboard</strong> — CSS3 Modern Styling<br>
    9. <strong>Infosys Springboard</strong> — HTML5 Web Architecture<br>
    <br>💡 <em>Scroll down to the Certificates section to preview any certificate PDF and see full accreditation details!</em>`,

    contact: `You can reach Gowtham directly via:<br>
    • 📧 <strong>Email</strong>: gowthamnunavath93@gmail.com<br>
    • 📞 <strong>Phone</strong>: +91-7671984469<br>
    • 🐙 <strong>GitHub</strong>: <a href="https://github.com/Gowtham711" target="_blank" style="color: var(--color-cyan, #38bdf8); text-decoration: underline;">github.com/Gowtham711</a><br>
    • 💼 <strong>LinkedIn</strong>: <a href="https://www.linkedin.com/in/gowtham711/" target="_blank" style="color: var(--color-cyan, #38bdf8); text-decoration: underline;">linkedin.com/in/gowtham711</a><br>
    • 📍 <strong>Location</strong>: Khammam / Hyderabad, Telangana, India<br>
    • Or click <strong>"Connect / Hire"</strong> in the top header to send a direct message!`,
    
    edugesture: `<strong>EduGesture 3D</strong> is an AI-powered interactive learning platform enabling teachers and students to interact with 3D models using natural hand gestures. Built using Python, MediaPipe, OpenCV, and computer vision with 3D landmark detection!`,
    
    cctv: `The <strong>AI-Based CCTV System</strong> performs real-time video analysis for automated crowd density tracking, suspicious behavior identification, and crime prevention in workplace and public environments. Built with <strong>Python, YOLOv8, and OpenCV</strong>.<br><br>💡 <em>Tip: Click on the "AI-Based CCTV System" card in the Projects section to view the interactive 5-step process and live screenshots!</em>`,
    
    default: `Thanks for asking! I'm Nunavath Gowtham's portfolio AI. Gowtham is a B.Tech CSE (AI & ML) engineer specializing in Computer Vision, Generative AI, and full-stack applications. How can I help you learn more about his work, certifications, resume, or get in touch?`
  };

  function appendMessage(sender, text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg ${sender === 'user' ? 'user-msg' : 'bot-msg'}`;
    
    const avatar = document.createElement('div');
    avatar.className = 'msg-avatar';
    avatar.textContent = sender === 'user' ? 'YOU' : 'NG';

    const bubble = document.createElement('div');
    bubble.className = 'msg-bubble';
    bubble.innerHTML = text;

    msgDiv.appendChild(avatar);
    msgDiv.appendChild(bubble);
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function handleUserQuery(query) {
    if (!query.trim()) return;
    appendMessage('user', query);
    chatInput.value = '';

    // Simulate AI thinking and response
    setTimeout(() => {
      const q = query.toLowerCase();
      let response = aiResponses.default;

      if (q.includes('resume') || q.includes('cv') || q.includes('curriculum')) {
        response = aiResponses.resume;
      } else if (q.includes('certif') || q.includes('credential') || q.includes('license') || q.includes('nasscom') || q.includes('infosys') || q.includes('isro')) {
        response = aiResponses.certificates;
      } else if (q.includes('project') || q.includes('work') || q.includes('built')) {
        response = aiResponses.projects;
      } else if (q.includes('education') || q.includes('college') || q.includes('mrce') || q.includes('school') || q.includes('degree')) {
        response = aiResponses.education;
      } else if (q.includes('skill') || q.includes('tech') || q.includes('stack') || q.includes('python') || q.includes('react')) {
        response = aiResponses.skills;
      } else if (q.includes('experience') || q.includes('intern') || q.includes('yuva')) {
        response = aiResponses.experience;
      } else if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('hire') || q.includes('reach') || q.includes('number')) {
        response = aiResponses.contact;
      } else if (q.includes('edugesture') || q.includes('gesture') || q.includes('mediapipe') || q.includes('3d')) {
        response = aiResponses.edugesture;
      } else if (q.includes('cctv') || q.includes('crowd') || q.includes('surveillance')) {
        response = aiResponses.cctv;
      }

      appendMessage('bot', response);
    }, 400);
  }

  if (chatForm) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleUserQuery(chatInput.value);
    });
  }

  chipButtons.forEach(chip => {
    chip.addEventListener('click', () => {
      const query = chip.getAttribute('data-query');
      handleUserQuery(query);
    });
  });

  // ==========================================
  // 5. SKILLS MATRIX FILTER TABS
  // ==========================================
  const skillTabs = document.querySelectorAll('.skill-tab');
  const skillCards = document.querySelectorAll('.skill-card');

  skillTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      skillTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const category = tab.getAttribute('data-category');
      skillCards.forEach(card => {
        const cardCat = card.getAttribute('data-cat');
        if (category === 'all' || cardCat === category) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.3s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ==========================================
  // 6. 3D MINDSET CAROUSEL INTERACTION
  // ==========================================
  const mindsetItems = document.querySelectorAll('.mindset-card-item');
  mindsetItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      mindsetItems.forEach(i => {
        i.className = 'mindset-card-item';
      });

      if (index === 0) {
        mindsetItems[0].classList.add('card-center');
        mindsetItems[1].classList.add('card-right');
        mindsetItems[2].classList.add('card-left');
      } else if (index === 1) {
        mindsetItems[0].classList.add('card-left');
        mindsetItems[1].classList.add('card-center');
        mindsetItems[2].classList.add('card-right');
      } else {
        mindsetItems[0].classList.add('card-right');
        mindsetItems[1].classList.add('card-left');
        mindsetItems[2].classList.add('card-center');
      }
    });
  });

  // ==========================================
  // 7. COMPREHENSIVE CERTIFICATES DATASET & GALLERY
  // ==========================================
  const certificatesData = [
    {
      id: 'yuva-intern',
      thumbImg: 'assets/cert-thumbs/yuva-intern.jpg',
      title: 'Junior Mobile App Developer Internship',
      issuer: 'YuvaIntern (Henry Harvin Education & NSDC)',
      issuerShort: 'YuvaIntern',
      category: 'internship',
      date: 'August 16, 2026',
      certNo: 'YI/2026/84421/250345',
      pdfUrl: 'assets/docs/YuvaIntern_Experience_Certificate.pdf',
      verifyUrl: 'https://yuvaintern.com/',
      badge: 'Internship & Industry Experience',
      accentColor: '#10b981',
      accentGlow: 'rgba(16, 185, 129, 0.35)',
      icon: '💼',
      signatory: 'Kounal Gupta, Founder YuvaIntern.com',
      description: 'Successfully completed the Junior Mobile App Developer Virtual Internship in Coimbatore. Demonstrated consistent dedication, technical problem-solving, and integrity throughout the development of intelligent mobile solutions.',
      projectHighlight: 'Study Buddy AI — Built an AI-powered virtual study assistant providing real-time doubt resolution, personalized study roadmaps, automated quiz generation, and progress tracking.',
      skills: ['Mobile App Dev', 'AI Virtual Assistant', 'Python', 'Study Buddy AI', 'API Integration', 'Problem Solving']
    },
    {
      id: 'skill-india-soar',
      thumbImg: 'assets/cert-thumbs/ibm-ai.jpg',
      title: 'SOAR - AI for Educators (NSQF Level 6)',
      issuer: 'NASSCOM & NCVET (Skill India)',
      issuerShort: 'Skill India / NASSCOM',
      category: 'ai-ml',
      date: 'January 22, 2026',
      certNo: '2024060322074800-132926',
      apaarId: '951877547360',
      pdfUrl: 'assets/docs/SkillIndia_SOAR_AI_Educators.pdf',
      verifyUrl: '',
      badge: 'Govt. Recognized • NSQF Level 6',
      accentColor: '#f59e0b',
      accentGlow: 'rgba(245, 158, 11, 0.35)',
      icon: '🇮🇳',
      signatory: 'Sindhu Gangadharan, Chairperson NASSCOM',
      description: 'National Skill Qualification Framework (NSQF Level 6) competency certification assessed by Embedded Assessment. Covers foundational AI integration, intelligent learning platforms, and digital educational tools (10 Hours, 1.5 Credits).',
      projectHighlight: 'Accredited in AI application architectures, intelligent pedagogy tools, and responsible AI deployment in educational environments.',
      skills: ['AI for Education', 'NSQF Level 6', 'AI Architectures', 'Digital Learning', 'NASSCOM Certified']
    },
    {
      id: 'isro-ai-ml',
      thumbImg: 'assets/cert-thumbs/isro-aiml.jpg',
      title: 'AI/ML for Geodata Analytics',
      issuer: 'Indian Space Research Organisation (ISRO - IIRS)',
      issuerShort: 'ISRO / IIRS',
      category: 'ai-ml',
      date: 'September 9, 2026',
      certNo: '2026234323907 (UID: iEoo710LUV)',
      pdfUrl: 'assets/docs/ISRO_AI_ML.pdf',
      verifyUrl: 'https://isrolms.iirs.gov.in/mod/customcert/verify_certificate.php',
      badge: 'Govt Space & Research Credential',
      accentColor: '#06b6d4',
      accentGlow: 'rgba(6, 182, 212, 0.35)',
      icon: '🛰️',
      signatory: 'Director, Indian Institute of Remote Sensing (IIRS / ISRO), Dehradun',
      description: 'Completed the 10-hour specialized online course "AI/ML for Geodata Analytics" conducted by the Indian Institute of Remote Sensing (IIRS), ISRO, Department of Space, Government of India (03 Aug 2026 – 14 Aug 2026).',
      projectHighlight: 'Implemented machine learning models, convolutional neural networks, spatial telemetry processing, and remote sensing imagery classification.',
      skills: ['AI/ML Geodata Analytics', 'Remote Sensing', 'Computer Vision', 'Deep Learning', 'Spatial Analytics', 'ISRO Certified']
    },
    {
      id: 'microsoft-genai',
      thumbImg: 'assets/cert-thumbs/microsoft-genai.jpg',
      title: 'Career Essentials in Generative AI',
      issuer: 'Microsoft & LinkedIn Learning',
      issuerShort: 'Microsoft',
      category: 'ai-ml',
      date: 'July 11, 2026',
      certNo: 'Verified via LinkedIn Learning',
      pdfUrl: 'assets/docs/Microsoft_LinkedIn_Generative_AI.pdf',
      verifyUrl: 'https://www.linkedin.com/learning/certificates/',
      badge: 'Industry Leading AI Credential',
      accentColor: '#a855f7',
      accentGlow: 'rgba(168, 85, 247, 0.35)',
      icon: '🤖',
      signatory: 'Microsoft & LinkedIn Learning Certification Team',
      description: 'Comprehensive 4-hour 18-minute learning pathway covering Generative AI systems, Large Language Models (LLMs), Microsoft Copilot ecosystem, prompt design methodologies, and AI ethics.',
      projectHighlight: 'Mastered prompt engineering, transformer model capabilities, text-to-code generation, and ethical frameworks for responsible AI deployment.',
      skills: ['Generative AI', 'LLMs', 'Microsoft Copilot', 'Prompt Engineering', 'AI Ethics', 'Transformers']
    },
    {
      id: 'tata-cybersecurity',
      thumbImg: 'assets/cert-thumbs/tata-cyber.jpg',
      title: 'Cybersecurity Analyst Job Simulation',
      issuer: 'TATA & Forage',
      issuerShort: 'TATA Group',
      category: 'internship',
      date: 'July 20, 2026',
      certNo: 'Forage Verified Simulation',
      pdfUrl: 'assets/docs/TATA_Cybersecurity_Simulation.pdf',
      verifyUrl: 'https://www.theforage.com/simulations/tata/',
      badge: 'Enterprise Simulation Program',
      accentColor: '#3b82f6',
      accentGlow: 'rgba(59, 130, 246, 0.35)',
      icon: '🛡️',
      signatory: 'TATA Group Cybersecurity & Forage',
      description: 'Completed realistic enterprise cybersecurity engineering tasks including Identity & Access Management (IAM) strategy assessment, IAM architecture design, platform integration, and risk analysis.',
      projectHighlight: 'Designed robust IAM role matrices, evaluated enterprise attack vectors, and formulated least-privilege security policies for scalable cloud ecosystems.',
      skills: ['Identity & Access Mgmt (IAM)', 'Risk Assessment', 'Vulnerability Analysis', 'Security Best Practices', 'Platform Integration']
    },
    {
      id: 'ibm-ai',
      thumbImg: 'assets/cert-thumbs/ibm-ai.jpg',
      title: 'Getting Started with Artificial Intelligence',
      issuer: 'IBM SkillsBuild',
      issuerShort: 'IBM',
      category: 'ai-ml',
      date: 'January 20, 2026',
      certNo: 'PLAN-E624C2604060',
      pdfUrl: 'assets/docs/IBM_Getting_Started_with_AI.pdf',
      verifyUrl: 'https://skillsbuild.org/',
      badge: 'Global Tech Foundation',
      accentColor: '#6366f1',
      accentGlow: 'rgba(99, 102, 241, 0.35)',
      icon: '💡',
      signatory: 'IBM SkillsBuild Learning Builder',
      description: 'Rigorous foundation in Artificial Intelligence principles, supervised & unsupervised machine learning, natural language processing (NLP), computer vision, and neural networks.',
      projectHighlight: 'Gained comprehensive foundational mastery of AI algorithm classifications, training paradigms, and ethical model governance.',
      skills: ['Artificial Intelligence', 'Natural Language Processing', 'Computer Vision', 'Machine Learning', 'Neural Networks']
    },
    {
      id: 'infosys-js',
      thumbImg: 'assets/cert-thumbs/infosys-web.jpg',
      title: 'JavaScript Course Completion Certificate',
      issuer: 'Infosys Springboard',
      issuerShort: 'Infosys',
      category: 'web-dev',
      date: 'February 1, 2026',
      certNo: 'Verified via Wingspan QR',
      pdfUrl: 'assets/docs/Infosys_JavaScript.pdf',
      verifyUrl: 'https://verify.onwingspan.com',
      badge: 'Full Stack Web Engineering',
      accentColor: '#f59e0b',
      accentGlow: 'rgba(245, 158, 11, 0.35)',
      icon: '⚡',
      signatory: 'Satheesha B. Nanjappa, SVP & Head Education, Infosys Ltd',
      description: 'Comprehensive certification in Modern JavaScript (ES6+), asynchronous runtime mechanics, Promises, Async/Await, DOM manipulation, modular code architecture, and web performance.',
      projectHighlight: 'Built dynamic client-side interfaces and asynchronous state-driven components using modern vanilla JavaScript.',
      skills: ['JavaScript ES6+', 'Async / Await', 'DOM Manipulation', 'Event-Driven Architecture', 'REST APIs']
    },
    {
      id: 'infosys-css3',
      thumbImg: 'assets/cert-thumbs/infosys-web.jpg',
      title: 'CSS3 Course Completion Certificate',
      issuer: 'Infosys Springboard',
      issuerShort: 'Infosys',
      category: 'web-dev',
      date: 'February 1, 2026',
      certNo: 'Verified via Wingspan QR',
      pdfUrl: 'assets/docs/Infosys_CSS3.pdf',
      verifyUrl: 'https://verify.onwingspan.com',
      badge: 'Modern UI & Styling',
      accentColor: '#8b5cf6',
      accentGlow: 'rgba(139, 92, 246, 0.35)',
      icon: '🎨',
      signatory: 'Satheesha B. Nanjappa, SVP & Head Education, Infosys Ltd',
      description: 'Certified in modern responsive web styling, CSS Grid, Flexbox layouts, CSS animations, keyframe transitions, pseudo-elements, and responsive design systems.',
      projectHighlight: 'Created highly polished, fluid glassmorphic user interfaces and responsive cross-device layouts.',
      skills: ['CSS3', 'Flexbox & CSS Grid', 'Keyframe Animations', 'Responsive Web Design', 'Glassmorphism']
    },
    {
      id: 'infosys-html5',
      thumbImg: 'assets/cert-thumbs/infosys-web.jpg',
      title: 'HTML5 - The Language Certificate',
      issuer: 'Infosys Springboard',
      issuerShort: 'Infosys',
      category: 'web-dev',
      date: 'January 30, 2026',
      certNo: 'Verified via Wingspan QR',
      pdfUrl: 'assets/docs/Infosys_HTML5.pdf',
      verifyUrl: 'https://verify.onwingspan.com',
      badge: 'Web Architecture Fundamentals',
      accentColor: '#ea580c',
      accentGlow: 'rgba(234, 88, 12, 0.35)',
      icon: '🌐',
      signatory: 'Satheesha B. Nanjappa, SVP & Head Education, Infosys Ltd',
      description: 'Deep dive into semantic HTML5 markup, accessibility guidelines (WCAG), embedded multimedia, form validation APIs, and search engine optimization (SEO) best practices.',
      projectHighlight: 'Implemented semantic web document hierarchies and accessible UI components.',
      skills: ['HTML5', 'Semantic Web', 'Web Accessibility (a11y)', 'SEO Optimization', 'Form Validation']
    }
  ];

  const certificatesContainer = document.getElementById('certificates-container');
  const certFilterBtns = document.querySelectorAll('.cert-filter-btn');

  function renderCertificates(filter = 'all') {
    if (!certificatesContainer) return;

    const filtered = (filter === 'all') 
      ? certificatesData 
      : certificatesData.filter(c => c.category === filter);

    certificatesContainer.innerHTML = filtered.map(cert => `
      <div class="cert-card glass-card" data-id="${cert.id}" style="--card-accent-color: ${cert.accentColor}; --card-accent-glow: ${cert.accentGlow};">
        
        ${cert.thumbImg ? `
        <div class="cert-thumb-wrapper">
          <img src="${cert.thumbImg}" alt="${escapeHtml(cert.title)} certificate preview" class="cert-thumb-img" loading="lazy" onerror="this.parentElement.style.display='none'">
          <div class="cert-thumb-overlay">
            <span class="cert-thumb-tag">${escapeHtml(cert.badge)}</span>
          </div>
        </div>` : ''}

        <div class="cert-card-header">
          <div class="cert-issuer-group">
            <div class="cert-issuer-icon">${cert.icon}</div>
            <span class="cert-issuer-name">${escapeHtml(cert.issuerShort)}</span>
          </div>
          <span class="cert-verified-pill">✓ Verified</span>
        </div>

        <h3 class="cert-card-title">${escapeHtml(cert.title)}</h3>
        <p class="cert-card-desc">${escapeHtml(cert.description)}</p>

        <div class="cert-card-meta">
          <span>📅 ${escapeHtml(cert.date)}</span>
          <span>ID: ${escapeHtml(cert.certNo.length > 18 ? cert.certNo.substring(0, 18) + '...' : cert.certNo)}</span>
        </div>

        <div class="cert-skills-tags">
          ${cert.skills.slice(0, 3).map(s => `<span class="cert-tag">${escapeHtml(s)}</span>`).join('')}
          ${cert.skills.length > 3 ? `<span class="cert-tag">+${cert.skills.length - 3} more</span>` : ''}
        </div>

        <div class="cert-card-actions">
          <button class="cert-btn btn-info" data-action="info" data-id="${cert.id}">
            🔍 Info & Preview
          </button>
          <a href="${cert.pdfUrl}" target="_blank" class="cert-btn btn-pdf" data-action="pdf" onclick="event.stopPropagation()">
            📄 Open PDF ↗
          </a>
        </div>
      </div>
    `).join('');

    // Attach click listeners to cards
    certificatesContainer.querySelectorAll('.cert-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const certId = card.getAttribute('data-id');
        const cert = certificatesData.find(c => c.id === certId);
        if (cert) openCertificateModal(cert);
      });
    });

    certificatesContainer.querySelectorAll('button[data-action="info"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const certId = btn.getAttribute('data-id');
        const cert = certificatesData.find(c => c.id === certId);
        if (cert) openCertificateModal(cert);
      });
    });
  }

  // Filter Buttons
  certFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      certFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      renderCertificates(filter);
    });
  });

  // Initial render
  renderCertificates('all');

  // ==========================================
  // 8. CERTIFICATE VIEWER MODAL LOGIC
  // ==========================================
  const modalCertViewer = document.getElementById('modal-cert-viewer');
  const certViewerIcon = document.getElementById('cert-viewer-icon');
  const certViewerBadge = document.getElementById('cert-viewer-badge');
  const certViewerIssuerTag = document.getElementById('cert-viewer-issuer-tag');
  const certViewerTitle = document.getElementById('cert-viewer-title');
  const certViewerNewtabBtn = document.getElementById('cert-viewer-newtab-btn');
  const certViewerDownloadBtn = document.getElementById('cert-viewer-download-btn');
  const certPdfIframe = document.getElementById('cert-pdf-iframe');
  const certPdfLoading = document.getElementById('cert-pdf-loading');
  const certPdfFilename = document.getElementById('cert-pdf-filename');
  const certPdfDirectLink = document.getElementById('cert-pdf-direct-link');
  const certInfoIssuer = document.getElementById('cert-info-issuer');
  const certInfoDate = document.getElementById('cert-info-date');
  const certInfoId = document.getElementById('cert-info-id');
  const certInfoDesc = document.getElementById('cert-info-desc');
  const certInfoProject = document.getElementById('cert-info-project');
  const certInfoSkills = document.getElementById('cert-info-skills');
  const certInfoSignatory = document.getElementById('cert-info-signatory');
  const certVerifyLinkContainer = document.getElementById('cert-verify-link-container');
  const certVerifyUrl = document.getElementById('cert-verify-url');

  function openCertificateModal(cert) {
    if (!modalCertViewer || !cert) return;

    certViewerIcon.textContent = cert.icon;
    certViewerBadge.textContent = cert.badge;
    certViewerIssuerTag.textContent = cert.issuerShort;
    certViewerTitle.textContent = cert.title;

    certViewerNewtabBtn.href = cert.pdfUrl;
    certViewerDownloadBtn.href = cert.pdfUrl;
    certViewerDownloadBtn.setAttribute('download', `${cert.title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`);

    certPdfFilename.textContent = cert.pdfUrl.split('/').pop();
    certPdfDirectLink.href = cert.pdfUrl;

    certInfoIssuer.textContent = cert.issuer;
    certInfoDate.textContent = cert.date;
    certInfoId.textContent = cert.certNo;
    certInfoDesc.textContent = cert.description;
    certInfoProject.textContent = cert.projectHighlight;
    certInfoSignatory.textContent = cert.signatory;

    // Skills pills
    certInfoSkills.innerHTML = cert.skills.map(s => `<span class="cert-skill-tag">${escapeHtml(s)}</span>`).join('');

    // Verification link
    if (cert.verifyUrl) {
      certVerifyLinkContainer.classList.remove('hidden');
      certVerifyUrl.href = cert.verifyUrl;
    } else {
      certVerifyLinkContainer.classList.add('hidden');
    }

    // Load PDF in iframe with smooth transition
    certPdfLoading.classList.remove('hidden');
    certPdfIframe.src = cert.pdfUrl;
    certPdfIframe.onload = () => {
      certPdfLoading.classList.add('hidden');
    };

    openModal(modalCertViewer);
  }

  // ==========================================
  // 9. RESUME MODAL & TRIGGERS
  // ==========================================
  const modalResume = document.getElementById('modal-resume');
  const navResumeBtn = document.getElementById('nav-resume-btn');
  const mobileResumeBtn = document.getElementById('mobile-resume-btn');
  const heroResumeBtn = document.getElementById('hero-resume-btn');
  const bannerViewResumeBtn = document.getElementById('banner-view-resume-btn');
  const resumeHireBtn = document.getElementById('resume-hire-btn');

  function openResumeModal() {
    if (modalResume) openModal(modalResume);
  }

  if (navResumeBtn) navResumeBtn.addEventListener('click', openResumeModal);
  if (mobileResumeBtn) mobileResumeBtn.addEventListener('click', openResumeModal);
  if (heroResumeBtn) heroResumeBtn.addEventListener('click', openResumeModal);
  if (bannerViewResumeBtn) bannerViewResumeBtn.addEventListener('click', openResumeModal);

  if (resumeHireBtn) {
    resumeHireBtn.addEventListener('click', () => {
      closeModal(modalResume);
      openModal(modalBookCall);
    });
  }

  // ==========================================
  // 10. MODALS MANAGER
  // ==========================================
  const modalBookCall = document.getElementById('modal-book-call');
  const modalGuestbook = document.getElementById('modal-guestbook');
  const modalAchievements = document.getElementById('modal-achievements');
  const modalLinks = document.getElementById('modal-links');
  const modalCctvWalkthrough = document.getElementById('modal-cctv-walkthrough');

  // Trigger buttons
  const bookCallBtns = [document.getElementById('book-call-btn'), document.getElementById('mobile-book-btn')];
  const openGuestbookBtn = document.getElementById('open-guestbook-btn');
  const openAchievementsBtn = document.getElementById('open-achievements-btn');
  const openLinksBtn = document.getElementById('open-links-btn');
  const openCctvWalkthroughBtn = document.getElementById('open-cctv-walkthrough-btn');
  const cctvCanvasTrigger = document.getElementById('cctv-canvas-trigger');

  function openModal(modal) {
    if (modal) {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal(modal) {
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  bookCallBtns.forEach(btn => {
    if (btn) btn.addEventListener('click', () => openModal(modalBookCall));
  });

  if (openGuestbookBtn) openGuestbookBtn.addEventListener('click', () => openModal(modalGuestbook));
  if (openAchievementsBtn) openAchievementsBtn.addEventListener('click', () => openModal(modalAchievements));
  // EduGesture Walkthrough Logic
  const modalEdugestureWalkthrough = document.getElementById('modal-edugesture-walkthrough');
  const openEdugestureWalkthroughBtn = document.getElementById('open-edugesture-walkthrough-btn');
  const edugestureCanvasTrigger = document.getElementById('edugesture-canvas-trigger');
  const edugestureStepTabs = document.querySelectorAll('.edugesture-step-tab');
  const edugestureSlides = document.querySelectorAll('.edugesture-slide');
  const edugesturePrevBtn = document.getElementById('edugesture-prev-btn');
  const edugestureNextBtn = document.getElementById('edugesture-next-btn');
  const edugestureStepCounter = document.getElementById('edugesture-current-step-num');
  const edugestureModalBody = document.querySelector('.edugesture-modal-body');
  const edugestureMiniThumbs = document.querySelectorAll('.project-mini-gallery .mini-thumb');
  const edugestureMainScreenshot = document.querySelector('.project-screenshot-main');

  let currentEdugestureStep = 1;
  const totalEdugestureSteps = edugestureSlides.length || 3;

  function setEdugestureStep(step) {
    let targetStep = parseInt(step, 10);
    if (isNaN(targetStep) || targetStep < 1) targetStep = 1;
    if (targetStep > totalEdugestureSteps) targetStep = totalEdugestureSteps;
    currentEdugestureStep = targetStep;

    // Update tab pills
    edugestureStepTabs.forEach(tab => {
      const tabStep = parseInt(tab.getAttribute('data-step'), 10);
      if (tabStep === currentEdugestureStep) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    // Update slides
    edugestureSlides.forEach(slide => {
      const slideStep = parseInt(slide.getAttribute('data-slide'), 10);
      if (slideStep === currentEdugestureStep) {
        slide.classList.add('active');
        slide.style.display = 'block';
      } else {
        slide.classList.remove('active');
        slide.style.display = 'none';
      }
    });

    // Update counter
    if (edugestureStepCounter) {
      edugestureStepCounter.textContent = currentEdugestureStep;
    }

    // Update Prev Button state
    if (edugesturePrevBtn) {
      edugesturePrevBtn.disabled = (currentEdugestureStep === 1);
      edugesturePrevBtn.style.opacity = (currentEdugestureStep === 1) ? '0.35' : '1';
      edugesturePrevBtn.style.cursor = (currentEdugestureStep === 1) ? 'not-allowed' : 'pointer';
    }

    // Update Next Button label
    if (edugestureNextBtn) {
      const btnSpan = edugestureNextBtn.querySelector('span');
      if (btnSpan) {
        btnSpan.textContent = (currentEdugestureStep === totalEdugestureSteps) ? 'Back to Start ↺' : 'Next Step →';
      }
    }

    // Scroll modal body smoothly to top
    if (edugestureModalBody) {
      edugestureModalBody.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  if (openEdugestureWalkthroughBtn) {
    openEdugestureWalkthroughBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      setEdugestureStep(1);
      openModal(modalEdugestureWalkthrough);
    });
  }

  if (edugestureCanvasTrigger) {
    edugestureCanvasTrigger.addEventListener('click', (e) => {
      if (e.target.closest('a')) return;
      e.preventDefault();
      setEdugestureStep(1);
      openModal(modalEdugestureWalkthrough);
    });
  }

  edugestureStepTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      const step = parseInt(tab.getAttribute('data-step'), 10);
      setEdugestureStep(step);
    });
  });

  if (edugesturePrevBtn) {
    edugesturePrevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (currentEdugestureStep > 1) {
        setEdugestureStep(currentEdugestureStep - 1);
      }
    });
  }

  if (edugestureNextBtn) {
    edugestureNextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (currentEdugestureStep < totalEdugestureSteps) {
        setEdugestureStep(currentEdugestureStep + 1);
      } else {
        setEdugestureStep(1);
      }
    });
  }

  // Mini gallery hover / click to preview
  const edugestureImages = [
    'assets/edugesture/step1_hero.png',
    'assets/edugesture/step2_how_it_works.png',
    'assets/edugesture/step3_classes.png'
  ];

  edugestureMiniThumbs.forEach((thumb, idx) => {
    thumb.addEventListener('mouseenter', () => {
      edugestureMiniThumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      if (edugestureMainScreenshot && edugestureImages[idx]) {
        edugestureMainScreenshot.src = edugestureImages[idx];
      }
    });

    thumb.addEventListener('click', (e) => {
      e.stopPropagation();
      setEdugestureStep(idx + 1);
      openModal(modalEdugestureWalkthrough);
    });
  });

  // CCTV Step Switcher Logic
  const cctvStepTabs = document.querySelectorAll('.cctv-step-tab');
  const cctvSlides = document.querySelectorAll('.cctv-slide');
  const cctvPrevBtn = document.getElementById('cctv-prev-btn');
  const cctvNextBtn = document.getElementById('cctv-next-btn');
  const cctvStepCounter = document.getElementById('cctv-current-step-num');
  const cctvModalBody = document.querySelector('.cctv-modal-body');

  let currentCctvStep = 1;
  const totalCctvSteps = cctvSlides.length || 5;

  function setCctvStep(step) {
    let targetStep = parseInt(step, 10);
    if (isNaN(targetStep) || targetStep < 1) targetStep = 1;
    if (targetStep > totalCctvSteps) targetStep = totalCctvSteps;
    currentCctvStep = targetStep;

    // Update tab pills
    cctvStepTabs.forEach(tab => {
      const tabStep = parseInt(tab.getAttribute('data-step'), 10);
      if (tabStep === currentCctvStep) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    // Update slides
    cctvSlides.forEach(slide => {
      const slideStep = parseInt(slide.getAttribute('data-slide'), 10);
      if (slideStep === currentCctvStep) {
        slide.classList.add('active');
        slide.style.display = 'block';
      } else {
        slide.classList.remove('active');
        slide.style.display = 'none';
      }
    });

    // Update counter
    if (cctvStepCounter) {
      cctvStepCounter.textContent = currentCctvStep;
    }

    // Update Prev Button state
    if (cctvPrevBtn) {
      cctvPrevBtn.disabled = (currentCctvStep === 1);
      cctvPrevBtn.style.opacity = (currentCctvStep === 1) ? '0.35' : '1';
      cctvPrevBtn.style.cursor = (currentCctvStep === 1) ? 'not-allowed' : 'pointer';
    }

    // Update Next Button label
    if (cctvNextBtn) {
      const btnSpan = cctvNextBtn.querySelector('span');
      if (btnSpan) {
        btnSpan.textContent = (currentCctvStep === totalCctvSteps) ? 'Back to Start ↺' : 'Next Step →';
      }
    }

    // Scroll modal body smoothly to top for the new slide
    if (cctvModalBody) {
      cctvModalBody.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  if (openCctvWalkthroughBtn) {
    openCctvWalkthroughBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      setCctvStep(1);
      openModal(modalCctvWalkthrough);
    });
  }

  if (cctvCanvasTrigger) {
    cctvCanvasTrigger.addEventListener('click', (e) => {
      if (e.target.closest('a')) return;
      e.preventDefault();
      setCctvStep(1);
      openModal(modalCctvWalkthrough);
    });
  }

  cctvStepTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      const step = parseInt(tab.getAttribute('data-step'), 10);
      setCctvStep(step);
    });
  });

  if (cctvPrevBtn) {
    cctvPrevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (currentCctvStep > 1) {
        setCctvStep(currentCctvStep - 1);
      }
    });
  }

  if (cctvNextBtn) {
    cctvNextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (currentCctvStep < totalCctvSteps) {
        setCctvStep(currentCctvStep + 1);
      } else {
        setCctvStep(1);
      }
    });
  }

  // Allow clicking on image to advance to next step (EduGesture)
  edugestureSlides.forEach(slide => {
    const imgWrapper = slide.querySelector('.cctv-img-wrapper');
    if (imgWrapper) {
      imgWrapper.style.cursor = 'pointer';
      imgWrapper.title = 'Click image to advance to next step';
      imgWrapper.addEventListener('click', () => {
        if (currentEdugestureStep < totalEdugestureSteps) {
          setEdugestureStep(currentEdugestureStep + 1);
        } else {
          setEdugestureStep(1);
        }
      });
    }
  });

  // Keyboard navigation for EduGesture modal
  document.addEventListener('keydown', (e) => {
    if (modalEdugestureWalkthrough && modalEdugestureWalkthrough.classList.contains('open')) {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        if (currentEdugestureStep < totalEdugestureSteps) {
          setEdugestureStep(currentEdugestureStep + 1);
        } else {
          setEdugestureStep(1);
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (currentEdugestureStep > 1) {
          setEdugestureStep(currentEdugestureStep - 1);
        }
      } else if (e.key === 'Escape') {
        closeModal(modalEdugestureWalkthrough);
      }
    }
  });

  // Allow clicking on image to advance to next step (CCTV)
  cctvSlides.forEach(slide => {
    const imgWrapper = slide.querySelector('.cctv-img-wrapper');
    if (imgWrapper) {
      imgWrapper.style.cursor = 'pointer';
      imgWrapper.title = 'Click image to advance to next step';
      imgWrapper.addEventListener('click', () => {
        if (currentCctvStep < totalCctvSteps) {
          setCctvStep(currentCctvStep + 1);
        } else {
          setCctvStep(1);
        }
      });
    }
  });

  // Keyboard navigation for CCTV modal
  document.addEventListener('keydown', (e) => {
    if (modalCctvWalkthrough && modalCctvWalkthrough.classList.contains('open')) {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        if (currentCctvStep < totalCctvSteps) {
          setCctvStep(currentCctvStep + 1);
        } else {
          setCctvStep(1);
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (currentCctvStep > 1) {
          setCctvStep(currentCctvStep - 1);
        }
      } else if (e.key === 'Escape') {
        closeModal(modalCctvWalkthrough);
      }
    }
  });

  // Close buttons and backdrop clicks
  document.querySelectorAll('.modal-close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-close');
      closeModal(document.getElementById(targetId));
    });
  });

  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        closeModal(backdrop);
      }
    });
  });

  // Date and Time slot selector in Booking modal
  const dateChips = document.querySelectorAll('.date-chip');
  dateChips.forEach(chip => {
    chip.addEventListener('click', () => {
      dateChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
    });
  });

  const timeSlots = document.querySelectorAll('.time-slot');
  timeSlots.forEach(slot => {
    slot.addEventListener('click', () => {
      timeSlots.forEach(s => s.classList.remove('active'));
      slot.classList.add('active');
    });
  });

  // ==========================================
  // EMAILJS CONFIGURATION
  // ➜ Fill these in after signing up at https://www.emailjs.com
  // ==========================================
  const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';   // ← paste your EmailJS Public Key here
  const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';   // ← paste your EmailJS Service ID here
  const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';  // ← paste your EmailJS Template ID here

  // Initialize EmailJS
  if (typeof emailjs !== 'undefined') {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }

  // Handle Connect / Send Message Submission
  const bookForm = document.getElementById('book-form');
  if (bookForm) {
    bookForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name    = (document.getElementById('book-name')?.value  || '').trim();
      const email   = (document.getElementById('book-email')?.value || '').trim();
      const topic   = (document.getElementById('book-topic')?.value || '').trim();
      const day     = document.querySelector('.date-chip.active')?.getAttribute('data-date') || 'Not specified';
      const time    = document.querySelector('.time-slot.active')?.textContent?.trim()       || 'Not specified';

      if (!name || !email) {
        showToast('⚠️ Please fill in your name and email before sending.', 'warning');
        return;
      }

      // Button loading state
      const submitBtn = bookForm.querySelector('button[type="submit"]');
      const btnSpan   = submitBtn ? submitBtn.querySelector('span') : null;
      if (submitBtn) {
        submitBtn.disabled = true;
        if (btnSpan) btnSpan.textContent = 'Sending…';
      }

      const templateParams = {
        from_name    : name,
        from_email   : email,
        message      : topic || '(No message provided)',
        preferred_day: day,
        preferred_time: time,
        to_name      : 'Gowtham',
      };

      try {
        if (typeof emailjs === 'undefined' || EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
          // EmailJS not configured yet — fallback to mailto
          const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
          const body    = encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\nPreferred Day: ${day}\nPreferred Time: ${time}\n\nMessage:\n${topic}`
          );
          window.open(`mailto:gowthamnunavath93@gmail.com?subject=${subject}&body=${body}`, '_blank');
          closeModal(modalBookCall);
          showToast(`📬 Opening your mail client! Configure EmailJS for instant delivery.`);
        } else {
          await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
          closeModal(modalBookCall);
          showToast(`🎉 Message sent, ${name}! Gowtham will reply to ${email} soon.`);
        }
        bookForm.reset();
        // Reset chip/slot selections
        document.querySelectorAll('.date-chip').forEach((c, i) => c.classList.toggle('active', i === 0));
        document.querySelectorAll('.time-slot').forEach((s, i) => s.classList.toggle('active', i === 0));
      } catch (err) {
        console.error('EmailJS error:', err);
        showToast(`❌ Failed to send message. Please email Gowtham directly at gowthamnunavath93@gmail.com`);
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          if (btnSpan) btnSpan.textContent = 'Send Message / Connect';
        }
      }
    });
  }


  // ==========================================
  // 8. INTERACTIVE GUESTBOOK LOGIC
  // ==========================================
  const guestbookForm = document.getElementById('guestbook-form');
  const guestbookList = document.getElementById('guestbook-entries');

  const defaultEntries = [
    { name: 'Dr. Ramesh K.', handle: 'MRCE Faculty', message: 'EduGesture 3D is a breakthrough project combining MediaPipe with practical classroom pedagogy. Outstanding execution!', date: 'Yesterday' },
    { name: 'Priya Sharma', handle: '@priya_ml', message: 'The AI CCTV system and crowd analytics have great potential for urban safety. Keep innovating!', date: '3 days ago' },
    { name: 'Vikram Reddy', handle: 'Yuva Mentor', message: 'Diligent work on Study Buddy AI during the internship. Great problem solver and proactive learner.', date: '1 week ago' }
  ];

  let storedEntries = JSON.parse(localStorage.getItem('gowtham_guestbook_entries')) || defaultEntries;

  function renderGuestbook() {
    if (!guestbookList) return;
    guestbookList.innerHTML = storedEntries.map(entry => `
      <div class="gb-entry">
        <div class="gb-entry-author">
          <span>${escapeHtml(entry.name)} <small style="color: var(--accent-light); font-weight: normal;">${escapeHtml(entry.handle || '')}</small></span>
          <span style="font-size: 0.65rem; color: var(--muted);">${escapeHtml(entry.date || 'Just now')}</span>
        </div>
        <p class="gb-entry-text">${escapeHtml(entry.message)}</p>
      </div>
    `).join('');
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  renderGuestbook();

  if (guestbookForm) {
    guestbookForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('gb-name').value;
      const handle = document.getElementById('gb-handle').value;
      const message = document.getElementById('gb-message').value;

      storedEntries.unshift({ name, handle, message, date: 'Just now' });
      localStorage.setItem('gowtham_guestbook_entries', JSON.stringify(storedEntries));
      renderGuestbook();
      guestbookForm.reset();
      showToast('✨ Note posted to Gowtham\'s guestbook!');
    });
  }

  // ==========================================
  // 9. FOOTER TERMINAL EASTER EGG
  // ==========================================
  const terminalInput = document.getElementById('terminal-cmd');
  const runCmdBtn = document.getElementById('run-cmd-btn');
  const terminalOutput = document.getElementById('terminal-output');

  const terminalCommands = {
    help: "Available commands:\n- resume : View Nunavath Gowtham's resume details & PDF link\n- certificates : List all 9 verified certifications & credentials\n- skills : View Gowtham's AI/ML & Web skills\n- projects : List of featured AI & full-stack projects\n- education : College & academic background\n- contact : Direct email, phone & location\n- quote : Gowtham's engineering philosophy\n- clear : Clear terminal",
    resume: "OFFICIAL RESUME:\n- Nunavath Gowtham | B.Tech CSE (AI & ML) [2024-2028]\n- Malla Reddy College of Engineering (MRCE)\n- Junior Mobile App Developer (Yuva Intern, 2026)\n- Direct PDF: assets/docs/Gowtham_Resume.pdf\n- Type 'contact' to reach Gowtham directly.",
    certificates: "VERIFIED CREDENTIALS (9 Total):\n1. YuvaIntern — Junior Mobile App Developer Internship\n2. NASSCOM / Skill India — SOAR-AI for Educators (NSQF 6)\n3. ISRO (IIRS) — AI & Machine Learning Specialization\n4. Microsoft & LinkedIn — Career Essentials in Generative AI\n5. TATA & Forage — Cybersecurity Analyst Simulation\n6. IBM SkillsBuild — Getting Started with AI\n7. Infosys Springboard — JavaScript ES6+\n8. Infosys Springboard — CSS3\n9. Infosys Springboard — HTML5 - The Language",
    skills: "SKILLS RADAR:\n- AI/ML: Python, MediaPipe, OpenCV, Deep Learning, Generative AI\n- Frontend: React.js, JavaScript ES6+, HTML5, CSS3, Tailwind\n- Backend: REST APIs, MySQL, Python Flask/FastAPI\n- Tools: Git, GitHub, MS Office, Cybersecurity (IAM/Risk Analysis)",
    projects: "FEATURED PROJECTS:\n1. EduGesture 3D (MediaPipe + Computer Vision 3D Classroom Tool)\n2. AI-Based CCTV System (Crowd Detection & Crime Prevention Video Analytics)\n3. Study Buddy AI (AI Doubt Solver & Quiz Generator - Yuva Intern)\n4. InterviewAI (Interactive Mock Interview AI Prep)",
    education: "EDUCATION:\n- B.Tech CSE (AI & ML) [2024-2028] — Malla Reddy College of Engineering (MRCE)\n- Intermediate (MPC) [2022-2024] — TTWRJC COE KSD-SITE\n- SSC [2018-2022] — KV Remedial High School, Khammam",
    contact: "CONTACT INFO:\n- Name: Nunavath Gowtham\n- Email: gowthamnunavath93@gmail.com\n- Phone: +91-7671984469\n- GitHub: https://github.com/Gowtham711\n- LinkedIn: https://www.linkedin.com/in/gowtham711/\n- Location: Khammam / Hyderabad, Telangana, India",
    quote: '"Turning complex artificial intelligence into simple, empowering human experiences."'
  };

  function executeCommand() {
    const cmd = terminalInput.value.trim().toLowerCase();
    if (!cmd) return;

    terminalOutput.classList.remove('hidden');

    if (cmd === 'clear') {
      terminalOutput.textContent = '';
      terminalOutput.classList.add('hidden');
    } else if (terminalCommands[cmd]) {
      terminalOutput.textContent = `> ${cmd}\n${terminalCommands[cmd]}`;
    } else {
      terminalOutput.textContent = `> ${cmd}\nCommand not found: '${cmd}'. Type 'help' for available commands.`;
    }

    terminalInput.value = '';
  }

  if (runCmdBtn) runCmdBtn.addEventListener('click', executeCommand);
  if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') executeCommand();
    });
  }

  // ==========================================
  // 10. TOAST NOTIFICATION UTILITY
  // ==========================================
  function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }
});
