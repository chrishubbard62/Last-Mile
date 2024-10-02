from app.models import db, Message, environment, SCHEMA
from sqlalchemy.sql import text
from .users import demo, marnie
from .deliveries import delivery1

message1 = Message(
  message='On my way to pick up the envelope',
  user=marnie,
  delivery=delivery1
)

message2 = Message(
  message='Ok sounds great give give me a heads up when you get close',
  user=demo,
  delivery=delivery1
)

def seed_messages():
  db.session.add(message1)
  db.session.add(message2)
  db.session.commit()

def undo_messages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.messages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM messages"))
    db.session.commit()
