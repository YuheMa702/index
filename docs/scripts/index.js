var editor = CodeMirror.fromTextArea(document.getElementById("editor-input"),
    {
        mode: "python",
        theme: "oceanic-next",
        lineNumbers: true,
        lineWrapping: true,
        tabSize: 2,
        indentWithTabs: true
    });

var output = document.getElementById("console-output"); // Select console element
var canvas = document.getElementById("canvas");
var runButton = document.getElementById("run-button");
var sumOutput = '';
function loadOutput(text) {
    console.log(sumOutput);
    sumOutput += text + "\n";
    output.textContent = sumOutput;
}

function readText(x) {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
            throw "File not found: '" + x + "'";
    return Sk.builtinFiles["files"][x];
}

runButton.addEventListener("click", () => {
    console.log("Clicked Button");
    var code = editor.getValue(); // Get code from editor
    //output.textContent = '';
    Sk.configure({output:loadOutput, read:readText}); 
    (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = "canvas";
    var myPromise = Sk.misceval.asyncToPromise(function() {
        return Sk.importMainWithBody("<stdin>", false, code, true);
    });
    myPromise.then(function(mod) {
        console.log('success');
    },
        function(err) {
        console.log(err.toString());
    });
});