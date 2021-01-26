// Markdown Manager
const markdownManager = {

    // Values
    values: {
        h3: { regex: /^### (.*$)/gim, result: '<h3>$1</h3>', bbcode: '[h3]$1[/h3]' },
        h2: { regex: /^## (.*$)/gim, result: '<h2>$1</h2>', bbcode: '[h2]$1[/h2]' },
        h1: { regex: /^# (.*$)/gim, result: '<h1>$1</h1>', bbcode: '[h1]$1[/h1]' },
        blockquote: { regex: /^\> (.*$)/gim, result: '<blockquote>$1</blockquote>', bbcode: '[blockquote]$1[/blockquote]' },
        strong: { regex: /\*\*(.*)\*\*/gim, result: '<strong>$1</strong>', bbcode: '[b]$1[/b]' },
        italic: { regex: /\*(.*)\*/gim, result: '<i>$1</i>', bbcode: '[i]$1[/i]' },
        image: { regex: /!\[(.*?)\]\((.*?)\)/gim, result: "<img alt='$1' src='$2' />", bbcode: '[img="$2"]' },
        url: { regex: /\[(.*?)\]\((.*?)\)/gim, result: "<a href='$2'>$1</a>", bbcode: '[href="$2"]$1[/i]' },
        br: { regex: /\n$/gim, result: '<br />', bbcode: '\n' }
    },

    // Parse
    parseMarkdown: function (markdownText, type = 'result') {

        // Get Value
        let htmlText = markdownText;

        // Replace Values
        for (const item in markdownManager.values) {
            if (typeof markdownManager.values[item][type] === "string" || typeof markdownManager.values[item][type] === "function") {
                htmlText = htmlText.replace(markdownManager.values[item].regex, markdownManager.values[item][type]);
            }
        }

        // Send Result
        return htmlText.trim();

    }

};

module.exports = markdownManager;