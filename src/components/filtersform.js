import React from 'react';

import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";

import moment from 'moment'

class FiltersForm extends React.Component {

  componentDidMount() {
    this.fetchQueryParams()
  }

  fetchQueryParams = () => {
    const params = new URLSearchParams(window.location.search)
    var dfrom = params.get('dfrom')
    var dto = params.get('dto')
    var include_merge_commits = params.get('include_merge_commits')
    if (dfrom) {
      this.props.handleFromDateChange(dfrom)
    }
    if (dto) {
      this.props.handleToDateChange(dto)
    }
    if (include_merge_commits === 'true' ||
      include_merge_commits === 'false') {
      if (include_merge_commits === 'true') {
        this.props.handleIMCChange(true)
      } else {
        this.props.handleIMCChange(false)
      }
    }
  }

  updateHistoryURL = (params) => {
    const baseurl = window.location.origin + window.location.pathname
    var urlparams = new URLSearchParams(window.location.search)
    if (params.from_date) {
      urlparams.set('dfrom', params.from_date)
    }
    if (params.to_date) {
      urlparams.set('dto', params.to_date)
    }
    if (params.include_merge_commits !== undefined) {
      urlparams.set('include_merge_commits', params.include_merge_commits)
    }
    const newurl = baseurl + '?' + urlparams.toString()
    window.history.pushState({}, null, newurl)
  }

  onFromDateChange = (date) => {
    var date_str = moment(date).format("YYYY-MM-DD")
    this.props.handleFromDateChange(date_str)
  }

  onToDateChange = (date) => {
    var date_str = moment(date).format("YYYY-MM-DD")
    this.props.handleToDateChange(date_str)
  }

  onIMCChange = (event) => {
    const value = event.target.checked
    this.props.handleIMCChange(value)
  }

  handleSubmit = (event) => {
    this.updateHistoryURL({ 'from_date': this.props.from_date })
    this.updateHistoryURL({ 'to_date': this.props.to_date })
    this.updateHistoryURL({ 'include_merge_commits': this.props.include_merge_commits })
    this.props.GetInfos(
      {
        'project_id': this.props.project_name,
        'dfrom': this.props.from_date,
        'dto': this.props.to_date,
        'include_merge_commits': this.props.include_merge_commits
      })
    event.preventDefault()
  }

  render() {
    return (
      <Card>
        <Card.Header>
          <b>Filters</b>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formFromDate">
              <Form.Label><b>From date</b></Form.Label>
              <br />
              <DatePicker
                selected={
                  this.props.from_date ?
                    moment(this.props.from_date).toDate() : ""}
                onChange={this.onFromDateChange}
                dateFormat="yyyy-MM-dd"
                placeholderText="Set a from date boundary"
                showYearDropdown
              />
            </Form.Group>
            <Form.Group controlId="formToDate">
              <Form.Label><b>To date</b></Form.Label>
              <br />
              <DatePicker
                selected={
                  this.props.to_date ?
                    moment(this.props.to_date).toDate() : ""}
                onChange={this.onToDateChange}
                dateFormat="yyyy-MM-dd"
                placeholderText="Set a to date boundary"
                showYearDropdown
              />
            </Form.Group>
            <Form.Group controlId="IncludeMergeCommits">
              <Form.Check
                type="checkbox"
                onChange={this.onIMCChange}
                label="Include merge commits"
                checked={this.props.include_merge_commits ? true : false}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Apply filters
            </Button>
          </Form>
        </Card.Body>
      </Card >
    )
  }
}

export default FiltersForm
