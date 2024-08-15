FROM python:3

ENV PYTHONUNBUFFERED=1

WORKDIR /usr/src/erp

COPY requirements.txt ./

RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

COPY . .
