addLayer("I", {
    name: "Infinity", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "I", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#606060",
    requires: new Decimal("1.8e308"), // Can be a function that takes requirement increases into account
    resource(){return "Infinity"
    }, 
    baseResource: "Numbers", // Name of resource prestige is based on
    baseAmount() {return player.N.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    base(){ 
        if(inChallenge('E',31))return new Decimal("eeeeeeeeee10")
       else return new Decimal("1.8e308")},
    exponent: 1,
    branches:["F","UF"],
     // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        

        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "i", description: "I: Reset for Infinity", onPress(){if (canReset(this.layer)) doReset(this.layer)},
        onPress() { if (player.I.unlocked) doReset("I") },
        unlocked() {return hasMilestone('I', 1)} // Determines if you can use the hotkey, optional
    },
    ],
    milestones: {
        1: {
            requirementDescription: "1 Infinity",
            effectDescription() {
              if(player.X.points.gte(1))    return "Number gain ^1.05 and point gain x100, keep upgrade on factor reset."
              else  return "Number gain ^1.05 and point gain x100, keep upgrade on factor reset. Keep the seventeenth factor milestone on reset."},
            done() { return player.I.points.gte(1) }
        },
        2: {
            requirementDescription: "2 Infinity",
            effectDescription() {
                if(player.X.points.gte(1))    return "Number gain ^1.05, keep UF challenge, explore challenge, F milestone and UF milestone on reset. + base is 200."
                else  return "Number gain ^1.05, keep Factor milestone and upgrade factor milestone on reset."},

            done() { return player.I.points.gte(2) }
        },
        3: {
            requirementDescription: "3 Infinity",
            effectDescription() {
                if(player.X.points.gte(1))    return "keep Factor challenge on reset. Unlock challenge point and new challenges."
                else  return "keep Factor challenge on reset, and '9' to '16' on ALL reset."},
        
            done() { return player.I.points.gte(3) }
        },
        4: {
            requirementDescription: "4 Infinity",
            effectDescription() {
                if(player.X.points.gte(1))    return "keep Factor Upgrade, Negative number Upgrade and Negative number milestone on reset, challenge point boost point gain."
                else  return "keep Factor Upgrade, Negative number Upgrade and Negative number milestone on reset, Negative number x10."},
            done() { return player.I.points.gte(4) }
        },
        5: {
            requirementDescription: "5 Infinity",
            effectDescription() {
              if(player.X.points.gte(1))    return "Unlock more challenge and unlock a new layer."
              else  return "Unlock more challenge."},
            done() { return player.I.points.gte(5) }
        },
        6: {
            requirementDescription: "6 Infinity",
            effectDescription: "Unlock 1 Negative number Upgrade and Negative number is cheaper in IC.",
            done() { return player.I.points.gte(6) }
        },
        7: {
            requirementDescription: "7 Infinity",
            effectDescription: "Unlock 1 Negative number Upgrade and Negative number is cheaper again in IC.",
            done() { return player.I.points.gte(7) }
        },
        8: {
            requirementDescription: "8 Infinity",
            effectDescription: "You can buy max Infinity.",
            done() { return player.I.points.gte(8) }
        },
        28: {
            requirementDescription: "28 Infinity",
            effectDescription: "Remove the hardcap of 'Factor beta' but nerf it.",
            done() { return player.I.points.gte(28) }
        },
        69: {
            requirementDescription: "69 Infinity (NICE)",
            effectDescription: "Infinity boost Negative Numbers gain and auto buy factor and number buyable.",
            done() { return player.I.points.gte(69) }
        },
        90000: {
            requirementDescription: "90000 Infinity ",
            effectDescription: "Unlock 2 Infinity challenge.",
            done() { return player.I.points.gte(90000) }
        },
    },
    challenges: {
        11: {
            name: "IC1",
            challengeDescription: "Number gain ^0.3",
            canComplete(){return player.N.points.gte("1.8e308")},
            goalDescription: "1.80e308 Numbers",
            rewardDescription(){return "Number ^1.1."},
          unlocked(){return hasMilestone("NN", 4e21)},
        },
        12: {
            name: "IC2",
            challengeDescription: "Number buyable have no effect. ",
            canComplete(){return player.N.points.gte("1.8e308")},
            goalDescription: "1.80e308 Numbers",
            rewardDescription(){return "Number ^1.2."},
          unlocked(){return hasMilestone("I", 5)},
        },
        21: {
            name: "IC3",
            challengeDescription: "Number gain ^(1/6). ",
            canComplete(){return player.N.points.gte("1.8e308")},
            goalDescription: "1.80e308 Numbers",
            rewardDescription(){return "Number ^1.3."},
          unlocked(){return hasUpgrade("F", 32)},
        },
        22: {
            name: "IC Ω ",
            challengeDescription: "Number gain ^(1/30000). ",
            canComplete(){return player.N.points.gte("1.8e308")},
            goalDescription: "1.80e308 Numbers",
            rewardDescription(){return "Number ^1.6 but nerf factor beta."},
          unlocked(){return hasMilestone("MS", 40)},
        },
        
        31: {
            name: "IC5",
            challengeDescription: "Number gain ^0.09. ",
            canComplete(){return player.N.points.gte("1.8e308")},
            goalDescription: "1.80e308 Numbers",
            rewardDescription(){return "Number ^1.4."},
          unlocked(){return hasUpgrade("NN", 33)},
        },
        32: {
            name: "IC ω",
            challengeDescription: "Number gain ^(1/1900000). ",
            canComplete(){return player.N.points.gte("1.8e308")},
            goalDescription: "1.80e308 Numbers",
            rewardDescription(){return "Number ^1.7 but nerf factor beta."},
          unlocked(){return hasUpgrade("IP", 64)},
        },
        41: {
            name: "IC7",
            challengeDescription: "Number gain ^0.011. ",
            canComplete(){return player.N.points.gte("1.8e308")},
            goalDescription: "1.80e308 Numbers",
            rewardDescription(){return "Number ^1.5."},
          unlocked(){return hasAchievement("A", 46)},
        },
        42: {
            name: "IC ♾",
            challengeDescription: "Number gain ^0.001. ",
            canComplete(){return player.points.gte("1.8e308")},
            goalDescription: "1.80e308 Points",
            rewardDescription(){return "Unlock 1 Factor Upgrade."},
          unlocked(){return hasMilestone("MS", 1)},
          
        },

      
            51: {
                name: "Boost or nerf 1",
                challengeDescription: "Number ^0.9 but NN ^1.2",
                canComplete(){
                    if(hasUpgrade('UF',23)) return player.N.points.gte(1e1000)
                    else return player.N.points.gte("ee100")},
                goalDescription: "Do IP reset in this challenge to get more IP",
                rewardDescription(){ 
                    if(hasChallenge('I',51)) return "Number ^1.1"
                    else return "??????"
                },
              unlocked(){return hasUpgrade('IP',45)},
              onEnter(){player.N.points=new Decimal(0)
                player.F.points=new Decimal(0)
                player.UF.points=new Decimal(0)
                player.NN.points=new Decimal(0)}
            },
            52: {
                name: "Boost or nerf 2",
                challengeDescription: "Number ^0.75 but NN ^1.4",
                canComplete(){
                    if(hasUpgrade('UF',23)) return player.N.points.gte(1e1000)
                    else return player.N.points.gte("ee100")},
                goalDescription: "Do IP reset in this challenge to get more IP",
                rewardDescription(){ 
                    if(hasChallenge('I',52)) return "Number ^1.1"
                    else return "??????"
                },
                onEnter(){player.N.points=new Decimal(0)
                    player.F.points=new Decimal(0)
                    player.UF.points=new Decimal(0)
                    player.NN.points=new Decimal(0)},
              unlocked(){return hasUpgrade('IP',45)},
            },
    
            61: {
                name: "Boost or nerf 3",
                challengeDescription: "Number ^0.6 but NN ^1.8",
                canComplete(){
                    if(hasUpgrade('UF',23)) return player.N.points.gte(1e1000)
                    else return player.N.points.gte("ee100")},
                goalDescription: "Do IP reset in this challenge to get more IP",
                rewardDescription(){ 
                    if(hasChallenge('I',61)) return "Number ^1.1"
                    else return "??????"
                },
              unlocked(){return hasMilestone('I',90000)},
              onEnter(){player.N.points=new Decimal(0)
                player.F.points=new Decimal(0)
                player.UF.points=new Decimal(0)
                player.NN.points=new Decimal(0)},
            },
            62: {
                name: "Boost or nerf 4",
                challengeDescription: "Number ^0.1 but NN ^3.",
                canComplete(){
                    if(hasUpgrade('UF',23)) return player.N.points.gte(1e1000)
                    else return player.N.points.gte("ee100")},
                goalDescription: "Do IP reset in this challenge to get more IP",
                rewardDescription(){ 
                    if(hasChallenge('I',62)) return "Unlock 1 layer"
                    else return "??????"
                },
              unlocked(){return hasUpgrade('IP',65)},
         
              onEnter(){player.N.points=new Decimal(0)
                player.F.points=new Decimal(0)
                player.UF.points=new Decimal(0)
                player.NN.points=new Decimal(0)},
            },

           
    },
    autoPrestige(){
        return hasMilestone('E',1e31);
    },resetsNothing(){
        return hasMilestone('E',1e31) ;
    },
    tabFormat: {
        "Milestones":{
          content:[
        "main-display",
          "blank",
        ["prestige-button",function(){return ""}],
        "blank",
        "resource-display",
        "blank",
        "blank",
        "milestones",
          ]},
      
      "Normal Challenges":{
        unlocked(){return hasMilestone('NN',4e21)},
        content:[
          "main-display",
          "blank",
        ["prestige-button",function(){return ""}],
          "blank",
          "blank",
          ["row", [ ["challenge", 11], ["challenge", 12]]], ["row", [ ["challenge", 21], ["challenge", 22]]], ["row", [ ["challenge", 31], ["challenge", 32]]], ["row", [ ["challenge", 41],["challenge", 42]]]
       ],
      },
        
    
    "Boost or nerf":{
        unlocked(){return hasUpgrade('IP',45)},
        content:[
          "main-display",
          "blank",
        ["prestige-button",function(){return ""}],
          "blank",
          "blank",
          ["row", [ ["challenge", 51], ["challenge", 52]]],["row", [ ["challenge", 61], ["challenge", 62]]]
        ]
    },
      },
    canBuyMax(){
        return hasMilestone('I',8) 
      },
    layerShown(){return hasMilestone('UF',11)||hasMilestone('IP',1)||hasMilestone('FS',1)||hasMilestone('I',1)},
    doReset(resettingLayer) {
        let keep = [];
        if (hasMilestone("MS", 3) && resettingLayer=="MS") keep.push("milestones")
        if (resettingLayer=="E") keep.push("challenges")
        if (resettingLayer=="E") keep.push("milestones")
        if (resettingLayer=="O") keep.push("milestones")
        if (resettingLayer=="O") keep.push("challenges")
        if (hasMilestone("O", 4) &&resettingLayer=="E") keep.push("milestones")
        if (resettingLayer=="M") keep.push("challenges")
        if (layers[resettingLayer].row > this.row) layerDataReset(this.layer, keep)
 

     
  
    },
})
addLayer("Link", {
	startData() { return {unlocked: true}},
	color: "#ff8888",
	symbol: "L",
	row: "side",
	position: -1,
	layerShown() { return true },
	tooltip: "Link",
    tabFormat: [
		"blank", "blank", "blank",
        ["raw-html", "<h1><a href=https://docs.google.com/document/d/1oT5siVj4lT8nnmHjPmAiSQL1NVSmNXQT8bpgUUqjBkM/edit target=_blank>Hardcap table</a></h1><br><h1><a href=https://docs.google.com/document/d/1Re0J_14Ivl_ON4CyqXWk-6nwZnxFfzoG3rxbQqe4Tgg/edit target=_blank>Save bank</a></h1><br><h1><a href=https://docs.google.com/document/d/1IR_xE_WCKgdGjd0J7FDXwhbaxMg79OyvEkslYGkCK74/edit target=_blank>Guide</a></h1>"],
	],
})