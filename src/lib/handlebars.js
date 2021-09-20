function timeago(date) {
  try {
    return date.slice(-4);
  } catch (error) {
    return '123';
  }
}

module.exports = {
  timeago,
};
