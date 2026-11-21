import pty
import os
import sys
import select
import time

master, slave = pty.openpty()
pid = os.fork()

if pid == 0:
    os.close(master)
    os.dup2(slave, 0)
    os.dup2(slave, 1)
    os.dup2(slave, 2)
    os.close(slave)
    os.environ["TERM"] = "xterm-256color"
    os.execlp("gh", "gh", "auth", "login", "-w", "-p", "https", "--skip-ssh-key")
else:
    os.close(slave)
    time.sleep(1.5)
    os.write(master, b"y\r")
    time.sleep(1)
    os.write(master, b"\r")
    
    start = time.time()
    while time.time() - start < 10:
        r, _, _ = select.select([master], [], [], 0.5)
        if master in r:
            try:
                data = os.read(master, 1024)
                if not data:
                    break
                sys.stdout.buffer.write(data)
                sys.stdout.flush()
            except OSError:
                break
    os.close(master)
