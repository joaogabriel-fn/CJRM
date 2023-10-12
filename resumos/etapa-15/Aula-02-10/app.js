import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.1/firebase-app.js'
import { getFirestore, collection, getDocs, addDoc, serverTimestamp, doc, deleteDoc, updateDoc, setDoc } from 'https://www.gstatic.com/firebasejs/9.0.1/firebase-firestore.js'

const firebaseConfig = {
  apiKey: 'AIzaSyBx7o32_lC98Ypli6Cocafg5LhMSiL2SHg',
  authDomain: 'testing-firebase-1b144.firebaseapp.com',
  projectId: 'testing-firebase-1b144',
  storageBucket: 'testing-firebase-1b144.appspot.com',
  messagingSenderId: '658340434667',
  appId: '1:658340434667:web:1797405793f09d28abe4ae',
  measurementId: 'G-LN4Y8GLMDG'
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const collectionGames = collection(db, 'games')

const formAddGame = document.querySelector('[data-js="add-game-form"]')
const gamesList = document.querySelector('[data-js="games-list"]')

getDocs(collectionGames)
  .then(querySnapshot => {
    const gamesLis = querySnapshot.docs.reduce((acc, doc) => {
      const { title, developedBy, createdAt } = doc.data()

      acc += `<li data-id="${doc.id}" class="my-4">
        <h5>${title}</h5>
        
        <ul>
          <li>Desenvolvido por ${developedBy}</li>
          <li>Adicionado no banco em ${createdAt.toDate()}</li>
        </ul>

        <button data-remove="${doc.id}" class="btn btn-danger btn-sm">Remover</button>
      </li>`
      return acc
    }, '')

    gamesList.innerHTML = gamesLis
  })
  .catch(console.log)

formAddGame.addEventListener('submit', e => {
  e.preventDefault()

  addDoc(collectionGames, { 
    title: e.target.title.value,
    developedBy: e.target.developer.value,
    createdAt: serverTimestamp()
   })
  .then(doc => console.log('Documento criado om o ID', doc.id))
  .catch(console.log)
})

gamesList.addEventListener('click', e => {
  const idRemoveButton = e.target.dataset.remove

  if (idRemoveButton) {
    deleteDoc(doc(db, 'games', idRemoveButton))
      .then(() => {
        const game = document.querySelector(`[data-id="${idRemoveButton}"]`)
        game.remove()
      })
      .catch(console.log)
  }
})

const stardewValleyRef = doc(db, 'games', '1rbo0B0ZmbaMVJ7GnLgj')

/*
  const stardewValleyRef = doc(db, 'games', 'x')
  Se um id inexistente for passado como referência, um erro será retornado e nada irá acontecer 
*/

updateDoc(stardewValleyRef, { developedBy: 'ConcernedApe' })
  .then(() => console.log('Document atualizado'))
  .catch(console.log)

/*
  Caso um field que não existe seja informado no objeto do updateDoc(), ele será criado de qualquer forma recebendo o valor que foi passado como valor 
*/

/*
  Outra função que pode ser utilizada para modificar dados no banco é a setDoc, porém, se um id que não existe na collection for passado, ela irá criar um novo documento.
*/

const leagueOfLegendsRef = doc(db, 'games', 'lol')

setDoc(leagueOfLegendsRef, {
  title: 'League of Legends',
  developedBy: 'Riot Games',
})
  .then(() => console.log('Document atualizado'))
  .catch(console.log)

/*
  Para atualizar o valor de apenas um campo utilizando setDoc, é necessário que todos os outros campos sejam especificados, caso contrário, um novo documento irá sobrescrever o existente apenas com os campos presentes no argumento.

  Para evitar que isto aconteça, um terceiro argumento na função setDoc poderá ser passado, informando que o novo objeto será "fundido" com o existente
*/

setDoc(leagueOfLegendsRef, { developedBy: 'Tencent' }, { merge: true })
  .then(() => console.log('Document atualizado'))
  .catch(console.log)


  