CREATE TABLE "koala" (
"id" serial primary key,
"name" varchar(80) NOT NULL,
"gender" varchar(1) NOT NULL,
-- lets make another colum name type other parameter
"age" INTEGER NOT NULL,
"ready_to_transfer" varchar(1) NOT NULL,
"notes" varchar(240));

INSERT INTO "koala" ("name", "gender", "age", "ready_to_transfer", "notes") VALUES ('Scotty', 'M', '4', 'Y', 'Born in Guatemala');

INSERT INTO "koala" ("name", "gender", "age", "ready_to_transfer", "notes") VALUES ('Jean', 'F', '5', 'Y', 'Allergic to lots of lava');

INSERT INTO "koala" ("name", "gender", "age", "ready_to_transfer", "notes") VALUES ('Ororo', 'F', '7', 'N', 'Loves listening to Paula (Abdul)');

INSERT INTO "koala" ("name", "gender", "age", "ready_to_transfer", "notes") VALUES ('Logan', 'M', '15', 'N', 'Loves the sauna');

INSERT INTO "koala" ("name", "gender", "age", "ready_to_transfer", "notes") VALUES ('Charlie', 'M', '9', 'Y', 'Favorite band is Nirvana');

INSERT INTO "koala" ("name", "gender", "age", "ready_to_transfer", "notes") VALUES ('Betsy', 'F', '4', 'Y', 'Has a pet iguana');

SELECT * FROM "koala";

