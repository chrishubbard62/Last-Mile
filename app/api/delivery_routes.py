from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Delivery, db, Message
from ..utils import format_errors
from app.forms import DeliveryForm, MessageForm


delivery_routes = Blueprint('deliveries', __name__)

@delivery_routes.route('/test')
def test():
  '''
  Initial test to make sure the blueprint is set up properly
  '''
  return {"test" : "test"}


@delivery_routes.route('')
def get_deliveries():
  '''
  Queries and returns all the deliveries that currently exist
  '''
  deliveries = Delivery.query.all()
  return {"Deliveries" : [delivery.to_dict_basic() for delivery in deliveries ]}


@delivery_routes.route('/unassigned')
@login_required
def get_unassigned():
  '''
  Queries and returns all deliveries that dont have a courier id associated to them
  '''
  deliveries = Delivery.query.filter(Delivery.courier_id.is_(None))
  return {"Deliveries" : [delivery.to_dict_basic() for delivery in deliveries ]}


@delivery_routes.route('/current')
@login_required
def get_current():
  '''
  Queries all the deliveries associated to the current user
  '''
  deliveries = Delivery.query.filter(Delivery.courier_id == current_user.id)
  return {"Deliveries" : [delivery.to_dict_basic() for delivery in deliveries]}


@delivery_routes.route('/<int:id>')
@login_required
def get_details(id):
  '''
  Queries for a delivery by its id and returns the details of the delivery
  '''
  delivery = Delivery.query.get(id)
  if not delivery:
    return {"message": "Delivery does not exist"}, 404
  return delivery.to_dict_basic()


@delivery_routes.route('', methods=['POST'])
@login_required
def create_delivery():
  '''
  Create and returns a new delivery
  '''

  form = DeliveryForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    delivery = Delivery(
      owner_id = int(current_user.id),
      pickup_city = form.data['pickup_city'],
      pickup_state = form.data['pickup_state'],
      pickup_zip = form.data['pickup_zip'],
      pickup_address = form.data['pickup_address'],
      drop_city = form.data['drop_city'],
      drop_state = form.data['drop_state'],
      drop_zip = form.data['drop_zip'],
      drop_address = form.data['drop_address'],
      description = form.data['description'],
      special_instructions = form.data['special_instructions']
    )
    db.session.add(delivery)
    db.session.commit()
    return delivery.to_dict_basic(), 201

  return {"errors": format_errors(form.errors)}, 400


@delivery_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_delivery(id):
  '''
  Updates and returns and existing delivery
  '''

  delivery = Delivery.query.get(id)

  if not delivery:
    return {"message": "Delivery does not exist"}, 404
  if delivery.owner_id != current_user.id:
    return {"message" : "Forbidden"}, 403

  form = DeliveryForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
      delivery.pickup_city = form.data['pickup_city']
      delivery.pickup_state = form.data['pickup_state']
      delivery.pickup_zip = form.data['pickup_zip']
      delivery.pickup_address = form.data['pickup_address']
      delivery.drop_city = form.data['drop_city']
      delivery.drop_state = form.data['drop_state']
      delivery.drop_zip = form.data['drop_zip']
      delivery.drop_address = form.data['drop_address']
      delivery.description = form.data['description']
      delivery.special_instructions = form.data['special_instructions']
      db.session.commit()
      return delivery.to_dict_basic()

  return {"errors": format_errors(form.errors)}, 400

@delivery_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_delivery(id):
  """
  Deletes an existing delivery
  """
  delivery = Delivery.query.get(id)

  if not delivery:
    return {"message": "Delivery does not exist"}, 404
  if delivery.owner_id != current_user.id:
    return {"message" : "Forbidden"}, 403

  id = delivery.id

  db.session.delete(delivery)
  db.session.commit()

  return {"message" : "Successfully deleted", 'deliveryId': id}


@delivery_routes.route('/<int:id>/messages')
def get_messages(id):
  '''
  Queries and returns all the messages related to a specific delivery
  '''
  messages = Message.query.filter(id == Message.delivery_id).order_by(Message.created_at)
  return {"Messages": [message.to_dict_user() for message in messages]}


@delivery_routes.route('/<int:id>/messages', methods=['POST'])
@login_required
def create_message(id):
  '''
  Creates a new message at the for a delivery specified by the deliveries id
  '''
  delivery = Delivery.query.get(id)

  if not delivery:
    return {"message": "Delivery does not exist"}, 404

  form = MessageForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    delivery_id = int(id)
    user_id = int(current_user.id)
    message = form.data['message']

    new_message = Message(
      delivery_id =delivery_id,
      user_id = user_id,
      message = message
    )
    db.session.add(new_message)
    db.session.commit()
    return new_message.to_dict_basic(), 201

  return {"errors": format_errors(form.errors)}, 400
