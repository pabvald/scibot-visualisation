FROM python:3.9.6-slim

WORKDIR /opt/ScibotVisualization/server

COPY . .

ENV PYTHONUNBUFFERED 1

RUN pip3 install -r requirements.txt

WORKDIR ./src

CMD ["python", "app.py"]