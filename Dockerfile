FROM postgres:9.6
ADD ./postgresql.conf /var/lib/postgresql/data/pgdata
