var editor = CodeMirror.fromTextArea(document.getElementById("editor-input"),
    {
        mode: "python",
        theme: "monokai",
        lineNumbers: true,
        lineWrapping: true,
        tabSize: 2,
        indentWithTabs: true
    });

const consoleFrame = document.getElementById("console-output"); // Select console element

function executePythonCode() {
    console.log("Calling execute!");
    const code = editor.getValue(); // Get code from editor
    try {
        let result = editor.eval(code);
        consoleFrame.srcdoc = `<html><body>${result}</body></html>`; // Display result
    } catch (error) {
        consoleFrame.srcdoc = `<html><body>Error: ${error.message}</body></html>`;
    }
}