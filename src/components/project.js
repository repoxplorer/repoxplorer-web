
import React from 'react';
import Alert from 'react-bootstrap/Alert'

import InfosBox from './infosbox'

class Project extends React.Component {
  render() {
    const params = new URLSearchParams(window.location.search)
    if (!params.get('name') || params.get('name') === "") {
      return (
        <Alert variant='warning'>
          Missing parameters
        </Alert>
      )
    }
    const infos_entries = [
      'repos_amount',
      'commits_amount',
      'line_modifieds_amount',
      'authors_amount',
      'duration',
      'first',
      'last'
    ]
    return (
      <InfosBox
        project_name={params.get('name')}
        result={this.props.infos_result}
        loading={this.props.infos_loading}
        error={this.props.infos_error}
        infos_entries={infos_entries}
        GetInfos={this.props.GetInfos}
      />
    )
  }
}

export default Project
