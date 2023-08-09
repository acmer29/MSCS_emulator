import { GIFTED_ATTRIBUTE_IDS, MUTURAL_EXCLUSIVE_ATTRIBUTE_GROUPS } from "../Constant/AttributeConstants";
import { INITIAL_CODING_VALUE, INITIAL_CODING_VALUE_HIGH, INITIAL_HEALTH_VALUE, INITIAL_HEALTH_VALUE_LOW, INITIAL_INTERVIEW_PROBABILITY, INITIAL_INTERVIEW_PROBABILITY_HIGH, INITIAL_INTERVIEW_PROBABILITY_LOW, INITIAL_STUDY_VALUE, INITIAL_STUDY_VALUE_HIGH, INITIAL_STUDY_VALUE_LOW, PlayerStatus } from "../Constant/PlayerConstants";
import { SUMMER_I_ROUNDS } from "../Constant/RoundConstants";
import { Player } from "../Player/Player";
import { getNormalDistributedInt, getRandomInt } from "../Utils/Rng";
import { CONDITION_FALSE, CONDITION_TRUE } from "../Utils/SimpleTemplateRender";

export const EVENT_HANDLER_MAP = new Map<number, (player: Player) => Promise<Map<string, string>>>([
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
    [11, noopHandler],
    [12, handler12],
    [13, handler13],
    [14, handler14],
    [15, noopHandler],
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
    [28, noopHandler],
    [100, noopHandler],
    [101, handler101],
    [102, handler102],
    [200, noopHandler],
    [307, noopHandler],
    [308, noopHandler],
    [404, handler404],
    [500, handler500],
    [501, noopHandler],
    [502, noopHandler],
    [503, noopHandler],
    [504, handler504],
]);

export async function noopHandler(player: Player): Promise<Map<string, string>> {
    console.log("Noop event.");
    player.checkVitals();
    player.maintainAttribute();
    return Promise.resolve(new Map<string, string>());
}

async function handler0(player: Player): Promise<Map<string, string>> {
    // Normal Event handler.
    if (player.attributeIds.includes(10) && SUMMER_I_ROUNDS.includes(player.round)) {
        await player.assignAttribute([11]);
    }
    player.checkVitals();
    player.maintainAttribute();
    return Promise.resolve(new Map<string, string>());
}

async function handler1(player: Player): Promise<Map<string, string>> {
    // Event handler 1 - Study.
    player.modifyParameter("study", 2, 1);
    player.modifyParameter("coding", -1, 1);
    player.modifyParameter("health", -1, 1);
    player.checkVitals();
    player.maintainAttribute();
    return Promise.resolve(new Map<string, string>());
}

async function handler2(player: Player): Promise<Map<string, string>> {
    // Event handler 2 - Send resume.
    console.log("player interview prob pre " + player.parameter.interviewProbability);
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
    console.log("player interview prob after " + player.parameter.interviewProbability);
    player.checkVitals();
    player.maintainAttribute();
    return Promise.resolve(new Map<string, string>());
}

async function handler3(player: Player): Promise<Map<string, string>> {
    // Event handler 3 - Coding.
    player.modifyParameter("coding", 3, 3);
    player.modifyParameter("health", -2, 3);
    player.checkVitals();
    player.maintainAttribute();
    return Promise.resolve(new Map<string, string>());
}

async function handler4(player: Player): Promise<Map<string, string>> {
    // Event handler 4 - Slack off.
    player.modifyParameter("coding", -2, 4);
    player.modifyParameter("health", 5, 4);
    player.checkVitals();
    player.maintainAttribute();
    return Promise.resolve(new Map<string, string>());
}

