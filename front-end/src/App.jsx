import { useState,useEffect } from "react";




const App = () => {
    const API_URL = `http://localhost:5000/api/employee`;

    const [formData , setFormData] = useState({
                                          name: '',
                                          email: '',
                                          age: '',
                                          salary: '',
                                          role: ''
                                        })


  const handleCreatePost = async(e)=>{
    e.preventDefault();
    const response = await fetch(`${API_URL}`,{
      method:'POST',
      body:JSON.stringify({
        name,email,age,salary,role
      }),
      headers:{'Content-Type':'application/json'}
    })

    setFormData([...formData,response])
    setFormData("")
    // return await response.json()
  }

  const handleDelete = async(id)=>{
     await fetch(`${API_URL}/id`,{
      method:'DELETE'
    })
    setFormData(formData.filter(data => data.id !== id))
  }

  useEffect(()=>{
    async function fetch(){
     const data =  await fetch(`${API_URL}`)
     console.log(data)
     setFormData()
    }
    fetch();
  },[])

  return (
    <div>
      <ul>
        {
          formData.map(data =>(
            <li key={data.id}>
                <h2>{data.name}</h2>
                <h2>{data.email}</h2>
                <h2>{data.age}</h2>
                <h2>{data.role}</h2>
                <h2>{data.salary}</h2>
                <button onClick={() =>handleDelete(data.id)}>X</button>
            </li>
          ))  }
      </ul>

      <form onSubmit={handleCreatePost}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" value={name} onChange={(e)=>{
          setFormData(e.target.value)
        }} />
      </form>
    </div>
  )
}

export default App