DROP DATABASE IF EXISTS itemsDB;

CREATE DATABASE itemsDB;

USE itemsDB;

CREATE TABLE items (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(45) NULL,
  descript VARCHAR(500) NULL,
  highest_bid INT NULL
  PRIMARY KEY (id)
);

INSERT INTO items (title, descript, highest_bid)
VALUES ("used socks", "old used socks. been in the bottom of a laundry basket for 10 years", 1000);

INSERT INTO items (title, descript, highest_bid)
VALUES ("chocolate", "not your average chocolate", 120);
