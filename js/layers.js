addLayer("ma", {
    symbol: "MA", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        machineamount: new Decimal(1),
        upgradeamount: new Decimal(0),
        layeramount: new Decimal(1),
    }},
    color: "#9f9f9f",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Machine power", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if(player.ma.machineamount.gte(3)) mult=mult.times(tmp.ma.machine3eff)
        if(player.ma.machineamount.gte(4)) mult=mult.times(tmp.ma.machine4eff)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "m", description: "M: Reset for Machine power", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    clickables: {
        11: {
            display() {return"<h3>Machine 1</h3><br><br><br>Unused machine power boost point gain.<br>currently: "+format(tmp.ma.machine1eff)+"x"},   
            style() { return {"font-size": "15px","height": "200px","width": "200px","background-color": "#9f9f9f"}},
            unlocked(){return player.ma.machineamount.gte(1)}
        },
        12: {
            display() {return"<h3>Machine 2</h3><br><br><br>Point boost themselves.<br>currently: "+format(tmp.ma.machine2eff)+"x"},   
            style() { return {"font-size": "15px","height": "200px","width": "200px","background-color": "#9f9f9f"}},
            unlocked(){return player.ma.machineamount.gte(2)}
        },
        13: {
            display() {return"<h3>Machine 3</h3><br><br><br>machine power boost themselves.<br>currently: "+format(tmp.ma.machine3eff)+"x"},   
            style() { return {"font-size": "15px","height": "200px","width": "200px","background-color": "#9f9f9f"}},
            unlocked(){return player.ma.machineamount.gte(3)}
        },
        14: {
            display() {return"<h3>Machine 4</h3><br><br><br>Gear boost machine power gain.<br>currently: "+format(tmp.ma.machine4eff)+"x"},   
            style() { return {"font-size": "15px","height": "200px","width": "200px","background-color": "#9f9f9f"}},
            unlocked(){return player.ma.machineamount.gte(4)}
        },
        101: {
            display() {return"Unlock a new machine.<br>cost: "+format(tmp.ma.machineunlockcost)+" machine power"},   
            style() { return {"font-size": "14px","height": "200px","width": "200px"}},
            onClick(){player.ma.points=player.ma.points.sub(tmp.ma.machineunlockcost);player.ma.machineamount = player.ma.machineamount.add(1)},
            canClick(){return player.ma.points.gte(tmp.ma.machineunlockcost)},
        },
        102: {
            display() {return"Unlock a new upgrade.<br>cost: "+format(tmp.ma.upgradecost)+" machine power"},   
            style() { return {"font-size": "14px","height": "200px","width": "200px"}},
            onClick(){player.ma.points=player.ma.points.sub(tmp.ma.upgradecost);player.ma.upgradeamount = player.ma.upgradeamount.add(1)},
            canClick(){return player.ma.points.gte(tmp.ma.upgradecost)},
        },
        103: {
            display() {return"Unlock a new layer.<br>cost: "+format(tmp.ma.layercost)+" machine power"},   
            style() { return {"font-size": "14px","height": "200px","width": "200px"}},
            onClick(){player.ma.points=player.ma.points.sub(tmp.ma.layercost);player.ma.layeramount = player.ma.layeramount.add(1)},
            canClick(){return player.ma.points.gte(tmp.ma.layercost)},
        },
    },
    upgrades: {
        11: {
            description: "point x2 per upgrade",
            cost: new Decimal(40),
            unlocked(){return player.ma.upgradeamount.gte(1)}
        }, 
        12: {
            description:"Gear boost point gain.",
            cost: new Decimal(4321),
            unlocked(){return player.ma.upgradeamount.gte(2)},
            effect(){return player.g.points.add(1).log(10).add(1).pow(2)},
            effectDisplay(){return format(upgradeEffect('ma',12))+"x"},
        }, 
    },
    machine1eff(){
        let exp = new Decimal(0.5)
        if(inChallenge('g',11)) exp = new Decimal(0)
        let eff=player.ma.points.add(1).pow(exp)
        return eff
    },
    machine2eff(){
        let exp = new Decimal(0.15)
        if(hasChallenge('g',11)) exp = exp.times(1.75)
        let eff=player.points.add(1).pow(exp)
        return eff
    },
    machine3eff(){
        let exp = new Decimal(1.25)
        if(hasUpgrade('g',11)) exp = exp.times(2)
        let eff=player.ma.points.add(1).log(10).add(1).pow(exp)
        return eff
    },
    machine4eff(){
        let exp = new Decimal(1.5)
        let eff=player.g.points.add(1).log(10).add(1).pow(exp)
        return eff
    },
    machineunlockcost(){
        let cost=new Decimal(5)
        if(player.ma.machineamount.gte(2)) cost=new Decimal(30)
        if(player.ma.machineamount.gte(3)) cost=new Decimal(1e5)
        if(player.ma.machineamount.gte(4)) cost=new Decimal(1e25)
        return cost
    },
    upgradecost(){
        let cost=new Decimal(75)
        if(player.ma.upgradeamount.gte(1)) cost=new Decimal(1e4)
        if(player.ma.upgradeamount.gte(2)) cost=new Decimal(1e10)
        return cost
    },
    layercost(){
        let cost=new Decimal(250)
        if(player.ma.layeramount.gte(2)) cost=new Decimal(1e15)
        if(player.ma.layeramount.gte(3)) cost=new Decimal(1e100)
        return cost
    },
    tabFormat: {
        "Machines": {
            unlocked(){return (player.ma.machineamount.gte(1))},
            content: [
                "main-display",
                "prestige-button",
                "blank",
                "clickables",
                
            ]
        },
        "Upgrades": {
            unlocked(){return (player.ma.upgradeamount.gte(1))},
            content: [
                "main-display",
                "prestige-button",
                "blank",
                "upgrades",
          
            ]
        },
    },
})
addLayer("g", {
    symbol: "GE", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#bfbfbf",
    requires: new Decimal(5000), // Can be a function that takes requirement increases into account
    resource: "Gear", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "g", description: "G: Reset for Gear", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    challenges: {
        11: {
            name: "Machineless",
            challengeDescription: "First machine has no effect",
            canComplete: function() {return player.points.gte(2500)},
            goalDescription: "2,500 points",
            rewardDescription: "Machine 2 effect ^1.75", 
            unlocked(){return player.g.points.gte(1)}
        },
    },
    upgrades: {
        11: {
            description: "Machine 3 effect ^2",
            cost: new Decimal(1),
            unlocked(){return true}
        }, 
    },
    unlockreq(){
        let req=new Decimal(1)
        if(player.g.points.gte(1))req=new Decimal(1000)
        return req
    },
    layerShown(){return player.ma.layeramount.gte(2)},
    tabFormat: {
        "Challenges": {
            unlocked(){return (player.ma.machineamount.gte(1))},
            content: [
                "main-display",
                "prestige-button",
                "blank",
                ["display-text",function(){
                    let s="Next gear challnge unlock at " + format(tmp.g.unlockreq)+" gear."
                    return s
                  }],
                  "blank",
                "challenges",
                
            ]
        },
        "Upgrades": {
            unlocked(){return (player.ma.machineamount.gte(1))},
            content: [
                "main-display",
                "prestige-button",
                
                  "blank",
                "upgrades",
                
            ]
        },

    },


})

