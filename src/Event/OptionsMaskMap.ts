import { Player } from "../Player/Player";
import { isInVacation } from "../Utils/Calendar";
import { SUMMER_I_ROUNDS } from "../Game/RoundConstants";

export const OPTION_MASK_MAP = new Map<number, (options: Map<number, string>, player: Player) => Map<number, string>>([
    [0, optionDecorator0],
    [7, optionDecorator7],
    [32, optionDecorator32],
]);

function optionDecorator0(options: Map<number, string>, player: Player): Map<number, string> {
    // In vacation, study is unavailable.
    if (isInVacation(player.round)) {
        options.delete(1);
    }
    // If not have internship, then cannot work.
    if (!player.attributeIds.includes(11)) {
        options.delete(20);
    }
    return options
}

function optionDecorator7(options: Map<number, string>, player: Player): Map<number, string> {
    // If before summer I, only intern interview is available.
    if (SUMMER_I_ROUNDS.filter((round) => round <= player.round).length == 0) {
        options.delete(8);
    } else {
        options.delete(21);
    }
    return options;
}

function optionDecorator32(options: Map<number, string>, player: Player): Map<number, string> {
    // If study is higher then 90 or player is nerd, able to reject in a cool way.
    if (player.parameter.study < 90 && !player.attributeIds.includes(14)) {
        options.delete(34);
    }
    // If player is low in health, able to reject in a weak way as well.
    if (player.parameter.health >= 40) {
        options.delete(35);
    }
    return options;
}