import { element } from 'deku'

let GridItem = {
    render(c) {
        let {state,props} = c;
        let item = props.item;
        let go = () => { document.location.href = item.url };
        return <div class="proxy" data-width="250px" data-height="250px" onClick={go}>
          <h4>{item.name}</h4>
          <p>{item.description}</p>
        </div>
    }
}

let Grid = {
  async afterRender(c, el, setState) {
    let pack = new HorizontalGridPacking(el, {
      padding: 10,
      height: 250
    })
    function onResize() {
      pack.width = el.clientWidth
      pack.reload()
    }
    window.removeEventListener('resize', onResize);
    window.addEventListener('resize', onResize);
    return {
      pack,
      onResize
    }
  },
  beforeUnmount (c, el) {
    window.removeEventListener('resize', c.state.onResize);
  },
  afterUpdate(c, el, setState) {
    let { state } = c;
    state.pack.reload()
  },
  render(c, setState) {
    let { props } = c;

    return <div class="grid">{props.children}</div>
  }
}

export default {
  Grid,
  GridItem 
};
