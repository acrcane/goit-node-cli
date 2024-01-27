const fs = require("node:fs/promises");
const path = require("node:path");
const { uuid } = require('uuidv4');

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function read() {
    const data = await fs.readFile(contactsPath, "utf-8");

    return JSON.parse(data);
}

async function write(data) {
    return await fs.writeFile(contactsPath, JSON.stringify(data));
}




async function listContacts() {
    const data = await read();

    return data;
}


async function getContactById(id) {
    const data = await read();
    const result = data.find((contact) => contact.id === id);

    return result || null;
}


async function removeContact(contactId) {
    const data = await read();
    const index = data.findIndex((contact) => contact.id === contactId);

    if (index === -1) {
        return null;
    }

    const deletedContact = data[index]

    const newContacts = [...data.slice(0, index), ...data.slice(index + 1)];

    await write(newContacts);

    return deletedContact 
}


async function addContact(name, email, phone) {
    const data = await read();

    const id = uuid()
    const newContact = { name, email, phone, id };

    const isExist = data.some((contact) => contact.id === id);
    if (isExist) {
        throw new Error(`Contact with id: ${id} already exist`);
    }

    data.push(newContact);

    await write(data);

    return newContact;
    
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};