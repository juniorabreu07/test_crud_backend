import express from 'express'
import routes from './routes/index'
import dbInit from './db/init'
import AuthRoute from './routes/auth.route';
const cookieSession = require('cookie-session');
const cors = require('cors')
const morgan = require('morgan');

class Server {
  public app: express.Application
  constructor() {
    this.app = express()
    this._config()
  }

  showAllRoutes() {
    const b = this.app._router.stack
      .filter((r: any) => r.route)
      .map((r: any) => {
        return {
          method: Object.keys(r.route.methods)[0].toUpperCase(),
          path: r.route.path
        };
      });
    console.log(b)
  }
  private async _config() {

    this.app.set('port', process.env.PORT as string || '3000');

    this.app.use(morgan('dev'))

    this.app.use("/public/", express.static(process.env.PATH_FOLDER_PUBLIC || "/public"))
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(cors({ credentials: true, origin: true }))
    // this.app.options('*', cors({ credentials: true, origin: true }));
    this.app.use(cors({ credentials: true, origin: 'http://localhost:3001' }))
    this.app.use(cookieSession({
      name: "my-test-crud-session",

      secret: process.env.COOKIE_SECRET,
      httpOnly: true,
      sameSite: 'strict'
    })
    );
    this.app.get('/', async (req: express.Request, res: express.Response): Promise<express.Response> => {
      return res.status(200).send({ message: `Welcome to the cookbook API! \n Endpoints available at http://localhost:${process.env.PORT}/api/v1` });
    })

    this.app.use((req, res, next) => {
      // res.header(
      //   "Access-Control-Allow-Headers",
      //   "Origin, Content-Type, Accept"
      // );
      // // res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
      // // res.header('Access-Control-Allow-Origin', '*')
      res.header(
        'Access-Control-Allow-Headers',
        'Authorization, Content-Type'
      )
      // // Website you wish to allow to connect
      // res.header('Access-Control-Allow-Origin', 'http://localhost:3001');

      // // Request methods you wish to allow
      // res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

      // // Request headers you wish to allow
      // res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

      // // Set to true if you need the website to include cookies in the requests sent
      // // to the API (e.g. in case you use sessions)
      // res.header('Access-Control-Allow-Credentials', "true");
      next();
    });
    this.app.use(
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {

        // res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
        // res.header('Access-Control-Allow-Origin', '*')
        // res.header(
        //   'Access-Control-Allow-Headers',
        //   'Authorization, Content-Type'
        // )
        next()
      }
    )

    routes(this.app)
    this.showAllRoutes()
  }



  public async start(): Promise<void> {

    dbInit();

    this.app.listen(this.app.get('port'), () => {
      console.log(`Server running at port ${this.app.get('port')}`)
    });

  }

}

const server = new Server()

server.start()
