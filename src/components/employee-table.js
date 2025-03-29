
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
          background-color: #E65C00;
        }
        
        th {
          cursor: pointer;
          position: relative;
          user-select: none;
          white-space: nowrap;
          min-width: 100px;
        }
        
        th.actions-cell, th.checkbox-cell {
          cursor: default;
        }
        
        th.sorted-asc, th.sorted-desc {
          background-color: #f5f5f5;
        }
        
        .sort-icon {
          font-size: 10px;
          width: 10px;
          margin-left: 3px;
          display: inline-block;
          opacity: 0.3;
          vertical-align: middle;
        }
        
        th.sorted-asc .sort-icon-asc,
        th.sorted-desc .sort-icon-desc {
          opacity: 1;
        }
      `
    ];
  }

  static get properties() {
    return {
      employees: { type: Array },
      hasSelectedEmployees: { type: Boolean },
      sortField: { type: String },
      sortDirection: { type: String }
    };
  }

  constructor() {
    super();
    this.employees = [];
    this.hasSelectedEmployees = false;
    this.sortField = 'firstName';
    this.sortDirection = 'asc';
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
              <th @click=${() => this._handleSort('firstName')} class="${this.sortField === 'firstName' ? 'sorted-' + this.sortDirection : ''}">
                <span>${t('first_name')}</span>${this._getSortIcon('firstName')}
              </th>
              <th @click=${() => this._handleSort('lastName')} class="${this.sortField === 'lastName' ? 'sorted-' + this.sortDirection : ''}">
                <span>${t('last_name')}</span>${this._getSortIcon('lastName')}
              </th>
              <th @click=${() => this._handleSort('dateOfEmployment')} class="${this.sortField === 'dateOfEmployment' ? 'sorted-' + this.sortDirection : ''}">
                <span>${t('hire_date')}</span>${this._getSortIcon('dateOfEmployment')}
              </th>
              <th @click=${() => this._handleSort('dateOfBirth')} class="${this.sortField === 'dateOfBirth' ? 'sorted-' + this.sortDirection : ''}">
                <span>${t('birth_date')}</span>${this._getSortIcon('dateOfBirth')}
              </th>
              <th @click=${() => this._handleSort('phoneNumber')} class="${this.sortField === 'phoneNumber' ? 'sorted-' + this.sortDirection : ''}">
                <span>${t('phone')}</span>${this._getSortIcon('phoneNumber')}
              </th>
              <th @click=${() => this._handleSort('email')} class="${this.sortField === 'email' ? 'sorted-' + this.sortDirection : ''}">
                <span>${t('email')}</span>${this._getSortIcon('email')}
              </th>
              <th @click=${() => this._handleSort('department')} class="${this.sortField === 'department' ? 'sorted-' + this.sortDirection : ''}">
                <span>${t('department')}</span>${this._getSortIcon('department')}
              </th>
              <th @click=${() => this._handleSort('position')} class="${this.sortField === 'position' ? 'sorted-' + this.sortDirection : ''}">
                <span>${t('position')}</span>${this._getSortIcon('position')}
              </th>
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
  
  resetSelections() {
    const headerCheckbox = this.shadowRoot.querySelector('thead input[type="checkbox"]');
    if (headerCheckbox) {
      headerCheckbox.checked = false;
    }
    
    const checkboxes = this.shadowRoot.querySelectorAll('tbody input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      checkbox.checked = false;
    });
    
    this.hasSelectedEmployees = false;
  }
  
  _getSortIcon(field) {
    if (this.sortField !== field) {
      return html`<span class="sort-icon">↕</span>`;
    }
    
    return this.sortDirection === 'asc' 
      ? html`<span class="sort-icon sort-icon-asc">↑</span>` 
      : html`<span class="sort-icon sort-icon-desc">↓</span>`;
  }
  
  _handleSort(field) {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    
    this.dispatchEvent(new CustomEvent('sort-changed', {
      detail: { 
        field: this.sortField, 
        direction: this.sortDirection 
      }
    }));
  }
}

customElements.define('employee-table', EmployeeTable);
