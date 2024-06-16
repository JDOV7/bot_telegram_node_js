const LISTA_COMANDOS = [
  "/start", //0
  "/ayuda", //1
  "/h", //2
  "/cExpe", //3
  "/cExpNum:", //4
  "/cDoc", //5
  "/altaUser:", //6
  "/reenviar:", //7
];

const MSG_AYUDA = `
/ayuda ó /h: Comando para solicitar los comandos de ayuda.\n
/cExpe: Comando para solicitar tu expediente.\n
/cExpNum:{tu_numero_de_expediente}: Consultas tus fotos de tu expediente.\n
/cDoc: Envia el doc de tu expediente.\n
/altaUser:{tu_numero_de_expediente}: Sirve para dar de alta al usuario.\n
/reenviar:{id_mensaje}: Replica el mensaje con el id enviado.\n
`;

const MSG_START =
  "soy nodePruebaBot. Usa el comando /ayuda para mas Informacion";

const MSG_C_EXP =
  "Para consultar tu expediente envia el comando /cExpNum seguido de : y tu numero de exp. Ejemplo /cExpNum:123";

const MSG_C_NUM_EXP = "El expediente para el siguiente numero de exp es: ";

const MSG_USUARIO_INVALIDO =
  "Ñao Ñao, tu no eres un user valido 👻🤬. Para darte de alta usa /altaUser:{tu_numero_de_expediente}";

const MSG_USUARIO_DADO_DE_ALTA = "fuiste dado de alta exitosamente";

export {
  MSG_AYUDA,
  LISTA_COMANDOS,
  MSG_START,
  MSG_C_EXP,
  MSG_C_NUM_EXP,
  MSG_USUARIO_INVALIDO,
  MSG_USUARIO_DADO_DE_ALTA,
};
