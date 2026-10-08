import { useEffect, useState } from "react";
import axios from "axios"
 
function App() {
 
  const [students, setStudents] = useState([]);
 
  const [name, setName] = useState("");
   const [course, setCourse] = useState("");
     const [age, setAge] = useState("");
 
  const [editingid, setEditingid] = useState(null);
 
     const editStudent =(student) =>{
      setEditingid(student._id);
      setName(student.name);
      setCourse(student.course);
      setAge(student.age);
 
     }
 
      const updateStudent= () => {
    axios
    .put(`http://localhost:5000/students/${editingid}`,{
    name:name,
      course:course,
      age:age,
 
    })
    .then(() => {
      axios
      .get("http://localhost:5000/students")
      .then((response) =>{
      setStudents(response.data);
 
     });
     setEditingid(null);
      setName("");
      setCourse("");
      setAge("");
 
    });
  }
   
 
  useEffect(() =>{
 
    axios
    .get("http://localhost:5000/students")
    .then((response) =>{
      setStudents(response.data);
    });
 
  }, []);
 
  const addStudent = () => {
    axios
    .post("http://localhost:5000/students",{
      name:name,
      course:course,
      age:age,
 
    })
    .then((response)=>{
      setStudents([...students, response.data]);
      setName("");
      setCourse("");
      setAge("");
    })
  }
 
  const deleteStudent = (id) => {
    axios
    .delete(`http://localhost:5000/students/${id}`)
    .then(() => {
      axios
      .get("http://localhost:5000/students")
      .then((response) =>{
      setStudents(response.data);
 
     })
    })
   
  }
 
 
  return(
    <div>
      <h1>Student Management System</h1>
 
      <h2>Add Student</h2>
 
     
 
     <input placeholder="Name" value={name} onChange={(event)=>setName(event.target.value)} />
       <br /><br />
 
       <input placeholder="Course" value={course} onChange={(event)=>setCourse(event.target.value)}  />
       <br /><br />
 
       <input placeholder="Age" value={age} onChange={(event)=>setAge(event.target.value)}  />
 
      <button onClick={addStudent}>Add Student</button>
           <button onClick={updateStudent}>Update Student</button>
     
 
      <h2>Students</h2>
     
 
       {students.map((student) =>(
        <div key={student._id}>
          <p>Name: {student.name}</p>
          <p>Course: {student.course}</p>
          <p>Age: {student.age}</p>
          <button onClick={() => deleteStudent(student._id)}>Delete</button>
          <button onClick={() => editStudent(student)}>Edit</button>
        </div>
      ))}
 
 
    </div>
  )
}
 
export default App;
