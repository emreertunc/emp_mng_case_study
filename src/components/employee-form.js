
import { LitElement, html, css } from 'lit';
import { sharedStyles } from '../styles/shared-styles.js';
import { Employee } from '../models/employee.js';
import { 
  isEmpty, 
  isValidEmail, 
  isValidPhone, 
  isValidBirthDate, 
  isValidEmploymentDate,
  formatPhoneNumber,
  isEmploymentDateAfterBirthDate
} from '../utils/validators.js';
import './confirm-dialog.js';
import { EmployeeService } from '../services/employee-service.js';
import { t } from '../i18n/i18n.js';

export class EmployeeForm extends LitElement {
  static get styles() {
    return [
      sharedStyles,
      css`
        .form {
          background-color: white;
          padding: 24px;
          border-radius: 4px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .form-row {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }
        
        .form-column {
          flex: 1;
          min-width: 250px;
          padding-right: 8px;
        }
        
        @media (max-width: 768px) {
          .form-row {
            flex-direction: column;
          }
          
          .form-column {
            width: 100%;
            padding-right: 0;
          }
        }
        
        /* Tüm form elemanlarının responsive olması için stil düzenlemeleri */
        input, select {
          width: 100%;
          box-sizing: border-box;
        }
        

      `
    ];
  }

  static get properties() {
    return {
      employee: { type: Object },
      isEditMode: { type: Boolean },
      errors: { type: Object },
      showConfirmDialog: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.employee = new Employee();
    this.isEditMode = false;
    this.errors = {};
    this.showConfirmDialog = false;
    this.employeeService = new EmployeeService();
  }

  render() {
    return html`
      <div class="container" style="padding: 16px;">
        <div class="form" style="max-width: 100%; overflow: hidden;">
          <div class="form-row">
            <div class="form-column">
              <div class="form-group">
                <label for="firstName">${t('first_name')} *</label>
                <input 
                  type="text" 
                  id="firstName" 
                  .value=${this.employee.firstName} 
                  @input=${this._handleInput}
                />
                ${this.errors.firstName ? html`<div class="error">${this.errors.firstName}</div>` : ''}
              </div>
            </div>
            <div class="form-column">
              <div class="form-group">
                <label for="lastName">${t('last_name')} *</label>
                <input 
                  type="text" 
                  id="lastName" 
                  .value=${this.employee.lastName} 
                  @input=${this._handleInput}
                />
                ${this.errors.lastName ? html`<div class="error">${this.errors.lastName}</div>` : ''}
              </div>
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-column">
              <div class="form-group">
                <label for="dateOfEmployment">${t('hire_date')} *</label>
                <input 
                  type="date" 
                  id="dateOfEmployment" 
                  .value=${this.employee.dateOfEmployment} 
                  @input=${this._handleInput}
                />
                ${this.errors.dateOfEmployment ? html`<div class="error">${this.errors.dateOfEmployment}</div>` : ''}
              </div>
            </div>
            <div class="form-column">
              <div class="form-group">
                <label for="dateOfBirth">${t('birth_date')} *</label>
                <input 
                  type="date" 
                  id="dateOfBirth" 
                  .value=${this.employee.dateOfBirth} 
                  @input=${this._handleInput}
                />
                ${this.errors.dateOfBirth ? html`<div class="error">${this.errors.dateOfBirth}</div>` : ''}
              </div>
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-column">
              <div class="form-group">
                <label for="phoneNumber">${t('phone')} *</label>
                <input 
                  type="tel" 
                  id="phoneNumber" 
                  .value=${this.employee.phoneNumber} 
                  @input=${this._handleInput}
                  placeholder="+90 XXX XXX XX XX"
                />
                ${this.errors.phoneNumber ? html`<div class="error">${this.errors.phoneNumber}</div>` : ''}
              </div>
            </div>
            <div class="form-column">
              <div class="form-group">
                <label for="email">${t('email')} *</label>
                <input 
                  type="email" 
                  id="email" 
                  .value=${this.employee.email} 
                  @input=${this._handleInput}
                />
                ${this.errors.email ? html`<div class="error">${this.errors.email}</div>` : ''}
              </div>
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-column">
              <div class="form-group">
                <label for="department">${t('department')} *</label>
                <select 
                  id="department" 
                  .value=${this.employee.department} 
                  @change=${this._handleInput}
                >
                  <option value="Analytics">Analytics</option>
                  <option value="Tech">Tech</option>
                </select>
                ${this.errors.department ? html`<div class="error">${this.errors.department}</div>` : ''}
              </div>
            </div>
            <div class="form-column">
              <div class="form-group">
                <label for="position">${t('position')} *</label>
                <select 
                  id="position" 
                  .value=${this.employee.position} 
                  @change=${this._handleInput}
                >
                  <option value="Junior">Junior</option>
                  <option value="Medior">Medior</option>
                  <option value="Senior">Senior</option>
                </select>
                ${this.errors.position ? html`<div class="error">${this.errors.position}</div>` : ''}
              </div>
            </div>
          </div>
          
          <div class="actions">
            <button class="secondary" @click=${this._handleReset}>${t('reset')}</button>
            <button @click=${this._handleSubmit}>
              ${this.isEditMode ? t('update') : t('save')}
            </button>
          </div>
        </div>
        
        ${this.showConfirmDialog ? html`
          <confirm-dialog
            title="${this.isEditMode ? t('confirm_title_update') : t('confirm_title_add')}"
            message="${this.isEditMode 
              ? t('confirm_update', {firstName: this.employee.firstName, lastName: this.employee.lastName}) 
              : t('confirm_add')}"
            @proceed=${this._confirmSubmit}
            @cancel=${() => this.showConfirmDialog = false}
          ></confirm-dialog>
        ` : ''}
      </div>
    `;
  }
  
