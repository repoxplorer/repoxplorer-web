import React from 'react';

import ReactLoading from 'react-loading'

import Alert from 'react-bootstrap/Alert'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import InfosBox from './infosbox'

class Project extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    const params = new URLSearchParams(window.location.search)
    if (params.get('name')) {
      this.setState({ 'name': params.get('name') })
      this.props.GetProjects(params.get('name'))
    }
  }
  render() {
    if (!this.state.name) {
      return (
        <Alert variant='warning'>
          Missing parameters
        </Alert>
      )
    }
    if (this.props.projects_loading) {
      return (
        <Row>
          <Col md={{ span: 12, offset: 5 }}>
            <ReactLoading type='bars' color='grey' />
          </Col>
        </Row>
      )
    }
    if (this.props.projects_error) {
      if (this.props.error.data) {
        return (
          <p>
            <Alert variant='warning'>
              Error (code {this.props.error.data.status}){' '}
              message: {this.props.error.data.message}
            </Alert>
          </p>)
      }
      return <p>
        <Alert variant='warning'>
          Unable to contact the backend
        </Alert>
      </p>
    }
    if (this.props.projects_result) {
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
          project_name={this.state.name}
          description={this.props.projects_result[this.state.name].description}
          result={this.props.infos_result}
          loading={this.props.infos_loading}
          error={this.props.infos_error}
          infos_entries={infos_entries}
          GetInfos={this.props.GetInfos}
        />
      )
    }
  }
}

export default Project
