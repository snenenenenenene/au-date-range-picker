import {readFileSync, writeFileSync} from "fs";

// NOTE: this will only add @tracked properties with a fallback (||)

// TODO absoluter-path
let js = readFileSync("../addon/components/date-range-picker.js", {encoding: "utf-8"});
const regex = RegExp(/((\/\/ Options: (?<group>.+))|@tracked (?<name>.+) =.+?\|{1,} (?<defaultvalue>.+);(?: +\/\/ (?<description>.+))?)/gmi);

let output = `
The following options can be passed to \`<AuDateRangePicker>\`:

`

const headerTemplate = `
| Name     | Default value | Description |
| -------- | ------------- | ----------- |\n`;


function addOption() {
    const match = regex.exec(js);
    if (match) {
        const groups = match.groups;

        if (groups.group != undefined) {
            output += `\n\n#### ${groups.group}\n`
            output += headerTemplate;

        } else {
            let { name, defaultvalue, description, ...rest } = groups;
            if (description == undefined) description = "";
            output += `| @${name} | \`${defaultvalue}\` | ${description} |\n`;
        }


        addOption()
    }
    
}

addOption();

// The Ranges option is too complex to be put into a table
output += `
#### Ranges
\`@ranges\` defines the preset ranges on the left of the date picker.
The following format has to be passed:

\`\`\`js
{
    PRESET-NAME: [STARTDATE, ENDDATE]
}
\`\`\`


You can optionally use moment.js for dynamic assignment
\`\`\`js
{
    Yesterday: [
        moment().subtract(1, 'days').startOf('day'),
        moment().subtract(1, 'days').endOf('day'),
    ],
    'Last week': [moment().subtract(7, 'days'), moment()],
}
\`\`\`
`;


output += "\n\n";


const readmePath = "../README.md";
let readme = readFileSync(readmePath, {encoding: "utf-8"});
//let readme.

readme = readme.replace(
    /(!?### Configuration\n).+?(!?^### )/ms, 
    "### Configuration\n" + output + "### ")
    // The negative lookahead doesn't seem to work properly here, so add what has been removed


writeFileSync(readmePath, readme, {encoding: "utf-8"})
