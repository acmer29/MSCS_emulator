export const OPTION_TEXT_MAP: Map<number, [number, string][]> = new Map([
    [0, [[1, `Study`],
        [2, `Send resume`],
        [3, `Practice coding`],
        [4, `Slack off`],
        [20, `Working on intern project`]]],
    [1, [[308, `Cool`]]],
    [2, [[308, `Cool`]]],
    [3, [[308, `Awesome`]]],
    [4, [[308, `Wonderful`]]],
    [5, [[6, `Take the exam`],
        [504, `Nah it conflict with my flight schedule`]]],
    [6, [[308, `Let's take a break!`]]],
    [7, [[8, `Reply yes immidiately!`],
        [21, `Replay yes immidiately!`],
        [307, `Nope, not ready yet`]]],
    [8, [[308, `Finger crossed..`]]],
    [9, [[307, `Fantastic!`]]],
    [10, [[307, `How unfortunate..`]]],
    [11, [[13, `Accept the arrangement`],
        [307, `Conflict with KanColle seasonal event, don't have time, really`]]],
    [12, [[307, `What the hell..`]]],
    [13, [[307, `Finger crossed`]]],
    [14, [[307, `Finger crossed`]]],
    [15, [[16, `Gladly! Let's schedule it ASAP!`],
        [307, `Hell no! I have had enough!`]]],
    [16, [[307, `Got it.`]]],
    [17, [[307, `Finger crossed`]]],
    [18, [[307, `WHAT A MIGHTY TRIUMPH!`]]],
    [19, [[307, `How unfortunate...`]]],
    [20, [[308, `{{ IF normalWork }}Cool{{ ELSE }}{{ IF highWork }}Yeah{{ ELSE }}Feel bad{{ FI }}{{ FI }}`]]],
    [21, [[308, `Cool`]]],
    [22, [[307, `Fantastic!`]]],
    [23, [[307, `How unfortunate..`]]],
    [24, [[25, `Join and demonstrate`],
        [26, `Oops I get up late..`]]],
    [25, [[308, `Hope there will be good news`]]],
    [26, [[308, `Hope there will be good news`]]],
    [27, [[307, `MY HARDWORK PAID OFF!!`]]],
    [28, [[307, `How unfortunate..`]]],
    [29, [[30, `Suit up and join`],
        [31, `You know these companies are not mean to hire in this career fair right?`]]],
    [30, [[307, `{{ IF goodPlace }}Awesome{{ ELSE }}Waste of time{{ FI }}`]]],
    [31, [[307, `{{ IF goodPlace }}That is a big mistake{{ ELSE }}Cozy{{ FI }}`]]],
    [32, [[33, `Here I come`],
        [34, `You guys just want me to carry huh?`],
        [35, `I'm so nervrous, I just want to stay at home`]]],
    [33, [[307, `Nice!`]]],
    [34, [[307, `Who cares`]]],
    [35, [[307, `Why they become so indifferent..`]]],
    [36, [[37, `Copy it down, free credit!`],
        [307, `What if TA also knows this webpage..?`]]],
    [37, [[307, `{{ IF cheatSuccess }}Easy credit!
                {{ ELSE }}
                    {{ IF highStudy }}I do not want to experience this ever again...
                    {{ ELSE }}How unfortunate...
                    {{ FI }}
                {{ FI }}`]]],
    [38, [[307, `{{ IF highStudy }}Easy day!{{ ELSE }}How did that crap got admitted?{{ FI }}`]]],
    [39, [[307, `Let's don't messed up any presentation afterwards`]]],
    [40, [[307, `{{ IF highStudy }}My heart cannot endure this once more..{{ ELSE }}How unfortunate..{{ FI }}`]]],
    [41, [[307, `{{ IF nerd }}Should stayed at home watching anime..{{ ELSE }}What a party!{{ FI }}`]]],
    [42, [[307, `How unfortunate..`]]],
    [43, [[307, `{{ IF eatGood }}Nice meal!{{ ELSE }}Will never come back again..{{ FI }}`]]],
    [44, [[307, `Oh my god hope this thing will never happen on me..`]]],
    [45, [[46, `Go ahead and execute the script`],
        [307, `Nah just go home and slack`]]],
    [46, [[307, `If only I did not blindly do this..`]]],
    [47, [[307, `{{ IF goodRank }}Nicely done{{ ELSE }}I will definitely do better next time{{ FI }}`]]],
    [48, [[307, `{{ IF goodGrade }}Nicely done
                {{ ELSE }}
                    {{ IF badGrade }}Should do it better next time..
                    {{ ELSE }}Cool
                    {{ FI }}
                {{ FI }}`]]],
    [100, [[101, `Excited!`],
        [500, `Nonsense, I won't leave my beloved motherland`]]],
    [101, [[102, `Cool`]]],
    [102, [[308, `Cool`]]],
    [200, [[100, `Start a new MSCS emulator journey`]]],
    [500, [[100, `Start a new MSCS emulator journey`]]],
    [501, [[100, `Start a new MSCS emulator journey`]]],
    [502, [[100, `Start a new MSCS emulator journey`]]],
    [503, [[100, `Start a new MSCS emulator journey`]]],
    [504, [[100, `Start a new MSCS emulator journey`]]],
]);