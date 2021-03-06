"""empty message

Revision ID: 517cdb51c3ce
Revises: 
Create Date: 2022-06-16 14:13:21.381877

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '517cdb51c3ce'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('email_captcha',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=50), nullable=False),
    sa.Column('captcha', sa.String(length=50), nullable=False),
    sa.Column('create_time', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('flight',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('depCity', sa.String(length=50), nullable=False),
    sa.Column('arrCity', sa.String(length=50), nullable=False),
    sa.Column('price', sa.Integer(), nullable=False),
    sa.Column('discount', sa.Float(), nullable=False),
    sa.Column('date', sa.DateTime(), nullable=False),
    sa.Column('url', sa.Text(), nullable=False),
    sa.Column('source', sa.String(length=50), nullable=False),
    sa.Column('create_time', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=50), nullable=False),
    sa.Column('email', sa.String(length=50), nullable=False),
    sa.Column('password', sa.String(length=200), nullable=False),
    sa.Column('register_time', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user')
    op.drop_table('flight')
    op.drop_table('email_captcha')
    # ### end Alembic commands ###
