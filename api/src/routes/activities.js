const { Router } = require("express");
const router = Router();
const { Country, Activity } = require("../db.js");

router.get("/", (req, res) => {
  Activity.findAll().then((res) => {
    if (res) {
      res.status(200).json(searchAct);
    }
    res.status(404).json({ error: "No hay actividades guardadas" });
  });
  // if (searchAct.length === 0) {
  //   return res.status(404).json({ error: "No hay actividades guardadas" });
  // } else {
  //   return res.status(200).json(searchAct);
  // }
});

router.get("/order/:season", async (req, res) => {
  const { season } = req.params;

  if (season) {
    const actividad = await Activity.findAll({
      where: {
        season,
      },
    });
    return res.status(200).json(actividad);
  }
  res.status(404).json({ error: "Debe seleccionar una temporada" });
});

router.post("/activity", async (req, res) => {
  const { name, difficulty, duration, season, countryID } = req.body;
  if (name && difficulty && duration && season && countryID) {
    var actividad = await Activity.create({
      name,
      difficulty,
      season,
      duration,
    });
    if (countryID.length === 1) {
      if (actividad) {
        return res.json(await actividad.addCountry(countryID));
      }
    }
    if (countryID.length > 1) {
      if (actividad) {
        return res.json(await actividad.addCountries(countryID));
      }
    }
  }
  res.send({ error: "Faltan parametros" });
});

module.exports = router;

