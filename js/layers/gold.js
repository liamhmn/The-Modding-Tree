addLayer("g", {
    name: "gold", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "G", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 6, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
        total: new Decimal(0),
    }},
    color: "#FFE333",
    requires: new Decimal(20), // Can be a function that takes requirement increases into account
    resource: "gold", // Name of prestige currency
    baseResource: "levels", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 3, // Prestige currency exponent
    softcap: new Decimal("1e10000"),
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1);
        mult = mult.times((hasUpgrade("g", 11)) ? upgradeEffect("g", 11) : new Decimal(1));
        mult = mult.times((hasUpgrade("g", 13)) ? upgradeEffect("g", 13) : new Decimal(1));
        mult = mult.times((hasUpgrade("xp", 32)) ? upgradeEffect("xp", 32) : new Decimal(1));
        mult = mult.times((hasUpgrade("g", 21)) ? upgradeEffect("g", 21) : new Decimal(1));
        mult = mult.times((hasUpgrade("g", 22)) ? upgradeEffect("g", 22) : new Decimal(1));
        mult = mult.times((hasUpgrade("g", 25)) ? upgradeEffect("g", 25) : new Decimal(1));
            

        mult = mult.pow((hasUpgrade("l", 13)) ? upgradeEffect("l", 13) : new Decimal(1));
        mult = mult.pow((hasUpgrade("l", 15)) ? upgradeEffect("l", 15) : new Decimal(1));

        mult = mult.pow((hasUpgrade("l", 23)) ? upgradeEffect("l", 23) : new Decimal(1));
        
        mult = mult.times((hasUpgrade("g", 31)) ? upgradeEffect("g", 31) : new Decimal(1));
        mult = mult.times((hasUpgrade("g", 32)) ? upgradeEffect("g", 32) : new Decimal(1));
        mult = mult.times((hasUpgrade("g", 35)) ? upgradeEffect("g", 35) : new Decimal(1));


        let rubyEff = player.r.points.add(1).log2().add(1).pow(5);
        if (hasUpgrade("r", 13)) {
            rubyEff = rubyEff.times(Decimal.max(Decimal.times(player.r.best, player.r.best), new Decimal(1)));
        }
        if (hasMilestone("r", 3)) {
            rubyEff = rubyEff.pow(2);
        }
        rubyEff = rubyEff.pow(layers.q.challenges[13].rewardEffect());
        
        mult = mult.times(rubyEff); 

        
        mult = mult.times((hasUpgrade("r", 11)) ? upgradeEffect("r", 11) : new Decimal(1));
        mult = mult.times((hasUpgrade("r", 12)) ? upgradeEffect("r", 12) : new Decimal(1));

        mult = mult.times((hasUpgrade("xp", 45)) ? new Decimal(1000) : new Decimal(1));
        mult = mult.times((hasUpgrade("xp", 54)) ? upgradeEffect("xp", 54) : new Decimal(1));

        mult = mult.times((hasUpgrade("l", 41)) ? upgradeEffect("l", 41) : new Decimal(1));



        
        if (inChallenge("q", 11)) mult = mult = mult.pow(challengeVar("q", 11));
        else {
            mult = mult.pow(layers.q.challenges[11].rewardEffect());
        }
        if (inChallenge("q", 12)) mult = mult = mult.tetrate(challengeVar("q", 12));

        
        if (inChallenge("q", 15)) {
            mult = mult.plus(1).log(challengeVar("q", 15));
            if (isNaN(mult)) mult = new Decimal(1);
        }

        if (inChallenge("q", 14)) mult = mult.times(new Decimal("1e-9999999999").pow(new Decimal("1e9999999999")));



        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let expon = buyableEffect("l", 12);
        return expon
    },
    upgrades: {
        rows: 5,
        cols: 5,
        11: {
            title: "Moneys give levels give moneys",
            description: "Gold and Level gain is multiplied by 10",
            cost: new Decimal(1),
            unlocked() { return player[this.layer].unlocked },
            effect() { 
                let eff = new Decimal(10);
                return eff;
            },
            effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
        },
        12: {
            title: "Gold -> Exp",
            description: "Total gold boosts exp gain",
            cost: new Decimal(100),
            unlocked() { return (hasUpgrade(this.layer, 11)) },
            effect() { 
                let eff = player[this.layer].total.div(10).pow(0.2);
                if (hasUpgrade(this.layer, 14)) eff = eff.pow(upgradeEffect("g", 14));
                if (eff.gte(new Decimal("1e125"))) {
                    eff = eff.div(new Decimal("1e125")).pow(0.05).times(new Decimal("1e125"));
                    //softcap
                }
                return eff;
            },
            effectDisplay() { 
                return format(this.effect())+"x " + ((this.effect().gte(new Decimal("1e125"))) ? " (softcapped) " : ""); 
            }, // Add formatting to the effect
        },
        13: {
            title: "You still need XP",
            description: "Gold gain is multiplied by log10(xp + 10)",
            cost: new Decimal(250),
            unlocked() { return (hasUpgrade(this.layer, 12)) },
            effect() { 
                let eff = player.xp.points.plus(10).log10();
                return eff;
            },
            effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
        },
        14: {
            title: "More XP from gold",
            cost: new Decimal(1000),
            softcap() { return new Decimal(10) },
            unlocked() { return (hasUpgrade(this.layer, 13)) },
            effect() { 
                let teff = player.g.points.plus(10).log10().pow(0.7);
                if (teff.gte(this.softcap())) {
                    eff = teff.sub(this.softcap()).div(100).plus(this.softcap());
                }
                else {
                    eff = teff;
                }
                return eff;
            },
            description() {
                return (this.effect().gte(this.softcap()) ? "Upgrade 1,2 effect is powered based on gold" : "Upgrade 1,2 effect is powered to log10(gold + 10)^0.7");
            },
            effectDisplay() { 
                return "^"+format(this.effect()) + (this.effect().gte(this.softcap()) ? " (softcapped)" : "");
            }, 
        },
        15: {
            title: "You can't buy this once",
            description: "Unlocks first buyable upgrade and a new row of xp upgrades",
            cost: new Decimal(28),
            currencyDisplayName: "levels",
            currencyInternalName: "points",
            currencyLayer: "",
            unlocked() { return (hasUpgrade(this.layer, 14)) },
        },
        21: {
            title: "Stronk Buff",
            description: "Multiplies XP, gold and lv gain by value of your level + 1",
            cost: new Decimal(100000),
            unlocked() { return ((hasUpgrade("xp", 35) && hasUpgrade("g", 15)) || inChallenge("q", 13)) },
            effect() { 
                let eff = player.points.plus(1);
                return eff;
            },
            effectDisplay() { return format(this.effect()) + "x" }, // Add formatting to the effect
        },
        22: {
            title: "Even More Gold",
            description: "Multiplies Gold by log10(xp + 10)",
            cost: new Decimal(1e7),
            unlocked() { return (hasUpgrade("g", 21)) },
            effect() { 
                let eff = player.xp.points.plus(10).log10();
                return eff;
            },
            effectDisplay() { return format(this.effect()) + "x" }, // Add formatting to the effect
        },
        23: {
            title: "Slow road to 100",
            description: "Increases a bit level gain until lvl 100",
            cost: new Decimal(2.5e8),
            unlocked() { return (hasUpgrade("g", 22)) },
            effect() { 
                let maxLv = new Decimal(101);
                let eff = Decimal.max(new Decimal(1), maxLv.sub(player.points))
                eff = eff.pow(1.75);
                return eff;
            },
            effectDisplay() { return format(this.effect()) + "x" }, // Add formatting to the effect
        },
        24: {
            title: "Better passives",
            description: "Passive upgrades effects are multiplied by log10(lv + 10)",
            cost: new Decimal(1e9),
            unlocked() { return (hasUpgrade("g", 23)) },
            effect() { 
                let eff = player.points.plus(10).log10();
                return eff;
            },
            effectDisplay() { return format(this.effect()) + "x" }, // Add formatting to the effect
        },
        25: {
            title: "What is it?",
            description: "Unlocks new layer and multiplies gold gain by π",
            cost: new Decimal(3e9),
            unlocked() { return (hasUpgrade("g", 24)) },
            effect() { 
                let eff = new Decimal(3.1415926535);
                return eff;
            },
            effectDisplay() { return format(this.effect()) + "x" }, // Add formatting to the effect
        },
        31: {
            title: "Gold was pretty slow",
            description: "Multiplies gold gain by log10(max loot + 100)/2",
            cost: new Decimal(1e16),
            unlocked() { return (hasUpgrade("l", 35) && hasUpgrade("g", 25)) },
            effect() { 
                let eff = player.l.best.plus(100).log10().div(2);
                return eff;
            },
            effectDisplay() { return format(this.effect()) + "x" }, // Add formatting to the effect
        },
        32: {
            title: "More Gold!",
            description: "Multiplies gold gain 10",
            cost: new Decimal(3e16),
            unlocked() { return (hasUpgrade("g", 31)) },
            effect() { 
                let eff = new Decimal(10);
                return eff;
            },
        },
        33: {
            title: "Loot MegaBoost!",
            description: "Loot Base Exponent 1/4 -> 1/5",
            cost: new Decimal(1e18),
            unlocked() { return (hasUpgrade("g", 32)) },
        },
        34: {
            title: "Risky but Effective",
            description: "All passive upgrade effects are cubed",
            cost: new Decimal(1e19),
            unlocked() { return (hasUpgrade("g", 33)) },
        },
        35: {
            title: "It will be cool in future",
            description: "Gold gain multiplied by max(1, (lvl^2)/10000). Also unlocks new layer.",
            cost: new Decimal(1e20),
            unlocked() { return (hasUpgrade("g", 34)) },
            effect() { 
                let eff = Decimal.max(new Decimal(1), player.points.times(player.points).div(new Decimal(10000)));
                return eff;
            },
            effectDisplay() { return format(this.effect()) + "x" }, // Add formatting to the effect
        },
    },

    buyables: {
        rows: 1,
        cols: 1,
        showRespec: false,
        11: {
            title: "Passive XP", // Optional, displayed at the top in a larger font
            cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                let cost = Decimal.pow(new Decimal(2), x.pow(1.2));
                cost = cost.times(1000);
                return cost.floor()
            },
            effect(x=player[this.layer].buyables[this.id]) { // Effects of owning x of the items, x is a decimal
                let eff = x.times(0.01);
                eff = eff.times(hasUpgrade('g', 24) ? upgradeEffect("g", 24) : new Decimal(1));
                eff = eff.pow(hasUpgrade('g', 34) ? new Decimal(3) : new Decimal(1));
                if (hasMilestone("r", 1)) eff = eff.times(1.5);
                return eff;
            },
            display() { // Everything else displayed in the buyable button after the title
                let data = tmp[this.layer].buyables[this.id]
                return "Cost: " + format(data.cost) + " gold\n\
                Amount: " + player[this.layer].buyables[this.id] + "\n\
                Generate " + (data.effect.lte(10) ? format(data.effect.times(100)) + "%" : "x" + format(data.effect)) + " XP per second";
            },
            unlocked() { return (hasUpgrade(this.layer, 15)) }, 
            canAfford() {
                return player[this.layer].points.gte(tmp[this.layer].buyables[this.id].cost)},
            buy() { 
                cost = tmp[this.layer].buyables[this.id].cost
                if (!hasMilestone("r", 1)) {
                    player[this.layer].points = player[this.layer].points.sub(cost)	
                }
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                player[this.layer].spentOnBuyables = player[this.layer].spentOnBuyables.add(cost) // This is a built-in system that you can use for respeccing but it only works with a single Decimal value
            },
        },
    },

    update(diff) {
        generatePoints("g", diff * (buyableEffect("xp", 11) + (hasMilestone("r", 0) ? 1 : 0)));
        if (hasMilestone("r", 1)) {
            let ticks = 1;
            if (hasMilestone("q", 5)) ticks = 20;
            for (var p = 0 ; p < ticks ; ++p) {
                if (layers.g.buyables[11].unlocked() && layers.g.buyables[11].canAfford()) {
                    layers.g.buyables[11].buy();
                }
                if (layers.xp.buyables[11].unlocked() && layers.xp.buyables[11].canAfford()) {
                    layers.xp.buyables[11].buy();
                }
            }
        }
    },

    automate() {
        if (player["q"].autoBuyGold) {
            for (let x = 10; x <= 30; x += 10){ 
                for (let y = 1; y <= 5; y++) {
                    var z = x + y
                    if (!hasUpgrade("g", z) && canAffordUpgrade("g", z) && hasMilestone("q", 2) && layers["g"].upgrades[z].unlocked()===true) {
                        buyUpg("g", z);
                    }
                }
            }
        }
    },

    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
    ],
    layerShown(){return (hasUpgrade("xp", 25) || hasMilestone("r", 0))},
})
