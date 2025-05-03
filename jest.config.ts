import type {Config} from 'jest';

const conf: Config ={
    transform: {'^.+\\.ts?$': 'ts-jest'},
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts','tsx','js','json','node'],
    testMatch:['**/tests/**/*.test.ts']
}

export default conf;
