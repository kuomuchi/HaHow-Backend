const router = require("express").Router()
const { wrapAsync } = require("../../util/util")
const { catchHeroesData } = require("../controllers/sheld")



router.route("/heroes").get(wrapAsync(catchHeroesData))
router.route("/heroes/:heroId").get(wrapAsync(catchHeroesData))

module.exports = router