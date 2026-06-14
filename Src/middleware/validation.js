

export const validate = (schemas) => {
  return (req, res, next) => {
    const errors = [];

    // body validation
    if (schemas.body) {
      const { error } = schemas.body.validate(req.body, {
        abortEarly: false,
      });

      if (error) {
        errors.push(...error.details.map((e) => e.message));
      }
    }

    // file validation
    if (schemas.file) {
      const { error } = schemas.file.validate(req.file, {
        abortEarly: false,
      });

      if (error) {
        errors.push(...error.details.map((e) => e.message));
      }
    }

    // params validation
    if (schemas.params) {
      const { error } = schemas.params.validate(req.params, {
        abortEarly: false,
      });

      if (error) {
        errors.push(...error.details.map((e) => e.message));
      }
    }

    // query validation
    if (schemas.query) {
      const { error } = schemas.query.validate(req.query, {
        abortEarly: false,
      });

      if (error) {
        errors.push(...error.details.map((e) => e.message));
      }
    }

    if (errors.length > 0) {
      return res.status(400).json({
        message: "Validation Error",
        errors,
      });
    }

    next();
  };
};



