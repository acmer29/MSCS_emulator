export class SuThemePrinter {
    printSuTheme() {
        let suSeal = document.getElementById("su-su-seal")!;
        suSeal.style.display = "block";
    }

    clearSuTheme() {
        let suSeal = document.getElementById("su-su-seal")!;
        suSeal.style.display = "none";
    }
}