CREATE ROLE baseball_admin WITH LOGIN PASSWORD 'baseball_admin';
ALTER ROLE baseball_admin SET client_encoding TO 'utf8';
ALTER ROLE baseball_admin SET default_transaction_isolation TO 'read committed';
ALTER ROLE baseball_admin SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE baseball TO baseball_admin;
ALTER USER baseball_admin CREATEDB;

CREATE ROLE baseball_user WITH LOGIN PASSWORD 'baseball_user';
ALTER ROLE baseball_user SET client_encoding TO 'utf8';
ALTER ROLE baseball_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE baseball_user SET timezone TO 'UTC';
GRANT CONNECT ON DATABASE baseball TO baseball_user;