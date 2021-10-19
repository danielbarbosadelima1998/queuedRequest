const axios = require("axios");
const queue = require("queue");

const options = {
  method: "POST",
  url: "https://api-dev.digisac.io/v1/messages",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer 3641704f96c37f417c4beb70c42e50b8d9b4b611",
  },
  data: {
    text: "teste #2",
    type: "chat",
    contactId: "54f499ac-3d45-445f-bfa2-1950f3fe56e1",
    subject: "Sem Assunto",
  },
};

const TOTAL = 1000;
const exec = async () => {
  let q = queue({ results: [] });
  q.concurrency = 10;

  q.timeout = 60000;
  for (let i = 0; i < TOTAL; i++) {
    q.push(async function (cb) {
      const result = await axios
        .post(
          options.url,
          { ...options.data, text: `${i + 1} - ${TOTAL}` },
          { headers: options.headers }
        )
        .then(function (response) {
          return response.data;
        })
        .catch(function (error) {
          console.log("error!");
          console.error(error);
        });

      cb(null, result);
    });
  }

  q.on("success", function (result, job) {
    console.log("Mensagem enviada com sucesso: ", result.text);
  });

  q.start(function (err) {
    if (err) throw err;
    console.log("all done!");
  });
};

exec();
