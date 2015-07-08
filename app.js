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
      <Ascii>
        <GithubBanner />
      </Ascii>
      <span class="intro">{"MetaDev actively breaks down silos that might otherwise form between projects.  We encourage and actively arrange cross-team collaboration and skill sharing.  We hope that by joining metadev, individuals will come away with a greater breadth and depth of skills in a number of new disciplines.  Just for example, Superordinate Unix will be the default distro for Dawn and Parmutronics hardware."}</span>
      <Grid>{gridItems}</Grid>
    </div>
  );

  render(app, document.querySelector('app'));
}).catch(e => console.error(e));