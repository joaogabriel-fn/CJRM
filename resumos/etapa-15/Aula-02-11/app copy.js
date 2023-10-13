import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.1/firebase-app.js'
import { getFirestore, collection, addDoc, serverTimestamp, doc, deleteDoc, updateDoc, onSnapshot } from 'https://www.gstatic.com/firebasejs/9.0.1/firebase-firestore.js'

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

const unsubscribe = onSnapshot(collectionGames, querySnapshot => {
  if (!querySnapshot.metadata.hasPendingWrites) {
    const gamesLis = querySnapshot.docs.reduce((acc, doc) => {
      const { title, developedBy, createdAt } = doc.data()
  
      acc += `<li data-id="${doc.id}" class="my-4">
        <h5>${title}</h5>
        
        <ul>
          <li>Desenvolvido por ${developedBy}</li>
          ${createdAt 
              ? `<li>Adicionaod no banco em ${createdAt.toDate()}</li>` 
              : ''}
        </ul>
  
        <button data-remove="${doc.id}" class="btn btn-danger btn-sm">Remover</button>
      </li>`
  
      return acc
    }, '')
  
    gamesList.innerHTML = gamesLis
    console.log('Manipulação Executada')
  }
})

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
      .then(() => console.log('Game removido'))
      .catch(console.log)
  }
})

buttonUnsub.addEventListener('click', unsubscribe)
