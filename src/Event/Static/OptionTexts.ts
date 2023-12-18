// To cut the cost of deploying the app on a cloud server, 
// the app has to be fully static to be hosted on github.io page.
// Therefore the static texts has to be put into the code.

export const OPTION_TEXT_MAP: Map<number, [number, string, string][]> = new Map([
    [0, [[1, `Study`, `学习`],
        [2, `Send resume`, `投简历`],
        [3, `Practice coding`, `刷题`],
        [4, `Slack off`, `摸鱼`],
        [20, `Working on intern project`, `做实习项目`]]],
    [1, [[308, `Good study day day up`, `我爱学习`]]],
    [2, [[308, `Cool`, `好吧`]]],
    [3, [[308, `My effort will not be in vain`, `我的努力不会白费的`]]],
    [4, [[308, `Wonderful`, `蛤蛤蛤蛤`]]],
    [5, [[6, `Take the exam`, `去参加考试`],
        [504, `Nah it conflict with my flight schedule`, `赶飞机回国要紧, 家人见一面少一面了`]]],
    [6, [[308, `Let's take a break!`, `放假了! `]]],
    [7, [[8, `Reply yes immidiately!`, `立刻回HR邮件! 我可太有空了`],
        [21, `Replay yes immidiately!`, `立刻回HR邮件! 我可太有空了`],
        [307, `Nope, not ready yet`, `很忙, 没空`]]],
    [8, [[308, `Finger crossed..`, `忐忑不安……`]]],
    [9, [[307, `Fantastic!`, `太棒了!`]]],
    [10, [[307, `How unfortunate..`, `这合理吗`]]],
    [11, [[13, `Accept the arrangement`, `接受HR的安排`],
        [307, `Conflict with KanColle seasonal event, don't have time, really`, `砍口垒活动捞船呢, 没空`]]],
    [12, [[307, `What the hell..`, `HR你的良心不会卵痛么`]]],
    [13, [[307, `Finger crossed`, `忐忑不安……`]]],
    [14, [[307, `Finger crossed`, `忐忑不安……`]]],
    [15, [[16, `Gladly! Let's schedule it ASAP!`, `非常愿意, 快点安排罢`],
        [307, `Hell no! I have had enough!`, `不加, 滚`]]],
    [16, [[307, `Got it.`, `HR怎么都死了`]]],
    [17, [[307, `Finger crossed`, `忐忑不安……`]]],
    [18, [[307, `WHAT A MIGHTY TRIUMPH!`, `我!可!真!太!厉!害!了!!!`]]],
    [19, [[307, `How unfortunate...`, `啊?`]]],
    [20, [[308, `{{ IF normalWork }}Cool{{ ELSE }}{{ IF highWork }}Yeah{{ ELSE }}Feel bad{{ FI }}{{ FI }}`, 
                `{{ IF normalWork }}好吧{{ ELSE }}{{ IF highWork }}我真牛逼{{ ELSE }}这破项目怎么这么麻烦{{ FI }}{{ FI }}`]]],
    [21, [[308, `Cool`, `好吧`]]],
    [22, [[307, `Fantastic!`, `太棒了!`]]],
    [23, [[307, `How unfortunate..`, `这合理吗`]]],
    [24, [[25, `Join and demonstrate`, `带着制作精良的PPT参加`],
        [26, `Oops I get up late..`, `诶卧槽睡过了!`]]],
    [25, [[308, `Hope there will be good news`, `但愿是好事`]]],
    [26, [[308, `Hope there will be good news`, `但愿是好事罢`]]],
    [27, [[307, `MY HARDWORK PAID OFF!!`, `我!要!有!工!作!了!!!`]]],
    [28, [[307, `How unfortunate..`, `啊?`]]],
    [29, [[30, `Suit up and join`, `换上正装参加`],
        [31, `You know these companies are not mean to hire in this career fair right?`, 
            `凑这个热闹干嘛? 哪个正经公司在招聘会上招聘啊`]]],
    [30, [[307, `{{ IF goodPlace }}Awesome{{ ELSE }}Waste of time{{ FI }}`, 
                `{{ IF goodPlace }}大开眼界{{ ELSE }}垃圾活动, 毁我青春{{ FI }}`]]],
    [31, [[307, `{{ IF goodPlace }}That is a big mistake{{ ELSE }}Cozy{{ FI }}`, 
                `{{ IF goodPlace }}失算了……{{ ELSE }}玛修最棒了!{{ FI }}`]]],
    [32, [[33, `Here I come`, `来了来了`],
        [34, `You guys just want me to carry huh?`, `想抱大腿直说`],
        [35, `I'm so nervrous, I just want to stay at home`, `我突然尿急我能先回家么……`]]],
    [33, [[307, `Nice!`, `人多力量大!`]]],
    [34, [[307, `Who cares`, `我也没想搭理他们啊`]]],
    [35, [[307, `Why they become so indifferent..`, `怎么没人找我搭话了……`]]],
    [36, [[37, `Copy it down, free credit!`, `开抄`],
        [307, `What if TA also knows this webpage..?`, `这网站我知道助教就不知道?`]]],
    [37, [[307, `{{ IF cheatSuccess }}Easy credit!
                {{ ELSE }}
                    {{ IF highStudy }}I do not want to experience this ever again...
                    {{ ELSE }}How unfortunate...
                    {{ FI }}
                {{ FI }}`,
                `{{ IF cheatSuccess }}这以后不用愁作业了啊
                {{ ELSE }}
                    {{ IF highStudy }}我被吓得心脏病都要犯了……
                    {{ ELSE }}至于么……这学校也不是你家开的啊
                    {{ FI }}
                {{ FI }}`]]],
    [38, [[307, `{{ IF highStudy }}Easy day!{{ ELSE }}How did that crap got admitted?{{ FI }}`, 
                `{{ IF highStudy }}大腿就是用来抱的!{{ ELSE }}这种垃圾是怎么被录取的?{{ FI }}`]]],
    [39, [[307, `Let's don't messed up any presentation afterwards`, 
                `下次好好准备吧……`]]],
    [40, [[307, `{{ IF highStudy }}My heart cannot endure this once more..{{ ELSE }}How unfortunate..{{ FI }}`, 
                `{{ IF highStudy }}我的小心脏可不能再承受这种打击了……{{ ELSE }}教授你家户口本就一页么{{ FI }}`]]],
    [41, [[307, `{{ IF nerd }}Should stayed at home watching anime..{{ ELSE }}What a party!{{ FI }}`, 
                `{{ IF nerd }}不如在家{{ ELSE }}以后常约!{{ FI }}`]]],
    [42, [[307, `How unfortunate..`, `感觉要死`]]],
    [43, [[307, `{{ IF eatGood }}Nice meal!{{ ELSE }}Will never come back again..{{ FI }}`, 
                `{{ IF eatGood }}家乡的味道!{{ ELSE }}以后再也不来了{{ FI }}`]]],
    [44, [[307, `Oh my god hope this thing will never happen on me..`, 
                `希望这种事以后不会发生在我身上……`]]],
    [45, [[46, `Go ahead and execute the script`, 
                `执行脚本`],
        [307, `Nah just go home and slack`, `回家摸鱼算了`]]],
    [46, [[307, `If only I did not blindly do this..`, `这mentor是想坑死我么`]]],
    [47, [[307, `{{ IF goodRank }}Nicely done{{ ELSE }}I will definitely do better next time{{ FI }}`, 
                `{{ IF goodRank }}做的不错{{ ELSE }}下次努力{{ FI }}`]]],
    [48, [[307, `{{ IF goodGrade }}Nicely done
                {{ ELSE }}
                    {{ IF badGrade }}Should do it better next time..
                    {{ ELSE }}Cool
                    {{ FI }}
                {{ FI }}`, 
                `{{ IF goodGrade }}天道酬勤
                {{ ELSE }}
                    {{ IF badGrade }}下次不能再这样了……
                    {{ ELSE }}扎不多得勒
                    {{ FI }}
                {{ FI }}`]]],
    [100, [[101, `Excited!`, `你们搞得这些申请啊, excited!`],
        [500, `Nonsense, I won't leave my beloved motherland`, `我和我的祖国一刻也不能分割`]]],
    [101, [[308, `Cool`, `这个学校的项目啊, excited!`]]],
    [200, [[100, `Start a new MSCS emulator journey`, `开始新一轮游戏`]]],
    [500, [[100, `Start a new MSCS emulator journey`, `开始新一轮游戏`]]],
    [501, [[100, `Start a new MSCS emulator journey`, `开始新一轮游戏`]]],
    [502, [[100, `Start a new MSCS emulator journey`, `开始新一轮游戏`]]],
    [503, [[100, `Start a new MSCS emulator journey`, `开始新一轮游戏`]]],
    [504, [[100, `Start a new MSCS emulator journey`, `开始新一轮游戏`]]],
]);