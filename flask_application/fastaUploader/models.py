from flask_application.models import db, FlaskModel

class Fasta(FlaskModel):
    id = db.Column(db.Integer, primary_key=True)
    header = db.Column(db.String(255))
    data = db.Column(db.Text)