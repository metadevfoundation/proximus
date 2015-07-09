import { element } from 'deku'
import Shifty from 'shifty'


let GridItem = {
  render (c) {
    let {state, props} = c
    return <div class='gridlet' data-width='450px' data-height='150px'>{props.children}</div>
  }
}


let Grid = {

  async afterRender (c, el) {
    /* global HorizontalGridPacking */
    let pack = new HorizontalGridPacking(el, {
      padding: 10,
      height: 150
    })

    function onResize() {
      pack.width = el.clientWidth
      pack.reload()
    }

    window.removeEventListener('resize', onResize)
    window.addEventListener('resize', onResize)
    return {
      pack,
      onResize
    }
  },
  beforeUnmount(c) {
    window.removeEventListener('resize', c.state.onResize)
  },
  afterUpdate(c) {
    let { state } = c
    state.pack.reload()
  },
  render(c) {
    let { props } = c

    return <div class='grid'>{props.children}</div>
  },

  afterMount(c, el) {
    for (var i = 0; i < el.children.length; i++) {
      drop(el.children[i], i + 1)
    }
  }
}

export default {
  Grid,
  GridItem
}

let getOffset = el => {
  var _x = 0
  var _y = 0
  while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
    _x += el.offsetLeft - el.scrollLeft
    _y += el.offsetTop - el.scrollTop
    el = el.offsetParent
  }
  return { top: _y, left: _x }
}

let drop = (el, ii) => {
  let offset = getOffset(el)
  let c = el.parentElement.getBoundingClientRect()
  el.style.transformOrigin = `${ - offset.left + (c.width/2) }px ${ - offset.top + (c.height / 2) }px`

  new Shifty().tween({
    from: { i: -500 * ii },
    to: { i: 0 },
    duration: 250 * Math.sqrt(ii),
    easing: 'easeInQuad',
    step: ({i}) => {
      el.style.transform = `perspective(250px) translateZ(${Math.floor(i)}px)`
    }
  })
}
