import axios from 'axios'

let Api = {};

/**
 * List Applications
 */

Api.getGist = id => axios({
  method: 'get',
  url: 'https://api.github.com/gists/' + id,
})

Api.getRaw = url => axios({
  method: 'get',
  url: url
});

Api.getItems = async (id, file) => {
    try {
      let gistRes = await Api.getGist(id)
      let rawRes = await Api.getRaw(gistRes.data.files[file].raw_url);
      return rawRes.data.items;
    } catch (e) {
      console.error(e);
      return [];
    }
}

export default Api;
