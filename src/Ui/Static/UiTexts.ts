import { LanguageFlag } from "../../Game/LanguageFlag";
import { CALENDAR } from "../../Utils/Calendar";

const UI_TEXTS_MAPS: Map<string, string>[] = [
    new Map<string, string>([
        [`study`, `Study`],
        [`score`, `Grade`],
        [`coding`, `Coding`],
        [`health`, `Sanity`],
        [`time`, `Current Time`],
        [`attribute`, `Attribute`],
        [`rule`, `Rule`],
        [`rule-close`, `I see`],
        [`attribute-btn-close`, `I see`],
    ]), 
    new Map<string, string>([
        [`study`, `学力`],
        [`score`, `绩点`],
        [`coding`, `刷题力`],
        [`health`, `身心健康`],
        [`time`, `当前时间`],
        [`attribute`, `人物属性`],
        [`rule`, `游戏规则`],
        [`rule-close`, `原来如此`],
        [`attribute-btn-close`, `原来如此`],
    ])];

export const RULE_HTMLS: string[] = [
    `<p>Complete the MSCS program and get at least one offer before the OPT grace period ends!</p>
    <ul>
        <li class="diamond">
            To survive the semester, you have to get C or better grade in final.
        </li>
        <li class="diamond">
            If your sanity droppes to zero or below, you will decide to end the MSCS
            program by yourself. So slack off if it needs to.
        </li>
        <li class="diamond">
            Send resume will not ensure a followup, but there's no free oppourtunity
            if you do not take the first step.
        </li>
        <li class="diamond">
            If you find it's hard to win, that's expected, as it is the same in the
            real life.
        </li>
    </ul>`,
    `<p>顺利完成美研CS项目, 并且在签证过期前拿到全职offer吧!</p>
    <ul>
        <li class="diamond">
            每学期的期末绩点需要保持在C或者以上, 否则会被退学.
        </li>
        <li class="diamond">
            如果身心健康降到0或以下, 你将放弃学业自愿回国, 所以必要的时候该摸鱼就摸鱼吧.
        </li>
        <li class="diamond">
            投简历并不保证会有面试, 但不投肯定没有. 
        </li>
        <li class="diamond">
            如果你觉得游戏太难, 请理解美研CS学生生活本就如此. 
        </li>
    </ul>`];

export const ATTRIBUTE_DESCRIPTION_GENERAL_TEXT: string[] = [
    `The descriptions below does not include their affect to events, 
    only general buff / debuff to the player's parameter`, 
    `以下描述仅包括对玩家各项参数值的增益 / 减益, 并不包括这些属性对游戏事件的额外影响.`
]

