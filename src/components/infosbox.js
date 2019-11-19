import React from 'react';
import ReactLoading from 'react-loading'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'
import Card from 'react-bootstrap/Card'

class InfosData extends React.Component {
  componentDidMount() {
    this.props.GetInfos(
      {
        'project_id': this.props.project_id,
        'dfrom': this.props.from_date,
        'dto': this.props.to_date,
        'include_merge_commits': this.props.include_merge_commits
      })
  }
  render() {
    if (this.props.loading) {
      return (
        <Row>
          <Col>
            <ReactLoading type='bars' color='grey' />
          </Col>
        </Row>
      )
    }
    if (this.props.result) {
      return (
        <React.Fragment>
          <InfosBoxEntry
            infos={{ 'description': this.props.description }}
            entry='description' />
          {this.props.infos_entries.map(entry =>
            <InfosBoxEntry key={entry} infos={this.props.result} entry={entry} />
          )}
        </React.Fragment>
      )
    }
    if (this.props.error) {
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
  }
}


class InfosBoxEntry extends React.Component {
  render() {
    const maps = {
      'description': 'Description',
      'repos_amount': 'Repository refs',
      'commits_amount': 'Commits',
      'line_modifieds_amount': 'Lines changed',
      'authors_amount': 'Authors',
      'duration': 'Activity duration',
      'first': 'Date of first commit',
      'last': 'Date of last commit'
    }
    return (
      <Row>
        <Col>
          <span>
            <b>{maps[this.props.entry]}: </b>
            {this.props.infos[this.props.entry]}
          </span>
        </Col>
      </Row>
    )
  }
}

class InfosBox extends React.Component {
  render() {
    return (
      <Card>
        <Card.Header>
          <b>Infos (based on select filters)</b>
        </Card.Header>
        <Card.Body>
          <InfosData
            project_id={this.props.project_name}
            result={this.props.result}
            loading={this.props.loading}
            error={this.props.error}
            description={this.props.description}
            infos_entries={this.props.infos_entries}
            GetInfos={this.props.GetInfos}
            from_date={this.props.filters_from_date}
            to_date={this.props.filters_to_date}
            include_merge_commits={this.props.include_merge_commits}
          />
        </Card.Body>
      </Card>
    )
  }
}

export default InfosBox
