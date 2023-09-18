/*
  01

  - Crie um objeto de request;
  - Abra este website https://pokeapi.co/;
  - Baseado no exemplo de endpoint exibido no website, abra uma requisição do 
    tipo GET para obter dados do pokémon 'pikachu';
  - Envie a requisição e trackeie ela usando o listener de evento adequado;
  - Verifique se o estado da requisição representa que a operação foi completada
    e se o status http do request indica que a requisição foi bem sucedida;
  - Se as condições do item acima forem atendidas, exiba no console o texto da 
    resposta que a requisição obteve;
  - Se apenas a 1ª condição for atendida (o estado da requisição representa que 
    a operação foi completada), exiba no console a mensagem 'Não foi possível 
    obter os dados do pokémon';
  - Teste também a verificação do item acima.
*/

const request = new XMLHttpRequest()

// request.addEventListener('readystatechange', () => {
//   if (request.readyState === 4) {
//     console.log('Não foi possível obter os dados do pokémon')

//     if (request.status === 200) {
//       console.log(request.responseText)
//     }
//     return
//   }
// })

request.open('GET', 'https://pokeapi.co/api/v2/pokemon/pikachu')
request.send()

/*
  02

  - Crie um objeto que contém suas informações pessoais;
  - As propriedades devem armazenar: 
    - Seu nome;
    - Seu sobrenome;
    - Seu sexo;
    - Sua idade (number);
    - Sua altura (number);
    - Seu peso (number);
    - Se você está andando (boolean iniciado em false);
    - Quantos metros você caminhou (number iniciado em 0).
*/

const personalInfo = {
  name: 'Joao',
  lastName: 'Nascimento',
  sex: 'M',
  age: 22,
  height: 1.75,
  weight: 75,
  isWalking: false,
  walkingDistance: 0
}

/*
  03

  - Logo abaixo, adicione ao objeto um método que adiciona 1 ao valor da 
    propriedade que armazena a idade;
  - A cada vez que o método é invocado, 1 deve ser somado à idade atual;
  - Após criar o método, adicione 5 anos à idade do objeto.
*/

personalInfo.addAge = () => {
  personalInfo.age ++
}
// console.log(personalInfo)

personalInfo.addAge()
personalInfo.addAge()
personalInfo.addAge()
personalInfo.addAge()
personalInfo.addAge()

// console.log(personalInfo)

/*
  04

  - Logo abaixo, adicione ao objeto um método que soma a quantidade de metros 
    caminhados ao valor que foi recebido como parâmetro do método;
  - Este método também deve modificar o boolean do objeto que indica se a 
    pessoa representada pelo objeto está, ou não, andando;
  - Após criar o método, faça a pessoa caminhar alguns metros, invocando o 
    método 4x, com diferentes metragens passadas por parâmetro.
*/

personalInfo.addWalkingDistance = walkingDistance => {
  personalInfo.isWalking = true
  personalInfo.walkingDistance += walkingDistance
}

personalInfo.addWalkingDistance(400)
personalInfo.addWalkingDistance(100)
personalInfo.addWalkingDistance(200)
personalInfo.addWalkingDistance(300)

// console.log(personalInfo)
/*
  05

  - Logo abaixo, adicione ao objeto um método que retorna a seguinte string:
  
  'Oi. Eu sou o NOME_COMPLETO, tenho IDADE anos, ALTURA metros de altura, 
  peso PESO quilos e, só hoje, eu já caminhei QUANTIDADE_DE_METROS_CAMINHADOS 
  metros.'
  
  - Antes de retornar a string, faça as seguintes validações:
    - Se o sexo do objeto for "Feminino", antes do nome da pessoa, substitua "o"
      por "a";
    - Se a idade for 1, substitua "anos" por "ano", no singular;
    - Se a quantidade de metros caminhados for 1, substitua "metros" por 
      "metro", no singular.
*/

const getPlural = (verification, singular, plural) => verification === 1 ? singular : plural
const getPronoun = (sex) => sex === 'M' ? 'o' : 'a'

personalInfo.greetingMessage = () => {
  let { name, lastName, age, height, weight, walkingDistance, sex } = personalInfo
  const fullName = `${name} ${lastName}`
  const pronoun = getPronoun(sex)
  const isAgeSingular = getPlural(age, 'ano', 'anos')
  const isWalkingDistanceSingular = getPlural(walkingDistance, 'metro', 'metros')

  const greetMessage = 
  `Oi. Eu sou ${pronoun} ${fullName}, tenho ${age} ${isAgeSingular}, ${height} metros de altura, peso ${weight} quilos e, só hoje, eu já caminhei ${walkingDistance} ${isWalkingDistanceSingular}.`

  return greetMessage
}


// personalInfo.age = 1
// personalInfo.sex = 'F'
// personalInfo.walkingDistance = 1
console.log(personalInfo.greetingMessage())

/*
  06

  - Crie uma função que recebe um valor como argumento e retorna um boolean 
    indicando se o valor é truthy ou falsy;
  - Invoque a função e, a cada invocação, passe como argumento um valor falsy.
    - Faça isso até passar todos os valores falsy;
  - Invoque a função e, desta vez, a cada invocação, passe como argumento um 
    valor truthy;
    - Faça isso até que 7 valores truthy sejam passados.
*/

const isTruthyOrFalsy = value => {
  const falsyValues = [null, undefined, false, NaN, 0]
  return falsyValues.includes(value) ? 'falsy' : 'truthy'
}

console.log(isTruthyOrFalsy(null))
console.log(isTruthyOrFalsy(undefined))
console.log(isTruthyOrFalsy(false))
console.log(isTruthyOrFalsy(NaN))
console.log(isTruthyOrFalsy(0))
console.log(isTruthyOrFalsy(true))
console.log(isTruthyOrFalsy('oi'))
console.log(isTruthyOrFalsy(23))
console.log(isTruthyOrFalsy(2.3))
console.log(isTruthyOrFalsy([]))
console.log(isTruthyOrFalsy({}))
console.log(isTruthyOrFalsy(getPronoun('F')))


/*
  07

  - Crie uma função que recebe um parâmetro, que será o nome de um livro;
  - Essa função deve conter um objeto com 3 propriedades, que são nomes de 
    livros;
  - Cada uma dessas 3 propriedades deve armazenar um novo objeto que terá 
    outras 3 propriedades que armazenam:
      - A quantidade de páginas (number);
      - Autor;
      - Editora.
  - Faça a função retornar o objeto que representa o livro passado por 
    parâmetro;
  - Se o parâmetro não for passado, faça a função retornar o objeto com todos 
    os livros.

  Dica: propriedades de objetos podem ser declaradas como strings.
*/

const displayBook = bookName => {
  const books = {
    'Povo Brasileiro': {
      pages: 219,
      author: 'Darcy Ribeiro',
      publisher: 'Editora 1'
    },
    'Dom Casmurro': {
      pages: 315,
      author: 'Machado de Assis',
      publisher: 'Editora 2'
    },
    'Clara dos Anjos': {
      pages: 127,
      author: 'Lima Barreto',
      publisher: 'Editora 3'
    }

  }
  
  if (books[bookName] === undefined) {
      return books
  }
    
  return books[bookName]
}

console.log(displayBook('Clara dos Anjos'))
