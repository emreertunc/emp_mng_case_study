import { html, fixture, expect } from '@open-wc/testing';
import { stub } from 'sinon';
import '../../src/components/employee-table.js';

describe('EmployeeTable', () => {
  let element;
  const mockEmployees = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phoneNumber: '1234567890',
      dateOfBirth: '1990-01-01',
      dateOfEmployment: '2020-01-01',
      department: 'IT',
      position: 'Developer'
    }
  ];

  beforeEach(async () => {
    element = await fixture(html`<employee-table .employees=${mockEmployees}></employee-table>`);
  });

  it('renders employee table with data', async () => {
    const rows = element.shadowRoot.querySelectorAll('tbody tr');
    expect(rows.length).to.equal(mockEmployees.length);
    
    const firstRow = rows[0];
    expect(firstRow.textContent).to.include('John');
    expect(firstRow.textContent).to.include('Doe');
  });

  it('handles checkbox selection', async () => {
    const checkbox = element.shadowRoot.querySelector('tbody input[type="checkbox"]');
    checkbox.click();
    
    expect(element.hasSelectedEmployees).to.be.true;
    expect(element._getSelectedEmployeeCount()).to.equal(1);
  });

  it('handles select all checkbox', async () => {
    const selectAllCheckbox = element.shadowRoot.querySelector('thead input[type="checkbox"]');
    selectAllCheckbox.click();
    
    const checkboxes = element.shadowRoot.querySelectorAll('tbody input[type="checkbox"]:checked');
    expect(checkboxes.length).to.equal(mockEmployees.length);
  });

  it('emits delete event when delete button is clicked', async () => {
    let deletedEmployee = null;
    element.addEventListener('delete', (e) => {
      deletedEmployee = e.detail;
    });

    const deleteButton = element.shadowRoot.querySelector('.delete-button');
    deleteButton.click();

    expect(deletedEmployee).to.deep.equal(mockEmployees[0]);
  });

  it('emits edit event when edit button is clicked', async () => {
    let editedEmployee = null;
    element.addEventListener('edit', (e) => {
      editedEmployee = e.detail;
    });

    const editButton = element.shadowRoot.querySelector('.icon-button:not(.delete-button)');
    editButton.click();

    expect(editedEmployee).to.deep.equal(mockEmployees[0]);
  });

  it('handles bulk delete', async () => {
    let deletedIds = null;
    element.addEventListener('delete-selected', (e) => {
      deletedIds = e.detail.ids;
    });

    const checkbox = element.shadowRoot.querySelector('tbody input[type="checkbox"]');
    checkbox.click();

    const bulkDeleteButton = element.shadowRoot.querySelector('.danger-button');
    bulkDeleteButton.click();

    expect(deletedIds).to.deep.equal(['1']);
  });

  it('formats dates correctly', () => {
    const formattedEmploymentDate = element._formatDate('2020-01-01');
    expect(formattedEmploymentDate).to.match(/^\d{1,2}[./]\d{1,2}[./]\d{4}$/);
  });

  it('handles sorting', async () => {
    const sortSpy = stub(element, '_handleSort');
    
    const firstNameHeader = element.shadowRoot.querySelector('th[class*="firstName"]');
    firstNameHeader.click();
    
    expect(sortSpy.calledWith('firstName')).to.be.true;
    sortSpy.restore();
  });

  it('resets selections correctly', () => {
    const checkbox = element.shadowRoot.querySelector('tbody input[type="checkbox"]');
    checkbox.click();
    
    element.resetSelections();
    
    expect(element.hasSelectedEmployees).to.be.false;
    expect(element._getSelectedEmployeeCount()).to.equal(0);
  });
});
