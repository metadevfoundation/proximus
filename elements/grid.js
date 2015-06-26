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
  async afterMount(c, el, setState) {
    let pack = new HorizontalGridPacking(el, {        
        padding: 10,
        height: 250
    })
    let onResize = window.addEventListener('resize', function () {
        pack.width = el.clientWidth
      pack.reload()
    })
    return {
        pack,
        onResize
    }
  },
  beforeUnmount (component, el) {
    let {props, state, id} = component
    state.onResize();
  },
  afterUpdate(c, el, setState) {
      let { state } = c;
      state.pack.reload()
  },
  render(c, setState) {
    let { props } = c;
      
    let items = props.items.map(function(v) {
        return <GridItem item={v} />
    });
    console.log(items);
    return <div class="grid">      
        {items}
    </div>    
  }
}

export default Grid;
