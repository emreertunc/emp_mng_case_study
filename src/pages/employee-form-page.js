import { LitElement, html, css } from 'lit';
import { sharedStyles } from '../styles/shared-styles.js';
import '../components/employee-form.js';
import { Employee } from '../models/employee.js';
import { EmployeeService } from '../services/employee-service.js';
import { Router } from '@vaadin/router';
import { t } from '../i18n/i18n.js';

export class EmployeeFormPage extends LitElement {
  static get styles() {
    return [
      sharedStyles,
      css`
        .form-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }
      `
    ];
  }

  static get properties() {
    return {
      employeeId: { type: String },
      employee: { type: Object },
      isEditMode: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.employeeService = new EmployeeService();
    this.employee = new Employee();
    this.isEditMode = false;
  }

  connectedCallback() {
    super.connectedCallback();
    const location = window.location;
    const params = new URLSearchParams(location.search);
    this.employeeId = params.get('id');
    
    if (this.employeeId) {
      this.isEditMode = true;
      this.employee = this.employeeService.getById(this.employeeId);
      
      if (!this.employee) {
        Router.go('/employees');
      }
    }
  }

  render() {
    return html`
      <div class="container">
        <div class="form-header">
          <h1 style="margin: 0;">${this.isEditMode ? t('edit_employee_title') : t('add_employee_title')}</h1>
          <button @click=${this._handleBackClick} class="secondary">
            <span class="icon icon-back"></span> ${t('back_to_list')}
          </button>
        </div>
        
        <employee-form
          .employee=${this.employee}
          .isEditMode=${this.isEditMode}
          @submit=${this._handleFormSubmit}
          @cancel=${this._handleFormCancel}
          @reset=${this._handleFormReset}
        ></employee-form>
      </div>
    `;
  }
  
  _handleBackClick() {
    Router.go('/employees');
  }
  
  _handleFormCancel() {
    Router.go('/employees');
  }
  
  _handleFormReset() {
    if (this.isEditMode && this.employeeId) {
      this.employee = this.employeeService.getById(this.employeeId);
    }
  }
  
  _handleFormSubmit(e) {
    const { employee } = e.detail;
    
    if (this.isEditMode) {
      this.employeeService.update(employee);
    } else {
      this.employeeService.add(employee);
    }
    
    Router.go('/employees');
  }
}

customElements.define('employee-form-page', EmployeeFormPage);
