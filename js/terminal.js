'use strict';

// Interactive Terminal Simulator
(function () {
    const cmdInput = document.getElementById('cmd-input');
    const termOutput = document.getElementById('terminal-output');
    const termBody = document.getElementById('term-body');
    const cmdPills = document.querySelectorAll('.cmd-pill');

    if (!cmdInput || !termOutput) return;

    const commands = {
        'help': `Available commands:
  <span class="text-accent">summary</span>       - Overview of Vijaykumar's backend profile
  <span class="text-accent">skills</span>        - List core technical stack & architectures
  <span class="text-accent">systems</span>       - Key industrial ERP & migration systems
  <span class="text-accent">curl</span>          - Fetch mock JSON profile from API
  <span class="text-accent">contact</span>       - Get direct contact channels & email
  <span class="text-accent">whoami</span>        - Display current guest session
  <span class="text-accent">clear</span>         - Clear the terminal screen`,

        'summary': `Vijaykumar Nayak | <span class="text-accent">Backend Engineer & Software Developer</span>
• 4+ years engineering Python/Django enterprise & manufacturing ecosystems.
• Strong foundation in PostgreSQL schema design, Celery workers, and legacy database migrations.
• Proven track record delivering mission-critical internal systems as a primary developer.`,

        'skills': `<span class="text-accent">Backend:</span> Python 3.x, Django, Django REST Framework (DRF), REST APIs
<span class="text-accent">Databases & SQL:</span> PostgreSQL (3NF, Indexing, Transactions), MySQL, Redis Caching
<span class="text-accent">Workers & Automation:</span> Celery, Scheduled Jobs, Dynamic PDF/Excel Generation
<span class="text-accent">DevOps & Servers:</span> Linux (Ubuntu/Debian), Nginx, Gunicorn/Waitress, Docker`,

        'systems': `<span class="text-accent">1. Industrial Manufacturing ERP</span> -> Multi-tier BOM & real-time inventory ledger.
<span class="text-accent">2. Calibration & Compliance Hub</span> -> Automated ISO audit tracking & PDF certificates.
<span class="text-accent">3. Smart HR & Attendance Engine</span> -> Image-based kiosk verify & automated payroll.
<span class="text-accent">4. 15+ Yr Data Migration Pipeline</span> -> 100% data fidelity normalization into PostgreSQL.`,

        'curl': `<pre style="color: #64ffda; margin: 0; font-family: inherit;">HTTP/1.1 200 OK
Content-Type: application/json

{
  "name": "Vijaykumar Nayak",
  "title": "Backend Engineer & Software Developer",
  "stack": "Python, Django, PostgreSQL, APIs",
  "experience_years": 4,
  "status": "Open for Backend Engineering Roles",
  "email": "hello@vijaynayak.dev",
  "github": "https://github.com/vmnayak",
  "linkedin": "https://linkedin.com/in/vijaykumar-nayak-b935b0130"
}</pre>`,

        'contact': `Email: <a href="mailto:hello@vijaynayak.dev" style="color: #64ffda;">hello@vijaynayak.dev</a>
LinkedIn: <a href="https://linkedin.com/in/vijaykumar-nayak-b935b0130" target="_blank" style="color: #64ffda;">linkedin.com/in/vijaykumar-nayak-b935b0130</a>
GitHub: <a href="https://github.com/vmnayak" target="_blank" style="color: #64ffda;">github.com/vmnayak</a>`,

        'whoami': 'guest@vjcodes-box (permissions: read-only | invited-to-collaborate: true)',
        'sudo': 'Permission denied: Nice attempt, but this box is secured by Django RBAC.'
    };

    function executeCommand(inputCmd) {
        const cmd = inputCmd.trim().toLowerCase();
        if (cmd === '') return;

        if (cmd === 'clear') {
            termOutput.innerHTML = '<span class="text-accent">VN_BACKEND v2.5.0 CLI [Session Active]</span><br>Type <span class="text-accent">help</span> or click quick commands below to explore backend stats & profile.<br><br>';
            if (termBody) termBody.scrollTop = 0;
            return;
        }

        let response = '';
        if (commands[cmd]) {
            response = commands[cmd];
        } else if (cmd.startsWith('curl')) {
            response = commands['curl'];
        } else {
            response = `<span style="color: #f87171;">zsh: command not found: ${inputCmd}</span>. Type <span class="text-accent">help</span> for commands.`;
        }

        termOutput.innerHTML += `<div class="mb-2"><span class="prompt">vj@server:~$</span> ${inputCmd}<br>${response}</div>`;
        
        if (termBody) {
            termBody.scrollTop = termBody.scrollHeight;
        }
    }

    cmdInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            executeCommand(this.value);
            this.value = '';
        }
    });

    // Quick Command Pills Click Handler
    cmdPills.forEach(pill => {
        pill.addEventListener('click', function () {
            const commandToRun = this.getAttribute('data-cmd');
            executeCommand(commandToRun);
            cmdInput.focus();
        });
    });

    // Focus input when clicking terminal window
    const terminalWindow = document.querySelector('.terminal-window');
    if (terminalWindow) {
        terminalWindow.addEventListener('click', (e) => {
            if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'A') {
                cmdInput.focus();
            }
        });
    }
})();
