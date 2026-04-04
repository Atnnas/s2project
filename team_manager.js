import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEAM_DIR = ".antigravity/team";

function initTeam() {
    fs.mkdirSync(path.join(TEAM_DIR, 'mailbox'), { recursive: true });
    fs.mkdirSync(path.join(TEAM_DIR, 'locks'), { recursive: true });
    
    const tasksPath = path.join(TEAM_DIR, 'tasks.json');
    if (!fs.existsSync(tasksPath)) {
        fs.writeFileSync(tasksPath, JSON.stringify({ tasks: [], members: [] }, null, 2));
    }
    
    const broadcastPath = path.join(TEAM_DIR, 'broadcast.msg');
    if (!fs.existsSync(broadcastPath)) {
        fs.writeFileSync(broadcastPath, "");
    }
    console.log("✓ Infraestructura 'Equipo Alejabot' lista.");
}

function assignTask(title, assignedTo, deps = []) {
    const tasksPath = path.join(TEAM_DIR, 'tasks.json');
    const data = JSON.parse(fs.readFileSync(tasksPath, 'utf8'));
    
    const task = {
        id: data.tasks.length + 1,
        title: title,
        status: "PENDING",
        plan_approved: false,
        assigned_to: assignedTo,
        dependencies: deps
    };
    
    data.tasks.push(task);
    fs.writeFileSync(tasksPath, JSON.stringify(data, null, 2));
    console.log(`✓ Tarea ${task.id} (${title}) asignada a ${assignedTo}.`);
}

function broadcastMsg(sender, text) {
    const msg = { de: sender, tipo: "BROADCAST", mensaje: text };
    fs.appendFileSync(path.join(TEAM_DIR, 'broadcast.msg'), JSON.stringify(msg) + "\n");
    console.log(`✓ Mensaje global enviado por ${sender}.`);
}

function sendMessage(sender, receiver, text) {
    const msg = { de: sender, mensaje: text };
    fs.appendFileSync(path.join(TEAM_DIR, 'mailbox', `${receiver}.msg`), JSON.stringify(msg) + "\n");
    console.log(`✓ Mensaje enviado a ${receiver}.`);
}

// CLI Integration
const args = process.argv.slice(2);
if (args.length > 0) {
    const cmd = args[0];
    if (cmd === "init") initTeam();
    else if (cmd === "assign") assignTask(args[1], args[2], args.slice(3));
}
