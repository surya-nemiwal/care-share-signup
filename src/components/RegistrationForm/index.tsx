"use client";
import { useState } from "react";
import FormField from "./FormField";
import { FormData, FormErrors } from "./registration";
import {
  formatDate,
  formatMobileNumber,
  validateForm,
  validateFormField,
} from "@/utils/signupFormValidations";
import styles from "./styles.module.css";

const initialFormData: FormData = {
  userName: "",
  mobileNumber: "",
  address: "",
  city: "",
  state: "",
  dateOfBirth: "",
  gender: "",
  email: "",
};

const initialTouchedState: Record<keyof FormData, boolean> = {
  userName: false,
  mobileNumber: false,
  address: false,
  city: false,
  state: false,
  dateOfBirth: false,
  gender: false,
  email: false,
};

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<keyof FormData, boolean>>(initialTouchedState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (name: string, value: string) => {
    if (name === "mobileNumber") {
      const formattedMobileNumber = formatMobileNumber(value);
      setFormData({ ...formData, mobileNumber: formattedMobileNumber });
      return;
    }

    if (name === "dateOfBirth") {
      const formattedDate = formatDate(value);
      setFormData({ ...formData, dateOfBirth: formattedDate });
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const validateField = (fieldName: keyof FormData) => {
    const error = validateFormField(fieldName, formData);
    setErrors({ ...errors, [fieldName]: error });
  };

  const setFieldVisited = (fieldName: keyof FormData) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const [newErrors, isValid] = validateForm(formData);
    if (!isValid) {
      setErrors({ ...errors, ...newErrors });
      return;
    }

    setIsSubmitting(true);
    setSubmissionError(null);
    setIsSuccess(false);

    // Simulate form submission
    setTimeout(() => {
      try {
        // Randomly decide if submission is successful (65% success rate)
        const isSuccessful = Math.random() < 0.65;
        
        if (!isSuccessful) {
          throw new Error("Something went wrong, please try later.");
        }

        // Simulate API call
        console.log("Form submitted successfully:", formData);
        setIsSuccess(true);
        setFormData(initialFormData); // Reset form
        setTouched(initialTouchedState); // Reset touched state
      } catch (error) {
        setSubmissionError(error instanceof Error ? error.message : "Failed to submit form. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }, 1500);
  };
  return (
    <div className="flex flex-col justify-center items-center w-full my-5 lg:w-1/2">
      <h1 className="text-4xl mb-6 hidden lg:block">Sign up</h1>
      <form onSubmit={handleFormSubmit} noValidate className="px-2">
        <div className={`rounded-md bg-white ${styles["form-container"]}`}>
          <h2 className={`text-xl p-3 pl-6 divider ${styles.divider}`}>
            Your information
          </h2>
          <FormField
            type="text"
            id="userName"
            label="Full name"
            value={formData.userName}
            onChange={handleChange}
            placeholder="Full name"
            errorMessage={errors["userName"]}
            validateField={validateField}
            visited={touched.userName}
            setVisited={() => setFieldVisited("userName")}
          />
          <FormField
            type="text"
            id="address"
            label="Address"
            value={formData.address}
            onChange={handleChange}
            placeholder="house number, stree ..."
            errorMessage={errors["address"]}
            validateField={validateField}
            visited={touched.address}
            setVisited={() => setFieldVisited("address")}
          />
          <div className="flex">
            <FormField
              type="text"
              id="city"
              label="City"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              errorMessage={errors["city"]}
              validateField={validateField}
              visited={touched.city}
              setVisited={() => setFieldVisited("city")}
            />
            <div className={`${styles["vertical-divider"]}`} />
            <FormField
              type="text"
              id="state"
              label="State"
              value={formData.state}
              onChange={handleChange}
              placeholder="State"
              errorMessage={errors["state"]}
              validateField={validateField}
              visited={touched.state}
              setVisited={() => setFieldVisited("state")}
            />
          </div>
          <FormField
            type="text"
            id="mobileNumber"
            label="Mobile number"
            value={formData.mobileNumber}
            onChange={handleChange}
            placeholder="(000) 000-0000"
            errorMessage={errors["mobileNumber"]}
            validateField={validateField}
            visited={touched.mobileNumber}
            setVisited={() => setFieldVisited("mobileNumber")}
          />
          <FormField
            type="text"
            id="dateOfBirth"
            label="Date of birth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            placeholder="MM/DD/YYYY"
            errorMessage={errors["dateOfBirth"]}
            validateField={validateField}
            visited={touched.dateOfBirth}
            setVisited={() => setFieldVisited("dateOfBirth")}
          />
          <div className="relative z-[11]">
            <FormField
              type="dropdown"
              options={["Male", "Female", "Other"]}
              id="gender"
              label="Gender"
              value={formData.gender}
              onChange={handleChange}
              placeholder="MM/DD/YYYY"
              errorMessage={errors["gender"]}
              validateField={validateField}
              showIcon={false}
              visited={touched.gender}
              setVisited={() => setFieldVisited("gender")}
            />
          </div>
        </div>
        <div className="mt-5">
          <FormField
            type="email"
            id="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            errorMessage={errors["email"]}
            validateField={validateField}
            showIcon={false}
            visited={touched.email}
            setVisited={() => setFieldVisited("email")}
          />
        </div>
        <button
          className={`w-full h-10 text-white bg-[#2B3649] rounded-md my-5 ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Continue with email"}
        </button>
        
        <div className="max-w-[320px]">
          {isSuccess && (
            <p className="p-2 bg-green-100 text-green-700 rounded-md text-center">
              Registration successful! Thank you for signing up.
            </p>
          )}

          {submissionError && (
            <p className="p-2 bg-red-100 text-red-700 rounded-md text-center">
              {submissionError}
            </p>
          )}
        </div>
        <p className="text-sm text-center">
          By signing up, I agree to{" "}
          <span className="text-[#00BFA5]">Offer Terms</span>
        </p>
      </form>
    </div>
  );
};

export default RegistrationForm;
