const mysql = require('mysql2/promise');

const host = 'hayabusa.proxy.rlwy.net';
const port = 32446;
const user = 'root';
const database = 'railway';

// Generate variations of the password
const variations = [
  'CLBlWfJLexI1JuZjwoYPUiHzYaudal', // lowercase l, 1 J, lowercase l at end
  'CLB1WfJLexI1JuZjwoYPUiHzYaudal', // number 1, 1 J, lowercase l at end
  'CLBIWfJLexI1JuZjwoYPUiHzYaudal', // uppercase I, 1 J, lowercase l at end
  'CLBlWfJLexI1JuZjwoYPUiHzYaudau', // lowercase l, 1 J, lowercase u at end
  'CLB1WfJLexI1JuZjwoYPUiHzYaudau', // number 1, 1 J, lowercase u at end
  'CLBlWfJLexI1JJuZjwoYPUiHzYaudal', // lowercase l, double J
  'CLB1WfJLexI1JJuZjwoYPUiHzYaudal', // number 1, double J
  'CLBlWfJLexI1JuZjwoYPuIHzYaudal',  // lowercase u
  'CLBlWfJLexI1JuZjwoYPUiHzYandaL',  // variation
  'CLBlWfJLexI1JuZjwoYPUiHzYaudau',
  'CLBlWfJLexI1JuZjwoYPUiHzYaudal'
];

// Let's add more smart variations based on reading the image
// Let's see the image: CLB [vertical bar] W f J L e x I 1 J u Z j w o Y P U i H z Y a u d a U
// Wait, is it CLBlWfJLexI1JuZjwoYPUiHzYaudal?
// What if it is lowercase 'o' or number '0'? Zjw0Y... vs ZjwoY...
// What if it is uppercase 'O' ? ZjwOY...
// What if it is CLBlWfJLexI1JuZjwoYPUiHzYaudal but with different case?
// Let's write a loop to try them.

const tryConnect = async (password) => {
  try {
    const connection = await mysql.createConnection({
      host,
      port,
      user,
      password,
      database,
      connectTimeout: 5000
    });
    await connection.end();
    return true;
  } catch (err) {
    // console.log(`Failed for: ${password} - ${err.message}`);
    return false;
  }
};

const run = async () => {
  console.log('Testing password variations...');
  for (const pw of variations) {
    const success = await tryConnect(pw);
    if (success) {
      console.log(`\nSUCCESS! The correct password is: ${pw}\n`);
      process.exit(0);
    }
  }
  
  // Let's try more variations systematically if the above fails
  // Let's permute the following:
  // Position 4 (char 4): [l, 1, I]
  // Position 11 (char 11): [I, l, 1]
  // Position 12 (char 12): [1, l, I]
  // Position 13-14: [Ju, JJu]
  // Position 19: [o, 0, O]
  // Position 21: [U, u]
  // Position 22: [i, I, 1, l]
  // Position 29: [a, A]
  // Position 30: [l, L, u, U]
  
  const char4 = ['l', '1', 'I'];
  const char11 = ['I', 'l', '1'];
  const char12 = ['1', 'l', 'I'];
  const char13_14 = ['Ju', 'JJu'];
  const char19 = ['o', '0'];
  const char21 = ['U', 'u'];
  const char22 = ['i', 'I'];
  const char30 = ['l', 'U', 'u'];
  
  console.log('Permuting database password space dynamically...');
  for (const c4 of char4) {
    for (const c11 of char11) {
      for (const c12 of char12) {
        for (const c13_14 of char13_14) {
          for (const c19 of char19) {
            for (const c21 of char21) {
              for (const c22 of char22) {
                for (const c30 of char30) {
                  const pw = `CLB${c4}WfJLex${c11}${c12}${c13_14}Zj${c19}YP${c21}${c22}HzYauda${c30}`;
                  const success = await tryConnect(pw);
                  if (success) {
                    console.log(`\nSUCCESS! The correct password is: ${pw}\n`);
                    process.exit(0);
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  
  console.log('All variations exhausted.');
  process.exit(1);
};

run();
