import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js"
import { 
  getFirestore, 
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc, 
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js"

const firebaseConfig = {
  // Paste your firebase config here
   apiKey: "AIzaSyDazYnyp29ZhbNhHc5UxkUyLmVgsMF9Row",
    authDomain: "colmena-fb.firebaseapp.com",
    projectId: "colmena-fb",
    storageBucket: "colmena-fb.appspot.com",
    messagingSenderId: "339106421215",
    appId: "1:339106421215:web:f56c90b2fc3d46a0fc4c6a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)




// OBJETO DE PEDIDOS
// pdd-marcaTiempo
// pdd-id
// pdd-nro
// pdd-usuario
// pdd-estado
// pdd-aprobacion
// pdd-area
// pdd-rubro
// pdd-fechaPago
// pdd-Tipo
// pdd-total
// pdd-detalle
// pdd-comprobante
// pdd-formaPago
// pdd-proveedor
// pdd-anexo
// pdd-obs



// // Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// import {
//   getFirestore,
//   collection,
//   getDocs,
//   onSnapshot,
//   addDoc,
//   deleteDoc,
//   doc,
//   getDoc,
//   updateDoc,
// } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   // Put you credentials here
// };

// // Initialize Firebase
// export const app = initializeApp(firebaseConfig);

// export const db = getFirestore();

/**
 * Save a New Task in Firestore
 * @param {string} title the title of the Task
 * @param {string} description the description of the Task
 */
export const saveTask = ( marcaTiempo, usuario, estado, aprobacion, area, rubro, fechaPago,
  detalle, comprobante, formaPago, anexo, obs ) => {
  addDoc(collection(db, "pdd"), { marcaTiempo, usuario, estado, aprobacion, area, rubro, fechaPago, detalle, comprobante, formaPago, anexo, obs });}

export const onGetTasks = (callback) => onSnapshot(collection(db, "pdd"), callback);

/**
 *
 * @param {string} id Task ID
 */
export const deleteTask = (id) => deleteDoc(doc(db, "pdd", id));

export const getTask = (id) => getDoc(doc(db, "pdd", id));

export const updateTask = (id, newFields) =>
  updateDoc(doc(db, "pdd", id), newFields);

export const getTasks = () => getDocs(collection(db, "pdd"));



// saveTask(
//   marcaTiempo,
//   idPdd,
//   user.value,
//   estado,
//   aprobacion,
//   area,
//   rubro.value,
//   fechaPago.value,
//   detalle.value,
//   comprobante.value,
//   formaPago.value,
//   anexo.value,
//   obs.value
//   );