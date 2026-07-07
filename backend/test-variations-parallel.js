const mysql = require('mysql2/promise');

const host = 'hayabusa.proxy.rlwy.net';
const port = 32446;
const user = 'root';
const database = 'railway';

// Generate variations of the password
const char4 = ['l', '1', 'I'];
const char11 = ['I', 'l', '1'];
const char12 = ['1', 'l', 'I'];
const char13_14 = ['Ju', 'JJu'];
const char19 = ['o', '0', 'O'];
const char22 = ['U', 'u'];
const char23 = ['i', 'I', 'l', '1'];
const char31 = ['l', 'U', 'u', 'L'];

const generatePasswords = () => {
  const list = [];
  for (const c4 of char4) {
    for (const c11 of char11) {
      for (const c12 of char12) {
        for (const c13_14 of char13_14) {
          for (const c19 of char19) {
            for (const c22 of char22) {
              for (const c23 of char23) {
                for (const c31 of char31) {
                  list.push(`CLB${c4}WfJLex${c11}${c12}${c13_14}Zj${c19}YP${c22}${c23}HzYauda${c31}`);
                }
              }
            }
          }
        }
      }
    }
  }
  return list;
};

const tryConnect = async (password) => {
  try {
    const connection = await mysql.createConnection({
      host,
      port,
      user,
      password,
      database,
      connectTimeout: 3000
    });
    await connection.end();
    return true;
  } catch (err) {
    return false;
  }
};

const run = async () => {
  const passwords = generatePasswords();
  console.log(`Generated ${passwords.length} password permutations to test...`);
  
  const batchSize = 40;
  let found = false;

  for (let i = 0; i < passwords.length; i += batchSize) {
    if (found) break;
    const batch = passwords.slice(i, i + batchSize);
    console.log(`Testing batch ${i / batchSize + 1} of ${Math.ceil(passwords.length / batchSize)}...`);

    const results = await Promise.all(
      batch.map(async (pw) => {
        const ok = await tryConnect(pw);
        if (ok) {
          console.log(`\nSUCCESS! The correct password is: ${pw}\n`);
          found = true;
          return pw;
        }
        return null;
      })
    );

    const successPw = results.find(r => r !== null);
    if (successPw) {
      process.exit(0);
    }
  }

  console.log('Tested all permutations. No match found.');
  process.exit(1);
};

run();
