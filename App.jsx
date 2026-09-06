// ==========================================================================
// DHARAN B — SENIOR ECE & AUTOMATION PORTFOLIO
// Built with React 18 & Glassmorphic Obsidian Silicon UI/UX Architecture
// ==========================================================================

const { useState, useEffect, useMemo, useRef } = React;

// 1. Ambient Background Canvas Component (Circuit Traces & Signal Nodes)
function AmbientCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Circuit signal nodes
    const nodeCount = Math.floor(width / 110);
    const nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle node connection lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${0.12 * (1 - dist / 150)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Render & update nodes
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(251, 191, 36, 0.4)';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="ambient-canvas" />;
}

// 2. Scroll Progress Bar Component
function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      if (totalScroll > 0) {
        setProgress((currentScroll / totalScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return <div className="scroll-progress" style={{ width: `${progress}%` }} />;
}

// 3. Header & Navigation Component
function Navigation({ activeSection, setActiveSection, viewMode, setViewMode }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'exploring', label: 'Exploring' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <>
      <header className="site-header">
        <div className="container nav-container">
          <a
            href="#hero"
            className="brand-logo"
            onClick={(e) => {
              e.preventDefault();
              setActiveSection('hero');
            }}
          >
            DHARAN<span>.B</span>
          </a>

          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={activeSection === item.id ? 'active' : ''}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveSection(item.id);
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              className={`view-mode-toggle ${viewMode === 'tabbed' ? 'active-tab-mode' : ''}`}
              onClick={() => setViewMode(viewMode === 'tabbed' ? 'scroll' : 'tabbed')}
              title="Toggle View Mode (Page View vs Continuous Scroll)"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M9 3v18" />
              </svg>
              {viewMode === 'tabbed' ? 'Page View' : 'Scroll View'}
            </button>

            <button
              className="mobile-toggle"
              aria-label="Toggle Mobile Menu"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-menu ${isMobileOpen ? 'open' : ''}`}>
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => {
              e.preventDefault();
              setActiveSection(item.id);
              setIsMobileOpen(false);
            }}
          >
            {item.label}
          </a>
        ))}
      </div>
    </>
  );
}

// 4. Hero Section Component
function Hero({ onNavigate }) {
  return (
    <section id="hero" className="hero-section">
      <div className="container hero-grid">
        <div className="hero-content">
          <div className="status-badge">
            <span className="status-pulse" /> ECE Undergraduate · Open for Internships & R&D
          </div>

          <h1 className="hero-name">Dharan <span className="gradient-text">B</span></h1>

          <h2 className="hero-title">
            Electronics & Communication Engineering Student
          </h2>

          <p className="hero-description">
            Exploring Industrial Automation, Embedded Systems & IoT — building practical experience across industrial automation, embedded systems, IoT and electronics, with a growing interest in simulation-driven engineering.
          </p>

          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={() => onNavigate('projects')}>
              Explore My Work
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>

            <a
              href="https://www.linkedin.com/in/dharanbabu"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
              Connect on LinkedIn
            </a>
          </div>
        </div>

        {/* Abstract Engineering Circuit & Waveform Visualizer */}
        <div className="hero-visual-box">
          <svg width="100%" height="100%" viewBox="0 0 400 320" fill="none">
            {/* Grid Lines */}
            <line x1="40" y1="40" x2="360" y2="40" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
            <line x1="40" y1="120" x2="360" y2="120" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
            <line x1="40" y1="200" x2="360" y2="200" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
            <line x1="40" y1="280" x2="360" y2="280" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />

            {/* Circuit Signal Paths */}
            <path d="M40 160 Q 90 60, 140 160 T 240 160 T 340 160" stroke="var(--accent-cyan)" strokeWidth="2.5" opacity="0.8" />
            <path d="M40 160 Q 100 240, 160 160 T 280 160 T 360 160" stroke="var(--accent-gold)" strokeWidth="1.5" opacity="0.6" strokeDasharray="6 6" />

            {/* System Nodes */}
            <circle cx="90" cy="110" r="5" fill="var(--accent-gold)" />
            <circle cx="140" cy="160" r="6" fill="var(--accent-cyan)" />
            <circle cx="210" cy="210" r="4" fill="var(--accent-violet)" />
            <circle cx="290" cy="110" r="5" fill="var(--accent-cyan)" />

            <text x="50" y="35" fill="var(--text-dim)" fontSize="10" fontFamily="var(--font-code)">SYSTEM TELEMETRY [433MHz / LoRa / PLC]</text>
            <text x="280" y="295" fill="var(--accent-gold)" fontSize="11" fontFamily="var(--font-code)">DHARAN.B // ECE</text>
          </svg>
        </div>
      </div>
    </section>
  );
}

// 5. About Section Component
function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section-head">
          <div className="section-eyebrow">01 // ABOUT ME</div>
          <h2 className="section-title">Practical Engineering & Technical Learning</h2>
          <p className="section-lead">Developing hands-on expertise by building, testing, and troubleshooting real physical and embedded systems.</p>
        </div>

        <div className="glass-card gold-border" style={{ marginBottom: '32px' }}>
          <p style={{ fontSize: '1.08rem', lineHeight: '1.8', color: 'var(--text-main)', marginBottom: '20px' }}>
            I am an Electronics & Communication Engineering student developing practical experience across industrial automation, embedded systems, IoT and electronics. My learning approach is strongly hands-on — understanding concepts by building, testing and troubleshooting real systems.
          </p>

          <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: 'var(--text-muted)' }}>
            My industrial exposure has introduced me to PLC programming, Siemens TIA Portal basics, HMI/SCADA, electrical control panels, sensors, motor control, VFDs, wiring and commissioning activities. Alongside automation, I continue to build skills through embedded and IoT projects and software development.
          </p>
        </div>

        <div className="about-grid">
          <div className="glass-card">
            <h4 style={{ color: 'var(--accent-gold)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
              Academic Institution
            </h4>
            <p>Pursuing B.E. ECE at <strong>The Meenakshi Sundararajan Engineering College, Chennai</strong> (Anna University affiliated, Register No: <strong>243115106026</strong>).</p>
            <div className="tag-group">
              <span className="tag-pill">B.E. ECE</span>
              <span className="tag-pill">Chennai</span>
              <span className="tag-pill">Meenakshi Sundararajan Engg College</span>
            </div>
          </div>

          <div className="glass-card">
            <h4 style={{ color: 'var(--accent-cyan)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
              Industrial Exposure
            </h4>
            <p>Verified training in industrial automation at <strong>Innovative Instruments and Controls</strong> and software development at <strong>Cognifyz Technologies</strong>.</p>
            <div className="tag-group">
              <span className="tag-pill">Siemens TIA Portal</span>
              <span className="tag-pill">PLC & SCADA</span>
              <span className="tag-pill">Control Panels</span>
              <span className="tag-pill">Software Dev</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// 6. "Currently Exploring" / Now Section Component
function CurrentlyExploring() {
  const items = [
    {
      num: '01',
      title: 'Industrial Automation',
      desc: 'Strengthening practical understanding of PLCs, control systems, HMI/SCADA and industrial hardware.',
      tag: 'Field Training & Panel Work',
    },
    {
      num: '02',
      title: 'COMSOL Multiphysics',
      desc: 'Currently learning electromagnetic simulation through an ongoing wireless power-transfer coil project.',
      tag: 'Currently Learning / Ongoing',
    },
    {
      num: '03',
      title: 'Embedded & IoT',
      desc: 'Building and experimenting with ESP32, sensors and connected monitoring systems.',
      tag: 'Active Experimentation',
    },
  ];

  return (
    <section id="exploring" className="section">
      <div className="container">
        <div className="section-head">
          <div className="section-eyebrow">02 // NOW</div>
          <h2 className="section-title">Currently Exploring</h2>
          <p className="section-lead">A snapshot of what I am actively working on and learning right now.</p>
        </div>

        <div className="exploring-grid">
          {items.map((item, idx) => (
            <div className="exploring-card" key={idx}>
              <span className="exploring-num">{item.num}</span>
              <h3 className="exploring-title">{item.title}</h3>
              <p className="exploring-desc">{item.desc}</p>
              <div className="exploring-status-tag">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
                {item.tag}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 7. Skills Matrix Component with Visual Hierarchy (No percentages!)
function SkillsMatrix() {
  const skillCategories = [
    {
      title: 'INDUSTRIAL AUTOMATION',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" strokeWidth="2">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      ),
      skills: [
        { name: 'PLC Programming', badge: 'Practical Exposure', type: 'practical' },
        { name: 'Siemens TIA Portal Basics', badge: 'Practical Exposure', type: 'practical' },
        { name: 'HMI / SCADA', badge: 'Practical Exposure', type: 'practical' },
        { name: 'Electrical Control Panels', badge: 'Practical Exposure', type: 'practical' },
        { name: 'Industrial Sensors', badge: 'Working Knowledge', type: 'working' },
        { name: 'VFD & Motor Control Basics', badge: 'Working Knowledge', type: 'working' },
        { name: 'Wiring & Panel Testing', badge: 'Practical Exposure', type: 'practical' },
        { name: 'Industrial Communication Basics', badge: 'Working Knowledge', type: 'working' },
      ],
    },
    {
      title: 'EMBEDDED & IoT',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" strokeWidth="2">
          <path d="M5 12.55a11 11 0 0 1 14.08 0" />
          <path d="M1.42 9a16 16 0 0 1 21.16 0" />
          <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
          <line x1="12" y1="20" x2="12.01" y2="20" />
        </svg>
      ),
      skills: [
        { name: 'Arduino', badge: 'Working Knowledge', type: 'working' },
        { name: 'ESP32', badge: 'Working Knowledge', type: 'working' },
        { name: 'Sensors Interfacing', badge: 'Working Knowledge', type: 'working' },
        { name: 'IoT Monitoring', badge: 'Working Knowledge', type: 'working' },
        { name: 'Cloud-connected Prototypes', badge: 'Working Knowledge', type: 'working' },
      ],
    },
    {
      title: 'ENGINEERING TOOLS & PROGRAMMING',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-violet)" strokeWidth="2">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      ),
      skills: [
        { name: 'COMSOL Multiphysics', badge: 'Currently Learning', type: 'learning' },
        { name: 'EPLAN Electric', badge: 'Working Knowledge', type: 'working' },
        { name: 'MATLAB Basics', badge: 'Working Knowledge', type: 'working' },
        { name: 'Java', badge: 'Working Knowledge', type: 'working' },
        { name: 'Python', badge: 'Working Knowledge', type: 'working' },
      ],
    },
  ];

  return (
    <section id="skills" className="section">
      <div className="container">
        <div className="section-head">
          <div className="section-eyebrow">03 // SKILLS MATRIX</div>
          <h2 className="section-title">Technical Competencies</h2>
          <p className="section-lead">Structured categorization based on practical industrial exposure and current learning goals.</p>
        </div>

        <div className="skills-grid">
          {skillCategories.map((cat, idx) => (
            <div className="skill-category-card" key={idx}>
              <div className="skill-category-head">
                {cat.icon}
                <h3>{cat.title}</h3>
              </div>

              <div className="skill-list">
                {cat.skills.map((skill, sIdx) => (
                  <div className="skill-item-row" key={sIdx}>
                    <span className="skill-name">{skill.name}</span>
                    <span className={`skill-badge badge-${skill.type}`}>{skill.badge}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 8. Experience Timeline Component featuring Official Training Bullets & Certificate Viewer
function ExperienceTimeline({ onViewCert }) {
  const experiences = [
    {
      id: 'iic-automation',
      company: 'Innovative Instruments and Controls',
      role: 'Industrial Automation Intern',
      period: '15 June 2026 – 25 June 2026',
      location: 'Sidco Industrial Estate, Thirumudivakkam, Chennai',
      refId: 'IIC/INT/2026/121',
      imageSrc: 'Internship completion certificate_page-0001.jpg',
      bullets: [
        'PLC Programming and Troubleshooting using Siemens TIA Portal.',
        'HMI / SCADA Configuration and supervisory control screen architecture.',
        'Electrical Control Panel Understanding, industrial sensor wiring, and field device interfacing.',
        'Motor Control and VFD Basics configuration and parameter setup.',
        'Wiring, Panel Testing, Industrial Communication Basics, and site support activities.',
      ],
    },
    {
      id: 'cognifyz-sw',
      company: 'Cognifyz Technologies',
      role: 'Software Development Intern',
      period: 'May 2025 – June 2025',
      location: 'Remote Internship',
      refId: 'CTI/A1/C141089',
      imageSrc: null,
      bullets: [
        'Gained hands-on software development internship experience.',
        'Engineered modular code components in Java and Python adhering to task requirements.',
        'Participated in software documentation, code reviews, and technical delivery.',
      ],
    },
  ];

  return (
    <section id="experience" className="section">
      <div className="container">
        <div className="section-head">
          <div className="section-eyebrow">04 // EXPERIENCE</div>
          <h2 className="section-title">Industry Internships & Field Training</h2>
          <p className="section-lead">Verified internship experiences with official training areas and clickable certificate inspection.</p>
        </div>

        <div className="timeline">
          {experiences.map((exp) => (
            <div className="timeline-item" key={exp.id}>
              <div className="timeline-dot" />

              <div
                className="glass-card gold-border"
                style={{ cursor: 'pointer' }}
                onClick={() =>
                  onViewCert({
                    title: exp.role,
                    authority: exp.company,
                    date: exp.period,
                    refId: exp.refId,
                    score: 'Verified Internship Completed',
                    imageSrc: exp.imageSrc,
                    desc: `${exp.role} at ${exp.company} (${exp.location}).`,
                  })
                }
              >
                <div className="timeline-date">{exp.period}</div>
                <h3 className="timeline-role">{exp.role}</h3>
                <div className="timeline-company">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {exp.company} — {exp.location}
                </div>

                <ul className="timeline-bullets">
                  {exp.bullets.map((b, bIdx) => (
                    <li key={bIdx}>{b}</li>
                  ))}
                </ul>

                <div className="tag-group" style={{ marginTop: '16px' }}>
                  <span className="tag-pill" style={{ color: 'var(--accent-gold)', borderColor: 'rgba(251,191,36,0.4)', fontWeight: 600 }}>
                    Inspect Certificate Document 🔍
                  </span>
                  <span className="tag-pill">Ref: {exp.refId}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 9. Projects Section Component
function ProjectShowcase() {
  const projects = [
    {
      num: 'PROJECT 01',
      title: 'IoT Smart Greenhouse Monitoring System',
      desc: 'An ESP32-based environmental monitoring concept using sensors to measure temperature and humidity and present the data through an IoT/cloud dashboard.',
      tech: ['ESP32', 'DHT11', 'IoT', 'Sensors'],
      status: 'Prototype / Functional',
      isLearning: false,
    },
    {
      num: 'PROJECT 02',
      title: 'Wireless Power Transfer Coil Simulation',
      desc: 'An ongoing COMSOL Multiphysics learning project exploring electromagnetic simulation and coil geometry optimization.',
      tech: ['COMSOL Multiphysics', 'Electromagnetic Simulation', 'Coil Geometry'],
      status: 'Currently Learning / Ongoing',
      isLearning: true,
    },
    {
      num: 'PROJECT 03',
      title: 'Industrial Automation & Control',
      desc: 'Experience-driven showcase covering PLC ladder logic programming, Siemens TIA Portal basics, HMI/SCADA screen design, VFD motor drives, and control panel wiring.',
      tech: ['PLC', 'Siemens TIA Portal', 'HMI/SCADA', 'VFD', 'Control Panels', 'Sensors'],
      status: 'Verified Training Exposure',
      isLearning: false,
    },
    {
      num: 'PROJECT 04',
      title: 'Embedded Systems & IoT Prototypes',
      desc: 'Hands-on experimentation with Arduino, ESP32 microcontrollers, wireless communication nodes, sensor data processing, and telemetry integration.',
      tech: ['Arduino', 'ESP32', 'Sensors', 'Communication', 'IoT Systems'],
      status: 'Active Experimentation',
      isLearning: false,
    },
  ];

  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="section-head">
          <div className="section-eyebrow">05 // PROJECTS & EXPOSURE</div>
          <h2 className="section-title">Featured Projects & Systems</h2>
          <p className="section-lead">Engineering projects spanning embedded IoT hardware, industrial control, and ongoing electromagnetic simulation.</p>
        </div>

        <div className="projects-grid">
          {projects.map((proj, idx) => (
            <div className="project-card" key={idx}>
              <div>
                <div className="project-top">
                  <span className="project-num">{proj.num}</span>
                  <span className={`project-status ${proj.isLearning ? 'learning' : ''}`}>
                    {proj.status}
                  </span>
                </div>

                <h3 className="project-title">{proj.title}</h3>
                <p className="project-desc">{proj.desc}</p>
              </div>

              <div className="project-tech">
                {proj.tech.map((t, tIdx) => (
                  <span className="tag-pill" key={tIdx}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 10. Certifications & Hackathons Vault Component
function Certifications({ onViewCert }) {
  const certs = [
    {
      id: 'nptel-iot',
      authority: 'NPTEL & IIT Kharagpur',
      title: 'Introduction to Internet of Things',
      date: 'Jan – Apr 2026 (12-Week Course)',
      refId: 'NPTEL26CS37S1250303181',
      score: '72% Score · 4 Academic Credits Recommended',
      imageSrc: null,
      desc: '12-Week NPTEL Certification course (Swayam / IIT Kharagpur). Overall score 72% (Assignment: 22.66/25, Proctored Exam: 49.5/75). Recommended 4 academic credits.',
    },
    {
      id: 'hp-life',
      authority: 'HP Foundation (HP LIFE)',
      title: 'Strategic Planning',
      date: 'Presented 23 January 2026',
      refId: '36095fee-f724-4dcf-8834-071bb2d03980',
      score: 'HP LIFE Verified Certification',
      imageSrc: null,
      desc: 'Global Certification in Strategic Planning & SWOT Analysis methodology.',
    },
    {
      id: 'iic-automation-cert',
      authority: 'Innovative Instruments and Controls',
      title: 'Industrial Automation Internship Certificate',
      date: '15 June 2026 – 25 June 2026',
      refId: 'IIC/INT/2026/121',
      score: 'Verified Field Training Certificate',
      imageSrc: 'Internship completion certificate_page-0001.jpg',
      desc: 'Official Certificate of Completion from Sidco Industrial Estate, Thirumudivakkam, Chennai.',
    },
    {
      id: 'cognifyz-cert',
      authority: 'Cognifyz Technologies',
      title: 'Software Development Internship Certificate',
      date: 'May 2025 – June 2025',
      refId: 'CTI/A1/C141089',
      score: 'Verified Software Internship',
      imageSrc: null,
      desc: 'Software Internship Completion Certificate from Cognifyz Technologies.',
    },
  ];

  return (
    <section id="certifications" className="section">
      <div className="container">
        <div className="section-head">
          <div className="section-eyebrow">06 // CREDENTIALS & HACKATHONS</div>
          <h2 className="section-title">Verified Certifications & Activities</h2>
          <p className="section-lead">Authentic credentials backed by official registration numbers and verified completion certificates.</p>
        </div>

        <div className="certs-grid" style={{ marginBottom: '40px' }}>
          {certs.map((c) => (
            <div
              className="cert-card"
              key={c.id}
              onClick={() => onViewCert(c)}
            >
              <div>
                <span className="cert-meta-label" style={{ color: 'var(--accent-cyan)' }}>{c.authority}</span>
                <h3 style={{ fontSize: '1.2rem', margin: '8px 0', color: 'var(--text-main)' }}>{c.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '16px' }}>{c.desc}</p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)' }}>
                <span className="tag-pill" style={{ color: 'var(--accent-gold)', borderColor: 'rgba(251,191,36,0.3)' }}>Ref: {c.refId}</span>
                <span style={{ fontSize: '0.82rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>Inspect 🔍</span>
              </div>
            </div>
          ))}
        </div>

        {/* Hackathon Activity Card */}
        <div className="glass-card gold-border">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '12px' }}>
            <div>
              <span className="section-eyebrow" style={{ color: 'var(--accent-gold)' }}>HACKATHON ACTIVITY</span>
              <h3 style={{ fontSize: '1.35rem', color: 'var(--text-main)' }}>Coimbatore Innovation Hackathon (CIH'26)</h3>
            </div>
            <span className="tag-pill" style={{ color: 'var(--accent-cyan)' }}>4th & 5th August 2026</span>
          </div>

          <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: '1.65', marginBottom: '16px' }}>
            24-Hour Innovation Challenge organized by AIC RAISE in association with Rathinam Global Deemed to be University (Supported by NITI Aayog). Certificate of Appreciation awarded for participation.
          </p>

          <button
            className="btn btn-secondary"
            onClick={() =>
              onViewCert({
                title: 'Coimbatore Innovation Hackathon (CIH\'26)',
                authority: 'AIC RAISE & Rathinam University (NITI Aayog)',
                date: '4th & 5th August 2026',
                refId: 'CIH26-RATHINAM-NITI',
                score: '24-Hour Hackathon Certificate of Appreciation',
                imageSrc: 'rathinam_page.jpg',
                desc: 'Certificate of Appreciation for active participation in the 24-Hour Coimbatore Innovation Hackathon.',
              })
            }
          >
            Inspect Hackathon Certificate 📜
          </button>
        </div>
      </div>
    </section>
  );
}

// 11. Education Component
function Education() {
  return (
    <section id="education" className="section">
      <div className="container">
        <div className="section-head">
          <div className="section-eyebrow">07 // EDUCATION</div>
          <h2 className="section-title">Academic Qualifications</h2>
          <p className="section-lead">Undergraduate degree pursuing core Electronics & Communication Engineering.</p>
        </div>

        <div className="glass-card gold-border">
          <div className="timeline-date">2023 — PRESENT (UNDERGRADUATE)</div>
          <h3 className="timeline-role" style={{ fontSize: '1.4rem' }}>
            B.E. Electronics and Communication Engineering
          </h3>
          <div className="timeline-company" style={{ color: 'var(--accent-gold)', fontWeight: 600 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
            The Meenakshi Sundararajan Engineering College, Chennai
          </div>
          <p style={{ color: 'var(--text-muted)', marginTop: '12px' }}>
            Affiliated to Anna University. Register Number: <strong>243115106026</strong>. Focus areas include Digital Electronics, Embedded Systems, Signals & Systems, Industrial Automation, and Electromagnetic Theory.
          </p>
        </div>
      </div>
    </section>
  );
}

// 12. Contact Component
function Contact({ triggerToast }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    triggerToast('Thank you! Your message has been submitted.');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="section-head">
          <div className="section-eyebrow">08 // CONNECT</div>
          <h2 className="section-title">Let's Connect</h2>
          <p className="section-lead">Open for engineering internships, collaborative R&D projects, and technical discussions.</p>
        </div>

        <div className="contact-grid">
          <div>
            <a
              href="https://www.linkedin.com/in/dharanbabu"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card-link"
            >
              <div>
                <span className="cert-meta-label">LinkedIn Profile</span>
                <div style={{ fontWeight: 600, color: 'var(--accent-gold)' }}>linkedin.com/in/dharanbabu</div>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>

            <div className="contact-card-link" style={{ cursor: 'default' }}>
              <div>
                <span className="cert-meta-label">Location</span>
                <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>Chennai, Tamil Nadu, India</div>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
          </div>

          <div className="glass-card">
            <h4 style={{ marginBottom: '20px', fontSize: '1.2rem' }}>Send a Message</h4>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  className="form-input"
                  placeholder="e.g. Alex Smith"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Your Email</label>
                <input
                  type="email"
                  id="email"
                  className="form-input"
                  placeholder="e.g. alex@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  className="form-textarea"
                  placeholder="Hello Dharan, I would like to connect regarding..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

// 13. Certificate Inspector Modal Window Component
function CertificateModal({ cert, onClose, triggerToast }) {
  if (!cert) return null;

  const copyRef = () => {
    navigator.clipboard.writeText(cert.refId).then(() => {
      triggerToast(`Reference ID copied: ${cert.refId}`);
    });
  };

  return (
    <div className="cert-modal-backdrop" onClick={onClose}>
      <div className="cert-modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="cert-modal-header">
          <div>
            <h3 style={{ color: 'var(--accent-gold)', fontSize: '1.3rem' }}>Document Inspector</h3>
            <div className="cert-meta-label">{cert.authority} · Ref: {cert.refId}</div>
          </div>
          <button className="cert-modal-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div className="cert-modal-body">
          <div className="cert-doc-preview-frame">
            {cert.imageSrc ? (
              <img src={cert.imageSrc} alt={`${cert.title} Document`} />
            ) : (
              <div style={{ padding: '40px 20px', textAlign: 'center' }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" strokeWidth="1.5" style={{ marginBottom: '12px' }}>
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                <h4 style={{ color: 'var(--accent-gold)', fontSize: '1.25rem' }}>{cert.title}</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '6px' }}>{cert.authority} — Verified Digital Credential</p>
              </div>
            )}
          </div>

          <div className="cert-metadata-grid">
            <div className="cert-meta-item">
              <span className="cert-meta-label">Title</span>
              <span className="cert-meta-val gold">{cert.title}</span>
            </div>
            <div className="cert-meta-item">
              <span className="cert-meta-label">Issuer</span>
              <span className="cert-meta-val">{cert.authority}</span>
            </div>
            <div className="cert-meta-item">
              <span className="cert-meta-label">Reference ID</span>
              <span className="cert-meta-val gold" onClick={copyRef} style={{ cursor: 'pointer' }}>
                {cert.refId} 📋
              </span>
            </div>
            <div className="cert-meta-item">
              <span className="cert-meta-label">Date / Period</span>
              <span className="cert-meta-val">{cert.date}</span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-dim)', fontFamily: 'var(--font-code)' }}>
              ✔ Authenticated Record in Dharan B's Engineering Portfolio
            </span>
            <button className="btn btn-primary" onClick={copyRef}>
              Copy Reference ID
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// 14. Footer Component
function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-container">
        <div>
          <strong style={{ color: 'var(--text-main)' }}>Dharan B</strong> — Electronics & Communication Engineering | Automation | Embedded Systems | IoT
        </div>
        <div>
          LinkedIn: <a href="https://www.linkedin.com/in/dharanbabu" target="_blank" rel="noopener noreferrer" className="footer-link">linkedin.com/in/dharanbabu</a>
        </div>
        <div>© 2026 Dharan B</div>
      </div>
    </footer>
  );
}

// 15. Main App Component
function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [viewMode, setViewMode] = useState('tabbed'); // 'tabbed' or 'scroll'
  const [selectedCert, setSelectedCert] = useState(null);
  const [toastMsg, setToastMsg] = useState('');
  const [showToast, setShowToast] = useState(false);

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
  };

  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);
    if (viewMode === 'scroll') {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <AmbientCanvas />
      <ScrollProgress />
      <Navigation
        activeSection={activeSection}
        setActiveSection={handleNavigate}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      <main style={{ minHeight: '80vh' }}>
        {viewMode === 'tabbed' ? (
          <div style={{ paddingTop: 'calc(var(--header-height) + 20px)' }}>
            {activeSection === 'hero' && <Hero onNavigate={handleNavigate} />}
            {activeSection === 'about' && <About />}
            {activeSection === 'exploring' && <CurrentlyExploring />}
            {activeSection === 'skills' && <SkillsMatrix />}
            {activeSection === 'experience' && <ExperienceTimeline onViewCert={setSelectedCert} />}
            {activeSection === 'projects' && <ProjectShowcase />}
            {activeSection === 'certifications' && <Certifications onViewCert={setSelectedCert} />}
            {activeSection === 'education' && <Education />}
            {activeSection === 'contact' && <Contact triggerToast={triggerToast} />}
          </div>
        ) : (
          <>
            <Hero onNavigate={handleNavigate} />
            <About />
            <CurrentlyExploring />
            <SkillsMatrix />
            <ExperienceTimeline onViewCert={setSelectedCert} />
            <ProjectShowcase />
            <Certifications onViewCert={setSelectedCert} />
            <Education />
            <Contact triggerToast={triggerToast} />
          </>
        )}
      </main>

      {selectedCert && (
        <CertificateModal
          cert={selectedCert}
          onClose={() => setSelectedCert(null)}
          triggerToast={triggerToast}
        />
      )}

      <Footer />

      {showToast && (
        <div className="toast-alert" style={{ position: 'fixed', bottom: '30px', left: '50%', transform: 'translateX(-50%)' }}>
          {toastMsg}
        </div>
      )}
    </div>
  );
}

// Mount React 18 Root
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
