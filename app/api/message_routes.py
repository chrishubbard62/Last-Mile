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
  message = Message.query.get(id)

  if not message:
    return {"message": "Message does not exist"}, 404
  if message.user_id != current_user.id:
    return {"message" : "Forbidden"}, 403

  form = MessageForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    message.message = form.data['message']
    db.session.commit()
    return message.to_dict_basic()

  return {"errors": format_errors(form.errors)}, 400


@message_routes.route('<int:id>', methods=['DELETE'])
@login_required
def delete_message(id):
  '''
  deletes an existing message
  '''
  message = Message.query.get(id)

  if not message:
    return {"message": "Message does not exist"}, 404
  if message.user_id != current_user.id:
    return {"message" : "Forbidden"}, 403

  id = message.id

  db.session.delete(message)
  db.session.commit()

  return {"message" : "Successfully deleted", 'messageId': id}
