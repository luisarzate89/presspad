import * as Yup from "yup";

export const withdrawSchema = availableBalance =>
  Yup.object().shape({
    bankName: Yup.string()
      .typeError("must be a string")
      .required("Required"),
    bankSortCode: Yup.string()
      .typeError("must be a string")
      .required("Required"),
    bankNumber: Yup.string()
      .typeError("must be a string")
      .required("Required"),
    withdrawValue: Yup.number()
      .typeError("must be a valid number")
      .required("Required")
      .min(1, "must be valid value")
      .max(
        availableBalance,
        `can't donate more than what you have: ${availableBalance}`
      )
  });

export const donateSchema = availableBalance =>
  Yup.object().shape({
    donateValue: Yup.number()
      .typeError("must be a valid number")
      .required("Required")
      .min(1, "must be valid value")
      .max(
        availableBalance,
        `can't donate more than what you have: ${availableBalance}`
      )
  });
