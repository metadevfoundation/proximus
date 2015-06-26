import { tree, render, element } from 'deku'
import config from './config'
import { Grid } from './elements/index'
import Api from './lib/api'

/*
  App + Config
*/

let app = tree();

app.set(config);

(async function() {
    let response = await Api.getRaw('a23dcfd3022db00dffbc', 'gistfile1.json');
    let { items } = response.data;
    app.mount(
        <Grid items={items}></Grid>
    );
    render(app, document.querySelector('app'));
})()
