import { LitElement, html, css } from 'lit';
import { sharedStyles } from '../styles/shared-styles.js';

export class NotFoundPage extends LitElement {
  static get styles() {
    return [
      sharedStyles,
      css`
        .not-found-container {
          text-align: center;
          padding: 40px;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          margin-top: 40px;
        }
        
        .not-found-icon {
          font-size: 64px;
          margin-bottom: 24px;
          color: var(--primary-color);
        }
        
        .actions {
          margin-top: 32px;
        }
      `
    ];
  }

  render() {
    return html`
      <div class="container">
        <div class="not-found-container">
          <div class="not-found-icon">🔍</div>
          <h1>Sayfa Bulunamadı</h1>
          <p>Aradığınız sayfa mevcut değil veya taşınmış olabilir.</p>
          <div class="actions">
            <a href="/" class="button">
              <button>Ana Sayfaya Dön</button>
            </a>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('not-found-page', NotFoundPage);
