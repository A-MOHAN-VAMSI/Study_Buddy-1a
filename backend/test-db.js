const { connectDB, sequelize } = require('./config/db');
const models = require('./models');

const test = async () => {
  try {
    console.log('Testing DB connection...');
    await connectDB();
    console.log('Authenticating succeeded.');
    
    console.log('Syncing models...');
    await sequelize.sync({ force: false });
    console.log('Syncing models succeeded. All tables exist or were created.');
    
    console.log('Success! Connection and schemas verified.');
    process.exit(0);
  } catch (error) {
    console.error('Test failed:', error);
    process.exit(1);
  }
};

test();
