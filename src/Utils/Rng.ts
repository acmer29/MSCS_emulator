/**
 * Get random integar between [0, ceiling).
 * @param ceiling Right boundary of the random number.
 * @returns A number complies uniform distribution between [0, ceiling).
 */
export function getRandomInt(ceiling: number): number {
    return Math.floor(Math.random() * ceiling);
}

function boxMullerTransform() {
    const u1 = Math.random();
    const u2 = Math.random();
    
    const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    const z1 = Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(2.0 * Math.PI * u2);
    
    return { z0, z1 };
}

export function getNormalDistributedInt(mean: number, stddev: number): number {
    const {z0, z1} = boxMullerTransform();
    return z0 * stddev + mean;
}

