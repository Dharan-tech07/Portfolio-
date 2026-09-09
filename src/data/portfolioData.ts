import { PortfolioData } from '../types/portfolio';

export const PORTFOLIO_DATA: PortfolioData = {
  personal: {
    name: "Dharan B",
    title: "Electronics & Embedded Systems Engineer",
    headline: "Engineering Intelligent Systems from Circuit to Cloud",
    subtitle: "Electronics & Communication Engineering Student | Embedded Systems | Industrial Automation | IoT | Simulation",
    statusText: "Currently building • learning • experimenting",
    institution: "The Meenakshi Sundararajan Engineering College, Chennai",
    affiliation: "Anna University Affiliated",
    registerNo: "243115106026",
    degree: "B.E. Electronics and Communication Engineering",
    academicYears: "2023 — Present",
    location: "Chennai, Tamil Nadu, India",
    linkedin: "https://www.linkedin.com/in/dharanbabu",
    github: "https://github.com/",
    email: "dharan.b.ece@gmail.com",
    bio: "I am an Electronics & Communication Engineering student developing practical experience across industrial automation, embedded systems, IoT, and electronics. My learning approach is strongly hands-on — understanding concepts by building, testing, and troubleshooting real physical systems.",
    aboutHighlights: {
      whoIAm: "An ECE undergraduate passionate about physical computing, industrial control systems, microcontrollers, and simulation engineering.",
      whatIBuild: "Embedded IoT sensor nodes, PLC ladder logic controls, HMI monitoring interfaces, and modular software utilities in Java & Python.",
      whatIAmLearning: "COMSOL Multiphysics electromagnetic coil modeling, Siemens TIA Portal automation workflows, and advanced ESP32 wireless networking.",
      whatIWantToWorkOn: "Industrial automation systems, embedded hardware design, smart sensor networks, IoT gateways, and R&D engineering roles."
    }
  },

  domains: [
    {
      id: "embedded",
      title: "Embedded Systems",
      icon: "Cpu",
      description: "Microcontroller programming, sensor interfacing, interrupt handling, and hardware telemetry.",
      technologies: ["ESP32", "Arduino", "Sensors Interfacing", "C/C++", "SPI/I2C/UART"],
      details: "Hands-on experience configuring ESP32 and Arduino boards, processing analog/digital sensor inputs, and establishing low-power telemetry loops."
    },
    {
      id: "automation",
      title: "Industrial Automation",
      icon: "Cog",
      description: "PLC ladder logic, Siemens TIA Portal, HMI/SCADA screen layout, VFD motor control, and panel wiring.",
      technologies: ["Siemens TIA Portal", "PLC Programming", "HMI / SCADA", "Control Panels", "VFD Drives"],
      details: "Verified internship exposure at Sidco Industrial Estate, covering control panel layout, sensor wiring, PLC ladder programming, and motor drive testing."
    },
    {
      id: "iot",
      title: "IoT & Connected Systems",
      icon: "Wifi",
      description: "Cloud-connected monitoring, sensor data transmission, wireless nodes, and telemetry dashboards.",
      technologies: ["ESP32 Wi-Fi", "IoT Monitoring", "Cloud Telemetry", "MQTT/HTTP", "Sensors"],
      details: "Built prototype smart monitoring applications sending real-time environmental data to web dashboards for telemetry analysis."
    },
    {
      id: "electronics",
      title: "Electronics & Hardware",
      icon: "Zap",
      description: "Circuit fundamentals, component selection, field wiring, relay logic, and power supply design.",
      technologies: ["Digital Electronics", "Relays & Actuators", "Power Supplies", "Circuit Testing", "Multimeters"],
      details: "Practical exposure to industrial control wiring, sensor interfacing, power distribution inside control panels, and electrical fault-finding."
    },
    {
      id: "control",
      title: "Control Systems",
      icon: "Sliders",
      description: "Feedback control principles, motor starters, speed adjustment using VFDs, and industrial safety interlocks.",
      technologies: ["VFD Motor Control", "Feedback Systems", "Safety Interlocks", "Actuators", "Sensors"],
      details: "Understanding variable frequency drive parameter setup, starter contactors, and closed-loop speed control mechanisms."
    },
    {
      id: "software",
      title: "Software Development",
      icon: "Code",
      description: "Structured programming, object-oriented logic, modular code writing, and documentation.",
      technologies: ["Java", "Python", "Git", "GitHub", "Modular Logic"],
      details: "Completed software development internship engineering clean Python and Java applications adhering to project deliverables and documentation standards."
    },
    {
      id: "simulation",
      title: "Simulation & Modeling",
      icon: "Activity",
      description: "Multiphysics simulation, electromagnetic field behavior, finite element analysis, and MATLAB routines.",
      technologies: ["COMSOL Multiphysics", "Electromagnetics", "Coil Modeling", "MATLAB Basics", "EPLAN"],
      details: "Actively studying electromagnetic field simulation in COMSOL for wireless power transfer coil geometry optimization."
    },
    {
      id: "aiml",
      title: "AI / ML Exploration",
      icon: "Brain",
      description: "Exploring AI-assisted engineering tools, data analytics for sensor streams, and predictive logic.",
      technologies: ["AI-assisted Dev", "Python Data Analytics", "Signal Processing", "Algorithm Logic"],
      details: "Leveraging modern AI tooling to accelerate embedded code generation, simulation analysis, and documentation workflows."
    }
  ],

  skillsCategories: [
    {
      code: "01",
      title: "Electronics",
      icon: "Zap",
      skills: [
        { name: "Digital Electronics", level: "Strong Foundation", category: "core" },
        { name: "Circuit Testing & Debugging", level: "Practical Exposure", category: "hardware" },
        { name: "Sensors & Transducers", level: "Working Knowledge", category: "hardware" },
        { name: "Power Electronics Basics", level: "Working Knowledge", category: "core" }
      ]
    },
    {
      code: "02",
      title: "Embedded Systems",
      icon: "Cpu",
      skills: [
        { name: "Arduino IDE & Hardware", level: "Working Knowledge", category: "embedded" },
        { name: "ESP32 Microcontrollers", level: "Working Knowledge", category: "embedded" },
        { name: "Sensor Interfacing (DHT, Analog, Digital)", level: "Working Knowledge", category: "embedded" },
        { name: "SPI / I2C / UART Telemetry", level: "Project Experience", category: "embedded" }
      ]
    },
    {
      code: "03",
      title: "Industrial Automation",
      icon: "Cog",
      skills: [
        { name: "PLC Programming (Ladder Logic)", level: "Practical Exposure", category: "automation" },
        { name: "Siemens TIA Portal Basics", level: "Practical Exposure", category: "automation" },
        { name: "HMI / SCADA Layout", level: "Practical Exposure", category: "automation" },
        { name: "Electrical Control Panels", level: "Practical Exposure", category: "automation" },
        { name: "Industrial Wiring & Panel Testing", level: "Practical Exposure", category: "automation" },
        { name: "VFD Motor Drives Setup", level: "Working Knowledge", category: "automation" }
      ]
    },
    {
      code: "04",
      title: "Programming",
      icon: "Code",
      skills: [
        { name: "C / C++ (Embedded)", level: "Working Knowledge", category: "language" },
        { name: "Python", level: "Working Knowledge", category: "language" },
        { name: "Java", level: "Working Knowledge", category: "language" },
        { name: "JavaScript / React Basics", level: "Project Experience", category: "language" }
      ]
    },
    {
      code: "05",
      title: "IoT & Communication",
      icon: "Wifi",
      skills: [
        { name: "IoT Sensor Monitoring", level: "Working Knowledge", category: "iot" },
        { name: "Cloud Telemetry Dashboards", level: "Project Experience", category: "iot" },
        { name: "Wireless Transceivers", level: "Working Knowledge", category: "iot" }
      ]
    },
    {
      code: "06",
      title: "Simulation & Design",
      icon: "Activity",
      skills: [
        { name: "COMSOL Multiphysics", level: "Currently Learning", category: "simulation" },
        { name: "MATLAB Basics", level: "Working Knowledge", category: "simulation" },
        { name: "EPLAN Electric Basics", level: "Working Knowledge", category: "design" }
      ]
    },
    {
      code: "07",
      title: "Web Technologies",
      icon: "Layout",
      skills: [
        { name: "HTML5 / Modern CSS", level: "Working Knowledge", category: "web" },
        { name: "React 18 & JSX", level: "Project Experience", category: "web" },
        { name: "Responsive UI Architecture", level: "Project Experience", category: "web" }
      ]
    },
    {
      code: "08",
      title: "Tools & Platforms",
      icon: "Terminal",
      skills: [
        { name: "Git & GitHub", level: "Working Knowledge", category: "tools" },
        { name: "VS Code", level: "Working Knowledge", category: "tools" },
        { name: "Siemens TIA Portal", level: "Practical Exposure", category: "tools" }
      ]
    }
  ],

  projects: [
    {
      id: "proj-1",
      num: "01",
      title: "IoT Smart Greenhouse Monitoring System",
      category: "IoT",
      shortDesc: "An ESP32-based environmental monitoring system reading microclimate data and streaming telemetry to a cloud analytics dashboard.",
      status: "Prototype / Functional",
      isLearning: false,
      problem: "Traditional greenhouse management suffers from localized microclimate fluctuations that are difficult to track manually without real-time telemetry.",
      approach: "Engineered an embedded sensor node utilizing an ESP32 microcontroller interfaced with temperature and humidity sensors (DHT11) and soil moisture probes.",
      implementation: "Programmed C++ firmware with Wi-Fi telemetry protocols, sensor calibration algorithms, and periodic data push routines to an interactive web dashboard.",
      result: "Achieved continuous real-time environmental monitoring with reliable data telemetry and visual threshold alerts.",
      architecture: [
        { step: "01", label: "Sensors", desc: "DHT11 & Soil Probe" },
        { step: "02", label: "Microcontroller", desc: "ESP32 Board" },
        { step: "03", label: "Communication", desc: "Wi-Fi Telemetry" },
        { step: "04", label: "Cloud / Server", desc: "Data Ingestion API" },
        { step: "05", label: "Dashboard", desc: "Live Analytics UI" }
      ],
      technologies: ["ESP32", "DHT11", "C++", "Sensors", "IoT Telemetry", "Web Dashboard"],
      challenges: "Sensor noise filtering during ambient humidity spikes and ensuring stable Wi-Fi auto-reconnect logic.",
      futureScope: "Integrating relay-actuated solenoid valves for automated smart irrigation based on soil moisture thresholds."
    },
    {
      id: "proj-2",
      num: "02",
      title: "Industrial Automation & PLC Control Suite",
      category: "Automation",
      shortDesc: "Comprehensive industrial control setup featuring Siemens TIA Portal ladder programming, HMI screen mapping, and VFD motor control.",
      status: "Verified Field Training",
      isLearning: false,
      problem: "Modern manufacturing lines require synchronized relay control, safety interlocks, and real-time operator HMI feedback.",
      approach: "Studied control schematics at Sidco Industrial Estate, configured Siemens PLC ladder logic programs, mapped HMI variables, and wired field devices.",
      implementation: "Created ladder logic networks for sequential motor start/stop, emergency stop interlocks, HMI status indication screens, and VFD speed parameters.",
      result: "Demonstrated reliable automated sequence control, direct operator supervision via HMI, and verified electrical panel wiring safety.",
      architecture: [
        { step: "01", label: "Field Devices", desc: "Pushbuttons & Limit Sensors" },
        { step: "02", label: "Controller", desc: "Siemens PLC (S7 Series)" },
        { step: "03", label: "Control Logic", desc: "TIA Portal Ladder Logic" },
        { step: "04", label: "Actuation", desc: "VFD & Contactor Motors" },
        { step: "05", label: "Supervision", desc: "HMI / SCADA Display" }
      ],
      technologies: ["Siemens TIA Portal", "PLC Ladder Logic", "HMI/SCADA", "VFD Drives", "Electrical Control Panels"],
      challenges: "Debugging input wiring polarity and aligning HMI tag addressing with PLC DB registers.",
      futureScope: "Integrating Industrial Ethernet (PROFINET) communication between multiple PLC nodes."
    },
    {
      id: "proj-3",
      num: "03",
      title: "Wireless Power Transfer Coil Simulation",
      category: "Simulation",
      shortDesc: "Ongoing electromagnetic finite element simulation in COMSOL Multiphysics optimizing wireless power coil geometry and flux coupling.",
      status: "Currently Learning / R&D",
      isLearning: true,
      problem: "Wireless inductive power transfer suffers efficiency drops due to coil misalignment and suboptimal flux coupling geometry.",
      approach: "Applying magnetic field vector equations in COMSOL Multiphysics to model primary and secondary coil geometry, turn density, and ferrite shielding.",
      implementation: "Constructed 2D axisymmetric and 3D coil CAD models, defined frequency-domain AC magnetic solvers, generated adaptive meshes, and evaluated mutual inductance.",
      result: "Identified optimal coil diameter ratio and turns spacing for maximum magnetic flux linkage in simulation.",
      architecture: [
        { step: "01", label: "Geometry", desc: "Coil CAD Modeling" },
        { step: "02", label: "Physics", desc: "Magnetic Fields (mf)" },
        { step: "03", label: "Mesh", desc: "Adaptive FEM Mesh" },
        { step: "04", label: "Solver", desc: "Frequency-Domain" },
        { step: "05", label: "Results", desc: "Flux Density Distribution" }
      ],
      technologies: ["COMSOL Multiphysics", "Electromagnetics", "Finite Element Analysis", "Coil Geometry", "MATLAB"],
      challenges: "Managing computational mesh resolution around sharp coil boundaries to avoid solver non-convergence.",
      futureScope: "Fabricating physical PCB-printed coil prototypes to validate simulated coupling efficiency against experimental laboratory measurements."
    },
    {
      id: "proj-4",
      num: "04",
      title: "Embedded Microcontroller Telemetry Node",
      category: "Embedded",
      shortDesc: "Low-power microcontroller telemetry node capturing sensor signals and transmitting serial wireless packets.",
      status: "Active Prototype",
      isLearning: false,
      problem: "Need for modular, lightweight telemetry hardware to collect field sensor data in environments lacking structured network infrastructure.",
      approach: "Utilized Arduino and ESP32 platforms to build self-contained data logging nodes with analog sensor conditioning.",
      implementation: "Configured timers, ADC sampling channels, UART communication frames, and OLED local telemetry displays.",
      result: "Established stable high-speed sensor signal logging with low data packet drop rates.",
      architecture: [
        { step: "01", label: "Transducers", desc: "Analog / Digital Sensors" },
        { step: "02", label: "Conditioning", desc: "ADC & Signal Filter" },
        { step: "03", label: "Processing", desc: "Arduino / ESP32 MCU" },
        { step: "04", label: "Transceiver", desc: "Wireless Packet Encoder" },
        { step: "05", label: "Console", desc: "Serial Telemetry Log" }
      ],
      technologies: ["Arduino", "ESP32", "Sensors Interfacing", "UART/SPI", "C/C++"],
      challenges: "Calibrating ADC reference voltage stability under variable power supply loads.",
      futureScope: "Adding low-power deep sleep cycles for extended battery-operated remote deployment."
    }
  ],

  experiences: [
    {
      id: "exp-iic",
      company: "Innovative Instruments and Controls",
      role: "Industrial Automation Intern",
      period: "15 June 2026 – 25 June 2026",
      location: "Sidco Industrial Estate, Thirumudivakkam, Chennai",
      refId: "IIC/INT/2026/121",
      certType: "image",
      certPath: "Internship completion certificate_page-0001.jpg",
      responsibilities: [
        "PLC Programming & Troubleshooting using Siemens TIA Portal environment.",
        "HMI / SCADA Configuration and supervisory control screen architecture.",
        "Electrical Control Panel layout understanding, industrial sensor wiring, and field device interfacing.",
        "Motor Control and VFD Basics configuration, starter wiring, and parameter setup.",
        "Wiring, Panel Testing, Industrial Communication Basics, and site support activities."
      ],
      technologies: ["Siemens TIA Portal", "PLC Ladder Logic", "HMI/SCADA", "VFD Drives", "Electrical Panels", "Sensors"],
      learned: "Practical understanding of industrial automation standards, control panel safety, field device commissioning, and relay interlocks."
    },
    {
      id: "exp-cognifyz",
      company: "Cognifyz Technologies",
      role: "Software Development Intern",
      period: "May 2025 – June 2025",
      location: "Remote Internship",
      refId: "CTI/A1/C141089",
      certType: "pdf",
      certPath: "Software developer intern .pdf",
      responsibilities: [
        "Gained hands-on software development internship experience in Java and Python.",
        "Engineered modular code components adhering to strict technical specifications.",
        "Participated in software documentation, code reviews, and structured task delivery."
      ],
      technologies: ["Java", "Python", "Modular Software", "Documentation", "Git"],
      learned: "Clean code design patterns, structured software documentation, and disciplined development workflows."
    }
  ],

  certifications: [
    {
      id: "cert-nptel",
      title: "Introduction to Internet of Things",
      authority: "NPTEL & IIT Kharagpur (Swayam)",
      date: "Jan – Apr 2026 (12-Week Course)",
      refId: "NPTEL26CS37S1250303181",
      scoreBadge: "72% Score · 4 Academic Credits",
      docPath: "NPTEL RESULT IOT.pdf",
      docType: "pdf",
      details: "12-Week NPTEL Certification course. Score breakdown: Online Assignments 22.66/25, Proctored Examination 49.5/75. Recommended 4 academic credits by NPTEL/IIT Kharagpur."
    },
    {
      id: "cert-hplife",
      title: "Strategic Planning",
      authority: "HP Foundation (HP LIFE)",
      date: "23 January 2026",
      refId: "36095fee-f724-4dcf-8834-071bb2d03980",
      scoreBadge: "Verified Global Certification",
      docPath: "Strategic Planning.pdf",
      docType: "pdf",
      details: "Global Certification in Strategic Planning, SWOT analysis methodology, and target metrics formulation from HP LIFE program."
    },
    {
      id: "cert-iic",
      title: "Industrial Automation Internship Certificate",
      authority: "Innovative Instruments and Controls",
      date: "15 June 2026 – 25 June 2026",
      refId: "IIC/INT/2026/121",
      scoreBadge: "Verified Field Training",
      docPath: "Internship completion certificate_page-0001.jpg",
      docType: "image",
      details: "Official Internship Completion Certificate from Sidco Industrial Estate, Thirumudivakkam, Chennai, recognizing practical exposure in PLC, SCADA, VFD, and Control Panels."
    },
    {
      id: "cert-cognifyz",
      title: "Software Development Internship Certificate",
      authority: "Cognifyz Technologies",
      date: "May 2025 – June 2025",
      refId: "CTI/A1/C141089",
      scoreBadge: "Verified Software Internship",
      docPath: "Software developer intern .pdf",
      docType: "pdf",
      details: "Official Software Internship Completion Certificate verifying successful execution of programming modules in Java and Python."
    }
  ],

  achievements: [
    {
      id: "ach-rathinam",
      title: "Coimbatore Innovation Hackathon (CIH'26)",
      organizer: "AIC RAISE & Rathinam Global University (Supported by NITI Aayog)",
      date: "4th & 5th August 2026",
      category: "24-Hour Innovation Hackathon",
      badge: "Certificate of Appreciation",
      docPath: "rathinam_page.jpg",
      docType: "image",
      pdfPath: "Rathinam hackathon.pdf",
      description: "Awarded Certificate of Appreciation for active participation in the 24-Hour Coimbatore Innovation Challenge (CIH'26) organized by AIC RAISE in association with Rathinam University."
    }
  ],

  journey: [
    {
      stage: "01",
      title: "Electronics Foundations",
      subtitle: "B.E. ECE Undergraduate Entry",
      desc: "Built core understanding of digital electronics, circuit design, signal analysis, and semiconductor fundamentals at Meenakshi Sundararajan Engineering College."
    },
    {
      stage: "02",
      title: "Embedded Systems & Microcontrollers",
      subtitle: "Arduino & ESP32 Prototyping",
      desc: "Hands-on programming of microcontrollers, interfacing digital/analog sensors, and writing C++ firmware for signal processing."
    },
    {
      stage: "03",
      title: "IoT & Wireless Networks",
      subtitle: "NPTEL IoT Certification (72%)",
      desc: "Completed 12-week IIT Kharagpur course on IoT protocols, cloud telemetry, sensor data pipelines, and connected hardware design."
    },
    {
      stage: "04",
      title: "Industrial Automation Exposure",
      subtitle: "Internship at Innovative Instruments & Controls",
      desc: "Verified industrial training in Sidco Industrial Estate covering Siemens TIA Portal PLCs, SCADA screens, VFD motor control, and panel wiring."
    },
    {
      stage: "05",
      title: "Electromagnetic Simulation",
      subtitle: "COMSOL Multiphysics R&D",
      desc: "Currently modeling wireless power transfer coil geometry and magnetic flux density distribution using finite element analysis."
    },
    {
      stage: "06",
      title: "Software & Intelligent Systems",
      subtitle: "Cognifyz Internship & Modern Web Apps",
      desc: "Combining hardware, automation, Python/Java software, and web engineering to create end-to-end intelligent engineering systems."
    }
  ],

  currentlyExploring: [
    {
      id: "exp-1",
      num: "01",
      title: "Siemens TIA Portal & Advanced PLC",
      desc: "Deepening ladder logic structure, analog signal scaling, function blocks (FB/FC), and HMI alarm logging.",
      tag: "Field Automation Training"
    },
    {
      id: "exp-2",
      num: "02",
      title: "COMSOL Multiphysics",
      desc: "Learning magnetic field formulation and mesh refinement for wireless power transfer coil modeling.",
      tag: "Currently Learning / R&D"
    },
    {
      id: "exp-3",
      num: "03",
      title: "ESP32 IoT & Cloud Nodes",
      desc: "Experimenting with low-power wireless sensor networks, MQTT pub-sub, and custom telemetry UI.",
      tag: "Active Hardware Lab"
    },
    {
      id: "exp-4",
      num: "04",
      title: "AI-Assisted Engineering",
      desc: "Exploring modern AI tools for automated code documentation, simulation post-processing, and control logic validation.",
      tag: "Technological Exploration"
    }
  ],
};

// Populate optional alias fields so App.tsx fallback references always resolve
PORTFOLIO_DATA.skills = PORTFOLIO_DATA.skillsCategories;
PORTFOLIO_DATA.exploring = PORTFOLIO_DATA.currentlyExploring;
