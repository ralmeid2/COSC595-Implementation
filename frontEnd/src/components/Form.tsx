import style from './Form.module.css'
import React from "react";

type FormProps = {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  errorMessage?: string;
  className?: string;
}

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
