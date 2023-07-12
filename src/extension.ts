// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { fstat, open } from 'fs';
import * as vscode from 'vscode';
import { createInflate } from 'zlib';

export function activate(context: vscode.ExtensionContext) {

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
		} catch {
			const text = '# '+ formattedDate + "\n\n## 今日の学び\n\n\n## タスクメモ\n\n\n"
			await vscode.workspace.fs.writeFile(notePath, new TextEncoder().encode(text));
		}
		
		vscode.workspace.openTextDocument(notePath)
			.then((a: vscode.TextDocument) => {
			});
	});


    const button = vscode.window.createStatusBarItem(
        vscode.StatusBarAlignment.Left, 
        0
    );
    button.command = 'vscode-daily-note.create-dailynote';
    button.text = 'DailyNote';
  	context.subscriptions.push(button);
	button.show();

	context.subscriptions.push(disposable);
}

export function deactivate() {}
