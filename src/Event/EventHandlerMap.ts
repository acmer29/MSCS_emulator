import { GIFTED_ATTRIBUTE_IDS, MUTURAL_EXCLUSIVE_ATTRIBUTE_GROUPS } from "../Attribute/AttributeConstants";
import { isInVacation } from "../Utils/Calendar";
import { INITIAL_CODING_VALUE, INITIAL_CODING_VALUE_HIGH, INITIAL_HEALTH_VALUE, INITIAL_HEALTH_VALUE_LOW, INITIAL_INTERVIEW_PROBABILITY, INITIAL_INTERVIEW_PROBABILITY_HIGH, INITIAL_INTERVIEW_PROBABILITY_LOW, INITIAL_STUDY_VALUE, INITIAL_STUDY_VALUE_HIGH, INITIAL_STUDY_VALUE_LOW, PlayerStatus } from "../Player/PlayerConstants";
import { SUMMER_I_ROUNDS } from "../Game/RoundConstants";
import { Player } from "../Player/Player";
import { getNormalDistributedInt, getRandomInt } from "../Utils/Rng";
import { CONDITION_FALSE, CONDITION_TRUE } from "../Utils/SimpleTemplateRender";

const DEFAULT_EMPTY_MAP: Map<string, string> = new Map<string, string>();

export const EVENT_HANDLER_MAP = new Map<number, (player: Player, context: any) => Map<string, string>>([
    [0, handler0],
    [1, handler1],
    [2, handler2],
    [3, handler3],
    [4, handler4],
    [5, noopHandler],
    [6, handler6],
    [7, handler7],
    [8, handler8],
    [9, handler9],
    [10, handler10],
    [11, handler11],
    [12, handler12],
    [13, handler13],
    [14, handler14],
    [15, handler15],
    [16, handler16],
    [17, handler17],
    [18, handler18],
    [19, handler19],
    [20, handler20],
    [21, handler21],
    [22, handler22],
    [23, handler23],
    [24, noopHandler],
    [25, handler25],
    [26, handler26],
    [27, handler27],
    [28, handler28],
    [29, noopHandler],
    [30, handler30],
    [31, handler31],
    [32, noopHandler],
    [33, handler33],
    [34, handler34],
    [35, handler35],
    [36, noopHandler],
    [37, handler37],
    [38, handler38],
    [39, handler39],
    [40, handler40],
    [41, handler41],
    [42, handler42],
    [43, handler43],
    [44, handler44],
    [45, noopHandler],
    [46, handler46],
    [47, handler47],
    [48, handler48],
    [100, noopHandler],
    [101, handler101],
    [102, handler102],
    [200, noopHandler],
    [307, noopHandler],
    [308, noopHandler],
    [500, handler500],
    [501, noopHandler],
    [502, noopHandler],
    [503, noopHandler],
    [504, handler504],
]);

export function noopHandler(player: Player): Map<string, string> {
    player.maintain();
    return DEFAULT_EMPTY_MAP;
}

function handler0(player: Player): Map<string, string> {
    // Normal Event handler.
    if (player.attributeIds.includes(10) && SUMMER_I_ROUNDS.includes(player.round)) {
        player.assignAttribute([11]);
    }
    player.maintain();
    return DEFAULT_EMPTY_MAP;
}

function handler1(player: Player): Map<string, string> {
    // Event handler 1 - Study.
    player.modifyParameter("study", 2, 1);
    player.modifyParameter("coding", -1, 1);
    player.modifyParameter("health", -1, 1);
    player.maintain();
    return DEFAULT_EMPTY_MAP;
}

