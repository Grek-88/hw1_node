const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "db/contacts.json");

// TODO: задокументировать каждую функцию
async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);

    const contacts = JSON.parse(data);

    return contacts;
  } catch (error) {
    throw error;
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const selectContact = contacts.find((el) => el.id === contactId);
    // console.log("getContactById ~ selectContact", selectContact);
    if (!selectContact) {
      throw new Error(`Contact with id=${contactId} not found`);
    }
    return selectContact;
  } catch (error) {
    throw error;
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();

    const delContact = await getContactById(contactId);

    const newContacts = contacts.filter((el) => el.id !== contactId);
    const newContatcsString = JSON.stringify(newContacts);

    await fs.writeFile(contactsPath, newContatcsString);

    return delContact;
  } catch (error) {
    throw error;
  }
}

async function addContact(name, email, phone) {
  try {
    const newContact = { name, email, phone, id: v4() };

    const contacts = await listContacts();
    const newContacts = [...contacts, newContact];

    const newContatcsString = JSON.stringify(newContacts);

    await fs.writeFile(contactsPath, newContatcsString);
    return newContact;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
