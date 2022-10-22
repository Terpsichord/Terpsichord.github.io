"use strict";
var ArgumentType;
(function (ArgumentType) {
    ArgumentType["String"] = "string";
    ArgumentType["Number"] = "number";
})(ArgumentType || (ArgumentType = {}));
var BlockType;
(function (BlockType) {
    BlockType["Command"] = "command";
    BlockType["Reporter"] = "reporter";
    BlockType["Boolean"] = "Boolean";
    BlockType["Hat"] = "hat";
})(BlockType || (BlockType = {}));
class ScratchFetch {
    constructor() {
    }
    getInfo() {
        return {
            id: "Fetch",
            name: "Fetch",
            blocks: [
                {
                    opcode: "fetchURL",
                    blockType: BlockType.Reporter,
                    text: "fetch data from [url]",
                    arguments: {
                        url: {
                            type: ArgumentType.String,
                            defaultValue: "https://api.weather.gov/stations/KNYC/observations"
                        },
                    }
                },
                {
                    opcode: "jsonExtract",
                    blockType: BlockType.Reporter,
                    text: "extract [name] from [data]",
                    arguments: {
                        name: {
                            type: ArgumentType.String,
                            defaultValue: "temperature"
                        },
                        data: {
                            type: ArgumentType.String,
                            defaultValue: '{"temperature": 12.3}'
                        },
                    }
                },
            ],
        };
    }
    fetchURL({ url }) {
        return fetch(url).then(response => response.text());
    }
    jsonExtract({ name, data }) {
        var parsed = JSON.parse(data);
        if (name in parsed) {
            var out = parsed[name];
            var t = typeof (out);
            if (t == "string" || t == "number")
                return out;
            if (t == "boolean")
                return t ? 1 : 0;
            return JSON.stringify(out);
        }
        else {
            return "";
        }
    }
}
