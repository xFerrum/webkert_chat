import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, addDoc, setDoc, getDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { Injectable } from "@angular/core";
import { firebaseConfig } from "src/app/fbaseconfig";
import { deleteDoc } from "firebase/firestore";
  
const fbase = initializeApp(firebaseConfig);
const db = getFirestore(fbase);
const auth = getAuth();

@Injectable({
  providedIn: 'root',
})

export class UserService
{

  //creates Firebase user auth, adds to users collection and returns true if succesful
  registerUser(username: string, email: string, password: string)
  {
    createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) =>
    {
      await setDoc(doc(db, "users", userCredential.user.uid),
      {
        email: email,
        password: password,
        username: username
      });
      return true;
    })
  .catch((error) =>
  {
    console.error(error.code + ": " + error.message);
    return false;
  });
  }

  async logUserIn(email: string, password: string)
  {
    let uid = await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) =>
      {
        localStorage.setItem("loggedInID", userCredential.user.uid);
        return userCredential.user.uid;
      })
      .catch((error) =>
      {
        console.error(error.code + ": " + error.message);
        return false;
      }); 
      return uid;
  }

  async signUserOut()
  {
    let result = await signOut(auth).then(() =>
    {
      localStorage.removeItem("loggedInID");
      return true;
    }).catch((error) =>
    {
      console.error(error.code + ": " + error.message);
      return false;
    });
    
    return result;
  }

  async deleteAcc(): Promise<boolean>
  {
    await deleteDoc(doc(db, "users", localStorage.getItem("loggedInID")!));

    let result = await auth.currentUser!.delete().then(() =>
    {
      localStorage.removeItem("loggedInID");
      return true;
    }).catch((error) =>
    {
      console.error(error.code + ": " + error.message);
      return false;
    });

    return result;
  }

  isLoggedIn()
  {
    return auth.currentUser;
  }

  async getUserDetails(uid: string, tries = 10): Promise<any>
  {
    try
    {
      let data = await getDoc(doc(db, "users", uid));
      return(data.data());
    }
    catch (error)
    {
      if (tries > 0)
      {
        return await this.getUserDetails(uid, tries-1)
      }
      else throw error;
    }
  }
}