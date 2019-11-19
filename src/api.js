import axios from 'axios'

var server = 'http://localhost/repoxplorer'
var baseurl = server + '/api/v1'

function status() {
  const url = baseurl + '/status/status'
  return axios.get(url)
}

function projects(project_id) {
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

function infos(
  { project_id, dfrom = undefined,
    dto = undefined, include_merge_commits = undefined }) {
  const url = baseurl + '/infos/infos'
  var params = new URLSearchParams()
  params.append('pid', project_id)
  if (dfrom) {
    params.append('dfrom', dfrom)
  }
  if (dto) {
    params.append('dto', dto)
  }
  if (include_merge_commits) {
    params.append('include_merge_commit', include_merge_commits)
  }
  console.log(params.toString())
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
