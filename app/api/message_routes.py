from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Delivery, db, Message
from ..utils import format_errors
from app.forms import DeliveryForm, MessageForm

message_routes = Blueprint('messages', __name__)

@message_routes.route('')
def get_messages():
  '''
  Queries and returns all messages to test the blueprint
  '''
  messages = Message.query.all()
  return {"Messages" : [message.to_dict_basic() for message in messages]}

@message_routes.route('<int:id>', methods=['PUT'])
@login_required
def update_message(id):
  '''
  Updates an existing message
  '''
