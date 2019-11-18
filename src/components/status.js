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
          <h2>
            <p className="text-center">
              {this.props.result.projects} projects over{' '}
              {this.props.result.repos} Git repositories are indexed{' '}
              {'this'} repoXplorer instance. You'll find stats{' '}
              about them and their contributors.
            </p>
          </h2>
          <p className="text-center">
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
              <h1>
                <p className="text-center">
                  Welcome on repoXplorer
                </p>
              </h1>
              <StatusText
                GetStatus={this.props.GetStatus}
                loading={this.props.loading}
                result={this.props.result}
                error={this.props.error}
              />
              <h3>
                <p className="text-center">
                  Browse
                    {' '}<Link to='projects'>projects</Link>{' '}
                  {' '}<Link to='contributors'>contributors</Link>{' '}
                  {' '}<Link to='groups'>groups</Link>{' '}
                  indexes.
                </p>
              </h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    )
  }
}

export default Status
