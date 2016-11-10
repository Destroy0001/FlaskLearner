from flask import current_app

from flask.ext.script import Command
from flask.ext.security.confirmable import confirm_user

from flask_application import app


class ResetDB(Command):
    """Drops all tables and recreates them"""
    def run(self, **kwargs):
        self.drop_tables()

    @staticmethod
    def drop_tables():
        current_app.db.drop_all()
        print 'All tables dropped'

