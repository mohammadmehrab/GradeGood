type CourseDetails = {
    courseID: string;
    courseName: string;
    goal: number;
}

export function checkInputs(courseID: string, courseName:string, goal: number){
    // If any of the fields are blank
    if (
      courseID.trim() === "" ||
      courseName.trim() === "" ||
      isNaN(goal)
    ) {
      return "Error: You must have left some fields empty!";
    }
    // If courseID is not a 4 digit integer
    if (!/^\d{4}$/.test(courseID)) {
      return "Error: Your course ID must be a 4 digit integer!";
    }
    // if course name length is not in range
    if (courseName.length < 1 || courseName.length > 30) {
      return "Error: Your course name must be in length between 1 to 30.";
    }

    if (goal < 0 || goal > 100){
        return "Error: Goal must be in a range of 0 to 100.";
    }
    // return true if every check is passed
    return true;
  };