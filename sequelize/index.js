const { Sequelize } = require('sequelize');
const { applyExtraSetup } = require('./extra-setup');
const dotenv = require('dotenv');
dotenv.config();
// const sequelize = new Sequelize('development', 'postgres', 'superuser', {
//     host: 'localhost',
//     dialect: 'postgres',
// });

let sequelize;
if (process.env.DATABASE_URL) {
	// Heroku
	sequelize = new Sequelize(process.env.DATABASE_URL, {
		dialect: "postgres",
		dialectOptions: {
			ssl: {
				require: true,
				rejectUnauthorized: false
			}
		}
	});
} else {
	// local
	sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
		dialect: "postgres",
	});
}
// const sequelize = new Sequelize(process.env.DATABASE_URL, {
// 	dialect: "postgres",
// 	dialectOptions: {
// 		ssl: {
// 			require: true,
// 			rejectUnauthorized: false
// 		}
// 	}
// });

const modelDefiners = [
	require('./models/User'),
	require('./models/Rental'),
	require('./models/Client'),
	require('./models/Contact'),
	require('./models/ClientLocation'),
	require('./models/AutomatedMessage')
	// Add more models here...
	// require('./models/item'),
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize);
}

// We execute any extra setup after the models are defined, such as adding associations.
applyExtraSetup(sequelize);

module.exports = sequelize;