  _handleInput(e) {
    const { id, value } = e.target;
    this.employee = {
      ...this.employee,
      [id]: value
    };
    
    if (this.errors[id]) {
      this.errors = {
        ...this.errors,
        [id]: null
      };
    }
  }
  
  _handleReset() {
    if (this.isEditMode) {
      this.dispatchEvent(new CustomEvent('reset'));
    } else {
      this.employee = new Employee();
    }
    this.errors = {};
  }
  
  _handleBackClick() {
    this.dispatchEvent(new CustomEvent('cancel'));
  }
  
  _handleSubmit() {
    if (this._validateForm()) {
      this.showConfirmDialog = true;
    }
  }
  
  _confirmSubmit() {
    this.showConfirmDialog = false;
    
    const formattedPhone = formatPhoneNumber(this.employee.phoneNumber);
    
    const formData = {
      firstName: this.employee.firstName,
      lastName: this.employee.lastName,
      dateOfEmployment: this.employee.dateOfEmployment,
      dateOfBirth: this.employee.dateOfBirth,
      phoneNumber: formattedPhone,
      email: this.employee.email,
      department: this.employee.department,
      position: this.employee.position
    };
    
    this.employee = {
      ...this.employee,
      phoneNumber: formattedPhone
    };
    
    this.dispatchEvent(new CustomEvent('submit', {
      detail: {
        employee: this.employee,
        formData
      }
    }));
  }
  
  _validateForm() {
    const errors = {};
    const { firstName, lastName, email, phoneNumber, dateOfBirth, dateOfEmployment, id } = this.employee;
    
    if (isEmpty(firstName)) {
      errors.firstName = t('field_required', {field: t('first_name')});
    }
    
    if (isEmpty(lastName)) {
      errors.lastName = t('field_required', {field: t('last_name')});
    }
    
    if (isEmpty(email)) {
      errors.email = t('field_required', {field: t('email')});
    } else if (!isValidEmail(email)) {
      errors.email = t('invalid_email');
    } else if (this.employeeService.isEmailExists(email, this.isEditMode ? id : null)) {
      errors.email = t('email_exists');
    }

    if (isEmpty(phoneNumber)) {
      errors.phoneNumber = t('field_required', {field: t('phone')});
    } else if (!isValidPhone(phoneNumber)) {
      errors.phoneNumber = t('invalid_phone');
    } else if (this.employeeService.isPhoneExists(phoneNumber, this.isEditMode ? id : null)) {
      errors.phoneNumber = t('phone_exists');
    }
    
    if (isEmpty(dateOfBirth)) {
      errors.dateOfBirth = t('field_required', {field: t('birth_date')});
    } else if (!isValidBirthDate(dateOfBirth)) {
      errors.dateOfBirth = t('invalid_birth_date');
    }
    
    if (isEmpty(dateOfEmployment)) {
      errors.dateOfEmployment = t('field_required', {field: t('hire_date')});
    } else if (!isValidEmploymentDate(dateOfEmployment)) {
      errors.dateOfEmployment = t('invalid_hire_date');
    } else if (!isEmpty(dateOfBirth) && !isEmploymentDateAfterBirthDate(dateOfEmployment, dateOfBirth)) {
      errors.dateOfEmployment = t('hire_date_before_birth_date');
    }
    
    this.errors = errors;
    return Object.keys(errors).length === 0;
  }
}

customElements.define('employee-form', EmployeeForm);
