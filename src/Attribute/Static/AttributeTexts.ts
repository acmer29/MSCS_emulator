// To cut the cost of deploying the app on a cloud server, 
// the app has to be fully static to be hosted on github.io page.
// Therefore the static texts has to be put into the code.

export const ATTRIBUTE_TEXT_MAP: Map<number, [string, string, boolean, number[], number[]]> = new Map<number, [string, string, boolean, number[], number[]]>([
    [0, ["Former coding contestant", "前算法竞赛选手", true, [0, 0.5, 0, 0, 0], [0, 0, -0.25, 0, 0]]],
    [1, ["Hop into CS without experience", "转码小白", true, [0, -0.25, 0, 0, 0], [0, 0, 0.25, 0, 0]]],
    [2, ["Experienced in self-cooking", "精通自炊", true, [0, 0, 0, 0, 0], [0, 0, -0.25, 0, 0]]],
    [3, ["Sensitive and sickly", "焦虑多病", true, [0, 0, 0, 0, 0], [0, 0, 0.25, 0, 0]]],
    [4, ["Top 10 school", "名校", true, [-0.20, 0, 0, 0, 1.0], [0, 0, 0, 0, 0]]],
    [5, ["Syracuse university", "雪城大学", true, [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]],
    [6, ["Community Collage", "社区大学", true, [1.0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]],
    [7, ["City that never sleeps", "不夜城", true, [-0.05, -0.05, 0.10, 0, 0], [0, 0, -0.05, 0, 0]]],
    [8, ["More cows than people countryside", "远郊大农村", true, [0.05, 0.05, -0.05, 0, 0], [0, 0, 0.10, 0, 0]]],
    [9, ["Next to Silicon Vally", "硅谷中心", true, [0, 0, 0, 0, 5], [0, 0, 0, 0, 0]]],
    [10, ["Have intership offer", "有实习offer", true, [-0.10, -0.20, 0.20, 0, 0], [0, 0, -0.20, 0, 0]]],
    [11, ["Intern in summer break", "暑假实习", true, [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]],
    [12, ["Have return offer", "有return offer", true, [-0.10, -0.50, 0.50, 0, 0], [0, 0, -0.50, 0, 0]]],
    [13, ["Have offer letter", "有offer了", true, [-0.10, -0.50, 0.50, 0, 0], [0, 0, -0.50, 0, 0]]],
    [14, ["Nerd", "书呆子", true, [0.20, 0.20, 0, 0, -0.05], [0, 0, 0.20, 0, 0]]],
    [15, ["Socialite", "交际花", true, [0.10, 0, 0.2, 0, 0.05], [0, 0,-0.20, 0, 0]]],
]);