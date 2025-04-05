import { submitCourse } from '../backend/src/gradeInput'
import { describe, expect, test } from '@jest/globals'

global.fetch = jest.fn()

describe('Submit Course', () => {
    beforeEach(() => {
        (global.fetch as jest.Mock).mockClear()
    })

    it('should return an error message for invalid course name type', async () => {
        const result = await submitCourse('test@example.com', 123, 3, 85);
        expect(result).toBe('Invalid type for course name: Course name must be a string');
        expect(global.fetch).not.toHaveBeenCalled();
    })

    it('should return an error message for invalid credit hours type', async () => {
        const result = await submitCourse('test@example.com', "CS 3354", "blah", 85);
        expect(result).toBe('Invalid type for credit hours: Credit hours must be a number');
        expect(global.fetch).not.toHaveBeenCalled();
    })

    it('should return an error message for invalid grade type', async () => {
        const result = await submitCourse('test@example.com', "CS 3354", 3, "blah");
        expect(result).toBe('Invalid type for grade: Grade must be a number');
        expect(global.fetch).not.toHaveBeenCalled();
    })

    it('should return an error message for the grade being over 100', async () => {
        const result = await submitCourse('test@example.com', "CS 3354", 3, 120);
        expect(result).toBe('Invalid number for grade: Grade must be between 0 and 100');
        expect(global.fetch).not.toHaveBeenCalled();
    })

    it('should return an error message for the credit hours being >= 8', async () => {
        const result = await submitCourse('test@example.com', "CS 3354", 9, 99);
        expect(result).toBe('Invalid number for credit hours: Credit hours must be greater than 0 and less than 8');
        expect(global.fetch).not.toHaveBeenCalled();
    })

    it('should return an error message for the course name being over 20 characters', async () => {
        const result = await submitCourse('test@example.com', "blhabalhsdflasdfjhsdakjfbsdhkafbasdfasdf", 3, 99);
        expect(result).toBe('Invalid length for course name: Course name must be between 1 and 20 characters');
        expect(global.fetch).not.toHaveBeenCalled();
    })

    it('should return success message if the course was successfully inserted', async () => {
        // Mock successful user fetch
        (global.fetch as jest.Mock).mockResolvedValueOnce({
          ok: true,
          json: jest.fn().mockResolvedValue({ id: 2 }),
        });
        // Mock successful course insertion
        (global.fetch as jest.Mock).mockResolvedValueOnce({
          ok: true,
          json: jest.fn().mockResolvedValue({ message: 'Course created successfully' }),
        });
        const result = await submitCourse('valid@example.com', 'CS 3354', 3, 88);
        expect(result).toBe('Course has been inputted into the database');
        expect(global.fetch).toHaveBeenCalledTimes(2);
        expect(global.fetch).toHaveBeenNthCalledWith(1, 'http://localhost:3000/users?email=valid@example.com', { method: 'GET' });
        expect(global.fetch).toHaveBeenNthCalledWith(2, 'http://localhost:3000/courses/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: 'CS 3354', creditHours: 3, grade: 88, userId: 2 }),
        });
    })



})