// To cut the cost of deploying the app on a cloud server, 
// the app has to be fully static to be hosted on github.io page.
// Therefore the static texts has to be put into the code.

export const DESCRIPTION_TEXTS_MAP: Map<number, string[]> = new Map([
    // Ordinary event starts.
    [0, [`It's a fresh sprint, Your plan is..`, 
        `接下来的半个月要做些什么呢？`]],
    [1, [`You revised the course materials, went to office hours, and more prepared for the final.`, 
        `你复习了讲义, 参加了答疑, 你感觉对期末的准备更加充足了. `]],
    [2, [`You surfed in LoopedIn, WasteDay and other job listing websites and posted your resume.<br>
        Hopefully there will be some good news.`, 
        `你花费了大部分时间在如 零英 等其他招聘网站上投递你的简历<br>
        希望会有好消息吧. `]],
    [3, [`You spent the time in LetsCode for code practicing.<br>
        After coding and debugging and head stretching and keyboard punching,<br>
        You felt your coding skill improved.`, 
        `你花费了大部分的时间在 力抠 上刷题, <br>
        几度debug到骂娘摔键盘砸鼠标之后, <br>
        你感觉自己做题没那么蠢了. `]],
    [4, [`You stayed in apartment, watching the YeahTube and spent the time leisurely. `, 
        `干活是不可能干活的, 三点多饮茶先啦, <br>
        你度过了半个月的愉悦时光. `]],
    [5, [`The end of this semester draws near, profressors have annouced the final examination date.<br>
        And which is in this two weeks.`, 
        `期末将至, 考试时间是半个月后. `]],
    [6, [`You took the final on three subjects, the transcript is as below:<br>
        {{ subject1 }}<br>
        {{ subject2 }}<br>
        {{ subject3 }}<br>
        Your grade of this semester is {{ grade }}<br>
        The semester ended after all the final examinations finished.`, 
        `你参加了这学期三门课的期末, 成绩如下：<br>
        {{ subject1 }}<br>
        {{ subject2 }}<br>
        {{ subject3 }}<br>
        你这个学期的绩点是 {{ grade }}<br>
        终于又混完了一个学期. `]],
    [7, [`You received an email from HR at {{ companyName }}<br>
        they invited you for {{ IF intern }}internship{{ FI }} phone interview this week!`,
        `有 {{ companyName }} 的HR来问你这周是否有空参加他们的{{ IF intern }}实习{{ FI }}面试. `]],
    [8, [`You finished the phone interview with {{ companyName }}, HR told you to wait several days for the result.`, 
        `{{ companyName }}的电面结束啦, HR说几天后出结果. `]],
    [9, [`Congratulations! The HR from {{ companyName }} informed you that your phone interview has passed.<br>
        They will be coordinating with you about the next step very soon.`, 
        `恭喜! {{ companyName }} 的HR发来邮件祝贺你通过了电面! <br>
        然后继续让你等下一步的通知. `]],
    [10, [`The HR from {{ companyName }} informed you that they will not be moving forward with your application.<br>
        But they really appreciate your interest with their company.`, 
        `{{ companyName }}的HR发来邮件通知你电面没过, <br>
        并很客气的感谢了你对他们公司的兴趣. `]],
    [11, [`The HR from {{ companyName }} contacted with you about the onsite interview.<br>
        The interview has been scheduled on the next month, no reschedule available.<br>
        Meanwhile, due to cost cutting, the onsite interview has been changed to virtual onsite.`, 
        `{{ companyName }}的HR发来关于下一步现场面试的邮件, <br>
        时间是一个月之后, 不接受任何改期, <br>
        并且由于该司降本增笑的原因, 现场面试将改为线上面试. `]],
    [12, [`The HR from {{ companyName }} contacted with you about the onsite interview.<br>
        Unfortunately, due to more than expected compatitive applicants this year,<br> 
        they decide not move forward with your case.<br>
        They do, however, appreciate your interest with their company.`, 
        `{{ companyName }}的HR发来关于下一步现场面试的邮件, <br>
        很遗憾的通知你, 由于今年同学们都过于优秀, 我们的招聘指标提前用完了, <br>
        所以你早点回家洗洗睡吧, 啊不是, 所以期待你明年再投我们公司. `]],
    [13, [`You replied with confirmation of the virtual onsite.`, 
        `你赶紧回复HR确认了现场面试(迫真)的安排`]],
    [14, [`It's time for virtual onsite with {{ companyName }}. You joined the 5-round interview.<br>
        With 1 round behavior and 4 rounds of coding.<br>
        The HR emailed you that they will have the feedback and share with you in several days.`, 
        `今天就是跟{{ companyName }}现场面试的日子, 你参加了5轮背靠背面试, <br>
        一轮bq四轮coding的那种, <br>
        HR事后发来邮件说TA会收集面试官的反馈, 然后过几天给你消息. `]],
    [15, [`Congratulations, you did a great job in the onsite with {{ companyName }}!
        However, the recruiter thought that an additional round is needed to help to make the decision.
        The HR contacted you, asking if you want to schedule the additional round interview with them?`, 
        `祝贺你, 你在 {{ companyName }} 的现场面试中表现得针不戳, <br>
        不过呢, 从你的反馈来看需要加面, <br>
        HR发来邮件, 询问你是否愿意再参加加面？`]],
    [16, [`Your addtional interview with {{ companyName }} has been scheduled for the next month.<br>
        You then asked their HR if there is any eariler slot available, they did not reply you.`, 
        `和 {{ companyName }} 的加面被安排在了下个月, <br>
        你又去信询问HR能否尽量提前, 然而并没有人回你. `]],
    [17, [`You joined the addtional interview round with {{ companyName }}.<br>
        The HR emailed you that it will take several days for the result.`, 
        `今天你参加了 {{ companyName }} 的加面, <br>
        HR发来邮件说几天之后出结果. `]],
    [18, [`Congratulations! You passed the onsite interview of {{ companyName }} with flying colors!
        The HR will email you the offical offer letter and onboarding packet in the next one or two business days.`, 
        `祝贺你! 你通过了 {{ companyName }} 的面试! <br>
        HR之后会给你发来正式的offer信和入职文档包, <br>
        但是已经可以开香槟了! `]],
    [19, [`Congratulations, you have finished the onsite interview with {{ companyName }}!<br>
        However, after careful consideration, {{ companyName }} decide not move forward with your application.<br>
        They do, however, appreciate your interest with them.`, 
        `祝贺你, 你完成了 {{ companyName }} 的面试! <br>
        在面试官同学们的谨慎考虑下, 我们不得不做出一个艰难的决定, 很遗憾的通知你, 你的面试没有通过. <br>
        感谢你对我司的兴趣, 我们下次再见. `]],
    [20, [`You worked on the internship project assigned by your mentor.<br>
        {{ IF normalWork }}The project progress is on track.
        {{ ELSE }}
            {{ IF highWork }}The progress exceeded your expection.
            {{ ELSE }}Due to various reasons, the progress is behind the expection.
            {{ FI }}
        {{ FI }}`, 
        `你这半个月都在忙实习mentor给你分配的项目, <br>
        {{ IF normalWork }}项目进展如期
        {{ ELSE }}
            {{ IF highWork }}项目进展顺利
            {{ ELSE }}由于原粥碧少等原因, 项目进展不及预期……
            {{ FI }}
        {{ FI }}`]],
    [21, [`You finished the internship phone interview with {{ companyName }}, HR told you to wait several days for the result.`, 
        `{{ companyName }}的实习电面结束啦, HR发来邮件说几天后出结果. `]],
    [22, [`Congratulations! The {{ companyName }} HR informed you that your internship interview has passed!`, 
        `恭喜! {{ companyName }} 的HR发来邮件祝贺你通过了实习电面! `]],
    [23, [`The HR from {{ companyName }} informed you that they will not be moving forward with your internship application.<br>
        But they really appreciate your interest with {{ companyName }}.`, 
        `{{ companyName }}的HR发来邮件通知你实习电面没过, <br>
        并很客气的感谢了你对他们公司的兴趣. `]],
    [24, [`Your summer internship ends near.<br>
        Your mentor invites you to join the intern project demonstration meeting.
        Where the people on the high table will determine if a return offer will be extended for you.`, 
        `你的暑假实习即将结束, <br>
        你的mentor邀请你参加实习生项目展示会, <br>
        dalao们将会根据你在会上的表现来决定是否给你return offer. `]],
    [25, [`You demonstrated your project in intern project demo meeting.<br>
        {{ IF highWork }}Your team all presented to support you, they cheered on your accomplishment.<br>
        You felt really grateful, and really hopes the company can give you return offer.<br>{{ FI }}
        The HR contacted you later and said they will have the feedback in the following several weeks.`, 
        `你在会上展示了你做的项目, <br>
        {{ IF highWork }}你们组的同事们也都悉数到场为你喝彩, <br>
        你有点感动, 衷心的希望能够拿到return offer{{ FI }}
        HR之后发来邮件说会在几周内给你关于return offer的决定. `]],
    [26, [`The stressful work, and probability other activities, have drained your vigor completely<br>
        that you even missed the entire project demo meeting.<br>
        {{ IF highWork }}Worrying about your sanity, your manager talked with you later, comforting you that don't worry about the return offer.<br>{{ FI }}
        The HR contacted you later and said they will have the feedback in the following several weeks.`, 
        `劳累的工作（以及可能的提瓦特和/或罗德岛的事务）已经使你心力憔悴, <br>
        以至于你竟然没有参加实习生项目展示会! 
        {{ IF highWork }}你的老板担心你的身心状况, 安慰你先不要担心return offer的事情. <br>{{ FI }}
        HR之后发来邮件说会在几周内给你关于return offer的决定. `]],
    [27, [`Congratulations! The HR from {{ companyName }} contacted you that a return offer have been extended!`, 
        `祝贺你! {{ companyName }}的HR给你发return offer啦! `]],
    [28, [`The HR from {{ companyName }} contacted you that they will not move forward with your return offer with {{ companyName }}.`, 
        `{{ companyName }}的HR发来邮件说你的return offer被撤回了. `]],
    [29, [`You received email from EECS department that they are going to hold a career fair this week!`, 
        `今天你收到了计算机学院群发的邮件, 说学院将在这周举办这个学期的招聘会`]],
    [30, [`You suited up and carries dozens of resume with you to join the career fair.
        {{ IF goodPlace }}<br>As the school is next to numerous IT company offices,
            {{ IF badSchool }} despite the school is trash, there are still plenty of recuiters presented.<br>
            {{ ELSE }} the career fair is full of recuiters ready for hiring.<br>
            {{ FI }}
            You walked over countless boothes, talking with recuiters, and handed your resume to the them,<br>
            expecting there will be interviews soon.
        {{ ELSE }}<br>
            {{ IF goodSchool }}Despite the school is famous,
            {{ ELSE }}However, 
            {{ FI }}
            not quite a lot of companies came, meanwhile a lot of them are not opening to international students.<br>
            You went home dispointedly, with pile of resume that did not send out.
        {{ FI }}`, 
        `你换上一身正装拿着几打简历参加了招聘会, <br>
        {{ IF goodPlace }}由于你校附近IT企业云集,
            {{ IF badSchool }}即便你校只是个野鸡大学, 但是由于地理位置拔群, 仍有大群的HR参加了招聘会, <br>
            {{ ELSE }}参加招聘会的HR十分甚至九分的多. <br>
            {{ FI }}
            你在各个公司摊位流连忘返, 对着HR们指点江山, 小礼物装满了三个手提袋, <br>
            终于得意而归, 期待着面试滚滚而来. 
        {{ ELSE }}
            {{ IF goodSchool }}即便你校享誉全球, 
            {{ ELSE }}然而,  
            {{ FI }}
            并没有什么HR愿意来参加你校的招聘会, 甚至这些来了的公司里大半也只招绿卡或者公民. <br>
            你沮丧的回了家, 把剩下的几乎没怎么投出去的简历当草稿纸用了. 
        {{ FI }}`]],
    [31, [`You decided not to join the career fair, which should be just a waste of time.<br>
        {{ IF goodPlace }}However that is untrue, you saw your friends shared their experience on the career fair event,<br>
        that how many opportunities they got, and some even got interview right afterwards.<br>
        You start to regret on that bad decision, but this helps nothing.
        {{ ELSE }}And yes your are correct, those went to that career fair got nothing but waste several valuable hours in their life.<br>
        You got some good rest at home, watched animes and played GirlsFrontline, where the moe girls cured your heart.
        {{ FI }}`, 
        `你并不打算去参加招聘会, 参加这种垃圾活动不就是浪费青春么<br>
        {{ IF goodPlace }}然而事实证明你失算了,不久之后你就看见了你同学们发的朋友圈, 招聘会现场盛况空前, <br>
        面试机会唾手可得, 甚至有人因为跟HR尬聊愉快而直接拿了offer. <br>
        你被破防了, 然而这也没什么卵用. 
        {{ ELSE }}事实证明你是对的, 来参加招聘会的HR们只是来公款旅游加带薪玩手机罢了, 那些做了十足准备去招聘会的同学成了纯纯的小丑. <br>
        而你则在迦勒底度过了脸黑但充实的一天. 
        {{ FI }}`]],
    [32, [`Your classmates invited you to join them group working on the current homework.`, 
        `今天下课的时候你的同学问你要不要和他们一起写作业. `]],
    [33, [`You accepted the invitation and joined the group study.<br>
        With each of you worked on one part of the assignment, a 5-day dued assignment finished within a single night.<br>
        You won several days free time for resting, and a nice grade on the assignment.`, 
        `你答应了并参加了作业讨论, <br>
        大家分工明确, 每人找作业其中几道题的答案. 很快这个要做五天的作业一晚上就被你们整完了. <br>
        你很高兴的摸了四天鱼, 作业交上去也拿了高分. `]],
    [34, [`You rejected your classmates' invitation as you noticed that they only want to copy your finished assignments.<br>
        But your relationship with them, however, has been inevitablely demaged.`, 
        `你回绝了你同学的邀请, 这帮人不过就是想让你输出罢了, <br>
        然后你不出所料的被全体中国留学生疏远了. `]],
    [35, [`You are not familiar with those classmates, and thus rejected their invitation.<br>
        Your relationship with them, alas, has been inevitablely demaged.`, 
        `你回绝了你同学的邀请, 因为你跟他们不熟, <br>
        然而这样你也就跟他们永远混不熟了. `]],
    [36, [`While you are working on the assignment,<br>
        you find the one the Google result is exactly the question you are working on.<br>
        Clicking into the webpage, you found the answer of the question, you decided to...`, 
        `今天当你在网上搜索作业相关的资料时, <br>
        你发现了cheeg上有跟你的作业题一模一样的题目, <br>
        在开了7天免费会员之后你看到了答案, 你决定……`]],
    [37, [`You submitted the assignment with multiple answers copied from the internet.<br>
        {{ IF cheatSuccess }}Nothing happened, your assignment got high grade.
        {{ ELSE }}Serveral days later, you received an email from TA also cc-ed the professor,<br>
        which was wondering why your solution was almost the same with one of the solution exists on the internet.<br>
            {{ IF highStudy }}You explained to TA and showed them how to derive the result,<br>
            they seemed convinced by your explanation. However, that was a quite scary experience.
            {{ ELSE }}Your explanation was feeble as you cannot give the correct answer when the question was slightly changed.<br>
            The TA therefore gave you zero on this assignment and warned you if this happens ever again they will report to the dean's office.
            {{ FI }}
        {{ FI }}`, 
        `你照抄了你找到的答案后交了作业, <br>
        {{ IF cheatSuccess }}无事发生, 作业拿了高分. 
        {{ ELSE }}然而几天之后, 你收到助教发来并抄送教授的邮件, 列出了你抄答案的网站链接, 并质疑你的作业跟网上的答案为何出奇的相似. <br>
            {{ IF highStudy }}你早有准备, 找到助教并且现场演示了如何推出那些答案, <br>
            由于找不出破绽, 助教被迫相信了你的说辞. <br>
            不过这也是够吓人的了. 
            {{ ELSE }}你那骗智障一样的说辞加深了助教的怀疑, 他跟你约了线下答疑时间让你澄清, 结果题目改个参数你就看不出来了, <br>
            助教欣喜若狂的给了你作业零分, 并警告你如果再被发现抄作业答案, 他就去上报学院了. 
            {{ FI }}
        {{ FI }}`]],
    [38, [`During the presentation of one of the class this week, your teammate seems under prepared.<br>
        {{ IF highStudy }}Thanks your extra preparation, you carried the their part and saved your team's presentation.<br>
        The professor gave you extra credit as your performance exceeded the expectation.
        {{ ELSE }}Though you did your part, the final score is still very low.<br>
        You felt desprately helpless, seeing your effort ruined by the mistake of somebody else.
        {{ FI }}`, 
        `在这周轮到你们组讲PPT的时候, 你的队友毫无准备, 发言宛如智障<br>
        {{ IF highStudy }}幸亏你平时学习勤奋, 可以把本来属于你队友讲的内容也勉强讲明白. <br>
        教授给你额外加了分数来奖励你的救场. 
        {{ ELSE }}所以尽管你讲的部分中规中矩, 但是最后的得分依旧很低. <br>
        你心里问候了这个损人不利己的智障东西全家, 然而这并没有什么乱用. 
        {{ FI }}`]],
    [39, [`For various reasons, you did not prepared for an upcoming team presentation in this week.<br>
        During your part in the presentation, you several times lost topic and your talking was disorganized.<br>
        The presentation score was therefore pretty miserable...<br>
        Your teammate yelled at you after class, you felt very bad as well.`, 
        `由于在召唤师峡谷、海拉鲁、博德之门等地的事务繁忙, 你没来得及准备这周课上轮到你们组讲的PPT. <br>
        所以轮到你讲的时候, 你的表演内容支离破碎, 令教室内外都充满了快活的空气. <br>
        教授不出意外的因为过于高兴给了你们组最低分. <br>
        你的队友们下课阴阳了你两句后跟你不欢而散, 你也感觉有点对不起他们的辛苦准备. `]],
    [40, [`After finished a large project assignment, you packed up the files and submitted the assignment.<br>
        However, after a few days you saw the assignment grade is 0.<br>
        You then found that you only packed up some useless output file instead of the code carelessly.<br>
        In despair, you came to the professor's office and try to explain.<br>
        {{ IF highStudy }}Fortunately, as you were pretty familiar with the professor, the professor comforted you <br>
        and give you a second chance to re-submit your work.<br>
        You did not mess it up this time and the corrected grade is as high as it should be.<br>
        Though the accident ended up with narrow escape, you still emotionally damaged a bit.
        {{ ELSE }}The professor first had a bit difficulty remember who you are.<br>
        And then told you that all submissions are final, they can help nothing on this.<br>
        And, nonetheless, hope you can do better in the next assignment.
        {{ FI }}`, 
        `你终于完成了大作业, 并赶在截止时间前打包上传了它. <br>
        然而几天后你惊讶的发现成绩居然是零分, <br>
        你看了助教批语, 自己居然打包错文件了, 代码文件一个都没交上去. <br>
        你人麻了, 赶紧去找教授问问还有没有救. <br>
        {{ IF highStudy }}幸亏你平时学习勤奋, 答疑每回都去, 教授认出你来, 给了你一个重新提交的机会. <br>
        你叩谢隆恩之后马上上机重新上传, 顺手还参照(出分后助教给的)范例代码改了几处bug. <br>
        改分之后你的作业成绩也是如你所愿的高. <br>
        虽然虚惊一场, 但是你今天还是承受了成吨的精神伤害. 
        {{ ELSE }}教授不为所动, 强调出分后的分数就改不了了, 与其在这浪费时间还不如吸取教训, 好好准备下次的作业. <br>
        你心里认真的替教授反思了一下他的木琴为什么要把他生下来, 但现在看起来除了无能狂怒也没有别的办法了.
        {{ FI }}`]],
    [41, [`You were invited to join a party with classmates.<br>
        {{ IF nerd }}As you are a nerd and have no close friends,<br>
        Those classmates were just hanging around like you are invisible.<br>
        You spent an awful night listening to their bullshit and getting cold shoulder.
        {{ ELSE }}
            {{ IF social }}As you are known as a social person, you joined the party without hesitence.<br>
            And had a good time in cheers and laugher,<br>
            really hopes that the party could be all day long.
            {{ ELSE }}You accepted the event for better food and good relaxing vibe.
            {{ FI }}
        {{ FI }}`, 
        `你的同学拉你去一个周末的饭局, <br>
        {{ IF nerd }}然而你周末到场之后发现不认识几个人, 社牛们在各自早就形成的小团体里各玩各的, <br>
        除了散场前找你摊钱, 整场party没有人主动找你搭话. <br>
        虽然没指望在这次party上散心, 但你的精神状态反而更差了. 
        {{ ELSE }}
            {{ IF social }}这种事怎么可能少了你呢. 社牛的你就是party的中心, 一天天的刷题和找工, 我们就不能回归小留初心么. <br>
            酣畅淋漓的玩了一宿之后, 你的精神状态反而更好了. 
            {{ ELSE }}你跟着去了, party上社牛在装逼, 但是跟你有什么关系呢, 还是多吃点贵的好吃的东西吧家人们. 
            {{ FI }}
        {{ FI }}`]],
    [42, [`{{ IF inSemester }}After a hardworking day,{{ FI }}
        {{ IF inWork }}After a stressful day of intern working,{{ FI }}
        {{ IF inRest }}Just a normal vecation day{{ FI }}
        you went to bed after scrolled smart phone for almost an hour<br>
        You then found your mind is incredibly consious and every brain cell refused to go to sleep.<br>
        You stayed awake till morning twilight shined in.<br>
        You felt both physically and emotionally damaged. 
        {{ IF inSemester }}Yet you have to get up and go to school.{{ FI }}
        {{ IF inWork }}Yet you have to get up and go to work.{{ FI }}
        {{ IF inRest }}Fortunately, you can have some extra rest time as you are in an ideling vecation.{{ FI }}`, 
        `{{ IF inSemester }}在一天辛勤的学习结束后, {{ FI }}
        {{ IF inWork }}在一天辛苦的实习结束后, {{ FI }}
        {{ IF inRest }}一个平平无奇摸鱼的日子, {{ FI }}
        你在睡觉前不小心划了一个多小时的手机, 然后你就发现无论如何你都睡不着了.<br>
        你绝望的清醒到第二天清晨, 身心憔悴<br> 
        {{ IF inSemester }}然而这天居然还有早八课.{{ FI }}
        {{ IF inWork }}然而你今天早上还要跟mentor 1:1汇报进度.{{ FI }}
        {{ IF inRest }}不过问题不大, 摸鱼中的你早上成功睡了下来, 下午才起.{{ FI }}`]],
    [43, [`You decided to eat outside in a nearby Chinese restaurant today, instead of cooking at home.<br>
        {{ IF eatGood }}The food was nice and you had an enjoyful meal.
        {{ ELSE }}The taste of food was trash and seemed even unwashed before cooking.<br>
        You got sick shortly after you went home. 
        {{ FI }}`, 
        `你决定今天不做饭了去附近的中餐馆吃,<br>
        {{ IF eatGood }}餐馆做的菜好吃便宜, 满足了你的中国胃的渴求. 
        {{ ELSE }}很不幸这家餐馆的大师傅是个被裁的程序员, 这菜里居然有bug, <br>
        你被恶心的回家后一两天吃不下饭.
        {{ FI }}`]],
    [44, [`Today when you are working, the small chat between two your teammates attracted you.<br>
        You joined and heared a bunch of gossip of the org.<br>
        They told you this org is brutal and harsh.<br>
        You was not paying too much attention, until two days later your manager told your team that<br>
        one of your teammates small talking at that time was pipped.<br>
        Though you felt that teammate deserves it as he do not work that much, you were still frightened.`, 
        `今天你正在干活时, 被旁边两个同事的闲聊吸引了. <br>
        你决定释放天性, 加入吃瓜. <br>
        他们毫不避讳的跟你吐槽这个组有多坑多累, 老板还吵不过别人只能背名额. <br>
        你最开始并没有太在意这些, 直到两天之后其中一个同事被PIP了. <br>
        虽然你觉得他罪有应得, 毕竟他经常摸鱼, 但是你仍然被这职场的残酷震撼到了.`]],
    [45, [`Public holiday is coming and far less people came to office this week.<br>
        You thought this could be a good chance to develop your devlopment skills.<br>
        You decided to ask your mentor to give you some database script to start to play with.`, 
        `这周有个公共假日, 来公司上班的人明显少了很多, 你也有点闲了. <br>
        你想借此机会来在实习项目之外拓展一下个人能力, 以便今后面试吹逼. <br>
        于是你找你的mentor要了个运维用的数据库脚本来跑着玩.`]],
    [46, [`The script is basically select all records in table and delete them.<br>
        Except the table is a prodcution table.<br>
        You managed to get sufficient permission to execute the script without look into it.<br>
        The script executed successfully, and the production environment crashed immediately afterwards.<br>
        SEV 1 declared, LSE declared shortly after, millions of dollars burt during this servive unavailable time.<br>
        You were shocked at the destruction you made, thought you will be fired.<br>
        While your manager did not do so,<br>
        she just comforted you and said this indicates loopholes in our system we needs to fix, we just found it in a difficult way<br>
        You felt much relieved, however parts of you still think that this accident will not leave you without hurting you.`, 
        `这个脚本本质上来说是删除一个表里的全部记录, 本身并没有什么问题. <br>
        除了表名是个刚上线的新生产环境的数据库, <br>
        你设法解决了你遇到的权限不足的问题, 志得意满的执行了脚本. <br>
        脚本执行的很成功, 那个库被删干净了. <br>
        然后你就听到了办公室里的pager一个接一个的响了起来, 聊天室里炸了锅, 几十个工程师被拉进war room紧急应对这个重大生产事故. <br>
        事后的COE报告表明你造成了百万美元级别的损失.<br>
        你以为你会被立即开除, 然而你的老板安慰你说真正的责任不在你, 而在于我们的权限系统的不完善, 我们只是以一种不愉快的方式发现了它. <br>
        你感觉好了很多, 然而你任然隐隐觉得这个事故的锅不会就这么离你而去.`]],
    [47, [`You joined the weekly coding contest of letscode in this week.<br>
        {{ IF goodRank }}You crushed the problems and got a good rank.
        {{ ELSE }}You have no idea to those problems and got a poor rank
        {{ FI }}`, 
        `你参加了这周的 力抠 的周赛. <br>
        {{ IF goodRank }}你技压群雄, raing又涨了.
        {{ ELSE }}然而你太菜了, raing又掉了.
        {{ FI }}`]],
    [48, [`You got the email notification about the grade released on your last homework assigment.<br>
        {{ IF goodGrade }}Your last submission was perfect and got a good grade.
        {{ ELSE }}
            {{ IF badGrade }}Your last submission is chaos and got a bad grade.
            {{ ELSE }}Your last submission was good, and got a average grade.
            {{ FI }}
        {{ FI }}`, 
        `你收到助教发的邮件, 前几天交的作业出分了. <br>
        {{ IF goodGrade }}你那次交的作业基本全对, 拿了高分.
        {{ ELSE }}
            {{ IF badGrade }}你那次交的作业狗屁不通, 拿了低分.
            {{ ELSE }}你那次交的作业不好不坏, 比平均分高些.
            {{ FI }}
        {{ FI }}`]],
    // Ordinary events end.
    // Opening events start.
    [100, [`It's time! You decide to apply for CS Master's program in US!`, 
        `是时候了! 你决定申请美研CS项目!`]],
    [101, [`One of your application has been admitted and you decide to accept the offer!`, 
        `你收到了几份offer, 一番挑选后你决定接受其中之一!`]],
    // Opening events end.
    // Good end events start.
    [200, [`Congratulations! You graduated from school with dipolma (somewhat unimportant) <br>
        AND a shiney accepted offer letter from an IT company!<br>
        Your OPT application has been approved, bon voyage on your new jouney!`, 
        `祝贺你! 你顺利的完成了学校的美研CS项目(当然并不重要)<br>
        并且成功的拿到了全职软件开发工程师的offer!<br>
        你的OPT申请已经通过, 祝你接下来一路顺风!`]],
    // Good end events end.
    // Bad end events start.
    [500, [`You decide not to proceed MSCS in US.`, 
        `思前想后, 你决定还是留在国内吧.`]],
    [501, [`You cannot suffer the life in here anymore, both mentally and physcially. <br>
        You decide to go back home and never come back.`, 
        `你觉得在这的每一天都是身心不可承受之折磨, <br>
        你决定放弃美研CS项目, 逃回国内, 永远不再回到美国这个地狱了.`]],
    [502, [`Despite you might hard work, your grade is belowing the bar<br>
        and the school decide to drop you off the Master's program.<br>
        Your visa expired and you have to go back home.`, 
        `尽管你觉得你认真努力的学习了, 你的绩点仍然低于学院的要求,<br>
        校方决定将你退学.<br>
        你的F1身份也因此没了, 只得收拾东西回国.`]],
    [503, [`Despite you might hard work.<br>
        For various reasons, you still have no offer until the OPT grace period ends.<br>
        Your visa expired and you have to go back home.`, 
        `尽管你顺利毕业, 也自以为认真努力的刷题找工了.<br>
        可直到你用完OPT失业期你也没有拿到一个offer,<br>
        你失去了居留美国的合法身份, 只得收拾东西回国.`]],
    [504, [`Despite you repeatedly explain to the school how important your other thing is<br>
        compared to the exam, they still dropped you as absence in final is an instant F.<br>
        Those stubborn bureaucrat ruined your vacation as well as your dream as an MSCS student.<br>
        You posted long and colorful post accuse this school in LitterRatBook and 1Point4Acres.<br>
        But it cannot help you from being revoked from student visa and forced to go back home.`, 
        `尽管你向学校努力解释自已因其他重要原因而未能来参加期末,<br>
        但学院依旧以你缺考为由给了你一个F, 并因此将你退学,<br>
        这群脑满肠肥的官僚主义屌丝肯定是嫉妒你那缤纷多彩的校外生活才如此妨害你的美研CS项目.<br>
        你在如小薨书和一亩三坟地等平台上大发小作文痛批这个无良学校<br>
        虽然你涨粉不少, 还接了商单, 但这改变不了你痛失F1身份只得收拾东西回国的现实.`]]
    // Bad end events end.
]);