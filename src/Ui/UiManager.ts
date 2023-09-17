import { Parameter } from "../Player/Parameter";
import { CALENDAR } from "../Utils/Calendar";
import { Player } from "../Player/Player";

export class UiManager {

    printFrame(player: Player): void {
        this.printParameter(player.parameter);
        this.printAttributes(player.attributeStrings);
        this.printTime(player.round);
    }

    reset(): void {
        this.clearContainer(document.getElementById("event-message-box")!);
        this.clearContainer(document.getElementById("event-option-window")!);
        this.clearContainer(document.getElementById("study-value-span")!);
        this.clearContainer(document.getElementById("scores-value-span")!);
        this.clearContainer(document.getElementById("coding-value-span")!);
        this.clearContainer(document.getElementById("health-value-span")!);
        this.clearContainer(document.getElementById("attribute-window")!);
        this.clearContainer(document.getElementById("time-value-box")!);
    }

    async printAndSetupEvent(description: string, options: Map<number, string>): Promise<number> {
        // Print event description.
        let eventDescriptionBox = document.getElementById("event-message-box")!;
        eventDescriptionBox.innerHTML = description;
        // Setup and print event options.
        let eventOptionsDiv = document.getElementById("event-option-window")!;
        let clickPromises: Promise<number>[] = [];
        for(let [nextEventId, optionText] of options.entries()) {
            let nextEventAddr = document.createElement("a");
            nextEventAddr.text = optionText;
            nextEventAddr.dataset.eventid = nextEventId.toString();
            nextEventAddr.className ="btn";
            eventOptionsDiv.appendChild(nextEventAddr);
            let onclickPromise = new Promise<number>(resolve => {
                nextEventAddr.onclick = () => {
                    this.clearContainer(eventOptionsDiv);
                    resolve(+(nextEventAddr.dataset.eventid!));
                }
            })
            clickPromises.push(onclickPromise);
        }
        return Promise.any(clickPromises);
    }

    printParameter(parameter: Parameter): void {
        // Update study value.
        let studyValueSpan = document.getElementById("study-value-span")!;
        studyValueSpan.innerHTML = parameter.study.toString();
        // Update scores value.
        let scoresValueSpan = document.getElementById("scores-value-span")!;
        scoresValueSpan.innerHTML = this.scoreValueToDisplay(parameter.scores);
        // Update coding value.
        let codingValueSpan = document.getElementById("coding-value-span")!;
        let codingDisplayValue = this.codingValueToDisplay(parameter.coding);
        codingValueSpan.innerHTML = codingDisplayValue;
        // Update health value.
        let healthValueSpan = document.getElementById("health-value-span")!;
        healthValueSpan.innerHTML = parameter.health.toString();
    }

    printAttributes(attributeStrings: string[]): void {
        let attributeDiv = document.getElementById("attribute-window")!;
        this.clearContainer(attributeDiv);
        for(let attributeString of attributeStrings) {
            let attributeStringText = document.createElement("p");
            attributeStringText.innerHTML = attributeString;
            attributeDiv.appendChild(attributeStringText);
        }
    }

    printTime(round: number): void {
        let timeValueBox = document.getElementById("time-value-box")!;
        timeValueBox.innerHTML = this.roundToDisplay(round);
    }

    private scoreValueToDisplay(scores: string[]): string {
        let tagStart: string = "<span>", tagEnd: string = "</span>";
        if (scores.length == 0) {
            return tagStart +  "N/A" + tagEnd;
        } else {
            let res: string = "";
            for (let i = 0; i < scores.length; ++i) {
                if (i != 0) {
                    res += "->";
                }
                res += tagStart + scores[i] + tagEnd;
            }
            return res;
        }
    }

    private codingValueToDisplay(value: number): string {
        if (value <= 1) return "Newbie";
        if (value <= 16) return "Normal";
        if (value <= 32) return "Experienced";
        if (value <= 64) return "Master";
        else return "GrandMaster";
    }

    private roundToDisplay(value: number): string {
        return CALENDAR.get(value)!;
    }

    private clearContainer(container: HTMLElement): void {
        while(container.firstChild) {
            container.removeChild(container.lastChild!);
        }
    }
}