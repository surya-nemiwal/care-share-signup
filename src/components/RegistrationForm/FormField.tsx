import { useState } from "react";
import styles from "./FormField.module.css";
import { FormData } from "./registration";
import Dropdown from "./DropDown";

interface FormFieldProps {
  id: string;
  label: string;
  type: string;
  placeholder?: string;
  value: string;
  onChange: (name: string, value: string) => void;
  errorMessage?: string;
  options?: string[];
  validateField?: (value: keyof FormData) => void;
  showIcon?: boolean;
  visited: boolean;
  setVisited: () => void;
}

function classNames(...args: (string | false | null | undefined)[]): string {
  return args.filter(Boolean).join(" ");
}

const PenIcon = ({ penColor }: { penColor: string }) => (
  <svg
    width="25"
    height="25"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      fill={penColor}
      fillRule="evenodd"
      d="M18.6778 2.70711C17.5062 1.53554 15.6067 1.53554 14.4351 2.70711L4.17044 12.9718L3.10607 18.7795C2.85377 20.1561 4.05717 21.3595 5.43384 21.1072L11.2415 20.0429L21.5062 9.77818C22.6778 8.60661 22.6778 6.70711 21.5062 5.53554L18.6778 2.70711ZM15.8493 4.12132C16.2399 3.7308 16.873 3.7308 17.2635 4.12132L20.092 6.94975C20.4825 7.34028 20.4825 7.97344 20.092 8.36396L18.5923 9.86366L14.3496 5.62102L15.8493 4.12132ZM12.9354 7.03524L6.02533 13.9453L5.0733 19.14L10.268 18.188L17.1781 11.2779L12.9354 7.03524Z"
      clipRule="evenodd"
    />
  </svg>
);

export const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="2"
    stroke="currentColor"
    aria-hidden="true"
    width="25"
    height="25"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M5 13l4 4L19 7"
    ></path>
  </svg>
);

const FormField: React.FC<FormFieldProps> = (props) => {
  const {
    id,
    label,
    type,
    placeholder,
    value,
    onChange,
    errorMessage = "",
    options = [],
    validateField,
    showIcon = true,
    visited,
    setVisited,
  } = props;

  const [inFocus, setInFoucs] = useState(false);

  const onBlur = () => {
    if (!visited) {
      setVisited();
    }
    setInFoucs(false);
    validateField?.(id as keyof FormData);
  };

  const onFocus = () => {
    setInFoucs(true);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(id, e.target.value);
  };

  const showError = !inFocus && errorMessage.length > 0;
  const showLabelInCenter = !visited && !inFocus && !showError;
  const showCheckIcon = !showError && visited && !inFocus;
  const penColor = showError ? "#ef4444" : "#1C2A46";

  let labelText = label;
  if (showError) {
    labelText = errorMessage;
  }

  return (
    <div
      className={classNames(
        "flex relative",
        styles["input-container"],
        type === "email" && styles.email,
        showError && styles.error,
        inFocus && styles.focus
      )}
    >
      <label
        htmlFor={id}
        className={classNames(
          "z-10",
          styles["input-label"],
          showLabelInCenter && styles["center"]
        )}
      >
        {labelText}
      </label>
      {type !== "dropdown" && (
        <input
          className={classNames(
            "pt-4 w-full flex-1",
            styles["input-field"],
            type === "email" && styles.email
          )}
          type={type}
          placeholder={!showLabelInCenter ? placeholder : ""}
          onBlur={onBlur}
          onFocus={onFocus}
          id={id}
          name={id}
          value={value}
          onChange={handleOnChange}
          autoComplete="off"
        />
      )}
      {type === "dropdown" && (
        <Dropdown
          options={options}
          onFocus={onFocus}
          onBlur={onBlur}
          className={`pt-4 w-full flex-1 ${styles["input-field"]}`}
          onChange={(value) => onChange(id, value)}
          inFocus={inFocus}
          value={value}
        />
      )}
      {showIcon && (
        <div className="self-end pb-2 pr-2">
          {showCheckIcon ? <CheckIcon /> : <PenIcon penColor={penColor} />}
        </div>
      )}
    </div>
  );
};

export default FormField;
