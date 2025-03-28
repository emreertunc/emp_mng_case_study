import { LitElement, html, css } from 'lit';
import { sharedStyles } from '../styles/shared-styles.js';
import { t } from '../i18n/i18n.js';

export class ConfirmDialog extends LitElement {
  static get styles() {
    return [
      sharedStyles,
      css`
        :host {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 1000;
        }

        .dialog {
          background-color: white;
          border-radius: 4px;
          padding: 24px;
          width: 400px;
          max-width: 90%;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        }

        .dialog-title {
          margin-top: 0;
          color: var(--primary-dark);
        }

        .dialog-message {
          margin-bottom: 24px;
        }

        .dialog-actions {
          display: flex;
          justify-content: flex-end;
          gap: 8px;
        }

        .proceed-button {
          background-color: var(--primary-color);
        }

        .cancel-button {
          background-color: #f5f5f5;
          color: #333;
        }
      `
    ];
  }

  static get properties() {
    return {
      title: { type: String },
      message: { type: String },
      proceedButtonText: { type: String },
      cancelButtonText: { type: String }
    };
  }

  constructor() {
    super();
    this.title = t('confirm_title_add');
    this.message = t('confirm_add');
    this.proceedButtonText = t('confirm_proceed');
    this.cancelButtonText = t('confirm_cancel');
  }

  render() {
    return html`
      <div class="dialog">
        <h2 class="dialog-title">${this.title}</h2>
        <div class="dialog-message">${this.message}</div>
        <div class="dialog-actions">
          <button class="cancel-button" @click=${this._onCancel}>${this.cancelButtonText}</button>
          <button class="proceed-button" @click=${this._onProceed}>${this.proceedButtonText}</button>
        </div>
      </div>
    `;
  }

  _onProceed() {
    this.dispatchEvent(new CustomEvent('proceed'));
  }

  _onCancel() {
    this.dispatchEvent(new CustomEvent('cancel'));
  }
}

customElements.define('confirm-dialog', ConfirmDialog);
