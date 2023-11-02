// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getStorage, ref, deleteObject } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-storage.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCXmC44-WDAXrfOMpSHqIxWEcXpmJF0d-k",
    authDomain: "ischedule-c11a3.firebaseapp.com",
    projectId: "ischedule-c11a3",
    storageBucket: "ischedule-c11a3.appspot.com",
    messagingSenderId: "691704229688",
    appId: "1:691704229688:web:503a06fdba540c54821bcd"
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



