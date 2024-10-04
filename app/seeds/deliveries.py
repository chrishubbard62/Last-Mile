from app.models import db, Delivery, environment, SCHEMA
from sqlalchemy.sql import text
from .users import demo, marnie
delivery1 = Delivery(
    pickup_name="TCB courier",
    pickup_city="San Francisco",
    pickup_state="CA",
    pickup_zip="94102",
    pickup_address="565b Ellis Street",
    drop_name="Bane Company",
    drop_city="San Francisco",
    drop_state="CA",
    drop_zip="94105",
    drop_address="415 Mission Street",
    description="Your picking up a small envelope and bringing to Bane Company on the 48th floor",
    special_instructions="Make sure to have a valid id for security!",
    courier=marnie,
    owner=demo,
)

delivery2 = Delivery(
    pickup_name="Seedy People",
    pickup_city="San Francisco",
    pickup_state="CA",
    pickup_zip="94110",
    pickup_address="350 Treat Ave",
    drop_name="Goldengate Technologies",
    drop_city="San Francisco",
    drop_state="CA",
    drop_zip="94104",
    drop_address="555 California St",
    description="Pick up a small box of seeds and deliver it to the front desk of Goldengate Technologies.",
    special_instructions="The front desk will provide you access to the delivery area. Ensure you get a delivery confirmation.",
    owner=demo,
)

delivery3 = Delivery(
    pickup_name="Trays R Us",
    pickup_city="San Francisco",
    pickup_state="CA",
    pickup_zip="94107",
    pickup_address="1011 Mariposa St",
    drop_name="Pac Heights Condos",
    drop_city="San Francisco",
    drop_state="CA",
    drop_zip="94123",
    drop_address="2000 Union St",
    description="Pick up a plant tray and deliver it to the rooftop garden area of Pacific Heights Condos.",
    special_instructions="Use the service elevator to access the rooftop. Notify the concierge upon arrival.",
    owner=demo,
)

delivery4 = Delivery(
    pickup_name="Flower Power",
    pickup_city="San Francisco",
    pickup_state="CA",
    pickup_zip="94114",
    pickup_address="2298 Market St",
    drop_name="Broderick Gardens",
    drop_city="San Francisco",
    drop_state="CA",
    drop_zip="94117",
    drop_address="501 Broderick St",
    description="Pick up a pack of flower seeds and deliver them to the landscaping company at Broderick Gardens.",
    special_instructions="Ring the doorbell for drop-off and confirm with the recipient before leaving.",
    owner=demo,
)

delivery5 = Delivery(
    pickup_name="Nice Trees",
    pickup_city="San Francisco",
    pickup_state="CA",
    pickup_zip="94103",
    pickup_address="450 8th St",
    drop_name="GGP Maintenance",
    drop_city="San Francisco",
    drop_state="CA",
    drop_zip="94116",
    drop_address="2400 19th Ave",
    description="Pick up a delivery of tree saplings and deliver them to the park maintenance office.",
    special_instructions="Park in the designated drop-off zone and unload with the help of park staff.",
    owner=demo,
)


def seed_deliveries():
    db.session.add(delivery1)
    db.session.add(delivery2)
    db.session.add(delivery3)
    db.session.add(delivery4)
    db.session.add(delivery5)
    db.session.commit()


def undo_deliveries():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.deliveries RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM deliveries"))
    db.session.commit()
