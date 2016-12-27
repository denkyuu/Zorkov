function vectorAdd (coordinate, vector) {
  var x = coordinate[0] + vector[0]
  var y = coordinate[1] + vector[1]
  return [x , y]
}

function randomDirection() {
  var direction = Math.floor(Math.random() * 4) + 1
  switch (direction) {
    case 1:
      return [0 , 1] // N
    case 2:
      return [1 , 0] // E
    case 3:
      return [0 , -1] // S
    case 4:
      return [-1 , 0] // W
  }
}

function setCell (coordinate, value) {
  var x = coordinate[0]
  var y = coordinate[1]
  map[x][y] = value
}

function isOutOfBounds (coordinate, range) {
  if (coordinate[0] < 0 || coordinate[0] > range || coordinate[1] < 0 || coordinate[1] > range) {
    return true
  }
}

function generateRoom (coordinate) {
  // creates a new room object and exits
  setCell(coordinate, 1)
}

function generateExits (coordinate, chance) {
  // rolls the possibility of connecting to a previous room (i.e. loop)
  // creates exits if sucessful
  overlaps++
  console.log('Hit edge, generateExits called')
}

function isRoom(coordinate, map) {
  var x = coordinate[0]
  var y = coordinate[1]
  return map[x][y]
}

function renderMap (map) {
  for (var i in map) {
    console.log(map[i].join(" "))
  }
}


function generateEmptyMap (size) {
  var map = []
  for (var i = 0; i < size; i++) {
    map.push([])
    for (var j = 0; j < size; j++) {
      map[i].push(0)
    }
  }
  return map
}


// SETTINGS ####################

var mapSize = 30
var enoughRooms = 100
var startingCoordinate = [15 , 15]

// Generate empty map

var map = generateEmptyMap(mapSize)

// Map Loop ##########################

var numberOfRooms = 0
var overlaps = 0
var wallBumps = 0
var currentCoordinate = startingCoordinate

generateRoom(startingCoordinate)

while (numberOfRooms < enoughRooms) {
  var direction = randomDirection()
  var nextCoordinate = vectorAdd(currentCoordinate, direction)
  if (isOutOfBounds(nextCoordinate)) {
    console.log('tried to go out of bounds')
    wallBumps++
  } else if (isRoom(nextCoordinate, map) == 0) {
    setCell(nextCoordinate, 1)
    numberOfRooms++
    currentCoordinate = nextCoordinate
  } else {
    generateExits(nextCoordinate, .1)
    currentCoordinate = nextCoordinate
    console.log('overlapping rooms')
  }
}

renderMap(map)
console.log("Rooms: " + numberOfRooms)
console.log("Overlapping Paths: " + overlaps)
console.log("Walls Hit: " + wallBumps)
