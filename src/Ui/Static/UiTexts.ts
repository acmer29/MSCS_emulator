import { LanguageFlag } from "../../Game/LanguageFlag";
import { CALENDAR } from "../../Utils/Calendar";

const UI_TEXTS_MAP_EN: Map<string, string> = new Map<string, string>([
    [`study`, `Study`],
    [`score`, `Grade`],
    [`coding`, `Coding`],
    [`health`, `Sanity`],
    [`time`, `Current Time`],
    [`attribute`, `Attribute`],
    [`rule`, `Rule`],
    [`rule-close`, `I see`],
]);

const UI_TEXTS_MAP_ZH: Map<string, string> = new Map<string, string>([
    [`study`, `学力`],
    [`score`, `绩点`],
    [`coding`, `刷题力`],
    [`health`, `身心健康`],
    [`time`, `当前时间`],
    [`attribute`, `人物属性`],
    [`rule`, `游戏规则`],
    [`rule-close`, `原来如此`],
]);

export const RULE_HTML_EN: string = 
`<p>Complete the MSCS program and get at least one offer before the last summer!</p>
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
</ul>`;

export const RULE_TEXT_ZH: string = 
`<p>顺利完成美研CS项目, 并且在最后一个暑假结束前拿到全职offer吧!</p>
<ul>
    <li class="diamond">
        每学期的期末绩点需要保持在C以上, 否则会被退学.
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
</ul>`;

export function getUiText(key: string, lang: LanguageFlag): string {
    if (lang.lang) {
        return UI_TEXTS_MAP_EN.get(key)!;
    } else {
        return UI_TEXTS_MAP_ZH.get(key)!;
    }
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
        if (roundEngString.includes("Year I")) {
            year = "第一年";
        } else if (roundEngString.includes("Year II")) {
            year = "第二年";
        } else if (roundEngString.includes("Year III")) {
            year = "第三年";
        }

        return semester + ", " + year + " " + month + period;
    }
}