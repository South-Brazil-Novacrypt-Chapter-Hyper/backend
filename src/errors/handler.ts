import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'yup';

interface ValidationErrors {
    [key: string]: string[];
}

// eslint-disable-next-line no-unused-vars
const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  if (error instanceof ValidationError) {
    const errors: ValidationErrors = {};

    error.inner.forEach((err) => {
      errors[err.path] = err.errors;
    });

    return response.status(400).json({ msg: 'Validation fails', errors });
  }

  return response.status(500).json({ message: 'Internal server error', error });
};

export default errorHandler;
