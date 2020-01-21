import { enableProdMode } from '@angular/core';
import * as express from 'express';
import _ from 'lodash';
import { join } from 'path';
import 'zone.js/dist/zone-node';
import * as mainServer from './dist/server/main';

const getArgument = (argumentName: string): any | null => {
  if (!_.isNil(process) && !_.isNil(process.argv)) {
    const originIndex = _.findIndex(process.argv, (argument) => {
      return _.isEqual(_.toLower(argument), _.toLower('--' + argumentName));
    });

    if (_.isFinite(originIndex) && _.gte(originIndex, 0)) {
      const originValueIndex = _.add(originIndex, 1);

      if (_.lte(originValueIndex, _.subtract(_.size(process.argv), 1))) {
        return process.argv[ originValueIndex ];
      }
    }
  }

  return null;
};

const getPort = (): number => {
  const port = 4302;
  const portArgument = getArgument('port');

  if (!_.isEmpty(portArgument)) {
    return portArgument;
  }

  return port;
};

enableProdMode();

const app = express();
const PORT = getPort();
const DIST_FOLDER = join(process.cwd(), 'dist');
const DIST_BROWSER_FOLDER = join(DIST_FOLDER, 'browser');

const { AppServerModuleNgFactory, LAZY_MODULE_MAP, ngExpressEngine, provideModuleMap }: any = mainServer;

app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');
app.set('views', DIST_BROWSER_FOLDER);

app.get('*.*', express.static(DIST_BROWSER_FOLDER, {
  maxAge: '1y'
}));

app.get('app/*', (req, res) => {
  res.render('index', {
    req
  });
});

app.get('*', (req, res) => {
  res.render('index', {
    req
  });
});

app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});
