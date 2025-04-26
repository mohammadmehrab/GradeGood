import {daysAndTimeChecks} from './CourseSetUpPure';

describe("Course Set Up Success", () =>{
    test("Successfully added Course Details",()=>{
        const res = daysAndTimeChecks("3:30", "5:30", ["Monday","Tuesday"])

        expect(res).toBe(true);
    });
});

describe("Unable to add Course", () =>{
    test("Add Course Details failed, invalid Time Inputs",()=>{
        const res = daysAndTimeChecks("3:30", "4:00", ["Monday","Tuesday"])
        
        expect(res).toBe(false);
    });

    test("Add Course Details failed, Exceptional Time Inputs",()=>{
        const res = daysAndTimeChecks("3:30", "3:30", ["Monday","Tuesday"])
        
        expect(res).toBe(false);
    });

    test("Add Course Details failed, Invalid Days Inputs",()=>{
        const res = daysAndTimeChecks("3:30", "5:30", ["Monday","Tuesday","Tuesday","Sunday"])
        
        expect(res).toBe(false);
    });

    test("Add Course Details failed, Exceptional Days Inputs",()=>{
        const res = daysAndTimeChecks("3:30", "5:30", [])
        
        expect(res).toBe(false);
    });
});
