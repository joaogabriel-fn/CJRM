# **CJRM** | Etapa 02 - Controle de Fluxo

## For e While loops

São utilizados para repetir um bloco de código até que a condição seja exigida. Para realizar a repetição, utilizamos uma variável normalmente referenciada como i.

* For Loop

Para o for loop, todos os itens necessários são referenciados em sua sintaxe, que é a seguinte:

for (declaração da variável; condição do loop; incremento da variável) {}
Ex:

```js
for (let i = 0; i < 5; i++) {
}
```

* While Loop

Já o while loop possui algumas diferenças na sua sintaxe, como por exemplo necessitar da variável i ser declarada fora do loop, além de seu incremento precisar estar dentro do loop.
Sua sintaxe é a seguinte:

```js
let i = 0

while (i < 5) {
    i++
}
```

* Os loops podem ser utilizados para iterar arrays, como é possível visualizar abaixo:

```js
const brazilianCities = ['Sao Paulo', 'Rio de Janeiro', 'Curitiba']

for (let i = 0; i < brazilianCities.length; i++) {
    console.log(brazilianCities[i])
}
```

* A condição de execução do loop será o tamanho do array
* A variável i será utilizada para referenciar o índice do array, como por exemplo em brazilianCities[i]

## If, Else e Else if statements

* ### If

O If statement é utilizado para verificar se uma expressão retornará true ou false, caso seja true, o bloco de código será executado, caso seja false, o js irá ignorar o bloco.

Sua sintaxe é dada por:

```js
let isUserLoggedIn = true

if (isUserLoggedIn) {
    console.log('Yes')
}
```

* ### Else

O Else statement funciona como a expressão "Se não", ou seja, se o If statement resultar em True, o bloco do If será executado, *se não*, o bloco do Else será executado.
O Else deve ser declarado imediatamente após o fechamento de chaves do If, e o js nunca irá executar o bloco do If e o bloco do Else, sempre um dos 2.

Ex:

```js
let isUserLoggedIn = false

if (isUserLoggedIn) {
    console.log('Yes')
} else {
    console.log('No')
}
```

* ### Else If

O Else If statement é utilizado para uma segunda verificação, ou seja, se o bloco If for false, a execução do else if será como a execução de um novo If.

```js
const brazilianCities = ['Sao Paulo', 'Rio de Janeiro', 'Curitiba']

if (brazilianCities.includes('Maringá')) {
    console.log('Maringá está no array brazilianCities')
} else if (brazilianCities.includes('Curitiba')) {
    console.log('Curitiba está no array brazilianCities')
} else {
    console.log('Nem curitiba, nem maringá estão no array brazilianCities')
}
```

* ### Operadores lógicos E (&&), OU (||) e NOT (!)

Dentro do If statement, podemos utilizar o operador *&&* para adicionar mais uma condição para validação

```js
const brazilianCities = ['Sao Paulo', 'Rio de Janeiro', 'Curitiba']

if (brazilianCities.includes('Sao Paulo') && brazilianCities.includes('Curitiba')) {
    console.log('O array inclue Sao Paulo e Curitiba')
}
```
A expressão dentro da validação de If só resultará em true se as 2 condições forem atendidas, ou seja, se o array incluir Sao Paulo e Curitiba.

Já o operador *||* é utilizado como a palavra ou, sendo assim, somente uma das validações precisa resultar em true

```js
const brazilianCities = ['Sao Paulo', 'Rio de Janeiro', 'Curitiba']

if (brazilianCities.includes('Sao Paulo') || brazilianCities.includes('Maringá')) {
    console.log('O array inclue Sao Paulo ou Maringa')
}
```
O bloco If será executado, pois uma das validações resultou em true.

Já o operador lógico *!*, é utilizado para inverter uma validação que resulta em true ou false, como por exemplo:

```js
const isUserLoggedIn = false

if (!isUserLoggedIn) {
    console.log('O usuário não está logado')
}
```

O bloco if será executado, pois mesmo a const resultar em false, na sua validação dentro do if foi inserido o operador !, tornando ela not false, ou seja, true.

## Break e Continue

* ### Break

A palavra-chave break é utilizada para interromper um loop antes que sua condição seja atingida, pode ser utilizada por exemplo dentro de um if, fazendo com que o loop seja interrompido ao atingir certa condição

```js
const brazilianCities = ['Sao Paulo', 'Rio de Janeiro', 'Curitiba']

for (let i = 0; i < brazilianCities.length; i++) {
    if (brazilianCities[i] === 'Rio de Janeiro') {
        break
    }
}
```

O loop será interrompido antes de chegar na cidade Curitiba, já que se o item do array for igual a rio de janeiro, a iteração irá parar.

* ### Continue

A palavra-chave continue é utilizada para dar continuidade no loop imediatamente, podendo pular partes do código que estavam contidas dentro do loop.
Podemos utilizar por exemplo para exibir no console apenas os número pares de um array:

```js
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] % 2 === 1) {
        continue
    }
    console.log(numbers[i])
}
```

No código acima, caso o número seja identificado como ímpar pela validação do If, sua iteração será imediatamente finalizada, ignorando o console.log abaixo do If.

## Switch

A condicional switch é utilizada para realizar comparações, podendo simplificar situações onde o aninhamento de else ifs tornaria o código pouco legível.

Abaixo temos um código para verificar um valor utilizando If:
```js
const a = 1

if (a === 0) {
  console.log(`O valor de "a" é ${a}`)
} else if (a === 1) {
  console.log(`O valor de "a" é ${a}`)
} else {
  console.log('O valor de "a" é qualquer número, exceto 0 e 1')
}
```

Utilizando switch, temos:

```js
const a = 1

switch (a) {
    case 0:
        console.log(`o valor de "a" é ${a}`)
        break
    case 1:
        console.log(`o valor de "a" é ${a}`)
        break
    default:
        console.log(`o valor de "a" é qualquer número, exceto 0 e 1`)
}
```
