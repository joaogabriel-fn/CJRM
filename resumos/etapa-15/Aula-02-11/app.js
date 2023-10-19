import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.1/firebase-app.js'
import { getFirestore, collection, addDoc, serverTimestamp, doc, deleteDoc, onSnapshot } from 'https://www.gstatic.com/firebasejs/9.0.1/firebase-firestore.js'

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
const buttonUnsub = document.querySelector('[data-js="unsub"]')

const log = (...value) => console.log(...value)

const getFormattedDate = createdAt => new Intl
  .DateTimeFormat('pt-br', { dateStyle: 'short', timeStyle: 'short' })
  .format(createdAt.toDate())

const renderGamesList = querySnapshot => {
  if (!querySnapshot.metadata.hasPendingWrites) {
    gamesList.innerHTML = querySnapshot.docs.reduce((acc, doc) => {
      const { title, developedBy, createdAt } = doc.data()
  
      return `${acc}<li data-id="${doc.id}" class="my-4">
        <h5>${title}</h5>
        
        <ul>
          <li>Desenvolvido por ${developedBy}</li>
          ${createdAt ? `<li>Adicionado no banco em ${getFormattedDate(createdAt)}</li>` : ''}
        </ul>
  
        <button data-remove="${doc.id}" class="btn btn-danger btn-sm">Remover</button>
      </li>`
    }, '')
  }
}

const addGame = e => {
  e.preventDefault()

  addDoc(collectionGames, { 
    title: e.target.title.value,
    developedBy: e.target.developer.value,
    createdAt: serverTimestamp()
   })
  .then(doc => {
    log('Documento criado om o ID', doc.id)

    e.target.reset()
    e.target.title.focus()
  })
  .catch(log)
}

const deleteGame = e => {
  const idRemoveButton = e.target.dataset.remove

  if (idRemoveButton) {
    deleteDoc(doc(db, 'games', idRemoveButton))
      .then(() => log('Game removido'))
      .catch(log)
  }
}

const unsubscribe = onSnapshot(collectionGames, renderGamesList)
gamesList.addEventListener('click', deleteGame)
formAddGame.addEventListener('submit', addGame)
buttonUnsub.addEventListener('click', unsubscribe)
