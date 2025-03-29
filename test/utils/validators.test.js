import { expect } from '@open-wc/testing';
import { validateEmail, validatePhone, validateDate, validateRequired } from '../../src/utils/validators.js';

describe('Validators', () => {
  describe('validateEmail', () => {
    it('validates correct email formats', () => {
      expect(validateEmail('test@example.com')).to.be.true;
      expect(validateEmail('test.name@example.co.uk')).to.be.true;
      expect(validateEmail('test+label@example.com')).to.be.true;
    });

    it('rejects incorrect email formats', () => {
      expect(validateEmail('test@')).to.be.false;
      expect(validateEmail('test@.')).to.be.false;
      expect(validateEmail('@example.com')).to.be.false;
      expect(validateEmail('test@example')).to.be.false;
      expect(validateEmail('test.example.com')).to.be.false;
    });

    it('handles empty and null values', () => {
      expect(validateEmail('')).to.be.false;
      expect(validateEmail(null)).to.be.false;
      expect(validateEmail(undefined)).to.be.false;
    });
  });

  describe('validatePhone', () => {
    it('validates correct phone formats', () => {
      expect(validatePhone('1234567890')).to.be.true;
      expect(validatePhone('123-456-7890')).to.be.true;
      expect(validatePhone('(123) 456-7890')).to.be.true;
      expect(validatePhone('+1-123-456-7890')).to.be.true;
    });

    it('rejects incorrect phone formats', () => {
      expect(validatePhone('123')).to.be.false;
      expect(validatePhone('abcdefghij')).to.be.false;
      expect(validatePhone('123-abc-defg')).to.be.false;
    });

    it('handles empty and null values', () => {
      expect(validatePhone('')).to.be.false;
      expect(validatePhone(null)).to.be.false;
      expect(validatePhone(undefined)).to.be.false;
    });
  });

  describe('validateDate', () => {
    it('validates dates in correct format', () => {
      expect(validateDate('2023-01-01')).to.be.true;
      expect(validateDate('2000-12-31')).to.be.true;
    });

    it('rejects invalid dates', () => {
      expect(validateDate('2023-13-01')).to.be.false;
      expect(validateDate('2023-04-31')).to.be.false;
      expect(validateDate('2023/01/01')).to.be.false;
    });

    it('validates date ranges', () => {
      const today = new Date();
      const futureDate = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate());
      const pastDate = new Date(1900, 0, 1);

      expect(validateDate(futureDate.toISOString().split('T')[0])).to.be.false;
      expect(validateDate(pastDate.toISOString().split('T')[0])).to.be.true;
    });

    it('handles empty and null values', () => {
      expect(validateDate('')).to.be.false;
      expect(validateDate(null)).to.be.false;
      expect(validateDate(undefined)).to.be.false;
    });
  });

  describe('validateRequired', () => {
    it('validates non-empty values', () => {
      expect(validateRequired('test')).to.be.true;
      expect(validateRequired('0')).to.be.true;
      expect(validateRequired(0)).to.be.true;
      expect(validateRequired(false)).to.be.true;
    });

    it('rejects empty values', () => {
      expect(validateRequired('')).to.be.false;
      expect(validateRequired(null)).to.be.false;
      expect(validateRequired(undefined)).to.be.false;
    });

    it('handles whitespace', () => {
      expect(validateRequired('   ')).to.be.false;
      expect(validateRequired('\\n')).to.be.false;
      expect(validateRequired('\\t')).to.be.false;
    });
  });
});
