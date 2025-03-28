
import { LitElement, html, css } from 'lit';
import { sharedStyles } from '../styles/shared-styles.js';
import { getLocale, setLocale, LOCALES } from '../i18n/i18n.js';
import { t } from '../i18n/i18n.js';

export class LanguageSelector extends LitElement {
  static get styles() {
    return [
      sharedStyles,
      css`
        .language-selector {
          display: flex;
          align-items: center;
          margin-left: 16px;
          gap: 8px;
        }
        
        .flag-button {
          width: 30px;
          height: 20px;
          border: 1px solid #ddd;
          border-radius: 4px;
          cursor: pointer;
          padding: 0;
          overflow: hidden;
          position: relative;
          transition: transform 0.2s;
        }
        
        .flag-button:hover {
          transform: scale(1.1);
        }
        
        .flag-button.active {
          box-shadow: 0 0 0 2px var(--primary-color);
        }
        
        .flag-button img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        @media (max-width: 768px) {
          .language-selector {
            margin-left: 0;
            margin-top: 8px;
          }
        }
      `
    ];
  }

  static get properties() {
    return {
      currentLocale: { type: String }
    };
  }
  
  constructor() {
    super();
    this.currentLocale = getLocale();
    

    this._boundHandleLocaleChange = this._handleLocaleChange.bind(this);
    window.addEventListener('locale-changed', this._boundHandleLocaleChange);
  }
  
  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('locale-changed', this._boundHandleLocaleChange);
  }
  
  _handleLocaleChange(e) {
    this.currentLocale = e.detail.locale;
  }
  
  render() {
    return html`
      <div class="language-selector">
        <button 
          class="flag-button ${this.currentLocale === LOCALES.TR ? 'active' : ''}"
          @click=${() => this._handleLanguageClick(LOCALES.TR)}
          title="Türkçe"
        >
          <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDgwMCI+PHBhdGggZmlsbD0iI2U1MDAxMiIgZD0iTTAgMGgxMjAwdjgwMEgweiIvPjxjaXJjbGUgY3g9IjQyNSIgY3k9IjQwMCIgcj0iMjAwIiBmaWxsPSIjZmZmIi8+PGNpcmNsZSBjeD0iNDc1IiBjeT0iNDAwIiByPSIxNjAiIGZpbGw9IiNlNTAwMTIiLz48cGF0aCBkPSJNNTgzLjMzNCAzMDAgNjAwLjAyOSAzNjAuNjE4bDY0LjIwMy0yLjIxMy0zMy4zNzcgNTQuMzcxIDM3LjY5NyA1MS42MTEtNjIuNjE3LTE1LjgwOC0yOS4yOTIgNTYuNzEyLTEyLjd1MDMtMjcuNjcyLTY0LjU3NyAyNC4yMS0yOS4xOS01Ni43NjdMMzUzLjMzMyA0MDBsNjIuNjE3LTE1LjgwNy0xMi43MDQtMjcuNjcxIDY0LjU3NyAyNC4yMSIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==" alt="Türkçe">
        </button>
        <button 
          class="flag-button ${this.currentLocale === LOCALES.EN ? 'active' : ''}"
          @click=${() => this._handleLanguageClick(LOCALES.EN)}
          title="English"
        >
          <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDYwMCI+PHJlY3Qgd2lkdGg9IjEyMDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjMDAyNDdkIi8+PHBhdGggZD0iTTAgMGwxMjAwIDYwMG0wLTYwMEwwIDYwMCIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjYwIi8+PHBhdGggZD0iTTYwMCAwdjYwME0wIDMwMGgxMjAwIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMTAwIi8+PHBhdGggZD0iTTYwMCAwdjYwME0wIDMwMGgxMjAwIiBzdHJva2U9IiNjZjE0MmIiIHN0cm9rZS13aWR0aD0iNjAiLz48cGF0aCBkPSJNMCAwbDEyMDAgNjAwbTAtNjAwTDAgNjAwIiBzdHJva2U9IiNjZjE0MmIiIHN0cm9rZS13aWR0aD0iNDAiLz48L3N2Zz4=" alt="English">
        </button>
      </div>
    `;
  }
  
  _handleLanguageClick(locale) {
    if (locale !== this.currentLocale) {
      setLocale(locale);
      

      window.location.reload();
    }
  }
}

customElements.define('language-selector', LanguageSelector);
