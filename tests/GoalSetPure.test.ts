import {checkInputs} from "./GoalSetPure";

describe("Goal Setting Success", () =>{
    test("Successfully calculate GPA and graph",()=>{
        const res = checkInputs("3354", "Software Engineer", 90)

        expect(res).toBe(true);
    });
});

describe("Goal Setting Failed", () =>{
    test("Failed GPA and graph generation with Invalid Goal Grade",()=>{
        const res = checkInputs("3354", "Software Engineer", 900)

        expect(res).toBe("Error: Goal must be in a range of 0 to 100.");
    });

    test("Failed GPA and graph generation with Exceptional Goal Grade",()=>{
        const res = checkInputs("3354", "Software Engineer", -90)

        expect(res).toBe("Error: Goal must be in a range of 0 to 100.");
    });

    test("Failed GPA and graph generation with Invalid Course Name",()=>{
        const res = checkInputs("3354", "Software Engineer or Something Like That", 90)

        expect(res).toBe("Error: Your course name must be in length between 1 to 30.");
    });

    test("Failed GPA and graph generation with Invalid Course ID",()=>{
        const res = checkInputs("33545", "Software Engineer", 90)

        expect(res).toBe("Error: Your course ID must be a 4 digit integer!");
    });

    test("Failed GPA and graph generation with Exceptional Course ID",()=>{
        const res = checkInputs("Three three five four", "Software Engineer", 90)

        expect(res).toBe("Error: Your course ID must be a 4 digit integer!");
    });
});
