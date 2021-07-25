require("dotenv").config()
const { mongodbDatabases,mongodbTestDatabaese } = process.env

const chai = require("chai")
const app = require("../index")
const chaiHttp = require("chai-http")
chai.use(chaiHttp)


const requester = chai.request(app).keepOpen()
const assert = chai.assert

const {
    dropData,
    dataType
} = require("./test_heloper")

before( async () => {

	console.log("now databases: "+ mongodbDatabases)
	if (mongodbDatabases !== mongodbTestDatabaese){ // databsese warning
		throw new Error("warning databases is not " + mongodbTestDatabaese)
	}else{

		it("clear DB", async () => {
			const result = await dropData()
			assert.strictEqual(result, true)
		})

	}
})


describe("api test: default data", function() {
    this.timeout(5000)

    const heroData = {data:""}

    it("get heroes", async () => {

		const res = await requester
			.get("/heroes")
			.set(dataType)

            const {status, body} = res
            
		assert.strictEqual(status, 200) // Response 200
        assert.strictEqual(body.heroes.length >=1 , true) // make sure heroes array is not null
        
        if(body.heroes.length >=1){ // save heroes data
            heroData.data = body.heroes
        }
	})

    it("get hero id", async () => {

        const heroLength = heroData.data.length
        const randomHeroIndex = Math.floor(Math.random() * heroLength) // get random hero

        const testHeroId = heroData.data[randomHeroIndex].id
        const hero = JSON.stringify(heroData.data[randomHeroIndex])

		const res = await requester
			.get("/heroes/"+testHeroId)
			.set(dataType)

        const outPutHero = JSON.stringify(res.body)

		assert.strictEqual(outPutHero, hero)
	})


    it("Authenticated get heroes", async () => {

        dataType.name = "hahow"
        dataType.password = "rocks"

		const res = await requester
			.get("/heroes")
			.set(dataType)

        const {body, status} = res
        const isProfile = !(body.heroes[0].profile.luk === undefined)

		assert.strictEqual(status, 200) // Response 200
        assert.strictEqual(isProfile, true)

        if(body.heroes.length >=1){ // save heroes data
            heroData.data = body.heroes
        }

	})


    it("Authenticated get heroes id", async () => {

        const heroLength = heroData.data.length
        const randomHeroIndex = Math.floor(Math.random() * heroLength) // get random hero

        const testHeroId = heroData.data[randomHeroIndex].id
        const hero = JSON.stringify(heroData.data[randomHeroIndex])

		

		const res = await requester
			.get("/heroes/" + testHeroId)
			.set(dataType)

        const {body, status} = res

        const outPutHero = JSON.stringify(body)

		assert.strictEqual(status, 200) // Response 200
        const isSame = (outPutHero == hero)
        assert.strictEqual(isSame, true)

        

	})

})



const {combineHero} = require("../server/models/cache")

describe("catch data test", async function() {
    this.timeout(15000);

    it("insert hahow data", async () => {
        const addData = await combineHero()
        assert.strictEqual(addData, true)
    })

    it("upload hahow data", async () => {
        const addData = await combineHero()
        assert.strictEqual(addData, true)
    })

})

describe("api test: use hahow data", async function() {

    this.timeout(9000)

    const heroData = {data:""}

    it("get heroes", async () => {

		const res = await requester
			.get("/heroes")
			.set(dataType)

            const {status, body} = res
            
		assert.strictEqual(status, 200) // Response 200
        assert.strictEqual(body.heroes.length >=1 , true) // make sure heroes array is not null
        
        if(body.heroes.length >=1){ // save heroes data
            heroData.data = body.heroes
        }
	})

    it("get hero id", async () => {

        const heroLength = heroData.data.length
        const randomHeroIndex = Math.floor(Math.random() * heroLength) // get random hero

        const testHeroId = heroData.data[randomHeroIndex].id
        const hero = JSON.stringify(heroData.data[randomHeroIndex])

		const res = await requester
			.get("/heroes/"+testHeroId)
			.set(dataType)

        const outPutHero = JSON.stringify(res.body)

		assert.strictEqual(outPutHero, hero)
	})


    it("Authenticated get heroes", async () => {

        dataType.name = "hahow"
        dataType.password = "rocks"

		const res = await requester
			.get("/heroes")
			.set(dataType)

        const {body, status} = res
        const isProfile = !(body.heroes[0].profile.luk === undefined)

		assert.strictEqual(status, 200) // Response 200
        assert.strictEqual(isProfile, true)


        if(body.heroes.length >=1){ // save heroes data
            heroData.data = body.heroes
        }

	})


    it("Authenticated get heroes id", async () => {

        const heroLength = heroData.data.length
        const randomHeroIndex = Math.floor(Math.random() * heroLength) // get random hero

        const testHeroId = heroData.data[randomHeroIndex].id
        const hero = JSON.stringify(heroData.data[randomHeroIndex])

		

		const res = await requester
			.get("/heroes/" + testHeroId)
			.set(dataType)

        const {body, status} = res

        const outPutHero = JSON.stringify(body)

		assert.strictEqual(status, 200) // Response 200

        const isSame = (outPutHero == hero)
        assert.strictEqual(isSame, true)

	})
    
})

describe("api test: Wrong account", async function() {
    this.timeout(5000)
    const heroData = {data: ""}

    it("Wrong authenticated get heroes", async () => {

        dataType.name = "haha"
        dataType.password = "malphite"

		const res = await requester
			.get("/heroes")
			.set(dataType)

        const {body, status} = res
        const isProfile = (body.heroes[0].profile === undefined)

		assert.strictEqual(status, 200) // Response 200
        assert.strictEqual(isProfile, true)

        heroData.data = body.heroes

	})

    it("Wrong authenticated get hero Id", async () => {


        const heroLength = heroData.data.length
        const randomHeroId = Math.floor(Math.random() * heroLength) + 1

		const res = await requester
			.get("/heroes/" + randomHeroId)
			.set(dataType)

        const {body, status} = res

        const isProfile = (body.profile === undefined)

		assert.strictEqual(status, 200) // Response 200
        assert.strictEqual(isProfile, true)

	})
})