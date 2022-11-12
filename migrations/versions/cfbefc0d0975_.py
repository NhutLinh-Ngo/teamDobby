"""empty message

<<<<<<< HEAD:migrations/versions/879b9721f440_.py
Revision ID: 879b9721f440
Revises: 
Create Date: 2022-11-12 18:22:20.479982
=======
Revision ID: cfbefc0d0975
Revises: 
Create Date: 2022-11-12 15:44:37.396099
>>>>>>> JarrodDev:migrations/versions/cfbefc0d0975_.py

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
<<<<<<< HEAD:migrations/versions/879b9721f440_.py
revision = '879b9721f440'
=======
revision = 'cfbefc0d0975'
>>>>>>> JarrodDev:migrations/versions/cfbefc0d0975_.py
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('first_name', sa.String(length=255), nullable=False),
    sa.Column('last_name', sa.String(length=255), nullable=False),
    sa.Column('buy_power', sa.Float(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('watchlists',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=40), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
<<<<<<< HEAD:migrations/versions/879b9721f440_.py
=======
    )
    op.create_table('watchlist_stocks',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('symbol', sa.String(length=6), nullable=False),
    sa.Column('watchlist_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['watchlist_id'], ['watchlists.id'], ),
    sa.PrimaryKeyConstraint('id')
>>>>>>> JarrodDev:migrations/versions/cfbefc0d0975_.py
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
<<<<<<< HEAD:migrations/versions/879b9721f440_.py
=======
    op.drop_table('watchlist_stocks')
>>>>>>> JarrodDev:migrations/versions/cfbefc0d0975_.py
    op.drop_table('watchlists')
    op.drop_table('users')
    # ### end Alembic commands ###