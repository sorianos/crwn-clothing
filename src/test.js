import firebase from 'firebase/app';
import 'firebase/firestore';

const firestore = firebase.firestore();

firestore.collection('users').doc('4i1ISAfPDH1zR2UaxhPF').collection('cartItems').doc('5TItmAJPrJ8u0QAbYEP1');
firestore.doc('/users/4i1ISAfPDH1zR2UaxhPF/cartItems/5TItmAJPrJ8u0QAbYEP1');
firestore.collection('/users/4i1ISAfPDH1zR2UaxhPF/cartItems');