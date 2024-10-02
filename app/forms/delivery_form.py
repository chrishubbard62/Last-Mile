from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length

class DeliveryForm(FlaskForm):
  
  pickup_city = StringField('pickup_city', validators=[DataRequired(), Length(min=1, max=50)])
  pickup_state = StringField('pickup_state', validators=[DataRequired(), Length(min=1, max=50)])
  pickup_zip = StringField('pickup_zip', validators=[DataRequired(), Length(min=1, max=15)])
  pickup_address = StringField('pickup_address', validators=[DataRequired(), Length(min=1, max=150)])

  drop_city = StringField('drop_city', validators=[DataRequired(), Length(min=1, max=50)])
  drop_state = StringField('drop_state', validators=[DataRequired(), Length(min=1, max=50)])
  drop_zip = StringField('drop_zip', validators=[DataRequired(), Length(min=1, max=15)])
  drop_address = StringField('drop_address', validators=[DataRequired(), Length(min=1, max=150)])

  description = StringField('description', validators=[DataRequired(), Length(min=1, max=500)])
  special_instructions = StringField('special_instructions', validators=[DataRequired(), Length(min=1, max=500)])
