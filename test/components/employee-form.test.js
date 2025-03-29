import { html, fixture, expect } from '@open-wc/testing';
import { stub } from 'sinon';
import '../../src/components/employee-form.js';

describe('EmployeeForm', () => {
  let element;
  const mockEmployee = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phoneNumber: '1234567890',
    dateOfBirth: '1990-01-01',
    dateOfEmployment: '2020-01-01',
    department: 'IT',
    position: 'Developer'
  };

  beforeEach(async () => {
    element = await fixture(html`<employee-form></employee-form>`);
  });

  it('renders empty form by default', () => {
    const form = element.shadowRoot.querySelector('form');
    expect(form).to.exist;
    
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
      expect(input.value).to.equal('');
    });
  });

  it('populates form with employee data when provided', async () => {
    element = await fixture(html`<employee-form .employee=${mockEmployee}></employee-form>`);
    
    const firstNameInput = element.shadowRoot.querySelector('input[name="firstName"]');
    const lastNameInput = element.shadowRoot.querySelector('input[name="lastName"]');
    
    expect(firstNameInput.value).to.equal(mockEmployee.firstName);
    expect(lastNameInput.value).to.equal(mockEmployee.lastName);
  });

  it('validates required fields', async () => {
    const submitButton = element.shadowRoot.querySelector('button[type="submit"]');
    submitButton.click();

    await element.updateComplete;
    
    const errorMessages = element.shadowRoot.querySelectorAll('.error-message');
    expect(errorMessages.length).to.be.greaterThan(0);
  });

  it('validates email format', async () => {
    const emailInput = element.shadowRoot.querySelector('input[name="email"]');
    emailInput.value = 'invalid-email';
    emailInput.dispatchEvent(new Event('input'));

    await element.updateComplete;
    
    const errorMessage = element.shadowRoot.querySelector('input[name="email"] + .error-message');
    expect(errorMessage).to.exist;
  });

  it('validates phone number format', async () => {
    const phoneInput = element.shadowRoot.querySelector('input[name="phoneNumber"]');
    phoneInput.value = 'abc';
    phoneInput.dispatchEvent(new Event('input'));

    await element.updateComplete;
    
    const errorMessage = element.shadowRoot.querySelector('input[name="phoneNumber"] + .error-message');
    expect(errorMessage).to.exist;
  });

  it('emits save event with form data when valid', async () => {
    let savedData = null;
    element.addEventListener('save', (e) => {
      savedData = e.detail;
    });

    const inputs = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phoneNumber: '1234567890',
      dateOfBirth: '1990-01-01',
      dateOfEmployment: '2020-01-01',
      department: 'IT',
      position: 'Developer'
    };

    Object.entries(inputs).forEach(([name, value]) => {
      const input = element.shadowRoot.querySelector(`[name="${name}"]`);
      input.value = value;
      input.dispatchEvent(new Event('input'));
    });

    const form = element.shadowRoot.querySelector('form');
    form.dispatchEvent(new Event('submit'));

    expect(savedData).to.deep.equal(inputs);
  });

  it('handles cancel button click', () => {
    let cancelled = false;
    element.addEventListener('cancel', () => {
      cancelled = true;
    });

    const cancelButton = element.shadowRoot.querySelector('button[type="button"]');
    cancelButton.click();

    expect(cancelled).to.be.true;
  });

  it('resets form on reset()', async () => {
    element = await fixture(html`<employee-form .employee=${mockEmployee}></employee-form>`);
    
    element.reset();
    await element.updateComplete;

    const inputs = element.shadowRoot.querySelectorAll('input');
    inputs.forEach(input => {
      expect(input.value).to.equal('');
    });
  });

  it('validates dates correctly', () => {
    const validateDateSpy = stub(element, '_validateDate');
    
    const dateInput = element.shadowRoot.querySelector('input[name="dateOfBirth"]');
    dateInput.value = '2025-01-01';
    dateInput.dispatchEvent(new Event('input'));
    
    expect(validateDateSpy.called).to.be.true;
    validateDateSpy.restore();
  });
});
