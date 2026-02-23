import { useState } from 'react';
import { useActor } from './useActor';

export function useContactForm() {
  const { actor } = useActor();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const submitForm = async (name: string, email: string, message: string) => {
    if (!actor) {
      setIsError(true);
      return;
    }

    setIsSubmitting(true);
    setIsSuccess(false);
    setIsError(false);

    try {
      await actor.submitContactForm(name, email, message);
      setIsSuccess(true);
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submitForm,
    isSubmitting,
    isSuccess,
    isError,
  };
}
