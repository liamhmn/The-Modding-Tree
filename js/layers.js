addLayer("ma", {
    symbol: "MA", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        machineamount: new Decimal(1),
        upgradeamount: new Decimal(0),
        layeramount: new Decimal(1),
        nerfmorenerf: new Decimal(1),
    }},
    color: "#9f9f9f",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "machine power", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if(player.ma.machineamount.gte(3)) mult=mult.times(tmp.ma.machine3eff)
        if(player.ma.machineamount.gte(4)) mult=mult.times(tmp.ma.machine4eff)
        if(hasUpgrade('g',14)&&!inChallenge('g',12)&&player.mb.building1.gte(4)) mult=mult.times(upgradeEffect('m',13))
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
        31: {
            display() {return"<h3>Machine 5</h3><br><br><br>machine amount boost point gain.<br>currently: "+format(tmp.ma.machine5eff)+"x"},   
            style() { return {"font-size": "15px","height": "200px","width": "200px","background-color": "#9f9f9f"}},
            unlocked(){return player.ma.machineamount.gte(5)}
        },
        32: {
            display() {return"<h3>Machine 6</h3><br><br><br>Best mastery brick amount boost point gain.<br>currently: "+format(tmp.ma.machine6eff)+"x"},   
            style() { return {"font-size": "15px","height": "200px","width": "200px","background-color": "#9f9f9f"}},
            unlocked(){return player.ma.machineamount.gte(6)}
        },
        33: {
            display() {return"<h3>Machine 7</h3><br><br><br>Mastery brick is cheaper based on your point.<br>currently: /"+format(tmp.ma.machine7eff)},   
            style() { return {"font-size": "15px","height": "200px","width": "200px","background-color": "#9f9f9f"}},
            unlocked(){return player.ma.machineamount.gte(7)}
        },
        101: {
            display() {return"Unlock a new machine.<br>cost: "+format(tmp.ma.machineunlockcost)+" machine power"},   
            style() { return {"font-size": "14px","height": "200px","width": "200px"}},
            onClick(){player.ma.points=player.ma.points.sub(tmp.ma.machineunlockcost);player.ma.machineamount = player.ma.machineamount.add(1)},
            canClick(){return player.ma.points.gte(tmp.ma.machineunlockcost)},
        },
        102: {
            display() {return"Unlock a new machine upgrade.<br>cost: "+format(tmp.ma.upgradecost)+" machine power"},   
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
        13: {
            description:"Gear boost themselves.",
            cost: new Decimal(3.14e9),
            unlocked(){return player.ma.upgradeamount.gte(3)},
            effect(){return player.g.points.add(1).log(10).add(1).pow(0.75)},
            effectDisplay(){return format(upgradeEffect('ma',13))+"x"},
        }, 
        14: {
            description:"Unlock a new mastery building",
            cost: new Decimal(5e12),
            unlocked(){return player.ma.upgradeamount.gte(4)},
        }, 
        15: {
            description:"Machine 1 effect is better.",
            cost: new Decimal(3.14e16),
            unlocked(){return player.ma.upgradeamount.gte(5)},
        }, 
    },
    machine1eff(){
        let exp = new Decimal(0.5)
        if(inChallenge('g',11)) exp = new Decimal(0)
        let softcap = new Decimal(1e5)    
        if(hasUpgrade('ma',15)) softcap = softcap.times(30)
        let eff=player.ma.points.add(1).pow(exp)
        if(eff.gte(softcap)) eff = player.ma.points.add(1).pow(exp).div(softcap).log(10).add(1).times(softcap)
        return eff
    },
    machine2eff(){
        let exp = new Decimal(0.15)
        if(hasChallenge('g',11)&&!inChallenge('g',12)) exp = exp.times(1.75)
        if(hasUpgrade('g',12)&&!inChallenge('g',12)&&player.mb.building1.gte(1)) exp = exp.times(1.5)
        let softcap = new Decimal(500)
        if(hasUpgrade('g',13)&&!inChallenge('g',12)&&player.mb.building1.gte(2))  softcap = new Decimal(1000)
        let softcapeff= new Decimal(10)
        if(hasUpgrade('g',13)&&!inChallenge('g',12)&&player.mb.building1.gte(2))  softcapeff = new Decimal(2)
        let eff=player.points.add(1).pow(exp)
        if(player.points.add(1).pow(exp).gte(softcap)) eff = player.points.add(1).pow(exp).div(softcap).log(softcapeff).add(1).times(softcap)
        return eff
    },
    machine3eff(){
        let exp = new Decimal(1.25)
        if(hasUpgrade('g',11)&&!inChallenge('g',12)) exp = exp.times(2)
        if(hasChallenge('g',22)&&!inChallenge('g',12)) exp = exp.times(1.75)

        let eff=player.ma.points.add(1).log(10).add(1).pow(exp)
        return eff
    },
    machine4eff(){
        let exp = new Decimal(1.5)
        if(hasChallenge('g',12)&&!inChallenge('g',12)) exp = exp.times(1.75)
        if(hasChallenge('g',102)&&!inChallenge('g',12)) exp = exp.times(1.75)
        let eff=player.g.points.add(1).log(10).add(1).pow(exp)
        return eff
    },
    machine5eff(){
        let exp = new Decimal(1.25)
        if(inChallenge('g',102)) exp = new Decimal(0)
        if(hasChallenge('g',21)&&!inChallenge('g',12)) exp = exp.times(1.75)
        let eff=player.ma.machineamount.add(1).pow(exp)
        return eff
    },
    machine6eff(){
        let exp = new Decimal(2)
        if(inChallenge('g',102)) exp = new Decimal(0)
        let eff=player.mb.points.add(1).pow(exp)
        return eff
    },
     machine7eff(){
        let exp = new Decimal(1.314)  
        let eff=player.points.add(1).log(10).add(1).pow(exp)
        return eff
    },
    machineunlockcost(){
        let cost=new Decimal(5)
        if(player.ma.machineamount.gte(2)) cost=new Decimal(30)
        if(player.ma.machineamount.gte(3)) cost=new Decimal(1e5)
        if(player.ma.machineamount.gte(4)) cost=new Decimal(1e11)
        if(player.ma.machineamount.gte(5)) cost=new Decimal(1e14)
        if(player.ma.machineamount.gte(6)) cost=new Decimal(1e20)
        if(player.ma.machineamount.gte(7)) cost=new Decimal(1e1000)
        return cost
    },
    upgradecost(){
        let cost=new Decimal(75)
        if(player.ma.upgradeamount.gte(1)) cost=new Decimal(1e4)
        if(player.ma.upgradeamount.gte(2)) cost=new Decimal(1e9)
        if(player.ma.upgradeamount.gte(3)) cost=new Decimal(1e13)
        if(player.ma.upgradeamount.gte(4)) cost=new Decimal(7.5e16)
        if(player.ma.upgradeamount.gte(5)) cost=new Decimal(1e1000)
        return cost
    },
    layercost(){
        let cost=new Decimal(250)
        if(player.ma.layeramount.gte(2)) cost=new Decimal(1e12)
        if(player.ma.layeramount.gte(3)) cost=new Decimal(1e23)       
        if(player.ma.layeramount.gte(4)) cost=new Decimal(1e1000)
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
    passiveGeneration(){return hasMilestone('mb',0)},
    update(diff){
        if(inChallenge('g',101))   player.ma.nerfmorenerf = player.ma.nerfmorenerf.times(new Decimal(10).pow(0.05))
        else player.ma.nerfmorenerf=new Decimal(1)
    }
})
addLayer("g", {
    symbol: "GE", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#bfbfbf",
    requires: new Decimal(5000), // Can be a function that takes requirement increases into account
    resource: "gear", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if(hasUpgrade('ma',13)) mult=mult.times(upgradeEffect('ma',13))
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
        12: {
            name: "Gearless",
            challengeDescription: "Gear upgrade and challenge have no effect.",
            canComplete: function() {return player.points.gte(5e8)},
            goalDescription: "500,000,000 points",
            rewardDescription: "Machine 4 effect ^1.75", 
            unlocked(){return player.g.points.gte(1000)}
        },
        21: {
            name: "Powerless",
            challengeDescription: "Point gain ^0.5.",
            canComplete: function() {return player.points.gte(5e7)},
            goalDescription: "50,000,000 points",
            rewardDescription: "Machine 5 effect ^1.75", 
            unlocked(){return player.g.points.gte(1e6)}
        },
        22: {
            name: "powerless+",
            challengeDescription: "Point gain ^0.25.",
            canComplete: function() {return player.points.gte(2.5e6)},
            goalDescription: "2,500,000 points",
            rewardDescription: "Machine 3 effect ^1.75", 
            unlocked(){return player.g.points.gte(1e11)}
        },
        101: {
            name: "nerfmore",
            challengeDescription(){return "Point gain /10 per second. Currently: /" +format(player.ma.nerfmorenerf)},
            canComplete: function() {return player.points.gte(4.44e12)},
            goalDescription: "4.44e12 points",
            rewardDescription: "point x2 per gear upgrade (include upgrade you didn't unlock).", 
            unlocked(){return player.mb.building2.gte(1)||hasChallenge('g',101)}
        },
        102: {
            name: "Last machineless",
            challengeDescription(){return "Fifth and sixth machine has no effect"},
            canComplete: function() {return player.points.gte(4e16)},
            goalDescription: "4e16 points",
            rewardDescription: "machine 4 effect ^1.75", 
            unlocked(){return player.mb.building2.gte(2)||hasChallenge('g',102)}
        },
    },
    upgrades: {
        11: {
            description: "Machine 3 effect ^2",
            cost: new Decimal(1),
            unlocked(){return true}
        }, 
        12: {
            description: "Machine 2 effect ^1.5",
            cost: new Decimal(1e6),
            unlocked(){return player.mb.building1.gte(1)}
        }, 
        13: {
            description: "Machine 2 softcap is weaker.",
            cost: new Decimal(1e7),
            unlocked(){return player.mb.building1.gte(2)}
        }, 
        14: {
            description: "Third Machine upgrade also boost Machine power gain",
            cost: new Decimal(3.14e9),
            unlocked(){return player.mb.building1.gte(3)}
        }, 
    },
    unlockreq(){
        let req=new Decimal(1)
        if(player.g.points.gte(1))req=new Decimal(1000)
        if(player.g.points.gte(1000))req=new Decimal(1e6)
        if(player.g.points.gte(1e6))req=new Decimal(1e11)
        if(player.g.points.gte(1e11))req=new Decimal(1e20)
        return req
    },
    layerShown(){return player.ma.layeramount.gte(2)},
    tabFormat: {
        "Challenges": {
            unlocked(){return true},
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
            unlocked(){return true},
            content: [
                "main-display",
                "prestige-button",
                
                  "blank",
                "upgrades",
                
            ]
        },

    },

    passiveGeneration(){return hasMilestone('mb',1)},
})
addLayer("mb", {
    symbol: "MB", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        building1: new Decimal(0),
        building2: new Decimal(0),
        bestbrick: new Decimal(0),
        usedbrick: new Decimal(0),
        unusedbrick: new Decimal(0),
    }},
    color: "#ff9f7f",
    requires: new Decimal(5e13),    
    resource: "mastery brick", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1.25, // Prestige currency exponent
    base:20,
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if(player.ma.machineamount.gte(7)) mult=mult.div(tmp.ma.machine7eff)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "M", description: "Shift + M: Reset for mastery brick", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    clickables: {
        11: {
            display() {return"Reset Mastery buliding."},   
           onClick(){
            if(confirm("This will force a Mastery reset! Are you sure?")){
                player.mb.usedbrick=new Decimal(0);
                player.mb.building1=new Decimal(0)
                player.mb.building2=new Decimal(0)
                doReset(this.layer,true)}},
           canClick(){return true},   
           style() { return {"font-size": "14px","height": "100px","width": "200px"}},
            unlocked(){return true},
           
        },
        31: {
            display() {return"<h3>Mastery Building 1</h3><br>Unlock a new gear upgrade.<br><br>(level "+player.mb.building1+")<br>Cost: "+tmp.mb.cost1+" Mastery bricks"},   
           onClick(){player.mb.usedbrick=player.mb.usedbrick.add(tmp.mb.cost1);player.mb.building1=player.mb.building1.add(1)},
           canClick(){return player.mb.unusedbrick.gte(tmp.mb.cost1)},   
           style() { return {"font-size": "14px","height": "200px","width": "200px"}},
            unlocked(){return hasUpgrade('ma',14)},
           
        },
        32: {
            display() {return"<h3>Mastery Building 2</h3><br>Unlock a new gear challenge.<br><br>(level "+player.mb.building2+")<br>Cost: "+tmp.mb.cost2+" Mastery bricks"},   
           onClick(){player.mb.usedbrick=player.mb.usedbrick.add(tmp.mb.cost2);player.mb.building2=player.mb.building2.add(1)},
           canClick(){return player.mb.unusedbrick.gte(tmp.mb.cost2)},   
           style() { return {"font-size": "14px","height": "200px","width": "200px"}},
            unlocked(){return true},
           
        },
      
     },
     milestones: {
        0: {
            requirementDescription: "4 mastery brick",
            effectDescription: "Gain 100% of machine power on reset per second",
            done() { return player.mb.points.gte(4) }
        },
        1: {
            requirementDescription: "6 mastery brick",
            effectDescription: "Gain 100% of gear on reset per second",
            done() { return player.mb.points.gte(6) }
        },
    },
     cost1(){
        let req=new Decimal(1)
        if(player.mb.building1.gte(1))req=new Decimal(0)
        if(player.mb.building1.gte(2))req=new Decimal(0)
        if(player.mb.building1.gte(3))req=new Decimal(10)
        req=req.add(player.mb.building1).add(player.mb.building2)
        return req
    },
    cost2(){
        let req=new Decimal(2)
        if(player.mb.building2.gte(1))req=new Decimal(2)
        if(player.mb.building2.gte(2))req=new Decimal(10)
        req=req.add(player.mb.building1).add(player.mb.building2)
        return req
    },
    update(diff){player.mb.bestbrick=player.mb.best;player.mb.unusedbrick=player.mb.bestbrick.sub(player.mb.usedbrick)},
    layerShown(){return player.ma.layeramount.gte(3)},
    tabFormat: {
        "Milestones": {
            unlocked(){return true},
            content: [
                "main-display",
                "prestige-button",
                  "blank",
                "milestones",
                
            ]
        },
        "Buildings": {
            unlocked(){return true},
            content: [
                "main-display",
                "prestige-button",
                "blank",
                ["display-text",function(){

                    let s="Note: upgrades have no effect if you didn't unlock it<br> Your best mastery bricks is "+player.mb.bestbrick+"<br>"+"You have used " + player.mb.usedbrick+" mastery brick.<br>"
                    s+="You can use " + player.mb.unusedbrick+" more mastery brick."
                    return s
                  }],
                  "blank",
                "clickables",
                
            ]
        },

    },


})
addLayer("i", {
    symbol: "I", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        building1: new Decimal(0),
        building2: new Decimal(0),
        bestbrick: new Decimal(0),
        usedbrick: new Decimal(0),
        unusedbrick: new Decimal(0),
    }},
    color: "#e5dab7",
    requires: new Decimal(1e23),    
    resource: "imperium brick", // Name of prestige currency
    baseResource: "machine power", // Name of resource prestige is based on
    baseAmount() {return player.ma.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1.5, // Prestige currency exponent
    base:1e4,
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "i", description: "I: Reset for imperium brick", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    clickables: {
        11: {
            display() {return"<h3>Imperium Building 1</h3><br>Unlock a new gear upgrade.<br><br>(level "+player.mb.building1+")<br>Cost: "+tmp.mb.cost1+" Mastery bricks"},   
           onClick(){player.mb.usedbrick=player.mb.usedbrick.add(tmp.mb.cost1);player.mb.building1=player.mb.building1.add(1)},
           canClick(){return player.mb.unusedbrick.gte(tmp.mb.cost1)},   
           style() { return {"font-size": "14px","height": "200px","width": "200px"}},
            unlocked(){return hasUpgrade('ma',14)},
           
        },
      
     },
     milestones: {
        0: {
            requirementDescription: "1 Imperium brick",
            effectDescription: "Keep machine on reset.",
            done() { return player.i.points.gte(1) }
        },
    },
     cost1(){
        let req=new Decimal(1)
        if(player.mb.building1.gte(1))req=new Decimal(0)
        if(player.mb.building1.gte(2))req=new Decimal(0)
        if(player.mb.building1.gte(3))req=new Decimal(10)
        req=req.add(player.mb.building1).add(player.mb.building2)
        return req
    },
    cost2(){
        let req=new Decimal(2)
        if(player.mb.building2.gte(1))req=new Decimal(2)
        if(player.mb.building2.gte(2))req=new Decimal(10)
        req=req.add(player.mb.building1).add(player.mb.building2)
        return req
    },
    update(diff){player.mb.bestbrick=player.mb.best;player.mb.unusedbrick=player.mb.bestbrick.sub(player.mb.usedbrick)},
    layerShown(){return player.ma.layeramount.gte(3)},
    tabFormat: {
        "Milestones": {
            unlocked(){return true},
            content: [
                "main-display",
                "prestige-button",
                  "blank",
                "milestones",
                
            ]
        },
        "Buildings": {
            unlocked(){return true},
            content: [
                "main-display",
                "prestige-button",

                  "blank",
                "clickables",
                
            ]
        },

    },


})


