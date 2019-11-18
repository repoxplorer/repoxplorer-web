import React from 'react';
import { connect } from "react-redux";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { getStatus } from './reducers/status'
import { getInfos } from './reducers/infos'
import { getProjects } from './reducers/projects'

import { Switch, Route } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import TopMenu from './components/menu'
import Status from './components/status'
import Projects from './components/projects'
import Project from './components/project'


class RootView extends React.Component {
  render() {
    return (
      <React.Fragment>
        <TopMenu />
        <Container>
          <Row><Col><p></p></Col></Row>
          <Row>
            <Col>
              <Status
                GetStatus={this.props.handleGetStatus}
                loading={this.props.status_loading}
                result={this.props.status_result}
                error={this.props.status_error}
              />
            </Col>
          </Row>
        </Container>
      </React.Fragment>)
  }
}

class ProjectsView extends React.Component {
  render() {
    return (
      <React.Fragment>
        <TopMenu />
        <Container>
          <Row><Col><p></p></Col></Row>
          <Row>
            <Col>
              <Projects
                GetProjects={this.props.handleGetProjects}
                loading={this.props.projects_loading}
                result={this.props.projects_result}
                error={this.props.projects_error}
              />
            </Col>
          </Row>
        </Container>
      </React.Fragment>)
  }
}

class ProjectView extends React.Component {
  render() {
    return (
      <React.Fragment>
        <TopMenu />
        <Container>
          <Row><Col><p></p></Col></Row>
          <Row>
            <Col>
              <Project
                GetInfos={this.props.handleGetInfos}
                infos_loading={this.props.infos_loading}
                infos_result={this.props.infos_result}
                infos_error={this.props.infos_error}
                GetProjects={this.props.handleGetProjects}
                projects_result={this.props.projects_result}
                projects_loading={this.props.projects_loading}
                projects_error={this.props.projects_error}
              />
            </Col>
          </Row>
        </Container>
      </React.Fragment>)
  }
}

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path='/'>
          <RootView
            handleGetStatus={this.props.handleGetStatus}
            status_result={this.props.status_result}
            status_loading={this.props.status_loading}
            status_error={this.props.status_error}
          />
        </Route>
        <Route exact path='/projects'>
          <ProjectsView
            handleGetProjects={this.props.handleGetProjects}
            projects_result={this.props.projects_result}
            projects_loading={this.props.projects_loading}
            projects_error={this.props.projects_error}
          />
        </Route>
        <Route exact path='/project'>
          <ProjectView
            handleGetProjects={this.props.handleGetProjects}
            projects_result={this.props.projects_result}
            projects_loading={this.props.projects_loading}
            projects_error={this.props.projects_error}
            handleGetInfos={this.props.handleGetInfos}
            infos_result={this.props.infos_result}
            infos_loading={this.props.infos_loading}
            infos_error={this.props.infos_error}
          />
        </Route>
      </Switch>
    )
  }
}

const mapStateToProps = state => {
  return {
    status_result: state.statusReducer.result,
    status_error: state.statusReducer.error_response,
    status_loading: state.statusReducer.loading,
    infos_result: state.infosReducer.result,
    infos_error: state.infosReducer.error_response,
    infos_loading: state.infosReducer.loading,
    projects_result: state.projectsReducer.result,
    projects_error: state.projectsReducer.error_response,
    projects_loading: state.projectsReducer.loading,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleGetStatus: () => dispatch(getStatus()),
    handleGetInfos: (project_id) => dispatch(getInfos(project_id)),
    handleGetProjects: (project_id) => dispatch(getProjects(project_id))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
