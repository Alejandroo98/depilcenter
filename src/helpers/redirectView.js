const redirectView = (url, servicio, hora) => {
  const path = url.split('?');

  if (path[0] == '/') {
    return `/?errors=true&&servicio=${servicio}&&hora=${hora}`;
  }

  const query = path[1].split('&&');
  console.log(query);

  return `${path[0]}?${query[0]}&&errors=true&&servicio=${servicio}&&hora=${hora}`;
};

module.exports = redirectView;
