import { Employee } from '../models/employee.js';

export class EmployeeService {
  constructor() {
    this.storageKey = 'employees';
    if (!this.getAll().length) {
      this.initializeDemoData();
    }
  }

  getAll() {
    const data = localStorage.getItem(this.storageKey);
    if (!data) return [];
    
    try {
      return JSON.parse(data).map(item => new Employee(item));
    } catch (error) {
      console.error('Error parsing employees data:', error);
      return [];
    }
  }

  isEmailExists(email, excludeId = null) {
    const employees = this.getAll();
    return employees.some(emp => 
      emp.email.toLowerCase() === email.toLowerCase() && 
      (!excludeId || emp.id !== excludeId)
    );
  }

  isPhoneExists(phone, excludeId = null) {
    const cleanPhone = phone.replace(/[\s()-+]/g, '');
    const lastTenDigits = cleanPhone.slice(-10);
    
    const employees = this.getAll();
    return employees.some(emp => {
      const otherCleanPhone = emp.phoneNumber.replace(/[\s()-+]/g, '');
      const otherLastTenDigits = otherCleanPhone.slice(-10);
      
      return lastTenDigits === otherLastTenDigits && (!excludeId || emp.id !== excludeId);
    });
  }

  getById(id) {
    const employees = this.getAll();
    const employee = employees.find(emp => emp.id === id);
    return employee ? new Employee(employee) : null;
  }

  add(employee) {
    const employees = this.getAll();
    employees.push(employee);
    this.saveAll(employees);
    return employee;
  }

  update(updatedEmployee) {
    const employees = this.getAll();
    const index = employees.findIndex(emp => emp.id === updatedEmployee.id);
    
    if (index !== -1) {
      employees[index] = updatedEmployee;
      this.saveAll(employees);
      return updatedEmployee;
    }
    
    return null;
  }

  delete(id) {
    const employees = this.getAll();
    const filteredEmployees = employees.filter(emp => emp.id !== id);
    
    if (filteredEmployees.length !== employees.length) {
      this.saveAll(filteredEmployees);
      return true;
    }
    
    return false;
  }

  saveAll(employees) {
    localStorage.setItem(this.storageKey, JSON.stringify(employees));
  }


  initializeDemoData() {
    const demoEmployees = [
      new Employee({
        firstName: 'Ahmet',
        lastName: 'Sourtimes',
        dateOfEmployment: '2022-09-23',
        dateOfBirth: '1990-09-23',
        phoneNumber: '+(90) 532 123 45 67',
        email: 'ahmet.sourtimes@ing.com',
        department: 'Analytics',
        position: 'Junior'
      }),
      new Employee({
        firstName: 'Ayşe',
        lastName: 'Yılmaz',
        dateOfEmployment: '2021-05-15',
        dateOfBirth: '1988-04-12',
        phoneNumber: '+(90) 532 987 65 43',
        email: 'ayse.yilmaz@ing.com',
        department: 'Tech',
        position: 'Senior'
      }),
      new Employee({
        firstName: 'Mehmet',
        lastName: 'Kaya',
        dateOfEmployment: '2023-01-10',
        dateOfBirth: '1995-11-30',
        phoneNumber: '+(90) 533 456 78 90',
        email: 'mehmet.kaya@ing.com',
        department: 'Tech',
        position: 'Medior'
      })
    ];
    
    this.saveAll(demoEmployees);
  }

  search(query) {
    if (!query) return this.getAll();
    
    query = query.toLowerCase();
    return this.getAll().filter(employee => {
      return (
        employee.firstName.toLowerCase().includes(query) ||
        employee.lastName.toLowerCase().includes(query) ||
        employee.email.toLowerCase().includes(query) ||
        employee.department.toLowerCase().includes(query) ||
        employee.position.toLowerCase().includes(query)
      );
    });
  }
}
