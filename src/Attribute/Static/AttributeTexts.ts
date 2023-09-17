// To cut the cost of deploying the app on a cloud server, 
// the app has to be fully static to be hosted on github.io page.
// Therefore the static texts has to be put into the code.

export const ATTRIBUTE_TEXT_MAP: Map<number, [string, boolean, number[], number[]]> = new Map<number, [string, boolean, number[], number[]]>([
    [0, ["Former coding contestant", true, [0, 0.5, 0, 0, 0], [0, 0, -0.25, 0, 0]]],
    [1, ["Hop into CS without experience", true, [0, -0.25, 0, 0, 0], [0, 0, 0.25, 0, 0]]],
    [2, ["Experienced in self-cooking", true, [0, 0, 0, 0, 0], [0, 0, -0.25, 0, 0]]],
    [3, ["Sensitive and sickly", true, [0, 0, 0, 0, 0], [0, 0, 0.25, 0, 0]]],
    [4, ["Top 10 school", true, [-0.20, 0, 0, 0, 1.0], [0, 0, 0, 0, 0]]],
    [5, ["Syracuse university", true, [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]],
    [6, ["Community Collage", true, [1.0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]],
    [7, ["City that never sleeps", true, [-0.05, -0.05, 0.10, 0, 0], [0, 0, -0.05, 0, 0]]],
    [8, ["More cows than people countryside", true, [0.05, 0.05, -0.05, 0, 0], [0, 0, 0.10, 0, 0]]],
    [9, ["Next to Silicon Vally", true, [0, 0, 0, 0, 5], [0, 0, 0, 0, 0]]],
    [10, ["Have intership offer", true, [-0.10, -0.20, 0.20, 0, 0], [0, 0, -0.20, 0, 0]]],
    [11, ["Intern in summer break", true, [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]],
    [12, ["Have return offer", true, [-0.10, -0.50, 0.50, 0, 0], [0, 0, -0.50, 0, 0]]],
    [13, ["Have offer letter", true, [-0.10, -0.50, 0.50, 0, 0], [0, 0, -0.50, 0, 0]]],
    [14, ["Nerd", true, [0.20, 0.20, 0, 0, -0.05], [0, 0, 0.20, 0, 0]]],
    [15, ["Socialite", true, [0.10, 0, 0.2, 0, 0.05], [0, 0,-0.20, 0, 0]]],
]);