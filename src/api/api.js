// Validate Password function from Firebase
export const passwordValidation = (password, hash) => {
   const endpoint =  `https://us-central1-react-firebase-19d1f.cloudfunctions.net/checkPassword`;
   return fetch(endpoint, {password:password, coursePassword: hash })
   .then( res => res)
   .catch( err => err )
}