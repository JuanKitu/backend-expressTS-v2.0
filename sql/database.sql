CREATE TABLE "Accounts"(
    "account" SERIAL NOT NULL,
    email VARCHAR(50) NOT NULL,
    hash VARCHAR NOT NULL,
    "emailGoogle" VARCHAR(50) NOT NULL,
    salt VARCHAR,
    "accountName" VARCHAR,
    PRIMARY KEY("account")
);
CREATE TABLE "Roles"(
    role SERIAL NOT NULL,
    "rolName" VARCHAR(200) NOT NULL,
    PRIMARY KEY ("role")
);
CREATE TABLE "UserRoles"(
    account INTEGER NOT NULL,
    role INTEGER NOT NULL,
    PRIMARY KEY ("account","role"),
    FOREIGN KEY ("role") REFERENCES "Roles",
    FOREIGN KEY ("account") REFERENCES "Accounts"
);

CREATE TABLE "Permissions"(
    "permission" SERIAL NOT NULL,
    role INTEGER NOT NULL,
    "routeName" VARCHAR(200) NOT NULL,
    PRIMARY KEY ("permission"),
    FOREIGN KEY ("role") REFERENCES "Roles"
);
CREATE TABLE "Petitions"(
    petition SERIAL NOT NULL,
    "permission" INTEGER NOT NULL,
    "petitionName" VARCHAR(10),
    PRIMARY KEY ("petition","permission"),
    FOREIGN KEY ("permission") REFERENCES "Permissions"
);