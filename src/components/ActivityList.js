import React from 'react';
import {Link} from 'react-router-dom';
import Axios from 'axios';
function Activity(props)
{
    console.log(props)
    return (
<tr>
    <td>
        {props.activity.studentName}
    </td>
    <td>
        {props.activity.description}
    </td>
    <td>
        {props.activity.duration}
    </td>
    <td>
        {props.activity.date}
    </td>
    <td>
        <Link to={"/edit/"+props.activity._id}>edit</Link> | <a href="#" onClick={()=>{props.deleteActivity(props.activity._id)}}>delete</a>
    </td>
</tr>
)
}
export default class ActivityList extends React.Component
{
    constructor(props)
    {
        super(props);
        this.deleteActivity = this.deleteActivity.bind(this);
        this.state={
            activities:[]
        }
    }
    componentDidMount()
    {
        console.log('hell')
        Axios.get('http://localhost:8000/activity')
        .then((acts)=>{

           
           this.setState({activities: acts.data
           })
        })
        .then(()=>
        console.log("activity  "+this.state.activities))
        .catch(err=>console.log(err));
    }
    deleteActivity(id)
    {
        Axios.delete(`http://localhost:8000/activity/${id}`)
        .then(()=>{
            console.log("deleted");
        })
        .catch(err=>console.log(err));
        this.setState({
            activities: this.state.activities.filter((acts)=> acts._id!==id)
        })
    }
    activityList()
    {
        console.log("acts list" + typeof(this.state.activities));
        if(this.state.activities===[]||this.state.activities.length==0)
        return ;
        console.log(this.state.activities);
        return this.state.activities.map((acts)=>{
            
            return (<Activity activity={acts} deleteActivity={this.deleteActivity} key="acts._id"/>)
        })
    }
    render()
    {
        return (
        <div>
           <h1> Activity List</h1> 
           <table className="table thead-dark">
          
               <tr>
            <th>
                Student Name
            </th>
            <th>
                Description
            </th>
            <th>
                Duration
            </th>
            <th>
                Date
            </th>
            
            </tr>
           <tbody>
                {this.activityList()}
            </tbody>
      
           </table>
        </div>
        );
    }
}