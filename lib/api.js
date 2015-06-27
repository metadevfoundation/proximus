import axios from 'axios'

let Api = {};

/**
 * List Applications
 */

Api.getGist = id => axios({
  method: 'get',
  url: 'https://api.github.com/gists/' + id,
})

Api.getItems = async (id, file) => {
    try {
      let res1 = await Api.getGist(id)
      let res2 = await axios({
        method: 'get',
        url: res1.data.files[file].raw_url
      });

      console.log(res2.data.items);
      return res2.data.items;
    } catch (e) {
      console.error(e);
      return [];
    }
}
export default Api;
