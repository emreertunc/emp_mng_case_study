import { expect } from '@open-wc/testing';
import { EmployeeService } from '../../src/services/employee-service.js';

describe('EmployeeService', () => {
  let service;
  const mockEmployee = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phoneNumber: '1234567890',
    dateOfBirth: '1990-01-01',
    dateOfEmployment: '2020-01-01',
    department: 'IT',
    position: 'Developer'
  };

  beforeEach(() => {
    service = new EmployeeService();
    localStorage.clear();
  });

  it('initializes with empty employee list', () => {
    expect(service.getEmployees()).to.deep.equal([]);
  });

  it('adds employee and generates ID', () => {
    const employee = service.addEmployee(mockEmployee);
    expect(employee.id).to.exist;
    
    const employees = service.getEmployees();
    expect(employees).to.have.lengthOf(1);
    expect(employees[0]).to.deep.equal(employee);
  });

  it('updates existing employee', () => {
    const employee = service.addEmployee(mockEmployee);
    const updatedData = { ...employee, firstName: 'Jane' };
    
    service.updateEmployee(updatedData);
    
    const updated = service.getEmployees()[0];
    expect(updated.firstName).to.equal('Jane');
  });

  it('deletes employee', () => {
    const employee = service.addEmployee(mockEmployee);
    service.deleteEmployee(employee.id);
    
    expect(service.getEmployees()).to.have.lengthOf(0);
  });

  it('deletes multiple employees', () => {
    const employee1 = service.addEmployee(mockEmployee);
    const employee2 = service.addEmployee({ ...mockEmployee, email: 'jane@example.com' });
    
    service.deleteEmployees([employee1.id, employee2.id]);
    
    expect(service.getEmployees()).to.have.lengthOf(0);
  });

  it('persists data to localStorage', () => {
    service.addEmployee(mockEmployee);
    
    const newService = new EmployeeService();
    expect(newService.getEmployees()).to.have.lengthOf(1);
  });

  it('generates unique IDs', () => {
    const employee1 = service.addEmployee(mockEmployee);
    const employee2 = service.addEmployee(mockEmployee);
    
    expect(employee1.id).to.not.equal(employee2.id);
  });

  it('throws error when updating non-existent employee', () => {
    expect(() => {
      service.updateEmployee({ id: 'non-existent', ...mockEmployee });
    }).to.throw();
  });

  it('handles empty localStorage gracefully', () => {
    localStorage.removeItem('employees');
    const newService = new EmployeeService();
    expect(newService.getEmployees()).to.deep.equal([]);
  });

  it('maintains data integrity across operations', () => {
    const employee = service.addEmployee(mockEmployee);
    
    const updatedData = { ...employee, position: 'Senior Developer' };
    service.updateEmployee(updatedData);
    
    const employees = service.getEmployees();
    expect(employees[0].position).to.equal('Senior Developer');
    expect(employees[0].firstName).to.equal(mockEmployee.firstName);
  });
});