function handler2(player: Player): Map<string, string> {
    // Event handler 2 - Send resume.
    player.modifyParameter("coding", -1, 2);
    player.modifyParameter("health", -1, 2);
    // From 0 boost to initial value in the first send.
    if (player.parameter.interviewProbability == 0) {
        let attributesIds: number[] = player.attributeIds;
        let toSet = attributesIds.includes(9) ? 
        INITIAL_INTERVIEW_PROBABILITY_HIGH : 
        attributesIds.includes(7) ? 
            INITIAL_INTERVIEW_PROBABILITY : 
            INITIAL_INTERVIEW_PROBABILITY_LOW;
        player.parameter.interviewProbability = toSet;
    } else {
        player.modifyParameter("interview", 1, 2);
    }
    player.maintain();
    return DEFAULT_EMPTY_MAP;
}

function handler3(player: Player): Map<string, string> {
    // Event handler 3 - Coding.
    player.modifyParameter("coding", 3, 3);
    player.modifyParameter("health", -2, 3);
    player.maintain();
    return DEFAULT_EMPTY_MAP;
}

function handler4(player: Player): Map<string, string> {
    // Event handler 4 - Slack off.
    player.modifyParameter("coding", -2, 4);
    player.modifyParameter("health", 5, 4);
    player.maintain();
    return DEFAULT_EMPTY_MAP;
}

function handler6(player: Player): Map<string, string> {
    // Event handler 6 - Take final.
    // Generate 3 random numbers, under normal distribution, mean equals to study, stddev = 5,
    // and get the average.
    let score: number = 0;
    let subjects: string[] = [];
    for (let i = 0; i < 3; ++i) {
        let tmp: number = getNormalDistributedInt(player.parameter.study,/* stddev= */ 5);
        if (tmp < 0) {
            tmp = Math.abs(tmp);
        }
        if (tmp > 100) {
            tmp = 100;
        }
        subjects.push(tmp.toString());
        score += tmp;
    }
    score /= 3;
    console.log("final score is " + score);
    let grade: string = "F";
    if (score >= 95) {
        player.modifyParameter("health", 5, 6);
        grade = "A";
    } else if (score >= 80) {
        player.modifyParameter("health", 2, 6);
        grade = "A-";
    } else if (score >= 75) {
        grade = "B";
    } else if (score >= 60) {
        player.modifyParameter("health", -2, 6);
        grade = "C";
    }
    player.parameter.scores.push(grade);
    // After the final it's a fresh start.
    player.parameter.study = player.attributeIds.includes(4) ? INITIAL_STUDY_VALUE_HIGH : player.attributeIds.includes(5) ? INITIAL_STUDY_VALUE : INITIAL_STUDY_VALUE_LOW;
    let tokens: Map<string, string> = new Map<string, string>([
        ["subject1", subjects[0]],
        ["subject2", subjects[1]],
        ["subject3", subjects[2]],
        ["grade", grade],
    ]);
    player.maintain();
    return tokens
}

function handler7(player: Player): Map<string, string> {
    // Event handler 7: Preliminary interview & Internship interview request.
    let beforeSummer1: boolean = SUMMER_I_ROUNDS.filter((round) => player.round >= round).length == 0;
    let companyName: string = player.companyNameHelper.getNextName("A nameless company");
    player.companyNameHelper.registerName(player.eventNum, companyName);
    let tokens: Map<string, string> = new Map<string, string>([
        ["intern", beforeSummer1 ? CONDITION_TRUE : CONDITION_FALSE],
        ["companyName", companyName],
    ]);
    player.maintain();
    return tokens
}

function handler8(player: Player): Map<string, string> {
    // Event handler 8: Preliminary interview.
    let res: number = getRandomInt(100) <= player.parameter.coding ? 9 : 10;
    // This is a click event, the company name must registered in the last event - handler7.
    let context: number = player.eventNum - 1;
    let companyName: string = player.companyNameHelper.retrieveName(context)!;
    player.roundResultEventQueue.push([player.round + 1, res, context]);
    let tokens: Map<string, string> = new Map<string, string>([
        ["companyName", companyName],
    ]);
    player.modifyParameter("health", -2, 8);
    player.maintain();
    return tokens
}

