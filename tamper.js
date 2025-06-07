// ==UserScript==
// @name         REDAÇÃO PR - Gerador Redação Paraná Bypass
// @namespace    https://github.com/mzzvxm
// @version      2.0
// @description  Interface flutuante com splash screen moderna e melhorias visuais avançadas para geração automática de redações
// @author       mzzvxm
// @match        *://redacao.pr.gov.br/student/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

;(() => {
  class RedacaoPREnhanced {
    constructor() {
      this.splashScreen = null
      this.isInitialized = false
      this.init()
    }

    async init() {
      await this.showSplashScreen()
      await this.loadExternalScript()
      await this.waitForInterface()
      await this.hideSplashScreen()
      this.enhanceInterface()
    }

    async showSplashScreen() {
      this.splashScreen = document.createElement("div")
      this.splashScreen.className = "redacao-pr-splash"

      this.splashScreen.innerHTML = `
        <div class="splash-container">
          <div class="logo-section">
            <div class="logo-icon">
              <svg width="90" height="90" viewBox="0 0 120 120" fill="none">
                <rect x="20" y="30" width="80" height="60" rx="8" stroke="url(#gradientPurple)" stroke-width="3" fill="none" opacity="0.4"/>
                <rect x="30" y="40" width="60" height="40" rx="4" fill="url(#gradientPurple)" opacity="0.6"/>
                <circle cx="60" cy="60" r="12" fill="#c084fc"/>
                <path d="M50 55 L55 60 L70 45" stroke="#1a1822" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <defs>
                  <linearGradient id="gradientPurple" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#c084fc;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:1" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div class="logo-text">
              <span class="redacao-text">REDAÇÃO</span>
              <span class="pr-text">PR</span>
            </div>
            <div class="subtitle-text">Gerador Inteligente</div>
          </div>
          
          <div class="loading-section">
            <div class="loading-bar">
              <div class="loading-progress"></div>
            </div>
            <div class="loading-text">Inicializando sistema...</div>
          </div>
          
          <div class="features-section">
            <div class="feature-item">
              <div class="feature-icon">✨</div>
              <div class="feature-text">Interface Moderna</div>
            </div>
            <div class="feature-item">
              <div class="feature-icon">🚀</div>
              <div class="feature-text">Geração Automática</div>
            </div>
            <div class="feature-item">
              <div class="feature-icon">🎨</div>
              <div class="feature-text">Design Aprimorado</div>
            </div>
          </div>
          
          <div class="creator-section">
            <div class="creator-label">Desenvolvido por</div>
            <div class="creator-name">@mzzvxm</div>
            <div class="version-badge">v2.0</div>
          </div>
          
          <div class="particles-container">
            ${Array.from({ length: 15 }, (_, i) => `<div class="particle particle-${i}"></div>`).join("")}
          </div>
        </div>
      `

      this.injectSplashStyles()
      document.body.appendChild(this.splashScreen)

      setTimeout(() => {
        this.splashScreen.classList.add("visible")
        this.animateLoading()
      }, 100)
    }

    injectSplashStyles() {
      const style = document.createElement("style")
      style.textContent = `
        .redacao-pr-splash {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #0f0f23 0%, #1a1822 30%, #2d1b69 70%, #1e1b4b 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999999;
          opacity: 0;
          transition: opacity 1s cubic-bezier(0.4, 0, 0.2, 1);
          font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
          overflow: hidden;
        }

        .redacao-pr-splash.visible {
          opacity: 1;
        }

        .splash-container {
          text-align: center;
          position: relative;
          z-index: 2;
          max-width: 500px;
          padding: 40px;
          animation: slideInUp 1.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes slideInUp {
          from {
            transform: translateY(60px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .logo-section {
          margin-bottom: 50px;
        }

        .logo-icon {
          margin-bottom: 25px;
          animation: logoFloat 4s ease-in-out infinite;
        }

        @keyframes logoFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-8px) rotate(1deg); }
          75% { transform: translateY(-4px) rotate(-1deg); }
        }

        .logo-text {
          margin-bottom: 15px;
        }

        .redacao-text {
          font-size: 52px;
          font-weight: 900;
          color: #ffffff;
          text-shadow: 0 0 30px rgba(255, 255, 255, 0.4);
          letter-spacing: 3px;
        }

        .pr-text {
          font-size: 52px;
          font-weight: 900;
          color: #c084fc;
          text-shadow: 0 0 30px rgba(192, 132, 252, 0.8);
          letter-spacing: 3px;
          margin-left: 15px;
        }

        .subtitle-text {
          font-size: 16px;
          color: #a78bfa;
          font-weight: 400;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .loading-section {
          margin: 45px 0;
        }

        .loading-bar {
          width: 350px;
          height: 6px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
          margin: 0 auto 20px;
          overflow: hidden;
          position: relative;
        }

        .loading-progress {
          height: 100%;
          background: linear-gradient(90deg, #c084fc, #8b5cf6, #a78bfa);
          border-radius: 3px;
          width: 0%;
          transition: width 0.4s ease;
          box-shadow: 0 0 15px rgba(192, 132, 252, 0.6);
          position: relative;
        }

        .loading-progress::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          animation: shimmer 2s infinite;
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .loading-text {
          font-size: 18px;
          color: #d1d5db;
          font-weight: 300;
        }

        .features-section {
          display: flex;
          justify-content: center;
          gap: 30px;
          margin: 40px 0;
          flex-wrap: wrap;
        }

        .feature-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          opacity: 0;
          animation: fadeInUp 0.8s ease forwards;
        }

        .feature-item:nth-child(1) { animation-delay: 0.2s; }
        .feature-item:nth-child(2) { animation-delay: 0.4s; }
        .feature-item:nth-child(3) { animation-delay: 0.6s; }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .feature-icon {
          font-size: 24px;
          margin-bottom: 5px;
        }

        .feature-text {
          font-size: 14px;
          color: #9ca3af;
          font-weight: 500;
        }

        .creator-section {
          margin-top: 50px;
        }

        .creator-label {
          font-size: 13px;
          color: #6b7280;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .creator-name {
          font-size: 20px;
          color: #c084fc;
          font-weight: 700;
          text-shadow: 0 0 15px rgba(192, 132, 252, 0.5);
          margin-bottom: 12px;
        }

        .version-badge {
          display: inline-block;
          padding: 6px 12px;
          background: rgba(192, 132, 252, 0.2);
          border: 1px solid rgba(192, 132, 252, 0.3);
          border-radius: 20px;
          font-size: 12px;
          color: #c084fc;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .particles-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }

        .particle {
          position: absolute;
          width: 3px;
          height: 3px;
          background: #c084fc;
          border-radius: 50%;
          opacity: 0.7;
          animation: particleFloat 8s linear infinite;
        }

        @keyframes particleFloat {
          0% {
            transform: translateY(100vh) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.7;
          }
          90% {
            opacity: 0.7;
          }
          100% {
            transform: translateY(-10vh) translateX(50px) rotate(360deg);
            opacity: 0;
          }
        }

        ${Array.from(
          { length: 15 },
          (_, i) => `
          .particle-${i} {
            left: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 8}s;
            animation-duration: ${6 + Math.random() * 4}s;
          }
        `,
        ).join("")}
      `
      document.head.appendChild(style)
    }

    async animateLoading() {
      const progressBar = this.splashScreen.querySelector(".loading-progress")
      const loadingText = this.splashScreen.querySelector(".loading-text")

      const steps = [
        { progress: 15, text: "Carregando recursos..." },
        { progress: 35, text: "Conectando ao servidor..." },
        { progress: 55, text: "Inicializando interface..." },
        { progress: 75, text: "Aplicando melhorias..." },
        { progress: 90, text: "Finalizando configuração..." },
        { progress: 100, text: "Sistema pronto!" },
      ]

      for (const step of steps) {
        progressBar.style.width = `${step.progress}%`
        loadingText.textContent = step.text
        await this.wait(500)
      }
    }

    async hideSplashScreen() {
      await this.wait(1200)
      this.splashScreen.style.opacity = "0"
      setTimeout(() => {
        this.splashScreen?.remove()
        this.showSuccessNotification()
      }, 1000)
    }

    showSuccessNotification() {
      const notification = document.createElement("div")
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #c084fc, #8b5cf6);
        color: white;
        padding: 12px 16px;
        border-radius: 8px;
        font-family: 'Segoe UI', sans-serif;
        font-weight: 600;
        font-size: 14px;
        box-shadow: 0 8px 25px rgba(192, 132, 252, 0.4);
        z-index: 99999;
        animation: slideInRight 0.5s ease;
      `
      notification.innerHTML = "🚀 Redação PR Bypass ativado!"

      const style = document.createElement("style")
      style.textContent = `
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `
      document.head.appendChild(style)

      document.body.appendChild(notification)
      setTimeout(() => notification.remove(), 4000)
    }

    async loadExternalScript() {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script")
        script.src = "https://o.crsp.space/leiaparana.js?t=" + Date.now()
        script.onload = resolve
        script.onerror = reject
        document.body.appendChild(script)
      })
    }

    async waitForInterface() {
      return new Promise((resolve) => {
        const checkInterval = setInterval(() => {
          const element = document.querySelector("#paste-simulator")
          if (element) {
            clearInterval(checkInterval)
            resolve(element)
          }
        }, 100)
      })
    }

    enhanceInterface() {
      const waitFor = (selector, callback) => {
        const interval = setInterval(() => {
          const el = document.querySelector(selector)
          if (el) {
            clearInterval(interval)
            callback(el)
          }
        }, 100)
      }

      waitFor("#paste-simulator", (box) => {
        // Aplicar estilos responsivos
        box.style.cssText = `
          width: min(95vw, 380px) !important;
          max-width: 380px !important;
          max-height: 85vh !important;
          border-radius: 12px !important;
          border: none !important;
          background: linear-gradient(145deg, #1a1822 0%, #2d1b69 100%) !important;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(192, 132, 252, 0.2) !important;
          font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif !important;
          color: #e5e7eb !important;
          overflow-y: auto !important;
          position: fixed !important;
          top: 50% !important;
          left: 50% !important;
          transform: translate(-50%, -50%) !important;
          z-index: 9999 !important;
        `

        // Cabeçalho responsivo
        const header = box.querySelector('div[style*="justify-content"]')
        if (header) {
          header.style.cssText = `
            background: linear-gradient(135deg, #2d1b69, #1e1b4b) !important;
            padding: 16px 20px !important;
            border-bottom: 1px solid rgba(192, 132, 252, 0.2) !important;
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
            position: sticky !important;
            top: 0 !important;
            z-index: 10 !important;
          `
        }

        const title = header?.querySelector("h3")
        if (title) {
          title.textContent = "✨ Redator Inteligente"
          title.style.cssText = `
            font-size: 16px !important;
            color: #c084fc !important;
            font-weight: 600 !important;
            margin: 0 !important;
            text-shadow: 0 0 8px rgba(192, 132, 252, 0.3) !important;
          `
        }

        // Conteúdo principal com padding adequado
        const content = box.querySelector('div:not([style*="justify-content"]):not([style*="text-align: center"])')
        if (content) {
          content.style.cssText = `
            padding: 16px 20px !important;
            max-height: calc(85vh - 120px) !important;
            overflow-y: auto !important;
          `
        }

        // Rodapé simplificado
        const footer = box.querySelector('div[style*="text-align: center"]')
        if (footer) {
          footer.innerHTML = `
            <div style="text-align: center; margin-top: 16px; padding: 12px 16px; 
                        background: rgba(192, 132, 252, 0.1); border-radius: 8px; 
                        border: 1px solid rgba(192, 132, 252, 0.2);">
              <div style="display: flex; align-items: center; justify-content: center; gap: 8px; 
                          color: #c084fc; font-size: 13px; font-weight: 600;">
                <span>Bypass by</span>
                <strong>mzzvxm</strong>
                <a href="https://github.com/mzzvxm" target="_blank"
                   style="display: inline-flex; align-items: center; gap: 4px; 
                          padding: 4px 8px; background: rgba(139, 92, 246, 0.2); 
                          border-radius: 4px; color: #c084fc; text-decoration: none; 
                          font-size: 12px; transition: all 0.2s ease;">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
              </div>
              <div style="margin-top: 6px; font-size: 11px; color: #9ca3af;">
                v2.0
              </div>
            </div>
          `
        }

        // Botões responsivos
        box.querySelectorAll("button").forEach((btn) => {
          btn.style.cssText = `
            border-radius: 8px !important;
            border: none !important;
            font-size: 13px !important;
            background: linear-gradient(135deg, #8b5cf6, #c084fc) !important;
            color: #fff !important;
            font-weight: 600 !important;
            padding: 10px 16px !important;
            margin: 6px 4px !important;
            transition: all 0.2s ease !important;
            box-shadow: 0 3px 12px rgba(139, 92, 246, 0.3) !important;
            cursor: pointer !important;
            width: calc(50% - 8px) !important;
            display: inline-block !important;
          `

          btn.addEventListener("mouseover", () => {
            btn.style.transform = "translateY(-1px)"
            btn.style.boxShadow = "0 4px 16px rgba(139, 92, 246, 0.4)"
          })
          btn.addEventListener("mouseout", () => {
            btn.style.transform = "translateY(0)"
            btn.style.boxShadow = "0 3px 12px rgba(139, 92, 246, 0.3)"
          })
        })

        // Campos responsivos
        box.querySelectorAll('input[type="text"], textarea, select').forEach((el) => {
          el.style.cssText = `
            border-radius: 6px !important;
            border: 1px solid rgba(192, 132, 252, 0.3) !important;
            background-color: rgba(26, 24, 34, 0.8) !important;
            color: #e5e7eb !important;
            font-size: 13px !important;
            padding: 10px 12px !important;
            margin: 6px 0 !important;
            transition: all 0.2s ease !important;
            width: 100% !important;
            box-sizing: border-box !important;
          `

          el.addEventListener("focus", () => {
            el.style.borderColor = "#c084fc"
            el.style.boxShadow = "0 0 0 2px rgba(192, 132, 252, 0.1)"
          })
          el.addEventListener("blur", () => {
            el.style.borderColor = "rgba(192, 132, 252, 0.3)"
            el.style.boxShadow = "none"
          })
        })

        // Títulos responsivos
        box.querySelectorAll("h4").forEach((h4) => {
          h4.style.cssText = `
            color: #c084fc !important;
            font-size: 14px !important;
            margin: 12px 0 6px !important;
            font-weight: 600 !important;
            text-shadow: 0 0 5px rgba(192, 132, 252, 0.2) !important;
          `
        })

        // Atualizar textos dos botões
        box.querySelectorAll("button").forEach((btn) => {
          if (btn.textContent.includes("Fazer Redação")) btn.textContent = "📝 Preencher"
          if (btn.textContent.includes("Gerar Redação")) btn.textContent = "🚀 Gerar"
        })

        // Adicionar estilos para mobile
        const mobileStyles = document.createElement("style")
        mobileStyles.textContent = `
          @media (max-width: 768px) {
            #paste-simulator {
              width: 95vw !important;
              max-width: none !important;
              margin: 10px !important;
              max-height: 90vh !important;
            }
            
            #paste-simulator button {
              width: 100% !important;
              margin: 4px 0 !important;
            }
            
            #paste-simulator h4 {
              font-size: 13px !important;
            }
            
            #paste-simulator input, 
            #paste-simulator textarea, 
            #paste-simulator select {
              font-size: 14px !important;
              padding: 12px !important;
            }
          }
          
          @media (max-height: 600px) {
            #paste-simulator {
              max-height: 95vh !important;
            }
          }
        `
        document.head.appendChild(mobileStyles)

        console.log("[Redação PR Bypass] Interface responsiva aplicada com sucesso!")
        this.isInitialized = true
      })
    }

    wait(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms))
    }
  }

  // Inicializar o sistema
  new RedacaoPREnhanced()
})()
