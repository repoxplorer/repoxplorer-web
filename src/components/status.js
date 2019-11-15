import React from 'react';
import ReactLoading from 'react-loading'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Alert from 'react-bootstrap/Alert'
import { Link } from 'react-router-dom'

class StatusText extends React.Component {
  componentDidMount() {
    this.props.GetStatus()
  }
  render() {
    if (this.props.loading) {
      return (
        <Row>
          <Col md={{ span: 12, offset: 5 }}>
            <ReactLoading type='bars' color='grey' />
          </Col>
        </Row>
      )
    }
    if (this.props.result) {
      return (
        <React.Fragment>
          <p class="text-center">
            <h2>
              {this.props.result.projects} projects over{' '}
              {this.props.result.repos} Git repositories are indexed{' '}
              {'this'} repoXplorer instance. You'll find stats{' '}
              about them and their contributors.
          </h2>
          </p>
          <p class="text-center">
            {this.props.result.customtext}
          </p>
        </React.Fragment>
      )
    }
    if (this.props.error) {
      return <p>
        <Alert variant='warning'>
          Unable to contact the backend
        </Alert>
      </p>
    }
  }
}

class Status extends React.Component {
  render() {
    return (
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <Card>
            <Card.Body>
              <p class="text-center">
                <h1>Welcome on repoXplorer</h1>
              </p>
              <StatusText
                GetStatus={this.props.GetStatus}
                loading={this.props.loading}
                result={this.props.result}
                error={this.props.error}
              />
              <p class="text-center">
                <h3>
                  Browse
                    {' '}<Link to='projects'>projects</Link>{' '}
                  {' '}<Link to='contributors'>contributors</Link>{' '}
                  {' '}<Link to='groups'>groups</Link>{' '}
                  indexes.
                  </h3>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    )
  }
}

export default Status
