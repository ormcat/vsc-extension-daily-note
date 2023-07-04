// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { fstat } from 'fs';
import * as vscode from 'vscode';
import { createInflate } from 'zlib';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vscode-daily-note" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('vscode-daily-note.create-dailynote', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		const workspaceUri = vscode.workspace.workspaceFolders?.[0].uri;
		if (!workspaceUri) {
			return vscode.window.showErrorMessage("ワークスペースがありません");
		}
 		const baseDir = vscode.Uri.joinPath(workspaceUri, "articles");
		vscode.workspace.fs.createDirectory(baseDir);

		const todaysNote = vscode.Uri.joinPath(baseDir, "daily.md");
		vscode.workspace.fs.writeFile(todaysNote, new TextEncoder().encode('# Y-m-d'));
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
