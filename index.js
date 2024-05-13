import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://api.openbrewerydb.org/v1/breweries";

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const result = await axios.get(API_URL + "/random");
    const breweryNames = result.data.map((brewery) => brewery.name);
    const breweryCity = result.data.map((brewery) => brewery.city);
    const breweryState = result.data.map((brewery) => brewery.state);
    const breweryStreet = result.data.map((brewery) => brewery.street);
    const breweryPhone = result.data.map((brewery) => brewery.phone);
    res.render("index.ejs", {
      breweryNames: breweryNames,
      breweryCity: breweryCity,
      breweryState: breweryState,
      breweryStreet: breweryStreet,
      breweryPhone: breweryPhone,
    });
  } catch (error) {
    console.log(error.response.data);
    res.status(500);
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
