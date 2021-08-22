const vscode = require('vscode');
const Timer = require('./timer.js');

/**
 * @param {vscode.ExtensionContext} context
 */


function activate(context) {
	const statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	const time = new Timer(statusBar);


	let disposable = vscode.commands.registerCommand('timer.resetTimer', function () {
		time.second = 0
		time.minute = 0
		time.hour = 0
		vscode.window.showInformationMessage('Successfully Reset Timer!');
	});
	context.subscriptions.push(statusBar);
	context.subscriptions.push(disposable);
};


function deactivate() {}

module.exports = {
	activate,
	deactivate
}