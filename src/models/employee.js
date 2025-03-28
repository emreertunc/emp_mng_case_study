export class Employee {
  constructor(data = {}) {
    this.id = data.id || crypto.randomUUID();
    this.firstName = data.firstName || '';
    this.lastName = data.lastName || '';
    this.dateOfEmployment = data.dateOfEmployment || '';
    this.dateOfBirth = data.dateOfBirth || '';
    this.phoneNumber = data.phoneNumber || '';
    this.email = data.email || '';
    this.department = data.department || 'Analytics';
    this.position = data.position || 'Junior';
  }
  
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
  
  updateFromFormData(formData) {
    this.firstName = formData.firstName;
    this.lastName = formData.lastName;
    this.dateOfEmployment = formData.dateOfEmployment;
    this.dateOfBirth = formData.dateOfBirth;
    this.phoneNumber = formData.phoneNumber;
    this.email = formData.email;
    this.department = formData.department;
    this.position = formData.position;
    return this;
  }
}
