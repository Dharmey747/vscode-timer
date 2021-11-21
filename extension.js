const vscode = require('vscode');
const Timer = require('./timer.js');
const stats = require('./stats.js');
var sessions = require('./sessions.json');

/**
 * @param {vscode.ExtensionContext} context
 */


function activate(context) {
	const statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	const time = new Timer(statusBar);


	let resetTime = vscode.commands.registerCommand('timer.resetTimer', function () {
		time.second = 0
		time.minute = 0
		time.hour = 0
		vscode.window.showInformationMessage('Successfully Reset Timer!');
	});

	let statsPage = vscode.commands.registerCommand('timer.viewAnalytics', function () {
		const panel = vscode.window.createWebviewPanel('stats', 'Analytics', vscode.ViewColumn.One, {enableScripts: true});
		panel.webview.html = stats.renderAnalytics();
		panel.webview.postMessage(sessions);
	});

	statusBar.command = "timer.viewAnalytics"


	context.subscriptions.push(statusBar);
	context.subscriptions.push(resetTime);
	context.subscriptions.push(statsPage);
};


function deactivate() {}

module.exports = {
	activate,
	deactivate
}