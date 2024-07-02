const STATUS = {
  ALL: {
    DELETED_ITEM: "DELETED_ITEM",
    NAME_IS_REQUESTED: "NAME_IS_REQUESTED",
    INVALID_USER_ID: "INVALID_USER_ID",
  },
  CONTACT: {
    EMAIL_IN_USE: "EMAIL_IN_USE", // This e-mail is already in use.
    NOT_FOUND: "CONTACT_NOT_FOUND",
  },
  CATEGORY: {
    NOT_FOUND: "CATEGORY_NOT_FOUND",
  },
};

module.exports = { STATUS };
