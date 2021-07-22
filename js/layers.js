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
        cost4: new Decimal(10000),
        cost5: new Decimal(10000000),
        costE: new Decimal(1e6),
        effect1: new Decimal(20),
        effect2: new Decimal(2),
        effect3: new Decimal(0),
        effect4: new Decimal(0),
        effect5: new Decimal(0),
        level1: new Decimal(0),
        level2: new Decimal(0),
        level3: new Decimal(0),
        level4: new Decimal(0),
        level5: new Decimal(0),
        levelE: new Decimal(0),
        realeffect3: new Decimal(0),
        knowledge: new Decimal(0),
       power: new Decimal(0),
      Energy: new Decimal(0),
        time1: new Decimal(0),
        time2: new Decimal(0),
        time3: new Decimal(0),
        getknow: new Decimal(0),
        poin: new Decimal(0),
        speed: new Decimal(1),
    
        boostcap: new Decimal(0),
        timeb1: new Decimal(0),
        timec1: new Decimal(0),
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
            canClick(){return  player.points.gte((player.M.cost1))},
            onClick(){player.points = player.points.minus((player.M.cost1))
                player.M.level1=player.M.level1.add(1)
                if(player.M.level1.gte(35)) player.M.cost1 = player.M.cost1.add(25).times(1.7)
            else player.M.cost1 = player.M.cost1.add(5).times(1.3)}
            },
            12:{
                display() {return "MP gain +" + format(player.M.effect2) + ". Cost: " + format(player.M.cost2) + " MP"},
                canClick(){return player.points.gte((player.M.cost2))},
                onClick(){player.points = player.points.minus((player.M.cost2))
                   
                    player.M.level2=player.M.level2.add(1)
                    if(player.M.level2.gte(37)) player.M.cost2 = player.M.cost2.add(8).times(1.8)
                   else if(hasMilestone('M',2)) player.M.cost2 = player.M.cost2.add(8).times(1.3)
                    else player.M.cost2 = player.M.cost2.add(8).times(1.4)}
                },
                13:{
                    display() {return "MP cap + " +format(player.M.effect3) + " (based on MP). cost: " + format(player.M.cost3) + " MP"},
                    canClick(){return  player.points.gte((player.M.cost3))},
                    onClick(){player.points = player.points.minus((player.M.cost3))
                 player.M.level3 =  player.M.level3.add(1)
                 if(player.M.level3.gte(14))player.M.cost3 = player.M.cost3.add(25).times(2.7)
                 else if(player.M.level3.gte(7)) player.M.cost3 = player.M.cost3.add(25).times(2)
                     else   player.M.cost3 = player.M.cost3.add(12).times(1.6)},
                        unlocked(){return player.M.cap.gte(100)}
                    },
                    21:{
                        display() {return "MP cap x " +format(player.M.effect4) + ". cost: " + format(player.M.cost4) + " MP"},
                        canClick(){return  player.points.gte((player.M.cost4))},
                        onClick(){player.points = player.points.minus((player.M.cost4))
                     player.M.level4 =  player.M.level4.add(1)
                     if(player.M.level4.gte(7))   player.M.cost4 = player.M.cost4.add(25).times(4)
                  else player.M.cost4 = player.M.cost4.add(25).times(2.2)},
                            unlocked(){return hasUpgrade('M',43)}
                        },
                       
                    31:{
                        display() {if(hasUpgrade('M',54)) return "knowledge +250. cost: 37500 MP"
                    else return "knowledge +1. cost: 150 MP"},
                        canClick(){return ((!hasUpgrade('M',54)&&player.points.gte(150))||(hasUpgrade('M',54)&&player.points.gte(37500)))&&((player.points.div(30).add(1).gte(player.M.knowledge)&&!player.M.knowledge.gte(2500))||player.M.time1.gte(1))&&(!player.M.knowledge.gte(1250)||player.M.time3.gte(0.000000001))&&!player.M.knowledge.gte(50000)},
                        onClick(){
                            
                            if(hasUpgrade('M',54))    player.points = player.points.minus(37500)
                            else player.points = player.points.minus(150)
                            if(hasUpgrade('M',54))  player.M.knowledge =  player.M.knowledge.add(250)
                            else player.M.knowledge =  player.M.knowledge.add(1)
                            },
                            unlocked(){return (hasUpgrade('M',11))}
                        },
                        32:{
                            display() {
                               if(inChallenge('M',11)) return "Power +1.<br> cost: 60000 MP"
                               else return "Power +1.<br> cost: 80000 MP"},
                            canClick(){return (player.points.gte(80000)||(player.points.gte(60000)&&inChallenge('M',11)))&&!player.M.power.gte(20)},
                            onClick(){
                                
                                if(inChallenge('M',11))   player.points = player.points.minus(60000)
                                else  player.points = player.points.minus(80000)
                         player.M.power =  player.M.power.add(1)
                                },
                                unlocked(){return (hasUpgrade('M',44))}
                            },
                      
                        41:{
                            display() {return "Remove the first hardcap of knowledge but only active 10 second.<br> cost: 1,200 MP.<br> Time left: "+format(player.M.time1)+" seconds."},
                            canClick(){return player.points.gte(1200)},
                            onClick(){
                                player.points = player.points.minus(1200)
                                player.M.time1 = new Decimal(10)
                         
                                },
                               
                                unlocked(){return (hasUpgrade('M',21))}
                            },
                            42:{
                                display() {return "Remove MP cap but only active 10 second.<br> cost: " + format(player.M.cap.add(player.M.realeffect3).add(player.M.knowledge))+" MP.<br>Time left: "+format(player.M.time2)+" seconds."},
                                canClick(){return player.points.gte( formatWhole(player.M.cap.add(player.M.realeffect3).add(player.M.knowledge).minus(1)))&&!player.M.time2.gte(0.00001)},
                                onClick(){
                                    player.points = player.points.minus(formatWhole(player.M.cap.add(player.M.realeffect3).add(player.M.knowledge).minus(1)))
                                    if(hasMilestone('M',1))  player.M.time2 = new Decimal(1)
                                     else   player.M.time2 = new Decimal(10)
                           
                      
                                    },
                                    unlocked(){return (hasUpgrade('M',23))}
                                },
                                43:{
                                    display() {return "Get knowledge Magic didn't affect by second hardcap but only active 10 second.<br> cost: 50,000 MP.<br> Time left: "+format(player.M.time3)+" seconds."},
                                    canClick(){return player.points.gte(50000)},
                                    onClick(){
                                        player.points = player.points.minus(50000)
                                        player.M.time3 = new Decimal(10)
                               
                          
                                        },
                                        unlocked(){return (hasUpgrade('M',52))}
                                    },
                                    71:{
                                        display() {return "The fourth magic base + 0.1 but only active 10 second.<br> cost: 30 Energy.<br> Time left: "+format(player.M.timeb1)+" seconds.<br>cooldown: "+format(player.M.timec1)+" seconds"},
                                        canClick(){return player.M.Energy.gte(30)&&!player.M.timec1.gte(0.00000001)},
                                        onClick(){
                                            player.M.Energy =player.M.Energy.minus(30)
                                            player.M.timeb1 = new Decimal(10)
                                            player.M.timec1  = new Decimal(20)
                              
                                            },
                                            unlocked(){return (hasUpgrade('M',64))}
                                        },
                                191:{
                                    display() {return "Get 1 knowledge per second but gain less MP (Didn't affect by first hardcap)"},
                                    canClick(){return !player.M.getknow.gte(10)&&!player.M.knowledge.gte(1250)},
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
                                    221:{
                                            display() {return "Time speed /2"},
                                            canClick(){return true},
                                            onClick(){
                                                player.M.speed =   player.M.speed.div(2)
                                                player.devSpeed = player.M.speed
                            
                                                },
                                                unlocked(){return (hasMilestone('M',1))}
                                            },
                                            222:{
                                                display() {return "Time speed x2"},
                                                canClick(){return !player.M.speed.gte(1)},
                                                onClick(){
                                                    player.M.speed =   player.M.speed.times(2)
                                                    player.devSpeed = player.M.speed
                                                  
                                                    },
                                                    unlocked(){return (hasMilestone('M',1))}
                                                },
                                                251:{
                                                    display() {return "Get 1 Energy per second.<br>Cost: " +format(player.M.costE) + " MP"},
                                                    canClick(){return player.points.gte((player.M.costE))},
                                                    onClick(){
                                                        player.points = player.points.minus((player.M.costE))
                                                        player.M.levelE =  player.M.levelE.add(1)
                                                      player.M.costE = player.M.costE.pow(1.1)
                                                      
                                                        },
                                                        unlocked(){return (hasUpgrade('M',63))}
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
            onPurchase(){
player.M.knowledge= player.M.knowledge.add(100)

            },
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
        43: {
            title:"The knowledge of the subatomic particle",
            description: "Unlock a Magic.",
            cost: new Decimal(64000),
           
            currencyDisplayName: "MP",
            currencyInternalName:"points",

            unlocked(){return hasUpgrade('M',42)}
        },
        44: {
            title:"The knowledge of the GOD",
            description: "Unlock Power.",
            cost: new Decimal(87000),
           
            currencyDisplayName: "MP",
            currencyInternalName:"points",

            unlocked(){return hasUpgrade('M',43)}
        },
        51: {
            title:"The Power of the subatomic particle.",
            description: "Power boost the fourth magic effect.",
            cost: new Decimal(2),
            currencyDisplayName: "Power",
            currencyInternalName:"power",
            currencyLayer:"M",
            unlocked(){return hasUpgrade('M',44)}
        },
        52: {
            title:"The Power of the atom.",
            description: "Unlock a magic.",
            cost: new Decimal(100000),
            currencyDisplayName: "MP",
            currencyInternalName:"points",
            unlocked(){return hasUpgrade('M',51)}
        },
        53: {
            title:"The Power of the Molecule.",
            description: "Boost the first magic based on power.",
            cost: new Decimal(150000),
            currencyDisplayName: "MP",
            currencyInternalName:"points",
            unlocked(){return hasUpgrade('M',52)}
        },
        54: {
            title:"The Power of the protein",
            description: "Get knowledge magic cost and gain x250.",
            cost: new Decimal(375000),
            currencyDisplayName: "MP",
            currencyInternalName:"points",
            unlocked(){return hasUpgrade('M',53)}
        },
        61: {
            title:"The Power of the protein",
            description: "MP gain x5.",
            cost: new Decimal(1200000),
            currencyDisplayName: "MP",
            currencyInternalName:"points",
            unlocked(){return hasUpgrade('M',54)}
        },
        62: {
            title:"The Power of the orgenelle",
            description: "MP cap x0.25 boost MP gain.",
            cost: new Decimal(5000000),
            currencyDisplayName: "MP",
            currencyInternalName:"points",
            unlocked(){return hasUpgrade('M',61)}
        },
        63: {
            title:"The Power of the orgenelle",
            description: "Unlock energy.",
            cost: new Decimal(8500000),
            currencyDisplayName: "MP",
            currencyInternalName:"points",
            unlocked(){return hasUpgrade('M',62)}
        },
        64: {
            title:"The Power of the orgenelle",
            description: "Unlock a magic.",
            cost: new Decimal(50),
            currencyDisplayName: "energy",
            currencyInternalName:"Energy",
            currencyLayer:"M",
            unlocked(){return hasUpgrade('M',63)}
        },
        71: {
            title:"The Power of the cell",
            description: "Unlock a challenge,  keep upgrade on reset.",
            cost: new Decimal(21000000),
            currencyDisplayName: "MP",
            currencyInternalName:"points",
            unlocked(){return hasUpgrade('M',64)}
        },
    
       
    },
    milestones: {
        1: {
            requirementDescription: "1 Magic power",
            effectDescription: "MP gain x10 but second Tier 2 magic only can active 1 second. Unlock 2 magic.",
            done() { return player.M.points.gte(1) }
        },
        2: {
            requirementDescription: "2 Magic power",
            effectDescription: "The second magic is cheaper. ",
            done() { return player.M.points.gte(2) }
        },
        
    },
 
    update(diff){
        if(hasUpgrade('M',43)&&player.points.gte(player.M.cap.add(player.M.realeffect3).add(player.M.knowledge.pow(1.25)).times(player.M.boostcap))&&!player.M.time2.gte(0.00001)) player.points = player.M.cap.add(player.M.realeffect3).add(player.M.knowledge.pow(1.25)).times(player.M.boostcap)
       else if(hasUpgrade('M',31)&&!hasUpgrade('M',43)&&player.points.gte(player.M.cap.add(player.M.realeffect3).add(player.M.knowledge.pow(1.25)))&&!player.M.time2.gte(0.00001))player.points = player.M.cap.add(player.M.realeffect3).add(player.M.knowledge.pow(1.25))
      else  if(hasUpgrade('M',22)&&!hasUpgrade('M',31)&&player.points.gte(player.M.cap.add(player.M.realeffect3).add(player.M.knowledge))&&!player.M.time2.gte(0.00001))   player.points = new  Decimal(player.M.cap.add(player.M.realeffect3).add(player.M.knowledge))
  else  if(!hasUpgrade('M',22)&&!hasUpgrade('M',31)&&player.M.cap.add(player.M.realeffect3).gte(1500)&&player.points.gte(1500)&&!player.M.time2.gte(0.00001))    player.points = new  Decimal(1500)
else if (!hasUpgrade('M',22)&&!hasUpgrade('M',31)&&player.points.gte(player.M.cap.add(player.M.realeffect3))&&!player.M.time2.gte(0.00001)) player.points = player.M.cap.add(player.M.realeffect3)
if(hasChallenge('M',11)) player.M.effect3 = (player.points.add(1).log(5)).pow(3).times(new Decimal(3).add(player.M.Boost).times(1.5).log(8).times(player.M.knowledge.pow(0.2).add(1)))
else if(hasUpgrade('M',14)) player.M.effect3 = (player.points.add(1).log(10)).pow(3).times(new Decimal(3).add(player.M.Boost).times(1.5).log(8).times(player.M.knowledge.pow(0.2).add(1)))
else  if(hasUpgrade('M',13)) player.M.effect3 = (player.points.add(1).log(10)).pow(3).times(new Decimal(3).add(player.M.Boost).times(1.5).log(8))
else player.M.effect3 = (player.points.add(1).log(10)).pow(3)
player.M.realeffect3 = player.M.effect3.times(player.M.level3)
if(player.M.timeb1.gte(0.0000000001)) player.M.effect4 = new Decimal(1.35).add(player.M.power.add(1).log(10).add(1).log(10).add(1).log(10))
else if(hasUpgrade('M',51)) player.M.effect4 = new Decimal(1.25).add(player.M.power.add(1).log(10).add(1).log(10).add(1).log(10))
else  player.M.effect4 = new Decimal(1.25)
if(hasUpgrade('M',53))  player.M.effect1 = new Decimal(player.points.add(1).pow(0.5).add(1)).times(player.M.power.pow(0.3).add(1))
else if(hasUpgrade('M',24)) player.M.effect1 = new Decimal(player.points.add(1).pow(0.5).add(1))
else if(hasUpgrade('M',12)) player.M.effect1 = new Decimal(30)
else  player.M.effect1 = new Decimal(20)
if(hasUpgrade('M',32)) player.M.effect2 = new Decimal(5).add(player.points.add(10).log(10).add(1))
else if(hasUpgrade('M',12)) player.M.effect2 = new Decimal(5)
else  player.M.effect2 = new Decimal(2)
player.M.boostcap =Math.pow( player.M.effect4,player.M.level4)
player.M.cap = player.M.level1.times(player.M.effect1).add(30)
player.M.Boost= player.M.level2.times(player.M.effect2)
if(player.M.time1.gte(0.00001)) player.M.time1= player.M.time1.minus(new Decimal(1).times(diff))
if(!player.M.time1.gte(0))player.M.time1=  new Decimal(0)
if(player.M.time2.gte(0.00001)) player.M.time2= player.M.time2.minus(new Decimal(1).times(diff))
if(!player.M.time2.gte(0))player.M.time2=  new Decimal(0)
if(player.M.time3.gte(0.00001)) player.M.time3= player.M.time3.minus(new Decimal(1).times(diff))
if(!player.M.time3.gte(0))player.M.time3=  new Decimal(0)
if(player.M.timeb1.gte(0.00001)) player.M.timeb1= player.M.timeb1.minus(new Decimal(1).times(diff))
if(!player.M.timeb1.gte(0))player.M.timeb1=  new Decimal(0)
if(player.M.timec1.gte(0.00001)) player.M.timec1= player.M.timec1.minus(new Decimal(1).times(diff))
if(!player.M.timec1.gte(0))player.M.timec1=  new Decimal(0)
player.M.knowledge =player.M.knowledge.add(player.M.getknow.times(diff)) 

if(player.M.knowledge < 0) player.M.getknow = new Decimal(0)
if(player.M.knowledge < 0) player.M.knowledge = new Decimal(0)
if(!player.points.gte(0.000001)) player.M.getknow = new Decimal(0)
if(player.M.knowledge.gte(1250)) player.M.getknow= new Decimal(0)
if(player.M.power.gte(20)) player.M.power= new Decimal(20)
if(player.M.knowledge.gte(50000)) player.M.knowledge = new Decimal(50000)
player.M.Energy=player.M.Energy.add(player.M.levelE.times(diff))
if(player.M.Energy.gte(100)) player.M.Energy=new Decimal(100)
if(inChallenge('M',11)) player.M.knowledge=new  Decimal(0)

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
      
        if (resettingLayer=="M")  time1= new Decimal(0)
        if (resettingLayer=="M")  time2= new Decimal(0)
        if (resettingLayer=="M") getknow= new Decimal(0)
        if (resettingLayer=="M") speed= new Decimal(1)
        if (resettingLayer=="M") poin= tmp.M.resetGain
        if (resettingLayer == "M") keep.push("points")
        if (resettingLayer == "M"&&hasUpgrade('M',71)) keep.push("upgrades")
        if (resettingLayer == "M") keep.push("challenges")
        if (resettingLayer=="M")  knowledge= new Decimal(0)
        if (resettingLayer=="M") layerDataReset(this.layer, keep)
       
    },
    layerShown(){return true},
    challenges: {
        11: {
            name: "No knowledge",
            challengeDescription: "You can't get knowledge but power is cheaper",
            goal: new Decimal(100000),
            rewardDescription(){return "Boost the third magic and MP gain x2."},
          unlocked(){return hasUpgrade("M", 71)},
        },
    },
    tabFormat: {
        "Magic": {
                content: [
                        
                    ["microtabs", "A"]
        ],
        
                unlocked(){
                        return true
                },
        },
      
        "Upgrades": {
            content: [
                    
      
     
                ["microtabs", "B"]
              
            ],
     
    
            unlocked(){
                    return true
            },
    },

    "Prestige": {
        content: [
        "main-display",
        "prestige-button",
        "blank",
    "milestones"],
 
        unlocked(){
            return hasUpgrade('M',42)||player.M.points.gte(1)
    },
     
},
"Challenge": {
    content: [
    "blank",
"challenges"],

    unlocked(){
        return hasUpgrade('M',71)
},
 
},
"Stats": {
    content: [
   
        ["display-text",function(){
            let s=""
           if(hasUpgrade('M',11)) s+="Your have "+format(player.M.knowledge)+" knowledge.<br>"
           if(player.points.gte(74940))s+="knowledge hardcap is 2500.<br>"
           else if(hasUpgrade('M',11)) s+="knowledge hardcap is "+ formatWhole(player.points.div(30).add(2))+".<br>"
           if(player.M.knowledge.gte(625)) s+="knowledge second hardcap is 1250.<br>"
           if(player.M.knowledge.gte(30000))s+="knowledge third hardcap is 50000.<br>"
           if(hasUpgrade('M',33)) s+="You are gaining "+ formatWhole(player.M.getknow)+" knowledge per second.<br>"
           if(hasUpgrade('M',33)&&player.M.getknow.gte(0)) s+="You are gaining "+ formatWhole(player.M.getknow.times(200))+" less MP per second.<br>"
           else s+="You are gaining "+ formatWhole(new Decimal(0).minus(player.M.getknow.times(50)))+" more MP per second.<br>"
           if(hasUpgrade('M',44)) s+="Your have "+format(player.M.power)+" Power.<br>"
           if(hasUpgrade('M',63)) s+="Your have "+format(player.M.Energy)+" energy.<br>"
           if(hasUpgrade('M',63))s+="You are gaining "+player.M.levelE+" energy per second.<br>"
           if(hasUpgrade('M',63))s+="Energy hardcap is 100.<br>"
          
            return s}]
       
    ],
    unlocked(){
            return true
    },
},

    },
    microtabs: {
        "A": {
                "Tier 1": {
                        content: [
                         
                    ["row",[ ["clickable",11], ["clickable",12], ["clickable",13]]],
                    ["row",[ ["clickable",21], ["clickable",22], ["clickable",23]]],
                    ["row",[ ["clickable",31], ["clickable",32], ["clickable",33]]],
                    ["display-text",function(){
                        let s=""
                       if(hasUpgrade('M',11)) s+="Your have "+format(player.M.knowledge)+" knowledge.<br>"
                       if(hasUpgrade('M',44)) s+="Your have "+format(player.M.power)+" Power.<br>"
                       return s}]
                        ],
                        unlocked(){
                                return true
                        },
                },
                "Tier 2": {
                    content: [
                        ["row",[ ["clickable",41], ["clickable",42], ["clickable",43]]],
                        ["row",[ ["clickable",51], ["clickable",52], ["clickable",53]]],
                        ["row",[ ["clickable",61], ["clickable",62], ["clickable",63]]],
             
                    ],
                    unlocked(){
                            return hasUpgrade('M',21)||player.M.points.gte(1)
                    },
            },
            "Tier 3": {
                content: [
                    ["row",[ ["clickable",71], ["clickable",72], ["clickable",73]]],
                    ["row",[ ["clickable",81], ["clickable",82], ["clickable",83]]],
                    ["row",[ ["clickable",91], ["clickable",92], ["clickable",93]]],
         
                ],
                unlocked(){
                        return hasUpgrade('M',64)
                },
        },
            "knowledge": {
                content: [
                  
            ["row",[ ["clickable",191], ["clickable",192], ["clickable",193]]],
            ["row",[ ["clickable",201], ["clickable",202], ["clickable",203]]],
            ["row",[ ["clickable",211], ["clickable",212], ["clickable",213]]],
            ["display-text",function(){
                let s=""
                if(hasUpgrade('M',11)) s+="Your have "+format(player.M.knowledge)+" knowledge.<br>"
               return s}]
                   
                ],
                unlocked(){
                        return hasUpgrade('M',33)||player.M.points.gte(1)
                },
        },
        "Energy": {
            content: [
                ["row",[ ["clickable",251], ["clickable",252], ["clickable",253]]],
                ["display-text",function(){
                    let s=""
                    if(hasUpgrade('M',63)) s+="Your have "+format(player.M.Energy)+" energy.<br>"
                   return s}]
               
            ],
            unlocked(){
                    return hasUpgrade('M',63)
            },
    },
        "time": {
            content: [
                ["row",[ ["clickable",221], ["clickable",222], ["clickable",223]]],
      
               
            ],
            unlocked(){
                    return hasMilestone('M',1)
            },
    },
    

    
              
        },
        "B": {
            "Knowledge Upgrade": {
                    content: [
                     
                        ["row",[ ["upgrade",11], ["upgrade",12], ["upgrade",13], ["upgrade",14]]],
                        ["row",[ ["upgrade",21], ["upgrade",22], ["upgrade",23], ["upgrade",24]]],
                        ["row",[ ["upgrade",31], ["upgrade",32], ["upgrade",33], ["upgrade",34]]],
                        ["row",[ ["upgrade",41], ["upgrade",42], ["upgrade",43], ["upgrade",44]]]
              
                    ],
                    unlocked(){
                            return true
                    },
            },
            "Power Upgrade": {
                content: [
                 
                    ["row",[ ["upgrade",51], ["upgrade",52], ["upgrade",53], ["upgrade",54]]],
                    ["row",[ ["upgrade",61], ["upgrade",62], ["upgrade",63], ["upgrade",64]]],
                    ["row",[ ["upgrade",71], ["upgrade",72], ["upgrade",73], ["upgrade",74]]],
                    ["row",[ ["upgrade",81], ["upgrade",82], ["upgrade",83], ["upgrade",84]]]
          
                ],
                unlocked(){
                        return hasUpgrade('M',44)
                },
        },
        }
    },
})
