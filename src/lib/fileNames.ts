const xMen = ['cyclops', 'jeanGrey', 'storm', 'wolverine', 'beast', 'rogue', 'gambit', 'nightcrawler', 'colossus', 'kittyPryde', 'iceman', 'professorX', 'magneto', 'mystique', 'apocalypse']
const finalFantasySummons = ['bahamut', 'ifrit', 'shiva', 'ramuh', 'leviathan', 'odin', 'alexander', 'phoenix', 'titan', 'carbuncle', 'anima', 'famfrit', 'siren', 'diabolos', 'garuda']
const magicTheGatheringCards = [
  'ancestralRecall',
  'blackLotus',
  'counterspell',
  'darkRitual',
  'demonicTutor',
  'lightningBolt',
  'moxEmerald',
  'moxJet',
  'moxPearl',
  'moxRuby',
  'moxSapphire',
  'seizures',
  'timetwister',
  'timeWalk',
  'wrathOfGod',
]
const marvelCharacters = [
  'antMan',
  'blackPanther',
  'blackWidow',
  'captainAmerica',
  'captainMarvel',
  'doctorStrange',
  'falcon',
  'hawkeye',
  'hulk',
  'ironMan',
  'scarletWitch',
  'spiderMan',
  'thor',
  'vision',
  'wasp',
]
const finalFantasyXivLocations = [
  'azysLla',
  'coerthas',
  'crystarium',
  'eulmore',
  'gridania',
  'ishgard',
  'kugane',
  'limsaLominsa',
  'oldSharlayan',
  'radzAtHan',
  'solutionNine',
  'theDravanianForelands',
  'theFirmament',
  'theLavenderBeds',
  'ulDah',
]
const teenageMutantNinjaTurtles = [
  'aprilONeil',
  'baxterStockman',
  'bebop',
  'caseyJones',
  'donatello',
  'karai',
  'krang',
  'leatherHead',
  'leonardo',
  'michelangelo',
  'raphael',
  'ratKing',
  'rocksteady',
  'shredder',
  'splinter',
]
const famousVideoGames = [
  'asteroids',
  'donkeyKong',
  'elderScrolls',
  'fallout',
  'finalFantasy',
  'halo',
  'legendOfZelda',
  'minecraft',
  'pacMan',
  'pokemon',
  'pong',
  'spaceInvaders',
  'streetFighter',
  'superMarioBros',
  'tetris',
]

const nameLists = [xMen, finalFantasySummons, magicTheGatheringCards, marvelCharacters, finalFantasyXivLocations, teenageMutantNinjaTurtles, famousVideoGames]
const selectedNameList = nameLists[Math.floor(Math.random() * nameLists.length)]
const fileNames = [...selectedNameList.map(name => `${name}.ts`), 'activeFile.ts', 'selectedFile.tsx'].sort()

export default fileNames
