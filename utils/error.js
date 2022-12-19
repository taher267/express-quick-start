module.exports = (msg, status = 400) => {
  const e = new Error(msg || `Not found`);
  e.status = status;
  return e;
};
