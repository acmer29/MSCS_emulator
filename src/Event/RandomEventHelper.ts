import { isInVacation } from "../Utils/Calendar";
import { Player } from "../Player/Player"

export const enum RANDOM_EVENT_RARITY {
    NOPE, // 0/16
    LOW, // 1/16
    MEDIUM, // 2/16
    MEDIUM_HIGH, // 4/16
    HIGH, // 8/16
    MUST, // 16/16, reserved for future uses.
}

export const RANDOM_EVENT_AVAILABILITY_MAP = new Map<number, (player: Player) => RANDOM_EVENT_RARITY>([
    [29, availabilityHandler29],
    [30, defaultNopeHandler],
    [31, defaultNopeHandler],
    [32, availabilityHandler32],
    [33, defaultNopeHandler],
    [34, defaultNopeHandler],
    [35, defaultNopeHandler],
    [36, availabilityHandler36],
    [37, defaultNopeHandler],
    [38, availabilityHandler38],
    [39, availabilityHandler39],
    [40, availabilityHandler40],
    [41, availabilityHandler41],
    [42, availabilityHandler42],
    [43, availabilityHandler43],
    [44, availabilityHandler44],
    [45, availabilityHandler45],
    [46, defaultNopeHandler],
    [47, availabilityHandler47],
    [48, availabilityHandler48]
]);

function defaultNopeHandler(): RANDOM_EVENT_RARITY {
    return RANDOM_EVENT_RARITY.NOPE;
}

function inInternshipChecker(player: Player): boolean {
    return player.attributeIds.includes(11);
}

function availabilityHandler29(player: Player): RANDOM_EVENT_RARITY {
    // In semaster, the second round, might happen.
    if ([1, 10, 25, 34].includes(player.round)) {
        if (player.attributeIds.includes(9)) {
            return RANDOM_EVENT_RARITY.MUST;
        } else if (player.attributeIds.includes(4) || player.attributeIds.includes(7)) {
            return RANDOM_EVENT_RARITY.HIGH;
        } else if (player.attributeIds.includes(6)) {
            return RANDOM_EVENT_RARITY.LOW;
        } else {
            return RANDOM_EVENT_RARITY.MEDIUM;
        }
    } else {
        return RANDOM_EVENT_RARITY.NOPE;
    }
}

function availabilityHandler32(player: Player): RANDOM_EVENT_RARITY {
    // In semater, all times, might happen.
    if (isInVacation(player.round)) {
        return RANDOM_EVENT_RARITY.NOPE;
    } else {
        if (player.attributeIds.includes(15)) {
            return RANDOM_EVENT_RARITY.MEDIUM_HIGH;
        } else if (player.attributeIds.includes(16)) {
            return RANDOM_EVENT_RARITY.LOW;
        } else {
            return RANDOM_EVENT_RARITY.MEDIUM;
        }
    }
}

function availabilityHandler36(player: Player): RANDOM_EVENT_RARITY {
    // In semater, all times, might happen.
    if (isInVacation(player.round)) {
        return RANDOM_EVENT_RARITY.NOPE;
    } else {
        if (player.attributeIds.includes(14)) {
            return RANDOM_EVENT_RARITY.LOW;
        } else {
            return RANDOM_EVENT_RARITY.MEDIUM;
        }
    }
}

function availabilityHandler38(player: Player): RANDOM_EVENT_RARITY {
    // In semater, all times, might happen.
    return isInVacation(player.round) ? RANDOM_EVENT_RARITY.NOPE : RANDOM_EVENT_RARITY.MEDIUM;
}

function availabilityHandler39(player: Player): RANDOM_EVENT_RARITY {
    // In semater, all times, might happen.
    if (isInVacation(player.round)) {
        return RANDOM_EVENT_RARITY.NOPE;
    }
    if (player.parameter.health < 35) {
        return RANDOM_EVENT_RARITY.MEDIUM
    } else if (player.parameter.study <= 50) {
        return RANDOM_EVENT_RARITY.MEDIUM_HIGH;
    } else {
        return RANDOM_EVENT_RARITY.LOW;
    }
}

function availabilityHandler40(player: Player): RANDOM_EVENT_RARITY {
    // In semater, all times, might happen.
    if (isInVacation(player.round) || player.parameter.study >= 80) {
        return RANDOM_EVENT_RARITY.NOPE;
    } else {
        if (player.parameter.health < 35) {
            return RANDOM_EVENT_RARITY.MEDIUM;
        } else if (player.parameter.health > 80) {
            return RANDOM_EVENT_RARITY.NOPE;
        } else {
            return RANDOM_EVENT_RARITY.LOW;
        }
    }
}

function availabilityHandler41(player: Player): RANDOM_EVENT_RARITY {
    // All times, might happen.
    if (player.attributeIds.includes(14)) {
        return RANDOM_EVENT_RARITY.LOW;
    } else if (player.attributeIds.includes(15)) {
        return RANDOM_EVENT_RARITY.HIGH;
    } else {
        return player.parameter.health <= 35 ? RANDOM_EVENT_RARITY.MEDIUM : RANDOM_EVENT_RARITY.MEDIUM_HIGH;
    }
}

function availabilityHandler42(player: Player): RANDOM_EVENT_RARITY {
    // All times, might happen.
    if (player.parameter.health < 35) {
        return RANDOM_EVENT_RARITY.HIGH;
    } else if (player.parameter.health > 80) {
        return RANDOM_EVENT_RARITY.LOW;
    } else if (player.attributeIds.includes(3)) {
        return RANDOM_EVENT_RARITY.MEDIUM_HIGH;
    } else if (player.attributeIds.includes(2)) {
        return RANDOM_EVENT_RARITY.LOW;
    } else {
        return RANDOM_EVENT_RARITY.MEDIUM;
    }
}

function availabilityHandler43(player: Player): RANDOM_EVENT_RARITY {
    // All times, might happen.
    if (player.attributeIds.includes(2)) {
        return RANDOM_EVENT_RARITY.LOW;
    } else {
        return RANDOM_EVENT_RARITY.HIGH;
    }
}

function availabilityHandler44(player: Player): RANDOM_EVENT_RARITY {
    // In internship, might happen.
    if (inInternshipChecker(player)) {
        return RANDOM_EVENT_RARITY.MEDIUM;
    } else {
        return RANDOM_EVENT_RARITY.NOPE;
    }
}

function availabilityHandler45(player: Player): RANDOM_EVENT_RARITY {
    // In internship, might happen.
    if (inInternshipChecker(player)) {
        return RANDOM_EVENT_RARITY.LOW;
    } else {
        return RANDOM_EVENT_RARITY.NOPE;
    }
}

function availabilityHandler47(player: Player): RANDOM_EVENT_RARITY {
    // All times, might happen.
    if (player.attributeIds.includes(1)) {
        return RANDOM_EVENT_RARITY.MEDIUM;
    } else if (player.attributeIds.includes(0)) {
        return RANDOM_EVENT_RARITY.HIGH;
    } else {
        return RANDOM_EVENT_RARITY.MEDIUM_HIGH;
    }
}

function availabilityHandler48(player: Player): RANDOM_EVENT_RARITY {
    // In semester, might happen.
    if (isInVacation(player.round)) {
        return RANDOM_EVENT_RARITY.NOPE;
    } else {
        return RANDOM_EVENT_RARITY.HIGH;
    }
}