function handler9(player: Player, context: any): Map<string, string> {
    // Event handler 9: Preliminary interview passed.
    let res: number = getRandomInt(2) % 2 ? 11 : 12;
    let companyName: string = player.companyNameHelper.retrieveName(context)!;
    player.roundResultEventQueue.push([player.round + 1, res, context]);
    let tokens: Map<string, string> = new Map<string, string>([
        ["companyName", companyName],
    ]);
    player.modifyParameter("health", 5, 9);
    player.maintain();
    return tokens
}

function handler10(player: Player, context: any): Map<string, string> {
    // Event handler 10: Preliminary interview rejected.
    let companyName: string = player.companyNameHelper.retrieveName(context)!;
    let tokens: Map<string, string> = new Map<string, string>([
        ["companyName", companyName],
    ]);
    player.modifyParameter("health", -5, 10);
    player.maintain();
    return tokens
}

function handler11(player: Player, context: any): Map<string, string> {
    // Event handler 11: Onsite interview request.
    let companyName: string = player.companyNameHelper.retrieveName(context)!;
    let tokens: Map<string, string> = new Map<string, string>([
        ["companyName", companyName],
    ]);
    player.companyNameHelper.registerName(player.eventNum, companyName);
    player.modifyParameter("health", -5, 10);
    player.maintain();
    return tokens
}

function handler12(player: Player, context: any): Map<string, string> {
    // Event handler 12: Onsite interview aborted.
    let companyName: string = player.companyNameHelper.retrieveName(context)!;
    let tokens: Map<string, string> = new Map<string, string>([
        ["companyName", companyName],
    ]);
    player.modifyParameter("health", -5, 12);
    player.maintain();
    return tokens
}

function handler13(player: Player): Map<string, string> {
    // Event handler 13: Onsite interview confirmed.
    // Event 13 is a click event after event 11, so last eventNum should be event 11.
    let context: number = player.eventNum - 1;
    player.roundResultEventQueue.push([player.round + 2, 14, context]);
    player.modifyParameter("health", 2, 13);
    player.maintain();
    return DEFAULT_EMPTY_MAP;
}

function handler14(player: Player, context: any): Map<string, string> {
    // Evnet handler 14: Onsite interview.
    // Five random number for five rounds.
    let performance: number[] = [
        getRandomInt(100), getRandomInt(100), getRandomInt(100), getRandomInt(100), getRandomInt(100)];
    let hire = performance.filter((score) => score <= player.parameter.coding).length;
    let res = hire >= 4 ? 18 : hire <= 1 ? 19 : 15;
    player.roundResultEventQueue.push([player.round + 1, res, context]);
    let companyName: string = player.companyNameHelper.retrieveName(context)!;
    let tokens: Map<string, string> = new Map<string, string>([
        ["companyName", companyName],
    ]);
    player.modifyParameter("health", -5, 14);
    player.maintain();
    return tokens
}

function handler15(player: Player, context: any): Map<string, string> {
    // Event handler 15: Onsite interview additional rounds needed.
    let companyName: string = player.companyNameHelper.retrieveName(context)!;
    let tokens: Map<string, string> = new Map<string, string>([
        ["companyName", companyName],
    ]);
    player.companyNameHelper.registerName(player.eventNum, companyName);
    player.modifyParameter("health", -5, 14);
    player.maintain();
    return tokens
}

function handler16(player: Player): Map<string, string> {
    // Event 16: Addtional onsite confirmed.
    // Event 16 is a click event after event 15, so last eventNum should be event 15.
    let context: number = player.eventNum - 1;
    let companyName: string = player.companyNameHelper.retrieveName(context)!;
    let tokens: Map<string, string> = new Map<string, string>([
        ["companyName", companyName],
    ]);
    player.roundResultEventQueue.push([player.round + 1, 17, context]);
    player.modifyParameter("health", -1, 16);
    player.maintain();
    return tokens
}

