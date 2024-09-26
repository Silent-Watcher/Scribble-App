import { Sequelize } from '@sequelize/core';

import { CONFIGS } from './';

export const sequelize = new Sequelize({
	dialect:'mysql',
	host: CONFIGS.DB.HOST,
	port: CONFIGS.DB.PORT,
	username: CONFIGS.DB.USER,
	password: CONFIGS.DB.PASSWORD,
	database: CONFIGS.DB.NAME,
	logging: (msg)=>{
		console.log(msg);
	}
})


// export const sequelize = new Sequelize('noteApp', 'root' , '123',{
// 	dialect:'mysql',
// 	host:"mysql",
// })

