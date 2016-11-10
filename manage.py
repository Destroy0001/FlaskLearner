#!/usr/bin/env python
from flask.ext.script import Manager
from flask.ext.script.commands import Server, Shell, ShowUrls, Clean
from flask.ext.migrate import MigrateCommand
from flask_application import app
from flask_application.script import ResetDB


manager = Manager(app)
manager.add_command("shell", Shell(use_ipython=True))
manager.add_command("runserver", Server(use_reloader=True,use_debugger=True))

manager.add_command("show_urls", ShowUrls())
manager.add_command("clean", Clean())

manager.add_command("reset_db", ResetDB())

manager.add_command("db", MigrateCommand)



if __name__ == "__main__":
    manager.run()
