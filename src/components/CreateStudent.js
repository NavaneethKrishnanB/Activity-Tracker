import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import querystring from 'querystring'

axios.defaults.withCredentials = true;

export default class CreateStudent extends React.Component
{
    constructor(props)
    {
        super(props);
        this.onChangeStudentName = this.onChangeStudentName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
        this.state={
            studentName:""
        }
    }
    onChangeStudentName(e)
    {
        this.setState({
          studentName:e.target.value
        });
        console.log(this.state.studentName);
    }
    componentDidMount()
    {
        
        this.setState({
            studentName:""
        });
        console.log(this.state.studentName);

    }
    onSubmit(e)
    {
        e.preventDefault();
        const student = {
            studentName : this.state.studentName
        }
        console.log(this.state.studentName);
        console.log(student);
        axios.post(`http://localhost:8000/student/add`,querystring.stringify(student), {headers: { 'Content-Type': 'application/x-www-form-urlencoded'
        
        
    }})
        .then((res)=>
        console.log(res.data))
        .catch(err=>
            console.log(err));
        this.setState({
            studentName:""//enter another student name
        });
        
    }
    render()
    {
        return (
        <div>
            <h1> Enroll Student</h1>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                <label> Student Name:</label>
                <input type="text"
                required
                className="form-control"
                value={this.state.studentName}
                onChange={this.onChangeStudentName}
                />
                </div>
                <div className="form-group">
                <input type="submit" value="admit student " className="btn"></input>
                </div>
            </form>
        </div>
        );
    }
}