const bcrypt = require('bcrypt');

async function genHash() {
  const hashed = await bcrypt.hash('vvnspkt1111', 10); // password bạn muốn
  console.log(hashed);
}

genHash();
