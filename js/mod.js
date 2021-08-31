let modInfo = {
	name: "The reverse Tree",
	id: "reverse",
	author: "3^3=7",
	pointsName: "points",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.0.1",
	name: "Reverse machine",
}

let changelog = `<h1>Changelog:</h1><br>
<h3>v0.0.1</h3><br>
- Added machine power.<br>
- Added 6 clickable.<br>
- Added 1 upgrade.<br>
- Endgame: 5000 points and buy "unlock a layer" once.`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
if(player.ma.machineamount.gte(1))	gain = gain.times(tmp.ma.machine1eff)
if(player.ma.machineamount.gte(2))	gain = gain.times(tmp.ma.machine2eff)
if(hasUpgrade('ma',11))	gain = gain.times(new Decimal(2).pow(player.ma.upgrades.length))
if(hasUpgrade('ma',12))	gain = gain.times(upgradeEffect('ma',12))
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("5000"))&&player.ma.layeramount.gte(2)
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}