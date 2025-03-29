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
      }),
      new Employee({
        firstName: 'Zeynep',
        lastName: 'Demir',
        dateOfEmployment: '2020-03-05',
        dateOfBirth: '1992-07-18',
        phoneNumber: '+(90) 534 567 89 01',
        email: 'zeynep.demir@ing.com',
        department: 'Analytics',
        position: 'Senior'
      }),
      new Employee({
        firstName: 'Can',
        lastName: 'Çelik',
        dateOfEmployment: '2019-08-12',
        dateOfBirth: '1987-12-05',
        phoneNumber: '+(90) 535 678 90 12',
        email: 'can.celik@ing.com',
        department: 'Tech',
        position: 'Medior'
      }),
      new Employee({
        firstName: 'Elif',
        lastName: 'Yıldız',
        dateOfEmployment: '2022-11-20',
        dateOfBirth: '1993-09-15',
        phoneNumber: '+(90) 536 789 01 23',
        email: 'elif.yildiz@ing.com',
        department: 'Analytics',
        position: 'Junior'
      }),
      new Employee({
        firstName: 'Burak',
        lastName: 'Aydın',
        dateOfEmployment: '2021-02-28',
        dateOfBirth: '1989-10-22',
        phoneNumber: '+(90) 537 890 12 34',
        email: 'burak.aydin@ing.com',
        department: 'Tech',
        position: 'Senior'
      }),
      new Employee({
        firstName: 'Gül',
        lastName: 'Öztürk',
        dateOfEmployment: '2020-07-14',
        dateOfBirth: '1991-03-27',
        phoneNumber: '+(90) 538 901 23 45',
        email: 'gul.ozturk@ing.com',
        department: 'Analytics',
        position: 'Medior'
      }),
      new Employee({
        firstName: 'Ali',
        lastName: 'Koç',
        dateOfEmployment: '2023-05-09',
        dateOfBirth: '1996-01-14',
        phoneNumber: '+(90) 539 012 34 56',
        email: 'ali.koc@ing.com',
        department: 'Tech',
        position: 'Junior'
      }),
      new Employee({
        firstName: 'Selin',
        lastName: 'Şahin',
        dateOfEmployment: '2018-09-30',
        dateOfBirth: '1986-08-21',
        phoneNumber: '+(90) 540 123 45 67',
        email: 'selin.sahin@ing.com',
        department: 'Tech',
        position: 'Senior'
      }),
      new Employee({
        firstName: 'Murat',
        lastName: 'Aslan',
        dateOfEmployment: '2022-01-17',
        dateOfBirth: '1994-05-03',
        phoneNumber: '+(90) 541 234 56 78',
        email: 'murat.aslan@ing.com',
        department: 'Tech',
        position: 'Junior'
      }),
      new Employee({
        firstName: 'Deniz',
        lastName: 'Arslan',
        dateOfEmployment: '2019-11-08',
        dateOfBirth: '1990-12-09',
        phoneNumber: '+(90) 542 345 67 89',
        email: 'deniz.arslan@ing.com',
        department: 'Tech',
        position: 'Medior'
      }),
      new Employee({
        firstName: 'Esra',
        lastName: 'Doğan',
        dateOfEmployment: '2021-06-22',
        dateOfBirth: '1993-02-17',
        phoneNumber: '+(90) 543 456 78 90',
        email: 'esra.dogan@ing.com',
        department: 'Tech',
        position: 'Senior'
      }),
      new Employee({
        firstName: 'Onur',
        lastName: 'Erdoğan',
        dateOfEmployment: '2020-09-11',
        dateOfBirth: '1988-07-04',
        phoneNumber: '+(90) 544 567 89 01',
        email: 'onur.erdogan@ing.com',
        department: 'Analytics',
        position: 'Senior'
      }),
      new Employee({
        firstName: 'Ebru',
        lastName: 'Güneş',
        dateOfEmployment: '2022-08-03',
        dateOfBirth: '1995-04-19',
        phoneNumber: '+(90) 545 678 90 12',
        email: 'ebru.gunes@ing.com',
        department: 'Tech',
        position: 'Junior'
      }),
      new Employee({
        firstName: 'Serkan',
        lastName: 'Çetin',
        dateOfEmployment: '2017-10-25',
        dateOfBirth: '1985-09-11',
        phoneNumber: '+(90) 546 789 01 23',
        email: 'serkan.cetin@ing.com',
        department: 'Analytics',
        position: 'Senior'
      }),
      new Employee({
        firstName: 'Merve',
        lastName: 'Tan',
        dateOfEmployment: '2021-03-14',
        dateOfBirth: '1992-11-26',
        phoneNumber: '+(90) 547 890 12 34',
        email: 'merve.tan@ing.com',
        department: 'Tech',
        position: 'Medior'
      }),
      new Employee({
        firstName: 'Tolga',
        lastName: 'Yılmaz',
        dateOfEmployment: '2023-02-18',
        dateOfBirth: '1994-06-08',
        phoneNumber: '+(90) 548 901 23 45',
        email: 'tolga.yilmaz@ing.com',
        department: 'Tech',
        position: 'Junior'
      }),
      new Employee({
        firstName: 'Ceren',
        lastName: 'Kılıç',
        dateOfEmployment: '2019-04-02',
        dateOfBirth: '1987-03-15',
        phoneNumber: '+(90) 549 012 34 56',
        email: 'ceren.kilic@ing.com',
        department: 'Tech',
        position: 'Senior'
      }),
      new Employee({
        firstName: 'Kerem',
        lastName: 'Bulut',
        dateOfEmployment: '2021-09-19',
        dateOfBirth: '1991-08-24',
        phoneNumber: '+(90) 550 123 45 67',
        email: 'kerem.bulut@ing.com',
        department: 'Analytics',
        position: 'Medior'
      }),
      new Employee({
        firstName: 'Gökhan',
        lastName: 'Temel',
        dateOfEmployment: '2019-12-07',
        dateOfBirth: '1989-01-30',
        phoneNumber: '+(90) 551 234 56 78',
        email: 'gokhan.temel@ing.com',
        department: 'Tech',
        position: 'Senior'
      }),
      new Employee({
        firstName: 'Seda',
        lastName: 'Yıldırım',
        dateOfEmployment: '2022-04-29',
        dateOfBirth: '1990-11-13',
        phoneNumber: '+(90) 552 345 67 89',
        email: 'seda.yildirim@ing.com',
        department: 'Tech',
        position: 'Junior'
      }),
      new Employee({
        firstName: 'Berk',
        lastName: 'Kara',
        dateOfEmployment: '2018-05-12',
        dateOfBirth: '1986-12-25',
        phoneNumber: '+(90) 553 456 78 90',
        email: 'berk.kara@ing.com',
        department: 'Tech',
        position: 'Senior'
      }),
      new Employee({
        firstName: 'Yasemin',
        lastName: 'Akçay',
        dateOfEmployment: '2021-11-03',
        dateOfBirth: '1993-07-16',
        phoneNumber: '+(90) 554 567 89 01',
        email: 'yasemin.akcay@ing.com',
        department: 'Tech',
        position: 'Medior'
      }),
      new Employee({
        firstName: 'Emre',
        lastName: 'Güler',
        dateOfEmployment: '2022-10-15',
        dateOfBirth: '1996-09-07',
        phoneNumber: '+(90) 555 678 90 12',
        email: 'emre.guler@ing.com',
        department: 'Tech',
        position: 'Junior'
      }),
      new Employee({
        firstName: 'Damla',
        lastName: 'İnan',
        dateOfEmployment: '2020-01-21',
        dateOfBirth: '1992-04-28',
        phoneNumber: '+(90) 556 789 01 23',
        email: 'damla.inan@ing.com',
        department: 'Analytics',
        position: 'Medior'
      }),
      new Employee({
        firstName: 'Kadir',
        lastName: 'Özkan',
        dateOfEmployment: '2019-06-18',
        dateOfBirth: '1988-05-09',
        phoneNumber: '+(90) 557 890 12 34',
        email: 'kadir.ozkan@ing.com',
        department: 'Analytics',
        position: 'Senior'
      }),
      new Employee({
        firstName: 'Melis',
        lastName: 'Demir',
        dateOfEmployment: '2023-04-05',
        dateOfBirth: '1995-02-14',
        phoneNumber: '+(90) 558 901 23 45',
        email: 'melis.demir@ing.com',
        department: 'Tech',
        position: 'Junior'
      }),
      new Employee({
        firstName: 'Umut',
        lastName: 'Koç',
        dateOfEmployment: '2018-08-22',
        dateOfBirth: '1987-10-03',
        phoneNumber: '+(90) 559 012 34 56',
        email: 'umut.koc@ing.com',
        department: 'Analytics',
        position: 'Senior'
      }),
      new Employee({
        firstName: 'Burcu',
        lastName: 'Erdem',
        dateOfEmployment: '2021-07-11',
        dateOfBirth: '1994-03-29',
        phoneNumber: '+(90) 530 123 45 67',
        email: 'burcu.erdem@ing.com',
        department: 'Analytics',
        position: 'Junior'
      }),
      new Employee({
        firstName: 'Mert',
        lastName: 'Akça',
        dateOfEmployment: '2020-06-27',
        dateOfBirth: '1991-12-17',
        phoneNumber: '+(90) 531 234 56 78',
        email: 'mert.akca@ing.com',
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
