FROM python:3

WORKDIR /usr/src/app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# CMD [ "gunicorn", "core.wsgi" ]
CMD [ "python3", "manage.py", "runserver" ]