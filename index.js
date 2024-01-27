const program = require('commander')
const {
    listContacts,
    getContactById,
    addContact,
    removeContact,
} = require("./contacts");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      try {
        const allContacts = await listContacts()
        console.table(allContacts)
      } catch (error) {
        console.error(`error ${error}`)
      }
      break;

    case "get":
      try {
        const findById = await getContactById(id)
        console.log(findById);
      } catch (error) {
        console.error(`error ${error}`)
      }
      break;

    case "add":
      try {
        const addNewContact = await addContact(name, email, phone)
        console.log(addNewContact);
      } catch (error) {
        console.error(`error ${error}`)
      }
      break;

    case "remove":
      try {
        const removedContact = await removeContact(id)
        console.log(removedContact || null)
      } catch (error) {
        console.error(`error ${error}`)
      }
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
