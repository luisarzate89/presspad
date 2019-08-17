import * as Yup from "yup";

const schema = Yup.object().shape({
  profileImage: Yup.object().shape({
    fileName: Yup.string().required("Required"),
    isPrivate: Yup.boolean().default(false)
  }),
  bio: Yup.string().required("Required"),
  // Todo/ add this when we change the design to mach this.
  // favouriteArticle: Yup.object().shape({
  //   title: Yup.string(),
  //   author: Yup.string(),
  //   link: Yup.string()
  // }),
  jobTitle: Yup.string().required("Required"),
  organisation: Yup.object().shape({
    name: Yup.string(),
    website: Yup.string()
  }),

  photoIDFile: Yup.object().shape({
    fileName: Yup.string(),
    isPrivate: Yup.boolean().default(true)
  }),
  offerLetter: Yup.object().shape({
    fileName: Yup.string(),
    isPrivate: Yup.boolean().default(true)
  }),
  reference1: Yup.object().shape({
    name: Yup.string().test("both required", "must fill both", function(name) {
      const { contact } = this.parent;
      if (contact && !name) {
        return false;
      }
      return true;
    }),
    contact: Yup.string().test("both required", "must fill both", function(
      contact
    ) {
      const { name } = this.parent;
      if (name && !contact) {
        return false;
      }
      return true;
    })
  }),
  reference2: Yup.object().shape({
    name: Yup.string().test("both required", "must fill both", function(name) {
      const { contact } = this.parent;
      if (contact && !name) {
        return false;
      }
      return true;
    }),
    contact: Yup.string().test("both required", "must fill both", function(
      contact
    ) {
      const { name } = this.parent;
      if (name && !contact) {
        return false;
      }
      return true;
    })
  })
});

export default schema;
