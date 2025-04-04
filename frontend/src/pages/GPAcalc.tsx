import React, { useState } from 'react'

const GPAcalc: React.FC = () =>{
    // Create variables and methods to store user inputs
    const [courseID, setCourseID] = useState("");
    const [courseName, setCourseName] = useState("");
    const [policy, setPolicy] = useState([{name: "", weightage: 0, grade: 0}]);
    const [courseGrade, setCourseGrade] = useState(0);
    const [courseGPA, setCourseGPA] = useState(0);
    const [msg, setMsg] = useState("");
    
    const GPAcalculation =()=>{
        // Call input validation function to check for invalid/exceptional inputs
        if(!checkInputs()){
            return;
        }

        //Add up the grade*weightage to get the final grade
        const gradeFin = policy.reduce((sum,pol) => sum+(pol.grade*pol.weightage)/100,0);
        setCourseGrade(gradeFin);

        //Depending on the final grade, display GPA.
        let gpaFin = 0;
        if(gradeFin >= 93){
            gpaFin = 4.0;
            setMsg("Truly the greatest in this course.");
        }
        else if(gradeFin >= 90){
            gpaFin = 3.67;
            setMsg("One more push for that 4.0 and you are set!");
        }
        else if(gradeFin >= 87){
            gpaFin = 3.33;
            setMsg("You are one step closer to excellence.");
        }
        else if(gradeFin >= 83){
            gpaFin = 3.0;
            setMsg("This is great. Can you perform better though?");
        }
        else if(gradeFin >= 80){
            gpaFin = 2.67;
            setMsg("You are really one tough and determined student. Keep it going.")
        }
        else if(gradeFin >= 77){
            gpaFin = 2.33;
            setMsg("I see you put a bit more effort than average.");
        }
        else if(gradeFin >= 73){
            gpaFin = 2.0;
            setMsg("You made it to the skin of your teeth.");
        }
        else if(gradeFin >= 70){
            gpaFin = 1.67;
            setMsg("Please get yourself to the finish line!");
        }
        else{
            gpaFin = 0.0;
            setMsg("God Gives His Toughest Battles To His Strongest Soldiers. Prove again you are one of them.");
        }
        
        // Set the final GPA
        setCourseGPA(gpaFin);
        
    };

    // Reset all inputs of all fields
    const resetInputs =()=>{
        setCourseID("");
        setPolicy([{name:"", weightage:0, grade: 0}]);
        setCourseGPA(0);
        setCourseGrade(0);
        setCourseName("");
    }

    // Add new blank fields for a policy
    const newPolicy=()=>{
        if(policy.length < 5){
            setPolicy([...policy, {name: "", weightage: 0, grade: 0}]);
        }
    };

    // Remove fields of a policy
    const removePolicy=()=>{
        if(policy.length > 1){
            setPolicy(policy.slice(0,-1));
        }
    }

    // Update changes of input when policy fields are typed
    const handleChange =(i: number, field: string, value: number|string)=>{
        const pol = [...policy]; 
        pol[i] = {...pol[i], [field]:value};
        setPolicy(pol)
    }

    // Check all inputs
    const checkInputs=()=>{
        // If any of the fields are blank
        if(courseID.trim() === "" || courseName.trim() === "" || policy.some((pol) => pol.name.trim() === "")){
            setMsg("Error: You must have left some fields empty!");
            return false;
        }
        // If policy length is not in range
        if(policy.some(p => p.name.length < 1 || p.name.length > 15)){
            setMsg("Error: Your policy must be in length between 1 to 15.");
            return false;
        }

        // If courseID is not a 4 digit integer
        if(!/^\d{4}$/.test(courseID)){
            setMsg("Error: Your course ID must be a 4 digit integer!");
            return false;
        }
        // if course name length is not in range
        if(courseName.length < 1 || courseName.length > 15){
            setMsg("Error: Your course name must be in length between 1 to 15.");
            return false;
        }

         //Add up the weightage of every policy, check if they add up to 100
        const weight = policy.reduce((sum,pol) => sum + Number(pol.weightage),0);
        if (weight !== 100){
            setMsg("Error: Total weightage needs to add up to 100. ");
            return false;
        }

        //check every policy's grade and weightage to see if they are in range
        for (const p of policy){
            if(p.weightage < 0 || p.weightage > 100){
                setMsg("Error: Weightage must be in range of 0 to 100. Also input must solely be integer...");
                return false
            }
            if(p.grade < 0 || p.grade > 100){
                setMsg("Error: Grade must be in range of 0 to 100. Also input must solely be integer...");
                return false;
            }
        }

        // return true if every check is passed
        return true;
    }

    return (
        <div>
            {/* Heading texts */}
            <span className='heading'>GPA CALCULATOR</span> 
            <h2>Enter your course ID, name, and up to 5 policies</h2>
            <input 
            type="input"
            placeholder='Course ID'
            className='input_box'
            value={courseID}
            onChange={(e) => setCourseID(e.target.value)}
            />

            {/* input boxes */}
            <input 
            type="input"
            placeholder='Course Name'
            className='input_box'
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            />
            {policy.map((pol,i)=>(
                <div key={i}>
                    <input 
                    type="input"
                    placeholder='Policy Name'
                    className='input_box'
                    value={pol.name}
                    onChange={(e) => handleChange(i,"name",e.target.value)}
                    />
                    <input 
                    type="number"
                    placeholder='Weightage (0% to 100%)'
                    className='input_box'
                    value={pol.weightage === 0 ? "": pol.weightage}
                    onChange={(e) => handleChange(i,"weightage",Number(e.target.value))}
                    />
                    <input 
                    type="decimal"
                    placeholder='Grade (0 to 100)'
                    className='input_box'
                    value={pol.grade === 0 ? "": pol.grade}
                    onChange={(e) => handleChange(i,"grade",Number(e.target.value))}
                    />
                </div>
            ))}
            {/* buttons to add, remove policy, reset inputs, and ccalculate GPA */}
            <button
            onClick={newPolicy}
            disabled={policy.length >= 5}
            className='input_submit'
            >Add Policy</button>
            <button
            onClick={removePolicy}
            disabled={policy.length <= 1}
            className='input_submit'
            >Remove Policy</button>
            <button onClick={GPAcalculation} className='input_submit'>Calculate GPA</button>
            <button onClick={resetInputs} className='input_submit'>Reset fields</button>
            
            {/* Display results */}
            <div>
                
                <h3>Course ID: {courseID}</h3>
                <h3>Course: {courseName} </h3>
                <h2>Course Grade: {courseGrade?.toFixed(1)}</h2>
                <h2>Course GPA: {courseGPA?.toFixed(2)}</h2>
                <div className='message'>{msg}</div>
            </div>
        </div>
      )    
}
  

export default GPAcalc
