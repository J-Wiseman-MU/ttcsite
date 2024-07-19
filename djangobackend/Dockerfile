FROM python:3.9

ENV PYTHONUNBUFFERED=1

WORKDIR /app

COPY requirements.txt ./
RUN pip install -r requirements.txt

COPY . .

RUN python3 manage.py makemigrations

RUN python3 manage.py migrate



EXPOSE 8000

CMD ["python3", "manage.py", "runserver", "--verbosity", "2", "0.0.0.0:8000"]
