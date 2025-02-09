import { stepOne } from "./steps/step1.js";
import { stepTwo } from "./steps/step2.js";
import { stepThree } from "./steps/step3.js";
import { stepFour } from "./steps/step4.js";

export function getCurrentStep(step) {
    switch (step) {
        case 1:
            return stepOne;
        case 2:
            return stepTwo;
        case 3:
            return stepThree;
        case 4:
            return stepFour;
        default:
            return null;
    }
}
