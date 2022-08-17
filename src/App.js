import React from 'react';


import  firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore'


firebase.initializeApp({
  apiKey: "AIzaSyCU8bMM_a6pVTq8SSTYsAIBKXrR6gWwPHU",
  authDomain: "chatapp-10919.firebaseapp.com",
  projectId: "chatapp-10919",
  storageBucket: "chatapp-10919.appspot.com",
  messagingSenderId: "912652543534",
  appId: "1:912652543534:web:e6d903228c7cbfdb80e1bf"
})

const auth = firebase.auth();
const firestore = firebase.firestore();

const [user] = useAuthState(auth);

function App() {
  return (
    <div className="App">
      <header>
        
      </header>

      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <button onClick= {signInWithGoogle}>Sign in with Google</button>
  )
}

function SignOut() {
  return auth.currentUser && ( 

    <button onClick={() => auth.signOut()}>Sign out</button>
  )
}

function ChatRoom() {

  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, {idField: 'id'});

  return ( 
    <>
      <div>
         {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
      </div>


    </>
  )
}

function ChatMessage(props) {
  const { text, uid} = props.message;

  return <p>{text}</p>

} 

export default App;
