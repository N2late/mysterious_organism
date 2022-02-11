// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};
// object factory of mysterious organism
const pAequorFactory = (num, newStrand) => {
  return {
    specimenNum: num,
    dna: newStrand, 
    mutate() {
      let randomIndex = Math.floor(Math.random() * 15)
      let newBase = '';
      do {
        newBase = returnRandBase()
      }
      while (newBase === this.dna[randomIndex])

      this.dna.splice(randomIndex, 1, newBase)
      return this.dna
    },
    compareDNA(obj) {
      let countSameDNA = 0;
      for (let i = 0; i < 15; i++) {
        if (this.dna[i] === obj.dna[i]) {
          countSameDNA++
          console.log(countSameDNA)
          }
      }
      let percenInCommon = Math.floor(countSameDNA * 100 / 15)
      return `${this.specimenNum} and ${obj.specimenNum} have ${percenInCommon}% DNA in common.` 
    },
    willLikelySurvive() {
      let countC = 0;
      let countG = 0;
      for (let i = 0; i < 15; i++) {
        if (this.dna[i] === 'C') {
          countC++
        } else if(this.dna[i] === 'G') {
          countG++
        }
      }
      if (countC * 100 / 15 >= 40 || countG * 100 / 15 >= 40){
        return true;
      } else {
        return false;
      }
    },
    complementStrand() {
      let complStrand = [];
      for(let i = 0; i < 15; i++) {
        switch (this.dna[i]) {
          case 'A':
            complStrand.push('T');
            break;
          case 'T':
            complStrand.push('A');
            break;
          case 'C': 
            complStrand.push('G');
            break;
          case 'G': 
            complStrand.push('C');
            break;
          default:
            return console.log('Something is wrong with the original ADN');
        }
      }
      return complStrand;
    }
  }
}

// creates a number of instances that are more likely to survive
const creatSpecimen = (n) => {
  let arrpAequor = [];
  let newpAequor = {};
  for (let i = 0; i < n; i++) {
    do{
      let dna = mockUpStrand();
      newpAequor = pAequorFactory(i, dna);
    }
    while (newpAequor.willLikelySurvive() == false)
    //console.log(newpAequor)
    arrpAequor.push(newpAequor);
  }
  return arrpAequor;
}
