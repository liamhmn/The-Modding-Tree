let modInfo = {
	name: "The Magic Tree",
	id: "magic",
	author: "3^AB=7",
	pointsName: "MP",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.0.3",
	name: "Magic C",
}

let changelog = `<h1>Changelog:</h1><br>
<h3>v0.0.3</h3><br>
- Added 2 M clickable.<br>
- Added 5 M upgrades.<br>
- Endgame: 6969 MP.<br>
<h3>v0.0.2</h3><br>
- Added 1 M clickable.<br>
- Added 4 M upgrades.<br>
- Endgame: 1500 MP and 52 knowledge.<br>
<h3>v0.0.1</h3><br>
- Add Magic.<br>
- Added 3 Magic clickable.<br>
- Endgame: 160 MP.`

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

	let gain = new Decimal(3)
	gain = gain.add(player.M.Boost)
	if(hasUpgrade('M',13))gain = gain.times(1.5)
	if(hasUpgrade('M',14)) gain= gain.times(player.M.knowledge.pow(0.2).add(1))
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}


var displayThings = [
	function() {
	if(hasUpgrade('M',31))return "MP hardcap is "+format(player.M.cap.add(player.M.realeffect3).add(player.M.knowledge.pow(1.25)))+" because of the god of Magic."
    else if(hasUpgrade('M',22)) return "MP hardcap is "+format(player.M.cap.add(player.M.realeffect3).add(player.M.knowledge))+" because of the god of Magic."
	else if(!hasUpgrade('M',22)&&player.M.cap.add(player.M.realeffect3).gte(1500)) return "MP hardcap is 1500 because of the god of Magic."
	else return "MP hardcap is "+format(player.M.cap.add(player.M.realeffect3))+" because of the god of Magic."
	}
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("6969"))
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