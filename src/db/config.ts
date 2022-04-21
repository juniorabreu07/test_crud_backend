const fs = require('fs');
require('dotenv').config()
import diff from 'microdiff'
import { Dialect, Model, Sequelize } from 'sequelize'
import { SequelizeHooks } from 'sequelize/types/hooks'

import localCache from '../utils/local-cache'


const dbName = process.env.MY_DB_NAME as string;
const dbUser = process.env.MY_DB_USER as string;
const dbHost = process.env.MY_DB_HOST;
const dbDriver = process.env.MY_DB_DRIVER as Dialect;
const dbPassword = process.env.MY_DB_PASSWORD;
const dbPort = Number(process.env.MY_DB_PORT);

const hooks: Partial<SequelizeHooks<Model<any, any>, any, any>> = {
  afterUpdate: (instance: Model<any, any>) => {
    const cacheKey = `${instance.constructor.name.toLowerCase()}s`

    const currentData = instance.get({ plain: true })

    if (!localCache.hasKey(cacheKey)) {
      return
    }

    const listingData = localCache.get<any>(cacheKey) as any[]
    const itemIndex = listingData.findIndex((it) => it.id === instance.getDataValue('id'))
    const oldItemData = ~itemIndex ? listingData[itemIndex] : {}

    const instanceDiff = diff(oldItemData, currentData)

    if (instanceDiff.length > 0) {
      listingData[itemIndex] = currentData
      localCache.set(cacheKey, listingData)
    }
  },
  afterCreate: (instance: Model<any, any>) => {
    const cacheKey = `${instance.constructor.name.toLowerCase()}s`
    const currentData = instance.get({ plain: true })

    if (!localCache.hasKey(cacheKey)) {
      return
    }

    const listingData = localCache.get<any>(cacheKey) as any[]
    listingData.push(currentData)

    localCache.set(cacheKey, listingData)
  },
}


const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDriver,
  logging: false,
  port: dbPort,
  define: { hooks }
})


export const create_config_json = () => {
  const data = JSON.stringify({
    "development": {
      "username": `${dbUser}`,
      "password": `${dbPassword}`,
      "database": `${dbName}`,
      "host": `${dbHost}`,
      "dialect": `${dbDriver}`
    }
  });
  console.log("data", data)
  fs.writeFileSync('./config.json', data);

}
export default sequelizeConnection




