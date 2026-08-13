const xMen = ['cyclops', 'jeanGrey', 'storm', 'wolverine', 'beast', 'rogue', 'gambit', 'nightcrawler', 'colossus', 'kittyPryde', 'iceman', 'professorX']

const fileNames = [...xMen.map(name => `${name}.ts`), 'activeFile.ts', 'selectedFile.tsx'].sort()

export default fileNames
