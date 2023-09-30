import style from './Form.module.css'
import React from "react";

type FormProps = {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  errorMessage?: string;
  className?: string;
}

/**
 * Basic form component to be used in other components
 * See Add.tsx or Options.tsx for examples on how to use this component
 * @param children Form elements
 * @param onSubmit Function to run when form is submitted
 * @param errorMessage Error message to display if there is an error
 * @param className CSS class name
 */
const Form = ({ children, onSubmit, errorMessage, className }: FormProps) => {
  return (
    <form
      className={className || style.container}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(e);
      }}
    >
      {errorMessage && <p className={style.error}>{errorMessage}</p>}
      {children}
    </form>
  );
}

export default Form;
