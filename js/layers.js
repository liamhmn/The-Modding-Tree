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
        effect1: new Decimal(20),
        effect2: new Decimal(2),
        effect3: new Decimal(0),
        level1: new Decimal(0),
        level2: new Decimal(0),
        level3: new Decimal(0),
        realeffect3: new Decimal(0),
        knowledge: new Decimal(0),
    }},
    color: "#c000c0",
    requires: new Decimal("eeeeeeeee10"), // Can be a function that takes requirement increases into account
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
            display() {return "MP cap +"+ format(player.M.effect1)+". Cost: " + format(player.M.cost1) + " MP"},
            canClick(){return player.points.gte(format(player.M.cost1))},
            onClick(){player.points = player.points.minus(format(player.M.cost1))
                player.M.level1=player.M.level1.add(1)
            player.M.cost1 = player.M.cost1.add(5).times(1.3)}
            },
            12:{
                display() {return "MP gain +" + format(player.M.effect2) + ". Cost: " + format(player.M.cost2) + " MP"},
                canClick(){return player.points.gte(format(player.M.cost2))},
                onClick(){player.points = player.points.minus(format(player.M.cost2))
                   
                    player.M.level2=player.M.level2.add(1)
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
                    21:{
                        display() {return "knowledge +1. cost: 150 MP"},
                        canClick(){return player.points.gte(150)&&player.points.div(30).add(1).gte(player.M.knowledge)},
                        onClick(){player.points = player.points.minus(150)
                     player.M.knowledge =  player.M.knowledge.add(1)
                            },
                            unlocked(){return (hasUpgrade('M',11))}
                        },
    },
    upgrades: {
        11: {
            title:"The knowledge of the universe.",
            description: "Unlock knowledge",
            cost: new Decimal(160),
            currencyDisplayName: "MP",
            currencyInternalName:"points",
            unlocked(){return player.M.cap.add(player.M.realeffect3).gte(160)||hasUpgrade('M',11)}
        },
        12: {
            title:"The knowledge of the galaxy.",
            description: "The first and second magic effect is better.",
            cost: new Decimal(2),
            currencyDisplayName: "knowledge",
            currencyInternalName:"knowledge",
            currencyLayer:"M",
            unlocked(){return hasUpgrade('M',11)}
        },
        13: {
            title:"The knowledge of the Solar system.",
            description: "MP gain x1.5 and MP gain per second boost the third Magic effect.",
            cost: new Decimal(300),
            currencyDisplayName: "MP",
            currencyInternalName:"points",
            unlocked(){return hasUpgrade('M',12)}
        },
        14: {
            title:"The knowledge of the Earth.",
            description: "knowledge boost MP gain",
            cost: new Decimal(8),
            currencyDisplayName: "knowledge",
            currencyInternalName:"knowledge",
            currencyLayer:"M",
            unlocked(){return hasUpgrade('M',12)}
        },
    },
    update(diff){
    if(player.M.cap.add(player.M.realeffect3).gte(1500)&&player.points.gte(1500))    player.points = new  Decimal(1500)
if (player.points.gte(player.M.cap.add(player.M.realeffect3))) player.points = player.M.cap.add(player.M.realeffect3)
if(hasUpgrade('M',14)) player.M.effect3 = (player.points.add(1).log(10)).pow(3).times(new Decimal(3).add(player.M.Boost).times(1.5).log(8).times(player.M.knowledge.pow(0.2).add(1)))
else  if(hasUpgrade('M',13)) player.M.effect3 = (player.points.add(1).log(10)).pow(3).times(new Decimal(3).add(player.M.Boost).times(1.5).log(8))
else player.M.effect3 = (player.points.add(1).log(10)).pow(3)
player.M.realeffect3 = player.M.effect3.times(player.M.level3)
if(hasUpgrade('M',12)) player.M.effect1 = new Decimal(30)
else  player.M.effect1 = new Decimal(20)
if(hasUpgrade('M',12)) player.M.effect2 = new Decimal(5)
else  player.M.effect2 = new Decimal(2)
player.M.cap = player.M.level1.times(player.M.effect1).add(30)
player.M.Boost= player.M.level2.times(player.M.effect2)



    },
    
    layerShown(){return true},
    tabFormat: {
        "Tier 1 magic": {
                content: [
                        
          
          "clickables",
         
          ["display-text",function(){
            let s=""
           if(hasUpgrade('M',11)) s+="Your have "+format(player.M.knowledge)+" knowledge.<br>"
           if(hasUpgrade('M',11)) s+="knowledge hardcap is "+ formatWhole(player.points.div(30).add(2))+".<br>"
          
          
            return s}],],
        
                unlocked(){
                        return true
                },
        },
        "Upgrades": {
            content: [
                    
      
     
      "upgrades"],
     
    
            unlocked(){
                    return true
            },
    },
    },
})
