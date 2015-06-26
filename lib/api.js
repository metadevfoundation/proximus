import axios from 'axios'

let Api = {};

/**
 * List Applications
 */

Api.getGist = id => axios({
  method: 'get',
  url: 'https://api.github.com/gists/' + id,
})

Api.getRaw = async (id, file) => {
    let res = await Api.getGist(id)
    return axios.get(res.data.files[file].raw_url);
}
export default Api;
