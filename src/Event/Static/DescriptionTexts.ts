// To cut the cost of deploying the app on a cloud server, 
// the app has to be fully static to be hosted on github.io page.
// Therefore the static texts has to be put into the code.

export const DESCRIPTION_TEXTS_MAP: Map<number, string> = new Map([
    // Ordinary event starts.
    [0, `It's a fresh spint, Your plan is..`],
    [1, `You revised the course materials, went to office hours, and more prepared for the final.`],
    [2, `You surfed in LoopedIn, WasteDay and other job listing websites and posted your resume.<br>
        Hopefully there will be some good news.`],
    [3, `You spent the time in LetsCode for code practicing.<br>
        After coding and debugging and head stretching and keyboard punching,<br>
        You felt your coding skill improved.`],
    [4, `You stayed in apartment, watching the YeahTube and spent the time leisurely. `],
    [5, `The end of this semester draws near, profressors have annouced the final examination date.<br>
        And which is in this two weeks.`],
    [6, `You took the final on three subjects, the transcript is as below:<br>
        {{ subject1 }}<br>
        {{ subject2 }}<br>
        {{ subject3 }}<br>
        Your grade of this semester is {{ grade }}<br>
        The semester ended after all the final examinations finished.`],
    [7, `You received an email from HR at {{ companyName }}<br>
        they invited you for {{ IF intern }}internship{{ FI }} phone interview this week!`],
    [8, `You finished the phone interview with {{ companyName }}, HR told you to wait several days for the result.`],
    [9, `Congratulations! The HR from {{ companyName }} informed you that your phone interview has passed.<br>
        They will be coordinating with you about the next step very soon.`],
    [10, `The HR from {{ companyName }} informed you that they will not be moving forward with your application.<br>
        But they really appreciate your interest with their company.`],
    [11, `The HR from {{ companyName }} contacted with you about the onsite interview.<br>
        The interview has been scheduled on the next month, no reschedule available so far.<br>
        Meanwhile, due to cost cutting, the onsite interview has been changed to virtual onsite.`],
    [12, `The HR from {{ companyName }} contacted with you about the onsite interview.<br>
        Unfortunately, due to more than expected compatitive applicants this year,<br> 
        they decide not move forward with your case.<br>
        They do, however, appreciate your interest with their company.`],
    [13, `You replied with confirmation of the virtual onsite.`],
    [14, `It's time for virtual onsite with {{ companyName }}. You joined the 5-round interview.<br>
        With 1 round behavior and 4 rounds of coding.<br>
        The HR emailed you that they will have the feedback and share with you in several days.`],
    [15, `Congratulations, you did a great job in the onsite with {{ companyName }}!
        However, the recruiter thought that an additional round is needed to help to make the decision.
        The HR contacted you, asking if you want to schedule the additional round interview?`],
    [16, `Your addtional interview with {{ companyName }} has been scheduled for the next month.<br>
        You then asked their HR if there is any eariler slot available, they did not reply you.`],
    [17, `You joined the addtional interview round with {{ companyName }}.<br>
        The HR emailed you that it will take several days for the result.`],
    [18, `Congratulations! You passed the onsite interview of {{ companyName }} with flying colors!
        The HR will email you the offical offer letter and onboarding packet in the next one or two business days.`],
    [19, `Congratulations, you have finished the onsite interview with {{ companyName }}!<br>
        However, after careful consideration, {{ companyName }} decide not move forward with your application.<br>
        They do, however, appreciate your interest with them.`],
    [20, `You worked on the internship project assigned by your mentor.<br>
        {{ IF normalWork }}The project progress is on track.
        {{ ELSE }}
            {{ IF highWork }}The progress exceeded your expection.
            {{ ELSE }}Due to various reasons, the progress is behind the expection.
            {{ FI }}
        {{ FI }}`],
    [21, `You finished the internship phone interview with {{ companyName }}, HR told you to wait several days for the result.`],
    [22, `Congratulations! The {{ companyName }} HR informed you that your internship interview has passed!`],
    [23, `The HR from {{ companyName }} informed you that they will not be moving forward with your internship application.<br>
        But they really appreciate your interest with {{ companyName }}.`],
    [24, `Your summer internship ends near.<br>
        Your mentor invites you to join the intern project demonstration meeting.
        Where the people on the high table will determine if a return offer will be extended for you.`],
    [25, `You demonstrated your project in intern project demo meeting.<br>
        {{ IF highWork }}Your team all presented to support you, they cheered on your accomplishment.<br>
        You felt really grateful, and really hopes the company can give you return offer.<br>{{ FI }}
        The HR contacted you later and said they will have the feedback in the following several weeks.`],
    [26, `The stressful work, and probability other activities, have drained your vigor completely<br>
        that you even missed the entire project demo meeting.<br>
        {{ IF highWork }}Worrying about your sanity, your manager talked with you later, comforting you that don't worry about the return offer.{{ FI }}
        The HR contacted you later and said they will have the feedback in the following several weeks.`],
    [27, `Congratulations! The HR from {{ companyName }} contacted you that a return offer have been extended!`],
    [28, `The HR from {{ companyName }} contacted you that they will not move forward with your return offer with {{ companyName }}.`],
    [29, `You received email from EECS department that they are going to hold a career fair this week!`],
    [30, `You dressed up and carries dozens of resume with you to join the career fair.
        {{ IF goodPlace }}<br>As the school is next to numerous IT company offices,
            {{ IF badSchool }} despite the school is trash, there are still plenty of recuiters presented.<br>
            {{ ELSE }} the career fair is full of recuiters ready for hiring.<br>
            {{ FI }}
            You walked over countless boothes, talking with recuiters, and handed your resume to the them,<br>expecting there will be interviews soon.
        {{ ELSE }}<br>
            {{ IF goodSchool }}Despite the school is famous,
            {{ ELSE }}However, 
            {{ FI }}
            not quite a lot of companies came, meanwhile a lot of them are not opening to international students.<br>
            You went home dispointedly, with pile of resume that did not send out.
        {{ FI }}`],
    [31, `You decided not to join the career fair, which should be just a waste of time.
        {{ IF goodPlace }}<br>However that is untrue, you saw your friends shared their experience on the career fair event,<br>
        that how many opportunities they got, and some even got interview right afterwards.<br>
        You start to regret on that bad decision, but this helps nothing.
        {{ ELSE }}<br>And yes your are correct, those went to that career fair got nothing but waste several valuable hours in their life.<br>
        You got some good rest at home, watched animes and played GirlsFrontline, where the moe girls cured your heart.
        {{ FI }}`],
    [32, `Your classmates invited you to join them group working on the current homework.`],
    [33, `You accepted the invitation and joined the group study.<br>
        With each of you worked on one part of the assignment, a 5-day dued assignment finished within a single night.<br>
        You won several days free time for resting, and a nice grade on the assignment.`],
    [34, `You rejected your classmates' invitation as you noticed that they only want to copy your finished assignments.<br>
        But your relationship with them, however, has been inevitablely demaged.`],
    [35, `You are not familiar with those classmates, and thus rejected their invitation.<br>
        Your relationship with them, alas, has been inevitablely demaged.`],
    [36, `While you are working on the assignment,<br>
        you find the one the Google result is exactly the question you are working on.<br>
        Clicking into the webpage, you found the answer of the question, you decided to...`],
    [37, `You submitted the assignment with multiple answers copied from the internet.<br>
        {{ IF cheatSuccess }}Nothing happened, your assignment got high grade.
        {{ ELSE }}Serveral days later, you received an email from TA also cc-ed the professor,<br>
        which was wondering why your solution was almost the same with one of the solution exists on the internet.<br>
            {{ IF highStudy }}You explained to TA and showed them how to derive the result,<br>
            they seemed convinced by your explanation. However, that was a quite scary experience.
            {{ ELSE }}Your explanation was feeble as you cannot give the correct answer when the question was slightly changed.<br>
            The TA therefore gave you zero on this assignment and warned you if this happens ever again they will report to the dean's office.
            {{ FI }}
        {{ FI }}`],
    [38, `During the presentation of one of the class this week, your teammate seems under prepared.<br>
        {{ IF highStudy }}Thanks your extra preparation, you carried the their part and saved your team's presentation.<br>
        The professor gave you extra credit as your performance exceeded the expectation.
        {{ ELSE }}Though you did your part, the final score is still very low.<br>
        You felt desprately helpless, seeing your effort ruined by the mistake of somebody else.
        {{ FI }}`],
    [39, `For various reasons, you did not prepared for an upcoming team presentation in this week.<br>
        During your part in the presentation, you several times lost topic and your talking was disorganized.<br>
        The presentation score was therefore pretty miserable...<br>
        Your teammate yelled at you after class, you felt very bad as well.`],
    [40, `After finished a large project assignment, you packed up the files and submitted the assignment.<br>
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
        {{ FI }}`],
    [41, `You were invited to join a party with classmates.<br>
        {{ IF nerd }}As you are a nerd and have no close friends,<br>
        Those classmates were just hanging around like you are invisible.<br>
        You spent an awful night listening to their bullshit and getting cold shoulder.
        {{ ELSE }}
            {{ IF social }}As you are known as a social person, you joined the party without hesitence.<br>
            And had a good time in cheers and laugher,<br>
            really hopes that the party could be all day long.
            {{ ELSE }}You accepted the event for better food and good relaxing vibe.
            {{ FI }}
        {{ FI }}`],
    [42, `{{ IF inSemester }}After a hardworking day,{{ FI }}
        {{ IF inWork }}After a stressful day of intern working,{{ FI }}
        {{ IF inRest }}Just a normal vecation day{{ FI }}
        you went to bed after scrolled smart phone for almost an hour<br>
        You then found your mind is incredibly consious and every brain cell refused to go to sleep.<br>
        You stayed awake till morning twilight shined in.<br>
        You felt both physically and emotionally damaged. 
        {{ IF inSemester }}Yet you have to get up and go to school.{{ FI }}
        {{ IF inWork }}Yet you have to get up and go to work.{{ FI }}
        {{ IF inRest }}Fortunately, you can have some extra rest time as you are in an ideling vecation.{{ FI }}`],
    [43, `You decided to eat outside in a nearby Chinese restaurant today, instead of cooking at home.<br>
        {{ IF eatGood }}The food was nice and you had an enjoyful meal.
        {{ ELSE }}The taste of food was trash and seemed even unwashed before cooking.<br>
        You got sick shortly after you went home. 
        {{ FI }}`],
    [44, `Today when you are working, the small chat between two your teammates attracted you.<br>
        You joined and heared a bunch of gossip of the org.<br>
        They told you this org is brutal and harsh.<br>
        You was not paying too much attention, until two days later your manager told your team that<br>
        one of your teammates small talking at that time was pipped.<br>
        Though you felt that teammate deserves it as he do not work that much, you were still frightened.`],
    [45, `Public holiday is coming and far less people came to office this week.<br>
        You thought this could be a good chance to develop your devlopment skills.<br>
        You decided to ask your mentor to give you some database script to start to play with.`],
    [46, `The script is basically select all records in table and delete them.<br>
        Except the table is a prodcution table.<br>
        You managed to get sufficient permission to execute the script without look into it.<br>
        The script executed successfully, and the production environment crashed immediately afterwards.<br>
        SEV 1 declared, LSE declared shortly after, millions of dollars burt during this servive unavailable time.<br>
        You were shocked at the destruction you made, thought you will be fired.<br>
        While your manager did not do so,<br>
        she just comforted you and said this indicates loopholes in our system we needs to fix, we just found it in a difficult way<br>
        You felt much relieved, however parts of you still think that this accident will not leave you without hurting you.`],
    [47, `You joined the weekly coding contest of letscode in this week.<br>
        {{ IF goodRank }}You crushed the problems and got a good rank.
        {{ ELSE }}You have no idea to those problems and got a poor rank
        {{ FI }}`],
    [48, `You got the email notification about the grade released on your last homework assigment.<br>
        {{ IF goodGrade }}Your last submission was perfect and got a good grade.
        {{ ELSE }}
            {{ IF badGrade }}Your last submission is chaos and got a bad grade.
            {{ ELSE }}Your last submission was good, and got a average grade.
            {{ FI }}
        {{ FI }}`],
    // Ordinary events end.
    // Opening events start.
    [100, `It's time! You decide to apply for CS Master's program in US!`],
    [101, `One of your application has been admitted and you decide to accept the offer!`],
    // Opening events end.
    // Good end events start.
    [200, `Congratulations! You graduated from school with dipolma (somewhat unimportant) <br>
        AND a shiney accepted offer letter from an IT company!<br>
        Your OPT application has been approved, bon voyage on your new jouney!`],
    // Good end events end.
    // Bad end events start.
    [500, `You decide not to proceed MSCS in US.`],
    [501, `You cannot suffer the life in here anymore, both mentally and physcially. <br>
        You decide to go back home and never come back.`],
    [502, `Despite you might hard work, your grade is belowing the bar<br>
        and the school decide to drop you off the Master's program.<br>
        Your visa expired and you have to go back home.`],
    [503, `Despite you might hard work.<br>
        For various reasons, you still have no offer until the OPT grace period ends.<br>
        Your visa expired and you have to go back home.`],
    [504, `Despite you repeatedly explain to the school how important your other thing is<br>
        compared to the exam, they still dropped you as absence in final is an instant F.<br>
        Those stubborn bureaucrat ruined your vacation as well as your dream as an MSCS student.<br>
        You posted long and colorful post accuse this school in LitterRatBook and 1Point4Acres.<br>
        But it cannot help you from being revoked from student visa and forced to go back home.`]
    // Bad end events end.
]);