addLayer("M", {
    name: "Magic", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "M", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        cap: new Decimal(30),
        Boost: new Decimal(0),
        cost1: new Decimal(20),
        cost2: new Decimal(50),
        cost3: new Decimal(100),
        effect3: new Decimal(0),
        level3: new Decimal(0),
        realeffect3: new Decimal(0),
    }},
    color: "#c000c0",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Magic", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.01, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "M", description: "M: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    clickables: {
        11:{
            display() {return "MP cap +20. Cost: " + format(player.M.cost1) + " MP"},
            canClick(){return player.points.gte(format(player.M.cost1))},
            onClick(){player.points = player.points.minus(format(player.M.cost1))
                player.M.cap=player.M.cap.add(20)
            player.M.cost1 = player.M.cost1.add(5).times(1.3)}
            },
            12:{
                display() {return "MP gain +2. Cost: " + format(player.M.cost2) + " MP"},
                canClick(){return player.points.gte(format(player.M.cost2))},
                onClick(){player.points = player.points.minus(format(player.M.cost2))
                    player.M.Boost=player.M.Boost.add(2)
                    player.M.cost2 = player.M.cost2.add(8).times(1.4)}
                },
                13:{
                    display() {return "MP cap + " +format(player.M.effect3) + " (based on MP). cost: " + format(player.M.cost3) + " MP"},
                    canClick(){return player.points.gte(format(player.M.cost3))},
                    onClick(){player.points = player.points.minus(format(player.M.cost3))
                 player.M.level3 =  player.M.level3.add(1)
                        player.M.cost3 = player.M.cost3.add(12).times(1.6)},
                        unlocked(){return player.M.cap.gte(100)}
                    },
    },
    update(diff){
if (player.points.gte(player.M.cap.add(player.M.realeffect3))) player.points = player.M.cap.add(player.M.realeffect3)
player.M.effect3 = (player.points.add(1).log(10)).pow(3)
player.M.realeffect3 = player.M.effect3.times(player.M.level3)


    },
    
    layerShown(){return true},
    tabFormat: {
        "Tier 1 magic": {
                content: [
                        
                    
                        "blank", 
                        "clickables"],
                unlocked(){
                        return true
                },
        },
    },
})
