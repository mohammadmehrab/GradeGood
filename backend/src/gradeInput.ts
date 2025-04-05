export async function submitCourse(userEmail: string, courseName: any, creditHours: any, grade: any) {

    if(typeof courseName !== "string") {
      return "Invalid type for course name: Course name must be a string"
    }
    
    if(isNaN(creditHours)) {
      return "Invalid type for credit hours: Credit hours must be a number"
    }
  
    if(isNaN(grade)) {
      return "Invalid type for grade: Grade must be a number"
    }
  
    const returnMessage = await validateCourse(courseName, creditHours, grade)
  
    return returnMessage
  
    async function validateCourse(courseName: string, creditHours: number, grade: number): Promise<string> {
  
      if(courseName.length < 1 || courseName.length > 20) {
        return "Invalid length for course name: Course name must be between 1 and 20 characters"
      }
    
      if(creditHours <= 0 || creditHours >= 8) {
        return "Invalid number for credit hours: Credit hours must be greater than 0 and less than 8"
      }
  
      if(grade < 0 || grade > 100) {
        return "Invalid number for grade: Grade must be between 0 and 100"
      }
      
      let userId: number;
  
      try {
        console.log(userEmail)
        const response = await fetch(`http://localhost:3000/users?email=${userEmail}`, {
            method: 'GET'
        })

        const userObject = await response.json()

        userId = userObject.id
  
      } catch (err) {
        return "There was an error getting the user"
      }




      try {
        await fetch('http://localhost:3000/courses/', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
              name: courseName,
              creditHours: creditHours,
              grade: grade,
              userId: userId
            })
          })
    
        return "Course has been inputted into the database"
      } catch(err) {
        return "There was an error inserting the course into the database"
      }
  
    }
  
  }