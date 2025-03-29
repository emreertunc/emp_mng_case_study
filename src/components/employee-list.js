
import { LitElement, html, css } from 'lit';
import { sharedStyles, iconStyles } from '../styles/shared-styles.js';
import { EmployeeService } from '../services/employee-service.js';
import { Employee } from '../models/employee.js';
import { Router } from '@vaadin/router';
import './employee-list-item.js';
import './employee-table.js';
import './confirm-dialog.js';
import { t } from '../i18n/i18n.js';

export class EmployeeList extends LitElement {
  static get styles() {
    return [
      sharedStyles,
      iconStyles,
      css`
        .empty-state {
          text-align: center;
          padding: 40px;
          color: #666;
        }
        
        .view-toggle {
          display: flex;
          justify-content: flex-end;
          gap: 8px;
          margin-bottom: 16px;
        }
        
        .view-toggle button {
          background-color: #f5f5f5;
          color: #333;
          min-width: 40px;
          height: 40px;
          border-radius: 50%;
          padding: 0;
        }
        
        .view-toggle button.active {
          background-color: var(--primary-color);
          color: white;
        }
        
        .list-container {
          min-height: 300px;
        }
        

      `
    ];
  }

  static get properties() {
    return {
      employees: { type: Array },
      filteredEmployees: { type: Array },
      displayedEmployees: { type: Array },
      viewMode: { type: String },
      currentPage: { type: Number },
      itemsPerPage: { type: Number },
      totalPages: { type: Number },
      searchQuery: { type: String },
      showDeleteConfirm: { type: Boolean },
      employeeToDelete: { type: Object },
      employeeIdsToDelete: { type: Array },
      isMultipleDelete: { type: Boolean },
      sortField: { type: String },
      sortDirection: { type: String }
    };
  }

  constructor() {
    super();
    this.employeeService = new EmployeeService();
    this.employees = [];
    this.filteredEmployees = [];
    this.displayedEmployees = [];
    this.viewMode = 'list';
    this.currentPage = 1;
    this.itemsPerPage = 5;
    this.totalPages = 1;
    this.searchQuery = '';
    this.showDeleteConfirm = false;
    this.employeeToDelete = null;
    this.employeeIdsToDelete = [];
    this.isMultipleDelete = false;
    this.sortField = 'firstName';
    this.sortDirection = 'asc';
    
    this._loadEmployees();
  }

