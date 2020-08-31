/* FARM CLASS */

const Farm = function(x, y) {
    this.field = this.generateField(x, y)
    this.sunlight = 0
    this.rain = 0

    this.generateNextDay()
}

Farm.prototype.generateField = function(x, y) {
    const field = [...new Array(x)].map(_ => new Array(y).fill(new Plot()))
    return field
}

// Daily sunlight can vary in strength from 1 to 10
Farm.prototype.getRandomSunlight = function() {
    this.sunlight = Math.floor(Math.random() * 10)
}

// 50% chance of rain results in water level of 5
Farm.prototype.getRandomRain = function() {
    this.rain = Math.floor(Math.random() * 2) * 5
}

Farm.prototype.generateNextDay = function() {
    this.getRandomSunlight()
    this.getRandomRain()

    for (const row of this.field) {
        for (const curPlot of row) {
            if (curPlot.plantDetails !== null) curPlot.calculateGrowth()
            curPlot.light = this.sunlight
            curPlot.water = this.rain
            // each plot has a 10% chance of spawing weeds that day
            curPlot.weeds += Math.floor(Math.random() * 5) === 1 ? 1 : 0 
        }
    }
}


/* PLOT CLASS */

const Plot = function() {
    this.plantDetails = null
    this.height = 0
    this.light = 0
    this.water = 0
    this.weeds = 0
}

// if plant is within healthy limits, it will grow an inch
Plot.prototype.calculateGrowth = function() {
    const [minWaterLevel, maxWaterLevel] = this.plantDetails.optimalWaterLevels
    const [minLightLevel, maxLightLevel] = this.plantDetails.optimalLightLevels
    const maxAllowableWeeds = this.plantDetails.maxAllowableWeeds

    if (
        (this.water >= minWaterLevel && this.water <= maxWaterLevel)
        && (this.light >= minLightLevel && this.light <= maxLightLevel)
        && this.weeds < maxAllowableWeeds
    ) this.height++
}

Plot.prototype.seed = function(seed) {
    this.plantDetails = seed
}

Plot.prototype.sow = function() {
    this.plantDetails = null
    this.height = 0
    this.weeds = 0
}

Plot.prototype.useSunLamp = function(setting) {
    switch (setting) {
        case 'high':
            this.light += 5
            break
        case 'low':
            this.light += 2
            break
        default:
            this.light += 2
    }
}

Plot.prototype.water = function() {
    this.water++
}

Plot.prototype.deweed = function() {
    this.weeds--
}


/* SEEDS CLASS */

const Seed = function(name, optimalWaterLevels, optimalLightLevels, maxAllowableWeeds) {
    this.name = name
    this.optimalWaterLevels = optimalWaterLevels
    this.optimalLightLevels = optimalLightLevels
    this.maxAllowableWeeds = maxAllowableWeeds
}

/* SEED OPTIONS */

const seedOptions = {
    succulent: new Seed(
        'succulent',
        [0, 1],
        [5,10],
        2
    ),
    basil: new Seed(
        'basil',
        [5,9],
        [5,10],
        2
    )
}