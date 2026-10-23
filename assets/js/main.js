/**
 * Guilherme Casagrande - Portfolio Main Controller
 * Typewriter, Navigation, Filter & Modal Engine
 */
document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ==========================================
  // 1. TYPEWRITER EFFECT
  // ==========================================
  const typewriterElement = document.getElementById('typewriter-text');
  const phrases = [
    'Tech Lead & Software Architect',
    'Engenheiro de Software & Desenvolvedor Full-Stack',
    'CTO & Arquiteto de Plataformas SaaS',
    'Engenharia de Agentes Autônomos & LLMs',
    'Full-Stack: Node.js • TypeScript • React • GraphQL'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 80;

  function typeEffect() {
    if (!typewriterElement) return;
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 40;
    } else {
      typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 80;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      typeSpeed = 2200;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 400;
    }

    setTimeout(typeEffect, typeSpeed);
  }

  typeEffect();

  // ==========================================
  // 2. NAVBAR SCROLL & ACTIVE LINK SPY
  // ==========================================
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
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
  });

  // Mobile Menu Toggle & Drawer
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileClose = document.getElementById('mobile-close');
  const mobileBackdrop = document.getElementById('mobile-backdrop');

  function openMobileMenu() {
    if (mobileDrawer) mobileDrawer.classList.add('open');
    if (mobileBackdrop) mobileBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if (mobileDrawer) mobileDrawer.classList.remove('open');
    if (mobileBackdrop) mobileBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      openMobileMenu();
    });
  }

  if (mobileClose) {
    mobileClose.addEventListener('click', closeMobileMenu);
  }

  if (mobileBackdrop) {
    mobileBackdrop.addEventListener('click', closeMobileMenu);
  }

  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // ==========================================
  // 3. SKILLS FILTERING
  // ==========================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // ==========================================
  // 4. ARCHITECTURE MODALS (PROJETOS AUTORAIS)
  // ==========================================
  const modalOverlay = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const modalClose = document.getElementById('modal-close');

  const projectDetails = {
    fretador: {
      title: '🚚 Plataforma Fretador — Enterprise Logistics SaaS',
      content: `
        <div style="margin-bottom: 1.5rem;">
          <h4 style="color: var(--cyan); margin-bottom: 0.5rem;">Arquitetura & Liderança Técnica</h4>
          <p style="color: var(--text-light); font-size: 0.95rem; line-height: 1.6;">
            A Plataforma Fretador é um SaaS B2B corporativo robusto para gestão completa de fretamento corporativo, atendendo multinacionais e operadores logísticos privados com alta concorrência.
          </p>
        </div>
        <div style="margin-bottom: 1.5rem;">
          <h4 style="color: var(--cyan); margin-bottom: 0.5rem;">Destaques de Engenharia:</h4>
          <ul style="color: var(--text-muted); font-size: 0.9rem; padding-left: 1.2rem; line-height: 1.7;">
            <li><b>Microsserviços & GraphQL:</b> Servidor centralizado em Node.js/TypeScript com schemas unificados e consultas sob demanda de alta eficiência.</li>
            <li><b>Mesa Operacional Web:</b> Cockpit reativo em Next.js/React com Tailwind CSS, dashboards analíticos e roteirização otimizada.</li>
            <li><b>App Mobile Multiplataforma:</b> Desenvolvido em React Native e Expo, com arquitetura offline-first para motoristas e passageiros.</li>
            <li><b>Nuvem & Segurança:</b> AWS Cognito para autenticação federada e RBAC, Lambdas serverless, PostgreSQL com isolamento seguro multi-tenant.</li>
          </ul>
        </div>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <span class="tech-tag" style="background: rgba(0,242,254,0.1); color: var(--cyan);">GraphQL</span>
          <span class="tech-tag" style="background: rgba(0,242,254,0.1); color: var(--cyan);">Next.js</span>
          <span class="tech-tag" style="background: rgba(0,242,254,0.1); color: var(--cyan);">React Native</span>
          <span class="tech-tag" style="background: rgba(0,242,254,0.1); color: var(--cyan);">AWS Serverless</span>
          <span class="tech-tag" style="background: rgba(0,242,254,0.1); color: var(--cyan);">PostgreSQL</span>
        </div>
      `
    },
    nlogika: {
      title: '🌐 NLogika — Portal SaaS Core Platform (Monorepo)',
      content: `
        <div style="margin-bottom: 1.5rem;">
          <h4 style="color: var(--cyan); margin-bottom: 0.5rem;">Liderança Técnica & Arquitetura (CTO)</h4>
          <p style="color: var(--text-light); font-size: 0.95rem; line-height: 1.6;">
            Repositório central e Application Shell do Portal SaaS Multi-tenant da NLogika, servindo como o chassi arquitetural básico para acoplamento dinâmico de todos os submódulos de software corporativo da empresa.
          </p>
        </div>
        <div style="margin-bottom: 1.5rem;">
          <h4 style="color: var(--cyan); margin-bottom: 0.5rem;">Destaques de Engenharia:</h4>
          <ul style="color: var(--text-muted); font-size: 0.9rem; padding-left: 1.2rem; line-height: 1.7;">
            <li><b>Isolamento Estrito de Tenants (LGPD):</b> Arquitetura focada na segurança absoluta de dados e compliance estrito com a Lei Geral de Proteção de Dados.</li>
            <li><b>Monorepo Escalável:</b> Gestão modular de pacotes com reaproveitamento de componentes de UI, utilitários e serviços de infraestrutura.</li>
            <li><b>Eficiência de Custos em Cloud:</b> Modelagem otimizada de recursos para baixo consumo de instâncias e máxima performance de entrega.</li>
          </ul>
        </div>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <span class="tech-tag" style="background: rgba(0,242,254,0.1); color: var(--cyan);">Monorepo</span>
          <span class="tech-tag" style="background: rgba(0,242,254,0.1); color: var(--cyan);">Multi-tenant</span>
          <span class="tech-tag" style="background: rgba(0,242,254,0.1); color: var(--cyan);">LGPD Compliance</span>
          <span class="tech-tag" style="background: rgba(0,242,254,0.1); color: var(--cyan);">Application Shell</span>
        </div>
      `
    },
    gcradius: {
      title: '📞 GCRadius — Discador Automático & CRM de Vendas SaaS (PWA)',
      content: `
        <div style="margin-bottom: 1.5rem;">
          <h4 style="color: var(--cyan); margin-bottom: 0.5rem;">Automação Comercial B2B</h4>
          <p style="color: var(--text-light); font-size: 0.95rem; line-height: 1.6;">
            Plataforma B2B instalável (Progressive Web App) para prospecção acelerada, gestão ágil de leads, discagem rápida automatizada e acompanhamento de métricas comerciais de equipes.
          </p>
        </div>
        <div style="margin-bottom: 1.5rem;">
          <h4 style="color: var(--cyan); margin-bottom: 0.5rem;">Destaques Técnicos:</h4>
          <ul style="color: var(--text-muted); font-size: 0.9rem; padding-left: 1.2rem; line-height: 1.7;">
            <li><b>Funil de Vendas Interativo (Kanban):</b> Movimentação reativa de leads através das etapas de negociação com persistência em tempo real.</li>
            <li><b>PWA Instalável:</b> Operação com alta velocidade, armazenamento local otimizado e atalhos rápidos para operadores.</li>
            <li><b>Telemetria de Vendas:</b> Dashboards de taxa de conversão, tempo de contato e relatórios de produtividade.</li>
          </ul>
        </div>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <span class="tech-tag" style="background: rgba(0,242,254,0.1); color: var(--cyan);">PWA</span>
          <span class="tech-tag" style="background: rgba(0,242,254,0.1); color: var(--cyan);">CRM SaaS</span>
          <span class="tech-tag" style="background: rgba(0,242,254,0.1); color: var(--cyan);">Kanban Pipeline</span>
          <span class="tech-tag" style="background: rgba(0,242,254,0.1); color: var(--cyan);">Discagem Rápida</span>
        </div>
      `
    },
    events: {
      title: '🎟️ GuiHub EventPlatform — Plataforma Completa de Gestão de Eventos',
      content: `
        <div style="margin-bottom: 1.5rem;">
          <h4 style="color: var(--cyan); margin-bottom: 0.5rem;">Gestão de Eventos em Escala</h4>
          <p style="color: var(--text-light); font-size: 0.95rem; line-height: 1.6;">
            Aplicação web full-stack desenvolvida do zero para criação, divulgação, inscrição e credenciamento de eventos corporativos com alta disponibilidade.
          </p>
        </div>
        <div style="margin-bottom: 1.5rem;">
          <h4 style="color: var(--cyan); margin-bottom: 0.5rem;">Destaques de Engenharia:</h4>
          <ul style="color: var(--text-muted); font-size: 0.9rem; padding-left: 1.2rem; line-height: 1.7;">
            <li>Arquitetura modular e componentizada em React e Next.js com foco em alta performance.</li>
            <li>Validação estrita de formulários, fluxo de credenciamento e geração dinâmica de ingressos.</li>
            <li>Integração com APIs transacionais e armazenamento seguro de dados de participantes.</li>
          </ul>
        </div>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <span class="tech-tag" style="background: rgba(0,242,254,0.1); color: var(--cyan);">React</span>
          <span class="tech-tag" style="background: rgba(0,242,254,0.1); color: var(--cyan);">Next.js</span>
          <span class="tech-tag" style="background: rgba(0,242,254,0.1); color: var(--cyan);">Full-Stack</span>
          <span class="tech-tag" style="background: rgba(0,242,254,0.1); color: var(--cyan);">Ticketing</span>
        </div>
      `
    },
    tracker: {
      title: '📍 T3 Fretes Tracker — Telemetria em Tempo Real',
      content: `
        <div style="margin-bottom: 1.5rem;">
          <h4 style="color: var(--cyan); margin-bottom: 0.5rem;">Rastreamento e Baixa Latência</h4>
          <p style="color: var(--text-light); font-size: 0.95rem; line-height: 1.6;">
            Solução orientada a eventos para geolocalização e telemetria de fretes e entregas, focando em streaming de dados contínuo e atualização reativa de posições.
          </p>
        </div>
        <div style="margin-bottom: 1.5rem;">
          <h4 style="color: var(--cyan); margin-bottom: 0.5rem;">Stack Aplicada:</h4>
          <ul style="color: var(--text-muted); font-size: 0.9rem; padding-left: 1.2rem; line-height: 1.7;">
            <li>Frontend em Next.js com mapas reativos e dashboards de telemetria.</li>
            <li>Pipelines otimizados para recebimento contínuo de coordenadas sem sobrecarga de banco.</li>
          </ul>
        </div>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <span class="tech-tag" style="background: rgba(0,242,254,0.1); color: var(--cyan);">TypeScript</span>
          <span class="tech-tag" style="background: rgba(0,242,254,0.1); color: var(--cyan);">Next.js</span>
          <span class="tech-tag" style="background: rgba(0,242,254,0.1); color: var(--cyan);">WebSockets</span>
        </div>
      `
    },
    qg: {
      title: '💈 QG-Barbearia — Multi-Tenant Service Platform',
      content: `
        <div style="margin-bottom: 1.5rem;">
          <h4 style="color: var(--cyan); margin-bottom: 0.5rem;">Visão do Produto</h4>
          <p style="color: var(--text-light); font-size: 0.95rem; line-height: 1.6;">
            Plataforma comercial para automação de agendamentos, fluxos operacionais e gestão financeira de unidades de atendimento.
          </p>
        </div>
        <div style="margin-bottom: 1.5rem;">
          <h4 style="color: var(--cyan); margin-bottom: 0.5rem;">Aspectos Técnicos:</h4>
          <ul style="color: var(--text-muted); font-size: 0.9rem; padding-left: 1.2rem; line-height: 1.7;">
            <li>Interface moderna e responsiva orientada à conversão e experiência de autoatendimento rápida.</li>
            <li>API transacional estruturada para controle estrito de concorrência de horários e faturamento.</li>
          </ul>
        </div>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <span class="tech-tag" style="background: rgba(0,242,254,0.1); color: var(--cyan);">React</span>
          <span class="tech-tag" style="background: rgba(0,242,254,0.1); color: var(--cyan);">Node.js</span>
          <span class="tech-tag" style="background: rgba(0,242,254,0.1); color: var(--cyan);">PostgreSQL</span>
        </div>
      `
    }
  };

  document.querySelectorAll('.btn-details').forEach(btn => {
    btn.addEventListener('click', () => {
      const projectId = btn.getAttribute('data-project');
      const details = projectDetails[projectId];
      if (details && modalOverlay) {
        modalTitle.textContent = details.title;
        modalBody.innerHTML = details.content;
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (modalClose && modalOverlay) {
    modalClose.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // ==========================================
  // 5. CONTACT FORM INTERACTION
  // ==========================================
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name').value;
      const email = document.getElementById('form-email').value;
      const subject = document.getElementById('form-subject').value;
      const message = document.getElementById('form-message').value;

      const mailtoUrl = `mailto:g.casagrande@uni9.edu.br?subject=${encodeURIComponent('[Contato Portfólio] ' + subject)}&body=${encodeURIComponent('Nome: ' + name + '\nEmail: ' + email + '\n\nMensagem:\n' + message)}`;
      
      window.location.href = mailtoUrl;

      if (formFeedback) {
        formFeedback.style.display = 'block';
        formFeedback.textContent = '✓ Abrindo seu cliente de e-mail para envio da mensagem...';
        setTimeout(() => {
          contactForm.reset();
        }, 1500);
      }
    });
  }
});
