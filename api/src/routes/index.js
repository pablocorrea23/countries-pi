/*
Modularizamos las rutas y luego acá las ponemos como middleware y después lo llevamos al app.js
*/
const { Router } = require("express");
const router = Router();
const ActivityRoute = require("./activities");
const CountryRoute = require("./countries");
// Nos traemos nuestras rutas para usarlas como middleware en /api/activity por ejemplo
router.use("/activities", ActivityRoute);
router.use("/countries", CountryRoute);

module.exports = router;