function handler17(player: Player, context: any): Map<string, string> {
    // Event 17: Additional onsite.
    // Four random number as it produce more managable result than two.
    let performance: number[] = [getRandomInt(100), getRandomInt(100), getRandomInt(100), getRandomInt(100)];
    let hire = performance.filter((score) => score <= player.parameter.coding).length;
    let res = hire >= 3 ? 18 : hire <= 1 ? 19 : 15;
    let companyName: string = player.companyNameHelper.retrieveName(context)!;
    let tokens: Map<string, string> = new Map<string, string>([
        ["companyName", companyName],
    ]);
    player.roundResultEventQueue.push([player.round + 1, res, context]);
    player.modifyParameter("health", -2, 17);
    player.maintain();
    return tokens
}

function handler18(player: Player, context: any): Map<string, string> {
    // Event 18: Onsite passed.
    player.modifyParameter("health", 10, 18);
    player.assignAttribute([13]);
    let companyName: string = player.companyNameHelper.retrieveName(context)!;
    let tokens: Map<string, string> = new Map<string, string>([
        ["companyName", companyName],
    ]);
    player.maintain();
    return tokens
}

function handler19(player: Player, context: any): Map<string, string> {
    // Event 19: Onsite failed.
    player.modifyParameter("health", -10, 18);
    let companyName: string = player.companyNameHelper.retrieveName(context)!;
    let tokens: Map<string, string> = new Map<string, string>([
        ["companyName", companyName],
    ]);
    player.maintain();
    return tokens
}

function handler20(player: Player): Map<string, string> {
    // Event 20: Summer intern working.
    let workAffect: number = Math.min(getRandomInt(20) + 5, 20);
    player.modifyParameter("working", workAffect, 20);
    player.modifyParameter("health", -2, 20);
    let tokens: Map<string, string> = new Map<string, string>([
        ["normalWork", workAffect >= 10 && workAffect <= 13 ? CONDITION_TRUE : CONDITION_FALSE],
        ["highWork", workAffect > 13 ? CONDITION_TRUE : CONDITION_FALSE]
    ]);
    player.maintain();
    return tokens
}

function handler21(player: Player): Map<string, string> {
    // Event 21: Summer intern interview.
    // Event 21 is a click event after event 7, so last eventNum should be event 7.
    let context: number = player.eventNum - 1;
    let companyName: string = player.companyNameHelper.retrieveName(context)!;
    let tokens: Map<string, string> = new Map<string, string>([
        ["companyName", companyName],
    ]);
    let res: number = getRandomInt(100) <= player.parameter.coding ? 22 : 23;
    player.modifyParameter("health", -2, 8);
    player.roundResultEventQueue.push([player.round + 1, res, context]);
    player.maintain();
    return tokens
}

function handler22(player: Player, context: any): Map<string, string> {
    // Event handler 22: Internship interview passed.
    let companyName: string = player.companyNameHelper.retrieveName(context)!;
    let tokens: Map<string, string> = new Map<string, string>([
        ["companyName", companyName],
    ]);
    player.modifyParameter("health", 8, 9);
    player.internOffers.push(companyName);
    player.assignAttribute([10]);
    player.maintain();
    return tokens
}

function handler23(player: Player, context: any): Map<string, string> {
    // Event handler 23: Inernship interview rejected.
    let companyName: string = player.companyNameHelper.retrieveName(context)!;
    let tokens: Map<string, string> = new Map<string, string>([
        ["companyName", companyName],
    ]);
    player.modifyParameter("health", -5, 10);
    player.maintain();
    return tokens
}

function handler25(player: Player): Map<string, string> {
    // Event handler 25: Demo the project.
    let probability: number = getRandomInt(100);
    let workingFinal: number = Math.min(player.parameter.working, 85);
    let tokens: Map<string, string> = new Map<string, string>([
        ["highWork", player.parameter.working >= 80 ? CONDITION_TRUE : CONDITION_FALSE]
    ]);
    let context = player.internOffers[0];
    player.roundResultEventQueue.push([player.round + 1, probability <= workingFinal ? 27 : 28, context]);
    player.modifyParameter("health", player.parameter.working >= 80 ? 5: 2, 25);
    player.maintain();
    return tokens
}

