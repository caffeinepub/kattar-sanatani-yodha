import { useState } from "react";

export function useContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const submitForm = async (
    _name: string,
    _email: string,
    _message: string,
    _phoneNumber: string,
    _whatsappNumber: string,
  ) => {
    setIsSubmitting(true);
    setIsSuccess(false);
    setIsError(false);

    // Contact form submission is temporarily unavailable.
    // The backend no longer exposes submitContactForm after migration.
    // Users are directed to contact via phone/WhatsApp/email directly.
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsError(true);
    setIsSubmitting(false);
  };

  return {
    submitForm,
    isSubmitting,
    isSuccess,
    isError,
  };
}
