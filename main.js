const {app, BrowserWindow} = require('electron')
let win

const createWindow = () => {
	win = new BrowserWindow({
		title:'Camera App',
		useContentSize: true,
		width: 800,
		height: 600,
		resizable: false,
		fullscreen: false,
		show: false,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false
		}
	})
	win.loadFile('index.html')
	win.toggleDevTools()
	win.on('ready-to-show', () => {win.show()})
	win.on('closed', () => {win = null})
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin')
		app.quit();
});