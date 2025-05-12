import {
  FormData,
  FormErrors,
} from "@/components/RegistrationForm/registration";
import { ValidationRule } from "./utils";

// Email validation regex
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Format mobile number as user types (XXX) XXX-XXXX
export const formatMobileNumber = (value: string): string => {
  // Strip all non-digit characters
  const digits = value.replace(/\D/g, "");
  if(digits.length === 0) {
    return ''
  }
  // Apply formatting based on length
  if (digits.length <= 3) {
    return `(${digits}`;
  }
  if (digits.length <= 6) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  }
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
};

// Format Date as user types MM/DD/YYYY
export const formatDate = (value: string): string => {
  // Strip all non-digit characters
  const digits = value.replace(/\D/g, "");

  // Apply formatting based on length
  if (digits.length <= 2) {
    return digits;
  }
  if (digits.length <= 4) {
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`;
};

export const validateMobileNumber = (mobileNumber: string) => {
  // Mobile Number validation
  if (!mobileNumber) {
    return "Mobile number is required";
  }
  // Strip all non-digit characters
  const digits = mobileNumber.replace(/\D/g, "");
  if (digits.length !== 10) {
    return "Please enter a valid 10-digit mobile number";
  }
  return "";
};

// Check if user is at least 18 years old
const isAtLeast18 = (month: number, day: number, year: number): boolean => {
  // Month is 0-indexed in JavaScript
  const birthDate = new Date(year, month - 1, day);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age >= 18;
};

// Validate date format (MM/DD/YYYY)
export const validateDate = (dateString: string): string => {
  // Basic format check
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) {
    return "Invalid format - must be MM/DD/YYYY";
  }

  const [month, day, year] = dateString.split("/").map(Number);

  if (year < 1900 || year > new Date().getFullYear()) {
    return "Invalid format - year is invalid";
  }

  if (month < 1 || month > 12) {
    return "Invalid format - month is invalid";
  }

  const daysInMonth = [
    31,
    (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  if (day < 1 || day > daysInMonth[month - 1]) {
    return "Invalid format - day is invalid";
  }

  if (!isAtLeast18(month, day, year)) {
    return "You must be atleast 18 to register on this site";
  }

  return "";
};

export const validateUserName = (userName: string): string => {
  const [firstName, lastName] = userName.trim().split(" ");
  if (firstName.length === 0) {
    return "First name is required";
  }
  if (!lastName || lastName.length === 0) {
    return "Add both first and last name";
  }
  return "";
};

export const validateEmail = (email: string): string => {
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address";
  }
  return "";
};

// Validation Utility Functions
export const validateFormField = (
  fieldName: keyof FormData,
  formData: FormData
) => {
  const rule = validationRules[fieldName];
  if (!rule) {
    return "";
  }
  const fieldValue = formData[fieldName];

  // Check if field is required and empty
  if (rule.required && !fieldValue.trim()) {
    return "Required field.";
  }

  // If not empty, run specific validation
  return rule.validate?.(fieldValue) || "";
};

export const validateForm = (data: FormData): [FormErrors, boolean] => {
  const errors: FormErrors = {};
  let isValid = true;
  // Validate each field
  (Object.keys(validationRules) as Array<keyof FormData>).forEach(
    (fieldName) => {
      const error = validateFormField(fieldName, data);
      if (error) {
        isValid = false;
        errors[fieldName] = error;
      }
    }
  );
  return [errors, isValid];
};

// Validation Rules Map
export const validationRules: Partial<Record<keyof FormData, ValidationRule>> =
  {
    userName: {
      validate: validateUserName,
      required: true,
    },
    address: {
      required: true,
    },
    city: {
      required: true,
    },
    state: {
      required: true,
    },
    mobileNumber: {
      validate: validateMobileNumber,
      required: true,
    },
    dateOfBirth: {
      validate: validateDate,
      required: true,
    },
    gender: {
      required: true,
    },
    email: {
      validate: validateEmail,
      required: true,
    },
  };
