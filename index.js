// TODO : yargs
// const argv = require("yargs").argv;

const operationContact = require("./contacts");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await operationContact.listContacts();
      console.log("allContacts", allContacts);
      break;

    case "get":
      if (id) {
        const allContacts = await operationContact.listContacts();
        console.log("allContacts", allContacts);
        break;
      }
      console.log(" Enter id ");
      break;

    case "add":
      if (name && email && phone) {
        const newContact = await operationContact.addContact(
          name,
          email,
          phone
        );
        console.log("newContact", newContact);
        break;
      }
      console.log(" Enter name, email, phone ");
      break;

    case "remove":
      const delContact = await operationContact.removeContact(id);
      console.log("delContact", delContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
