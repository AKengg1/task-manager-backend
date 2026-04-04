let users = [
  { id: 1, name: "alice", email: "alice@example.com" },
  { id: 2, name: "bob", email: "bob@example.com" },
];
let nextId = 3;
const getNextId = () => nextId++;

export { users, getNextId };
