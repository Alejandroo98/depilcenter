const express = require('express');
const app = express();
const path = require('path');
const { Client } = require('@notionhq/client');

app.set('views', path.resolve(__dirname, '../public/views'));

//process.env.NOTION_KEY
// process.env.NOTION_DATABASE_ID

const notion = new Client({ auth: 'secret_eXDjdxuCf3oIBXJ8AkLz8oaatHtQfjVKPnf11yNURrJ' });

const databaseId = '6a0a4dab79134876a4779a627f113c21';

// addItem('Juanito Perez');

app.get('/form', async (req, res) => {
  let properties = [];

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
    });
    const propertiesObjet = response.results[0].properties;
    properties = Object.keys(propertiesObjet);
  } catch (error) {
    console.error(error.body);
    properties = [];
  }

  //   readItems();

  res.render('registroFormulario', { properties });
});

app.post('/form', async (req, res) => {
  const cuerpoForm = req.body;

  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: 'Mi nombres',
              },
            },
          ],
        },
        ...propertiesAll,
      },
    });
    console.log(response);
    console.log('Success! Entry added.');
    res.json(response);
  } catch (error) {
    console.error(error.body);
    res.json(error.body);
  }
});

module.exports = app;
