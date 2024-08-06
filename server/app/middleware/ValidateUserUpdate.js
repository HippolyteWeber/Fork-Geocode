const xss = require("xss");
const { z } = require("zod");

const userSchema = z.object({
  firstName: z
    .string({
      invalid_type_error: "Votre prénom n'est pas valide",
    })
    .min(3, {
      message: "Votre prénom doit contenir au minimun 3 lettres",
    })
    .max(20, {
      message: "Votre prénom ne peut pas contenir plus de 20 lettres",
    }),
  lastName: z
    .string({
      invalid_type_error: "Votre nom de famille n'est pas valide",
    })
    .min(3, {
      message: "Votre nom de famille doit contenir au minimun 3 lettres",
    })
    .max(20, {
      message: "Votre famille ne peut pas contenir plus de 20 lettres",
    }),
  email: z.string().email({
    invalid_type_error: "Votre email est invalide",
  }),
});

const validateUserUpdate = (req, res, next) => {
  const { firstName, lastName, email } = req.body;

  req.body.firstName = xss(req.body.firstName);
  req.body.lastName = xss(req.body.lastName);
  req.body.email = xss(req.body.email);

  const validate = userSchema.safeParse({
    firstName,
    lastName,
    email,
  });

  if (!validate.success) {
    const errors = validate.error.issues.reduce((acc, issue) => {
      acc[issue.path[0]] = issue.message;
      return acc;
    }, {});
    return res.status(404).json(errors);
  }
  return next();
};

module.exports = validateUserUpdate;
