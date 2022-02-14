const express = require('express');
const app = express();
const path = require('path');
const { Client } = require('@notionhq/client');

app.set('views', path.resolve(__dirname, '../public/views'));

//process.env.NOTION_KEY
// process.env.NOTION_DATABASE_ID

const notion = new Client({ auth: 'secret_eXDjdxuCf3oIBXJ8AkLz8oaatHtQfjVKPnf11yNURrJ' });

const databaseId = '5b2d7d9c4ba04d48b65f0e51a2fc4acb';

// addItem('Juanito Perez');

app.get('/form', async (req, res) => {
  let properties = [];

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
    });
    const propertiesObjet = response.results[0];
    // console.log(propertiesObjet);
    // propertiesObjet.forEach((properties) => {
    //   console.log(properties.results);
    // });

    console.log(propertiesObjet);
  } catch (error) {
    console.error(error.body);
    properties = [];
  }

  //   readItems();

  res.render('registroFormulario', { properties });
});

app.post('/form', async (req, res) => {
  const {
    Nombres,
    Telefono,
    Edad,
    Ocupacion,
    Sector_recidencia,
    Email,
    Fecha_nacimiento,
    Como_nos_conocio = 'Desconocido',
    Que_motivo_su_visita,
    A_iniciado_tratamiento_antes = 'off',
    Posee_marcapaso = 'off',
    Esta_embarazada = 'off',
    Proceso_de_lactancia = 'off',
    Insuficiencia_cardiaca = 'off',
    Cardiopatias = 'off',
    Tratada_por_tumores = 'off',
    Alteraciones_en_la_coagulacion = 'off',
    Protesis_medicas = 'off',
    Sufre_de_gastrica = 'off',
    Cinturon_gastrico = 'off',
    Algun_proceso_de_sicatrizacion = 'off',
    Flebitis_o_trombosis = 'off',
    Varices_de_gran_tamaño = 'off',
    Alteraciones_vasculares = 'off',
    Algun_proceso_infeccioso = 'off',
    Patologia_en_sistema_digestico = 'off',
    Patologia_en_sistema_urinario = 'off',
    Higado_graso = 'off',
    TYC = 'off',
    Observacion = '',
  } = req.body;

  let fecha_option = {};
  let email_option = {};

  if (Fecha_nacimiento) {
    fecha_option = {
      Fecha_nacimiento: {
        date: {
          start: Fecha_nacimiento,
        },
      },
    };
  }

  if (Email) {
    email_option = {
      Email: {
        email: Email,
      },
    };
  }

  const onOff = (value) => {
    return value === 'on' ? true : false;
  };

  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      icon: {
        type: 'emoji',
        emoji: '👩🏻',
      },
      properties: {
        Nombres: {
          title: [
            {
              text: {
                content: Nombres,
              },
            },
          ],
        },

        Telefono: {
          phone_number: Telefono,
        },

        Edad: {
          number: Number(Edad),
        },

        Ocupacion: {
          rich_text: [
            {
              text: {
                content: Ocupacion,
              },
            },
          ],
        },

        Observacion: {
          rich_text: [
            {
              text: {
                content: Observacion,
              },
            },
          ],
        },

        Sector_recidencia: {
          rich_text: [
            {
              text: {
                content: Sector_recidencia,
              },
            },
          ],
        },

        ...email_option,
        ...fecha_option,

        Como_nos_conocio: {
          select: {
            name: Como_nos_conocio,
          },
        },

        Que_motivo_su_visita: {
          rich_text: [
            {
              text: {
                content: Que_motivo_su_visita,
              },
            },
          ],
        },

        A_iniciado_tratamiento_antes: {
          checkbox: onOff(A_iniciado_tratamiento_antes),
        },

        Posee_marcapaso: {
          checkbox: onOff(Posee_marcapaso),
        },

        Esta_embarazada: {
          checkbox: onOff(Esta_embarazada),
        },

        Proceso_de_lactancia: {
          checkbox: onOff(Proceso_de_lactancia),
        },

        Insuficiencia_cardiaca: {
          checkbox: onOff(Insuficiencia_cardiaca),
        },

        Cardiopatias: {
          checkbox: onOff(Cardiopatias),
        },

        Tratada_por_tumores: {
          checkbox: onOff(Tratada_por_tumores),
        },

        Alteraciones_en_la_coagulacion: {
          checkbox: onOff(Alteraciones_en_la_coagulacion),
        },

        Protesis_medicas: {
          checkbox: onOff(Protesis_medicas),
        },

        Sufre_de_gastrica: {
          checkbox: onOff(Sufre_de_gastrica),
        },

        Cinturon_gastrico: {
          checkbox: onOff(Cinturon_gastrico),
        },

        Algun_proceso_de_sicatrizacion: {
          checkbox: onOff(Algun_proceso_de_sicatrizacion),
        },

        Flebitis_o_trombosis: {
          checkbox: onOff(Flebitis_o_trombosis),
        },

        Varices_de_gran_tamaño: {
          checkbox: onOff(Varices_de_gran_tamaño),
        },

        Alteraciones_vasculares: {
          checkbox: onOff(Alteraciones_vasculares),
        },

        Algun_proceso_infeccioso: {
          checkbox: onOff(Algun_proceso_infeccioso),
        },

        Patologia_en_sistema_digestico: {
          checkbox: onOff(Patologia_en_sistema_digestico),
        },

        Patologia_en_sistema_urinario: {
          checkbox: onOff(Patologia_en_sistema_urinario),
        },

        Higado_graso: {
          checkbox: onOff(Higado_graso),
        },

        TYC: {
          checkbox: onOff(TYC),
        },
      },
    });
    // console.log(response);
    // console.log('Success! Entry added.');
    res.json(response);
  } catch (error) {
    req.flash('error', 'Estes es un error');
    if (error) res.redirect('/form');
    // console.error(error.body);
    // res.json(error.body);
  }
});

module.exports = app;
