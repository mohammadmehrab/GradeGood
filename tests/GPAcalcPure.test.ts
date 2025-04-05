import { GPAcalculation, checkInputs } from './GPAcalcPure';

describe("Calculating GPA", () =>{
    test("Return GPA Calculation",()=>{
        const pol =[
            {name: "Assignments", weightage: 100, grade: 99}
        ];
        const id= "3354";
        const cName="SWE";

        const resultInput = checkInputs(id, cName, pol)
        const resultCalc = GPAcalculation(pol);

        expect(resultInput).toBe(null);
        expect(resultCalc.message).toBe("GPA Successfully Calculated.");
        expect(resultCalc.gpaFin).toBe(4.0);
    });
});

describe("Calculating GPA invalid grade", () =>{
    test("Return GPA Calculation Failed",()=>{
        const pol =[
            {name: "Assignments", weightage: 100, grade: 120}
        ];
        const id= "3354";
        const cName="SWE";

        const resultInput = checkInputs(id, cName, pol)
        const resultCalc = GPAcalculation(pol);
        expect(resultInput).toBe("Error: Grade must be in range of 0 to 100. Also input must solely be integer...");
        if(resultInput === null){
            expect(resultCalc.message).toBe("");
            expect(resultCalc.gpaFin).toBe(0);
        }
    });
});

describe("Calculating GPA exceptional grade", () =>{
    test("Return GPA Calculation Failed",()=>{
        const pol =[
            {name: "Assignments", weightage: 100, grade: -100}
        ];
        const id= "3354";
        const cName="SWE";

        const resultInput = checkInputs(id, cName, pol)
        const resultCalc = GPAcalculation(pol);

        expect(resultInput).toBe("Error: Grade must be in range of 0 to 100. Also input must solely be integer...");
        expect(resultCalc.message).toBe("");
        expect(resultCalc.gpaFin).toBe(0);
    });
});

describe("Calculating GPA invalid weightage", () =>{
    test("Return GPA Calculation Failed",()=>{
        const pol =[
            {name: "Assignments", weightage: 150, grade: 99}
        ];
        const id= "3354";
        const cName="SWE";

        const resultInput = checkInputs(id, cName, pol)
        const resultCalc = GPAcalculation(pol);
        expect(resultInput).toBe("Error: Total weightage needs to add up to 100.");
        if(resultInput === null){
            expect(resultCalc.message).toBe("");
            expect(resultCalc.gpaFin).toBe(0);
        }
    });
});

describe("Calculating GPA invalid weightage grade", () =>{
    test("Return GPA Calculation Failed",()=>{
        const pol =[
            {name: "Assignments", weightage: 150, grade: 120}
        ];
        const id= "3354";
        const cName="SWE";

        const resultInput = checkInputs(id, cName, pol)
        const resultCalc = GPAcalculation(pol);
        expect(resultInput).toBe("Error: Total weightage needs to add up to 100.");
        if(resultInput === null){
            expect(resultCalc.message).toBe("");
            expect(resultCalc.gpaFin).toBe(0);
        }
    });
});

describe("Calculating GPA exceptional weightage", () =>{
    test("Return GPA Calculation Failed",()=>{
        const pol =[
            {name: "Assignments", weightage: -100, grade: 99}
        ];
        const id= "3354";
        const cName="SWE";

        const resultInput = checkInputs(id, cName, pol)
        const resultCalc = GPAcalculation(pol);
        expect(resultInput).toBe("Error: Total weightage needs to add up to 100.");
        if(resultInput === null){
            expect(resultCalc.message).toBe("");
            expect(resultCalc.gpaFin).toBe(0);
        }
    });
});

describe("Calculating GPA invalid policy name", () =>{
    test("Return GPA Calculation Failed",()=>{
        const pol =[
            {name: "Something Big I am Not Sure Hahah", weightage: 100, grade: 99}
        ];
        const id= "3354";
        const cName="SWE";

        const resultInput = checkInputs(id, cName, pol)
        const resultCalc = GPAcalculation(pol);
        expect(resultInput).toBe("Error: Your policy must be in length between 1 to 15.");
        if(resultInput === null){
            expect(resultCalc.message).toBe("");
            expect(resultCalc.gpaFin).toBe(0);
        }
    });
});

describe("Calculating GPA exceptional policy name", () =>{
    test("Return GPA Calculation Failed",()=>{
        const pol =[
            {name: "", weightage: 100, grade: 99}
        ];
        const id= "3354";
        const cName="SWE";

        const resultInput = checkInputs(id, cName, pol)
        const resultCalc = GPAcalculation(pol);
        expect(resultInput).toBe("Error: You must have left some fields empty!");
        if(resultInput === null){
            expect(resultCalc.message).toBe("");
            expect(resultCalc.gpaFin).toBe(0);
        }
    });
});






