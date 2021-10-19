const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");

require("dotenv").config();

const PORT = process.env.PORT;
const URL = process.env.URL;

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: true }));

let count = 0
app.post("/", async (req, res) => {
  console.log({event: req.body.event, text: req.body.data.text});
  count++
  console.log('count----> ',count)
  res.json({
    ok: true,
  });
});

app.get('/', (req,res) => res.json({count}) )
app.listen(PORT, () =>
  console.log(`Server running in URL ${URL} and PORT ${PORT}`)
);