  render() {
    return html`
      <div class="container">
        <div class="list-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <h1 class="employee-title" style="margin: 0; color: var(--primary-color);">${t('nav_employees')}</h1>
          <button @click=${this._handleAddEmployee}>
            <span class="icon icon-add"></span> ${t('add_employee')}
          </button>
        </div>
        
        ${this._renderList()}
        
        ${this.showDeleteConfirm ? html`
          <confirm-dialog
            title="${t('confirm_title_delete')}"
            message="${this.isMultipleDelete 
              ? t('confirm_delete_multiple') 
              : (this.employeeToDelete ? t('confirm_delete', {firstName: this.employeeToDelete.firstName, lastName: this.employeeToDelete.lastName}) : t('confirm_delete', {firstName: '', lastName: ''}))}"
            @proceed=${this._confirmDelete}
            @cancel=${() => this.showDeleteConfirm = false}
          ></confirm-dialog>
        ` : ''}
      </div>
    `;
  }
  

  
  _renderList() {
    return html`

      
      <div class="search-container">
        <input 
          type="text" 
          class="search-input" 
          placeholder="${t('search_employees')}"
          .value=${this.searchQuery}
          @input=${this._handleSearch}
        />
      </div>
      
      <div class="view-toggle">
        <button 
          class="view-button ${this.viewMode === 'list' ? 'active' : ''}" 
          @click=${() => this.viewMode = 'list'}
          title="${t('list_view')}"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill="#FF6600"/>
          </svg>
        </button>
        <button 
          class="view-button ${this.viewMode === 'table' ? 'active' : ''}" 
          @click=${() => this.viewMode = 'table'}
          title="${t('table_view')}"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4h4v4H4V4zm0 6h4v4H4v-4zm0 6h4v4H4v-4zm6-12h4v4h-4V4zm0 6h4v4h-4v-4zm0 6h4v4h-4v-4zm6-12h4v4h-4V4zm0 6h4v4h-4v-4zm0 6h4v4h-4v-4z" fill="#FF6600"/>
          </svg>
        </button>
      </div>
      
      <div class="list-container">
        ${this.filteredEmployees.length === 0 ? html`
          <div class="empty-state">
            <h3>Çalışan Bulunamadı</h3>
            <p>Arama kriterlerinize uygun çalışan bulunamadı veya henüz çalışan eklenmemiş.</p>
            <button @click=${this._handleAddEmployee}>
              <span class="icon icon-add"></span> Çalışan Ekle
            </button>
          </div>
        ` : this._renderEmployeeList()}
      </div>
      
      ${this.filteredEmployees.length > 0 ? this._renderPagination() : ''}
    `;
  }
  
  _renderEmployeeList() {
    if (this.viewMode === 'table') {
      return html`
        <employee-table 
          .employees=${this.displayedEmployees}
          .sortField=${this.sortField}
          .sortDirection=${this.sortDirection}
          @edit=${this._handleEditEmployee}
          @delete=${this._handleDeleteEmployee}
          @delete-selected=${this._handleDeleteSelectedEmployees}
          @sort-changed=${this._handleSortChanged}
        ></employee-table>
      `;
    } else {
      return html`
        ${this.displayedEmployees.map(employee => html`
          <employee-list-item 
            .employee=${employee}
            @edit=${this._handleEditEmployee}
            @delete=${this._handleDeleteEmployee}
          ></employee-list-item>
        `)}
      `;
    }
  }
  
  _renderPagination() {
    const pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    const visiblePages = this._getVisiblePages();
    
    return html`
      <div class="pagination">
        <button 
          @click=${() => this._handlePageChange(this.currentPage - 1)}
          ?disabled=${this.currentPage === 1}
        >
          &laquo;
        </button>
        
        ${visiblePages.map(page => html`
          <button 
            class="${page === this.currentPage ? 'active' : ''}"
            @click=${() => this._handlePageChange(page)}
          >
            ${page}
          </button>
        `)}
        
        <button 
          @click=${() => this._handlePageChange(this.currentPage + 1)}
          ?disabled=${this.currentPage === this.totalPages}
        >
          &raquo;
        </button>
      </div>
    `;
  }
  
  _getVisiblePages() {
    const maxVisiblePages = 5;
    
    if (this.totalPages <= maxVisiblePages) {
      return Array.from({ length: this.totalPages }, (_, i) => i + 1);
    }
    
    let startPage, endPage;
    
    if (this.currentPage <= Math.floor(maxVisiblePages / 2) + 1) {
      startPage = 1;
      endPage = maxVisiblePages;
    } else if (this.currentPage >= this.totalPages - Math.floor(maxVisiblePages / 2)) {
      startPage = this.totalPages - maxVisiblePages + 1;
      endPage = this.totalPages;
    } else {
      startPage = this.currentPage - Math.floor(maxVisiblePages / 2);
      endPage = this.currentPage + Math.floor(maxVisiblePages / 2);
    }
    
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  }
  

  
  _loadEmployees() {
    this.employees = this.employeeService.getAll();
    this._filterEmployees();
  }
  
  _filterEmployees() {
    if (this.searchQuery.trim() === '') {
      this.filteredEmployees = [...this.employees];
    } else {
      this.filteredEmployees = this.employeeService.search(this.searchQuery);
    }
    
    this._sortEmployees();
    
    this.totalPages = Math.max(1, Math.ceil(this.filteredEmployees.length / this.itemsPerPage));
    
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }
    
    this._updateDisplayedEmployees();
  }
  
  _updateDisplayedEmployees() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.filteredEmployees.length);
    
    this.displayedEmployees = this.filteredEmployees.slice(startIndex, endIndex);
  }
  
  _handleSearch(e) {
    this.searchQuery = e.target.value;
    this.currentPage = 1;
    this._filterEmployees();
  }
  
  _handlePageChange(page) {
    if (page < 1 || page > this.totalPages) return;
    
    this.currentPage = page;
    this._updateDisplayedEmployees();
  }
  
  _handleAddEmployee() {
    Router.go('/employees/add');
  }
  
  _handleEditEmployee(e) {
    const employee = e.detail;
    Router.go(`/employees/edit?id=${employee.id}`);
  }
  
  _handleDeleteEmployee(e) {
    this.employeeToDelete = e.detail;
    this.showDeleteConfirm = true;
  }
  
  _handleDeleteSelectedEmployees(e) {
    const { ids } = e.detail;
    if (ids && ids.length > 0) {
      this.employeeIdsToDelete = ids;
      this.isMultipleDelete = true;
      this.showDeleteConfirm = true;
    }
  }
  
  _confirmDelete() {
    if (this.isMultipleDelete) {
      if (this.employeeIdsToDelete && this.employeeIdsToDelete.length > 0) {
        this.employeeIdsToDelete.forEach(id => {
          this.employeeService.delete(id);
        });
        this.employeeIdsToDelete = [];
        this.isMultipleDelete = false;
        this.showDeleteConfirm = false;
        
        this._resetAllSelections();
        this._loadEmployees();
      }
    } else if (this.employeeToDelete) {
      this.employeeService.delete(this.employeeToDelete.id);
      this.showDeleteConfirm = false;
      this.employeeToDelete = null;
      this._loadEmployees();
    }
  }
  
  _resetAllSelections() {
    if (this.viewMode === 'table') {
      const tableElement = this.shadowRoot.querySelector('employee-table');
      if (tableElement) {
        tableElement.resetSelections();
      }
    }
  }
  
  _handleSortChanged(e) {
    const { field, direction } = e.detail;
    this.sortField = field;
    this.sortDirection = direction;
    
    this._sortEmployees();
    this._updateDisplayedEmployees();
  }

  _sortEmployees() {
    if (!this.filteredEmployees || this.filteredEmployees.length === 0) return;
    
    const sortFn = (a, b) => {
      let valueA = a[this.sortField];
      let valueB = b[this.sortField];
      
      if (this.sortField === 'dateOfBirth' || this.sortField === 'dateOfEmployment') {
        valueA = valueA ? new Date(valueA).getTime() : 0;
        valueB = valueB ? new Date(valueB).getTime() : 0;
      } 
      
      else if (typeof valueA === 'string' && typeof valueB === 'string') {
        valueA = valueA.toLowerCase();
        valueB = valueB.toLowerCase();
      }
      
      if (this.sortDirection === 'asc') {
        return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
      } else {
        return valueA < valueB ? 1 : valueA > valueB ? -1 : 0;
      }
    };
    
    this.filteredEmployees = [...this.filteredEmployees].sort(sortFn);
  }
  

}

customElements.define('employee-list', EmployeeList);
