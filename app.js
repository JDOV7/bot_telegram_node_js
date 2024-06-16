import TelegramBot from "node-telegram-bot-api";
import { createReadStream } from "fs";
import axios from "axios";
import {
  MSG_START,
  MSG_C_EXP,
  MSG_AYUDA,
  LISTA_COMANDOS,
  MSG_C_NUM_EXP,
  MSG_USUARIO_INVALIDO,
  MSG_USUARIO_DADO_DE_ALTA,
} from "./CONSTANTES.js";
import { ID_CHATS_CONOCIDOS } from "./BD.js";

// 6794579577 YO
// 6066130365 Nadia
const sToken = "6758722845:AAHogE5WDbiyOT2IaSSLXbPTv8_YaowA_XM"; // Replace with your own bot token
const bot = new TelegramBot(sToken, { polling: true });

const sRutaFoto = "./public/carbon.png";
const sRutaArchivo =
  "./public/Google Cloud FundamentalsCore Infrastructure.pdf";

console.log("---Inicio---");
// bot.sendMessage("6794579577", MSG_AYUDA);

bot.on("message", async (msg) => {
  console.log(msg);
  const chatId = msg.chat.id;
  console.log("Mensaje con ID:", chatId);
  const messageText = msg.text;

  const bUserValido = await validadorDeCuentas(chatId);
  if (!bUserValido) {
    const darAlta = await darAltaUser(chatId, messageText);
    if (darAlta) {
      bot.sendMessage(
        chatId,
        `${msg.from.first_name}, ${MSG_USUARIO_DADO_DE_ALTA}`
      );
    } else {
      bot.sendMessage(chatId, MSG_USUARIO_INVALIDO);
    }
  } else {
    if (msg.text) {
      mensajeTexto(messageText, chatId, msg);
    } else if (msg.photo) {
      const sFileId = msg.photo[3].file_id;

      const objFotoData = await bot.downloadFile(sFileId, "./public");
      console.log(objFotoData);
      // const respuesta = await axios.
    }
  }
});

const darAltaUser = async (sIdChat, mensaje) => {
  if (mensaje.indexOf(LISTA_COMANDOS[6]) >= 0) {
    const sNumeroExp = mensaje.split(LISTA_COMANDOS[6])[1];
    ID_CHATS_CONOCIDOS.push(sIdChat);
    return true;
  } else {
    return false;
  }
};

const validadorDeCuentas = async (sIdChat) => {
  const bValidarExisteIdChat = ID_CHATS_CONOCIDOS.includes(sIdChat);

  return bValidarExisteIdChat;
};

const mensajeTexto = async (messageText, chatId, msg) => {
  try {
    if (messageText == LISTA_COMANDOS[0]) {
      const sNombreUser = msg.from.first_name;
      bot.sendMessage(chatId, `Hola ${sNombreUser}, ${MSG_START}`);
    } else if (
      messageText == LISTA_COMANDOS[1] ||
      messageText == LISTA_COMANDOS[2]
    ) {
      bot.sendMessage(chatId, MSG_AYUDA);
    } else if (messageText == LISTA_COMANDOS[3]) {
      bot.sendMessage(chatId, MSG_C_EXP);
    } else if (messageText.indexOf(LISTA_COMANDOS[4]) >= 0) {
      const sNumeroExp = messageText.split(LISTA_COMANDOS[4])[1];
      bot.sendMessage(chatId, `${MSG_C_NUM_EXP} ${sNumeroExp}`);

      // const stream = createReadStream(sRutaFoto);
      // bot.sendPhoto(chatId, stream);

      bot.sendPhoto(chatId, sRutaFoto);
    } else if (messageText == LISTA_COMANDOS[5]) {
      bot.sendDocument(chatId, sRutaArchivo);
    } else if (messageText.indexOf(LISTA_COMANDOS[7]) >= 0) {
      const sIdMensaje = messageText.split(LISTA_COMANDOS[7])[1];
      // const idMessage = getRandomInt(200, 290);
      const respuestaMSG = await bot.forwardMessage(
        chatId,
        msg.from.id,
        sIdMensaje
      );
      // console.log(respuestaMSG);
    } else {
      // console.log(msg);
      bot.sendMessage(chatId, MSG_AYUDA);
    }
  } catch (error) {
    console.log(error);
  }
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
