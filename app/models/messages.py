from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime, timezone

class Message(db.Model):
  __tablename__ = 'messages'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  delivery_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('deliveries.id')), nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
  message = db.Column(db.String(500), nullable=False)
  created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))

  delivery = db.relationship('Delivery', back_populates='messages')
  user = db.relationship('User', back_populates='messages')

  def to_dict_basic(self):
    return {
      "id": self.id,
      "deliveryId": self.delivery_id,
      "userId": self.user_id,
      "message": self.message,
      "createdAt": self.created_at.strftime("%m/%d/%Y, %H:%M:%S")
    }

  def to_dict_user(self):
    return {
      **self.to_dict_basic(),
      "user": self.user.to_dict()
    }
