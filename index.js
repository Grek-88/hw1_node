console.log("Welcome to Paradise");

const operationContact = require("./contacts");
// console.log("getContactById", getContactById);

(async () => {
  try {
    await operationContact.getContactById(9);
  } catch (error) {
    console.log("error", error);
  }
})();
