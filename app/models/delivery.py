from .db import db, environment, SCHEMA, add_prefix_for_prod

class Delivery(db.Model):
  __tablename__ = 'deliveries'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)

  owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
  courier_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='SET NULL'), nullable=True)

  pickup_city = db.Column(db.String(50), nullable=False)
  pickup_state = db.Column(db.String(50), nullable=False)
  pickup_zip = db.Column(db.String(15), nullable=False)
  pickup_address = db.Column(db.String(150), nullable=False)

  drop_city = db.Column(db.String(50), nullable=False)
  drop_state = db.Column(db.String(50), nullable=False)
  drop_zip = db.Column(db.String(15), nullable=False)
  drop_address = db.Column(db.String(150), nullable=False)

  description = db.Column(db.String(500), nullable=False)
  special_instructions = db.Column(db.String(500), nullable=True)

  owner = db.relationship('User', back_populates='owned_deliveries', foreign_keys=[owner_id])
  courier = db.relationship('User', back_populates='current_deliveries', foreign_keys=[courier_id])
  messages = db.relationship('Message', back_populates='delivery', cascade='all, delete-orphan')

  def to_dict_basic(self):
    return {
      "id": self.id,
      "ownerId": self.owner_id,
      "courierId": self.courier_id,
      "city": self.city,
      "state": self.state,
      "pickupAddress": self.pickup_address,
      "dropAddress": self.drop_address,
      "description": self.description,
      "specialInstructions": self.special_instructions
    }
