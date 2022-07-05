FROM python:3

ENV PYTHONUNBUFFERED 1

WORKDIR /usr/src/app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN python manage.py collectstatic --noinput
# CMD [ "gunicorn", "core.wsgi", "0.0.0.0:8000"]
CMD ["gunicorn", "--bind", ":8000", "--workers", "3", "medical.wsgi:application"]

