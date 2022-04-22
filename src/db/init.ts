require('dotenv').config()

import { User, Product } from './models'

const isDev = process.env.NODE_ENV === 'development'

const dbInit = () => Promise.all([
  User.sync({ alter: isDev }),
  Product.sync({ alter: isDev })
])

export default dbInit