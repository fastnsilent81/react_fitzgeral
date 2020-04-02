import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';

import { GetUsers, SubmitWorkGroup } from './store/actions/userAction'

function App(props) {
  const initSearch = {name: '', email: ''};
  const initWorkGroup = {name: '', selectedMember: []};
  const TABLE_COLUMNS = [
    {
      label: 'Name',
      value: 'name'
    }, {
      label: 'Skill and Qualification',
      value: 'skill'
    }, {
      label: 'Certification',
      value: 'certification'
    }
  ]
  const [ search, setSearch ] = useState(initSearch);
  const [ workGroup, setWorkGroup ] = useState(initWorkGroup);

  useEffect(() => {
    props.GetUsers(search)
  }, [])

  function onSubmitSearch(e) {
    e.preventDefault();
    props.GetUsers(search)
  }  

  function onAddGroup(data) {
    const isExist = workGroup.selectedMember.some(item => item.id === data.id)
    !isExist && setWorkGroup({...workGroup, selectedMember: [
      ...workGroup.selectedMember, data
    ]})
  }

  function onSubmit(e) {
    props.SubmitWorkGroup({
      name: workGroup.name,
      selectedMember: workGroup.selectedMember.map(user => user.id)
    }).then(res => {
      console.log(res)
      setWorkGroup(initWorkGroup)
    })
  }

  return (
    <div className="App bg-darkest text-white">
      {/* navbar */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb bg-darker">
          <li className="breadcrumb-item"><a href="#">Home</a></li>
          <li className="breadcrumb-item active text-white" aria-current="page">Create Work Group</li>
        </ol>
      </nav>

      <div className="jumbotron bg-darkest p-3 mb-3">
        <div className="card">
          <div className="card-header bg-darkish">
            Create Group
          </div>
          <div className="card-body bg-darker">
            <div className="row">
              <div className="col-sm-5">
                <div className="form-group">
                  <label htmlFor="grouName">Group Name</label>
                  <input type="text" className="form-control" id="grouName" required onChange={e => setWorkGroup({...workGroup, name: e.target.value})} />
                </div>
                <form onSubmit={onSubmitSearch} className="mb-3">
                  <div className="form-group">
                    <label htmlFor="searchPeopleUsername">Search people</label>
                    <input type="text" className="form-control" id="searchPeopleUsername" placeholder="Search by user name..." onChange={e => setSearch({...search, name: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <input type="email" className="form-control" id="searchPeopleEmail" placeholder="Search by email..." onChange={e => setSearch({...search, email: e.target.value})} />
                  </div>
                  <button className="btn btn-primary w-100" type="submit">Search People</button>
                </form>
                
                <div className="list-people">
                  <label>people found:</label>
                  <div className="list-wrap">
                  {props.users.data && props.users.data.length > 0 ? props.users.data.map((row, key) => {
                    return (
                      <div key={key} className="list-item">
                        <label className="w-100 m-0 label-big">{row.name}</label>
                        <label className="w-100 m-0 label-small">Skill: {String(row.skill).replace(',', ', ')}</label>
                        <label className="w-100 m-0 label-small">Certification: {String(row.certification).replace(',', ', ')}</label>
                        <button className="btn btn-primary w-100 py-1" onClick={() => onAddGroup(row)}>Add member to group</button>
                      </div>
                    );
                    }) : <div className="list-item text-center">No Data Available</div>}
                  </div>
                </div>
              </div>
              <div className="col-sm-7">
                <label>Selected member group:</label>
                <table className="table text-white">
                  <thead>
                    <tr>
                      <th scope="col">No.</th>
                        {TABLE_COLUMNS.map(each => <th key={each.value} scope="col">{each.label}</th>)}
                      <th scope="col">Process</th>
                    </tr>
                  </thead>
                  <tbody>
                  {workGroup.selectedMember.length > 0 ? workGroup.selectedMember.map((row, key) => {
                    return (
                      <tr key={key}>
                        <th scope="row">{ key + 1 }</th>
                        {TABLE_COLUMNS.map(column => {
                          const value = row[column.value];
                          return (
                            <td key={column.value}>
                              {String(value).replace(',', ' ')}
                            </td>
                          );
                        })}
                        <td className="text-center">
                          <i className="mx-1 fa fa-pencil"></i>
                          <i className="mx-1 fa fa-trash"></i>
                        </td>
                      </tr>
                    );
                    }) : <tr><td colSpan={5} className="text-center">No Data Available</td></tr>}
                  </tbody>
                </table>
              </div>
              
              
              <div className="col-sm-12">
                <hr className="w-100 border-white" />
                <div className="d-flex justify-content-end">
                  <button onClick={onSubmit} type="submit" href="#" className="btn btn-primary">Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer>
        <div><a href="https://www.ericsson.com/en">Ericsson</a> &copy; 2020 MOAI.</div>
        <div>Powered by <a href="https://coreui.io/react/">CoreUI for React</a></div>
      </footer>
    </div>
  );
}

const mapState = state => ({
  users: state.users.users
})
const mapDispatch = dispatch => ({
  GetUsers: payload =>  dispatch(GetUsers(payload)),
  SubmitWorkGroup: payload => dispatch(SubmitWorkGroup(payload))
})
export default connect(mapState, mapDispatch)(App);