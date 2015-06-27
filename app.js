import { element, tree, render } from 'deku';

import config from './config';
import Api from './lib/api'
import { GridItem, Grid, Ascii, GithubBanner } from './elements';

/*
  App + Config
*/



Api.getItems('a23dcfd3022db00dffbc', 'gistfile1.json').then((items) => {
  let app = tree();

  app.set(config);
  let gridItems = [];

  for (let item of items) {
    gridItems.push(<GridItem item={item} />);
  }
  app.mount(
    <div>
      <Ascii />
      <GithubBanner />
      <Grid>{gridItems}</Grid>
    </div>
  );

  render(app, document.querySelector('app'));
}).catch(e => console.error(e));