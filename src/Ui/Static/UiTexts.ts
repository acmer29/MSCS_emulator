import { LanguageFlag } from "../../Game/LanguageFlag";
import { CALENDAR } from "../../Utils/Calendar";

const UI_TEXTS_MAP_EN: Map<string, string> = new Map<string, string>([
    [`study`, `Study`],
    [`score`, `Grade`],
    [`coding`, `Coding`],
    [`health`, `Sanity`],
    [`time`, `Current Time`],
    [`attribute`, `Attribute`],
]);

const UI_TEXTS_MAP_ZH: Map<string, string> = new Map<string, string>([
    [`study`, `学力`],
    [`score`, `绩点`],
    [`coding`, `刷题力`],
    [`health`, `身心健康`],
    [`time`, `当前时间`],
    [`attribute`, `人物特性`],
]);

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
        if (roundEngString.includes("Y1")) {
            year = "第一年";
        } else if (roundEngString.includes("Y2")) {
            year = "第二年";
        } else if (roundEngString.includes("Y3")) {
            year = "第三年";
        }

        return semester + ", " + year + month + period;
    }
}