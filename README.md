# Finance App

A web application that uses a local database to track transactions. 

## Prerequisites

- [pgAdmin](https://www.pgadmin.org/download/)

## Installation

- Clone repository to desired location.

### pgAdmin

1. Once pgAdmin is installed, open it and set up a master password.
2. Right-click Servers > Register > Server
3. Under the General tab, name your server something like `FinanceApp`
4. Under the Connection tab, enter `localhost` for host
5. Enter the password used for the default user `postgres`
6. In the sidebar under your server, right-click Databases > Create > Database
7. Under Databases right-click your database > Query Tool
8. Enter the following query to create a table:

```
CREATE TABLE public.TransactionList
(
    "ID" serial NOT NULL,
    "Name" text,
    "Amount" numeric,
    "Date" date,
    "Type" text,
	PRIMARY KEY ("ID")
);

ALTER TABLE IF EXISTS public.TransactionList
   	OWNER to postgres;
```

### Backend

1. Open a text editor such as Notepad and enter the following in accordance to your database:

```
REACT_APP_DB_HOST=localhost
REACT_APP_DB=database_name
REACT_APP_DB_USER=database_user
REACT_APP_DB_PASS=database_user_password
REACT_APP_DB_PORT=5432
```
&emsp;*NOTE: The default port is 5432 unless otherwise changed.*

2. To save the file, change the type of file to All Files (\*.*) and name it ".env".
Make sure to save the file in the server directory.
3. In a terminal, navigate to the server directory you cloned.
4. Run `npm i` to install dependencies.
5. Run `npm run dev` to start backend.
6. Your backend should now be running on your localhost port 5000 (if not in use).

### Frontend

1. In a seperate terminal, navigate to the client directory you cloned.
2. Run `npm i` to install dependencies.
3. Run `npm start` to start frontend.
4. Your front end should now be running on your localhost port 3000 (if not in use).

Open you preferred browser and enter the port that your frontend is running on (e.g. localhost:3000).

*Note, to close the application, in your frontend terminal press CTRL + C then enter y to terminate. Repeat this step for the backend terminal.*
