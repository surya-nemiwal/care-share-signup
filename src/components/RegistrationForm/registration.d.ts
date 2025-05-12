export interface FormData {
  userName: string;
  mobileNumber: string;
  address: string;
  city: string;
  state: string;
  dateOfBirth: string;
  gender: string;
  email: string;
}

export interface FormErrors {
  [key: string]: string;
}
