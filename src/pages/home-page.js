import { LitElement, html, css } from 'lit';
import { sharedStyles } from '../styles/shared-styles.js';
import { Router } from '@vaadin/router';
import { t } from '../i18n/i18n.js';

export class HomePage extends LitElement {
  static get styles() {
    return [
      sharedStyles,
      css`
        .welcome-container {
          padding: 40px;
          text-align: center;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          margin-top: 40px;
        }
        
        .app-logo {
          margin-bottom: 24px;
          display: flex;
          justify-content: center;
        }
        
        .app-logo img {
          width: 100px;
          height: 100px;
          object-fit: contain;
        }
        
        .actions {
          margin-top: 32px;
          display: flex;
          justify-content: center;
        }
      `
    ];
  }

  render() {
    return html`
      <div class="container">
        <div class="welcome-container">
          <div class="app-logo">
            <img src="/src/media/ING_Group_N.V._Logo.svg.png" alt="ING Logo" />
          </div>
          <h1>${t('app_title')}</h1>
          <p>${t('app_description')}</p>
          <div class="actions">
            <button @click=${() => Router.go('/employees')}>
              ${t('go_to_employees')}
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('home-page', HomePage);
