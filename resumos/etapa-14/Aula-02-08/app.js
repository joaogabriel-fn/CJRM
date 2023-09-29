class Mammal {
  constructor (species, name, age) {
    this.species = species
    this.name = name
    this.age = age
    this.mammaryGland = true
  }

  incrementAge () {
    this.age++
  }
}

class Lion extends Mammal {
  constructor (species, name, age, manEater) {
    super(species, name, age)
    this.manEater = manEater
  }

  eatZebras (animals) {
    return animals.filter(animal => animal.species !== 'zebra')
  }
}

const zeca = new Mammal('zebra', 'Zeca', 6)
const pompeu = new Mammal('gnu', 'Pompeu', 5)
const angus = new Mammal('cavalo', 'Angus', 3)
const mufasa = new Lion('leão', 'Mufasa', 7, false)

const animals = [zeca, pompeu, angus]

mufasa.incrementAge()
console.log(mufasa.eatZebras(animals), mufasa)
