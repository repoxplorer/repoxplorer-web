import axios from 'axios'

var server = 'http://localhost/repoxplorer'
var baseurl = server + '/api/v1'

function status() {
  const url = baseurl + '/status/status'
  return axios.get(url)
}

function projects(project_id) {
  console.log(project_id)
  const url = baseurl + '/projects/projects'
  var params = new URLSearchParams()
  if (project_id) {
    params.append('pid', project_id)
  }
  return axios.get(
    url, {
    params: params
  })
}

function infos(project_id) {
  const url = baseurl + '/infos/infos'
  var params = new URLSearchParams()
  params.append('pid', project_id)
  return axios.get(
    url, {
    params: params
  })
}

export {
  status,
  infos,
  projects
}
