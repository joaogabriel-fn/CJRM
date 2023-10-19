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

const formatCreatedAtDate = createdAt => {
  const date = createdAt.toDate()
  const formatOptions = {
    day: '2-digit', 
    month: '2-digit', 
    year:'numeric', 
    hour: '2-digit', 
    minute: '2-digit'
  }

  return Intl.DateTimeFormat('pt-BR', formatOptions).format(date)
}

const getLiTemplate = (doc) => {
  const { id } = doc
  const { title, developedBy, createdAt } = doc.data()
  const formattedCreatedAtDate = formatCreatedAtDate(createdAt)

  return (
    `<li data-id="${id}" class="my-4">
      <h5>${title}</h5>
      
      <ul>
        <li>Desenvolvido por ${developedBy}</li>
        ${createdAt 
            ? `<li>Adicionado no banco em ${formattedCreatedAtDate}</li>` 
            : ''}
      </ul>

      <button data-remove="${id}" class="btn btn-danger btn-sm">Remover</button>
    </li>`
  )
}

const getGamesLis = (acc, doc) => {
  acc += getLiTemplate(doc)

  return acc
}

const addGameToDb = async e => {
  e.preventDefault()

  await addDoc(collectionGames, { 
    title: e.target.title.value,
    developedBy: e.target.developer.value,
    createdAt: serverTimestamp()
   })
}

const deleteGameFromDb = async e => {
  const idRemoveButton = e.target.dataset.remove

  if (idRemoveButton) {
    await deleteDoc(await doc(db, 'games', idRemoveButton))
  }
}

const unsubscribe = onSnapshot(collectionGames, querySnapshot => {
  const docs = querySnapshot.docs
  const hasPendingWrites = querySnapshot.metadata.hasPendingWrites 

  if (!hasPendingWrites) {
    const gamesLis = docs.reduce(getGamesLis, '')
  
    gamesList.innerHTML = gamesLis
  }
})

formAddGame.addEventListener('submit', addGameToDb)

gamesList.addEventListener('click', deleteGameFromDb)

buttonUnsub.addEventListener('click', unsubscribe)
