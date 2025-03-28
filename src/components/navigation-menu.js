import { LitElement, html, css } from 'lit';
import { sharedStyles, iconStyles } from '../styles/shared-styles.js';
import { Router } from '@vaadin/router';
import { t } from '../i18n/i18n.js';
import './language-selector.js';

export class NavigationMenu extends LitElement {
  static get styles() {
    return [
      sharedStyles,
      iconStyles,
      css`
        :host {
          display: block;
          width: 100%;
        }
        
        .nav-container {
          background-color: var(--navbar-color);
          color: #333;
          padding: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          border-radius: 4px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        .nav-brand {
          font-weight: bold;
          font-size: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .nav-brand-icon {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .nav-brand-icon img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        
        .nav-links {
          display: flex;
          gap: 16px;
        }
        
        .nav-link {
          color: var(--primary-color);
          text-decoration: none;
          padding: 8px 16px;
          border-radius: 4px;
          transition: all 0.3s ease;
        }
        
        .nav-link:hover {
          background-color: rgba(255, 102, 0, 0.1);
        }
        
        .nav-link.active {
          background-color: rgba(255, 102, 0, 0.2);
          font-weight: bold;
        }
        
        /* Mobil Görünüm */
        @media (max-width: 768px) {
          .nav-container {
            flex-direction: column;
            gap: 16px;
          }
          
          .nav-links {
            width: 100%;
            justify-content: center;
          }
        }
      `
    ];
  }
  
  static get properties() {
    return {
      activePath: { type: String }
    };
  }
  
  constructor() {
    super();
    this.activePath = window.location.pathname;
    
    window.addEventListener('vaadin-router-location-changed', (e) => {
      this.activePath = window.location.pathname;
    });
  }
  
  render() {
    return html`
      <div class="nav-container">
        <div class="nav-brand" @click=${() => Router.go('/')} style="cursor: pointer;">
          <div class="nav-brand-icon">
            <img src="/src/media/ING_Group_N.V._Logo.svg.png" alt="ING Logo" />
          </div>
          <span style="color: var(--primary-color); font-weight: 600;">${t('employee_management')}</span>
        </div>
        <div style="display: flex; align-items: center;">
          <div class="nav-links">
            <div 
              @click=${() => Router.go('/')} 
              class="nav-link ${this.activePath === '/' ? 'active' : ''}"
              style="cursor: pointer;"
            >
              <span style="color: var(--primary-color);">${t('nav_home')}</span>
            </div>
            <div 
              @click=${() => Router.go('/employees')} 
              class="nav-link ${this.activePath.startsWith('/employees') ? 'active' : ''}"
              style="cursor: pointer;"
            >
              <span style="color: var(--primary-color);">${t('nav_employees')}</span>
            </div>
          </div>
          <language-selector></language-selector>
        </div>
      </div>
    `;
  }
}

customElements.define('navigation-menu', NavigationMenu);
