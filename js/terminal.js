// 2. Interactive Terminal
// This script runs safely even if the terminal HTML is commented out
const cmdInput = document.getElementById('cmd-input');
const termOutput = document.getElementById('terminal-output');
const terminalWindow = document.querySelector('.terminal-window');

if (cmdInput && termOutput) {
    const commands = {
        'help': 'Available commands: about, skills, contact, whoami, clear',
        'about': 'Vijaykumar: Senior Backend Engineer. Python/Django specialist.',
        'skills': 'Python, Django, DRF, PostgreSQL, Redis, Docker, Linux.',
        'contact': 'Email: vn.rocks99@gmail.com | Github: @vjcodes-online',
        'whoami': 'root (just kidding, you are guest)',
        'sudo': 'Permission denied: nicely tried.',
        'clear': 'CLEAR'
    };

    cmdInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            const cmd = this.value.trim().toLowerCase();
            let response = '';

            if (cmd === 'clear') {
                termOutput.innerHTML = '<span class="text-accent">Welcome to VJ_Codes v1.0.0</span><br>Type \'help\' to see available commands.<br><br>';
            } else if (commands[cmd]) {
                response = `<span class="command-success">${commands[cmd]}</span>`;
                termOutput.innerHTML += `<div class="mb-2"><span class="prompt">user@vjcodes:~$</span> ${this.value}<br>${response}</div>`;
            } else if (cmd !== '') {
                response = `<span class="command-error">Command not found: ${cmd}</span>`;
                termOutput.innerHTML += `<div class="mb-2"><span class="prompt">user@vjcodes:~$</span> ${this.value}<br>${response}</div>`;
            }

            this.value = '';

            // Auto scroll to bottom of terminal
            termOutput.parentElement.scrollTop = termOutput.parentElement.scrollHeight;
        }
    });
}

if (terminalWindow && cmdInput) {
    // Focus input when clicking anywhere in terminal
    terminalWindow.addEventListener('click', () => {
        cmdInput.focus();
    });
}
