import { registerFont } from "ultimate-text-to-image";

// registerFont("assets/fonts/Gveret Levin Alef Alef Alef.ttf");
registerFont("assets/fonts/Dybbuk.ttf");
registerFont("assets/fonts/Motek Bold.ttf");
registerFont("assets/fonts/DanaYadNormal.ttf");
registerFont("assets/fonts/Cafe.ttf");
registerFont("assets/fonts/Dorian CLM Book Italic.ttf");

export function getImageConfig() {
    const fonts = ["Cafe", "Dana Yad", "Dybbuk", "Motek", "Dorian CLM"];
    const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
    const fontStyle = randomFont === "Dorian CLM" ? "italic" : "";

    const config = {
        fontFamily: randomFont,
        fontStyle: fontStyle,
        fontSize: 48,
        fontColor: "#000000",
        width: 400,
        // minHeight: 220,
        // lineHeight: 70,
        margin: 20,
        align: "right",
        valign: "middle",
        borderWidth: 8,
        borderColor: "#FFFFFF",
        backgroundColor: "#FFFFFF",
    };

    return config;
}
