# **CJRM** | Etapa 10 - Datas

## Data e Hora
Dentro do JavaScript, as datas são tidas como objetos, pois são referências, não um tipo primitivo. Para criar um objeto que represente uma data, é utilizado um Date Constructor. Os construtores em JavaSript servem para criar novos objetos, neste caso, será a data.

Quando uma data é criada em JavaScript, ela se comporta como o "presente", ou seja, será considerado o horário em que o documento foi aberto.

```js
const present = new Date()
```

Caso seja executado um console.log com a variável present, será retornado no console a data atual, contendo o dia da semana, mês, dia, ano, hora e fuso-horário. Se for executado um typeof present, veremos que a variável se comporta como um objeto, ou seja, podemos obter informações deste objeto através de alguns métodos.

Alguns dos métodos são:

```js
console.log(present.getFullYear())
console.log(present.getMonth())         // O método getMonth é zero based, ou seja, janeiro é lido como mês 0.
console.log(present.getDate())          // Retorna o dia do mês
console.log(present.getDay())           // Retorna o dia da semana e também é zero based (domingo é lido como 0)
console.log(present.getHours())
console.log(present.getMinutes())
console.log(present.getSeconds())
console.log(present.toDateString())     // Retorna a data (Dia da semana, Mes, Dia e Ano)
console.log(present.toTimeString())     // Retorna o horário e fuso-horário
console.log(present.toLocaleString())   // Retorna a data na americana (m/d/yyyy)
```
 
## Timestamps e comparações
Um timestamp é representado pelo número de milisegundos de 1 de janeiro de 1970 até o presente, o que possibilita a comparação entre datas. Para compararmos duas datas, primeiro precisamos declarar uma que seja diferente do presente, para isso, é utilizada uma string como argumento no Date().

```js
const past = new Date('May 1 2020 7:47:00')
const present = new Date()

console.log(present.getTime(), past.getTime())        // Irá retornar no console o timestamp de past e present

const difference = present.getTime() - past.getTime() // A constante difference irá armazenar a diferença entre os dois timestamps

// Para convertermos o timestamp da difference, podemos transformar por meios matemáticos

const seconds = Math.round(difference / 1000)
console.log(seconds)

const minutes = Math.round(seconds / 60)
console.log(minutes)

const hours = Math.round(minutes / 60)
console.log(hours)

const days = Math.round(hours / 24)
console.log({ days })

const years = Math.round(days / 360)
console.log({ years })
```
