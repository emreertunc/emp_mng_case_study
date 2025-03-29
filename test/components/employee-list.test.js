import { html, fixture, expect } from '@open-wc/testing';
import '../../src/components/employee-list.js';

describe('EmployeeList', () => {
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
    element = await fixture(html`<employee-list .employees=${mockEmployees}></employee-list>`);
  });

  it('renders employee list with data', async () => {
    const items = element.shadowRoot.querySelectorAll('employee-list-item');
    expect(items.length).to.equal(mockEmployees.length);
  });

  it('handles search input', async () => {
    const searchInput = element.shadowRoot.querySelector('input[type="search"]');
    searchInput.value = 'John';
    searchInput.dispatchEvent(new Event('input'));

    await element.updateComplete;
    const items = element.shadowRoot.querySelectorAll('employee-list-item');
    expect(items.length).to.equal(1);
  });

  it('filters employees correctly', () => {
    element.searchTerm = 'John';
    const filtered = element._filterEmployees(mockEmployees);
    expect(filtered.length).to.equal(1);

    element.searchTerm = 'xyz';
    const noResults = element._filterEmployees(mockEmployees);
    expect(noResults.length).to.equal(0);
  });

  it('handles delete event from child component', async () => {
    let deletedEmployee = null;
    element.addEventListener('delete', (e) => {
      deletedEmployee = e.detail;
    });

    const listItem = element.shadowRoot.querySelector('employee-list-item');
    listItem.dispatchEvent(new CustomEvent('delete', { detail: mockEmployees[0] }));

    expect(deletedEmployee).to.deep.equal(mockEmployees[0]);
  });

  it('handles edit event from child component', async () => {
    let editedEmployee = null;
    element.addEventListener('edit', (e) => {
      editedEmployee = e.detail;
    });

    const listItem = element.shadowRoot.querySelector('employee-list-item');
    listItem.dispatchEvent(new CustomEvent('edit', { detail: mockEmployees[0] }));

    expect(editedEmployee).to.deep.equal(mockEmployees[0]);
  });

  it('shows no results message when search has no matches', async () => {
    element.searchTerm = 'xyz';
    await element.updateComplete;

    const noResults = element.shadowRoot.querySelector('.no-results');
    expect(noResults).to.exist;
    expect(noResults.textContent).to.include('No employees found');
  });

  it('updates view when employees property changes', async () => {
    const newEmployees = [...mockEmployees, {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
      phoneNumber: '0987654321',
      dateOfBirth: '1992-02-02',
      dateOfEmployment: '2021-02-02',
      department: 'HR',
      position: 'Manager'
    }];

    element.employees = newEmployees;
    await element.updateComplete;

    const items = element.shadowRoot.querySelectorAll('employee-list-item');
    expect(items.length).to.equal(newEmployees.length);
  });
});
