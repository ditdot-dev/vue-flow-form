"use strict";
const axios = require("axios");
// const cors = require("cors");
const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE"
};

exports.handler = async function(event, context, callback) {
  if (event.httpMethod !== "POST") {
    return callback(null, {
      statusCode: 410,
      body: "Unsupported Request Method",
      headers
    });
  }
  try {
    const body = JSON.parse(event.body);
    const rest = await axios.put(
      "https://sandbox-api.withabound.com/v2/users/userId_15eaa4f418b381d9f3ddafd6d479cd746183f5ed/taxes/2020",
      body.data,
      {
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": body.app_key,
          "X-Api-Secret": body.app_secret
        }
      }
    );
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify(rest.data),
      headers
    });
  } catch (e) {
    callback(null, { statusCode: 500, body: "Internal Server Error: " + e });
  }
};

// "use strict";
// const express = require("express");
// const axios = require("axios");
// const cors = require("cors");
// const app = express();
// const serverless = require("serverless-http");
// const router = express.Router();
// const bodyParser = require("body-parser");
// app.use(bodyParser.json());

// const corsOpt = {
//   origin: "*",
//   credentials: true,
//   exposedHeaders: "authorization",
//   maxAge: 10 * 60
// };
// app.use(cors(corsOpt));

// router.get("/", async (req, res) => {
//   try {
//     // console.log(req.body);
//     // const rest = await axios.put(
//     //   "https://sandbox-api.withabound.com/v2/users/userId_15eaa4f418b381d9f3ddafd6d479cd746183f5ed/taxes/2020",
//     //   req.body.data,
//     //   {
//     //     headers: {
//     //       "Content-Type": "application/json",
//     //       "X-Api-Key": req.body.app_key,
//     //       "X-Api-Secret": req.body.app_secret
//     //     }
//     //   }
//     // );
//     return res.status(200).json("hello");
//   } catch (error) {
//     console.log(error);
//   }
// });

// app.use("./netlify/functions/server-background", router);
// // module.exports = app;
// module.exports.handler = serverless(app);
