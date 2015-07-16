import axios from 'axios'

let Api = {}


/**
 * Get gist metadata by ID
 */
Api.getGist = id => axios({
  method: 'get',
  url: 'https://api.github.com/gists/' + id,
})

/**
 * Get gist raw contents by URL in metadata
 **/
Api.getGistRaw = url => axios({
  method: 'get',
  url: url
})


Api.getItems = async (id, file) => {
  try {
    let gistRes = await Api.getGist(id)
    let rawRes = await Api.getGistRaw(gistRes.data.files[file].raw_url)
    return rawRes.data.items
  } catch(e) {
    console.error(e)
  }

  return []
}

// Api.getItems = () => axios({
//   method: 'GET',
//   url: 'ds0nt.com:3479/keys/items',
//   headers: {
//     Authorization: 'Basic test:test'
//   }
// })

// PAUL mock data. fake the data you need
Api.getQuip = () => {
  return [
    {},
    {},
    {}
  ]
}
//let items = Api.getQuip()

export default Api
