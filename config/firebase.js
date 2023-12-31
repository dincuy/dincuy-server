const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const dotenv = require('dotenv');

dotenv.config(); // Mengatur environment variables dari file .env

// const serviceAccount = require('./serviceAccountKey.json');

const serviceAccount = {
  type: "service_account",
  project_id: "dincuytech",
  private_key_id: process.env.FIREBASE_ADMIN_PRIVATE_KEY_ID,
  private_key: `-----BEGIN PRIVATE KEY-----\n${process.env.FIREBASE_ADMIN_PRIVATE_KEY}\n8fnw2L0PJMSZKCj5IcKWUIhDhK//t2i+VLiD4U89vAPUEk//37ZEGhB8fHf/eTDh\nvgwdd/uCRBNEOB5wn0nkUUA+/IIorKUjNxwMnnhBwPojY5N7MoYNSMwJkG+1F5Of\nOML2q2FF0gzIWfsCjQ4TrL8DEoZ8kICnsfXWoU87h6Df1oFh4c96dfU48o+b5HYD\n7bEA9X9+EY4IOPwaUMIzfvqMfmFw0I/gtWPgK5k52KxWdQ/XxEMdBRNMvjVvujrX\n/35V/y6DubKfragK64/GctfhtNydlvpRYzyCNdxYh4+yckvOqn42hoIm+oqSMoug\n+ZG9GJuBAgMBAAECgf8tHcfJyn9Jc5WvAMYZKlitRiYGbysPQkKjnY9FtGGQiS+w\nBzy73ghEGfVE7tdcHzBLXxXUWtsFfYRBkFAbkDOfPi4lmgfPD9Ghc+dKiL/RCDiO\nxmL/jqPFG6gdE9joBzIWUWjoo88PQ4eC5Cqt6hzfQ01amHxRkti8CaUgURvs+itg\nsC+OzyvBwSYuNVhgk7CZX1WxjIScyeEeGzqlPqZu9T0+JsHvmE4pRkjL838VnzHa\n8sqbW4mPENvF7bxXqe1gqPQBj3Gad6OkkcIy5vQ2CJHPW502J2efii7NPi0vMJ8x\nouFQxx5M2oPXvTc1gjjr35OHd+FLL4xde3qNupECgYEAybLansPNxm9wX4xhKu1p\njd90WJO6g0tIWovJ6m2BMxYB7lKwd1UPJ+JaaCBVxh6SbUeej3ieCY5bJXOD7sYK\nA9fPU1crWa695I9AwJayDI8A+fZUHFTMO7IRTSgT8aUzDAbdiZVLLkCvmB0mR4P/\n6jp/W+lhZ6H+/VijYH9UB3ECgYEAw59ISMgdRKy++BmoEMVxaID1dEer5wor1AzK\n1pVAeQ/wSdUUXgpMGER8gs5sWyVtpfxPVgfRZGYsdiRc7AvhCfb6+NOUT47mlYi5\n9CFk83Ngb7+W3oe6lK5MbSlV1hTRDoBMpuuF6kAUYasPm2vZJPvqHqx4x4O595VP\nQLRpbRECgYA3K2rNHnW8n2K3X+h8G3BR1Bs41z+fBgqGadITA1zholVo4MlP+r4o\nhKuB68ZKaLZYmcxvJejkaEHaHpypxRWcM32MKD29TCS4zc5CX3XYJY140b3z+eXb\nNjuxRRMfd7Zcxcv3BBUKU7sz+lUsHpjzcoi/lTiFZjQfDA20KV/MoQKBgHtCS7uA\nS+DPr+yHzfvzTIf6aa6A0nHbWM5d2RjoJh2hy1faKOEwP84yqPmKs3+iz7n8hsjA\nWFGYh39RXjNlMMCknHJYbmTKt8OUyQZoXEGBe0wuPhOtFgVE5ecKWolvyGIIuUOb\nt19oTO9VZ5oYlFPXXydAqUGdYHn93Ff61UrhAoGAQZxq8GP6SZ642dQuUzaFys+R\nLCLUOZauShBb7HNhwkNHzPwArEG2Iz7PDYFeg0JN1+dbjjvPwsc2m0RMtCvj1mNr\nGk1bPLjxcrrbvNdRNdB+B0J+uC6fLzSeaT9CQbvyrYrB0RAxQ32rcP39acNLOlrl\n9d9zYrR9+aDWWpxEwKA=\n-----END PRIVATE KEY-----\n`,
  client_email: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_ADMIN_CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-jahox%40dincuytech.iam.gserviceaccount.com",
  universe_domain: "googleapis.com"
}

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

module.exports = { db }