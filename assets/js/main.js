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
    'Engenheiro de Agentes Autônomos & LLMs',
    'Arquitetura SaaS Enterprise de Alta Escala',
    'Full-Stack: Node.js • TypeScript • React • GraphQL',
    'Otimização de Performance & Eficiência'
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
      typeSpeed = 2200; // Pausa após completar a frase
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 400; // Pausa antes de digitar a próxima frase
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

  // Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
    });

    document.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
      });
    });
  }

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
            <li><b>Mesa Operacional Web:</b> Cockpit reativo em Next.js/React com Tailwind CSS, gestão de rotas e telemetria em tempo real.</li>
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
    guihub: {
      title: '🌐 GuiHub Solutions & Plataforma de Automação',
      content: `
        <div style="margin-bottom: 1.5rem;">
          <h4 style="color: var(--cyan); margin-bottom: 0.5rem;">Ecossistema Corporativo</h4>
          <p style="color: var(--text-light); font-size: 0.95rem; line-height: 1.6;">
            Portal institucional e hub de automações digitais, discadores automatizados e pipelines de eventos corporativos (<a href="http://guihub.com.br/" target="_blank" style="color: var(--cyan);">guihub.com.br</a>).
          </p>
        </div>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <span class="tech-tag" style="background: rgba(0,242,254,0.1); color: var(--cyan);">React</span>
          <span class="tech-tag" style="background: rgba(0,242,254,0.1); color: var(--cyan);">Automações</span>
          <span class="tech-tag" style="background: rgba(0,242,254,0.1); color: var(--cyan);">APIs REST</span>
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
