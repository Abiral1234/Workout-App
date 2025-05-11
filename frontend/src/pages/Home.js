
import {useEffect} from 'react'
import WorkoutDetails from '../components/workoutDetails'
import WorkoutForm from '../components/workoutForm'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
const Home  = ()=>{
    const {workouts,dispatch} = useWorkoutsContext()
    //const [workouts,setWorkouts] = useState(null)

    useEffect(()=>{
        const fetchWorkouts = async()=>{
            console.log("Hello")
            const response = await fetch('/api/workouts')
            const json = await response.json()
            
            if(response.ok){
                dispatch({type:'SET_WORKOUTS',payload:json})
             //   setWorkouts(json)
            }
        }

        fetchWorkouts()
    },[dispatch])
    
    return(
       <div className="home">
        <div className="workouts">  
        <WorkoutForm></WorkoutForm>
        {workouts && workouts.map((workout)=>(
            <WorkoutDetails key={workout._id} workout={workout} />
        ))}
       </div>
      
       </div>  
    )
}

export default Home;