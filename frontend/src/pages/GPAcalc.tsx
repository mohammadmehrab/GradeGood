import React, { useState } from 'react'

const GPAcalc: React.FC = () =>{
    const [courseID, setCourseID] = useState("");
    const [courseName, setCourseName] = useState("");
    const [policy, setPolicy] = useState([{name: "", weightage: 0, grade: 0}]);
    const [courseGrade, setCourseGrade] = useState<number | null>(null);
    const [courseGPA, setCourseGPA] = useState<number|null>(null);

    const GPAcalculation =()=>{
        const weight = policy.reduce((sum,pol) => sum + Number(pol.weightage),0);
        if (weight !== 100){
            alert("Your weightage needs to add up to be 100% for proper GPA calculation!");
            return;
        }

        const gradeFin = policy.reduce((sum,pol)=> sum+(pol.grade*pol.weightage)/100,0);
        setCourseGrade(gradeFin);

        let gpaFin = 0;
        if(gradeFin >= 93){
            gpaFin = 4.0;
        }
        else if(gradeFin >= 90){
            gpaFin = 3.67;
        }
        else if(gradeFin >= 87){
            gpaFin = 3.33;
        }
        else if(gradeFin >= 83){
            gpaFin = 3.0;
        }
        else if(gradeFin >= 80){
            gpaFin = 2.67;
        }
        else if(gradeFin >= 77){
            gpaFin = 2.33;
        }
        else if(gradeFin >= 73){
            gpaFin = 2.0;
        }
        else if(gradeFin >= 70){
            gpaFin = 1.67;
        }
        else{
            gpaFin = 0.0;
            alert("Put the fries in the bag lil bro");
        }

        setCourseGPA(gpaFin);
    };

    const resetInputs =()=>{
        setCourseID("");
        setPolicy([{name:"", weightage:0, grade: 0}]);
        setCourseGPA(null);
        setCourseGrade(null);
        setCourseName("");
    }

    const newPolicy=()=>{
        if(policy.length < 5){
            setPolicy([...policy, {name: "", weightage: 0, grade: 0}]);
        }
    };

    const removePolicy=()=>{
        if(policy.length > 1){
            setPolicy(policy.slice(0,-1));
        }
    }

    const handleChange =(i: number, field: string, value: number|string)=>{
        const pol = [...policy];
        if(field === "grade" && (Number(value) < 0 || Number(value) > 100)){
            alert("Error: Grade must be in range of 0 to 100");
                return;
        }
        
        pol[i] = {...pol[i], [field]:value};
        setPolicy(pol)
    }

    return (
        <div>
            <span className='heading'>GPA CALCULATOR!!!</span>
            <input 
            type="input"
            placeholder='Course ID'
            className='input_box'
            value={courseID}
            onChange={(e) => setCourseID(e.target.value)}
            />
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


            <div>
                <h3>Course ID: {courseID}</h3>
                <h3>Course: {courseName} </h3>
                <h2>Course Grade: {courseGrade?.toFixed(1)}</h2>
                <h2>Course GPA: {courseGPA?.toFixed(2)}</h2>
            </div>
        </div>
      )    
}
  

export default GPAcalc