async function handler6(player: Player): Promise<Map<string, string>> {
    // Event handler 6 - Take final.
    // Generate 3 random numbers, under normal distribution, mean equals to study, stddev = 5,
    // and get the average.
    let score: number = 0;
    for (let i = 0; i < 3; ++i) {
        let tmp: number = getNormalDistributedInt(player.parameter.study,/* stddev= */ 5);
        if (tmp < 0) {
            tmp = Math.abs(tmp);
        }
        if (tmp > 100) {
            tmp = 100 * 2 - tmp;
        }
        console.log("subject " + i + " score is " + tmp);
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
    player.checkVitals();
    player.maintainAttribute();
    return Promise.resolve(new Map<string, string>());
}

async function handler7(player: Player): Promise<Map<string, string>> {
    // Event handler 7: Preliminary interview & Internship interview request.
    let beforeSummer1: boolean = SUMMER_I_ROUNDS.filter((round) => player.round >= round).length == 0;
    let tokens: Map<string, string> = new Map<string, string>([
        ["intern", beforeSummer1 ? CONDITION_TRUE : CONDITION_FALSE],
    ]);
    return Promise.resolve(tokens);
}

async function handler8(player: Player): Promise<Map<string, string>> {
    // Event handler 8: Preliminary interview.
    let res: number = getRandomInt(100) <= player.parameter.coding ? 9 : 10;
    console.log("[interview] from 8 to " + res);
    player.roundResultEventQueue.push([player.round + 1, res]);
    player.modifyParameter("health", -2, 8);
    player.checkVitals();
    player.maintainAttribute();
    return Promise.resolve(new Map<string, string>());
}

async function handler9(player: Player): Promise<Map<string, string>> {
    // Event handler 9: Preliminary interview passed.
    let res: number = getRandomInt(2) % 2 ? 11 : 12;
    console.log("[interview] from 9 to " + res);
    player.roundResultEventQueue.push([player.round + 1, res]);
    player.modifyParameter("health", 5, 9);
    player.checkVitals();
    player.maintainAttribute();
    return Promise.resolve(new Map<string, string>());
}

async function handler10(player: Player): Promise<Map<string, string>> {
    // Event handler 10: Preliminary interview rejected.
    player.modifyParameter("health", -5, 10);
    player.checkVitals();
    player.maintainAttribute();
    return Promise.resolve(new Map<string, string>());
}

async function handler12(player: Player): Promise<Map<string, string>> {
    // Event handler 12: Onsite interview aborted.
    player.modifyParameter("health", -5, 12);
    player.checkVitals();
    player.maintainAttribute();
    return Promise.resolve(new Map<string, string>());
}

async function handler13(player: Player): Promise<Map<string, string>> {
    // Event handler 13: Onsite interview confirmed.
    player.roundResultEventQueue.push([player.round + 2, 14]);
    player.modifyParameter("health", 2, 13);
    player.checkVitals();
    player.maintainAttribute();
    return Promise.resolve(new Map<string, string>());
}

async function handler14(player: Player): Promise<Map<string, string>> {
    // Evnet handler 14: Onsite interview.
    // Five random number for five rounds.
    let performance: number[] = [
        getRandomInt(100), getRandomInt(100), getRandomInt(100), getRandomInt(100), getRandomInt(100)];
    let hire = performance.filter((score) => score <= player.parameter.coding).length;
    let res = hire >= 4 ? 18 : hire <= 1 ? 19 : 15;
    console.log("[interview] hire: " + hire + " from 14 to " + res);
    player.roundResultEventQueue.push([player.round + 1, res]);
    player.modifyParameter("health", -5, 14);
    player.checkVitals();
    player.maintainAttribute();
    return Promise.resolve(new Map<string, string>());
}

async function handler16(player: Player): Promise<Map<string, string>> {
    // Event 16: Addtional onsite confirmed.
    player.roundResultEventQueue.push([player.round + 1, 17]);
    player.modifyParameter("health", -1, 16);
    player.checkVitals();
    player.maintainAttribute();
    return Promise.resolve(new Map<string, string>());
}

async function handler17(player: Player): Promise<Map<string, string>> {
    // Event 17: Additional onsite.
    // Four random number as it produce more managable result than two.
    let performance: number[] = [getRandomInt(100), getRandomInt(100), getRandomInt(100), getRandomInt(100)];
    let hire = performance.filter((score) => score <= player.parameter.coding).length;
    let res = hire >= 3 ? 18 : hire <= 1 ? 19 : 15;
    console.log("[interview] hire: " + hire + " from 17 to " + res);
    player.roundResultEventQueue.push([player.round + 1, res]);
    player.modifyParameter("health", -2, 17);
    player.checkVitals();
    player.maintainAttribute();
    return Promise.resolve(new Map<string, string>());
}

async function handler18(player: Player): Promise<Map<string, string>> {
    // Event 18: Onsite passed.
    player.modifyParameter("health", 10, 18);
    player.assignAttribute([13]);
    player.checkVitals();
    player.maintainAttribute();
    return Promise.resolve(new Map<string, string>());
}

async function handler19(player: Player): Promise<Map<string, string>> {
    // Event 19: Oniste failed.
    player.modifyParameter("health", -10, 18);
    player.checkVitals();
    player.maintainAttribute();
    return Promise.resolve(new Map<string, string>());
}

async function handler20(player: Player): Promise<Map<string, string>> {
    // Event 20: Summer intern working.
    let workAffect: number = Math.min(getRandomInt(20) + 5, 20);
    player.modifyParameter("working", workAffect, 20);
    player.modifyParameter("health", -2, 20);
    let tokens: Map<string, string> = new Map<string, string>([
        ["normalWork", workAffect >= 10 && workAffect <= 13 ? CONDITION_TRUE : CONDITION_FALSE],
        ["highWork", workAffect > 13 ? CONDITION_TRUE : CONDITION_FALSE]
    ]);
    player.checkVitals();
    player.maintainAttribute();
    return Promise.resolve(tokens);
}

async function handler21(player: Player): Promise<Map<string, string>> {
    // Event 21: Summer intern interview.
    let res: number = getRandomInt(100) <= player.parameter.coding ? 22 : 23;
    console.log("[interview] from 21 to " + res);
    player.roundResultEventQueue.push([player.round + 1, res]);
    player.modifyParameter("health", -2, 8);
    player.checkVitals();
    player.maintainAttribute();
    return Promise.resolve(new Map<string, string>());
}

async function handler22(player: Player): Promise<Map<string, string>> {
    // Event handler 22: Internship interview passed.
    player.modifyParameter("health", 8, 9);
    player.checkVitals();
    await player.assignAttribute([10]);
    player.maintainAttribute();
    return Promise.resolve(new Map<string, string>());
}

async function handler23(player: Player): Promise<Map<string, string>> {
    // Event handler 23: Inernship interview rejected.
    player.modifyParameter("health", -5, 10);
    player.checkVitals();
    player.maintainAttribute();
    return Promise.resolve(new Map<string, string>());
}

async function handler25(player: Player): Promise<Map<string, string>> {
    // Event handler 25: Demo the project.
    let probability: number = getRandomInt(100);
    let workingFinal: number = Math.min(player.parameter.working, 85);
    let tokens: Map<string, string> = new Map<string, string>([
        ["highWork", player.parameter.working >= 80 ? CONDITION_TRUE : CONDITION_FALSE]
    ]);
    player.roundResultEventQueue.push([player.round + 1, probability <= workingFinal ? 27 : 28]);
    player.modifyParameter("health", player.parameter.working >= 80 ? 5: 2, 25);
    player.checkVitals();
    player.maintainAttribute();
    return Promise.resolve(tokens);
}

async function handler26(player: Player): Promise<Map<string, string>> {
    // Event handler 26: Didn't demo.
    let probability: number = getRandomInt(100);
    let workingFinal: number = Math.min(player.parameter.working, 20);
    let tokens: Map<string, string> = new Map<string, string>([
        ["highWork", player.parameter.working >= 80 ? CONDITION_TRUE : CONDITION_FALSE]
    ]);
    player.roundResultEventQueue.push([player.round + 1, probability <= workingFinal ? 27 : 28]);
    player.modifyParameter("health", player.parameter.working >= 80 ? 0 : -3, 26);
    return Promise.resolve(tokens);
}

async function handler27(player: Player): Promise<Map<string, string>> {
    // Event handler 27: Return offer.
    player.assignAttribute([12]);
    return Promise.resolve(new Map<string, string>());
}

async function handler101(player: Player): Promise<Map<string, string>> {
    // Event handler 101 - Commencing event 1: Assign initial attributes.
    let giftIds: number[] = [];
    while (giftIds.length < 3) {
        let randomId: number = getRandomInt(GIFTED_ATTRIBUTE_IDS.length);
        let canPush: boolean = true;
        for (let id of giftIds) {
            for (let attributeGroup of MUTURAL_EXCLUSIVE_ATTRIBUTE_GROUPS) {
                if (attributeGroup.includes(randomId) && attributeGroup.includes(id)) {
                    canPush = false;
                    break;
                }
            }
            if (!canPush) {
                break;
            }
        }
        if (canPush) {
            giftIds.push(randomId);
        }
    }
    giftIds.sort((lhs, rhs) => {return lhs - rhs;});
    await player.assignAttribute(giftIds);
    return Promise.resolve(new Map<string, string>());
}

async function handler102(player: Player): Promise<Map<string, string>> {
    // Event handler 102 - Reflect gift attribute to parameters.
    // let giftIds: number[] = player.attributeIds;
    // player.parameter.coding = giftIds.includes(0) ? INITIAL_CODING_VALUE_HIGH : INITIAL_CODING_VALUE;
    // player.parameter.health = giftIds.includes(2) ? INITIAL_HEALTH_VALUE : INITIAL_HEALTH_VALUE_LOW;
    // player.parameter.health += giftIds.includes(7) ? 5 : 0;
    // player.parameter.study = giftIds.includes(4) ? INITIAL_STUDY_VALUE_HIGH : giftIds.includes(5) ? INITIAL_STUDY_VALUE : INITIAL_STUDY_VALUE_LOW;
    // player.parameter.interviewProbability = 0;
    return Promise.resolve(new Map<string, string>());
}

async function handler404(player: Player): Promise<Map<string, string>> {
    // Event handler 404 - Test event.
    console.log("handler 404 executed");
    return Promise.resolve(new Map<string, string>());
}

async function handler500(player: Player): Promise<Map<string, string>> {
    // Event handler 500 - Game over 0.
    console.log("handler 500 executed");
    player.status = PlayerStatus.DIDNT_START;
    return Promise.resolve(new Map<string, string>());
}

async function handler504(player: Player): Promise<Map<string, string>> {
    // Event handler 504 - Game over 5.
    console.log("handler 504 executed")
    player.status = PlayerStatus.FINAL_ABSENT;
    return Promise.resolve(new Map<string, string>());
}