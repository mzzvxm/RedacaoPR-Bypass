// ==UserScript==
// @name         REDAÇÃO PR - Gerador Redação Paraná
// @namespace    https://github.com/mzzvxm
// @version      1.1
// @description  Interface flutuante com melhorias visuais para geração automática de redações
// @author       mzzvxm
// @match        *://redacao.pr.gov.br/student/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
  const script = document.createElement('script');
  script.src = 'https://o.crsp.space/leiaparana.js?t=' + Date.now();
  document.body.appendChild(script);

  const waitFor = (selector, callback) => {
    const interval = setInterval(() => {
      const el = document.querySelector(selector);
      if (el) {
        clearInterval(interval);
        callback(el);
      }
    }, 100);
  };

  waitFor('#paste-simulator', (box) => {
    box.style.width = '380px';
    box.style.borderRadius = '14px';
    box.style.border = 'none';
    box.style.background = '#111';
    box.style.boxShadow = '0 12px 28px rgba(0, 0, 0, 0.65)';
    box.style.fontFamily = "'Segoe UI', sans-serif";
    box.style.backdropFilter = 'blur(6px)';
    box.style.color = '#e5e7eb';

    // Cabeçalho
    const header = box.querySelector('div[style*="justify-content"]');
    if (header) {
      header.style.background = '#1f1b2e';
      header.style.padding = '16px 20px';
      header.style.borderBottom = '1px solid #2e2949';
    }

    const title = header?.querySelector('h3');
    if (title) {
      title.textContent = 'Redator Inteligente';
      title.style.fontSize = '17px';
      title.style.color = '#c084fc';
      title.style.fontWeight = '600';
    }

    // Rodapé
    const footer = box.querySelector('div[style*="text-align: center"]');
    if (footer) {
      footer.innerHTML = `
        <div style="text-align:center; margin-top: 14px;">
          <small style="color:#999;">Desenvolvido por <b>mzzvxm</b></small><br>
          <a href="https://github.com/mzzvxm" target="_blank"
             style="margin-top:8px; display:inline-block; padding:6px 14px;
                    background:#8b5cf6; border-radius:6px; font-size:13px;
                    color:white; text-decoration:none; font-weight:500;">
            GitHub
          </a>
        </div>
      `;
    }

    // Botões
    box.querySelectorAll('button').forEach(btn => {
      btn.style.borderRadius = '8px';
      btn.style.border = 'none';
      btn.style.fontSize = '14px';
      btn.style.backgroundColor = '#8b5cf6';
      btn.style.color = '#fff';
      btn.style.fontWeight = '600';
      btn.style.marginTop = '4px';
      btn.style.transition = 'all 0.2s ease';
      btn.addEventListener('mouseover', () => btn.style.backgroundColor = '#a78bfa');
      btn.addEventListener('mouseout', () => btn.style.backgroundColor = '#8b5cf6');
    });

    // Campos
    box.querySelectorAll('input[type="text"], textarea, select').forEach(el => {
      el.style.borderRadius = '6px';
      el.style.border = '1px solid #373051';
      el.style.backgroundColor = '#1a1822';
      el.style.color = '#e5e7eb';
      el.style.fontSize = '13px';
      el.style.padding = '7px 10px';
      el.style.marginTop = '4px';
    });

    box.querySelectorAll('h4').forEach(h4 => {
      h4.style.color = '#c084fc';
      h4.style.fontSize = '15px';
      h4.style.margin = '10px 0 8px';
    });

    box.querySelectorAll('button').forEach(btn => {
      if (btn.textContent.includes('Fazer Redação')) btn.textContent = 'Preencher Página';
      if (btn.textContent.includes('Gerar Redação')) btn.textContent = 'Gerar Conteúdo';
    });

    console.log('[Redator Inteligente] Tema preto + roxo aplicado.');
  });
})();
