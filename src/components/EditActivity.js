import React from 'react';
import {Link} from 'react-router-dom';
import querystring from 'querystring';
import axios from 'axios';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

export default class EditActivity extends React.Component
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
        console.log('mounting');
        console.log(this.props.match.params.id)
        axios.get("http://localhost:8000/activity/"+this.props.match.params.id)
        .then((res)=>{
         //   console.log(res);
            this.setState({
                studentName:res.data.studentName,
                description:res.data.description
            });
            console.log("changes")
        }
        ).then(()=>
        console.log(this.state.studentName));
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
        axios.post("http://localhost:8000/activity/update/"+this.props.match.params.id,JSON.stringify(activity),{headers:{'Content-Type': 'application/json'}})
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
                     Student Name
                    </label>
                    <select 
                    required
                    className="form-control"
                    value = {this.state.studentName}
                    >
                     <option>{this.state.studentName}</option>
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
                    <option value="john">

                    </option>
                </div>
                <div className="form-group">
                    <label>Date:</label>
                    <DatePicker
                    selected={this.state.date}
                    onChange={this.onChangeDate}
                    />
                </div>
                <div className="form-group">
                    <input type="submit" value="edit Activity Log" className="btn"></input>
                </div>
        </form>
        </div>
        );
    }
}