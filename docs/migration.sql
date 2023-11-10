create table users (
	id BIGSERIAL primary key,
	email varchar(30) not null,
	name varchar(30) not null,
	profile_picture_url text
)

create table cars (
	id BIGSERIAL primary key,
	name varchar(30) not null,
	price INT not null,
	size varchar(30) not null,
	picture text
)

create table orders (
	id BIGSERIAL primary key,
	email varchar(30) not null,
	car_id INT,
	start varchar not null,
	finish varchar not null,
	status varchar not null,
	CONSTRAINT car
      FOREIGN KEY(car_id) 
	  REFERENCES cars(id)

)