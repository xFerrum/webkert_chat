import { Injectable } from "@angular/core";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, addDoc, setDoc, getDoc, query, where, arrayUnion, arrayRemove, updateDoc} from 'firebase/firestore';
import { onSnapshot } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { firebaseConfig } from "src/app/fbaseconfig";
import { Observable } from "rxjs";
import { Message } from "src/classes/message";

const fbase = initializeApp(firebaseConfig);
const db = getFirestore(fbase);


@Injectable({
  providedIn: 'root',
})
 
export class ChatService
{
    unsub: any;
    messages!: Array<Message>;
    currentRoom!: String;

    constructor()
    {
    }
    
    async joinRoom(roomID: string, msgArray: Array<Message>)
    {
        this.currentRoom = roomID;
        this.messages = msgArray;

        this.unsub = onSnapshot(query(collection(db, "messages"), where("toRoom", "==", roomID)), (snapshot) => {
            const docChanges = snapshot.docChanges();
            if (docChanges.length > 0)
            {
                const addedDoc = docChanges[0];
                if (addedDoc.type === 'added')
                {
                    if (addedDoc.doc.data()['toRoom'] === roomID) msgArray.push(addedDoc.doc.data() as Message);
                }
            }
        });
    }

    async sendMessage(msg: String, username: String)
    {
        await addDoc(collection(db, "messages"),
        {
            sentBy: username,
            content: msg,
            date: new Date,
            toRoom: this.currentRoom
        });
    }

    addMessage(msg: Message)
    {
        if (this.messages.length === 15)
        {
            this.messages.shift();
        }
        
        this.messages.push(msg);
    }
}