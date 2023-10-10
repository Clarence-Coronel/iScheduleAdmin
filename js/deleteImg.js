// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getStorage, ref, deleteObject } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-storage.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBeB5jNRs-uxuc7pfhP64uZVipC1Wit0TQ",
    authDomain: "john-wick-41c8d.firebaseapp.com",
    projectId: "john-wick-41c8d",
    storageBucket: "john-wick-41c8d.appspot.com",
    messagingSenderId: "891193894294",
    appId: "1:891193894294:web:2c0bc91aa768f1e88aa9b7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
var del = document.getElementById('deleteImg-btn'); 



del.addEventListener("click", ()=>{
    let link = document.querySelector('#linkToDelete').value;
    const desertRef = ref(storage, link);
    //dito nilalagay kung ano yung link na idedelete

    // Delete the file
    deleteObject(desertRef).then(() => {
        console.log("success deleted")
    // File deleted successfully
    }).catch((error) => {
    // Uh-oh, an error occurred!
        console.log("failed deleted")
    
    });
})


