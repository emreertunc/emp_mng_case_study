
import { LitElement, html, css } from 'lit';
import { sharedStyles, iconStyles } from '../styles/shared-styles.js';
import { t } from '../i18n/i18n.js';

export class EmployeeTable extends LitElement {
  static get styles() {
    return [
      sharedStyles,
      iconStyles,
      css`
        .table-container {
          border-radius: 4px;
          border: 1px solid var(--border-color);
          background-color: white;
          overflow-x: auto;
          width: 100%;
          display: block;
        }
        
        table {
          width: 100%;
          border-collapse: collapse;
          border-spacing: 0;
        }
        
        th {
          background-color: #f5f5f5;
          font-weight: bold;
          text-align: left;
          padding: 12px;
          border-bottom: 1px solid var(--border-color);
        }
        
        td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid var(--border-color);
        }
        
        tr:hover {
          background-color: #f9f9f9;
        }
        
        .checkbox-cell {
          width: 40px;
          text-align: center;
        }
        
        .actions-cell {
          width: 100px;
          text-align: right;
        }
        
        .badge {
          display: inline-block;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 12px;
          background-color: #f0f0f0;
        }
        
        .badge.department {
          background-color: #e3f2fd;
          color: #0d47a1;
        }
        
        .badge.position {
          background-color: #e8f5e9;
          color: #1b5e20;
        }
        
        .danger-button {
          background-color: #FF6600; /* ING turuncu rengi */
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          margin-left: 8px;
        }
        
        .danger-button:hover {
          background-color: #E65C00; /* ING turuncu biraz daha koyu tonu */
        }
      `
    ];
  }

  static get properties() {
    return {
      employees: { type: Array },
      hasSelectedEmployees: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.employees = [];
    this.hasSelectedEmployees = false;
  }

  render() {
    return html`
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th class="checkbox-cell">
                <input type="checkbox" @change=${this._handleSelectAll} />
              </th>
              <th colspan="9" style="text-align: right;">
                ${this.hasSelectedEmployees ? html`
                  <button class="danger-button" @click=${this._handleDeleteSelected}>
                    ${t('delete_selected')}
                  </button>
                ` : ''}
              </th>
            </tr>
            <tr>
              <th class="checkbox-cell"></th>
              <th>${t('first_name')}</th>
              <th>${t('last_name')}</th>
              <th>${t('hire_date')}</th>
              <th>${t('birth_date')}</th>
              <th>${t('phone')}</th>
              <th>${t('email')}</th>
              <th>${t('department')}</th>
              <th>${t('position')}</th>
              <th class="actions-cell">${t('actions')}</th>
            </tr>
          </thead>
          <tbody>
            ${this.employees.map(employee => html`
              <tr>
                <td class="checkbox-cell">
                  <input type="checkbox" .value=${employee.id} @change=${this._handleCheckboxChange} />
                </td>
                <td>${employee.firstName}</td>
                <td>${employee.lastName}</td>
                <td>${this._formatDate(employee.dateOfEmployment)}</td>
                <td>${this._formatDate(employee.dateOfBirth)}</td>
                <td>${employee.phoneNumber}</td>
                <td>${employee.email}</td>
                <td>
                  <span class="badge department">${employee.department}</span>
                </td>
                <td>
                  <span class="badge position">${employee.position}</span>
                </td>
                <td class="actions-cell">
                  <button class="icon-button" @click=${() => this._handleEdit(employee)}>
                    <svg class="action-icon edit-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="#FF6600"/>
                    </svg>
                  </button>
                  <button class="icon-button delete-button" @click=${() => this._handleDelete(employee)}>
                    <svg class="action-icon delete-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="#FF6600"/>
                    </svg>
                  </button>
                </td>
              </tr>
            `)}
          </tbody>
        </table>
      </div>
    `;
  }
  
  _formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);

    const locale = localStorage.getItem('locale') || 'tr';
    return date.toLocaleDateString(locale === 'tr' ? 'tr-TR' : 'en-US');
  }
  
  _handleSelectAll(e) {
    const checkboxes = this.shadowRoot.querySelectorAll('tbody input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      checkbox.checked = e.target.checked;
    });
    this.hasSelectedEmployees = e.target.checked && checkboxes.length > 0;
  }
  
  _handleCheckboxChange(e) {
    const checkboxes = this.shadowRoot.querySelectorAll('tbody input[type="checkbox"]:checked');
    this.hasSelectedEmployees = checkboxes.length > 0;
  }
  
  _getSelectedEmployeeIds() {
    const checkboxes = this.shadowRoot.querySelectorAll('tbody input[type="checkbox"]:checked');
    return Array.from(checkboxes).map(checkbox => checkbox.value);
  }
  
  _handleDeleteSelected() {
    const selectedIds = this._getSelectedEmployeeIds();
    if (selectedIds.length > 0) {
      this.dispatchEvent(new CustomEvent('delete-selected', {
        detail: { ids: selectedIds }
      }));
    }
  }
  
  _handleEdit(employee) {
    this.dispatchEvent(new CustomEvent('edit', {
      detail: employee
    }));
  }
  
  _handleDelete(employee) {
    this.dispatchEvent(new CustomEvent('delete', {
      detail: employee
    }));
  }
  
  /**
   * Tüm checkbox seçimlerini sıfırla
   * Bu metot employee-list bileşeni tarafından çağrılır
   */
  resetSelections() {
    // Ana checkbox'u temizle
    const headerCheckbox = this.shadowRoot.querySelector('thead input[type="checkbox"]');
    if (headerCheckbox) {
      headerCheckbox.checked = false;
    }
    
    // Tüm satır checkbox'larını temizle
    const checkboxes = this.shadowRoot.querySelectorAll('tbody input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      checkbox.checked = false;
    });
    
    // Seçim durumunu güncelle ("Seçilenleri Sil" butonunu gizlemek için)
    this.hasSelectedEmployees = false;
  }
}

customElements.define('employee-table', EmployeeTable);
