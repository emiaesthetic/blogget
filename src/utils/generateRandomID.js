const generateRandomID = () =>
  Math.random().toString(36).substring(2, 8) +
  Date.now().toString().substring(9);

const assignID = obj => ({ ...obj, id: generateRandomID() });

export default assignID;
