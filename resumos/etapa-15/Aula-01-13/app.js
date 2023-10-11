import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.1/firebase-app.js'
import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.0.1/firebase-firestore.js'
// import { collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.0.1/firebase-firestore.js'

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

// const querySnapshot = getDocs(collection(db, 'games'))

// querySnapshot
//   .then(collection => collection.forEach(doc => console.log(doc.id, ' => ', doc.data())))

getDocs(collection(db, 'games'))
  .then(querySnapshot => {
    const gamesLis = querySnapshot.docs.reduce((acc, doc) => {
      const { title, developedBy, createdAt } = doc.data()

      acc += `<li class="my-4">
        <h5>${title}</h5>
        
        <ul>
          <li>Desenvolvido por ${developedBy}</li>
          <li>Adicionado no banco em ${createdAt.toDate()}</li>
        </ul>
      </li>`
      console.log(createdAt)
      return acc
    }, '')

    const gamesList = document.querySelector('[data-js="games-list"]')
    gamesList.innerHTML = gamesLis
  })
  .catch(console.log)