function handler26(player: Player): Map<string, string> {
    // Event handler 26: Didn't demo.
    let probability: number = getRandomInt(100);
    let workingFinal: number = Math.min(player.parameter.working, 20);
    let tokens: Map<string, string> = new Map<string, string>([
        ["highWork", player.parameter.working >= 80 ? CONDITION_TRUE : CONDITION_FALSE]
    ]);
    let context = player.internOffers[0];
    player.roundResultEventQueue.push([player.round + 1, probability <= workingFinal ? 27 : 28, context]);
    player.modifyParameter("health", player.parameter.working >= 80 ? 0 : -3, 26);
    player.maintain();
    return tokens
}

function handler27(player: Player): Map<string, string> {
    // Event handler 27: Return offer.
    let companyName: string = player.internOffers[0];
    let tokens: Map<string, string> = new Map<string, string>([
        ["companyName", companyName]
    ]);
    player.assignAttribute([12]);
    player.maintain();
    return tokens
}

function handler28(player: Player): Map<string, string> {
    // Event handler 28: Return offer rejected.
    let companyName: string = player.internOffers[0];
    let tokens: Map<string, string> = new Map<string, string>([
        ["companyName", companyName]
    ]);
    player.modifyParameter("health", -3, 28);
    player.maintain();
    return tokens
}

function handler30(player: Player): Map<string, string> {
    // Event handler 30: Join career fair.
    player.modifyParameter("interview", 10, 30);
    let tokens: Map<string, string> = new Map<string, string>([
        ["goodSchool", player.attributeIds.includes(4) ? CONDITION_TRUE : CONDITION_FALSE],
        ["badSchool", player.attributeIds.includes(6) ? CONDITION_TRUE : CONDITION_FALSE],
        ["goodPlace", player.attributeIds.includes(9) ? CONDITION_TRUE : CONDITION_FALSE],
    ]);
    player.maintain();
    return tokens
}

function handler31(player: Player): Map<string, string> {
    // Event handler 31: Did not join career fair.
    let tokens: Map<string, string> = new Map<string, string>([
        ["goodPlace", player.attributeIds.includes(9) ? CONDITION_TRUE : CONDITION_FALSE],
    ]);
    player.maintain();
    return tokens
}

function handler33(player: Player): Map<string, string> {
    // Event handler 33: Join the group study.
    player.modifyParameter("study", 8, 31);
    player.maintain();
    return DEFAULT_EMPTY_MAP;
}

function handler34(player: Player): Map<string, string> {
    // Event handler 33: Reject the group study 1.
    player.modifyParameter("health", 2, 34);
    player.maintain();
    return DEFAULT_EMPTY_MAP;
}

function handler35(player: Player): Map<string, string> {
    // Event handler 33: Reject the group study 2.
    player.modifyParameter("health", -2, 34);
    player.maintain();
    return DEFAULT_EMPTY_MAP;
}

function handler37(player: Player): Map<string, string> {
    // Event handler 37: Cheat in assignment.
    let cheatSuccess: boolean = false;
    if (player.attributeIds.includes(4)) {
        cheatSuccess = getRandomInt(100) >= 80 ? true : false;
    } else if (player.attributeIds.includes(6)) {
        cheatSuccess = getRandomInt(100) >= 20 ? true : false;
    } else {
        cheatSuccess = getRandomInt(100) >= 50 ? true : false;
    }
    let highStudy: boolean = player.parameter.study >= 90;

    if (cheatSuccess) {
        player.modifyParameter("study", 8, 37);
    } else {
        if (highStudy) {
            player.modifyParameter("study", 8, 37);
            player.modifyParameter("health", -2, 37);
        } else {
            player.modifyParameter("study", -5, 37);
            player.modifyParameter("health", -3, 37);
        }
    }

    let tokens: Map<string, string> = new Map<string, string>([
        ["cheatSuccess", cheatSuccess ? CONDITION_TRUE : CONDITION_FALSE],
        ["highStudy", highStudy ? CONDITION_TRUE : CONDITION_FALSE],
    ]);
    player.maintain();
    return tokens
}

