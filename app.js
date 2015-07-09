import { element, tree, render } from 'deku'

import config from './config'
import Api from './lib/api'
import { GridItem, Grid, Ascii, GithubBanner } from './elements'

let X = {
  render: () => { return <h1>X</h1> }
}

/*
  App + Config
*/

Api.getItems('a23dcfd3022db00dffbc', 'gistfile1.json').then((items) => {
  // fetched items from gist

  let gridItems = items.map(item => <GridItem item={item}>
    <a href="item.url">
      <h4>{item.name}</h4>
      <p>{item.description}</p>
    </a>
  </GridItem>)

  let app = tree(<div>
    <Ascii><GithubBanner /></Ascii>
    <X />
    <span class="intro">{"MetaDev ssssactively breaks down silos that might otherwise form between projects.  We encourage and actively arrange cross-team collaboration and skill sharing.  We hope that by joining metadev, individuals will come away with a greater breadth and depth of skills in a number of new disciplines.  Just for example, Superordinate Unix will be the default distro for Dawn and Parmutronics hardware."}</span>
    <Grid>{gridItems}</Grid>
  </div>)

  // sets the element tree
  app.set(config)

  // bind the appthings to the dom.
  render(app, document.querySelector('app'))

}).catch(e => console.error(e))
