import React from 'react'

function AgentForm() {
    const[agent,setAgent]=useState({
        name:"",
        email:"",
        password:'',
        skills:'',
        isActive:true
    })
    console.log(agent);

    const handleChange=(e)=>{
        const {name,}

    }
    
  return (
    <div>
        <h2>Add Agent</h2>

        <form action="">
            <input type="text" 
            name="name"
            placeholder="Agent name"

            />
            <input type="text" 
            name="name"
            placeholder="Agent name"
            
            />
            <button type="submit">
                Save Agent
            </button>
        </form>
    </div>
  )
    
}

export default AgentForm