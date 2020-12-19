export const validationMessages = (question, hasValue, dirty, validate) => {
  const { id, answer, zeroErrorMessage } = question;

  if (id === "age" || id === "salary" || id === "expenses" || id === "income") {
    if (answer.toString()[0] == 0) {
      return false;
    }
  }
  if (!question.required && !hasValue && dirty) {
    return true;
  }

  if (validate()) {
    return true;
  }

  return false;
};

export const zeroValidationError = question => {
  const { id, answer, zeroErrorMessage } = question;

  if (id === "age" || id === "salary" || id === "expenses" || id === "income") {
    if (answer.toString()[0] == 0) {
      return {
        error: true,
        message:
          zeroErrorMessage ||
          "Your input is starting with a 0, which is not a valid number."
      };
    }
  }
};
