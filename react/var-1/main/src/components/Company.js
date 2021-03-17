import React, { Component } from 'react'

class Company extends Component {
  constructor(props) {
    super(props)
    let { item } = this.props
    this.state = {
      name: item.name,
      employees: item.employees,
      revenue: item.revenue,
      isEditing: false
    }
    this.handleChange = (evt) => {
      this.setState({
        [evt.target.name]: evt.target.value
      })
    }
    this.save = () => {
      console.log(item.id)
      this.props.onSave(item.id, {
        name: this.state.name,
        employees: this.state.employees,
        revenue: this.state.revenue
      })
      this.setState({ isEditing: false })
    }
  }
  render() {
    let { item } = this.props
    if (this.state.isEditing) {
      return (
        <div>
          <span>
            <label htmlFor="name">Name</label>
            <input type="text" value={this.state.name} name="name" id="name" onChange={this.handleChange} />
          </span>
          <span>
            <label htmlFor="employees">Employees</label>
            <input type="text" value={this.state.employees} name="employees" id="employees" onChange={this.handleChange} />
          </span>
          <span>
            <label htmlFor="revenue">Revenue</label>
            <input type="text" value={this.state.revenue} name="revenue" id="revenue" onChange={this.handleChange} />
          </span>
          <input type="button" value="save" onClick={this.save} />
          <input type="button" value="cancel" onClick={() => { this.setState({ isEditing: false }) }} />
        </div>
      )
    }
    else {
      return (
        <div>
          Name {item.name} with {item.employees} employees {item.revenue} revenue
          <input type="button" value="edit" onClick={() => { this.setState({ isEditing: true }) }} />
        </div>
      )
    }
  }
}

export default Company