function handler38(player: Player): Map<string, string> {
    // Event handler 38: Teammate sucks in presentation.
    let highStudy: boolean = player.parameter.study >= 85;
    if (highStudy) {
        player.modifyParameter("study", 2, 38);
    } else {
        player.modifyParameter("study", -2, 38);
        player.modifyParameter("health", -2, 38);
    }

    let tokens: Map<string, string> = new Map<string, string>([
        ["highStudy", highStudy ? CONDITION_TRUE : CONDITION_FALSE],
    ]);
    player.maintain();
    return tokens
}

function handler39(player: Player): Map<string, string> {
    // Event handler 39: You suck in presentation.
    player.modifyParameter("study", -2, 39);
    player.modifyParameter("health", -2, 39)
    player.maintain();
    return DEFAULT_EMPTY_MAP;
}

function handler40(player: Player): Map<string, string> {
    // Event handler 40: Submitted assigment with wrong file.
    let highStudy: boolean = player.parameter.study >= 85;
    if (highStudy) {
        player.modifyParameter("health", -2, 40);
    } else {
        player.modifyParameter("study", -4, 40);
        player.modifyParameter("health", -4, 40);
    }
    let tokens: Map<string, string> = new Map<string, string>([
        ["highStudy", highStudy ? CONDITION_TRUE : CONDITION_FALSE],
    ]);
    player.maintain();
    return tokens
}

function handler41(player: Player): Map<string, string> {
    // Event handler 41: Social.
    let nerd: boolean = player.attributeIds.includes(14);
    let social: boolean = player.attributeIds.includes(15);
    if (nerd) {
        player.modifyParameter("health", -3, 41);
    } else if (social) {
        player.modifyParameter("health", 3, 41);
    } else {
        player.modifyParameter("health", 1, 41);
    }
    let tokens: Map<string, string> = new Map<string, string>([
        ["nerd", nerd ? CONDITION_TRUE : CONDITION_FALSE],
        ["social", social ? CONDITION_TRUE : CONDITION_FALSE]
    ]);
    player.maintain();
    return tokens
}

function handler42(player: Player): Map<string, string> {
    // Event handler 42: Insomina.
    let inSemester: boolean = !isInVacation(player.round);
    let inWork: boolean = isInVacation(player.round) && player.attributeIds.includes(11);
    let inRest: boolean = !inSemester && !inWork;
    if (inSemester || inWork) {
        player.modifyParameter("health", -2, 42);
    } else {
        player.modifyParameter("health", -1, 42);
    }
    let tokens: Map<string, string> = new Map<string, string>([
        ["inSemester", inSemester ? CONDITION_TRUE : CONDITION_FALSE],
        ["inWork", inWork ? CONDITION_TRUE : CONDITION_FALSE],
        ["inRest", inRest ? CONDITION_TRUE : CONDITION_FALSE],
    ]);
    player.maintain();
    return tokens
}

function handler43(player: Player): Map<string, string> {
    // Event handler 43: Eat outside.
    // Well, though contradicted to truth, let's make it a positive-inclining event.
    let rand: number = getRandomInt(10);
    if (rand >= 3) {
        player.modifyParameter("health", 3, 43);
    } else {
        player.modifyParameter("health", -3, 43);
    }
    let tokens: Map<string, string> = new Map<string, string>([
        ["eatGood", rand >= 3 ? CONDITION_TRUE : CONDITION_FALSE],
    ]);
    player.maintain();
    return tokens
}

function handler44(player: Player): Map<string, string> {
    // Event handler 44: Rumor of someone got piped.
    player.modifyParameter("health", -1, 44);
    player.maintain();
    return DEFAULT_EMPTY_MAP;
}

