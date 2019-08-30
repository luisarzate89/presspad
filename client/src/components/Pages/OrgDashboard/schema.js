import * as Yup from "yup";
import moment from "moment";

export default Yup.object().shape({
  discountRate: Yup.number()
    .typeError("must be a number")
    .required("Required")
    .min(0)
    .max(100),

  internName: Yup.string()
    .typeError("must be a string")
    .required("Required"),

  internId: Yup.string()
    .nullable()
    .test("is-mongo-id-length", "not valid", value =>
      value ? value.length === 24 : true
    ),

  startDate: Yup.string()
    .required("Required")
    .test("is-start-date-valid", "not valid", function(startDate) {
      const { endDate } = this.parent;

      return (
        moment(startDate).valueOf() > moment().subtract(1, "day") &&
        moment(startDate).valueOf() < moment(endDate).valueOf()
      );
    }),

  endDate: Yup.string()
    .required("Required")
    .test("is-end-date-valid", "not valid", function(endDate) {
      const { startDate } = this.parent;

      return (
        moment(endDate).valueOf() > moment().subtract(1, "day") &&
        moment(startDate).valueOf() < moment(endDate).valueOf()
      );
    })
});
