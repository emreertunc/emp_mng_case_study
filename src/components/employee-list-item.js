
import { LitElement, html, css } from 'lit';
import { sharedStyles, iconStyles } from '../styles/shared-styles.js';
import { t } from '../i18n/i18n.js';

export class EmployeeListItem extends LitElement {
  static get styles() {
    return [
      sharedStyles,
      iconStyles,
      css`
        .list-item {
          display: flex;
          justify-content: space-between;
          padding: 16px;
          border: 1px solid var(--border-color);
          border-radius: 4px;
          margin-bottom: 8px;
          background-color: white;
        }
        
        .item-details {
          flex: 1;
        }
        
        .item-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .employee-name {
          font-weight: bold;
          font-size: 18px;
          margin-bottom: 4px;
        }
        
        .employee-info {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          color: #666;
          font-size: 14px;
        }
        
        .info-item {
          display: flex;
          align-items: center;
        }
        
        .badge {
          display: inline-block;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 12px;
          background-color: #f0f0f0;
          margin-right: 8px;
        }
        
        .badge.department {
          background-color: #e3f2fd;
          color: #0d47a1;
        }
        
        .badge.position {
          background-color: #e8f5e9;
          color: #1b5e20;
        }
      `
    ];
  }

  static get properties() {
    return {
      employee: { type: Object }
    };
  }

  render() {
    if (!this.employee) return html``;
    
    return html`
      <div class="list-item">
        <div class="item-details">
          <div class="employee-name">${this.employee.firstName} ${this.employee.lastName}</div>
          <div class="employee-info">
            <div class="info-item">
              <span class="badge department">${this.employee.department}</span>
              <span class="badge position">${this.employee.position}</span>
            </div>
            <div class="info-item">📧 ${this.employee.email}</div>
            <div class="info-item">📞 ${this.employee.phoneNumber}</div>
            <div class="info-item">🗓️ ${t('hire_date')}: ${this._formatDate(this.employee.dateOfEmployment)}</div>
            <div class="info-item">🎂 ${t('birth_date')}: ${this._formatDate(this.employee.dateOfBirth)}</div>
          </div>
        </div>
        <div class="item-actions">
          <button class="icon-button" @click=${this._handleEdit}>
            <svg class="action-icon edit-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="#FF6600"/>
            </svg>
          </button>
          <button class="icon-button delete-button" @click=${this._handleDelete}>
            <svg class="action-icon delete-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="#FF6600"/>
            </svg>
          </button>
        </div>
      </div>
    `;
  }
  
  _formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    const locale = localStorage.getItem('locale') || 'tr';
    return date.toLocaleDateString(locale === 'tr' ? 'tr-TR' : 'en-US');
  }
  
  _handleEdit() {
    this.dispatchEvent(new CustomEvent('edit', {
      detail: this.employee
    }));
  }
  
  _handleDelete() {
    this.dispatchEvent(new CustomEvent('delete', {
      detail: this.employee
    }));
  }
}

customElements.define('employee-list-item', EmployeeListItem);
