/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deactivate = exports.activate = void 0;
const vscode = __webpack_require__(1);
function activate(context) {
    console.log('Congratulations, your extension "vscode-daily-note" is now active!');
    // todo add menu for activity bar
    let disposable = vscode.commands.registerCommand('vscode-daily-note.create-dailynote', async () => {
        const workspaceUri = vscode.workspace.workspaceFolders?.[0].uri;
        if (!workspaceUri) {
            return vscode.window.showErrorMessage("No workspace. Please add folder");
        }
        const baseDir = vscode.Uri.joinPath(workspaceUri, "notes");
        vscode.workspace.fs.createDirectory(baseDir);
        const date = new Date();
        const formattedDate = [
            date.getFullYear(),
            ('0' + (date.getMonth() + 1)).slice(-2),
            ('0' + date.getDate()).slice(-2)
        ].join('-');
        const notePath = vscode.Uri.joinPath(baseDir, formattedDate + ".md");
        try {
            await vscode.workspace.fs.stat(notePath);
        }
        catch {
            const text = '# ' + formattedDate + "\n\n## 今日の学び\n\n\n## タスクメモ\n\n\n";
            await vscode.workspace.fs.writeFile(notePath, new TextEncoder().encode(text));
        }
        vscode.workspace.openTextDocument(notePath)
            .then((a) => {
        });
    });
    const button = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 0);
    button.command = 'vscode-daily-note.create-dailynot';
    button.text = 'DailyNote';
    context.subscriptions.push(button);
    button.show();
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=extension.js.map