export const categoryTrimmer = (category) => {
    switch (category) {
        case "fashion":
            return "패션";
        case "tips":
            return "꿀팁";
        case "daily":
            return "일상";
        case "diy":
            return "DIY";
        case "growth":
            return "성장";
        case "adoption":
            return "입양";
        case "must-try":
            return "추천";
        case "memories":
            return "추억";
        case "talk":
            return "소통";
        case "daily-photo":
            return "사진";
        default:
            return "-";
    }
}