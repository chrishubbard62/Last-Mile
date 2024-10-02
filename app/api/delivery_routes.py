from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Delivery, db, Message
from ..utils import format_errors
from app.forms import DeliveryForm

delivery_routes = Blueprint('deliveries', __name__)

@delivery_routes.route('/test')
def test():
  '''
  Initial test to make sure the blueprint is set up properly
  '''
  return {"Test" : "Test"}


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
    return delivery.to_dict_basic()

  return {"errors": format_errors(form.errors)}, 400
