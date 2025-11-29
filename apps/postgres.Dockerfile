FROM postgres:16

ENV POSTGRES_DB=smart_home_db
ENV POSTGRES_USER=smart_home_user
ENV POSTGRES_PASSWORD=smart_home_pass

# init.sql будет выполнен при первом запуске контейнера
# init.sql лежит в apps/smart_home/init.sql
COPY ./heating-service/init.sql /docker-entrypoint-initdb.d/