function handler46(player: Player): Map<string, string> {
    // Event handler 46: Script nuked the prod env.
    player.modifyParameter("health", -3, 46);
    player.modifyParameter("work", -5, 46);
    player.maintain();
    return DEFAULT_EMPTY_MAP;
}

function handler47(player: Player): Map<string, string> {
    // Event handler 47: Join the weekly coding contest.
    let goodRank: boolean = getNormalDistributedInt(player.parameter.coding, 5) >= 60;
    if (goodRank) {
        player.modifyParameter("health", 1, 47);
        player.modifyParameter("coding", 4, 47);
    } else {
        player.modifyParameter("coding", 2, 47);
    }
    let tokens: Map<string, string> = new Map<string, string>([
        ["goodRank", goodRank ? CONDITION_TRUE : CONDITION_FALSE],
    ]);
    player.maintain();
    return tokens
}

function handler48(player: Player): Map<string, string> {
    // Event handler 48: Grade released on home assignment.
    let grade = getRandomInt(100);
    let goodGrade: boolean = grade <= player.parameter.study;
    let badGrade: boolean = grade > player.parameter.study + 10;
    if (goodGrade) {
        player.modifyParameter("health", 2, 48);
        player.modifyParameter("study", 4, 48);
    } else if (!badGrade) {
        player.modifyParameter("health", 1, 48);
        player.modifyParameter("study", 2, 48);
    } else {
        player.modifyParameter("health", -1, 48);
        player.modifyParameter("study", -1, 48);
    }
    let tokens: Map<string, string> = new Map<string, string>([
        ["goodGrade", goodGrade ? CONDITION_TRUE : CONDITION_FALSE],
        ["badGrade", badGrade ? CONDITION_TRUE : CONDITION_FALSE],
    ]);
    player.maintain();
    return tokens
}

function handler101(player: Player): Map<string, string> {
    // Event handler 101 - Commencing event 1: Assign initial attributes.
    let giftIdCount = getRandomInt(3) + 1;
    let giftIds: number[] = [];
    while (giftIds.length < giftIdCount) {
        let candidate: number = GIFTED_ATTRIBUTE_IDS[getRandomInt(GIFTED_ATTRIBUTE_IDS.length)];
        let canPush: boolean = true;
        for (let id of giftIds) {
            for (let attributeGroup of MUTURAL_EXCLUSIVE_ATTRIBUTE_GROUPS) {
                if (attributeGroup.includes(candidate) && attributeGroup.includes(id)) {
                    canPush = false;
                    break;
                }
            }
            if (!canPush) {
                break;
            }
        }
        if (canPush) {
            giftIds.push(candidate);
        }
    }
    giftIds.sort((lhs, rhs) => {return lhs - rhs;});
    player.assignAttribute(giftIds);
    return DEFAULT_EMPTY_MAP;
}

function handler102(player: Player): Map<string, string> {
    // Event handler 102 - Reflect gift attribute to parameters.
    let giftIds: number[] = player.attributeIds;
    player.parameter.coding = giftIds.includes(0) ? INITIAL_CODING_VALUE_HIGH : INITIAL_CODING_VALUE;
    player.parameter.health = giftIds.includes(2) ? INITIAL_HEALTH_VALUE : INITIAL_HEALTH_VALUE_LOW;
    player.parameter.health += giftIds.includes(7) ? 5 : 0;
    player.parameter.study = giftIds.includes(4) ? INITIAL_STUDY_VALUE_HIGH : giftIds.includes(5) ? INITIAL_STUDY_VALUE : INITIAL_STUDY_VALUE_LOW;
    player.parameter.interviewProbability = 0;
    return DEFAULT_EMPTY_MAP;
}

function handler500(player: Player): Map<string, string> {
    // Event handler 500 - Game over 0.
    player.status = PlayerStatus.DIDNT_START;
    return DEFAULT_EMPTY_MAP;
}

function handler504(player: Player): Map<string, string> {
    // Event handler 504 - Game over 5.
    player.status = PlayerStatus.FINAL_ABSENT;
    return DEFAULT_EMPTY_MAP;
}