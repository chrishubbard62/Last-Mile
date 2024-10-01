from .db import db, environment, SCHEMA, add_prefix_for_prod

class Delivery(db.Model):
  __tablename__ = 'deliveries'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
  courier_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='SET NULL'), nullable=True)
  city = db.Column(db.String(50), nullable=False)
  state = db.Column(db.String(50), nullable=False)
  country = db.Column(db.string(50), nullable=False)
  pickup_address = db.Column(db.string(150), nullable=False)
  drop_address = db.Column(db.string(150), nullable=False)
  description = db.Column(db.string(500), nullable=False)
  special_instructions = db.Column(db.String(500), nullable=True)

  owner = db.relationship('User', back_populates='owned_deliveries')
  courier = db.relationship('User', back_populates='current_deliveries')
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
