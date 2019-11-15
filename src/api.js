import axios from 'axios'

var server = 'http://localhost/repoxplorer'
var baseurl = server + '/api/v1'

function status() {
  const url = baseurl + '/status/status'
  return axios.get(url)
}

function projects() {
  const url = baseurl + '/projects/projects'
  return axios.get(url)
}

function infos(project_id) {
  const url = baseurl + '/infos/infos'
  const params = new URLSearchParams()
  params.append('pid', project_id)
  return axios.get(url, params)
}

export {
  status,
  infos,
  projects
}
