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
        time1: new Decimal(0),
        time2: new Decimal(0),
        getknow: new Decimal(0),
    }},
    color: "#c000c0",
    requires: new Decimal("51000"), // Can be a function that takes requirement increases into account
    resource: "Magic power", // Name of prestige currency
    tooltip(){return "Magic"},
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
                 if(player.M.level3.gte(7)) player.M.cost3 = player.M.cost3.add(25).times(2)
                     else   player.M.cost3 = player.M.cost3.add(12).times(1.6)},
                        unlocked(){return player.M.cap.gte(100)}
                    },
                    21:{
                        display() {return "knowledge +1. cost: 150 MP"},
                        canClick(){return player.points.gte(150)&&(player.points.div(30).add(1).gte(player.M.knowledge)||player.M.time1.gte(1))},
                        onClick(){player.points = player.points.minus(150)
                     player.M.knowledge =  player.M.knowledge.add(1)
                            },
                            unlocked(){return (hasUpgrade('M',11))}
                        },
                        41:{
                            display() {return "Remove the hardcap of knowledge but only active 10 second. cost: 1200 MP. Time left: "+format(player.M.time1)+" seconds."},
                            canClick(){return player.points.gte(1200)},
                            onClick(){
                                player.points = player.points.minus(1200)
                                player.M.time1 = new Decimal(10)
                         
                                },
                                unlocked(){return (hasUpgrade('M',21))}
                            },
                            42:{
                                display() {return "Remove MP cap but only active 10 second. cost: MP hardcap. Time left: "+format(player.M.time2)+" seconds."},
                                canClick(){return player.points.gte( formatWhole(player.M.cap.add(player.M.realeffect3).add(player.M.knowledge).minus(1)))&&!player.M.time1.gte(0.00001)},
                                onClick(){
                                    player.points = player.points.minus(formatWhole(player.M.cap.add(player.M.realeffect3).add(player.M.knowledge).minus(1)))
                                    player.M.time2 = new Decimal(10)
                           
                      
                                    },
                                    unlocked(){return (hasUpgrade('M',23))}
                                },
                                191:{
                                    display() {return "Get 1 knowledge per second but gain less MP (Didn't affect by first hardcap"},
                                    canClick(){return !player.M.getknow.gte(10)},
                                    onClick(){
                                      player.M.getknow = player.M.getknow.add(1)
                               
                          
                                        },
                                        unlocked(){return (hasUpgrade('M',33))}
                                    },
                                    192:{
                                        display() {return "Lose 1 knowledge per second but gain more MP"},
                                        canClick(){return player.M.getknow.gte(1)},
                                        onClick(){
                                            player.M.getknow = player.M.getknow.minus(1)
                              
                                            },
                                            unlocked(){return (hasUpgrade('M',33))}
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
            unlocked(){return hasUpgrade('M',13)}
        },
        21: {
            title:"The knowledge of the People.",
            description: "Unlock a magic",
            cost: new Decimal(50),
            currencyDisplayName: "knowledge",
            currencyInternalName:"knowledge",
            currencyLayer:"M",
            unlocked(){return hasUpgrade('M',14)}
        },
        22: {
            title:"The knowledge of the animal.",
            description: "Remove the hardcap of boost hardcap and knowledge boost MP cap. Buy upgrade will not reset your knowledge.",
            cost: new Decimal(100),
            currencyDisplayName: "knowledge",
            currencyInternalName:"knowledge",
            currencyLayer:"M",
        
            unlocked(){return hasUpgrade('M',21)}
        },
        23: {
            title:"The knowledge of the Organ system.",
            description: "Unlock a magic.",
            cost: new Decimal(3000),
           
            currencyDisplayName: "MP",
            currencyInternalName:"points",
    
            unlocked(){return hasUpgrade('M',22)}
        },
        24: {
            title:"The knowledge of the Organ.",
            description: "Boost the first upgrade based on MP.",
            cost: new Decimal(3470),
           
            currencyDisplayName: "MP",
            currencyInternalName:"points",
    
            unlocked(){return hasUpgrade('M',23)}
        },
        31: {
            title:"The knowledge of the Tissue.",
            description: "knowledge boost MP cap again.",
            cost: new Decimal(4000),
           
            currencyDisplayName: "MP",
            currencyInternalName:"points",
    
            unlocked(){return hasUpgrade('M',24)}
        },
        32: {
            title:"The knowledge of the cell",
            description: "MP boost the second magic.",
            cost: new Decimal(6969),
           
            currencyDisplayName: "MP",
            currencyInternalName:"points",
    
            unlocked(){return hasUpgrade('M',31)}
        },
        33: {
            title:"The knowledge of the orgenelle",
            description: "Unlock 2 magic.",
            cost: new Decimal(11111),
           
            currencyDisplayName: "MP",
            currencyInternalName:"points",
    
            unlocked(){return hasUpgrade('M',32)}
        },
        34: {
            title:"The knowledge of the protein",
            description: "MP gain x2.",
            cost: new Decimal(22500),
           
            currencyDisplayName: "MP",
            currencyInternalName:"points",
    
            unlocked(){return hasUpgrade('M',33)}
        },
        41: {
            title:"The knowledge of the Molecule",
            description: "MP hardcap boost MP gain.",
            cost: new Decimal(36000),
           
            currencyDisplayName: "MP",
            currencyInternalName:"points",
    
            unlocked(){return hasUpgrade('M',34)}
        },
        42: {
            title:"The knowledge of the atom",
            description: "Unlock a prestige layer.",
            cost: new Decimal(51000),
           
            currencyDisplayName: "MP",
            currencyInternalName:"points",
    
            unlocked(){return hasUpgrade('M',41)}
        },
    },
    update(diff){
        if(hasUpgrade('M',31)&&player.points.gte(player.M.cap.add(player.M.realeffect3).add(player.M.knowledge.pow(1.25)))&&!player.M.time2.gte(0.00001))player.points = player.M.cap.add(player.M.realeffect3).add(player.M.knowledge.pow(1.25))
      else  if(hasUpgrade('M',22)&&!hasUpgrade('M',31)&&player.points.gte(player.M.cap.add(player.M.realeffect3).add(player.M.knowledge))&&!player.M.time2.gte(0.00001))   player.points = new  Decimal(player.M.cap.add(player.M.realeffect3).add(player.M.knowledge))
  else  if(!hasUpgrade('M',22)&&!hasUpgrade('M',31)&&player.M.cap.add(player.M.realeffect3).gte(1500)&&player.points.gte(1500)&&!player.M.time2.gte(0.00001))    player.points = new  Decimal(1500)
else if (!hasUpgrade('M',22)&&!hasUpgrade('M',31)&&player.points.gte(player.M.cap.add(player.M.realeffect3))&&!player.M.time2.gte(0.00001)) player.points = player.M.cap.add(player.M.realeffect3)
if(hasUpgrade('M',14)) player.M.effect3 = (player.points.add(1).log(10)).pow(3).times(new Decimal(3).add(player.M.Boost).times(1.5).log(8).times(player.M.knowledge.pow(0.2).add(1)))
else  if(hasUpgrade('M',13)) player.M.effect3 = (player.points.add(1).log(10)).pow(3).times(new Decimal(3).add(player.M.Boost).times(1.5).log(8))
else player.M.effect3 = (player.points.add(1).log(10)).pow(3)
player.M.realeffect3 = player.M.effect3.times(player.M.level3)
if(hasUpgrade('M',24)) player.M.effect1 = new Decimal(player.points.add(1).pow(0.5).add(1))
else if(hasUpgrade('M',12)) player.M.effect1 = new Decimal(30)
else  player.M.effect1 = new Decimal(20)
if(hasUpgrade('M',32)) player.M.effect2 = new Decimal(5).add(player.points.add(10).log(10).add(1))
else if(hasUpgrade('M',12)) player.M.effect2 = new Decimal(5)
else  player.M.effect2 = new Decimal(2)
player.M.cap = player.M.level1.times(player.M.effect1).add(30)
player.M.Boost= player.M.level2.times(player.M.effect2)
if(player.M.time1.gte(0.00001)) player.M.time1= player.M.time1.minus(new Decimal(1).times(diff))
if(!player.M.time1.gte(0))player.M.time1=  new Decimal(0)
if(player.M.time2.gte(0.00001)) player.M.time2= player.M.time2.minus(new Decimal(1).times(diff))
if(!player.M.time2.gte(0))player.M.time2=  new Decimal(0)
player.M.knowledge =player.M.knowledge.add(player.M.getknow.times(diff)) 

if(player.M.knowledge < 0) player.M.getknow = new Decimal(0)
if(player.M.knowledge < 0) player.M.knowledge = new Decimal(0)
if(!player.points.gte(0.000001)) player.M.getknow = new Decimal(0)
if(player.M.knowledge.gte(1250)) player.M.knowledge = new Decimal(1250)



    },
    doReset(resettingLayer) {
        let keep = [];
    
        if (resettingLayer=="M")    cap= new Decimal(30)
        if (resettingLayer=="M")  Boost= new Decimal(0)
        if (resettingLayer=="M") cost1= new Decimal(20)
        if (resettingLayer=="M")  cost2= new Decimal(50)
        if (resettingLayer=="M")  cost3= new Decimal(100)
     
        if (resettingLayer=="M")  effect1= new Decimal(20)
        if (resettingLayer=="M")  effect2= new Decimal(2)
        if (resettingLayer=="M") effect3= new Decimal(0)
        if (resettingLayer=="M") level1= new Decimal(0)
        if (resettingLayer=="M")  level2= new Decimal(0)
        if (resettingLayer=="M") level3= new Decimal(0)
        if (resettingLayer=="M")   realeffect3= new Decimal(0)
        if (resettingLayer=="M")  knowledge= new Decimal(0)
        if (resettingLayer=="M")  time1= new Decimal(0)
        if (resettingLayer=="M")  time2= new Decimal(0)
        if (resettingLayer=="M") getknow= new Decimal(0)
     
        if (resettingLayer=="M") layerDataReset(this.layer, keep)
        player.M.points=new Decimal (1)
    },
    layerShown(){return true},
    tabFormat: {
        "Tier 1 magic": {
                content: [
                        
          
                    ["row",[ ["clickable",11], ["clickable",12], ["clickable",13]]],
                    ["row",[ ["clickable",21], ["clickable",22], ["clickable",23]]],
                    ["row",[ ["clickable",31], ["clickable",32], ["clickable",33]]],
          ["display-text",function(){
            let s=""
           if(hasUpgrade('M',11)) s+="Your have "+format(player.M.knowledge)+" knowledge.<br>"
          
           if(hasUpgrade('M',11)) s+="knowledge hardcap is "+ formatWhole(player.points.div(30).add(2))+".<br>"
           if(player.M.knowledge.gte(625)) s+="knowledge second hardcap is 1250.<br>"
           if(hasUpgrade('M',33)) s+="You are gaining "+ formatWhole(player.M.getknow)+" knowledge per second.<br>"

           if(hasUpgrade('M',33)&&player.M.getknow.gte(0)) s+="You are gaining "+ formatWhole(player.M.getknow.times(200))+" less MP per second.<br>"
           else s+="You are gaining "+ formatWhole(new Decimal(0).minus(player.M.getknow.times(50)))+" more MP per second.<br>"
          
            return s}],],
        
                unlocked(){
                        return true
                },
        },
        "Tier 2 magic": {
            content: [
                    
      
                ["row",[ ["clickable",41], ["clickable",42], ["clickable",43]]],
                ["row",[ ["clickable",51], ["clickable",52], ["clickable",53]]],
                ["row",[ ["clickable",61], ["clickable",62], ["clickable",63]]],
      ["display-text",function(){
        let s=""
       if(hasUpgrade('M',11)) s+="Your have "+format(player.M.knowledge)+" knowledge.<br>"
       if(hasUpgrade('M',11)) s+="knowledge hardcap is "+ formatWhole(player.points.div(30).add(2))+".<br>"
       if(player.M.knowledge.gte(625)) s+="knowledge second hardcap is 1250.<br>"
       if(hasUpgrade('M',33)) s+="You are gaining "+ formatWhole(player.M.getknow)+" knowledge per second.<br>"

       if(hasUpgrade('M',33)&&player.M.getknow.gte(1)) s+="You are gaining "+ formatWhole(player.M.getknow.times(200))+" less MP per second.<br>"
       else s+="You are gaining "+ formatWhole(new Decimal(0).minus(player.M.getknow.times(50)))+" more MP per second.<br>"
      
        return s}],],
    
            unlocked(){
                    return hasUpgrade('M',21)||player.M.points.gte(1)
            },
    },
    "knowledge ": {
        content: [
                
  
            ["row",[ ["clickable",191], ["clickable",192], ["clickable",193]]],
            ["row",[ ["clickable",201], ["clickable",202], ["clickable",203]]],
            ["row",[ ["clickable",211], ["clickable",212], ["clickable",213]]],
  ["display-text",function(){
    let s=""
   if(hasUpgrade('M',11)) s+="Your have "+format(player.M.knowledge)+" knowledge.<br>"
   if(hasUpgrade('M',11)) s+="knowledge hardcap is "+ formatWhole(player.points.div(30).add(2))+".<br>"
   if(player.M.knowledge.gte(625)) s+="knowledge second hardcap is 1250.<br>"
   if(hasUpgrade('M',33)) s+="You are gaining "+ formatWhole(player.M.getknow)+" knowledge per second.<br>"

   if(hasUpgrade('M',33)&&player.M.getknow.gte(1)) s+="You are gaining "+ formatWhole(player.M.getknow.times(200))+" less MP per second.<br>"
   else s+="You are gaining "+ formatWhole(new Decimal(0).minus(player.M.getknow.times(50)))+" more MP per second.<br>"
  
    return s}],],

        unlocked(){
                return hasUpgrade('M',33)||player.M.points.gte(1)
        },
},
        "Upgrades": {
            content: [
                    
      
     
      "upgrades"],
     
    
            unlocked(){
                    return true
            },
    },
    "Prestige": {
        content: [
        "main-display",
        "prestige-button",
        "blank"],
 
        unlocked(){
            return hasUpgrade('M',42)||player.M.points.gte(1)
    },
     
},
    },
})
