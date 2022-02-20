const express = require('express');
const app = express();
const path = require('path');
const { Client } = require('@notionhq/client');
const { validarJWT } = require('../middleware/validarJWT');
const { JwtFormClient, restoreJWT } = require('../helpers/jwt');

app.set('views', path.resolve(__dirname, '../public/views'));

//process.env.NOTION_KEY
// process.env.NOTION_DATABASE_ID

const notion = new Client({ auth: 'secret_eXDjdxuCf3oIBXJ8AkLz8oaatHtQfjVKPnf11yNURrJ' });

const databaseId = '5b2d7d9c4ba04d48b65f0e51a2fc4acb';

app.get('/redirect-form', async (req, res) => {
  //Cada toke tiene una validez de 5h

  try {
    const token = await restoreJWT();
    res.redirect(`form?token=${token}`);
  } catch (error) {
    res.redirect('/');
  }
});

app.get('/form', validarJWT, async (req, res) => {
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

    // console.log(propertiesObjet);
  } catch (error) {
    console.error(error.body);
    properties = [];
  }

  //   readItems();

  res.render('registroFormulario', { properties });
});

app.post('/form', async (req, res) => {
  let body = req.body;

  let Nombres = body.Nombres;
  let Telefono = body.Telefono;
  let Edad = (body.Edad = '0');
  let Ocupacion = body.Ocupacion || 'Desconocido';
  let Sector_recidencia = body.Sector_recidencia || 'Desconocido';
  let Email = body.Email || 'Desconocido';
  let Fecha_nacimiento = body.Fecha_nacimiento;
  let Como_nos_conocio = body.Como_nos_conocio || 'Desconocido';
  let Que_motivo_su_visita = body.Que_motivo_su_visita || 'Desconocido';
  let A_iniciado_tratamiento_antes = body.A_iniciado_tratamiento_antes || 'off';
  let Posee_marcapaso = body.Posee_marcapaso || 'off';
  let Esta_embarazada = (body.Esta_embarazada = 'off');
  let Proceso_de_lactancia = body.Proceso_de_lactancia || 'off';
  let Insuficiencia_cardiaca = body.Insuficiencia_cardiaca || 'off';
  let Cardiopatias = body.Cardiopatias || 'off';
  let Tratada_por_tumores = body.Tratada_por_tumores || 'off';
  let Alteraciones_en_la_coagulacion = body.Alteraciones_en_la_coagulacion || 'off';
  let Protesis_medicas = body.Protesis_medicas || 'off';
  let Sufre_de_gastrica = body.Sufre_de_gastrica || 'off';
  let Cinturon_gastrico = body.Cinturon_gastrico || 'off';
  let Algun_proceso_de_sicatrizacion = (body.Algun_proceso_de_sicatrizacion = 'off');
  let Flebitis_o_trombosis = body.Flebitis_o_trombosis || 'off';
  let Varices_de_gran_tamaño = body.Varices_de_gran_tamaño || 'off';
  let Alteraciones_vasculares = body.Alteraciones_vasculares || 'off';
  let Algun_proceso_infeccioso = body.Algun_proceso_infeccioso || 'off';
  let Patologia_en_sistema_digestico = body.Patologia_en_sistema_digestico || 'off';
  let Patologia_en_sistema_urinario = body.Patologia_en_sistema_urinario || 'off';
  let Higado_graso = body.Higado_graso || 'off';
  let TYC = (body.TYC = 'off');
  let Observacion = body.Observacion || 'Ninguna';

  let fecha_option = {};

  if (Fecha_nacimiento) {
    fecha_option = {
      Fecha_nacimiento: {
        date: {
          start: Fecha_nacimiento,
        },
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

        Email: {
          email: Email,
        },

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
    const dataClient = await JwtFormClient({ Nombres, Telefono });
    res.redirect(`/form-success?token=${dataClient}`);
  } catch (error) {
    req.flash('error', 'Este es un error');
    if (error) res.redirect('/back');
    // console.error(error.body);
    // res.json(error.body);
  }
});

app.get('/form-success', validarJWT, (req, res) => {
  const { Nombres } = req.datosReserva;
  res.render('form-success', { Nombres });
});

module.exports = app;
