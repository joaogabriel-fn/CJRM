# **CJRM** | Etapa 02 - Controle de Fluxo

* ## For e While loops

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

* ## If, Else e Else if statements

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

* ### Break, Continue e Switch


