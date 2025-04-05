type Policy = {
    name: string;
    weightage: number;
    grade: number;
}

export function checkInputs(courseID: string, courseName:string, policy: Policy[]): string | null{
    // If any of the fields are blank
    if(courseID.trim() === "" || courseName.trim() === "" || policy.some((pol) => pol.name.trim() === "")){
        return "Error: You must have left some fields empty!";
        
    }
    // If policy length is not in range
    if(policy.some(p => p.name.length < 1 || p.name.length > 15)){
        return "Error: Your policy must be in length between 1 to 15.";
    }

    // If courseID is not a 4 digit integer
    if(!/^\d{4}$/.test(courseID)){
        return "Error: Your course ID must be a 4 digit integer!";
    }
    // if course name length is not in range
    if(courseName.length < 1 || courseName.length > 15){
        return "Error: Your course name must be in length between 1 to 15.";
    }
    

     //Add up the weightage of every policy, check if they add up to 100
    const weight = policy.reduce((sum,pol) => sum + Number(pol.weightage),0);
    if (weight !== 100){
        return "Error: Total weightage needs to add up to 100.";
    }

    //check every policy's grade and weightage to see if they are in range
    for (const p of policy){
        if(p.weightage < 0 || p.weightage > 100){
            return "Error: Weightage must be in range of 0 to 100. Also input must solely be integer...";
            
        }
        if(p.grade < 0 || p.grade > 100){
            return "Error: Grade must be in range of 0 to 100. Also input must solely be integer...";
        }
    }

    // return true if every check is passed
    return null;
}

export function GPAcalculation(policy:Policy[]):{gradeFin: number; message: string; gpaFin: number}{

    //Add up the grade*weightage to get the final grade
    const gradeFin = policy.reduce((sum,pol) => sum+(pol.grade*pol.weightage)/100,0);

    //Depending on the final grade, display GPA.
    let gpaFin = 0;
    let message = "";
    if(gradeFin >= 93 && gradeFin <= 100){
        gpaFin = 4.0;
        message = "GPA Successfully Calculated.";
    }
    else if(gradeFin >= 90){
        gpaFin = 3.67;
        message = "GPA Successfully Calculated.";
    }
    else if(gradeFin >= 87){
        gpaFin = 3.33;
        message = "GPA Successfully Calculated.";
    }
    else if(gradeFin >= 83){
        gpaFin = 3.0;
        message = "GPA Successfully Calculated.";
    }
    else if(gradeFin >= 80){
        gpaFin = 2.67;
        message = "GPA Successfully Calculated.";
    }
    else if(gradeFin >= 77){
        gpaFin = 2.33;
        message = "GPA Successfully Calculated.";
    }
    else if(gradeFin >= 73){
        gpaFin = 2.0;
        message = "GPA Successfully Calculated.";
    }
    else if(gradeFin >= 70){
        gpaFin = 1.67;
        message = "GPA Successfully Calculated.";
    }
    else if(gradeFin >= 0){
        gpaFin = 0.0;
        message = "GPA Successfully Calculated.";
        
    }
    else{
        message = "";
    }
    
    // Set the final GPA
    
    return { gradeFin, gpaFin, message}
};
