import React from 'react';
import {Link} from 'react-router-dom';
import querystring from 'querystring';
import axios from 'axios';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import Axios from 'axios';
export default class CreateActivity extends React.Component
{
    constructor(props)
    {
        super(props);//all classes should call super constr

        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeStudentName= this.onChangeStudentName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        //state creates variables in react
        //updating state updates page automatically
        let selectedDate=new Date();
        this.state={//corresponding to mongoDB
            studentName:"",
            duration:0,
            description:"",
            date: new Date() ,
            users:[]
        }
    }
    //this lifecycle method is called just before something is loaded to page 
    componentDidMount()
    {
        console.log('mounting')
        axios.get("http://localhost:8000/student/")
        .then((res)=>
            {
                console.log('hello');
                if(res.data.length>0)
                {
                    this.setState({
                   users: res.data.map(stud=> stud.studentName),
                    studentName:res.data[0].studentName})
                }
                else
                {
                    this.setState({
                        users:['users'],
                        studentName:'tester'
                    })
                }
            })
            .catch(err=>
                console.log(err))
            .finally(()=>
            {
                console.log('finally'+this.state.studentName)
            })
            console.log('mounting done');
    }
    onChangeStudentName(e)
    {
        this.setState({
            studentName:e.target.value
        })
    }
    onChangeDescription(e)
    {
        this.setState({
            description:e.target.value
        })
    }
    onChangeDuration(e)
    {
        this.setState({
            duration:e.target.value
        })
    }
    onChangeDate(selectedDate,e)//passing calendar date
    {
        this.setState({
            date:  selectedDate
        })
        console.log(this.state.date+" "+typeof(this.state.date));
       
    }
    onSubmit(e)
    {
        e.preventDefault();//default submit behaviour
        console.log('activity submitted');
      
        const activity =
        {
            studentName: this.state.studentName,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }
        console.log(activity)
        axios.post("http://localhost:8000/activity/add",JSON.stringify(activity),{headers:{'Content-Type': 'application/json'}})
        .then(res=>console.log(res))
        .catch(err=>console.log("error"));
      //  window.location ='/' //redirecting to homepage
    }
    render()
    {
        return (
        <div>
            <h1>Create Activity</h1>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>
                        Enter Student Name
                    </label>
                    <select 
                    required
                    className="form-control"
                    value = {this.state.studentName}
                    onChange={this.onChangeStudentName}
                    >
                        {
                            this.state.users.map((user)=>
                            {
                                return <option
                                key = {user}
                                value = {user}>
                                    {user}
                                </option>
                            })
                        }
                    </select>
                </div>
                <div className="form-group">
                    <label>description:</label>
                    <input type="text"
                    required
                    className="form-control"
                    value={this.state.description}
                    onChange={this.onChangeDescription}
                    />
                </div>
            
            <div className="form-group">
                    <label>duration:</label>
                    <input type="text"
                    required
                    className="form-control"
                    value={this.state.duration}
                    onChange={this.onChangeDuration}
                    />
                </div>
                <div className="form-group">
                    <label>Date:</label>
                    <DatePicker
                    selected={this.state.date}
                    onChange={this.onChangeDate}
                    />
                </div>
                <div className="form-group">
                    <input type="submit" value="create Activity Log" className="btn"></input>
                </div>
        </form>
        </div>
        );
    }
}