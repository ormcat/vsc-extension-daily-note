(()=>{"use strict";var e={496:e=>{e.exports=require("vscode")}},t={};function o(r){var n=t[r];if(void 0!==n)return n.exports;var s=t[r]={exports:{}};return e[r](s,s.exports,o),s.exports}var r={};(()=>{var e=r;Object.defineProperty(e,"__esModule",{value:!0}),e.deactivate=e.activate=void 0;const t=o(496);e.activate=function(e){console.log('Congratulations, your extension "vscode-daily-note" is now active!');let o=t.commands.registerCommand("vscode-daily-note.create-dailynote",(async()=>{const e=t.workspace.workspaceFolders?.[0].uri;if(!e)return t.window.showErrorMessage("No workspace. Please add folder");const o=t.Uri.joinPath(e,"notes");t.workspace.fs.createDirectory(o);const r=new Date,n=[r.getFullYear(),("0"+(r.getMonth()+1)).slice(-2),("0"+r.getDate()).slice(-2)].join("-"),s=t.Uri.joinPath(o,n+".md");try{await t.workspace.fs.stat(s)}catch{const e="# "+n+"\n\n## 今日の学び\n\n## タスクメモ";await t.workspace.fs.writeFile(s,(new TextEncoder).encode(e))}t.workspace.openTextDocument(s).then((e=>{t.window.showTextDocument(e,1,!1).then((e=>{}))}))}));e.subscriptions.push(o)},e.deactivate=function(){}})(),module.exports=r})();