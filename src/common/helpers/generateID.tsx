const generateID = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
export default generateID;