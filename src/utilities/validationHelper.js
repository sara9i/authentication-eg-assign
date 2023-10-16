export const validate = async ({ schema, formData, setErrors }) => {
  setErrors({});

  let isValid = await schema
    .validate(formData, {
      abortEarly: false
    })
    .then(() => true)
    .catch((validationErr) => {
      if (Array.isArray(validationErr.inner)) {
        let errors = {};
        validationErr.inner.forEach(
          ({ path, message }) => (errors[path] = message)
        );
        setErrors(errors);
      }
      return false;
    });

  return isValid;
};
