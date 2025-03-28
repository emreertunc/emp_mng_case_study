import { LOCALES } from './locales.js';

// Türkçe çeviriler (varsayılan dil)
export const TR_TRANSLATIONS = {
  // Genel
  'app_title': 'Çalışan Yönetim Uygulaması',
  'app_description': 'Bu uygulama, HR ekibinin şirket çalışanları hakkındaki bilgileri yönetmesine yardımcı olmak için tasarlanmıştır.',
  
  // Navigasyon
  'nav_employees': 'Çalışanlar',
  'nav_home': 'Ana Sayfa',
  'employee_management': 'Çalışan Yönetimi',
  
  // Ana sayfa
  'go_to_employees': 'Çalışan Listesine Git',
  
  // Çalışan listesi
  'add_employee': 'Çalışan Ekle',
  'search_employees': 'Çalışan Ara...',
  'no_employees': 'Henüz çalışan bulunmuyor.',
  'edit': 'Düzenle',
  'delete': 'Sil',
  'delete_selected': 'Seçilenleri Sil',
  'list_view': 'Liste Görünümü',
  'table_view': 'Tablo Görünümü',
  
  // Tablo başlıkları
  'employee_name': 'Ad',
  'employee_lastname': 'Soyad',
  'employee_department': 'Departman',
  'employee_position': 'Pozisyon',
  'employee_email': 'E-posta',
  'employee_phone': 'Telefon',
  'employee_hire_date': 'İşe Başlama',
  'employee_birth_date': 'Doğum Tarihi',
  'employee_actions': 'İşlemler',
  
  // Form alanları
  'first_name': 'Ad',
  'last_name': 'Soyad',
  'department': 'Departman',
  'position': 'Pozisyon',
  'email': 'E-posta Adresi',
  'phone': 'Telefon Numarası',
  'hire_date': 'İşe Başlama Tarihi',
  'birth_date': 'Doğum Tarihi',
  
  // Form butonları
  'save': 'Kaydet',
  'update': 'Güncelle',
  'cancel': 'İptal',
  'back': 'Geri',
  'reset': 'Sıfırla',
  'back_to_list': 'Listeye Dön',
  'edit_employee_title': 'Çalışan Düzenleme',
  'add_employee_title': 'Yeni Çalışan Ekle',
  'actions': 'İşlemler',
  
  // Onay diyaloğu
  'confirm_add': 'Yeni çalışan eklemek istediğinizden emin misiniz?',
  'confirm_update': '{firstName} {lastName} adlı çalışanın bilgilerini güncellemek istediğinizden emin misiniz?',
  'confirm_delete': '{firstName} {lastName} adlı çalışanı silmek istediğinizden emin misiniz?',
  'confirm_delete_multiple': 'Seçilen çalışanları silmek istediğinizden emin misiniz?',
  'confirm_title_add': 'Çalışan Ekleme',
  'confirm_title_update': 'Çalışan Güncelleme',
  'confirm_title_delete': 'Çalışan Silme',
  'confirm_proceed': 'Evet',
  'confirm_cancel': 'Hayır',
  
  // Hatalar
  'field_required': '{field} alanı zorunludur',
  'invalid_email': 'Geçerli bir e-posta adresi giriniz',
  'invalid_phone': 'Geçerli bir telefon numarası giriniz (+90XXXXXXXXXX veya 05XXXXXXXXX formatında)',
  'email_exists': 'Bu e-posta adresi başka bir çalışan tarafından kullanılıyor',
  'phone_exists': 'Bu telefon numarası başka bir çalışan tarafından kullanılıyor',
  'invalid_birth_date': 'Geçerli bir doğum tarihi giriniz (18 yaşından büyük olmalı)',
  'invalid_hire_date': 'Geçerli bir işe başlama tarihi giriniz (bugün veya daha öncesi olmalı)',
  'hire_date_before_birth_date': 'İşe başlama tarihi doğum tarihinden önce olamaz',
  
  // Bildirimler
  'employee_added': 'Çalışan başarıyla eklendi',
  'employee_updated': 'Çalışan bilgileri başarıyla güncellendi',
  'employee_deleted': 'Çalışan başarıyla silindi',
  
  // Dil Seçimi
  'language': 'Dil',
  'language_tr': 'Türkçe',
  'language_en': 'İngilizce',
};

// İngilizce çeviriler
export const EN_TRANSLATIONS = {
  // General
  'app_title': 'Employee Management Application',
  'app_description': 'This application is designed to help the HR team manage information about company employees.',
  
  // Navigation
  'nav_employees': 'Employees',
  'nav_home': 'Home',
  'employee_management': 'Employee Management',
  
  // Home page
  'go_to_employees': 'Go to Employee List',
  
  // Employee list
  'add_employee': 'Add Employee',
  'search_employees': 'Search Employees...',
  'no_employees': 'No employees found.',
  'edit': 'Edit',
  'delete': 'Delete',
  'delete_selected': 'Delete Selected',
  'list_view': 'List View',
  'table_view': 'Table View',
  
  // Table headers
  'employee_name': 'First Name',
  'employee_lastname': 'Last Name',
  'employee_department': 'Department',
  'employee_position': 'Position',
  'employee_email': 'Email',
  'employee_phone': 'Phone',
  'employee_hire_date': 'Hire Date',
  'employee_birth_date': 'Birth Date',
  'employee_actions': 'Actions',
  
  // Form fields
  'first_name': 'First Name',
  'last_name': 'Last Name',
  'department': 'Department',
  'position': 'Position',
  'email': 'Email Address',
  'phone': 'Phone Number',
  'hire_date': 'Hire Date',
  'birth_date': 'Birth Date',
  
  // Form buttons
  'save': 'Save',
  'update': 'Update',
  'cancel': 'Cancel',
  'back': 'Back',
  'reset': 'Reset',
  'back_to_list': 'Back to List',
  'edit_employee_title': 'Edit Employee',
  'add_employee_title': 'Add New Employee',
  'actions': 'Actions',
  
  // Confirmation dialog
  'confirm_add': 'Are you sure you want to add a new employee?',
  'confirm_update': 'Are you sure you want to update the information for {firstName} {lastName}?',
  'confirm_delete': 'Are you sure you want to delete {firstName} {lastName}?',
  'confirm_delete_multiple': 'Are you sure you want to delete the selected employees?',
  'confirm_title_add': 'Add Employee',
  'confirm_title_update': 'Update Employee',
  'confirm_title_delete': 'Delete Employee',
  'confirm_proceed': 'Yes',
  'confirm_cancel': 'No',
  
  // Errors
  'field_required': '{field} is required',
  'invalid_email': 'Please enter a valid email address',
  'invalid_phone': 'Please enter a valid phone number (in +90XXXXXXXXXX or 05XXXXXXXXX format)',
  'email_exists': 'This email address is already used by another employee',
  'phone_exists': 'This phone number is already used by another employee',
  'invalid_birth_date': 'Please enter a valid birth date (must be at least 18 years old)',
  'invalid_hire_date': 'Please enter a valid hire date (must be today or earlier)',
  'hire_date_before_birth_date': 'Hire date cannot be before birth date',
  
  // Notifications
  'employee_added': 'Employee added successfully',
  'employee_updated': 'Employee updated successfully',
  'employee_deleted': 'Employee deleted successfully',
  
  // Language Selection
  'language': 'Language',
  'language_tr': 'Turkish',
  'language_en': 'English',
};

export const TRANSLATIONS = {
  [LOCALES.TR]: TR_TRANSLATIONS,
  [LOCALES.EN]: EN_TRANSLATIONS
};