export const ATTRIBUTE_DESCRIPTION_MAP: Map<number, [string, string]> = new Map<number, [string, string]>([
    [0, ["Former coding contestant - Furtherer increase coding gaining, reduce sanity lost due to coding.", 
        "前算法竞赛选手 - 显著增加刷题收益, 减少因刷题造成的身心健康损害."]],
    [1, ["Hop into CS without experience - Furtherer reduce coding gaining, increase sanity lost due to coding.", 
        "转码小白 - 显著减少刷题收益, 增加因刷题造成的身心健康损害."]],
    [2, ["Experienced in self-cooking - Reduce sanity lost generally.", 
        "精通自炊 - 减少身心健康损害."]],
    [3, ["Sensitive and sickly - Increase sanity lost generally.", 
        "焦虑多病 - 增加身心健康损害。"]],
    [4, ["Top 10 school - Slightly reduce study gaining, increase interview probability", 
        "名校 - 轻微减少学习收益, 增加收到面试概率."]],
    [5, ["Syracuse university - Nothing but some fancy theme TO BE implemented.", 
        "雪城大学 - 除了(无良作者承诺会有的)与众不同的皮肤以外啥都没有"]],
    [6, ["Community Collage - Increase study gaining.", 
        "社区大学 - 增加学习收益."]],
    [7, ["City that never sleeps - Reduce study & coding gainings, increase sanity gaining, reduce sanity lost.", 
        "不夜城 - 减少学习, 刷题收益, 增加身心健康收益, 减少身心健康损害."]],
    [8, ["More cows than people countryside - Increase study & coding gainings, reduce sanity gaining, increase sanity lost.", 
        "远郊大农村 - 增加学习, 刷题收益, 减少身心健康收益, 增加身心健康损害."]],
    [9, ["Next to Silicon Vally - GREATLY increase interview probability.", 
        "IT中心 - 极大幅度增加收到面试概率."]],
    [10, ["Have intership offer - Reduce study & coding gainings, increase sanity gaining, reduce sanity lost.", 
        "有实习offer了 - 减少学习, 刷题收益, 增加身心健康收益, 减少身心健康损害."]],
    [11, ["Intern in summer break - Increase interview probability.", 
        "有暑假实习 - 增加收到面试概率."]],
    [12, ["Have return offer - Reduce study gaining, furtherer reduce coding gaining, furtherer increase sanity gaining, futherer reduce sanity lost.", 
        "有return offer - 减少学习收益, 显著减少刷题收益, 显著增加身心健康收益, 显著减少身心健康损害."]],
    [13, ["Have offer letter - Reduce study gaining, furtherer reduce coding gainings, furtherer increase sanity gaining, furtherer reduce sanity lost.", 
        "有offer了 - 减少学习收益, 显著减少刷题收益, 显著增加身心健康收益, 显著减少身心健康损害."]],
    [14, ["Nerd - Increase study & coding gainings, slightly reduce interview probability, increase sanity lost generally.", 
        "书呆子 - 增加学习, 刷题收益, 轻微减少收到面试概率, 增加身心健康损害."]],
    [15, ["Socialite - Increase study & sanity gainings, slightly increase interview probability, reduce sanity lost.", 
        "交际花 - 增加学习, 身心健康收益, 轻微增加收到面试概率, 减少身心健康损害."]],
]);

export function getUiText(key: string, lang: LanguageFlag): string {
    return lang.lang ? UI_TEXTS_MAPS[0].get(key)! : UI_TEXTS_MAPS[1].get(key)!;
}

export function getUiRoundText(key: number, lang: LanguageFlag): string {
    let roundEngString: string = CALENDAR.get(key)!;
    if (lang.lang) {
        return roundEngString;
    } else {
        if (key == -1) {
            return "序幕, 第一年八月";
        }
        if (key == 48) {
            return "终局, 第三年九月";
        }

        let semester: string = "";
        if (roundEngString.includes("Fall II")) {
            semester = "第三学期";
        } else if (roundEngString.includes("Spring II")) {
            semester = "第四学期";
        } else if (roundEngString.includes("Fall I")) {
            semester = "第一学期";
        } else if (roundEngString.includes("Spring I")) {
            semester = "第二学期";
        } else if (roundEngString.includes("Winter Break")) {
            semester = "寒假";
        } else if (roundEngString.includes("Summer Break")) {
            semester = "暑假";
        } else if (roundEngString.includes("OPT Grace Period")) {
            semester = "OPT签证过渡期"
        }

        let period: string = "";
        if (roundEngString.includes("Early")) {
            period = "上旬";
        } else if (roundEngString.includes("Late")) {
            period = "下旬";
        }

        let month: string = "";
        if (roundEngString.includes("January")) {
            month = "一月";
        } else if (roundEngString.includes("February")) {
            month = "二月";
        } else if (roundEngString.includes("March")) {
            month = "三月";
        } else if (roundEngString.includes("April")) {
            month = "四月";
        } else if (roundEngString.includes("May")) {
            month = "五月";
        } else if (roundEngString.includes("June")) {
            month = "六月";
        } else if (roundEngString.includes("July")) {
            month = "七月";
        } else if (roundEngString.includes("August")) {
            month = "八月";
        } else if (roundEngString.includes("September")) {
            month = "九月";
        } else if (roundEngString.includes("October")) {
            month = "十月";
        } else if (roundEngString.includes("November")) {
            month = "十一月";
        } else if (roundEngString.includes("December")) {
            month = "十二月";
        }

        let year: string = "";
        if (roundEngString.includes("Year III")) {
            year = "第三年";
        } else if (roundEngString.includes("Year II")) {
            year = "第二年";
        } else if (roundEngString.includes("Year I")) {
            year = "第一年";
        }

        return semester + ", " + year + " " + month + period;
    }
}