CREATE TABLE "Accounts"(
    "account" SERIAL NOT NULL,
    email VARCHAR(50) NOT NULL,
    "emailGoogle" VARCHAR(50) NOT NULL,
    password VARCHAR NOT NULL,
    salt VARCHAR,
    "accountName" VARCHAR,
    PRIMARY KEY("account")
);

CREATE TABLE "Rols"(
    rol SERIAL NOT NULL,
    "account" INTEGER NOT NULL,
    "rolName" VARCHAR(100),
    PRIMARY KEY ("account", "rol"),
    FOREIGN KEY ("account") REFERENCES "Accounts"
);
CREATE TABLE "Permissions"(
    "permission" SERIAL NOT NULL,
    rol INTEGER NOT NULL,
    "account" INTEGER NOT NULL,
    "routeName" VARCHAR(200) NOT NULL,
    PRIMARY KEY ("permission"),
    FOREIGN KEY ("account", "rol") REFERENCES "Rols"
);
CREATE TABLE "Petitions"(
    petition SERIAL NOT NULL,
    "permission" INTEGER NOT NULL,
    "petitionName" VARCHAR(10),
    PRIMARY KEY ("petition","permission"),
    FOREIGN KEY ("permission") REFERENCES "Permissions"
);