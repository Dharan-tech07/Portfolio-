// ==========================================================================
// DHARAN B — SENIOR ECE & AUTOMATION PORTFOLIO
// High-Performance React 18 Application with Three.js 3D Visualizer,
// Case Study Architecture Diagrams, Document Inspector & Control Dashboard
// ==========================================================================

const { useState, useEffect, useMemo, useRef } = React;

// --------------------------------------------------------------------------
// 1. Ambient Background Canvas Component (Circuit Traces & Signal Nodes)
// --------------------------------------------------------------------------
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

    const nodeCount = Math.floor(width / 110);
    const nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      radius: Math.random() * 2 + 1,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(6, 182, 212, ${0.12 * (1 - dist / 140)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(245, 158, 11, 0.45)';
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

// --------------------------------------------------------------------------
// 2. Three.js Interactive 3D Electronic Grid Visualizer for Hero
// --------------------------------------------------------------------------
function Hero3DVisualizer() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || typeof THREE === 'undefined') return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Create 3D Wireframe Icosahedron (Electronic Core Object)
    const geometry = new THREE.IcosahedronGeometry(2.2, 2);
    const material = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const coreMesh = new THREE.Mesh(geometry, material);
    scene.add(coreMesh);

    // Inner Amber Core Node
    const innerGeo = new THREE.OctahedronGeometry(1.2, 1);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    scene.add(innerMesh);

    // Orbiting Signal Ring
    const ringGeo = new THREE.TorusGeometry(3.2, 0.02, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.4,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 3;
    scene.add(ringMesh);

    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / height - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      coreMesh.rotation.x += 0.003;
      coreMesh.rotation.y += 0.005;

      innerMesh.rotation.x -= 0.006;
      innerMesh.rotation.y -= 0.004;

      ringMesh.rotation.z += 0.002;

      // Smooth mouse tilt
      coreMesh.rotation.y += (mouseX * 0.5 - coreMesh.rotation.y) * 0.05;
      coreMesh.rotation.x += (-mouseY * 0.5 - coreMesh.rotation.x) * 0.05;

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="hero-visual-wrapper" ref={containerRef}>
      <div className="hero-telemetry-overlay">
        <span>⚡ 3D Core: Reactive Mesh</span>
        <span style={{ color: 'var(--accent-gold)' }}>DHARAN.B // ECE</span>
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
// 3. Scroll Progress Component
// --------------------------------------------------------------------------
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

// --------------------------------------------------------------------------
// 4. Header & Navigation Component
// --------------------------------------------------------------------------
function Navigation({ activeSection, setActiveSection, viewMode, setViewMode }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'domains', label: 'Profile' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'experience', label: 'Experience' },
    { id: 'certifications', label: 'Certifications' },
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
            <div className="dot-pulse" />
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

          <div className="nav-actions">
            <button
              className="btn btn-secondary"
              style={{ padding: '6px 12px', fontSize: '0.8rem' }}
              onClick={() => setViewMode(viewMode === 'tabbed' ? 'scroll' : 'tabbed')}
              title="Toggle Page View vs Scroll View"
            >
              {viewMode === 'tabbed' ? '📄 Page View' : '📜 Scroll View'}
            </button>

            <button
              className="mobile-toggle"
              aria-label="Toggle Mobile Menu"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-drawer ${isMobileOpen ? 'open' : ''}`}>
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

// --------------------------------------------------------------------------
// 5. Hero Section
// --------------------------------------------------------------------------
function HeroSection({ onNavigate, data }) {
  return (
    <section id="hero" className="hero-section">
      <div className="container hero-grid">
        <div className="hero-content">
          <div className="status-badge">
            <span className="status-pulse" /> {data.personal.statusText}
          </div>

          <h1 className="hero-name">
            Dharan <span className="gradient-text">B</span>
          </h1>

          <h2 className="hero-title">{data.personal.headline}</h2>

          <p className="hero-description">{data.personal.bio}</p>

          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={() => onNavigate('projects')}>
              Explore Projects ➔
            </button>

            <a
              href={data.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              LinkedIn Profile 🔗
            </a>

            <button className="btn btn-gold" onClick={() => onNavigate('certifications')}>
              Inspect Certifications 📜
            </button>

            <button className="btn btn-secondary" onClick={() => onNavigate('contact')}>
              Contact Me ✉️
            </button>
          </div>
        </div>

        <Hero3DVisualizer />
      </div>
    </section>
  );
}

// --------------------------------------------------------------------------
// 6. Interactive Engineering Profile (Domain Cards)
// --------------------------------------------------------------------------
function EngineeringProfile({ domains }) {
  const [activeDomain, setActiveDomain] = useState(null);

  return (
    <section id="domains" className="section">
      <div className="container">
        <div className="section-head">
          <div className="section-eyebrow">01 // ENGINEERING DOMAINS</div>
          <h2 className="section-title">Technical Expertise & Capabilities</h2>
          <p className="section-lead">
            Interactive overview of core domains across embedded systems, industrial control, IoT, software, and multiphysics simulation.
          </p>
        </div>

        <div className="domains-grid">
          {domains.map((dom) => (
            <div
              key={dom.id}
              className={`glass-card domain-card ${activeDomain === dom.id ? 'gold-border' : ''}`}
              onClick={() => setActiveDomain(activeDomain === dom.id ? null : dom.id)}
              style={{ cursor: 'pointer' }}
            >
              <div>
                <div className="domain-header">
                  <div className="domain-icon-box">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                      <line x1="8" y1="21" x2="16" y2="21" />
                      <line x1="12" y1="17" x2="12" y2="21" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="domain-title">{dom.title}</h3>
                    <span style={{ fontSize: '0.78rem', color: 'var(--accent-gold)', fontFamily: 'var(--font-mono)' }}>
                      Click for details ℹ️
                    </span>
                  </div>
                </div>

                <p className="domain-desc">{dom.description}</p>
              </div>

              {activeDomain === dom.id && (
                <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border-tech)', animation: 'modal-fade-in 0.2s ease-out' }}>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '12px', lineHeight: '1.6' }}>
                    {dom.details}
                  </p>
                </div>
              )}

              <div className="tag-group">
                {dom.technologies.map((tech, idx) => (
                  <span key={idx} className="tag-pill">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --------------------------------------------------------------------------
// 7. About Section
// --------------------------------------------------------------------------
function AboutSection({ personal }) {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section-head">
          <div className="section-eyebrow">02 // ABOUT ME</div>
          <h2 className="section-title">Hands-On Engineering & Academic Background</h2>
          <p className="section-lead">
            Developing practical experience by building, testing, and troubleshooting real physical systems.
          </p>
        </div>

        <div className="about-grid">
          <div className="glass-card gold-border">
            <h3 className="about-card-title">Who I Am</h3>
            <p style={{ color: 'var(--text-main)', marginBottom: '16px', lineHeight: '1.7' }}>
              {personal.aboutHighlights.whoIAm}
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.7' }}>
              Pursuing <strong>{personal.degree}</strong> at <strong>{personal.institution}</strong> ({personal.affiliation}, Register No: <strong>{personal.registerNo}</strong>).
            </p>
            <div className="tag-group" style={{ marginTop: '16px' }}>
              <span className="tag-pill">B.E. ECE</span>
              <span className="tag-pill">Meenakshi Sundararajan Engg College</span>
              <span className="tag-pill">Reg: {personal.registerNo}</span>
            </div>
          </div>

          <div className="glass-card">
            <h3 className="about-card-title" style={{ color: 'var(--accent-cyan)' }}>What I Build</h3>
            <p style={{ color: 'var(--text-main)', marginBottom: '16px', lineHeight: '1.7' }}>
              {personal.aboutHighlights.whatIBuild}
            </p>
            <div className="tag-group">
              <span className="tag-pill">ESP32 IoT Nodes</span>
              <span className="tag-pill">Siemens TIA Portal PLCs</span>
              <span className="tag-pill">HMI Screens</span>
              <span className="tag-pill">Java & Python Apps</span>
            </div>
          </div>

          <div className="glass-card">
            <h3 className="about-card-title" style={{ color: 'var(--accent-violet)' }}>What I Am Learning</h3>
            <p style={{ color: 'var(--text-main)', marginBottom: '16px', lineHeight: '1.7' }}>
              {personal.aboutHighlights.whatIAmLearning}
            </p>
            <div className="tag-group">
              <span className="tag-pill">COMSOL Multiphysics</span>
              <span className="tag-pill">Electromagnetic Simulation</span>
              <span className="tag-pill">VFD Parameter Setup</span>
            </div>
          </div>

          <div className="glass-card">
            <h3 className="about-card-title" style={{ color: 'var(--accent-emerald)' }}>What I Want To Work On</h3>
            <p style={{ color: 'var(--text-main)', marginBottom: '16px', lineHeight: '1.7' }}>
              {personal.aboutHighlights.whatIWantToWorkOn}
            </p>
            <div className="tag-group">
              <span className="tag-pill">Industrial Automation</span>
              <span className="tag-pill">Embedded R&D</span>
              <span className="tag-pill">Smart Sensors & Control</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --------------------------------------------------------------------------
// 8. Skills Matrix
// --------------------------------------------------------------------------
function SkillsSection({ categories }) {
  const getBadgeClass = (level) => {
    if (level.includes('Strong')) return 'badge-strong';
    if (level.includes('Practical')) return 'badge-practical';
    if (level.includes('Working') || level.includes('Project')) return 'badge-working';
    return 'badge-learning';
  };

  return (
    <section id="skills" className="section">
      <div className="container">
        <div className="section-head">
          <div className="section-eyebrow">03 // SKILLS MATRIX</div>
          <h2 className="section-title">Technical Competencies</h2>
          <p className="section-lead">
            Categorized skills grounded in practical internship exposure, project execution, and academic learning.
          </p>
        </div>

        <div className="skills-grid">
          {categories.map((cat) => (
            <div key={cat.code} className="glass-card">
              <div className="skill-category-head">
                <span className="skill-category-code">{cat.code} //</span>
                <h3 className="skill-category-title">{cat.title}</h3>
              </div>

              <div>
                {cat.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="skill-item-row">
                    <span className="skill-name">{skill.name}</span>
                    <span className={`skill-badge-level ${getBadgeClass(skill.level)}`}>
                      {skill.level}
                    </span>
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

// --------------------------------------------------------------------------
// 9. Architecture Flow Diagram Component
// --------------------------------------------------------------------------
function ArchitectureFlow({ steps }) {
  return (
    <div className="flow-diagram-container">
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--accent-cyan)', marginBottom: '12px' }}>
        SYSTEM ARCHITECTURE FLOW:
      </div>

      <div className="flow-steps-grid">
        {steps.map((step, idx) => (
          <React.Fragment key={idx}>
            <div className={`flow-step-box ${idx === steps.length - 1 ? 'highlight' : ''}`}>
              <div className="flow-step-num">{step.step}</div>
              <div className="flow-step-label">{step.label}</div>
              <div className="flow-step-desc">{step.desc}</div>
            </div>
            {idx < steps.length - 1 && <span className="flow-arrow">➔</span>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
// 10. Projects Showcase & Case Study Modal
// --------------------------------------------------------------------------
function ProjectsSection({ projects }) {
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const filterOptions = ['All', 'Embedded', 'IoT', 'Automation', 'Simulation'];

  const filteredProjects = useMemo(() => {
    if (filter === 'All') return projects;
    return projects.filter((p) => p.category.toLowerCase() === filter.toLowerCase());
  }, [filter, projects]);

  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="section-head">
          <div className="section-eyebrow">04 // PROJECTS & CASE STUDIES</div>
          <h2 className="section-title">Featured Engineering Projects</h2>
          <p className="section-lead">
            Detailed engineering case studies spanning embedded hardware, industrial automation, and electromagnetic simulation.
          </p>
        </div>

        <div className="project-filter-bar">
          {filterOptions.map((opt) => (
            <button
              key={opt}
              className={`filter-btn ${filter === opt ? 'active' : ''}`}
              onClick={() => setFilter(opt)}
            >
              {opt}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredProjects.map((proj) => (
            <div key={proj.id} className="glass-card project-card">
              <div>
                <div className="project-top">
                  <span className="project-num">PROJECT {proj.num}</span>
                  <span className="tag-pill" style={{ color: proj.isLearning ? 'var(--accent-violet)' : 'var(--accent-gold)' }}>
                    {proj.status}
                  </span>
                </div>

                <h3 className="project-title">{proj.title}</h3>
                <p className="project-desc">{proj.shortDesc}</p>

                {proj.architecture && <ArchitectureFlow steps={proj.architecture} />}
              </div>

              <div>
                <div className="tag-group" style={{ marginBottom: '16px' }}>
                  {proj.technologies.map((t, idx) => (
                    <span key={idx} className="tag-pill">{t}</span>
                  ))}
                </div>

                <button
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                  onClick={() => setSelectedProject(proj)}
                >
                  View Full Case Study ➔
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Case Study Modal */}
        {selectedProject && (
          <div className="modal-backdrop" onClick={() => setSelectedProject(null)}>
            <div className="modal-box" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <div>
                  <span className="section-eyebrow" style={{ color: 'var(--accent-gold)' }}>CASE STUDY // PROJECT {selectedProject.num}</span>
                  <h2 style={{ fontSize: '1.5rem', color: 'var(--text-main)' }}>{selectedProject.title}</h2>
                </div>
                <button className="modal-close" onClick={() => setSelectedProject(null)}>✕</button>
              </div>

              <div className="modal-body">
                {selectedProject.architecture && <ArchitectureFlow steps={selectedProject.architecture} />}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', margin: '20px 0' }}>
                  <div className="glass-card">
                    <h4 style={{ color: 'var(--accent-gold)', marginBottom: '8px' }}>Problem Statement</h4>
                    <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>{selectedProject.problem}</p>
                  </div>

                  <div className="glass-card">
                    <h4 style={{ color: 'var(--accent-cyan)', marginBottom: '8px' }}>Engineering Approach</h4>
                    <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>{selectedProject.approach}</p>
                  </div>
                </div>

                <div className="glass-card" style={{ marginBottom: '20px' }}>
                  <h4 style={{ color: 'var(--accent-emerald)', marginBottom: '8px' }}>Implementation Details</h4>
                  <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.7' }}>{selectedProject.implementation}</p>
                </div>

                <div className="glass-card" style={{ marginBottom: '20px' }}>
                  <h4 style={{ color: 'var(--accent-violet)', marginBottom: '8px' }}>Key Results & Outcome</h4>
                  <p style={{ fontSize: '0.92rem', color: 'var(--text-main)', lineHeight: '1.7' }}>{selectedProject.result}</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div style={{ background: 'rgba(15,23,42,0.8)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-tech)' }}>
                    <strong style={{ color: 'var(--accent-gold)', fontSize: '0.85rem' }}>ENGINEERING CHALLENGE:</strong>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '4px' }}>{selectedProject.challenges}</p>
                  </div>

                  <div style={{ background: 'rgba(15,23,42,0.8)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-tech)' }}>
                    <strong style={{ color: 'var(--accent-cyan)', fontSize: '0.85rem' }}>FUTURE IMPROVEMENTS:</strong>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '4px' }}>{selectedProject.futureScope}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// --------------------------------------------------------------------------
// 11. Engineering Dashboard Section
// --------------------------------------------------------------------------
function EngineeringDashboard({ data }) {
  return (
    <section id="dashboard" className="section">
      <div className="container">
        <div className="section-head">
          <div className="section-eyebrow">05 // TELEMETRY & CONTROL</div>
          <h2 className="section-title">Engineering Profile Dashboard</h2>
          <p className="section-lead">
            Miniature control dashboard summarizing technical capabilities, domain distributions, and active projects.
          </p>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-panel">
            <div className="dashboard-header">
              <span className="dashboard-title">⚡ SYSTEM METRICS & DOMAIN FOCUS</span>
              <span className="tag-pill" style={{ color: 'var(--accent-emerald)' }}>Live Telemetry</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
              <div className="metric-stat-box">
                <div className="metric-number">08</div>
                <div className="metric-label">Domains</div>
              </div>
              <div className="metric-stat-box">
                <div className="metric-number">04</div>
                <div className="metric-label">Projects</div>
              </div>
              <div className="metric-stat-box">
                <div className="metric-number">04</div>
                <div className="metric-label">Certificates</div>
              </div>
              <div className="metric-stat-box">
                <div className="metric-number">72%</div>
                <div className="metric-label">NPTEL Score</div>
              </div>
            </div>

            <div style={{ background: 'rgba(7, 10, 15, 0.8)', padding: '20px', borderRadius: '10px', border: '1px solid var(--border-tech)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent-gold)', marginBottom: '12px' }}>
                TECHNOLOGY DOMAIN INTERCONNECTIONS:
              </div>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.7' }}>
                Sensors & Actuators ➔ ESP32 / Arduino Microcontroller ➔ PLC & Siemens TIA Portal ➔ HMI/SCADA Supervision ➔ COMSOL Electromagnetic Modeling ➔ Software Integration
              </p>
            </div>
          </div>

          <div className="dashboard-panel">
            <div className="dashboard-header">
              <span className="dashboard-title">📜 VERIFIED CREDENTIALS</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {data.certifications.map((c) => (
                <div key={c.id} style={{ padding: '12px', background: 'rgba(15,23,42,0.8)', border: '1px solid var(--border-tech)', borderRadius: '6px' }}>
                  <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-main)' }}>{c.title}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--accent-gold)', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>
                    Ref: {c.refId}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --------------------------------------------------------------------------
// 12. Experience Timeline
// --------------------------------------------------------------------------
function ExperienceSection({ experiences, onViewCert }) {
  return (
    <section id="experience" className="section">
      <div className="container">
        <div className="section-head">
          <div className="section-eyebrow">06 // EXPERIENCE & TRAINING</div>
          <h2 className="section-title">Industry Internships & Field Training</h2>
          <p className="section-lead">
            Verified internship experience with official training areas and clickable certificate inspection.
          </p>
        </div>

        <div className="timeline">
          {experiences.map((exp) => (
            <div key={exp.id} className="timeline-item">
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
                    docPath: exp.certPath,
                    docType: exp.certType,
                    desc: `${exp.role} at ${exp.company} (${exp.location}). ${exp.learned}`,
                  })
                }
              >
                <div className="timeline-date">{exp.period}</div>
                <h3 className="timeline-role">{exp.role}</h3>
                <div className="timeline-company">📍 {exp.company} — {exp.location}</div>

                <ul className="timeline-bullets">
                  {exp.responsibilities.map((resp, rIdx) => (
                    <li key={rIdx}>{resp}</li>
                  ))}
                </ul>

                <div className="tag-group" style={{ marginTop: '16px' }}>
                  <span className="tag-pill" style={{ color: 'var(--accent-gold)', borderColor: 'rgba(245,158,11,0.4)', fontWeight: 600 }}>
                    Inspect Certificate 🔍
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

// --------------------------------------------------------------------------
// 13. Certifications & Achievements Gallery with Inspector Modal
// --------------------------------------------------------------------------
function CertificationsSection({ certifications, achievements, onViewCert }) {
  return (
    <section id="certifications" className="section">
      <div className="container">
        <div className="section-head">
          <div className="section-eyebrow">07 // CREDENTIALS & ACHIEVEMENTS</div>
          <h2 className="section-title">Verified Certifications & Hackathons</h2>
          <p className="section-lead">
            Authentic credentials backed by official registration numbers, PDF documents, and verified completion certificates.
          </p>
        </div>

        <div className="certs-grid" style={{ marginBottom: '40px' }}>
          {certifications.map((c) => (
            <div key={c.id} className="cert-card" onClick={() => onViewCert(c)}>
              <div>
                <span className="tag-pill" style={{ color: 'var(--accent-cyan)', marginBottom: '8px' }}>{c.authority}</span>
                <h3 style={{ fontSize: '1.2rem', margin: '8px 0', color: 'var(--text-main)' }}>{c.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '16px' }}>{c.details}</p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid var(--border-tech)' }}>
                <span className="tag-pill" style={{ color: 'var(--accent-gold)' }}>Ref: {c.refId}</span>
                <span style={{ fontSize: '0.82rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>Inspect 🔍</span>
              </div>
            </div>
          ))}
        </div>

        {/* Hackathon Activity Card */}
        {achievements.map((ach) => (
          <div key={ach.id} className="glass-card gold-border">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '12px' }}>
              <div>
                <span className="section-eyebrow" style={{ color: 'var(--accent-gold)' }}>HACKATHON ACHIEVEMENT</span>
                <h3 style={{ fontSize: '1.35rem', color: 'var(--text-main)' }}>{ach.title}</h3>
              </div>
              <span className="tag-pill" style={{ color: 'var(--accent-cyan)' }}>{ach.date}</span>
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: '1.65', marginBottom: '16px' }}>
              {ach.description}
            </p>

            <button
              className="btn btn-secondary"
              onClick={() =>
                onViewCert({
                  title: ach.title,
                  authority: ach.organizer,
                  date: ach.date,
                  refId: 'CIH26-RATHINAM-NITI',
                  score: ach.badge,
                  docPath: ach.docPath,
                  docType: ach.docType,
                  details: ach.description,
                })
              }
            >
              Inspect Hackathon Certificate 📜
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

// --------------------------------------------------------------------------
// 14. Certificate Modal
// --------------------------------------------------------------------------
function CertificateModal({ cert, onClose, triggerToast }) {
  if (!cert) return null;

  const copyRef = () => {
    navigator.clipboard.writeText(cert.refId).then(() => {
      triggerToast(`Reference ID copied: ${cert.refId}`);
    });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="section-eyebrow" style={{ color: 'var(--accent-gold)' }}>DOCUMENT INSPECTOR</span>
            <h3 style={{ color: 'var(--text-main)', fontSize: '1.3rem' }}>{cert.title}</h3>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--accent-cyan)' }}>
              {cert.authority} · Ref: {cert.refId}
            </div>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <div className="doc-preview-frame">
            {cert.docType === 'image' && cert.docPath ? (
              <img src={cert.docPath} alt={`${cert.title} Document`} />
            ) : cert.docPath ? (
              <iframe src={cert.docPath} title={cert.title} width="100%" height="380px" style={{ border: 'none' }} />
            ) : (
              <div style={{ padding: '40px 20px', textAlign: 'center' }}>
                <h4 style={{ color: 'var(--accent-gold)', fontSize: '1.25rem' }}>{cert.title}</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '6px' }}>
                  {cert.authority} — Authenticated Record
                </p>
              </div>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
            <div style={{ background: 'rgba(15,23,42,0.8)', padding: '12px', borderRadius: '6px', border: '1px solid var(--border-tech)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>REFERENCE ID</div>
              <div style={{ color: 'var(--accent-gold)', fontWeight: 600, cursor: 'pointer' }} onClick={copyRef}>
                {cert.refId} 📋
              </div>
            </div>

            <div style={{ background: 'rgba(15,23,42,0.8)', padding: '12px', borderRadius: '6px', border: '1px solid var(--border-tech)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>ISSUING AUTHORITY</div>
              <div style={{ color: 'var(--text-main)', fontWeight: 600 }}>{cert.authority}</div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              ✔ Verified Record in Dharan B's Engineering Portfolio
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

// --------------------------------------------------------------------------
// 15. Contact Section & Footer
// --------------------------------------------------------------------------
function ContactSection({ personal, triggerToast }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    triggerToast('Thank you! Your message has been sent successfully.');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="section-head">
          <div className="section-eyebrow">08 // CONNECT</div>
          <h2 className="section-title">Let's Build Something Intelligent.</h2>
          <p className="section-lead">
            Open for engineering internships, collaborative R&D projects, and technical discussions.
          </p>
        </div>

        <div className="contact-grid">
          <div>
            <div className="glass-card gold-border" style={{ marginBottom: '20px' }}>
              <h4 style={{ color: 'var(--accent-gold)', marginBottom: '8px' }}>LinkedIn Profile</h4>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--accent-cyan)', textDecoration: 'none', fontWeight: 600 }}
              >
                linkedin.com/in/dharanbabu ➔
              </a>
            </div>

            <div className="glass-card">
              <h4 style={{ color: 'var(--accent-cyan)', marginBottom: '8px' }}>Location</h4>
              <p style={{ color: 'var(--text-main)' }}>{personal.location}</p>
            </div>
          </div>

          <div className="glass-card">
            <h4 style={{ marginBottom: '20px', fontSize: '1.2rem', color: 'var(--text-main)' }}>Send a Message</h4>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  className="form-input"
                  placeholder="e.g. Recruiter / Internship Coordinator"
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
                  placeholder="e.g. recruiter@company.com"
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
                  placeholder="Hello Dharan, I am reaching out regarding..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                Send Message ➔
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ personal }) {
  return (
    <footer className="site-footer">
      <div className="container footer-container">
        <div>
          <strong style={{ color: 'var(--text-main)' }}>{personal.name}</strong> — {personal.subtitle}
        </div>
        <div>© 2026 Dharan B. Designed & Built with React 18 & Three.js</div>
      </div>
    </footer>
  );
}

// --------------------------------------------------------------------------
// 16. Main App Component
// --------------------------------------------------------------------------
function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [viewMode, setViewMode] = useState('tabbed');
  const [selectedCert, setSelectedCert] = useState(null);
  const [toastMsg, setToastMsg] = useState('');
  const [showToast, setShowToast] = useState(false);

  const data = window.PORTFOLIO_DATA;

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
          <div style={{ paddingTop: 'var(--header-height)' }}>
            {activeSection === 'hero' && <HeroSection onNavigate={handleNavigate} data={data} />}
            {activeSection === 'domains' && <EngineeringProfile domains={data.domains} />}
            {activeSection === 'about' && <AboutSection personal={data.personal} />}
            {activeSection === 'skills' && <SkillsSection categories={data.skillsCategories} />}
            {activeSection === 'projects' && <ProjectsSection projects={data.projects} />}
            {activeSection === 'dashboard' && <EngineeringDashboard data={data} />}
            {activeSection === 'experience' && <ExperienceSection experiences={data.experiences} onViewCert={setSelectedCert} />}
            {activeSection === 'certifications' && <CertificationsSection certifications={data.certifications} achievements={data.achievements} onViewCert={setSelectedCert} />}
            {activeSection === 'contact' && <ContactSection personal={data.personal} triggerToast={triggerToast} />}
          </div>
        ) : (
          <>
            <HeroSection onNavigate={handleNavigate} data={data} />
            <EngineeringProfile domains={data.domains} />
            <AboutSection personal={data.personal} />
            <SkillsSection categories={data.skillsCategories} />
            <ProjectsSection projects={data.projects} />
            <EngineeringDashboard data={data} />
            <ExperienceSection experiences={data.experiences} onViewCert={setSelectedCert} />
            <CertificationsSection certifications={data.certifications} achievements={data.achievements} onViewCert={setSelectedCert} />
            <ContactSection personal={data.personal} triggerToast={triggerToast} />
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

      <Footer personal={data.personal} />

      {showToast && <div className="toast-alert">{toastMsg}</div>}
    </div>
  );
}

// Mount React 18 Root
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
