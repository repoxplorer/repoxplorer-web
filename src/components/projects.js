import React from 'react';
import ReactLoading from 'react-loading'

import queryString from 'query-string'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'

import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

class Projects extends React.Component {
  componentDidMount() {
    this.props.GetProjects()
  }
  reduceRefsForField(project_name, refs) {
    return refs.map(
      function (ref) {
        return {
          'project': project_name,
          'name': ref.name,
          'branch': ref.branch,
        }
      }
    )
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
    if (this.props.error) {
      return <p>
        <Alert variant='warning'>
          Unable to contact the backend
        </Alert>
      </p>
    }
    if (this.props.result) {
      const { SearchBar } = Search;
      const columns = [
        {
          dataField: 'name',
          text: 'Project name',
          formatter: function (name) {
            return <Link
              to={
                'project?' +
                queryString.stringify(
                  {
                    'name': name
                  }
                )
              }>
              {name}
            </Link>
          },
          headerStyle: () => {
            return { width: '200px' };
          }
        },
        {
          dataField: 'description',
          text: 'Description',
          headerStyle: () => {
            return { width: '300px' };
          }
        },
        {
          dataField: 'repositories',
          text: 'Repositories',
          filterValue: function (refs) {
            return refs.map(function (ref) {
              return ref.name
            }).join(' ')
          },
          formatter: function (refs) {
            return refs.map(
              ref => (
                <div>
                  <Link
                    to={
                      'project?' +
                      queryString.stringify(
                        {
                          'name': ref.project,
                          'repository': ref.name + ':' + ref.branch
                        }
                      )
                    }>
                    {ref.name + ':' + ref.branch}
                  </Link>
                  {' '}
                </div>
              )
            )
          }
        }
      ]
      var projects = []
      Object.keys(this.props.result.projects).forEach((project_name, index) => (
        projects.push({
          'name': this.props.result.projects[project_name].name,
          'description': this.props.result.projects[project_name].description,
          'repositories': this.reduceRefsForField(
            this.props.result.projects[project_name].name,
            this.props.result.projects[project_name].refs),
        })
      ))

      const options = {
        sizePerPageList: [{
          value: 10
        }]
      }
      return (
        <Row>
          <Col>
            <ToolkitProvider
              keyField="id"
              data={projects}
              columns={columns}
              search
            >
              {
                props => (
                  <div>
                    <SearchBar {...props.searchProps} />
                    <hr />
                    <BootstrapTable
                      {...props.baseProps}
                      pagination={paginationFactory(options)}
                    />
                  </div>
                )
              }
            </ToolkitProvider>
          </Col>
        </Row >
      )
    }
  }
}

export default Projects
